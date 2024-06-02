"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/router";
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
	const router = useRouter();

	const form = useForm<z.infer<typeof UserSchema>>({
		resolver: zodResolver(UserSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof UserSchema>) => {
		const response = await fetch("/api/auth/signin", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (response.ok) {
			const result = await response.json();
			toast({
				title: "Login successful",
				description: "Redirecting to your profile...",
			});
			router.push("/lol/profile");
		} else {
			const error = await response.json();
			toast({
				title: "Login failed",
				description: error.message,
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
