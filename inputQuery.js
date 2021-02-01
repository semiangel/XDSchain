//Simple program that read .xml file and send it via TCP socket

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

rl.question("==============================\nOperation: FindDocument \n==============================", function(name) {
    rl.question("Input keywords: \nDocument Patient ID = IHEBLUE-2736^^^&amp;1.3.6.1.4.1.21367.13.20.3000&amp;ISO \nDocument Creation Time\tFrom 23.00 PM 20 DEC 2006\n\t\t\tTo   08.00 AM 31 DEC 2006\nDocument Healthcare Facility Type Code = Private home-based care (special)\n==============================", function(country) {
        client.connect(PORT, HOST, function() {

            console.log('CONNECTED TO: ' + HOST + ':' + PORT);
            // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
            fs.readFile("RegistryStoredQueryRequest.xml", function(err, buf) {
                if (err) console.log(err);
                var text = buf.toString();
                client.write(text);
                console.log('Query Sent...');
            });
        });

        // Add a 'data' event handler for the client socket
        // data is what the server sent to this socket
        client.on('data', function(data) {
            // Close the client socket completely
            if (data.includes('ACK from ')){
                console.log('Respond received: ' + data);
            }
            else {
                console.log('==============================\nQuery response received: ');
                var dataIn = data.toString();                
                parseString(dataIn, function (err, result) {
                    var eventCodeListCount = 0;
                    if (err) throw err;
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
                });
                client.destroy();
            }
        });

        // Add a 'close' event handler for the client socket
        client.on('close', function() {
            console.log('Connection closed');
        });
        rl.close();
    });
});



//Successfully read and send SingleDocumentEntry.xml
//Now, choice is 1.found a way to remove invalid XML syntax 2.Sent it straight forward from xmlReadthenSend.js