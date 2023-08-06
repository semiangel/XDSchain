var Web3 = require('web3');
var net = require('net');
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

web3.eth.defaultAccount = web3.eth.accounts[0];

var testContract = web3.eth.contract([{
    "constant":true,
    "inputs":[{"name":"a","type":"uint256"}],
    "name":"multiply",
    "outputs":[{"name":"d","type":"uint256"}],
    "payable":false,
    "stateMutability":"view",
    "type":"function"
}]);
var test = testContract.new(
   {
     from: web3.eth.accounts[0], 
     data: '0x608060405234801561001057600080fd5b5060bb8061001f6000396000f300608060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b348015604f57600080fd5b50606c600480360381019080803590602001909291905050506082565b6040518082815260200191505060405180910390f35b60006007820290509190505600a165627a7a72305820c41116d9e8ba3292543ebd85e80b8fcc6dd7621eee66617724112427739b5da90029', 
     gas: '4700000'
   }, function (e, contract){
    //console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' + contract.address);
         console.log('transactionHash: ' + contract.transactionHash);
    }
 });
//console.log(test);
var testing = testContract.at('0xd6e7dfea7d5ccf644660a4448d62763d86b4973f');
console.log(testing.multiply(3));
