const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());// provider which will help us to connect with Web3 to ETH netwok or any other network
const { interface, bytecode } = require('../compile');//trying to the index object which is inside the contracts object which get created at time of compileing
// interface is javascript ABI and bytecode is row compiled contracts 

//****************************Sempile Test Example****************************//
// class Car {
//     park() {
//         return 'stopped';
//     }

//     drive() {
//         return 'vroom';
//     }
// }
// let car;

// beforeEach(() => {// beforeEach will run every time before runing test funcation in describe
//     car = new Car(); 
// });

// describe('Car', () => {
//     it('Test Park', () => {
//         assert.strictEqual(car.park(), 'stopped');
//     });

//     it('test drive', ()=>{
//         assert.strictEqual(car.drive(), "vroom");
//     });
// });
let accounts;
let inbox;

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // Use One of those account to deploy
    // the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))// interface contain the detail of the function of our contracts json objrct
    .deploy({// deploy create the json object of the contracts 
        data: bytecode, arguments: ['Hi there!!']
    }).send({ // send is the function which deploys the contracts on the network 
         from: accounts[0],gas:'1000000'
    });
 
});

describe('Inbox', () => {
    it("Deploy a contract", () => {
        // console.log(inbox);
        assert.ok(inbox.options.address);// assert.ok is checking for the if inbox.options.address has address of contract on the network
        // console.log(accounts)
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.ok(message, 'Hi there!!');
    });

    it('can change the message',async () => {
        await inbox.methods.setMessage("Hello Bitch!!").send({ from: accounts[0]});
        const message = await inbox.methods.message().call();
        assert.ok(message, "Hello Bitch!!");
    });
})
