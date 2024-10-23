var net = require('net');
var fs = require("fs");
var util = require("util");
var xml2js = require('xml2js');
var parseString = xml2js.parseString;
var builder = new xml2js.Builder;
const readline = require("readline");
var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var selectedMethod = process.argv[2];
var HOST = {};
var PORT = {};
var client = {};
var chunkSize = 1024;

var multipleServerStatus = false; //multiple server marker, false by default
var multipleCaseCounter = 0;

var serverIP = {};

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
      }
    }

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

var queryType = null;
var requiredKeywords = [];
var optionalKeywords = [];
var inputKeywords = [];

var keywordCount = 0;

var queryTypeList = ['', 'FindDocuments', 'FindSubmissionSets', 'FindFolders', 
					'GetAll', 'GetDocuments', 'GetFolders', 'GetAssociations', 
					'GetDocumentsAndAssociations', 'GetSubmissionSets', 
					'GetSubmissionSetAndContents', 'GetFolderAndContents', 
					'GetFoldersForDocument', 'GetRelatedDocuments', 'FindDocumentsByReferenceId'];
var queryTypeUUID = {
	FindDocuments: 'urn:uuid:14d4debf-8f97-4251-9a74-a90016b0af0d',
	FindSubmissionSets: 'urn:uuid:f26abbcb-ac74-4422-8a30-edb644bbc1a9',
	GetDocuments: 'urn:uuid:5c4f972b-d56b-40ac-a5fc-c8ca9b40b9d4'
}
var timeKeyList = ['$XDSDocumentEntryCreationTimeFrom', '$XDSDocumentEntryCreationTimeTo', 
					'$XDSDocumentEntryServiceStartTimeFrom', '$XDSDocumentEntryServiceStartTimeTo', 
					'$XDSDocumentEntryServiceStopTimeFrom', '$XDSDocumentEntryServiceStartTimeTo'];
var availableKeywords = {
	FindDocuments: {
		required: ['XDSDocumentEntryPatientId', 'XDSDocumentEntryStatus'],
		optional: ['XDSDocumentEntryClassCode', 'XDSDocumentEntryTypeCode', 
					'XDSDocumentEntryPracticeSettingCode', 'XDSDocumentEntryCreationTime', 
					'XDSDocumentEntryServiceStartTime', 'XDSDocumentEntryServiceStopTime', 
					'XDSDocumentEntryHealthcareFacilityTypeCode', 'XDSDocumentEntryEventCodeList', 
					'XDSDocumentEntryConfidentialityCode', 'XDSDocumentEntryAuthorPerson', 
					'XDSDocumentEntryFormatCode', 'XDSDocumentEntryType']
	},
	GetDocuments: {
		required: ['XDSDocumentEntryEntryUUID', 'XDSDocumentEntryUniqueId'],
		optional: ['XDSDocumentEntryHomeCommunityId']
	}
}

var queryXML = {
	"query:AdhocQueryRequest": {
	    "$": {
	      "xmlns:query": "urn:oasis:names:tc:ebxml-regrep:xsd:query:3.0",
	      "xmlns:rim": "urn:oasis:names:tc:ebxml-regrep:xsd:rim:3.0",
	      "xmlns:rs": "urn:oasis:names:tc:ebxml-regrep:xsd:rs:3.0",
	      "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
	      "xsi:schemaLocation": "urn:oasis:names:tc:ebxml-regrep:xsd:query:3.0 ../../schema/ebRS/query.xsd"
	    },
	    "query:ResponseOption": [
	      {
	        "$": {
	          "returnComposedObjects": "true", 
	          "returnType": "LeafClass" //This should be determined by number of results
	        }
	      }
	    ],
	    "rim:AdhocQuery": [
	      {
	        "$": {
	          "id": " urn:uuid:14d4debf-8f97-4251-9a74-a90016b0af0d " //This is UUIDd of each query type
	        },
	        "rim:Slot": [] //Query keyword
	      }
	    ]
	  }
	}

