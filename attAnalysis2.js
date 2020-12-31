var fs = require("fs");
var xml2js = require('xml2js');
const util = require('util');
var parseString = xml2js.parseString;

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
    author: {
        authorPerson: 'N/A',
        authorInstitution: [],
        authorRole: 'N/A',
        authorSpecialty: 'N/A'
      },
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

//Define UUID number of each META-data attributes
var numUUID = {
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
    eventCodeList: 'urn:uuid:2c6b8cb7-8b2a-4051-b291-b1ae6a575ef4',
    //------SubmissionSet Attributes---------------------------------
    subAuthor: 'urn:uuid:a7058bb9-b4e4-4307-ba5b-e3f0ab85e12d',
    contentTypeCodes: 'urn:uuid:aa543740-bdda-424e-8c96-df4873be8500',
    subUniqueId: 'urn:uuid:96fdda7c-d067-4183-912e-bf5ee74998a8',
    sourceId: 'urn:uuid:554ac39e-e3fe-47fe-b233-965d2a147832',
    subPatientId: 'urn:uuid:6b5aea1a-874d-4603-a4bc-96a0a7b38446',
    limitedMetadata: 'urn:uuid:a54d6aa5-d40d-43f9-88c5-b4633d873bdd'
}

//read XML sample file
fs.readFile("SingleDocumentEntry.xml", function(err, buf) {
    parseString(buf, function (err, result) {
        if (err) throw err;
        console.log('\nConverted to object... ');
        /*       //Write to file---------------------------------------------------
        fs.writeFile("temp2.json", JSON.stringify(result), function(err, data) {
          if (err) console.log(err);
          console.log("Successfully Written to File. ");
        });
        */

        //Define variable for shorter object accessing
        var sEnvelope = result['soapenv:Envelope'];
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
        if (bodyExtrinsicObject['$']['objectType'] == numUUID.DocumentEntry){
            //Scanning object within DocumentEntry "Classification"
            for (var i = 0; i < bodyExtrinsicObject['rim:Classification'].length; i++){
                //Detect DocumentEntry > author (Set)
                if (bodyExtrinsicObject['rim:Classification'][i]['$']['classificationScheme'] == numUUID.author){
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
                if (bodyExtrinsicObject['rim:Classification'][i]['$']['classificationScheme'] == numUUID.classCode){
                    prepXDSAtt.DocumentEntry.classCode.displayName = bodyExtrinsicObject['rim:Classification'][i]['rim:Name'][0]['rim:LocalizedString'][0]['$']['value'];
                    if (bodyExtrinsicObject['rim:Classification'][i]['rim:Slot'][0]['$']['name'] == 'codingScheme'){
                        prepXDSAtt.DocumentEntry.classCode.codingScheme = bodyExtrinsicObject['rim:Classification'][i]['rim:Slot'][0]['rim:ValueList'][0]['rim:Value'][0];
                    }
                }
                //Detect DocumentEntry > confidentialityCode
                if (bodyExtrinsicObject['rim:Classification'][i]['$']['classificationScheme'] == numUUID.confidentialityCode){
                    prepXDSAtt.DocumentEntry.confidentialityCode.displayName = bodyExtrinsicObject['rim:Classification'][i]['rim:Name'][0]['rim:LocalizedString'][0]['$']['value'];
                    if (bodyExtrinsicObject['rim:Classification'][i]['rim:Slot'][0]['$']['name'] == 'codingScheme'){
                        prepXDSAtt.DocumentEntry.confidentialityCode.codingScheme = bodyExtrinsicObject['rim:Classification'][i]['rim:Slot'][0]['rim:ValueList'][0]['rim:Value'][0];
                    }
                }
                //Detect DocumentEntry > formatCode
                if (bodyExtrinsicObject['rim:Classification'][i]['$']['classificationScheme'] == numUUID.formatCode){
                    prepXDSAtt.DocumentEntry.formatCode.displayName = bodyExtrinsicObject['rim:Classification'][i]['rim:Name'][0]['rim:LocalizedString'][0]['$']['value'];
                    if (bodyExtrinsicObject['rim:Classification'][i]['rim:Slot'][0]['$']['name'] == 'codingScheme'){
                        prepXDSAtt.DocumentEntry.formatCode.codingScheme = bodyExtrinsicObject['rim:Classification'][i]['rim:Slot'][0]['rim:ValueList'][0]['rim:Value'][0];
                    }
                }
                //Detect DocumentEntry > healthcareFacilityTypeCode
                if (bodyExtrinsicObject['rim:Classification'][i]['$']['classificationScheme'] == numUUID.healthcareFacilityTypeCode){
                    prepXDSAtt.DocumentEntry.healthcareFacilityTypeCode.displayName = bodyExtrinsicObject['rim:Classification'][i]['rim:Name'][0]['rim:LocalizedString'][0]['$']['value'];
                    if (bodyExtrinsicObject['rim:Classification'][i]['rim:Slot'][0]['$']['name'] == 'codingScheme'){
                        prepXDSAtt.DocumentEntry.healthcareFacilityTypeCode.codingScheme = bodyExtrinsicObject['rim:Classification'][i]['rim:Slot'][0]['rim:ValueList'][0]['rim:Value'][0];
                    }
                }
                //Detect DocumentEntry > practiceSettingCode
                if (bodyExtrinsicObject['rim:Classification'][i]['$']['classificationScheme'] == numUUID.practiceSettingCode){
                    prepXDSAtt.DocumentEntry.practiceSettingCode.displayName = bodyExtrinsicObject['rim:Classification'][i]['rim:Name'][0]['rim:LocalizedString'][0]['$']['value'];
                    if (bodyExtrinsicObject['rim:Classification'][i]['rim:Slot'][0]['$']['name'] == 'codingScheme'){
                        prepXDSAtt.DocumentEntry.practiceSettingCode.codingScheme = bodyExtrinsicObject['rim:Classification'][i]['rim:Slot'][0]['rim:ValueList'][0]['rim:Value'][0];
                    }
                }
                //Detect DocumentEntry > eventCode
                if (bodyExtrinsicObject['rim:Classification'][i]['$']['classificationScheme'] == numUUID.eventCodeList){
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
                if (bodyExtrinsicObject['rim:Classification'][i]['$']['classificationScheme'] == numUUID.typeCode){
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
                if (bodyExtrinsicObject['rim:ExternalIdentifier'][i]['$']['identificationScheme'] == numUUID.patientId){
                    prepXDSAtt.DocumentEntry.patientId = (bodyExtrinsicObject['rim:ExternalIdentifier'][i]['$']['value']);
                }
                if (bodyExtrinsicObject['rim:ExternalIdentifier'][i]['$']['identificationScheme'] == numUUID.uniqueId){
                    prepXDSAtt.DocumentEntry.uniqueId = (bodyExtrinsicObject['rim:ExternalIdentifier'][i]['$']['value']);
                }
            }

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
        //Savepoint
        //temp2.json line 626
        //Finished ExtrinsicObject and continuing on RegistryPackage
        //Found these information on ITI 3 Pages 63
        //There are missing META-data atrributes in sample XML and it should be added
        //RegistryPackage seem to begin with SubmissionSet
        console.log(bodyRegistryPackage);
        console.log('-----------------------');
        console.log(prepXDSAtt.DocumentEntry);
    });
});