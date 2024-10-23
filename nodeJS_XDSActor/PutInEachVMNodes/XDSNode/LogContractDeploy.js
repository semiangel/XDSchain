var fs = require("fs");
var Web3 =  require('web3');

var net = require('net');
var web3 = new Web3("../data/geth.ipc", net);

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
			"constant": false,
			"inputs": [
				{
					"internalType": "string",
					"name": "logValue",
					"type": "string"
				}
			],
			"name": "storeLog",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"internalType": "uint256",
					"name": "assignedLogID",
					"type": "uint256"
				}
			],
			"name": "readLog",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		}
	];

	var bytecode = "60806040526000805534801561001457600080fd5b50610374806100246000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063b7213bd41461003b578063f2e1d562146100e2575b600080fd5b6100676004803603602081101561005157600080fd5b810190808035906020019092919050505061019d565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100a757808201518184015260208101905061008c565b50505050905090810190601f1680156100d45780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61019b600480360360208110156100f857600080fd5b810190808035906020019064010000000081111561011557600080fd5b82018360208201111561012757600080fd5b8035906020019184600183028401116401000000008311171561014957600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050919291929050505061025a565b005b606080600160008481526020019081526020016000206000018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561024a5780601f1061021f5761010080835404028352916020019161024a565b820191906000526020600020905b81548152906001019060200180831161022d57829003601f168201915b5050505050905080915050919050565b806001600080548152602001908152602001600020600001908051906020019061028592919061029a565b50600080815480929190600101919050555050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106102db57805160ff1916838001178555610309565b82800160010185558215610309579182015b828111156103085782518255916020019190600101906102ed565b5b509050610316919061031a565b5090565b61033c91905b80821115610338576000816000905550600101610320565b5090565b9056fea265627a7a72315820da431d2dc5ec76aa2f3c33cdf445073bb00dcfbb5ab254c6e3faef2ba7bdd31564736f6c634300050b0032";

	var myContract = new web3.eth.Contract(abi);

	myContract.deploy({
		data: bytecode
	})
	.send({
		from: deployerAccount,
	    gas: 24000000
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
	    var msg = 'module.exports = ' + JSON.stringify(newContractInstance.options.address) + ';';
	    fs.writeFileSync("logContractAddress.js", msg);
	}).then(function(successfulMarker){
		console.log('Contract successfully deployed!!');
	}).then(process.exit);
}

deployContract();