function Main () { //Standard program which provide command line UI for input
	console.log('\n==================================');
	console.log('|| XDS Consumer Actor Interface ||');
	console.log('==================================');
	getQueryType();
}

var queryOrRetrieveMarker = 0;
function getQueryType () {
	console.log('Please select query type');
	console.log('1) FindDocuments');
	console.log('2) FindSubmissionSets');
	console.log('3) FindFolders');
	console.log('4) GetAll');
	console.log('5) GetDocuments');
	console.log('6) GetFolders');
	console.log('7) GetAssociations');
	console.log('8) GetDocumentsAndAssociations');
	console.log('9) GetSubmissionSets');
	console.log('10) GetSubmissionSetAndContents');
	console.log('11) GetFolderAndContents');
	console.log('12) GetFoldersForDocument');
	console.log('13) GetRelatedDocuments');
	console.log('14) FindDocumentsByReferenceId');
	console.log('#) Quit');
	rl.question("(Specify number): ", function(queryTypeInput) {
		var queryTypeInteger = parseInt(queryTypeInput, 10);
		if (queryTypeInput && queryTypeInteger){
			queryType = queryTypeList[queryTypeInteger];
			console.log('Query Type: ' + queryType + '\n');
			requiredKeywords = availableKeywords[queryType]['required'];
			optionalKeywords = availableKeywords[queryType]['optional'];
		}
		else if (queryTypeInput == '#' || queryTypeInput == 'quit' || queryTypeInput == 'Quit'){
			console.log('Quit...');
			process.exit();
		}
		else {
			console.log('Error');
			process.exit();
		}
		if (queryOrRetrieveMarker == 0) {
			inputKeywords.push(queryType);
			keywordCount = 0;
			getRequiredKeywords();
		}
	});
}

function getRequiredKeywords () {
	if (inputKeywords[0].indexOf('Find') > -1){
		console.log('Keywords require: ' + requiredKeywords[keywordCount]);
		var addedHeader = '$' + requiredKeywords[keywordCount];
		rl.question('Value: ', function(requireKeyInput) {
			inputKeywords.push([addedHeader, requireKeyInput]);
			keywordCount++;
			if (keywordCount >= requiredKeywords.length){
				queryXML['query:AdhocQueryRequest']['query:ResponseOption'][0]['$']['returnType'] = 'ObjectRef';
				showAllKeywords();
				getOptionalKeywords(); 
			}
			else {
				getRequiredKeywords();
			}  
		});
	}
	else if (inputKeywords[0].indexOf('Get') > -1) {
		console.log('Please select the required keyword');
		var addedHeader; 
		for (i = 0; i < requiredKeywords.length; i++){ //Show all available required keywords
			var count = i+1;
			console.log(count + ') ' + requiredKeywords[i]);
		}
		rl.question('Value: ', function(selectedReqKeyword) {
			keywordCount = parseInt(selectedReqKeyword, 10);
			keywordCount--;
			addedHeader = '$' + requiredKeywords[keywordCount];
			console.log('Keyword: ' + requiredKeywords[keywordCount]);
			rl.question('Value: ', function(requireKeyInput) {
				inputKeywords.push([addedHeader, requireKeyInput]);
				queryXML['query:AdhocQueryRequest']['query:ResponseOption'][0]['$']['returnType'] = 'LeafClass';
				showAllKeywords();
				getOptionalKeywords();
			}); 
		}); 
	}
	else {
		process.exit();
	}
};

