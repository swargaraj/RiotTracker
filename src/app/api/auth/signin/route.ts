import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
	console.log("in SignIn");
	let body;
	// try {
	// 	const rawBody = await readStream(req.body); // Read the stream
	// 	body = JSON.parse(rawBody); // Parse the JSON body
	// } catch (error) {
	// 	return Response.json(
	// 		{ message: "Invalid request body" },
	// 		{ status: 400 },
	// 	);
	// }

	const { email, password } = await req.json();

	if (!email || !password) {
		return Response.json(
			{ message: "Email and password are required" },
			{ status: 400 },
		);
	}

	try {
		await dbConnect();

		const user = await User.findOne({ email });
		if (!user) {
			return Response.json(
				{ message: "Invalid email or password" },
				{ status: 401 },
			);
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return Response.json(
				{ message: "Invalid email or password" },
				{ status: 401 },
			);
		}
		const tokenId = crypto.randomUUID();
		const token = jwt.sign(
			{ userId: user._id, id: tokenId },
			process.env.JWT_SECRET!,
			{
				expiresIn: "1h",
			},
		);
		await User.updateOne({ tokenId }).where({ id: user.id });
		const response = Response.json({ message: "Login successful" });
		response.headers.set(
			"Set-Cookie",
			`token=${token}; HttpOnly; Path=/; Max-Age=3600;Strict`,
		);
		//todo strict add
		return response;
	} catch (error) {
		console.error("Error during login:", error);
		return Response.json({ message: "Internal Server Error" }, { status: 500 });
	}
}
