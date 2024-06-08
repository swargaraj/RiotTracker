"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
	name: z.string().nonempty(),
	email: z.string().email(),
	password: z.string().min(6),
});

interface Props {
	user: {
		name: string;
		email: string;
		password: string;
	} | null;
}

export default function InputForm({ user }: Props) {
	const form = useForm<z.infer<typeof UserSchema>>({
		resolver: zodResolver(UserSchema),
		defaultValues: {
			name: user?.name || "",
			email: user?.email || "",
			password: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof UserSchema>) => {
		console.log("Form Data:", data); // Debugging log
		try {
			const response = await fetch("/api/auth/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: data.email,
					name: data.name,
					password: data.password,
				}),
			});

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const responseData = await response.json();
			console.log(responseData);

			toast({
				title: "You submitted the following values:",
				description: (
					<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
						<code className="text-white">{JSON.stringify(data, null, 2)}</code>
					</pre>
				),
			});
		} catch (error) {
			console.error("Error submitting form:", error);
			toast({
				title: "Error submitting form",
				description: String(error),
			});
		}
	};

	return (
		<div className="flex gap-4 items-center justify-center h-full w-full">
			<Navbar />
			<div className="flex flex-col items-center justify-center">
				<h1 className="text-4xl mt-[40px] p-6 bg-background/50 backdrop-blur-lg border-b text-center">
					Sign In Into The New World
				</h1>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-2/3 space-y-6 mt-[5rem]"
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor="name">Name</FormLabel>
									<FormControl>
										<Input
											id="name"
											placeholder="User"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
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
					</form>
				</Form>
			</div>
			<Toaster />
		</div>
	);
}
