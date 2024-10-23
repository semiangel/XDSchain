var net = require('net');
var Web3 = require('web3');
var web3 = new Web3("../data/geth.ipc", net);

const logID = process.argv[2];
var logRead = '';
var allLogs = [];
var breakSearch = null;

async function readLogContract(logID) {
    //web3.eth.defaultAccount = web3.eth.personal.getAccounts().then(console.log);
    let acc = await web3.eth.personal.getAccounts();
    if (acc.err) { console.log(acc.err); }
    else { console.log('Accounts available on this node:\n' + acc); }

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

    var contractAddress = require('./logContractAddress.js');
    console.log('Contract Address: ' + contractAddress);

    var myContract = new web3.eth.Contract(abi, contractAddress, {
        from: deployerAccount,
        gas: 30000000
    });

    console.log('Checking log...');
    console.log('Provided log ID = ' + logID + '...');
    console.log('=====================================');
    logRead = await myContract.methods.readLog(logID).call({
        from: deployerAccount
    }, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            if (res) {
                console.log('Log result found: ');
                //console.log('-> ' + res);
                //console.log('=====================================');
                allLogs.push(res);
            }
            else {
                console.log('No more log can be found');
                breakSearch = 1;
                showLogs();
            }
            
        }
    });
}

function showLogs () {
    for (i=0; i<allLogs.length; i++) {
        console.log(allLogs[i]);
    }
    process.exit();
}

/*
if (logID) {
    readLogContract(logID);
}
else {
    console.log('Log ID not specified...\nExit...');
}*/

for (i=0; i<100; i++) {
    if (breakSearch) {
        break;
    }
    else {
        readLogContract(i);
    }
}
