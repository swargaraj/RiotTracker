import Navbar from "@/components/global/navbar";
import React from "react";

const DashboardPage = () => {
	return (
		<div className="flex flex-col gap-4 relative">
			<Navbar />
			<h1 className="text-4xl sticky mt-[80px] top-100 z-[10] p-6 bg-background/50 backdrop-blur-lg flex items-center border-b">
				Dashboard
			</h1>
		</div>
	);
};

export default DashboardPage;
