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

	var contractAddress = '0x131F110145a704E028BCa7B85EAE33E32f94097C';
	console.log('Contract Address: ' + contractAddress);

	var myContract = new web3.eth.Contract(abi, contractAddress, {
		from: deployerAccount,
	    gas: 1500000
	});

	console.log('Calling Methods...');

	myContract.methods.retreive().call({
		from: deployerAccount
	}, (err,res) => {
		if (err) {
			console.log(err);
		}else{
			console.log('Stored value:' + res);
		}
	}).then(process.exit);	
}

invokeContract();