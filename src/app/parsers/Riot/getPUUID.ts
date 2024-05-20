"use server"

import { RIOT_API_KEY, RIOT_APIS, RIOT_GET_PUUID } from '@/app/parsers/constants';
import axios from 'axios';

export async function getPUUID(gamename: string, gametag: string) {

    try {
        const response = await axios.get(
            RIOT_APIS.ASIA + RIOT_GET_PUUID + gamename + "/" + gametag + "?api_key="+RIOT_API_KEY
        );

        if (response.status === 200) {
            const data = {
                status: response.status,
                puuid: response.data.puuid,
                gameName: response.data.gameName,
                tagLine: response.data.tagLine
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
    