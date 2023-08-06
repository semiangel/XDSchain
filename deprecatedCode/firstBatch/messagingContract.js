//requirement for TCP socket
var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6969;

console.log('Requirement for net socket checked...');

//requirement for web3
var Web3 = require('web3');
var net = require('net');
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} 
else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

web3.eth.defaultAccount = web3.eth.accounts[2];
console.log('Requirement for web3 checked...');


//web3 smart contract interaction ======================================================================================
var messengerContract = web3.eth.contract(
    [
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_message",
                    "type": "string"
                }
            ],
            "name": "sendMessage",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "readMessage",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ]);
/*
var messenger = messengerContract.new(
   {
     from: web3.eth.accounts[0], 
     data: '0x608060405234801561001057600080fd5b506102a7806100206000396000f30060806040526004361061004b5763ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041663031d5d018114610050578063469c8110146100da575b600080fd5b34801561005c57600080fd5b50610065610135565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561009f578181015183820152602001610087565b50505050905090810190601f1680156100cc5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156100e657600080fd5b506040805160206004803580820135601f81018490048402850184019095528484526101339436949293602493928401919081908401838280828437509497506101cc9650505050505050565b005b60008054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156101c15780601f10610196576101008083540402835291602001916101c1565b820191906000526020600020905b8154815290600101906020018083116101a457829003601f168201915b505050505090505b90565b80516101df9060009060208401906101e3565b5050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061022457805160ff1916838001178555610251565b82800160010185558215610251579182015b82811115610251578251825591602001919060010190610236565b5061025d929150610261565b5090565b6101c991905b8082111561025d57600081556001016102675600a165627a7a723058203b0c8107f707bfa7bd0c2dc2f313f6b988cab532b9abee326cf3d1a6ab9640a20029', 
     gas: '4700000'
   }, function (e, contract){
    //console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' + contract.address);
         console.log('TransactionHash: ' + contract.transactionHash);
    }
 })
*/

var contractAddress = '0x9345e2c8a4cde20388712f5c3627ce259f21e756';
console.log('Specifying contract address...');

var ATNAmessage = messengerContract.at(contractAddress); 
//set contract address, need to specified from Remix, changed everytime re-eun testrpc
console.log('Assigned contract address to: ' + contractAddress);

//========================================================================================================================
//TCPsocket

net.createServer(function(sock) {
    
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    
    sock.on('data', function(data) {  
        console.log('Recieved from ' + sock.remoteAddress + ': ' + data);
        sock.write('You said "' + data + '"')
        console.log('=======================================');
        console.log('Publishing message to Blockchain...');
        ATNAmessage.sendMessage('ATNAlog: ' + data); 
        //the 'data' variable is in form of Buffer (featured with net) need to specify that it is string
        console.log('Published...');
        console.log('Published: ' + ATNAmessage.readMessage()); //need to put some kind of delay before this line or move readMessage to other program
        console.log('=======================================');
    });

    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
    });
    
}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);

//========================================================================================================================
