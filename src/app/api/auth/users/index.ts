// pages/api/users/index.ts
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { method } = req;

	await dbConnect();

	switch (method) {
		case "GET":
			const users = await User.find({});
			res.status(200).json(users);
			break;
		case "POST":
			const { name, email, password } = req.body;
			const hashedPassword = bcrypt.hashSync(password, 10);
			const user = new User({ name, email, password: hashedPassword });
			await user.save();
			res.status(201).json(user);
			break;
		default:
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}
