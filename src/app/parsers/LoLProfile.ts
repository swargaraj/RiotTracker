"use server"

import { GetPUUID } from "./GetPUUID"
import { RIOT_API_KEY, RIOT_APIS, LOL_RECENT_MATCHES } from './constants';
import axios from 'axios';

export async function LoLProfile(gamename: string, gametag: string) {
  try {

    const result = await GetPUUID(gamename, gametag);

    if (result.status_code === 200) {

      // Logic To Find LoL Information from th puuid
      // Return the final result

      return result;

    } else {
        return { 
          status_code: result.status_code, 
          message: 'Something went wrong' 
      };
    }

  } catch (error) {
    return { 
      status_code: error.response.status, 
      message: 'Something went wrong' 
    };
  }
}
