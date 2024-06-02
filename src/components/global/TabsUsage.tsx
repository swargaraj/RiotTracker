"use client";

import Image from "next/image";
import { Tabs } from "../ui/tabs";

export function TabsDemo() {
	const tabs = [
		{
			title: "Overview",
			value: "Overview",
			content: (
				<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-cyan-700">
					<p>Overview</p>
					<Overview />
				</div>
			),
		},
		{
			title: "Champion",
			value: "Champion",
			content: (
				<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-cyan-700">
					<p>Champion Pool</p>
					<Champion />
				</div>
			),
		},
	];

	return (
		<div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start mt-5 mb-[200px]">
			<Tabs tabs={tabs} />
		</div>
	);
}

const Overview = () => {
	return (
		<Image
			src="/League of Legends.jpeg"
			alt="dummy image"
			width="100"
			height="100"
			style={{ objectFit: "contain" }}
			className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
		/>
	);
};

const Champion = () => {
	return (
		<Image
			src="/valo.jpg"
			alt="dummy image"
			width="100"
			height="100"
			style={{ objectFit: "contain" }}
			className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
		/>
	);
};
