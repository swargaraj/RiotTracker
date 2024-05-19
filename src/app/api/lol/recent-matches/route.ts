import { NextRequest, NextResponse } from 'next/server';
import { RIOT_API_KEY, RIOT_APIS, LOL_RECENT_MATCHES } from '@/app/api/utils/constants';
import axios from 'axios';

export async function GET(req: NextRequest, res: NextResponse) {
    const { searchParams } = new URL(req.url);
    const puuid = searchParams.get('puuid');

    const START_COUNT = parseInt(searchParams.get('start') ?? '0');

    try {

        const response = await axios.get(
            RIOT_APIS.ASIA + LOL_RECENT_MATCHES + puuid + "/ids" + "?start=" + START_COUNT + "&api_key="+ RIOT_API_KEY
        );

                
        if (response.status === 404) {
            return NextResponse.json({ error: 'Data not found' });
        }

        const data = {
            status_code: response.status,
            matches: response.data,
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