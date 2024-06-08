// pages/api/users/index.ts
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;
	console.log("inINdex");
	await dbConnect();

	console.log("inINdexget");
	const users = await User.find({});
	return NextResponse.json({ users: users }, { status: 200 });
}
