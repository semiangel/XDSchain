var hrstart = null;
var hrend = null;
var fs = require("fs");
var net = require('net');
var util = require("util");
var xml2js = require('xml2js');
var parseString = xml2js.parseString;
var builder = new xml2js.Builder;
var moment = require('moment');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('XDSDomainSharedSecretKey');

var Web3 =  require('web3');

var HOST = '127.0.0.1';
var Nodes = 4;
var PORT = 65512 + Nodes; 

var web3 = new Web3("qdata/dd" + Nodes + "/geth.ipc", net);

var netServer = null;
var netSocket = null;

//RegisterDocumentSet-b=============================================================================================
//-----------------------------------------------
//Declare main object to store all META-data attributes essential for search operation
function registerDocumentSetb (inputAttributes) {
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

	//-----------------------------------------------
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

	  var contractAddress = require('./contractAddress.js');
	  console.log('Contract Address: ' + contractAddress);

	  var myContract = new web3.eth.Contract(abi, contractAddress, {
	    from: deployerAccount,
	      gas: 30000000
	  });

	  var Docid = 0;
	  var inputSearch = JSON.stringify(XDSMETADataAttributes);
	  var inputFull = JSON.stringify(rawXDSAttr);

	  myContract.methods.store(Docid, inputSearch, inputFull).send({
	    from: deployerAccount
	  }).then(function(receipt){
	    console.log(receipt);
	    console.log('====================\nTransaction success...');
	    hrend = process.hrtime(hrstart);
	    console.log('Node: ' + Nodes);
		console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
		console.log('====================');
	  });
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
	      if (bodyExtrinsicObject['$']['id']){
	      	prepXDSAtt.DocumentEntry.entryUUID = bodyExtrinsicObject['$']['id'];
	      }
	      if (bodyExtrinsicObject['$']['mimeType']){
	      	prepXDSAtt.DocumentEntry.mimeType = bodyExtrinsicObject['$']['mimeType'];
	      }
	      if (bodyExtrinsicObject['$']['objectType']){
	      	prepXDSAtt.DocumentEntry.objectType = bodyExtrinsicObject['$']['objectType'];
	      }
	      if (bodyExtrinsicObject['$']['status']){
	      	prepXDSAtt.DocumentEntry.availabilityStatus = bodyExtrinsicObject['$']['status'];
	      }
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
	          	var plaintext = bodyExtrinsicObject['rim:Slot'][i]['rim:ValueList'][0]['rim:Value'];
	          	var encryptedString = cryptr.encrypt(plaintext);
              	prepXDSAtt.DocumentEntry.sourcePatientInfo = 'Anonymized';
              	//Also replace the attributes within full XDSAttributes object with encrypted attribute
              	rXDSAttribute['soapenv:Envelope']['soapenv:Body'][0]['lcm:SubmitObjectsRequest'][0]['rim:RegistryObjectList'][0]['rim:ExtrinsicObject'][0]['rim:Slot'][i]['rim:ValueList'][0]['rim:Value'] = encryptedString;
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

	assignAll(inputAttributes, invokeContract);
}

