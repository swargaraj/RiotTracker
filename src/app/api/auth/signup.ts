import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import mongooseMiddleware from "@/app/handlers/mongooseMiddleware";
import { Request, Response } from "express"; // Import Request and Response types from Express.js

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method Not Allowed" });
	}

	const { name, email, password } = req.body;

	// Perform basic validation
	if (!name || !email || !password) {
		return res
			.status(400)
			.json({ message: "Name, email, and password are required" });
	}

	// Validate email format
	if (!validator.isEmail(email)) {
		return res.status(400).json({ message: "Invalid email format" });
	}

	try {
		await dbConnect();

		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create a new user
		const newUser = new User({ name, email, password: hashedPassword });
		await newUser.save();

		return res.status(201).json({ message: "Signup successful" });
	} catch (error: any) {
		// Handle Mongoose validation errors
		if (error.name === "ValidationError") {
			// Manually cast NextApiRequest to Request
			const expressReq = req as unknown as Request;
			const expressRes = res as unknown as Response; // Create custom response object
			return mongooseMiddleware(error, expressReq, expressRes, () => {});
		}

		console.error("Error signing up:", error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
}
