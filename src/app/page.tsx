import HeroSection from "@/components/global/hero-section";
import Navbar from "@/components/global/navbar";
import SearchBar from "@/components/global/search-bar";
import { Button } from "@/components/ui/buttons";
import Search from "@/components/ui/search";
import Image from "next/image";



export default function Home() {
	return (
		<main className="flex items-center justify-center flex-col">
			<Navbar />
      <SearchBar/>
			<HeroSection />
      {/* Welcome To RiotTracker */}
		</main>
	);
}
