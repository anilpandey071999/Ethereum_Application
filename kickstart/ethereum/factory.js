import web3 from "./web3";
import campaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(campaignFactory.interface),
  "0x3a48f71ef3751212d542d3Aed44224Bb813A7DA2"
);

export default instance;