function getOptionalKeywords () {
	console.log('Available optional keywords: ');
	console.log('0) No more optional keywords');
	for (i = 0; i < optionalKeywords.length; i++){ //Show all available optional keywords
		var count = i+1;
		console.log(count + ') ' + optionalKeywords[i]);
	}
	console.log('#) Quit')
	rl.question('Select keywords (specify number): ', function(selectedOpt) { //Promt user for optional keyword by specifying number
		if (selectedOpt == '#'){ //'#' Mark as program terminate
			process.exit();
		}
		else if (selectedOpt == '0') { //'0' Mark as user approve that all known keywords included
			console.log('==========================');
			console.log('All keywords set...');
			showAllKeywords();
			createXML(HOST[multipleCaseCounter], PORT[multipleCaseCounter]);
			return rl.close();
		}
		else { //Otherwise
			var selectedOpt = parseInt(selectedOpt, 10);
			var optionMarker = selectedOpt - 1;
			console.log('Keyword: ' + optionalKeywords[optionMarker]);
			if (selectedOpt && optionMarker >= 0 && optionMarker < optionalKeywords.length){ //Check if user input is a number and the number is in available range
				var selectedOptKeywords = '$' + optionalKeywords[optionMarker];
				var replicateCheck = null;
				var timeKeyCheck = null;
				for (j = 1; j < inputKeywords.length; j++){ //Check for any replicated keyword specified
					if (inputKeywords[j][0] == selectedOptKeywords || inputKeywords[j][0] == selectedOptKeywords + 'From'){
						replicateCheck = 1;
						var replicatedKeywordPos = j;
					}
					if (timeKeyList.includes(selectedOptKeywords + 'From')){
						timeKeyCheck = 1;
					}
				}
				if (replicateCheck && !timeKeyCheck){ //If found any relicated keyword then ask if user want to replace the value && the keyword is not a time keyword
					console.log('Query keywords set already contain ' + selectedOptKeywords);
					rl.question('Overwrite the keyword? (y/n): ', function(overwriteConfirm) {
						if (overwriteConfirm == 'y' || overwriteConfirm == 'Y' || overwriteConfirm == 'yes' || overwriteConfirm == 'Yes'){ //Ask for user to specify yes or else
							rl.question('Replace with value: ', function(optionalKeyInput) {
								if (inputKeywords[replicatedKeywordPos][0] == selectedOptKeywords){ //Second check if the keyword really replicated
									inputKeywords[replicatedKeywordPos][1] = optionalKeyInput;
									showAllKeywords();
									getOptionalKeywords();
								}
							});
						}
						else { //If user not confirm on overwrite the keyword, just skip overwriting
							console.log('Overwrite cancelled...');
							showAllKeywords();
							getOptionalKeywords();
						}
					});
				}
				else if (replicateCheck && timeKeyCheck){ //If found any relicated keyword then ask if user want to replace the value && the keyword is a time keyword
					console.log('Query keywords set already contain ' + selectedOptKeywords);
					rl.question('Overwrite the keyword? (y/n): ', function(overwriteConfirm) {
						if (overwriteConfirm == 'y' || overwriteConfirm == 'Y' || overwriteConfirm == 'yes' || overwriteConfirm == 'Yes'){ //Ask for user to specify yes or else
							rl.question('Replace time value from (YYYYMMDDhhmmss): ', function(optionalKeyInputFrom) {
								rl.question('Replace time value to (YYYYMMDDhhmmss): ', function(optionalKeyInputTo) {
									inputKeywords[replicatedKeywordPos][1] = optionalKeyInputFrom;
									inputKeywords[replicatedKeywordPos + 1][1] = optionalKeyInputTo;
									showAllKeywords();
									getOptionalKeywords();
								});
							});
						}
						else { //If user not confirm on overwrite the keyword, just skip overwriting
							console.log('Overwrite cancelled...');
							showAllKeywords();
							getOptionalKeywords();
						}
					});
				}
				else if (!replicateCheck && timeKeyCheck){ //If non of any replicated were found, then add more keyword into query set && the keyword is a time keyword
					rl.question('Time value from (YYYYMMDDhhmmss): ', function(optionalKeyInputFrom) {
						rl.question('Time value to (YYYYMMDDhhmmss): ', function(optionalKeyInputTo) {
							inputKeywords.push([selectedOptKeywords + 'From', optionalKeyInputFrom]);
							inputKeywords.push([selectedOptKeywords + 'To', optionalKeyInputTo]);
							showAllKeywords();
							getOptionalKeywords();
						});
					});
				}
				else { //If non of any replicated were found, then add more keyword into query set
					rl.question('Value: ', function(optionalKeyInput) {
						inputKeywords.push([selectedOptKeywords, optionalKeyInput]);
						showAllKeywords();
						getOptionalKeywords();
					});
				}
			}
			else { //If user try to input anything that not available, force to try again
				console.log('Error, try again...');
				getOptionalKeywords();
			}
		}
	});
}

