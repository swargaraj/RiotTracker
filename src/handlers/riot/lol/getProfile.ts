"use server";

import rAPI from "@/handlers/riot/config";
import { PlatformId, regionToCluster, RiotAPITypes } from "@fightmegg/riot-api";

type AllowedCluster = Exclude<
  RiotAPITypes.Cluster,
  PlatformId.SEA | PlatformId.ESPORTS
>;

const validRegions = Object.values(PlatformId);

export default async function getProfile(
  region: string,
  gameName: string,
  gameTag: string
) {
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

    // Fetch the PUUID using the game name and tag
    const PUUID = await rAPI.account.getByRiotId({
      region: CLUSTER,
      gameName: gameName,
      tagLine: gameTag,
    });

    // Fetch recent match IDs using the player's PUUID
    const recentMatchesId = await rAPI.matchV5.getIdsByPuuid({
      cluster: CLUSTER,
      puuid: PUUID.puuid,
    });

    const recentMatchesInfo = [];

    // Batch requests to find matches in groups of 2
    for (let i = 0; i < recentMatchesId.length; i += 2) {
      const batchMatchIds = recentMatchesId.slice(i, i + 2);
      const batchRequests = batchMatchIds.map((matchId) =>
        rAPI.matchV5.getMatchById({
          cluster: CLUSTER,
          matchId: matchId,
        })
      );

      const batchResults = await Promise.all(batchRequests);
      recentMatchesInfo.push(...batchResults.filter((match) => match !== null));
    }

    return recentMatchesInfo;
  } catch (error) {
    return {
      status: 500,
      message: "Internal Server Error.",
    };
  }
}
