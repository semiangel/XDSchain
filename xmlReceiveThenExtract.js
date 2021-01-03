//Current Main workspace
//This program receive XML via TCP socket before convert XML into JSON then try to sort stuff into simpler JSON object for smartcontract
//21/12/2020 Now have difficulty with updated xml2js which change format of JSON 
//Need rework on the whole process of simplifying JSON for smartcontract
//import module related to message processing and network
var fs = require("fs");
var net = require('net');
var util = require("util");
var xml2js = require('xml2js');
var parseString = xml2js.parseString;
//import module related to web3 and smartcontract interaction
var Web3 =  require('web3');
var web3 = new Web3("qdata/dd1/geth.ipc", net);

var HOST = '127.0.0.1';
var PORT = 65519;
//-----------------------Smartcontract interact function
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

  var contractAddress = '0x10ae69385C79eF3Eb815AC008A7013D6878f1d38';
  console.log('Contract Address: ' + contractAddress);

  var myContract = new web3.eth.Contract(abi, contractAddress, {
    from: deployerAccount,
      gas: 10000000
  });

  var Docid = 1;
  var inputSearch = JSON.stringify(XDSMETADataAttributes);
  var inputFull = JSON.stringify(rawXDSAttr);

  myContract.methods.store(Docid, inputSearch, inputFull).send({
    from: deployerAccount
  }).then(function(receipt){
    console.log(receipt);
  }).then(process.exit);
}
//------------------------------------------------------------------
//Declare main object to store all META-data attributes essential for search operation
var prepXDSAtt = {
  DocumentEntry: {
    author: [{
      authorPerson: 'N/A',
      authorInstitution: [],
      authorRole: 'N/A',
      authorSpecialty: 'N/A'
    }],
    availabilityStatus: 'N/A',
    classCode: {
      codingScheme: 'N/A',
      displayName: 'N/A'
    },
    comment: 'N/A',
    confidentialityCode: {
      codingScheme: 'N/A',
      displayName: 'N/A'
    },
    creationTime: 'N/A',
    entryUUID: 'N/A',
    eventCodeList: [],
    formatCode: {
      codingScheme: 'N/A',
      displayName: 'N/A'
    },
    hash: 'N/A',
    healthcareFacilityTypeCode: {
      codingScheme: 'N/A',
      displayName: 'N/A'
    },
    homeCommunityId: 'N/A',
    languageCode: 'N/A',
    legalAuthenticator: 'N/A',
    limitedMetadata: 'N/A',
    mimeType: 'N/A',
    objectType: 'N/A',
    patientId: 'N/A',
    practiceSettingCode: {
      codingScheme: 'N/A',
      displayName: 'N/A'
    },
    referenceIdList: 'N/A',
    repositoryUniqueId: 'N/A',
    serviceStartTime: 'N/A',
    serviceStopTime: 'N/A',
    size: 'N/A',
    sourcePatientId: 'N/A',
    sourcePatientInfo: [],
    title: 'N/A',
    typeCode: {
        codingScheme: 'N/A',
        displayName: 'N/A'
    },
    uniqueId: 'N/A',
    URI: 'N/A'
  },

  SubmissionSet: {
    author: [{
        authorPerson: 'N/A',
        authorInstitution: [],
        authorRole: 'N/A',
        authorSpecialty: 'N/A'
      }],
    availabilityStatus: 'N/A',
    comments: 'N/A',
    contentTypeCodes: {
      codingScheme: 'N/A',
      displayName: 'N/A'
    },
    entryUUID: 'N/A',
    homeCommunityId: 'N/A',
    intendedRecipient: 'N/A',
    limitedMetadata: 0,
    patientId: 'N/A',
    sourceId: 'N/A',
    submissionTime: 'N/A',
    title: 'N/A',
    uniqueId: 'N/A'
  },

  Folder: {
    availabilityStatus: 'N/A',
    codeList: 'N/A',
    comments: 'N/A',
    entryUUID: 'N/A',
    homeCommunityId: 'N/A',
    lastUpdateTime: 'N/A',
    limitedMetadata: 'N/A',
    patientId: 'N/A',
    title: 'N/A',
    uniqueId: 'N/A'
  },

  Association: {
    associationType: 'N/A',
    sourceObject: 'N/A',
    targetObject: 'N/A',
    SubmissionSetStatus: 'N/A'
  }
}

