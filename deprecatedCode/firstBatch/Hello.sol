ragma solidity >=0.4.22 <0.6.0;

contract HelloWorld {
    //declare variable
    string saySomething;

    //define value into variable
    constructor() public  {
        saySomething = "Hello World!";
    }

    //return value of variable when user call for 'speak' but no new change to contract
    function speak() public view returns(string memory) {
        return saySomething;
    }

    //re-define value of variable which make new change to the contract
    function saySomethingElse(string memory newSaying) public  returns(bool success) {
        saySomething = newSaying;
        return true;
    }
    
    //re-define value of variable which make new change to the contract
    function otherSay(string memory otherSaying) public  returns(bool success) {
        saySomething = otherSaying;
        return true;
    }
}