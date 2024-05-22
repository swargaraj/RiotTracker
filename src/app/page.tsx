import Footer from "@/components/global/footer";
import HeroSection from "@/components/global/hero-section";
import Navbar from "@/components/global/navbar";
import SearchBar from "@/components/global/search-bar";
import { Button } from "@/components/ui/buttons";
import Search from "@/components/ui/search";
import Image from "next/image";

export default function Home() {
	return (
		<>
			<main className="flex items-center flex-1 justify-center flex-col dark:bg-gray-900 bg-white">
				<Navbar />
				{/* <SearchBar/> */}
				<HeroSection />
				{/* Welcome To RiotTracker */}
			</main>
			<Footer />
		</>
	);
}
