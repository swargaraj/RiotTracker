
// Profile Page Handler For League of Legends

"use server"
import rAPI from '@/app/handlers/Riot/config';
import { PlatformId, regionToCluster } from "@fightmegg/riot-api";

export async function getProfile(region: string, gameName: string, gameTag: string) {

    try {

        // Checking if region entered is valid. Else return Invalid Region
        if (!PlatformId.hasOwnProperty(region)) {

            console.log("Invalid Region")

            return {
                status: 400,
                message: "Invalid Region"
            };
        }

        const cluster = regionToCluster(PlatformId[region]).toUpperCase();

        // Fetch the PUUID using the game name and tag
        const PUUID = await rAPI.account.getByRiotId({
            region: PlatformId[cluster],
            gameName: gameName,
            tagLine: gameTag,
        });


        // Fetch recent match IDs using the player's PUUID
        const recentMatchesId = await rAPI.matchV5.getIdsByPuuid({
            cluster: PlatformId[cluster],
            puuid: PUUID.puuid,
        });

        const recentMatchesInfo = [];

        // Batch requests to find matches in groups of 2
        for (let i = 0; i < recentMatchesId.length; i += 2) {
            const batchMatchIds = recentMatchesId.slice(i, i + 2);
            const batchRequests = batchMatchIds.map(matchId => rAPI.matchV5.getMatchById({ cluster: PlatformId[cluster], matchId: matchId }));

            const batchResults = await Promise.all(batchRequests);
            recentMatchesInfo.push(...batchResults.filter(match => match !== null));
        }

        return recentMatchesInfo;

    } catch (error) {
        return {
            status: 500,
            message: "Internal Server Error."
        };
    }
}