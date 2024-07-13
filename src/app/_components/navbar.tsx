import Link from "next/link";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";

import { ThemeButton } from "@/components/global/theme-button";

const Header = () => {
  //   const comingSoon = () => (
  //     <TooltipProvider>
  //       <Tooltip delayDuration={0}>
  //         <TooltipTrigger>
  //           <Link className="flex w-max" href="#">
  //             League of Legends
  //           </Link>
  //         </TooltipTrigger>
  //         <TooltipContent>
  //           <p>Coming Soon</p>
  //         </TooltipContent>
  //       </Tooltip>
  //     </TooltipProvider>
  //   );
  return (
    <header className="fixed right-0 left-0 top-0 px-4 py-2 dark:bg-black/40 backdrop-blur-lg z-[100] flex items-center border-b-[1px] border-none justify-between">
      <aside className="flex items-center gap-[2px]">
        <p className=" text-3xl font-bold">Sta</p>
        <Image
          src="/icon.webp"
          width={15}
          height={15}
          alt="fuzzi logo"
          className="shadow-sm"
        />
        <p className="text-3xl font-bold">Tzz</p>
      </aside>
      <nav className="flex w-[80%] overflow-x-scroll ">
        <ul className="flex items-center align-middle list-none">
          <li className=" hover:bg-slate-700 px-4 cursor-pointer">
            <Link href="#">Valorant</Link>
          </li>
          <Separator />
          <li className=" hover:bg-slate-700  px-4 cursor-pointer">
            <Link href="#">Counter-Strike 2</Link>
          </li>
        </ul>
      </nav>
      <aside className="flex items-center gap-4">
        <ThemeButton />
      </aside>
    </header>
  );
};

export default Header;
