var net = require('net');
var fs = require("fs");
var util = require("util");
var xml2js = require('xml2js');
var parseString = xml2js.parseString;

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var HOST = '127.0.0.1';
var PORT = 65519;
//var HOST = '192.168.176.128';
//var PORT = 8080;
var client = new net.Socket();
/*
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
          "returnType": "LeafClass" //Define return type, ObjRef or LeafClass
        }
      }
    ],
    "rim:AdhocQuery": [
      {
        "$": {
          "id": " urn:uuid:14d4debf-8f97-4251-9a74-a90016b0af0d "
        },
        "rim:Slot": [] //Query keyword
      }
    ]
  }
}

          {
            "$": {
              "name": "$XDSDocumentEntryPatientId"
            },
            "rim:ValueList": [
              {
                "rim:Value": [
                  "st3498702^^^&1.3.6.1.4.1.21367.2005.3.7&ISO"
                ]
              }
            ]
          },
          */

var queryType = null;
var requiredKeywords = [];
var optionalKeywords = [];
var inputKeywords = [];

function getQueryType (myCallback) {
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
		if (queryTypeInput == '1'){
			queryType = 'FindDocuments';
			console.log('Query Type: ' + queryType + '\n');
			requiredKeywords = ['XDSDocumentEntryPatientId', 'XDSDocumentEntryStatus'];
			optionalKeywords = ['XDSDocumentEntryClassCode', 'XDSDocumentEntryTypeCode', 'XDSDocumentEntryPracticeSettingCode', 'XDSDocumentEntryCreationTime', 'XDSDocumentEntryServiceStartTime', 'XDSDocumentEntryServiceStopTime', 'XDSDocumentEntryHealthcareFacilityTypeCode', 'XDSDocumentEntryEventCodeList', 'XDSDocumentEntryConfidentialityCode', 'XDSDocumentEntryAuthorPerson', 'XDSDocumentEntryFormatCode', 'XDSDocumentEntryType'];
		}
		else if (queryTypeInput == '2'){
			queryType = 'FindSubmissionSets';
			console.log('Query Type: ' + queryType + '\n');
		}
		else if (queryTypeInput == '3'){
			queryType = 'FindFolders';
			console.log('Query Type: ' + queryType + '\n');
		}
		else if (queryTypeInput == '4'){
			queryType = 'GetAll';
			console.log('Query Type: ' + queryType + '\n');
		}
		else if (queryTypeInput == '5'){
			queryType = 'GetDocuments';
			console.log('Query Type: ' + queryType + '\n');
		}
		else if (queryTypeInput == '6'){
			queryType = 'GetFolders';
			console.log('Query Type: ' + queryType + '\n');
		}
		else if (queryTypeInput == '7'){
			queryType = 'GetAssociations';
			console.log('Query Type: ' + queryType + '\n');
		}
		else if (queryTypeInput == '8'){
			queryType = 'GetDocumentsAndAssociations';
			console.log('Query Type: ' + queryType + '\n');
		}
		else if (queryTypeInput == '9'){
			queryType = 'GetSubmissionSets';
			console.log('Query Type: ' + queryType + '\n');
		}
		else if (queryTypeInput == '10'){
			queryType = 'GetSubmissionSetAndContents';
			console.log('Query Type: ' + queryType + '\n');
		}
		else if (queryTypeInput == '11'){
			queryType = 'GetFolderAndContents';
			console.log('Query Type: ' + queryType + '\n');
		}
		else if (queryTypeInput == '12'){
			queryType = 'GetFoldersForDocument';
			console.log('Query Type: ' + queryType + '\n');
		}
		else if (queryTypeInput == '13'){
			queryType = 'GetRelatedDocuments';
			console.log('Query Type: ' + queryType + '\n');
		}
		else if (queryTypeInput == '14'){
			queryType = 'FindDocumentsByReferenceId';
			console.log('Query Type: ' + queryType + '\n');
		}
		else if (queryTypeInput == '#' || queryTypeInput == 'quit' || queryTypeInput == 'Quit'){
			console.log('Quit...');
			process.exit();
		}
		else {
			console.log('Error');
			process.exit();
		}
		inputKeywords.push(queryType);
		myCallback(queryType);
	});
}

function getRequiredKeywords (queryType){
	console.log('Keywords require: ');
	for (i = 0; i < requiredKeywords.length; i++){
		console.log(requiredKeywords[i]);
		var addedHeader = '$' + requiredKeywords[i];
		rl.question("Value: ", function(requireKeyInput) {
			inputKeywords.push([addedHeader, requireKeyInput]);
			if (i == requiredKeywords.length){
				console.log(inputKeywords);
				rl.close();
			}
		});
	}
}

function Main () {
	console.log('\n==================================');
	console.log('|| XDS Consumer Actor Interface ||');
	console.log('==================================');
	getQueryType(getRequiredKeywords);
}

Main();

