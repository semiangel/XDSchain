var hrstart = null;
var hrend = null;
var net = require('net');
var fs = require("fs");
var util = require("util");
var xml2js = require('xml2js');
var parseString = xml2js.parseString;
var builder = new xml2js.Builder;

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Find Document Min
//=============================
var queryInputPack = 'IHEBLUE-2736^^^&1.3.6.1.4.1.28694.13.20.3000&ISO';
var queryApprovePack = 'urn:oasis:names:tc:ebxml-regrep:StatusType:Approved';
//=============================
//Find Document Max
//=============================
var queryOptClassCode = 'Treatment Plan or Protocol';
var queryOptTypeCode = 'LABORATORY REPORT.TOTAL';
var queryOptPracticeSettingCode = 'Gynecological oncology';
//urn:uuid:cccf5598-8b07-4b77-a05e-ae952c785ead
var queryOptCreationTimeFrom = '20070101';
var queryOptCreationTimeTo = '20071231';
//CreationTime
var queryOptServiceStartTimeFrom = '20070101';
var queryOptServiceStartTimeTo = '20071231';
//ServiceStartTime
var queryOptServiceStopTimeFrom = '20070101';
var queryOptServiceStopTimeTo = '20071231';
//ServiceStopTime
var queryOptHealthcareFacilityTypeCode = "Hospital-government";
//urn:uuid:f33fb8ac-18af-42cc-ae0e-ed0b0bdb91e1
//var queryOptEventCodeList = 'Foundational Connectathon Read-Access Policy';
var queryOptConfidentialityCode = 'Restricted';
var queryOptFormatCode = 'urn:ihe:iti:bppc:2007';
//=============================

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
	//rl.question("(Specify number): ", function(queryTypeInput) {
		var queryTypeInput = '1';
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
	//});
}

