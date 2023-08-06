var Web3 =  require('web3');

var net = require('net');
var web3 = new Web3("qdata/dd1/geth.ipc", net);

async function invokeContract(myCallback){
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
			"inputs": [
				{
					"internalType": "string",
					"name": "receivedJSON",
					"type": "string"
				}
			],
			"name": "store",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "retreive",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	];

	var contractAddress = '0xF6D52ffFD88ba7188A7F06BE4B636Bc650a50945';
	console.log('Contract Address: ' + contractAddress);

	var myContract = new web3.eth.Contract(abi, contractAddress, {
		from: deployerAccount,
	    gas: 10000000
	});

	console.log('Calling Methods...');

	myContract.methods.retreive().call({
		from: deployerAccount
	}, (err,res) => {
		if (err) {
			console.log(err);
		}else{
			console.log('Stored value:');
			myCallback(res);
		}
	}).then(process.exit);	
}

function changeStringToXML(stringMessage) {
	console.log(stringMessage);
	console.log('---------------------------');
	var XDSattributes = JSON.parse(stringMessage);
	console.log(XDSattributes.DocumentEntry.author);
}

function Main(){
	invokeContract(changeStringToXML);
}

Main();
