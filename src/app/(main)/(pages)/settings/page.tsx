import { getMatch } from "@/app/handlers/Riot/LoL/getMatch";
import Navbar from "@/components/global/navbar";
import { toast } from "@/components/ui/use-toast";
import { PlatformId } from "@fightmegg/riot-api";
import React from "react";
``;
const SettingsPage = () => {
	return (
		<div className="flex flex-col gap-4 relative">
			<Navbar />
			<h1 className="text-4xl sticky mt-[80px] top-100 z-[10] p-6 bg-background/50 backdrop-blur-lg flex items-center border-b">
				Settings
			</h1>
		</div>
	);
};

export default SettingsPage;
