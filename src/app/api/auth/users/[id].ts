// pages/api/users/[id].ts
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { method } = req;
	const { id } = req.query;

	await dbConnect();

	switch (method) {
		case "GET":
			const user = await User.findById(id);
			if (!user) {
				res.status(404).json({ message: "User not found" });
				return;
			}
			res.status(200).json(user);
			break;
		case "PUT":
			const updatedUser = await User.findByIdAndUpdate(id, req.body, {
				new: true,
				runValidators: true,
			});
			if (!updatedUser) {
				res.status(404).json({ message: "User not found" });
				return;
			}
			res.status(200).json(updatedUser);
			break;
		case "DELETE":
			const deletedUser = await User.findByIdAndDelete(id);
			if (!deletedUser) {
				res.status(404).json({ message: "User not found" });
				return;
			}
			res.status(200).json({ message: "User deleted" });
			break;
		default:
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}