function showAllKeywords () {
	console.log('==========================');
	console.log('Query type: ' + inputKeywords[0]);
	console.log('Query keywords: ');
	for (i = 1; i < inputKeywords.length; i++){
		console.log(inputKeywords[i][0] + ' = ' + inputKeywords[i][1]);
	}
	console.log('==========================');
}

function createXML (sHOST, sPORT) { //Assort keywords into ITI-18 XML format
	console.log('Creating XML message...');

	queryXML['query:AdhocQueryRequest']['rim:AdhocQuery'][0]['$']['id'] = queryTypeUUID[inputKeywords[0]];

	var slot = queryXML['query:AdhocQueryRequest']['rim:AdhocQuery'][0]['rim:Slot'];

	for (i = 1; i < inputKeywords.length; i++){
		var rimSlot = {
	        "$": {
	          	"name": inputKeywords[i][0]
	        },
	        "rim:ValueList": [
	          	{
		            "rim:Value": [
		            	inputKeywords[i][1]
		            ]
	          	}
	        ]
	    }

	    slot.push(rimSlot);
	}

	sendQuery(sHOST, sPORT);
}

//Send number of chunk to let the receiver know
var prepareSendChunk = function(sHOST) {
	if (sHOST == client[sHOST].remoteAddress) {
		console.log('Destination checked...');
		var chunkCount = serverIP[client[sHOST].remoteAddress].xmlChunks.length + 1; //+1 also count the chunkCount value
		console.log("***************************");
		console.log("Chunk pieces: " + chunkCount);
		console.log("***************************");
		if (chunkCount) {
			console.log("sending chunkCount");
			client[sHOST].write(chunkCount.toString());
		}
		console.log('Sent: \n' + serverIP[client[sHOST].remoteAddress].xmlMessage + '\n');    
	}
	else {
		console.log('Oops! Something went wrong!!!!');
	}
}

// Send packets one by one
var sendNextChunk = function(targetServer) {
    if (serverIP[client[targetServer].remoteAddress].round < serverIP[client[targetServer].remoteAddress].xmlChunks.length) {
        client[targetServer].write(serverIP[client[targetServer].remoteAddress].xmlChunks[serverIP[client[targetServer].remoteAddress].round], function() {
            serverIP[client[targetServer].remoteAddress].round++;
        });
    }
};

