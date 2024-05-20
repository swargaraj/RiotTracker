"use server"

import { getPUUID } from "../getPUUID"
import { RIOT_API_KEY, RIOT_APIS, LOL_MATCH_INFO } from '@/app/parsers/constants';
import axios from 'axios';

export async function getLoLMatchInfo(matchid: string) {
  try {

    const response = await axios.get(
        RIOT_APIS.ASIA + LOL_MATCH_INFO + matchid + "?api_key="+RIOT_API_KEY
    );
  
    if (response.status === 200) {

        const data = {
            status: response.status,
            info: response.data,
        };

      return data;

    } else {
        return { 
          status: response.status, 
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
