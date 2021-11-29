pragma solidity ^0.4.17;

contract campaignFactory{
    address[] public deployedCampaigns;
    struct CampaignDetails{
        address deployedCampaignsAddress;
        string name;
    }
    CampaignDetails[] public campaignDetails;

    function createCampaign(uint minimum, string name) public {
        CampaignDetails memory newCampaignDetails = CampaignDetails({
            deployedCampaignsAddress:new Campaign(minimum, msg.sender,name),
            name: name
        });
        campaignDetails.push(newCampaignDetails);
        // address newCampaign = new Campaign(minimum, msg.sender,name);
        deployedCampaigns.push(newCampaignDetails.deployedCampaignsAddress);
    }
    
    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    string public managerName;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(uint minimum, address creator,string name) public {
        manager = creator;
        managerName = name;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string description, uint value, address recipient) public restricted {
        Request memory newRequest = Request({
           description: description,
           value: value,
           recipient: recipient,
           complete: false,
           approvalCount: 0
        });

        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;
    }
    
    function getSummary() public view returns(
        uint,uint,uint,uint,address,string
        ){
        return (
            minimumContribution,
            address(this).balance,
            requests.length,
            approversCount,
            manager,
            managerName
            );
    }
    
    function getRequistsCount() public view returns(uint) {
        return requests.length;
    }
}