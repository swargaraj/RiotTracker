import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // Import JWT for token handling
import { NextResponse } from "next/server";

async function readStream(stream: ReadableStream<Uint8Array>): Promise<string> {
	const reader = stream.getReader();
	const decoder = new TextDecoder();
	let result = "";

	while (true) {
		const { done, value } = await reader.read();
		if (done) break;
		result += decoder.decode(value, { stream: true });
	}

	result += decoder.decode(); // flush the stream
	return result;
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "POST") {
		return NextResponse.json(
			{ message: "Method Not Allowed" },
			{ status: 405 },
		);
	}

	let body;
	try {
		const rawBody = await readStream(req.body); // Read the stream
		body = JSON.parse(rawBody); // Parse the JSON body
	} catch (error) {
		return NextResponse.json(
			{ message: "Invalid request body" },
			{ status: 400 },
		);
	}
	const { name, email, password } = body;

	// Perform basic validation
	if (!name || !email || !password) {
		return NextResponse.json(
			{ message: "Name, email, and password are required" },
			{ status: 400 },
		);
	}

	// Validate email format
	if (!validator.isEmail(email)) {
		return NextResponse.json(
			{ message: "Invalid email format" },
			{ status: 400 },
		);
	}

	try {
		await dbConnect();

		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return NextResponse.json(
				{ message: "User already exists" },
				{ status: 400 },
			);
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create a new user
		const newUser = new User({ name, email, password: hashedPassword });
		await newUser.save();

		return NextResponse.json({ message: "Signup successful" }, { status: 201 });
	} catch (error: any) {
		console.error("Error signing up:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
