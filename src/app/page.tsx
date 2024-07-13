import SearchBar from "@/app/_components/search-bar";
import HeroSection from "@/app/_components/hero-section";

export default function Home() {
  return (
    <>
      <main className="flex items-center flex-1 justify-center flex-col dark:bg-gray-900 bg-white">
        {/* <SearchBar/> */}
        <HeroSection />
        {/* Welcome To RiotTracker */}
      </main>
    </>
  );
}
