var Web3 =  require('web3');

var net = require('net');
var web3 = new Web3("qdata/dd1/geth.ipc", net);

async function checkLastID(){
	//web3.eth.defaultAccount = web3.eth.personal.getAccounts().then(console.log);
	let acc = await web3.eth.personal.getAccounts();
	  if (acc.err) {console.log(acc.err);}
	  else {console.log('Accounts available on this node:\n' + acc);}

	console.log('------------------------------------------');
	var deployerAccount = acc[0];
	console.log('Deploying with account:' + deployerAccount);
	var abi = 
	[
		{
			"inputs": [],
			"name": "checkLastID",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "Docid",
					"type": "uint256"
				}
			],
			"name": "retreiveFull",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "Docid",
					"type": "uint256"
				}
			],
			"name": "retreiveSearch",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "Docid",
					"type": "uint256"
				},
				{
					"internalType": "string",
					"name": "searchJSON",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "fullJSON",
					"type": "string"
				}
			],
			"name": "store",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		}
	];

	var contractAddress = require('./contractAddress.js');
	console.log('Contract Address: ' + contractAddress);

	var myContract = new web3.eth.Contract(abi, contractAddress, {
		from: deployerAccount,
	    gas: 10000000
	});

	console.log('Calling Methods...');

	var Docid = 1;
	myContract.methods.checkLastID().call({
		from: deployerAccount
	}, (err,res) => {
		if (err) {
			console.log(err);
		}else{
			console.log('Last ID:' + res);
		}
	}).then(process.exit);	
}

function Main(){
	checkLastID();
}

Main();
