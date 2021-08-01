const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());// provider which will help us to connect with Web3 to ETH netwok or any other network
const { interface, bytecode } = require('../compile');//trying to the index object which is inside the contracts object which get created at time of compileing


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
    inbox = await new web3.eth.Contract(JSON.parse(interface)).deploy({
        data: bytecode, arguments: ['Hi there!!']
    }).send({ from: accounts[0],gas:'1000000' });
 
});

describe('Inbox', () => {
    it("Deploy a contract", () => {
        console.log(inbox);
        // console.log(accounts)
    });
})