function getRequiredKeywords () {
	if (inputKeywords[0].indexOf('Find') > -1){
		console.log('Keywords require: ' + requiredKeywords[keywordCount]);
		var addedHeader = '$' + requiredKeywords[keywordCount];
		var requireKeyInput = 'None';
		if (keywordCount == 0) {
			requireKeyInput = queryInputPack;
		}
		else {
			requireKeyInput = queryApprovePack;
		}
		inputKeywords.push([addedHeader, requireKeyInput]);
		keywordCount++;
		if (keywordCount >= requiredKeywords.length){
			showAllKeywords();
			getOptionalKeywords(); 
		}
		else {
			getRequiredKeywords();
		}  
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
	//Skip prompt
		inputKeywords.push(['$XDSDocumentEntryClassCode', queryOptClassCode]);
		inputKeywords.push(['$XDSDocumentEntryTypeCode', queryOptTypeCode]);
		inputKeywords.push(['$XDSDocumentEntryPracticeSettingCode', queryOptPracticeSettingCode]);
		inputKeywords.push(['$XDSDocumentEntryCreationTimeFrom', queryOptCreationTimeFrom]);
		inputKeywords.push(['$XDSDocumentEntryCreationTimeTo', queryOptCreationTimeTo]);
		inputKeywords.push(['$XDSDocumentEntryServiceStartTimeFrom', queryOptServiceStartTimeFrom]);
		inputKeywords.push(['$XDSDocumentEntryServiceStartTimeTo', queryOptServiceStartTimeTo]);
		inputKeywords.push(['$XDSDocumentEntryServiceStopTimeFrom', queryOptServiceStopTimeFrom]);
		inputKeywords.push(['$XDSDocumentEntryServiceStopTimeTo', queryOptServiceStopTimeTo]);
		inputKeywords.push(['$XDSDocumentEntryHealthcareFacilityTypeCode', queryOptHealthcareFacilityTypeCode]);
		//inputKeywords.push(['$XDSDocumentEntryEventCodeList', queryOptEventCodeList]);
		inputKeywords.push(['$XDSDocumentEntryConfidentialityCode', queryOptConfidentialityCode]);
		inputKeywords.push(['$XDSDocumentEntryFormatCode', queryOptFormatCode]);

		var selectedOpt = 0;
		if (selectedOpt == '#'){ //'#' Mark as program terminate
			process.exit();
		}
		else if (selectedOpt == '0') { //'0' Mark as user approve that all known keywords included
			console.log('==========================');
			console.log('All keywords set...');
			showAllKeywords();
			createXML();
			return rl.close();
		}
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

function createXML () { //Assort keywords into ITI-18 XML format

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

	triggerAll();
}

function sendQuery (NodesNum) {
	var HOST = '127.0.0.1';
	var PORT = 65512 + NodesNum;
	var client = new net.Socket();
	client.connect(PORT, HOST, function() {
        console.log('CONNECTED TO: ' + HOST + ':' + PORT);
        // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
        var queryXMLrebuilt = builder.buildObject(queryXML);
        hrstart = process.hrtime();
        client.write(queryXMLrebuilt);
        console.log('Query Sent...');
    });

    // Add a 'data' event handler for the client socket
    // data is what the server sent to this socket
    client.on('data', function(data) {
        // Close the client socket completely
        if (data.includes('ACK from ')){
            console.log('Respond received: ' + data);
            hrend = process.hrtime(hrstart);
            console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
        }
        else {
            console.log('==============================\nQuery response received: ');
            var dataIn = data.toString();                
            parseString(dataIn, function (err, result) {
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
	           	hrend = process.hrtime(hrstart);
                console.log('==============================');
                console.log('Node: ' + NodesNum);
                var resultFile = 'resultQuery0' + NodesNum + '.txt';
            	var testResult = '\nExecution time (hr): ' + hrend[0] + 's ' +  hrend[1] / 1000000 + 'ms';
            	console.info(testResult);
            	fs.writeFile(resultFile, testResult, {flag: "a"}, function(err) {
		            if (err) console.log(err);
		            console.log("Successfully Written to File.");
		        });
            	console.log('==============================');
            });
            client.destroy();
            rl.close();
        }
    });

    // Add a 'close' event handler for the client socket
    client.on('close', function() {
        console.log('Connection closed');
    });
}

function triggerAll() {
	//rl.question("Choose documents: ", function(docNum) {
	    //docRegistBroadcast(docNum, 1);
	    sendQuery(1);
	    //docRegistBroadcast(docNum, 2);
	    sendQuery(2);
	    //docRegistBroadcast(docNum, 3);
	    sendQuery(3);
	    //docRegistBroadcast(docNum, 4);
	    sendQuery(4);
	    //docRegistBroadcast(docNum, 5);
	    sendQuery(5);
	    //docRegistBroadcast(docNum, 6);
	    sendQuery(6);
	    //docRegistBroadcast(docNum, 7);
	    sendQuery(7);
	//});
}

function docRegistBroadcast (docNum, i){
    var HOST = '127.0.0.1';
    var PORT = 65512 + i;
    var Nodes = i;
    var client = new net.Socket();
    client.connect(PORT, HOST, function() {

            console.log('CONNECTED TO: ' + HOST + ':' + PORT + ' Node: ' + Nodes);
            var docChosen = 'SingleDocumentEntry' + docNum + '.xml';
            fs.readFile(docChosen, function(err, buf) {
                if (err) console.log(err);
                var text = buf.toString();
                client.write(text);
                hrstart = process.hrtime();
                console.log('Sent: \n' + text + '\n');
            });
            rl.close();

    });

    client.on('data', function(data) {

        var hrend = process.hrtime(hrstart);
        console.log('==============================');
        console.log('Respond received: ' + data);
        console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
        console.log('==============================');
        client.destroy();
    });

    client.on('close', function() {
        console.log('Connection closed on Node: ' + Nodes);
    });
}

Main();

