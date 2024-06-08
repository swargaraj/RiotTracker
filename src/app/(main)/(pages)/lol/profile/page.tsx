"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
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
import Navbar from "@/components/global/navbar";
import { toast } from "@/components/ui/use-toast";
import Image from "next/image";
import { TabsDemo } from "@/components/global/TabsUsage";

const ProfileSchema = z.object({
	region: z.string(),
	gameName: z.string().nonempty("Game Name is required"),
	gameTag: z.string().nonempty("Game Tag is required"),
});

type FormData = z.infer<typeof ProfileSchema>;

export default function ProfileForm() {
	const form = useForm<FormData>({
		resolver: zodResolver(ProfileSchema),
		defaultValues: {
			region: "na1",
			gameName: "",
			gameTag: "",
		},
	});

	const onSubmit: SubmitHandler<FormData> = (data) => {
		fetch("/api/auth/getProfile", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((response) =>
				response.json().then((data) => ({ status: response.status, data })),
			)
			.then(({ status, data }) => {
				if (status === 200) {
					toast({
						title: "Profile Data",
						description: (
							<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
								<code className="text-white">
									{JSON.stringify(data, null, 2)}
								</code>
							</pre>
						),
					});
				} else {
					toast({
						title: "Error",
						description: data.message,
					});
				}
			})
			.catch((error) => {
				console.error("Error:", error);
				toast({
					title: "Error",
					description: "Internal Server Error.",
				});
			});
	};

	return (
		<div className="flex gap-4 items-center justify-center h-full w-full">
			<Navbar />

			<div className="flex w-full flex-col items-center justify-center">
				<h1 className="text-4xl w-full mt-[40px] p-6 bg-background/50 backdrop-blur-lg border-b text-center">
					Profile Form
				</h1>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-2/3 space-y-6 mt-[5rem]"
					>
						<FormField
							control={form.control}
							name="region"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Region</FormLabel>
									<FormControl>
										<Input
											placeholder="Region"
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
							name="gameName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Game Name</FormLabel>
									<FormControl>
										<Input
											placeholder="Game Name"
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
							name="gameTag"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Game Tag</FormLabel>
									<FormControl>
										<Input
											placeholder="Game Tag"
											{...field}
										/>
									</FormControl>
									<FormDescription></FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit">Get Profile</Button>
					</form>
				</Form>

				<div className="flex w-[90%] mt-10 flex-col">
					<div className="w-full flex justify-start items-center gap-10">
						<div className="w-[6rem] h-[6rem]">
							<Image
								src="/hideinthebush.png"
								alt="Profile"
								width={288}
								height={288}
								className="shadow-[0_0px_60px_-15px] shadow-slate-500 rounded-full"
							/>
							<div className="h-[6rem] relative translate-x-[-17%] translate-y-[-35.5%] w-[6rem] flex bg-black clipPath top-[-62px] left-[16px] rounded-[100%]">
								<small className="self-end flex my-0 mx-auto text-white text-[0.7rem]">
									120
								</small>
							</div>
						</div>
						<div className="w-full flex justify-start items-center gap-3">
							<h1 className="font-bold">Hïde ïn bush</h1>
							<h2>#NA1</h2>
						</div>
					</div>
					<div>
						<TabsDemo />
					</div>
				</div>
			</div>
		</div>
	);
}
