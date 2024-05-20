"use server"

import { getPUUID } from "../getPUUID"
import { getLoLMatches } from "./getLoLMatches"
import { getLoLMatchInfo } from "./getLoLMatchInfo"

export async function LoLProfile(gamename: string, gametag: string) {
  try {

    const result = await getPUUID(gamename, gametag);
   
    if ('puuid' in result) {
      
      const puuid = result.puuid;
      const match_ids = await getLoLMatches(puuid, 0);

      if ("list" in match_ids) {
        
        const matches = match_ids.list;

        const data = {
          puuid: puuid,
          gamename: gamename,
          gametag: gametag,
          matches: matches
        };
  
        return data;

      }
    } else {
        return { 
          status: result.status, 
          message: 'Something went wrong' 
      };
    }


  } catch (error: unknown) {
    if (error instanceof Error) {
        return {
          status: 500,
          message: error.message
        };
      }
      
      // Log The Issue
      
      return {
        status: 500,
        message: "Internal Server Error."
      };
    }
}
