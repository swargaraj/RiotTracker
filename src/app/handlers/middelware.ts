import dbConnect from "@/lib/mongodb";
import { response } from "express";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/User";

export async function middleware(request: NextRequest) {
	const token = request.cookies.get("token")?.value;
	console.log(token);
	if (!token) {
		return Response.redirect(new URL("/signin", request.url));
	}
	// jwt decode and user id and token id if matches jwt verify password then go
	await dbConnect();

	const decodedToken = jwt.decode(token);
	if (!decodedToken) {
		return Response.redirect(new URL("/signin", request.url));
	}
	//@ts-expect-error
	const user = await User.findOne({ id: decodedToken.userId });
	if (!user) {
		return Response.redirect(new URL("/signin", request.url));
	}
	//@ts-expect-error
	if (user.tokenId !== decodedToken.id) {
		return Response.redirect(new URL("/signin", request.url));
	}
	const isValid = jwt.verify(token, process.env.JWT_SECRET!);
	if (!isValid) {
		return Response.redirect(new URL("/signin", request.url));
	}
}

export const config = {
	matcher: ["/lol/profile"],
};
