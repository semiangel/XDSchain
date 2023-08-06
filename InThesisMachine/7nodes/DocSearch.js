var util = require("util");
var Web3 =  require('web3');
var moment = require('moment'); 

var net = require('net');
var web3 = new Web3("qdata/dd1/geth.ipc", net);
//----Assort Search Input----------------------
//Define search keyword, begin with defined inside program
function beginSearch (myCallback) {
  var sK = [
  			['DocumentEntry',['author','authorPerson'],'^Smitty^Gerald^^^'],
  			['DocumentEntry','comment',''],
  			['DocumentEntry',['classCode','codingScheme'],'1.3.6.1.4.1.19376.1.2.6.1'],
  			['DocumentEntry','sourcePatientInfo',['PID-3|pid1^^^&1.2.3&ISO','PID-5|Doe^John^^^','PID-7|19560527','PID-8|M','PID-11|100 Main St^^Metropolis^Il^44130^USA']],
        ['DocumentEntry', ['creationTime', 'From'], '20061220'],
        ['DocumentEntry', ['creationTime', 'To'], '20061231'],
        ['DocumentEntry', ['serviceStartTime', 'From'], '200612200900'],
        ['DocumentEntry', ['serviceStartTime', 'To'], '200612312300'],
        ['DocumentEntry', ['serviceStopTime', 'From'], '200612200900'],
        ['DocumentEntry', ['serviceStopTime', 'To'], '200612312300']
  		]; //Array represent input retrieved from Front-End
  //Above value suppose to be retrieved from ITI-18
  console.log('Input keyword:');
  console.log(sK);
  console.log('------------------------------------------');
  myCallback(sK, invokeContract);
}

async function checkLastID(sK, myCallback){
  //web3.eth.defaultAccount = web3.eth.personal.getAccounts().then(console.log);
  console.log('Checking for latest ID...');
  let acc = await web3.eth.personal.getAccounts();
    if (acc.err) {console.log(acc.err);}
    else {console.log('Accounts available on this node:\n' + acc);}

  var deployerAccount = acc[0];
  console.log('Originally deployed with account:' + deployerAccount);
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

  console.log('Calling contract...');
  myContract.methods.checkLastID().call({
    from: deployerAccount
  }, (err,res) => {
    if (err) {
      console.log(err);
    }else{
      console.log('Found, the lastest document ID is ' + res);
      console.log('------------------------------------------');
      myCallback(sK, res, matchMaker);
    }
  });  
}

//Invoke each contract for keyword search
async function invokeContract(sK, maxDoc, myCallback){
  //web3.eth.defaultAccount = web3.eth.personal.getAccounts().then(console.log);
  console.log('Search keywords received...\nMoving on to search function...');
  let acc = await web3.eth.personal.getAccounts();
    if (acc.err) {console.log(acc.err);}
    else {console.log('Accounts available on this node:\n' + acc);}

  var deployerAccount = acc[0];
  console.log('Originally deployed with account:' + deployerAccount);
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

  console.log('The latest document ID is no.:' + maxDoc);
  //callRegSearch while run along Docid from 1 to latest (known using checkID)
  console.log('Begin contract search...');
  var traceDocid = 0;
  for (Docid = 1; Docid <= maxDoc; Docid++){
    traceDocid++;
    myContract.methods.retreiveSearch(Docid).call({
      from: deployerAccount
    }, (err,res) => {
      if (err) {
        console.log(err);
      }else{
        var XDSattributes = JSON.parse(res);
        myCallback(XDSattributes, sK, traceDocid);
      }
    });
  }  
}

