import { NextRequest, NextResponse } from 'next/server';
import { RIOT_API_KEY, RIOT_APIS, RIOT_GET_PUUID } from '@/app/api/utils/constants';
import axios from 'axios';

export async function GET(req: NextRequest, res: NextResponse) {
    const { searchParams } = new URL(req.url);
    const gamename = searchParams.get('gamename');
    const gametag = searchParams.get('gametag');

    try {
        const response = await axios.get(
            RIOT_APIS.ASIA + RIOT_GET_PUUID + gamename + "/" + gametag + "?api_key="+RIOT_API_KEY
        );
                
        if (response.status === 404) {
            return NextResponse.json({ error: 'Data not found' });
        }

        const data = {
            status_code: response.status,
            puuid: response.data.puuid,
            game_name: response.data.gameName,
            tag_line: response.data.tagLine
        };

        return NextResponse.json(data);

    } catch (error: any) {
        if (error.response && error.response.status === 404) {

            return NextResponse.json({ 
                status_code: error.response.status, 
                message: 'No results found for player with specified riot id' 
            });

        } else {
            return NextResponse.json({ 
                status_code: error.response.status, 
                message: 'Something went wrong' 
            });
        }
    }
}