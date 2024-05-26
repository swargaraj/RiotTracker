"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import User from "@/models/User";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/buttons";
import { Loader2 } from "lucide-react";

// Define interface for props
interface Props {
	user: {
		name: string;
		email: string;
	} | null; // Update the type of user to allow null
	onUpdate: (name: string) => void;
}

// Define Zod schema
const UserSchema = z.object({
	name: z.string().nonempty(),
	email: z.string().email(),
	password: z.string().min(6), // Adjust minimum password length as needed
});

// Define interface for form values based on Zod schema
interface FormValues {
	name: string;
	email: string;
	password: string;
}

const ProfileForm = ({ user, onUpdate }: Props) => {
	const [isLoading, setIsLoading] = useState(false);

	// useForm now uses FormValues interface instead of z.infer<typeof User>
	const form = useForm<FormValues>({
		mode: "onChange",
		resolver: zodResolver(UserSchema),
		defaultValues: {
			name: user && user.name ? user.name : "",
			email: user && user.email ? user.email : "",
			password: "", // Provide a default value for the password if needed
		},
	});

	const handleSubmit = async (values: FormValues) => {
		setIsLoading(true);
		await saveUserSettings(values); // Call saveUserSettings function
		setIsLoading(false);
	};

	const saveUserSettings = async (values: FormValues) => {
		try {
			// Perform API request to save user settings
			const response = await fetch("/api/auth/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			});

			if (!response.ok) {
				throw new Error("Failed to save user settings");
			}

			// Call onUpdate callback if user settings are successfully saved
			onUpdate(values.name);
      window.location.href = "/signin";
		} catch (error) {
			console.error("Error saving user settings:", error);
		}
	};

	useEffect(() => {
		if (user) {
			form.reset({ name: user.name, email: user.email });
		}
	}, [user]);

	return (
		<Form {...form}>
			<form
				className="flex flex-col gap-6"
				onSubmit={form.handleSubmit(handleSubmit)}
			>
				<FormField
					disabled={isLoading}
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-lg">User full name</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="Name"
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
							<FormLabel className="text-lg">Email</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="Email"
									type="email"
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
							<FormLabel className="text-lg">Password</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="Password"
									type="Password"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					className="self-start hover:bg-[#2F006B] hover:text-white "
				>
					{isLoading ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Saving
						</>
					) : (
						"Save User Settings"
					)}
				</Button>
			</form>
		</Form>
	);
};

export default ProfileForm;
