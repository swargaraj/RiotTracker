
// Match Page Handler For League of Legends

"use server"
import rAPI from '@/app/handlers/Riot/config';
import { PlatformId, regionToCluster } from "@fightmegg/riot-api";

export async function getMatch(region: string, matchId: string) {

    try {

        const fullMatchId = region + "_" + matchId
        const cluster = regionToCluster(PlatformId[region]).toUpperCase();

        // Fetch the PUUID using the game name and tag
        const matchInfo = await rAPI.matchV5.getMatchById({
            cluster: PlatformId[cluster],
            matchId: fullMatchId
        });

        return matchInfo;

    } catch (error) {
        return {
            status: 500,
            message: "Internal Server Error."
        };
    }
}