var serverCompletedCount = 0;
//Check if perform query on multiple server and handle proper display method
function multipleServerCheck (mHOST) {

	function writeSameline (timerSum, writeCounter) {
		var testResult = ' ' + timerSum[writeCounter].toString().replace(/\n/g, '');
		fs.writeFile("ConsumerResult.txt", testResult, {flag: "a"}, function(err) {
			if (err) console.log(err);
			console.log("Successfully Written to File.");
			writeCounter++;
			if (writeCounter < 8) {
				writeSameline(timerSum, writeCounter);
			}
		});
	}
	function writeNewline (timerSum) {
		var writeCounter = 0;
		var testResult = '\n' + timerSum[writeCounter].toString().replace(/\n/g, '');
		fs.writeFile("ConsumerResult.txt", testResult, {flag: "a"}, function(err) {
			if (err) console.log(err);
			console.log("Successfully Written to File.");
			writeCounter++;
			writeSameline(timerSum, writeCounter);
		});
	}
	client[mHOST].end();
	if (multipleServerStatus == true) { //if query on multiple server is true
		console.log('Server 0' + serverCompletedCount + ' completed');
		serverCompletedCount++;
		if (serverCompletedCount == 8) {
			var timerSum = {};
			console.log('==============================');
			for (var locali = 0; locali < 8; locali++) {
				var ipSource = '192.168.1.10' + locali.toString();
				console.log('\nIP: ' + ipSource);
				console.log('Execution time (hr): %ds %dms\n', serverIP[ipSource].hrend[0], serverIP[ipSource].hrend[1] / 1000000);
				timerSum[locali] = serverIP[ipSource].hrend[1] / 1000000;
			}
			writeNewline(timerSum);
			console.log('==============================');
		}
		if (pseudoSingle == true) {
			queryOnNextServer();
		}
	}
	else { //else, query on single server
		console.log('==============================');
		console.info('Execution time (hr): %ds %dms', serverIP[client[mHOST].remoteAddress].hrend[0], serverIP[client[mHOST].remoteAddress].hrend[1] / 1000000);
		console.log('==============================');
	}
}

//If All case is present, move on to query to next server with this function
function queryOnNextServer () {
	if (multipleServerStatus == true) {
		multipleCaseCounter++;
		if (multipleCaseCounter < 8) {
			HOST[multipleCaseCounter] = '192.168.1.10' + multipleCaseCounter;
			PORT[multipleCaseCounter] = 65510 + multipleCaseCounter;
			createXML(HOST[multipleCaseCounter], PORT[multipleCaseCounter]);
		}
	} 
}

function processQueryResult (fromServer) { 
	console.log('Begin process result for display...');               
	parseString(serverIP[fromServer].dataIn, function (err, result) {
		var eventCodeListCount = 0;
		if (err) throw err;
		var responseState = result['query:AdhocQueryResponse']['$']['status'];
		if (responseState == 'Failure') {
			console.log('Result not found...');
		}
		else {
			//LeafClass
			if (result['query:AdhocQueryResponse']['rim:RegistryObjectList'][0]['rim:ExtrinsicObject']) {
				var bodyExtrinsicObject = result['query:AdhocQueryResponse']['rim:RegistryObjectList'][0]['rim:ExtrinsicObject'][0];
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
						prepXDSAtt.DocumentEntry.sourcePatientInfo = bodyExtrinsicObject['rim:Slot'][i]['rim:ValueList'][0]['rim:Value'];;
					  }
				  }
				}
				console.log(util.inspect(prepXDSAtt));
			}
			else {
				var listObjectRef = result['query:AdhocQueryResponse']['rim:RegistryObjectList'];
				console.log('Result found:');
				for (i = 0; i < listObjectRef.length; i++) {
					console.log(util.inspect(listObjectRef[i]['rim:ObjectRef'][0]['$']['id']));
				}
			}
		}
	});
	rl.close();
	multipleServerCheck(fromServer);
}

