"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/buttons";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import Navbar from "@/components/global/navbar";
import { Toaster } from "@/components/ui/toaster";

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

	const onSubmit = (data: z.infer<typeof UserSchema>) => {
		console.log("Form Data:", data); // Debugging log
		toast({
			title: "You submitted the following values:",
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
	};

	return (
		<div className="flex gap-4 items-center justify-center h-full w-full">
			<Navbar />

			<div className="flex flex-col items-center justify-center ">
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
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											placeholder="User123@gmail.com"
											{...field}
										/>
									</FormControl>
									<FormDescription></FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											placeholder="Password"
											type="password"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Password should be at least 6 characters
									</FormDescription>
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
