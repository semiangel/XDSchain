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

	var bytecode = "60806040526000805534801561001457600080fd5b506105f4806100246000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806317cd02101461005157806384e86008146101ad578063ba68deff14610254578063cb5566a0146102fb575b600080fd5b6101ab6004803603606081101561006757600080fd5b81019080803590602001909291908035906020019064010000000081111561008e57600080fd5b8201836020820111156100a057600080fd5b803590602001918460018302840111640100000000831117156100c257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561012557600080fd5b82018360208201111561013757600080fd5b8035906020019184600183028401116401000000008311171561015957600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050610319565b005b6101d9600480360360208110156101c357600080fd5b81019080803590602001909291905050506103a7565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156102195780820151818401526020810190506101fe565b50505050905090810190601f1680156102465780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102806004803603602081101561026a57600080fd5b810190808035906020019092919050505061045f565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156102c05780820151818401526020810190506102a5565b50505050905090810190601f1680156102ed5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610303610517565b6040518082815260200191505060405180910390f35b600083111561032e578260008190555061034a565b6001600081548092919060010191905055506001546000819055505b8160026000805481526020019081526020016000206000019080519060200190610375929190610521565b5080600260008054815260200190815260200160002060010190805190602001906103a1929190610521565b50505050565b6060600260008381526020019081526020016000206000018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104535780601f1061042857610100808354040283529160200191610453565b820191906000526020600020905b81548152906001019060200180831161043657829003601f168201915b50505050509050919050565b6060600260008381526020019081526020016000206001018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561050b5780601f106104e05761010080835404028352916020019161050b565b820191906000526020600020905b8154815290600101906020018083116104ee57829003601f168201915b50505050509050919050565b6000600154905090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061056257805160ff1916838001178555610590565b82800160010185558215610590579182015b8281111561058f578251825591602001919060010190610574565b5b50905061059d91906105a1565b5090565b5b808211156105ba5760008160009055506001016105a2565b509056fea264697066735822122023e725cb8b14d1ac0f679987c0e0ce6bbb11cf06ef5bfe446ab0f77ccd6ab96364736f6c634300060c0033";

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