//Compare keyword with JSON called from smartcontract
function matchMaker (searchXDSAtt, sK, Docid){ 
  //searchXDSAtt = XDS Object called from smartcontract
  //sK = search keyword received from ITI-18
  console.log('----------\nSmartcontract called...');

  var matchedCount = 0;
  var timeAttributes = {
    creationTime: {
      From: null,
      To: null
    },
    serviceStartTime: {
      From: null,
      To: null
    },
    serviceStopTime: {
      From: null,
      To: null
    }
  }

  for (i = 0; i < sK.length; i++){
    var keyCount = i+1;
    if (Array.isArray(sK[i][1])){ //check if attributes have sub-attributes i.e. author, classCode, etc.
      if (sK[i][1][0] == 'author') { //author specific case
        if (searchXDSAtt[sK[i][0]][sK[i][1][0]][0][sK[i][1][1]] == sK[i][2]){
          matchedCount++;
          console.log('Keyword ' + keyCount + ' matched...');
        }
        else {
          console.log('Keyword ' + keyCount + ' unmatched...');
          break;
        }
      }
      else if (sK[i][1][0] == 'creationTime') {
        timeAttributes[sK[i][1][0]][sK[i][1][1]] = sK[i][2];
        if (timeAttributes[sK[i][1][0]]['From'] && timeAttributes[sK[i][1][0]]['To']){
          var dateTimeFrom = moment.utc(timeAttributes[sK[i][1][0]]['From'], 'YYYYMMDDHHmmss');
          var dateTimeTo = moment.utc(timeAttributes[sK[i][1][0]]['To'], 'YYYYMMDDHHmmss');
          var dateTimeTarget = moment.utc(searchXDSAtt[sK[i][0]][sK[i][1][0]], 'YYYYMMDDHHmmss');
          if (moment(dateTimeTarget).isBetween(dateTimeFrom, dateTimeTo, undefined, '[]')){
            matchedCount++; //match count 2 times due to the attributes require 2 search keywords
            matchedCount++;
            console.log(sK[i][1][0] + ' at Keyword ' + keyCount + ' matched...');
          }
        }
      }
      else if (sK[i][1][0] == 'serviceStartTime' || sK[i][1][0] == 'serviceStopTime') {
        if (searchXDSAtt[sK[i][0]][sK[i][1][0]] != 'N/A'){ //check if current Document have serviceTime attributes present
          timeAttributes[sK[i][1][0]][sK[i][1][1]] = sK[i][2];
          if (timeAttributes[sK[i][1][0]]['From'] && timeAttributes[sK[i][1][0]]['To']){
            var dateTimeFrom = moment.utc(timeAttributes[sK[i][1][0]]['From'], 'YYYYMMDDHHmmss');
            var dateTimeTo = moment.utc(timeAttributes[sK[i][1][0]]['To'], 'YYYYMMDDHHmmss');
            var dateTimeTarget = moment.utc(searchXDSAtt[sK[i][0]][sK[i][1][0]], 'YYYYMMDDHHmmss');
            if (moment(dateTimeTarget).isBetween(dateTimeFrom, dateTimeTo, undefined, '[]')){
              matchedCount++; //match count 2 times due to the attributes require 2 search keywords
              matchedCount++;
              console.log(sK[i][1][0] + ' at Keyword ' + keyCount + ' matched...');
            }
          }
        }
      }
      else {
        if (searchXDSAtt[sK[i][0]][sK[i][1][0]][sK[i][1][1]] == sK[i][2]){
          matchedCount++;
          console.log('Keyword ' + keyCount + ' matched...');
        }
        else {
          console.log('Keyword ' + keyCount + ' unmatched...');
          break;
        }
      }
    }
    else {
      if (Array.isArray(sK[i][2])){
        if (searchXDSAtt[sK[i][0]][sK[i][1]][0] == sK[i][2][0]){
          matchedCount++;
          console.log('Keyword ' + keyCount + ' matched...');
        }
        else if (searchXDSAtt[sK[i][0]][sK[i][1]][0] != sK[i][2][0]) {
          console.log('Keyword ' + keyCount + ' unmatched...');
          break;
        }
      }
      else {
        if (searchXDSAtt[sK[i][0]][sK[i][1]] == sK[i][2]){
          matchedCount++;
          console.log('Keyword ' + keyCount + ' matched...');
        }
        else {
          console.log('Keyword ' + keyCount + ' unmatched...');
          break;
        }
      }
    }
  }

  if (matchedCount == sK.length){
    console.log('All matched, successfully... \nReturn document as search result:\n========================================');
    console.log(searchXDSAtt.DocumentEntry);
    console.log('========================================');
  }
  else {
    console.log('Unmatched...');
  }  
}

beginSearch(checkLastID);