function sendQuery (sHOST, sPORT) {
	console.log('Attempt connect to server... ' + sHOST + ' ' + sPORT);
	client[sHOST] = new net.Socket();
	client[sHOST].connect(sPORT, sHOST, function() {
        console.log('CONNECTED TO: ' + client[sHOST].remoteAddress + ':' + client[sHOST].remotePort);
        // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
		serverIP[client[sHOST].remoteAddress] = {
			messageArray: [], // Array to store small packets | for query result
			messageChunks: 2,
			receiveCounter: 0,
			xmlMessage: null, // for searching, init query
			xmlChunks: [],
			round: 0,
			dataIn: null, //for handle query result data
			hrstart: null,
			hrend: null
		};
        var queryXMLrebuilt = builder.buildObject(queryXML);
		serverIP[client[sHOST].remoteAddress].xmlMessage = queryXMLrebuilt.toString();

		// Split XML message into smaller packets
		serverIP[client[sHOST].remoteAddress].xmlChunks = [];
		var chunk = "";
		for (var i = 0; i < serverIP[client[sHOST].remoteAddress].xmlMessage.length; i++) {
			chunk += serverIP[client[sHOST].remoteAddress].xmlMessage[i];
			if (chunk.length === chunkSize || i === serverIP[client[sHOST].remoteAddress].xmlMessage.length - 1) {
				serverIP[client[sHOST].remoteAddress].xmlChunks.push(chunk);
				chunk = "";
			}
		}
		prepareSendChunk(sHOST); //Prepare and enter packets sending loop
    });

	//pseudoSingle will become true if it was supposed to be single query, this is just for perform experiment
	if (pseudoSingle == false) {
		queryOnNextServer();
	}

    // Add a 'data' event handler for the client socket
    // data is what the server sent to this socket
    client[sHOST].on('data', function(data) {
		console.log('Received packet....');
		if (serverIP[client[sHOST].remoteAddress].receiveCounter == 0) {
			if (data == "ACK") {
				sendNextChunk(client[sHOST].remoteAddress);
			}
			else if (data == "FIN"){
				serverIP[client[sHOST].remoteAddress].hrstart = process.hrtime();
				console.log('Query Sent...');
				serverIP[client[sHOST].remoteAddress].xmlChunks = [];
				serverIP[client[sHOST].remoteAddress].round = 0;
				serverIP[client[sHOST].remoteAddress].xmlMessage = null;
			}
			else {
				serverIP[client[sHOST].remoteAddress].messageChunks = data;
				console.log("Total Chunk = " + serverIP[client[sHOST].remoteAddress].messageChunks);
				serverIP[client[sHOST].remoteAddress].receiveCounter++;
				client[sHOST].write("ACK");
			}
		}
		else {
			serverIP[client[sHOST].remoteAddress].messageArray.push(data);
			serverIP[client[sHOST].remoteAddress].receiveCounter++;
			console.log(serverIP[client[sHOST].remoteAddress].receiveCounter);
			if(serverIP[client[sHOST].remoteAddress].receiveCounter == serverIP[client[sHOST].remoteAddress].messageChunks){
				// All packets have been received, combine the packets into original message
				client[sHOST].write("FIN");
				serverIP[client[sHOST].remoteAddress].hrend = process.hrtime(serverIP[client[sHOST].remoteAddress].hrstart);
				var originalMessage = Buffer.concat(serverIP[client[sHOST].remoteAddress].messageArray).toString();
				//console.log(result); // show the result of xml to js conversion
				// reset the serverIP[client[sHOST].remoteAddress].messageArray and serverIP[client[sHOST].remoteAddress].receiveCounter
				serverIP[client[sHOST].remoteAddress].messageArray = [];
				serverIP[client[sHOST].remoteAddress].receiveCounter = 0;
				console.log('==============================\nQuery response received: ');
				serverIP[client[sHOST].remoteAddress].dataIn = originalMessage.toString();
				processQueryResult(client[sHOST].remoteAddress);
			}
			else {
				client[sHOST].write("ACK");
			}
		}
    });

	client[sHOST].on('end', function() {
        console.log('Connection ended with ' + client[sHOST].remoteAddress);
    });

    // Add a 'close' event handler for the client socket
    client[sHOST].on('close', function() {
        console.log('Connection closed ' + client[sHOST].remoteAddress);
    });
}

