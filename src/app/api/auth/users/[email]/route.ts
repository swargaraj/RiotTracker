// pages/api/users/[id].ts
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
	console.log("in Id", req.query);
	const { method } = req;

	const { email } = req.query;

	await dbConnect();

		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return NextResponse.json(
				{ message: "User already exists" },
				{ status: 400 },
			);
		}
	// switch (method) {
	// 	case "GET":
	// 		// const user = await User.findOne({ email });
			// if (!user) {
			// 	NextResponse.json({ message: "User not found" }, { status: 404 });
			// 	res.status(404).json({ message: "User not found" });
			// 	return;
			// }
			// NextResponse.json({ users: user }, { status: 200 });

			// break;
		// case "PUT":
		// 	const updatedUser = await User.findByIdAndUpdate(id, req.body, {
		// 		new: true,
		// 		runValidators: true,
		// 	});
		// 	if (!updatedUser) {
		// 		res.status(404).json({ message: "User not found" });
		// 		return;
		// 	}
		// 	res.status(200).json(updatedUser);
		// 	break;
		// case "DELETE":
		// 	const deletedUser = await User.findByIdAndDelete(id);
		// 	if (!deletedUser) {
		// 		res.status(404).json({ message: "User not found" });
		// 		return;
		// 	}
		// 	res.status(200).json({ message: "User deleted" });
		// 	break;
	// 	default:
	// 		res.status(405).end(`Method ${method} Not Allowed`);
	// }
}
