import web3 from "./web3";
import campaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(campaignFactory.interface),
  "0x247E40f5C489696183b13B5442db66fe4788F233"
);

export default instance;
