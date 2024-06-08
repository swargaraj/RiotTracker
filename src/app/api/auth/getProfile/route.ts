import { NextRequest } from 'next/server';
import { PlatformId, RiotAPITypes, regionToCluster } from '@fightmegg/riot-api';
import rAPI from '@/app/handlers/Riot/config';

async function getProfile(
    region: RiotAPITypes.LoLRegion,
    gameName: string,
    gameTag: string
) {
    try {
        if (!region) {
            return new Response(JSON.stringify({ message: "Invalid Region" }), { status: 400 });
        }

        const cluster = regionToCluster(region);
        if (cluster === PlatformId.SEA || cluster === PlatformId.ESPORTS) {
            return new Response(JSON.stringify({ message: "Invalid cluster" }), { status: 400 });
        }

        const PUUID = await rAPI.account.getByRiotId({
            region: cluster,
            gameName: gameName,
            tagLine: gameTag,
        });

        const recentMatchesId = await rAPI.matchV5.getIdsByPuuid({
            cluster: cluster,
            puuid: PUUID.puuid,
        });

        const recentMatchesInfo = [];

        for (let i = 0; i < recentMatchesId.length; i += 2) {
            const batchMatchIds = recentMatchesId.slice(i, i + 2);
            const batchRequests = batchMatchIds.map((matchId) =>
                rAPI.matchV5.getMatchById({ cluster: cluster, matchId: matchId }),
            );

            const batchResults = await Promise.all(batchRequests);
            recentMatchesInfo.push(...batchResults.filter((match) => match !== null));
        }

        return new Response(JSON.stringify(recentMatchesInfo), { status: 200 });
    } catch (error) {
        console.error("Error during profile retrieval:", error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { region, gameName, gameTag } = await req.json();

        if (!region || !gameName || !gameTag) {
            return new Response(
                JSON.stringify({ message: "Region, game name, and game tag are required" }),
                { status: 400 }
            );
        }

        const profileResponse = await getProfile(region, gameName, gameTag);
        const profileData = await profileResponse.json();

        return new Response(JSON.stringify(profileData), { status: profileResponse.status });
    } catch (error) {
        console.error("Error during request handling:", error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}
