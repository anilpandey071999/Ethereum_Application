import web3 from "./web3";
import campaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(campaignFactory.interface),
  // "0x3cb9d59686294Cb1A68B2A37a9f6f688aEcB1125"
  "0xa2a5Dd944c04865d1fa117a6B235619F8aE0F0A9"
);

export default instance;