//DocumentQuery=====================================================================================================
function documentQuery (inputAttributes) {
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



	async function checkLastID (sK, myCallback) {
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
	      gas: 30000000
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
	      gas: 30000000
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
	        myCallback(XDSattributes, sK, traceDocid, fullContract);
	      }
	    });
	  }  
	}

	//Compare keyword with JSON called from smartcontract
	function matchMaker (searchXDSAtt, sK, Docid, myCallback){ 
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

	  for (i = 0; i < sK.length - 1; i++){
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

	  if (matchedCount == sK.length - 1){
	    console.log('All matched, successfully... \nReturn document as search result:\n========================================');
	    console.log(searchXDSAtt.DocumentEntry);
	    console.log('========================================');
	    myCallback(Docid, sK, responseToUser);
	  }
	  else {
	    console.log('Unmatched...');
	  }  
	}	

	async function fullContract (Docid, sK, myCallback){
	  //web3.eth.defaultAccount = web3.eth.personal.getAccounts().then(console.log);
	  console.log('Calling for full document...');
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
	      gas: 30000000
	  });

	  console.log('Returning document: ' + Docid);
		myContract.methods.retreiveFull(Docid).call({
		from: deployerAccount
		}, (err,res) => {
			if (err) {
				console.log(err);
			} else {
				var XDSattributes = JSON.parse(res);
				myCallback(XDSattributes, sK);
			}
		}); 
	}

	function responseToUser (rXDSattribute, sK) {
		//Define variable for shorter object accessing
		var sEnvelope = rXDSattribute['soapenv:Envelope'];
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
		//Decrypt sourcePatientInfo -> So encryption just prevent those who look directly into contract to read the attribute
		//Alternatively, this can be left encrypted while require Document Consumer to decrypt by themselves
		for (var i = 0; i < bodyExtrinsicObject['rim:Slot'].length; i++) {
			if (bodyExtrinsicObject['rim:Slot'][i]['$']['name'] == 'sourcePatientInfo') {
				var encryptedString = bodyExtrinsicObject['rim:Slot'][i]['rim:ValueList'][0]['rim:Value'];
	          	var plaintext = cryptr.decrypt(encryptedString);
              	//Also replace the attributes within full XDSAttributes object with encrypted attribute
              	bodyExtrinsicObject['rim:Slot'][i]['rim:ValueList'][0]['rim:Value'] = plaintext.split(',');
			}
		}
		console.log('========================================\nReturn type: ' + sK[sK.length-1] + '\n========================================');
		var responseJSON = {
			"query:AdhocQueryResponse": {
				"$": {
					"status": "Success",
					"xmlns:query": "urn:oasis:names:tc:ebxml-regrep:xsd:query:3.0",
					"xmlns:rim": "urn:oasis:names:tc:ebxml-regrep:xsd:rim:3.0",
					"xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
					"xsi:schemaLocation": "urn:oasis:names:tc:ebxml-regrep:xsd:query:3.0 ../../schema/ebRS/query.xsd"
				},
				"rim:RegistryObjectList": [
					{
						"rim:ExtrinsicObject": [bodyExtrinsicObject]
					}
				]
			}
		}
		console.log(util.inspect(responseJSON));

		if (netServer && netSocket) {
			console.log('Responsing query result: ');
			var responseXML = builder.buildObject(responseJSON);
	        //var regex = /\r?\n|\r/g;
	        //var responseXML = responseXML.replace(regex,'');
	        netSocket.write(responseXML);
	        console.log('-----------------------');
	        console.log(responseXML);			
		}
		console.log('========================================\nDone!');
		hrend = process.hrtime(hrstart);
		console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
		console.log('========================================');
	}

	function specifyRequestType (requestedJSON, myCallback) {
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
	  }
	  else if (requestType == 'FindSubmissionSets'){ //Need to add case in DocSearch***
  		var rimSlot = requestedJSON['query:AdhocQueryRequest']['rim:AdhocQuery'][0]['rim:Slot'];
	    console.log(util.inspect(rimSlot));
	    for (i = 0; i < rimSlot.length; i++){
	    	if (rimSlot[i]['$']['name'] == '$XDSSubmissionSetPatientId'){
	    		searchKeyword.push(['SubmissionSet', 'patientId', rimSlot[i]['rim:ValueList'][0]['rim:Value'][0]]);
	    	}
	    	else if (rimSlot[i]['$']['name'] == '$XDSSubmissionSetSourceId'){
	    		searchKeyword.push(['SubmissionSet', 'sourceId', rimSlot[i]['rim:ValueList'][0]['rim:Value'][0]]);
	    	}
	    	else if (rimSlot[i]['$']['name'] == '$XDSSubmissionSetSubmissionTimeFrom'){ //***
	    		searchKeyword.push(['SubmissionSet', ['submissionTime', 'From'], rimSlot[i]['rim:ValueList'][0]['rim:Value'][0]]);
	    	}
	    	else if (rimSlot[i]['$']['name'] == '$XDSSubmissionSetSubmissionTimeTo'){ //***
	    		searchKeyword.push(['SubmissionSet', ['submissionTime', 'To'], rimSlot[i]['rim:ValueList'][0]['rim:Value'][0]]);
	    	}
	    	else if (rimSlot[i]['$']['name'] == '$XDSSubmissionSetAuthorPerson'){ //***
	    		searchKeyword.push(['SubmissionSet', ['author', 'authorPerson'], rimSlot[i]['rim:ValueList'][0]['rim:Value'][0]]);
	    	}
	    	else if (rimSlot[i]['$']['name'] == '$XDSSubmissionSetContentType'){
	    		searchKeyword.push(['SubmissionSet', ['contentTypeCodes', 'displayName'], rimSlot[i]['rim:ValueList'][0]['rim:Value'][0]]);
	    	}
	    	else if (rimSlot[i]['$']['name'] == '$XDSSubmissionSetStatus'){
	    		searchKeyword.push(['SubmissionSet', 'availabilityStatus', rimSlot[i]['rim:ValueList'][0]['rim:Value'][0]]);
	    	}
	    }
	  }
	  else if (requestType == 'FindFolders'){
	  	var rimSlot = requestedJSON['query:AdhocQueryRequest']['rim:AdhocQuery'][0]['rim:Slot'];
	  	console.log(util.inspect(rimSlot));
	  	for (i = 0; i < rimSlot.length; i++){
	  		if (rimSlot[i]['$']['name'] == '$XDSFolderPatientId'){
	  			searchKeyword.push(['Folder', 'patientId', rimSlot[i]['rim:ValueList'][0]['rim:Value'][0]]);
	  		}
	  		else if (rimSlot[i]['$']['name'] == '$XDSFolderLastUpdateTimeFrom'){ //***
	  			searchKeyword.push(['Folder', ['lastUpdateTime', 'From'], rimSlot[i]['rim:ValueList'][0]['rim:Value'][0]]);
	  		}
	  		else if (rimSlot[i]['$']['name'] == '$XDSFolderLastUpdateTimeTo'){ //***
	  			searchKeyword.push(['Folder', ['lastUpdateTime', 'To'], rimSlot[i]['rim:ValueList'][0]['rim:Value'][0]]);
	  		}
	  		else if (rimSlot[i]['$']['name'] == '$XDSFolderCodeList'){ //***
	  			searchKeyword.push(['Folder', 'codeList', rimSlot[i]['rim:ValueList'][0]['rim:Value'][0]]);
	  		}
	  		else if (rimSlot[i]['$']['name'] == '$XDSFolderStatus'){
	  			searchKeyword.push(['Folder', 'availabilityStatus', rimSlot[i]['rim:ValueList'][0]['rim:Value'][0]]);
	  		}
	  	}
	  }
	  else if (requestType == 'GetAll'){
	  	var rimSlot = requestedJSON['query:AdhocQueryRequest']['rim:AdhocQuery'][0]['rim:Slot'];
	  	console.log(util.inspect(rimSlot));
	  	for (i = 0; i < rimSlot.length; i++){
	  		if (rimSlot[i]['$']['name'] == '$patientId'){
	  			searchKeyword.push(['DocumentEntry', 'patientId', rimSlot[i]['rim:ValueList'][0]['rim:Value'][0]]);
	  			searchKeyword.push(['SubmissionSet', 'patientId', rimSlot[i]['rim:ValueList'][0]['rim:Value'][0]]);
	  			searchKeyword.push(['Folder', 'patientId', rimSlot[i]['rim:ValueList'][0]['rim:Value'][0]]);
	  		}
	  	}
	  }
	  searchKeyword.push([requestType, responseOption]);
	  console.log(searchKeyword);
	  myCallback(searchKeyword, invokeContract);
	}
	specifyRequestType(inputAttributes, checkLastID);
}