//------------------------------------------------------------------
//Define UUID number of each META-data attributes
var documentEntryUUID = {
    //-----Document Entry----------------------------------
    DocumentEntry: 'urn:uuid:7edca82f-054d-47f2-a032-9b2a5b5186c1',
    author: 'urn:uuid:93606bcf-9494-43ec-9b4e-a7748d1a838d',
    classCode: 'urn:uuid:41a5887f-8865-4c09-adf7-e362475b143a',
    confidentialityCode: 'urn:uuid:f4f85eac-e6cb-4883-b524-f2705394840f',
    formatCode: 'urn:uuid:a09d5840-386c-46f2-b5ad-9c3699a4309d',
    healthcareFacilityTypeCode: 'urn:uuid:f33fb8ac-18af-42cc-ae0e-ed0b0bdb91e1',
    practiceSettingCode: 'urn:uuid:cccf5598-8b07-4b77-a05e-ae952c785ead',
    typeCode: 'urn:uuid:f0306f51-975f-434e-a61c-c59651d33983',
    patientId: 'urn:uuid:58a6f841-87b3-4a3e-92fd-a8ffeff98427',
    uniqueId: 'urn:uuid:2e82c1f6-a085-4c72-9da3-8640a32e42ab',
    eventCodeList: 'urn:uuid:2c6b8cb7-8b2a-4051-b291-b1ae6a575ef4'
}

var submissionSetUUID = {
    //------SubmissionSet Attributes---------------------------------
    author: 'urn:uuid:a7058bb9-b4e4-4307-ba5b-e3f0ab85e12d',
    contentTypeCodes: 'urn:uuid:aa543740-bdda-424e-8c96-df4873be8500',
    uniqueId: 'urn:uuid:96fdda7c-d067-4183-912e-bf5ee74998a8',
    sourceId: 'urn:uuid:554ac39e-e3fe-47fe-b233-965d2a147832',
    patientId: 'urn:uuid:6b5aea1a-874d-4603-a4bc-96a0a7b38446',
    limitedMetadata: 'urn:uuid:a54d6aa5-d40d-43f9-88c5-b4633d873bdd'
}

