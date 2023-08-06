
var fs = require("fs");
var net = require('net');
var util = require("util");
var xml2js = require('xml2js');
var parseString = xml2js.parseString;

var Web3 =  require('web3');
var web3 = new Web3("qdata/dd1/geth.ipc", net);

var HOST = '127.0.0.1';
var PORT = 65519;

//-----------------------Smartcontract interact function
/*
async function invokeContract(XDSMETADataAttributes, rawXDSAttr){
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

  var Docid = 0;
  var inputSearch = JSON.stringify(XDSMETADataAttributes);
  var inputFull = JSON.stringify(rawXDSAttr);

  myContract.methods.store(Docid, inputSearch, inputFull).send({
    from: deployerAccount
  }).then(function(receipt){
    console.log(receipt);
  }).then(process.exit);
}
*/

var requestUUID = {
  FindDocuments: 'urn:uuid:14d4debf-8f97-4251-9a74-a90016b0af0d',
  FindSubmissionSets: 'urn:uuid:f26abbcb-ac74-4422-8a30-edb644bbc1a9',
  FindFolders: 'urn:uuid:958f3006-baad-4929-a4de-ff1114824431',
  GetAll: 'urn:uuid:10b545ea-725c-446d-9b95-8aeb444eddf3',
  GetDocuments: 'urn:uuid:5c4f972b-d56b-40ac-a5fc-c8ca9b40b9d4',
  GetFolders: 'urn:uuid:5737b14c-8a1a-4539-b659-e03a34a5e1e4',
  GetAssociations: 'urn:uuid:a7ae438b-4bc2-4642-93e9-be891f7bb155',
  GetDocumentsAndAssociations: 'urn:uuid:bab9529a-4a10-40b3-a01f-f68a615d247a',
  GetSubmissionSets: 'urn:uuid:51224314-5390-4169-9b91-b1980040715a',
  GetSubmissionSetAndContents: 'urn:uuid:e8e3cb2c-e39c-46b9-99e4-c12f57260b83',
  GetFolderAndContents: 'urn:uuid:b909a503-523d-4517-8acf-8e5834dfc4c7',
  GetFoldersForDocument: 'urn:uuid:10cae35a-c7f9-4cf5-b61e-fc3278ffb578',
  GetRelatedDocuments: 'urn:uuid:d90e5407-b356-4d91-a89f-873917b4b0e6',
  FindDocumentsByReferenceId: 'urn:uuid:12941a89-e02e-4be5-967c-ce4bfc8fe492'
}

