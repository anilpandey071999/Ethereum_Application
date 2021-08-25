import web3 from './web3';
import campaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(campaignFactory.interface),
    '0xC57Dd6b7C819947dD83D4A93e593F2483A8768Fd'
);

export default instance;