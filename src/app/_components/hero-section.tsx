"use client";

import Image from "next/image";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

import Games from "@/lib/games";

const HeroSection = () => {
  return (
    <div className="flex flex-wrap gap-[30px] py-[100px] justify-center">
      {Games.map((game) => (
        <CardContainer key={game.id} className="inter-var">
          <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[15rem]     h-[442px] rounded-xl p-6 border">
            <CardItem translateZ="100" className="w-full mt-4">
              <Image
                src={game.thumbnail}
                alt={game.name}
                height="1000"
                width="1000"
                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              />
            </CardItem>
            <div className="flex justify-between items-center mt-20">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white"
              >
                {game.name}
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
      ))}
    </div>
  );
};
export default HeroSection;
