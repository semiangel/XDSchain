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

var keywordCount = 0;

var queryTypeList = ['', 'FindDocuments', 'FindSubmissionSets', 'FindFolders', 
					'GetAll', 'GetDocuments', 'GetFolders', 'GetAssociations', 
					'GetDocumentsAndAssociations', 'GetSubmissionSets', 
					'GetSubmissionSetAndContents', 'GetFolderAndContents', 
					'GetFoldersForDocument', 'GetRelatedDocuments', 'FindDocumentsByReferenceId'];
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

}

function Main () {
	console.log('\n==================================');
	console.log('|| XDS Consumer Actor Interface ||');
	console.log('==================================');
	getQueryType();
}

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
		inputKeywords.push(queryType);
		keywordCount = 0;
		getRequiredKeywords();
	});
}

function getRequiredKeywords () {
	console.log('Keywords require: ' + requiredKeywords[keywordCount]);
	var addedHeader = '$' + requiredKeywords[keywordCount];
	rl.question('Value: ', function(requireKeyInput) {
		inputKeywords.push([addedHeader, requireKeyInput]);
		keywordCount++;
		if (keywordCount >= requiredKeywords.length){
			showAllKeywords();
			getOptionalKeywords(); 
		}
		else {
			getRequiredKeywords();
		}  
	});
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
			sendQuery();
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
							rl.question('Replace time value from: ', function(optionalKeyInputFrom) {
								rl.question('Replace time value to: ', function(optionalKeyInputTo) {
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
					rl.question('Time value from: ', function(optionalKeyInputFrom) {
						rl.question('Time value to: ', function(optionalKeyInputTo) {
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

function sendQuery () {
	
}

Main();

