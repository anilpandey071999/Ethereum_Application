const HDWalletProvider = require('truffle-hdwallet-provider');// helps to connect with rinkeby newtork or anyother public network
const Web3 = require('web3');

const {interface, bytecode} =  require('./compile')
const provider = new HDWalletProvider(
    'labor decide cigar govern suit dirt drama twenty pipe humble video rival',
    'https://rinkeby.infura.io/v3/7a04f5a9200041c8b82445299e76ea16'
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(interface)).deploy({
        data: bytecode
    }).send({
        gas:'1000000',from: accounts[0]
    });

    console.log(interface);
    
    console.log('Contract deployed to ', result.options.address);
}
deploy();
