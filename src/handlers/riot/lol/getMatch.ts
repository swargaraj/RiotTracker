// Match Page Handler For League of Legends

"use server";

import rAPI from "@/handlers/riot/config";

import { PlatformId, regionToCluster, RiotAPITypes } from "@fightmegg/riot-api";

type AllowedCluster = Exclude<
  RiotAPITypes.Cluster,
  PlatformId.SEA | PlatformId.ESPORTS
>;

const validRegions = Object.values(PlatformId);

export default async function getMatch(region: string, matchId: string) {
  try {
    if (!validRegions.includes(PlatformId[region as keyof typeof PlatformId])) {
      return {
        status: 400,
        message: "Invalid region.",
      };
    }

    const cluster: RiotAPITypes.Cluster = regionToCluster(
      PlatformId[region as keyof typeof PlatformId] as RiotAPITypes.LoLRegion
    );

    if (cluster === PlatformId.SEA || cluster === PlatformId.ESPORTS) {
      return {
        status: 400,
        message: "Invalid cluster.",
      };
    }

    const CLUSTER: AllowedCluster = cluster as AllowedCluster;

    const fullMatchId = region + "_" + matchId;

    // Fetch the PUUID using the game name and tag
    const matchInfo = await rAPI.matchV5.getMatchById({
      cluster: CLUSTER,
      matchId: fullMatchId,
    });

    return matchInfo;
  } catch (error) {
    return {
      status: 500,
      message: "Internal Server Error.",
    };
  }
}
