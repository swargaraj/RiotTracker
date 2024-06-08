// Match Page Handler For League of Legends

"use server";
import rAPI from "@/app/handlers/Riot/config";
import { PlatformId, RiotAPITypes, regionToCluster } from "@fightmegg/riot-api";

export async function getMatch(
	region: RiotAPITypes.LoLRegion,
	matchId: string,
) {
	try {
		const fullMatchId =  matchId;
		const cluster = regionToCluster(region);
		if (cluster == PlatformId.ESPORTS) {
			return { status: 400, message: "Invalid cluster" };
		}
		// Fetch the PUUID using the game name and tag
		const matchInfo = await rAPI.matchV5.getMatchById({
			cluster: cluster,
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