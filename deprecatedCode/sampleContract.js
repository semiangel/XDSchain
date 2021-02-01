var Web3 = require('web3');
var net = require('net');
var web3 = new Web3(new Web3.providers.IpcProvider("/home/pcep/my-eth-chain/myDataDir/geth.ipc", net));
console.log('SetProvider checked...');
//console.log(web3);
/*
// solidity code code
var source = "" +
"pragma solidity ^0.4.6;" +
"contract test {\n" +
"   function multiply(uint a) constant returns(uint d) {\n" +
"       return a * 7;\n" +
"   }\n" +
"}\n";

console.log('source checked');
console.log(source);

var compiled = web3.eth.compile.solidity(source, function(err, result) {
    if(err) {
        console.log('Unknown Error');
        return;
    }
      // Otherwise, log the file contents
      console.log(result);
      return result;
})
console.log(compiled);
console.log('eth compile checked');

var code = compiled.code;
// contract json abi, this is autogenerated using solc CLI
console.log('received compiled code');
*/

//var abi = compiled.info.abiDefinition;
var abi = [
    {
        "constant": true,
        "inputs": [
            {
                "name": "a",
                "type": "uint256"
            }
        ],
        "name": "multiply",
        "outputs": [
            {
                "name": "d",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];
console.log('Retrieved abiDefinition...');
console.log('=========================================');
console.log(abi);
console.log('=========================================');

var myContract;
console.log('Declared myContract variable...');

console.log('Beginning function...');

//console.log('web3.eth.defaultAccount: ' + web3.eth.defaultAccount);

function createExampleContract() {
    // hide create button
    //document.getElementById('create').style.visibility = 'hidden'; 
    //document.getElementById('code').innerText = code;
    // let's assume that coinbase is our account
    //web3.eth.defaultAccount = web3.eth.coinbase(callback(err, result) {
    web3.eth.coinbase(callback(err, result) { web3.eth.defaultAccount = result });
    // create contract
    //document.getElementById('status').innerText = "transaction sent, waiting for confirmation";
    console.log('transaction sent, waiting for confirmation');
    web3.eth.contract(abi).new({data: code}, function (err, contract) {
        if(err) {
            console.error(err);
            return;
        // callback fires twice, we only want the second call when the contract is deployed
        } else if(contract.address){
            myContract = contract;
            console.log('address: ' + myContract.address);
            //document.getElementById('status').innerText = 'Mined!';
            console.log('Mined!');
            //document.getElementById('call').style.visibility = 'visible';
            console.log('visible');
        }
    });
}
/*function callExampleContract() {
    // this should be generated by ethereum
    var param = parseInt(document.getElementById('value').value);
    // call the contract
    var res = myContract.multiply(param);
    document.getElementById('result').innerText = res.toString(10);
}*/

console.log('Calling function...');

createExampleContract();
//callExampleContract();