//These functionis and variables use for experiment only ================
var forExpDocSearchKeywords = {};
forExpDocSearchKeywords['01'] = {
	requiredKeywords: [
		['XDSDocumentEntryClassCode', 'IHEBLUE-2736^^^&1.3.6.1.4.1.21367.13.20.3000&ISO'], 
		['XDSDocumentEntryStatus', 'urn:oasis:names:tc:ebxml-regrep:StatusType:Approved']
	],
	optionalKeywords: [
		['XDSDocumentEntryClassCode', 'Treatment Plan or Protocol'],
		['XDSDocumentEntryTypeCode', 'LABORATORY REPORT.TOTAL'],
		['XDSDocumentEntryPracticeSettingCode', 'Pathology'],
		['XDSDocumentEntryCreationTime', 20061224],
		['XDSDocumentEntryServiceStartTime', 200612230800],
		['XDSDocumentEntryServiceStopTime', 200612230900],
		['XDSDocumentEntryHealthcareFacilityTypeCode', 'Private home-based care'],
		['XDSDocumentEntryConfidentialityCode', 'Restricted'],
		['XDSDocumentEntryAuthorPerson', '^Smitty^Gerald^^^'],
		['XDSDocumentEntryFormatCode', 'urn:ihe:iti:bppc:2007'],
		['XDSDocumentEntryType', 'urn:uuid:7edca82f-054d-47f2-a032-9b2a5b5186c1']
	],
	getDocKeywords: [
		['XDSDocumentEntryEntryUUID', "Document01"], 
		['XDSDocumentEntryUniqueId', "1.2.42.20190405034511.30"]
	]
};
forExpDocSearchKeywords['10'] = {
	requiredKeywords: [
		['XDSDocumentEntryClassCode', 'IHEBLUE-2736^^^&1.3.6.1.4.1.00234.13.20.3000&ISO'], 
		['XDSDocumentEntryStatus', 'urn:oasis:names:tc:ebxml-regrep:StatusType:Approved']
	],
	optionalKeywords: [
		['XDSDocumentEntryClassCode', 'Treatment Plan or Protocol'],
		['XDSDocumentEntryTypeCode', 'LABORATORY REPORT.TOTAL'],
		['XDSDocumentEntryPracticeSettingCode', 'Surgery-Cardiac surgery'],
		['XDSDocumentEntryCreationTime', 20070510],
		['XDSDocumentEntryServiceStartTime', 200705100800],
		['XDSDocumentEntryServiceStopTime', 200705100900],
		['XDSDocumentEntryHealthcareFacilityTypeCode', "Hospital-Veterans' Administration"],
		['XDSDocumentEntryConfidentialityCode', 'Restricted'],
		['XDSDocumentEntryAuthorPerson', '^Harriette^Whitworth^^^'],
		['XDSDocumentEntryFormatCode', 'urn:ihe:iti:bppc:2007'],
		['XDSDocumentEntryType', 'urn:uuid:7edca82f-054d-47f2-a032-9b2a5b5186c1']
	],
	getDocKeywords: [
		['XDSDocumentEntryEntryUUID', "Document10"], 
		['XDSDocumentEntryUniqueId', "1.2.42.44004336459043.30"]
	]
};

//================================================================================================

