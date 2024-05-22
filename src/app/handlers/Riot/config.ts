
// API Configuration for Riot Games

require('dotenv').config();
import { RiotAPI, RiotAPITypes } from "@fightmegg/riot-api";

const config: RiotAPITypes.Config = {
  debug: true,
  cache: {
    cacheType: "ioredis",
    client: process.env.REDIS_URL || "redis://localhost:6379",
    ttls: {
      byMethod: {},
    },
  },
};

const rAPI = new RiotAPI(process.env.RIOT_API_KEY || '', config);

export default rAPI;