function specifyRequestType (requestedJSON) {
  //Specify responseOption
  console.log('Specify responseOption');
  var responseOption = '';
  if (requestedJSON['query:AdhocQueryRequest']['query:ResponseOption'][0]['$']['returnComposedObjects'] == 'true'){
    console.log('returnComposedObjects = true');
    if (requestedJSON['query:AdhocQueryRequest']['query:ResponseOption'][0]['$']['returnType'] == 'LeafClass') {
      responseOption = 'LeafClass';
      console.log('Request response as ' + responseOption + '...');
    }
    else if (requestedJSON['query:AdhocQueryRequest']['query:ResponseOption'][0]['$']['returnType'] == 'ObjectRef'){
      responseOption = 'ObjectRef';
      console.log('Request response as ObjectRef...');
    }
  }

  //Specify queryType -> revert UUID to human understandable word
  console.log(requestedJSON['query:AdhocQueryRequest']['rim:AdhocQuery'][0]['$']['id']);
  for (i = 0; i < Object.entries(requestUUID).length; i++){ //Cycle through requestUUID object to check request types
    if (requestedJSON['query:AdhocQueryRequest']['rim:AdhocQuery'][0]['$']['id'] == Object.entries(requestUUID)[i][1]){
      var requestType = Object.keys(requestUUID)[i];
      console.log('Query Type: ' + requestType);
    }
  }

  //Define search keyword array to meet specification of each request type
  var searchKeyword = [];
  if (requestType == 'FindDocuments'){
    var rimSlot = requestedJSON['query:AdhocQueryRequest']['rim:AdhocQuery'][0]['rim:Slot'];
    console.log(util.inspect(rimSlot));
    for (i = 0; i < rimSlot.length; i++){ //Assign attributes in rim:Slot to search keyword array
      if (rimSlot[i]['$']['name'] == '$XDSDocumentEntryPatientId'){
        searchKeyword.push(['DocumentEntry', 'patientId', rimSlot[i]['rim:ValueList'][0]['rim:Value'][0]]);
      }
      else if (rimSlot[i]['$']['name'] == '$XDSDocumentEntryClassCode'){
        searchKeyword.push(['DocumentEntry', ['classCode', 'displayName'], rimSlot[i]['rim:ValueList'][0]['rim:Value'][0]]);
      }
      else if (rimSlot[i]['$']['name'] == '$XDSDocumentEntryTypeCode'){
        searchKeyword.push(['DocumentEntry', ['typeCode', 'displayName'], rimSlot[i]['rim:ValueList'][0]['rim:Value'][0]]);
      }
      else if (rimSlot[i]['$']['name'] == '$XDSDocumentEntryPracticeSettingCode'){
        searchKeyword.push(['DocumentEntry', ['practiceSettingCode', 'displayName'], rimSlot[i]['rim:ValueList'][0]['rim:Value'][0]]);
      }
      else if (rimSlot[i]['$']['name'] == '$XDSDocumentEntryCreationTimeFrom'){
        searchKeyword.push(['DocumentEntry', ['creationTime', 'From'], rimSlot[i]['rim:ValueList'][0]['rim:Value'][0]]);
      }
      else if (rimSlot[i]['$']['name'] == '$XDSDocumentEntryCreationTimeTo'){
        searchKeyword.push(['DocumentEntry', ['creationTime', 'To'], rimSlot[i]['rim:ValueList'][0]['rim:Value'][0]]);
      }
      else if (rimSlot[i]['$']['name'] == '$XDSDocumentEntryServiceStartTimeFrom'){
        searchKeyword.push(['DocumentEntry', ['serviceStartTime', 'From'], rimSlot[i]['rim:ValueList'][0]['rim:Value'][0]]);
      }
      else if (rimSlot[i]['$']['name'] == '$XDSDocumentEntryServiceStartTimeTo'){
        searchKeyword.push(['DocumentEntry', ['serviceStartTime', 'To'], rimSlot[i]['rim:ValueList'][0]['rim:Value'][0]]);
      }
      else if (rimSlot[i]['$']['name'] == '$XDSDocumentEntryServiceStopTimeFrom'){
        searchKeyword.push(['DocumentEntry', ['serviceStopTime', 'From'], rimSlot[i]['rim:ValueList'][0]['rim:Value'][0]]);
      }
      else if (rimSlot[i]['$']['name'] == '$XDSDocumentEntryServiceStopTimeTo'){
        searchKeyword.push(['DocumentEntry', ['serviceStopTime', 'To'], rimSlot[i]['rim:ValueList'][0]['rim:Value'][0]]);
      }
      else if (rimSlot[i]['$']['name'] == '$XDSDocumentEntryHealthcareFacilityTypeCode'){
        searchKeyword.push(['DocumentEntry', ['healthcareFacilityTypeCode', 'displayName'], rimSlot[i]['rim:ValueList'][0]['rim:Value'][0]]);
      }
      else if (rimSlot[i]['$']['name'] == '$XDSDocumentEntryEventCodeList'){
        searchKeyword.push(['DocumentEntry', 'eventCodeList', rimSlot[i]['rim:ValueList'][0]['rim:Value'][0]]);
      }
      else if (rimSlot[i]['$']['name'] == '$XDSDocumentEntryConfidentialityCode'){
        searchKeyword.push(['DocumentEntry', ['confidentialityCode', 'displayName'], rimSlot[i]['rim:ValueList'][0]['rim:Value'][0]]);
      }
      else if (rimSlot[i]['$']['name'] == '$XDSDocumentEntryAuthorPerson'){
        searchKeyword.push(['DocumentEntry', ['author', 'authorPerson'], rimSlot[i]['rim:ValueList'][0]['rim:Value'][0]]);
      }
      else if (rimSlot[i]['$']['name'] == '$XDSDocumentEntryFormatCode'){
        searchKeyword.push(['DocumentEntry', ['formatCode', 'displayName'], rimSlot[i]['rim:ValueList'][0]['rim:Value'][0]]);
      }
      else if (rimSlot[i]['$']['name'] == '$XDSDocumentEntryStatus'){
        searchKeyword.push(['DocumentEntry', 'availabilityStatus', rimSlot[i]['rim:ValueList'][0]['rim:Value'][0]]);
      }
      else if (rimSlot[i]['$']['name'] == '$XDSDocumentEntryType'){
        searchKeyword.push(['DocumentEntry', 'objectType', rimSlot[i]['rim:ValueList'][0]['rim:Value'][0]]);
      }
    }
    console.log(searchKeyword);
  }
}

function processData (dataIn) {
  console.log('XML:\n' + dataIn);
  parseString(dataIn, function (err, result) {
    if (err) throw err;
    console.log('\nConverted to object: ');
    console.log('-----------------------\n' + util.inspect(result) + '\n---------------------');
    /*
    fs.writeFile("queryReceived.json", stringXDSAttrib, function(err, data) {
      if (err) console.log(err);
      console.log("Successfully Written to File. ");
    });
    */
    if (Object.keys(result)[0] == 'query:AdhocQueryRequest') {
      console.log('Query requested...');
      specifyRequestType(result);
    }
  });
}


net.createServer(function(sock) {
    
    // We have a connection - a socket object is assigned to the connection automatically
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    
    // Add a 'data' event handler to this instance of socket
    sock.on('data', function(data) {
        console.log('Received data....');
        sock.write('ACK from ' + sock.remoteAddress + '\n'); //Write ACK back to sender
        processData(data); //converting XML to JSON based on Module "xml-js"
        //console.log(result); // show the result of xml to js conversion
                 
    });
    
    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
    });
    
}).listen(PORT, HOST);
console.log('Server listening on ' + HOST +':'+ PORT);