var pseudoSingle = false;
if (selectedMethod) { //For experiment only, input must also specified Doc Number like 00,01,..
	var selectedMethodArray = [selectedMethod.slice(0, -2), selectedMethod.slice(-2)];
	var selectedDoc = selectedMethodArray[1];
	if (selectedMethodArray[0] == "FindMinSingle") {
		multipleServerStatus = true;
		pseudoSingle = true;
		queryType = "FindDocuments";
		inputKeywords.push(queryType);
		//add requierd keywords
		for (var i = 0; i < forExpDocSearchKeywords[selectedDoc].requiredKeywords.length; i++) {
			inputKeywords.push(forExpDocSearchKeywords[selectedDoc].requiredKeywords[i]);
		}
		showAllKeywords();
		HOST[multipleCaseCounter] = '192.168.1.100';
		PORT[multipleCaseCounter] = 65510;
		createXML(HOST[multipleCaseCounter], PORT[multipleCaseCounter]);
	}
	else if (selectedMethodArray[0] == "FindMinAll") {
		multipleServerStatus = true; //multiple server marker
		queryType = "FindDocuments";
		inputKeywords.push(queryType);
		//add required keywords
		for (var i = 0; i < forExpDocSearchKeywords[selectedDoc].requiredKeywords.length; i++) {
			inputKeywords.push(forExpDocSearchKeywords[selectedDoc].requiredKeywords[i]);
		}
		showAllKeywords();
		HOST[multipleCaseCounter] = '192.168.1.100';
		PORT[multipleCaseCounter] = 65510;
		createXML(HOST[multipleCaseCounter], PORT[multipleCaseCounter]);
	}
	else if (selectedMethodArray[0] == "FindMaxSingle") {
		multipleServerStatus = true;
		pseudoSingle = true;
		queryType = "FindDocuments";
		inputKeywords.push(queryType);
		//add requierd keywords
		for (var i = 0; i < forExpDocSearchKeywords[selectedDoc].requiredKeywords.length; i++) {
			inputKeywords.push(forExpDocSearchKeywords[selectedDoc].requiredKeywords[i]);
		}
		//add optional keywords
		for (var i = 0; i < forExpDocSearchKeywords[selectedDoc].optionalKeywords.length; i++) {
			inputKeywords.push(forExpDocSearchKeywords[selectedDoc].optionalKeywords[i]);
		}
		showAllKeywords();
		HOST[multipleCaseCounter] = '192.168.1.100';
		PORT[multipleCaseCounter] = 65510;
		createXML(HOST[multipleCaseCounter], PORT[multipleCaseCounter]);
	}
	else if (selectedMethodArray[0] == "FindMaxAll") {
		multipleServerStatus = true; //multiple server marker
		queryType = "FindDocuments";
		inputKeywords.push(queryType);
		//add requierd keywords
		for (var i = 0; i < forExpDocSearchKeywords[selectedDoc].requiredKeywords.length; i++) {
			inputKeywords.push(forExpDocSearchKeywords[selectedDoc].requiredKeywords[i]);
		}
		//add optional keywords
		for (var i = 0; i < forExpDocSearchKeywords[selectedDoc].optionalKeywords.length; i++) {
			inputKeywords.push(forExpDocSearchKeywords[selectedDoc].optionalKeywords[i]);
		}
		showAllKeywords();
		HOST[multipleCaseCounter] = '192.168.1.100';
		PORT[multipleCaseCounter] = 65510;
		createXML(HOST[multipleCaseCounter], PORT[multipleCaseCounter]);
	}
	else if (selectedMethodArray[0] == "GetDocSingle") {
		multipleServerStatus = true;
		pseudoSingle = true;
		queryType = "GetDocuments";
		inputKeywords.push(queryType);
		// add GetDoc keywords
		for (var i = 0; i < forExpDocSearchKeywords[selectedDoc].getDocKeywords.length; i++) {
			inputKeywords.push(forExpDocSearchKeywords[selectedDoc].getDocKeywords[i]);
		}
		showAllKeywords();
		HOST[multipleCaseCounter] = '192.168.1.100';
		PORT[multipleCaseCounter] = 65510;
		createXML(HOST[multipleCaseCounter], PORT[multipleCaseCounter]);
	}
	else if (selectedMethodArray[0] == "GetDocAll") {
		multipleServerStatus = true; //multiple server marker
		queryType = "GetDocuments";
		inputKeywords.push(queryType);
		// add GetDoc keywords
		for (var i = 0; i < forExpDocSearchKeywords[selectedDoc].getDocKeywords.length; i++) {
			inputKeywords.push(forExpDocSearchKeywords[selectedDoc].getDocKeywords[i]);
		}
		showAllKeywords();
		HOST[multipleCaseCounter] = '192.168.1.100';
		PORT[multipleCaseCounter] = 65510;
		createXML(HOST[multipleCaseCounter], PORT[multipleCaseCounter]);
	}
	else {
		console.log("Method not matched...\nExit...");
	}
}
//end of experiment only code=====================================================================
else {
	HOST[multipleCaseCounter] = '192.168.1.100';
	PORT[multipleCaseCounter] = 65510;
	Main();
}