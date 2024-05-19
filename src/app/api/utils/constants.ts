require('dotenv').config();

/// RIOT APIS ///

export const RIOT_API_KEY = process.env.RIOT_API_KEY

// API REGIONS
export const RIOT_APIS = {
    ASIA: 'https://asia.api.riotgames.com',
    AMERICAS: 'https://americas.api.riotgames.com',
    EUROPE: 'https://europe.api.riotgames.com',
    ESPORTS: 'https://esports.api.riotgames.com',
    SEAI: 'https://sea.api.riotgames.com'
};

// ACCOUNTS ENDPOINTS
export const RIOT_GET_PUUID = '/riot/account/v1/accounts/by-riot-id/';

// LEAGUES OF LEGENDS ENDPOINTS
export const LOL_RECENT_MATCHES = '/lol/match/v5/matches/by-puuid/';
export const LOL_MATCH_INFO = '/lol/match/v5/matches/';

// VALORANT ENDPOINTS