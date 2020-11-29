//r Contract = require('web3-eth-contract');

// set provider for all later instances to use
//Contract.setProvider('ws://localhost:8546');
a = eth.accounts[0]
web3.eth.defaultAccount = a;

var abi = 
[
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "num",
				"type": "uint256"
			}
		],
		"name": "store",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "retreive",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

var address = "0x41018e28242b36afeddaa3e4cdecc1fbed6729ae6eb9181deec778b72f09a28d";

var simpleContract = web3.eth.contract(abi);
var transact = simpleContract.methods.store(123).send({from: web3.eth.accounts[0]}, function(error, transactionHash){
    console.log(result);
});

/*var transact = simpleContract.methods.retreive(123).call({from: web3.eth.accounts[0]}, function(error, result){
    console.log(result);
});*/