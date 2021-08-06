pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;
    
    function Lottery() public {
        //msg has detail about the account, transaction and call
        //msg variable not need to be decler the variablen its directly made avaliable to us from in to the program by solidity
        // we have access to msg function throught out all the functions
        manager = msg.sender;//msg.sender is globle variable which cantains the  information about who just sent function invitation
    } 
    
    function getPlayers() public view returns (address[]) {
        return players;
    }    

    function enter() public payable{
        require(msg.value > .01 ether);
        players.push(msg.sender);
    }
    
    function random() private view returns (uint) {
        return uint(keccak256(block.difficulty, block.timestamp, players));
    } 
    
    function pickPlayer() public restricted{
        uint i = random() % players.length;
        players[i].transfer(this.balance);
        players = new address[](0);// reseting the players arr by assing it to new arr of size of 0
    }
    
    modifier restricted() { // modifier can is used for repited code in our contracts
        require(msg.sender == manager);
        _;// it's trigers functions code which ever the modifier function is called 
    }
}