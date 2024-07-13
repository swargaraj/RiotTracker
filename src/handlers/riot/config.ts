// API Configuration for Riot Games

require("dotenv").config();
import { RiotAPI, RiotAPITypes } from "@fightmegg/riot-api";

const config: RiotAPITypes.Config = {
  debug: true,
};

const rAPI = new RiotAPI(process.env.RIOT_API_KEY || "", config);

export default rAPI;
