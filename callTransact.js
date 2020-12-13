var Web3 =  require('web3');

var net = require('net');
var web3 = new Web3("qdata/dd1/geth.ipc", net);

async function invokeContract(){
	//web3.eth.defaultAccount = web3.eth.personal.getAccounts().then(console.log);
	let acc = await web3.eth.personal.getAccounts();
	  if (acc.err) {console.log(acc.err);}
	  else {console.log('Accounts available on this node:\n' + acc);}

	console.log('------------------------------------------');
	var deployerAccount = acc[0];
	console.log('Deploying with account:' + deployerAccount);
	var abi = [
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

	var bytecode = "0x608060405234801561001057600080fd5b5060c68061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c80636057361d146037578063b05784b8146062575b600080fd5b606060048036036020811015604b57600080fd5b8101908080359060200190929190505050607e565b005b60686088565b6040518082815260200191505060405180910390f35b8060008190555050565b6000805490509056fea265627a7a72315820f28000e5ff5baef54cdf92bda5d7954e0188bd89687e561f955be24fca7527e364736f6c634300050b0032";

	var contractAddress = "0xb99d60bf70772c6bf9d2e6679a6b133dac38f973725bb7b5e2f3896c6551762c";

	var myContract = new web3.eth.Contract(abi, contractAddress, {
		from: deployerAccount,
	    gas: 1500000
	});

	myContract.methods.retreive().call({
		from: deployerAccount
	}, (err,res) => {
		if (err) {
			console.log(err);
		}else{
			console.log('Stored value:' + res);
		}
	});	
}

invokeContract();