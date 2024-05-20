"use server"

import { RIOT_API_KEY, RIOT_APIS, RIOT_GET_PUUID } from './constants';
import axios from 'axios';

export async function GetPUUID(gamename: string, gametag: string) {

    try {
        
        const response = await axios.get(
            RIOT_APIS.ASIA + RIOT_GET_PUUID + gamename + "/" + gametag + "?api_key="+RIOT_API_KEY
        );
        
        const data = {
            status_code: response.status,
            puuid: response.data.puuid,
            gamename: response.data.gameName,
            gametag: response.data.tagLine
        };

        return data;
    } catch (error) {
        return {
            status_code: error.response.status, 
            message: 'Something went wrong' 
        };
    }

}