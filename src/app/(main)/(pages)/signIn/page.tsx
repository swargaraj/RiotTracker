"use client"
// src/app/(main)/(pages)/signIn/page.tsx
import { useEffect, useState } from "react";
import { getCsrfToken } from "next-auth/react";

// Wrap the SignIn component with a Client Component
export default function SignIn() {
	const [csrfToken, setCsrfToken] = useState<string | null>("");

	useEffect(() => {
		const fetchCsrfToken = async () => {
			const token = await getCsrfToken();
			setCsrfToken(token || "");
		};
		fetchCsrfToken();
	}, []);

	return (
		<form
			method="post"
			action="/api/auth/callback/credentials"
		>
			<input
				name="csrfToken"
				type="hidden"
				value={csrfToken || ""}
			/>
			<label>
				Email
				<input
					name="email"
					type="email"
					required
				/>
			</label>
			<label>
				Password
				<input
					name="password"
					type="password"
					required
				/>
			</label>
			<button type="submit">Sign in</button>
		</form>
	);
}
