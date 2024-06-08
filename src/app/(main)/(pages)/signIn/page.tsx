"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import router, { useRouter } from "next/router";
import { Button } from "@/components/ui/buttons";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import Navbar from "@/components/global/navbar";
import { Toaster } from "@/components/ui/toastr";

// Define Zod schema
const UserSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});
export default function SignInForm() {
	const form = useForm<z.infer<typeof UserSchema>>({
		resolver: zodResolver(UserSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof UserSchema>) => {
		try {
			console.log(data, "ghujvujvvjgiugjvgjiuhgv bhgjyhcvguy");
			const response = await fetch("/api/auth/signin", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
				// hash and send in body
			});
			console.log(data, response, "testing");
			if (response.ok) {
				const result = await response.json();
				console.log(result);
				toast({
					title: "Login successful",
					description: "Redirecting to your profile...",
				});
				setTimeout(() => {
					window.location.href = "/lol/profile"; // Corrected line
				}, 2000);
			} else {
				let error;
				try {
					error = await response.json();
				} catch (e) {
					error = { message: "An unknown error occurred" };
				}
				console.error("Login failed:", error); // Add this line
				toast({
					title: "Login failed",
					description: error.message,
				});
			}
		} catch (error: any) {
			console.error("Login failed:", error); // Add this line
			toast({
				title: "Login failed",
				description:
					error.message || "An unexpected error occurred. Please try again.",
			});
		}
	};

	return (
		<div className="flex gap-4 items-center justify-center h-full w-full">
			<Navbar />

			<div className="flex flex-col items-center justify-center">
				<h1 className="text-4xl mt-[40px] p-6 bg-background/50 backdrop-blur-lg border-b text-center">
					Sign In
				</h1>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-2/3 space-y-6 mt-[5rem]"
					>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor="email">Email</FormLabel>
									<FormControl>
										<Input
											id="email"
											placeholder="User123@gmail.com"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor="password">Password</FormLabel>
									<FormControl>
										<Input
											id="password"
											placeholder="Password"
											type="password"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit">Submit</Button>
						<Toaster />
					</form>
				</Form>
			</div>
		</div>
	);
}
