var Web3 =  require('web3');

var net = require('net');
var web3 = new Web3("qdata/dd1/geth.ipc", net);

async function deployContract(){
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

	var bytecode = "608060405234801561001057600080fd5b50610308806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063131a06801461003b578063b05784b8146100f6575b600080fd5b6100f46004803603602081101561005157600080fd5b810190808035906020019064010000000081111561006e57600080fd5b82018360208201111561008057600080fd5b803590602001918460018302840111640100000000831117156100a257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050610179565b005b6100fe610193565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561013e578082015181840152602081019050610123565b50505050905090810190601f16801561016b5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b806000908051906020019061018f929190610235565b5050565b606060008054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561022b5780601f106102005761010080835404028352916020019161022b565b820191906000526020600020905b81548152906001019060200180831161020e57829003601f168201915b5050505050905090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061027657805160ff19168380011785556102a4565b828001600101855582156102a4579182015b828111156102a3578251825591602001919060010190610288565b5b5090506102b191906102b5565b5090565b5b808211156102ce5760008160009055506001016102b6565b509056fea2646970667358221220153db49bfe2b99db28d8a9b17d08f830f24000d04889b320d1909c3faff5e83764736f6c634300060c0033";

	var myContract = new web3.eth.Contract(abi);

	myContract.deploy({
		data: bytecode
	})
	.send({
		from: deployerAccount,
	    gas: 10000000
	}, function(error, transactionHash){ 
		console.log('Contract sent!!!'); 
	}).on('error', function(error){ 
		console.log('Error sending contract!');
		console.log(error); 
	}).on('transactionHash', function(transactionHash){ 
		console.log('TransactionHash: ' + transactionHash);
	}).on('receipt', function(receipt){
		console.log('Receipt:' + receipt.contractAddress) // contains the new contract address that being used for methods invoke
	}).then(function(newContractInstance){
	    console.log('newContractInstance:' + newContractInstance.options.address);
	}).then(function(successfulMarker){
		console.log('Contract successfully deployed!!');
	}).then(process.exit);
}

deployContract();