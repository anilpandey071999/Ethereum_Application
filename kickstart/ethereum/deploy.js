const HDWalletProvider = require("truffle-hdwallet-provider"); // helps to connect with rinkeby newtork or anyother public network
const Web3 = require("web3");
const campiledFactory = require("./build/CampaignFactory.json");

const provider = new HDWalletProvider(
  "there sentence valid thumb poem other next language car voyage filter gasp",
  "https://rpc.ankr.com/avalanche_fuji"
);
const web3 = new Web3(provider);
let deploy
try {
  
   deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    const result = await new web3.eth.Contract(
      JSON.parse(campiledFactory.interface)
    ).deploy({
        data: campiledFactory.bytecode,
      })
      .send({ gas: "5000000", from: accounts[0], gasPrice: "5000000000", chainId: 43113 });
  
    console.log("Contract deployed to ", result.options.address);
  };
} catch (error) {
  console.log(error);
}
deploy();
