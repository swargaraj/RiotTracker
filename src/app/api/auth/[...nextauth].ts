import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/mongodb";
import User, { IUser } from "@/models/User";
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

// Define the user type for session and JWT
interface UserSession {
	id: string;
	email: string;
	name: string;
}

const options: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials || !credentials.email || !credentials.password) {
					throw new Error("Invalid credentials");
				}

				await dbConnect();

				const user = await User.findOne({ email: credentials.email });
				if (user && bcrypt.compareSync(credentials.password, user.password)) {
					// Ensure user._id is converted to a string
					const userId = user._id.toString();
					return {
						id: userId,
						email: user.email,
						name: user.name,
					} as UserSession;
				}
				return null;
			},
		}),
	],
	pages: {
		signIn: "/signIn",
	},
	callbacks: {
		async session({ session, token }) {
			session.user = token.user as UserSession;
			return session;
		},
		async jwt({ token, user }) {
			if (user) {
				token.user = user as UserSession;
			}
			return token;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
};

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
	return NextAuth(req, res, options);
}