function assignAll (rXDSAttribute, myCallback) {
  //Define variable for shorter object accessing
  var sEnvelope = rXDSAttribute['soapenv:Envelope'];
  //inside Enveope
  var s$ = sEnvelope['$'];
  var sBody = sEnvelope['soapenv:Body'][0];
  var sHeader = sEnvelope['soapenv:Header'][0];
  //inside Envelope>Header
  var wsaTo = sHeader['wsa:To'];
  var wsaMessageID = sHeader['wsaMessageID'];
  var wsaAction = sHeader['wsaAction'];
  //inside Envelope>Body
  var lcmSubmitObjectsRequest = sBody['lcm:SubmitObjectsRequest'][0];
  //inside Envelope>Body>lcm:SubmitObjectsRequest
  var bodyRegistryObjectList = lcmSubmitObjectsRequest['rim:RegistryObjectList'][0];
  //inside Envelope>Body>lcm:SubmitObjectsRequest>rim:RegistryObjectList
  var bodyExtrinsicObject = bodyRegistryObjectList['rim:ExtrinsicObject'][0];
  var bodyRegistryPackage = bodyRegistryObjectList['rim:RegistryPackage'][0];
  var bodyClassification = bodyRegistryObjectList['rim:Classification'][0];
  var bodyAssociation = bodyRegistryObjectList['rim:Association'][0];

  var eventCodeListCount = 0; //Document may have more than one eventCodeList, so it need counter
  //Detect DocumentEntry
  if (bodyExtrinsicObject['$']['objectType'] == documentEntryUUID.DocumentEntry){
      //Scanning object within DocumentEntry "Classification"
      for (var i = 0; i < bodyExtrinsicObject['rim:Classification'].length; i++){
          //Detect DocumentEntry > author (Set)
          if (bodyExtrinsicObject['rim:Classification'][i]['$']['classificationScheme'] == documentEntryUUID.author){
              if (i != 0) { //If there are more than one author for the Doc, add more author object into array
                  prepXDSAtt.DocumentEntry.author.push({
                                                          authorPerson: 'N/A',
                                                          authorInstitution: [],
                                                          authorRole: 'N/A',
                                                          authorSpecialty: 'N/A'
                                                      });
              }
              //Assign each element of the author
              for (var j = 0; j < bodyExtrinsicObject['rim:Classification'][i]['rim:Slot'].length; j++){
                  if (bodyExtrinsicObject['rim:Classification'][i]['rim:Slot'][j]['$']['name'] == 'authorPerson'){
                      prepXDSAtt.DocumentEntry.author[i].authorPerson = bodyExtrinsicObject['rim:Classification'][i]['rim:Slot'][j]['rim:ValueList'][0]['rim:Value'][0];
                  }
                  if (bodyExtrinsicObject['rim:Classification'][i]['rim:Slot'][j]['$']['name'] == 'authorInstitution'){
                      prepXDSAtt.DocumentEntry.author[i].authorInstitution = bodyExtrinsicObject['rim:Classification'][i]['rim:Slot'][j]['rim:ValueList'][0]['rim:Value'];
                  }
                  if (bodyExtrinsicObject['rim:Classification'][i]['rim:Slot'][j]['$']['name'] == 'authorRole'){
                      prepXDSAtt.DocumentEntry.author[i].authorRole = bodyExtrinsicObject['rim:Classification'][i]['rim:Slot'][j]['rim:ValueList'][0]['rim:Value'][0];
                  }
                  if (bodyExtrinsicObject['rim:Classification'][i]['rim:Slot'][j]['$']['name'] == 'authorSpecialty'){
                      prepXDSAtt.DocumentEntry.author[i].authorSpecialty = bodyExtrinsicObject['rim:Classification'][i]['rim:Slot'][j]['rim:ValueList'][0]['rim:Value'][0];
                  }
              }
          }
          //Detect DocumentEntry > classCode
          if (bodyExtrinsicObject['rim:Classification'][i]['$']['classificationScheme'] == documentEntryUUID.classCode){
              prepXDSAtt.DocumentEntry.classCode.displayName = bodyExtrinsicObject['rim:Classification'][i]['rim:Name'][0]['rim:LocalizedString'][0]['$']['value'];
              if (bodyExtrinsicObject['rim:Classification'][i]['rim:Slot'][0]['$']['name'] == 'codingScheme'){
                  prepXDSAtt.DocumentEntry.classCode.codingScheme = bodyExtrinsicObject['rim:Classification'][i]['rim:Slot'][0]['rim:ValueList'][0]['rim:Value'][0];
              }
          }
          //Detect DocumentEntry > confidentialityCode
          if (bodyExtrinsicObject['rim:Classification'][i]['$']['classificationScheme'] == documentEntryUUID.confidentialityCode){
              prepXDSAtt.DocumentEntry.confidentialityCode.displayName = bodyExtrinsicObject['rim:Classification'][i]['rim:Name'][0]['rim:LocalizedString'][0]['$']['value'];
              if (bodyExtrinsicObject['rim:Classification'][i]['rim:Slot'][0]['$']['name'] == 'codingScheme'){
                  prepXDSAtt.DocumentEntry.confidentialityCode.codingScheme = bodyExtrinsicObject['rim:Classification'][i]['rim:Slot'][0]['rim:ValueList'][0]['rim:Value'][0];
              }
          }
          //Detect DocumentEntry > formatCode
          if (bodyExtrinsicObject['rim:Classification'][i]['$']['classificationScheme'] == documentEntryUUID.formatCode){
              prepXDSAtt.DocumentEntry.formatCode.displayName = bodyExtrinsicObject['rim:Classification'][i]['rim:Name'][0]['rim:LocalizedString'][0]['$']['value'];
              if (bodyExtrinsicObject['rim:Classification'][i]['rim:Slot'][0]['$']['name'] == 'codingScheme'){
                  prepXDSAtt.DocumentEntry.formatCode.codingScheme = bodyExtrinsicObject['rim:Classification'][i]['rim:Slot'][0]['rim:ValueList'][0]['rim:Value'][0];
              }
          }
          //Detect DocumentEntry > healthcareFacilityTypeCode
          if (bodyExtrinsicObject['rim:Classification'][i]['$']['classificationScheme'] == documentEntryUUID.healthcareFacilityTypeCode){
              prepXDSAtt.DocumentEntry.healthcareFacilityTypeCode.displayName = bodyExtrinsicObject['rim:Classification'][i]['rim:Name'][0]['rim:LocalizedString'][0]['$']['value'];
              if (bodyExtrinsicObject['rim:Classification'][i]['rim:Slot'][0]['$']['name'] == 'codingScheme'){
                  prepXDSAtt.DocumentEntry.healthcareFacilityTypeCode.codingScheme = bodyExtrinsicObject['rim:Classification'][i]['rim:Slot'][0]['rim:ValueList'][0]['rim:Value'][0];
              }
          }
          //Detect DocumentEntry > practiceSettingCode
          if (bodyExtrinsicObject['rim:Classification'][i]['$']['classificationScheme'] == documentEntryUUID.practiceSettingCode){
              prepXDSAtt.DocumentEntry.practiceSettingCode.displayName = bodyExtrinsicObject['rim:Classification'][i]['rim:Name'][0]['rim:LocalizedString'][0]['$']['value'];
              if (bodyExtrinsicObject['rim:Classification'][i]['rim:Slot'][0]['$']['name'] == 'codingScheme'){
                  prepXDSAtt.DocumentEntry.practiceSettingCode.codingScheme = bodyExtrinsicObject['rim:Classification'][i]['rim:Slot'][0]['rim:ValueList'][0]['rim:Value'][0];
              }
          }
          //Detect DocumentEntry > eventCode
          if (bodyExtrinsicObject['rim:Classification'][i]['$']['classificationScheme'] == documentEntryUUID.eventCodeList){
              prepXDSAtt.DocumentEntry.eventCodeList.push({
                                                              codingScheme: 'N/A',
                                                              displayName: 'N/A'
                                                          });
              prepXDSAtt.DocumentEntry.eventCodeList[eventCodeListCount].displayName = bodyExtrinsicObject['rim:Classification'][i]['rim:Name'][0]['rim:LocalizedString'][0]['$']['value'];
              if (bodyExtrinsicObject['rim:Classification'][i]['rim:Slot'][0]['$']['name'] == 'codingScheme'){
                  prepXDSAtt.DocumentEntry.eventCodeList[eventCodeListCount].codingScheme = bodyExtrinsicObject['rim:Classification'][i]['rim:Slot'][0]['rim:ValueList'][0]['rim:Value'][0];
              }
              eventCodeListCount++;
          }
          //Detect DocumentEntry > TypeCode
          if (bodyExtrinsicObject['rim:Classification'][i]['$']['classificationScheme'] == documentEntryUUID.typeCode){
              prepXDSAtt.DocumentEntry.typeCode.displayName = bodyExtrinsicObject['rim:Classification'][i]['rim:Name'][0]['rim:LocalizedString'][0]['$']['value'];
              if (bodyExtrinsicObject['rim:Classification'][i]['rim:Slot'][0]['$']['name'] == 'codingScheme'){
                  prepXDSAtt.DocumentEntry.typeCode.codingScheme = bodyExtrinsicObject['rim:Classification'][i]['rim:Slot'][0]['rim:ValueList'][0]['rim:Value'][0];
              }
          }
      }
      //Scanning object within DocumentEntry "Descriptor" which usually be "comment"
      for (var i = 0; i < bodyExtrinsicObject['rim:Description'].length; i++){
          prepXDSAtt.DocumentEntry.comment = bodyExtrinsicObject['rim:Description'][i];
      }

      for (var i = 0; i < bodyExtrinsicObject['rim:Name'].length; i++){
          prepXDSAtt.DocumentEntry.title = bodyExtrinsicObject['rim:Name'][i]['rim:LocalizedString'][0]['$']['value'];
      }
      
      //Scanning object within DocumentEntry "ExternalIdentifier"
      for (var i = 0; i < bodyExtrinsicObject['rim:ExternalIdentifier'].length; i++){
          //Detect DocumentEntry > patientId
          if (bodyExtrinsicObject['rim:ExternalIdentifier'][i]['$']['identificationScheme'] == documentEntryUUID.patientId){
              prepXDSAtt.DocumentEntry.patientId = (bodyExtrinsicObject['rim:ExternalIdentifier'][i]['$']['value']);
          }
          if (bodyExtrinsicObject['rim:ExternalIdentifier'][i]['$']['identificationScheme'] == documentEntryUUID.uniqueId){
              prepXDSAtt.DocumentEntry.uniqueId = (bodyExtrinsicObject['rim:ExternalIdentifier'][i]['$']['value']);
          }
      }

      //Scannig object within DocumentEntry "Slot"
      for (var i = 0; i < bodyExtrinsicObject['rim:Slot'].length; i++){
          if (bodyExtrinsicObject['rim:Slot'][i]['$']['name'] == 'size'){
              prepXDSAtt.DocumentEntry.size = bodyExtrinsicObject['rim:Slot'][i]['rim:ValueList'][0]['rim:Value'][0];
          }
          if (bodyExtrinsicObject['rim:Slot'][i]['$']['name'] == 'repositoryUniqueId'){
              prepXDSAtt.DocumentEntry.repositoryUniqueId = bodyExtrinsicObject['rim:Slot'][i]['rim:ValueList'][0]['rim:Value'][0];
          }
          if (bodyExtrinsicObject['rim:Slot'][i]['$']['name'] == 'hash'){
              prepXDSAtt.DocumentEntry.hash = bodyExtrinsicObject['rim:Slot'][i]['rim:ValueList'][0]['rim:Value'][0];
          }
          if (bodyExtrinsicObject['rim:Slot'][i]['$']['name'] == 'creationTime'){
              prepXDSAtt.DocumentEntry.creationTime = bodyExtrinsicObject['rim:Slot'][i]['rim:ValueList'][0]['rim:Value'][0];
          }
          if (bodyExtrinsicObject['rim:Slot'][i]['$']['name'] == 'languageCode'){
              prepXDSAtt.DocumentEntry.languageCode = bodyExtrinsicObject['rim:Slot'][i]['rim:ValueList'][0]['rim:Value'][0];
          }
          if (bodyExtrinsicObject['rim:Slot'][i]['$']['name'] == 'serviceStartTime'){
              prepXDSAtt.DocumentEntry.serviceStartTime = bodyExtrinsicObject['rim:Slot'][i]['rim:ValueList'][0]['rim:Value'][0];
          }
          if (bodyExtrinsicObject['rim:Slot'][i]['$']['name'] == 'serviceStopTime'){
              prepXDSAtt.DocumentEntry.serviceStopTime = bodyExtrinsicObject['rim:Slot'][i]['rim:ValueList'][0]['rim:Value'][0];
          }
          if (bodyExtrinsicObject['rim:Slot'][i]['$']['name'] == 'sourcePatientId'){
              prepXDSAtt.DocumentEntry.sourcePatientId = bodyExtrinsicObject['rim:Slot'][i]['rim:ValueList'][0]['rim:Value'][0];
          }
          if (bodyExtrinsicObject['rim:Slot'][i]['$']['name'] == 'sourcePatientInfo'){
              prepXDSAtt.DocumentEntry.sourcePatientInfo = bodyExtrinsicObject['rim:Slot'][i]['rim:ValueList'][0]['rim:Value'];
          }
      }
  }

  if (bodyRegistryPackage){
      for (var i = 0; i < bodyRegistryPackage['rim:Classification'].length; i++){
          if (bodyRegistryPackage['rim:Classification'][i]['$']['classificationScheme'] == submissionSetUUID.author){
              if (i != 0) { //If there are more than one author for the Doc, add more author object into array
                  prepXDSAtt.SubmissionSet.author.push({
                                                          authorPerson: 'N/A',
                                                          authorInstitution: [],
                                                          authorRole: 'N/A',
                                                          authorSpecialty: 'N/A'
                                                      });
              }
              //Assign each element of the author
              for (var j = 0; j < bodyRegistryPackage['rim:Classification'][i]['rim:Slot'].length; j++){
                  if (bodyRegistryPackage['rim:Classification'][i]['rim:Slot'][j]['$']['name'] == 'authorPerson'){
                      prepXDSAtt.SubmissionSet.author[i].authorPerson = bodyRegistryPackage['rim:Classification'][i]['rim:Slot'][j]['rim:ValueList'][0]['rim:Value'][0];
                  }
                  if (bodyRegistryPackage['rim:Classification'][i]['rim:Slot'][j]['$']['name'] == 'authorInstitution'){
                      prepXDSAtt.SubmissionSet.author[i].authorInstitution = bodyRegistryPackage['rim:Classification'][i]['rim:Slot'][j]['rim:ValueList'][0]['rim:Value'];
                  }
                  if (bodyRegistryPackage['rim:Classification'][i]['rim:Slot'][j]['$']['name'] == 'authorRole'){
                      prepXDSAtt.SubmissionSet.author[i].authorRole = bodyRegistryPackage['rim:Classification'][i]['rim:Slot'][j]['rim:ValueList'][0]['rim:Value'][0];
                  }
                  if (bodyRegistryPackage['rim:Classification'][i]['rim:Slot'][j]['$']['name'] == 'authorSpecialty'){
                      prepXDSAtt.SubmissionSet.author[i].authorSpecialty = bodyRegistryPackage['rim:Classification'][i]['rim:Slot'][j]['rim:ValueList'][0]['rim:Value'][0];
                  }
              }
          }

          if (bodyRegistryPackage['rim:Classification'][i]['$']['classificationScheme'] == submissionSetUUID.contentTypeCodes){
              prepXDSAtt.SubmissionSet.contentTypeCodes.displayName = bodyRegistryPackage['rim:Classification'][i]['rim:Name'][0]['rim:LocalizedString'][0]['$']['value'];
              if (bodyRegistryPackage['rim:Classification'][i]['rim:Slot'][0]['$']['name'] == 'codingScheme'){
                  prepXDSAtt.SubmissionSet.contentTypeCodes.codingScheme = bodyRegistryPackage['rim:Classification'][i]['rim:Slot'][0]['rim:ValueList'][0]['rim:Value'][0];
              }
          }
      }

      for (var i = 0; i < bodyRegistryPackage['rim:Description'].length; i++){
          prepXDSAtt.SubmissionSet.comment = bodyRegistryPackage['rim:Description'][i]['rim:LocalizedString'][0]['$']['value'];
      }

      for (var i = 0; i < bodyRegistryPackage['rim:Name'].length; i++){
          prepXDSAtt.SubmissionSet.title = bodyRegistryPackage['rim:Name'][i]['rim:LocalizedString'][0]['$']['value'];
      }

      for (var i = 0; i < bodyRegistryPackage['rim:ExternalIdentifier'].length; i++){
          if (bodyRegistryPackage['rim:ExternalIdentifier'][i]['$']['identificationScheme'] == submissionSetUUID.uniqueId){
              prepXDSAtt.SubmissionSet.uniqueId = bodyRegistryPackage['rim:ExternalIdentifier'][i]['$']['value'];
          }
          if (bodyRegistryPackage['rim:ExternalIdentifier'][i]['$']['identificationScheme'] == submissionSetUUID.sourceId){
              prepXDSAtt.SubmissionSet.sourceId = bodyRegistryPackage['rim:ExternalIdentifier'][i]['$']['value'];
          }
          if (bodyRegistryPackage['rim:ExternalIdentifier'][i]['$']['identificationScheme'] == submissionSetUUID.patientId){
              prepXDSAtt.SubmissionSet.patientId = bodyRegistryPackage['rim:ExternalIdentifier'][i]['$']['value'];
          }
      }

      for (var i = 0; i < bodyRegistryPackage['rim:Slot'].length; i++){
          if (bodyRegistryPackage['rim:Slot'][i]['$']['name'] == 'submissionTime'){
              prepXDSAtt.SubmissionSet.submissionTime = bodyRegistryPackage['rim:Slot'][i]['rim:ValueList'][0]['rim:Value'][0];
          }
      }
  }
  console.log('---------------------------------');
  console.log(prepXDSAtt);
  //fs.writeFileSync("extractedObject", util.inspect(prepXDSAtt));
  myCallback(prepXDSAtt, rXDSAttribute);
}

function processData (dataIn) {
  console.log('XML:\n' + dataIn);
  parseString(dataIn, function (err, result) {
    if (err) throw err;
    console.log('\nConverted to object: ');
    console.log('-----------------------\n' + result + '\n---------------------');
    var stringXDSAttrib = JSON.stringify(result);
    console.log('-----------------------\n' + stringXDSAttrib + '\n---------------------');
    /*
    fs.writeFile("temp2.json", stringXDSAttrib, function(err, data) {
      if (err) console.log(err);
      console.log("Successfully Written to File. ");
    });
    */
    assignAll(result, invokeContract);
  });
}

function Main () {
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
}

Main();