//ProcessData interprete any xmlMessages came through Netsocket=====================================================
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
      documentQuery(result);
    }
    else{
    	if (Object.keys(result)[0] == 'soapenv:Envelope'){
    		if (result['soapenv:Envelope']['soapenv:Header'][0]['wsa:Action'][0]['_'] == 'urn:ihe:iti:2007:RegisterDocumentSet-b'){
    			console.log('RegisterDocumentSet-b...');
    			registerDocumentSetb(result);
    		}
    	}
    }
  });
}

//Net socket wait for any messages===================================================================================

netServer = net.createServer(function(sock) {

  	netSocket = sock;
      
	// We have a connection - a socket object is assigned to the connection automatically
	console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);

	// Add a 'data' event handler to this instance of socket
	sock.on('data', function(data) {
		console.log('Received data....');
		hrstart = process.hrtime();
		sock.write('ACK from ' + sock.remoteAddress + '\n'); //Write ACK back to sender
		processData(data); //converting XML to JSON based on Module "xml-js"
		//console.log(result); // show the result of xml to js conversion
	           
	});

	// Add a 'close' event handler to this instance of socket
	sock.on('close', function(data) {
		console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort + " Node: " + Nodes);
	});
  
}).listen(PORT, HOST);

console.log('XDS Document Registry Actor listening on ' + HOST +':'+ PORT);
