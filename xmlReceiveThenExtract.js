//Current Main workspace
//This program receive XML via TCP socket before convert XML into JSON then try to sort stuff into simpler JSON object for smartcontract
//21/12/2020 Now have difficulty with updated xml2js which change format of JSON 
//Need rework on the whole process of simplifying JSON for smartcontract

var fs = require("fs");
var net = require('net');
var util = require("util");
var xml2js = require('xml2js');
var parseString = xml2js.parseString;

var HOST = '127.0.0.1';
var PORT = 65519;

//------------------------------------------------------------------

var prepXDSAtt = {
  DocumentEntry: {
    author: {
      authorPerson: 'N/A',
      authorInstitution: [],
      authorRole: 'N/A',
      authorSpecialty: 'N/A'
    },
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
    eventCodeList: 'N/A',
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

//------------------------------------------------------------------
//console.log(XDSAttribute.elements[0]);

//Declare variable for easy use
var subType = 'N/A';
var keyAttribute = 'N/A';
var AttLoc = 'N/A';
var subAttLoc = 'N/A';
var arrayAttLoc = [];

//Declare function for repeat process

function assignSimple (rimSlot) { //assignValue from rim:ValueList
  var selectedAtt = rimSlot.attributes.name;
  if(selectedAtt){ //assign value of element with specified name directly
    for (var j=0; j<rimSlot.elements[0].elements.length;j++){
      //assign all found value into list of array
      arrayAttLoc[j] = rimSlot.elements[0].elements[j].elements[0].text;
    }
    subType[selectedAtt] = arrayAttLoc;
    var singleCheck = subType[selectedAtt];
    if (!singleCheck[1]){ //simply convert ugly single array to 1 string
      subType[selectedAtt] = singleCheck[0]; 
    }
    arrayAttLoc = [0];
  }
}

//Declare variable for some attributes that using UUID
//------DocumentEntry Attributes--------------------------------
var authorUUID = 'urn:uuid:93606bcf-9494-43ec-9b4e-a7748d1a838d';
var classCodeUUID = 'urn:uuid:41a5887f-8865-4c09-adf7-e362475b143a';
var confidentialityCodeUUID = 'urn:uuid:f4f85eac-e6cb-4883-b524-f2705394840f';
var formatCodeUUID = 'urn:uuid:a09d5840-386c-46f2-b5ad-9c3699a4309d';
var healthcareFacilityTypeCodeUUID = 'urn:uuid:f33fb8ac-18af-42cc-ae0e-ed0b0bdb91e1';
var practiceSettingCodeUUID = 'urn:uuid:cccf5598-8b07-4b77-a05e-ae952c785ead';
var typeCodeUUID = 'urn:uuid:f0306f51-975f-434e-a61c-c59651d33983';
var patientIdUUID = 'urn:uuid:58a6f841-87b3-4a3e-92fd-a8ffeff98427';
var uniqueIdUUID = 'urn:uuid:2e82c1f6-a085-4c72-9da3-8640a32e42ab';
//------SubmissionSet Attributes---------------------------------
var subAuthorUUID = 'urn:uuid:a7058bb9-b4e4-4307-ba5b-e3f0ab85e12d';
var contentTypeCodesUUID = 'urn:uuid:aa543740-bdda-424e-8c96-df4873be8500';
var subUniqueIdUUID = 'urn:uuid:96fdda7c-d067-4183-912e-bf5ee74998a8';
var sourceIdUUID = 'urn:uuid:554ac39e-e3fe-47fe-b233-965d2a147832';
var subPatientIdUUID = 'urn:uuid:6b5aea1a-874d-4603-a4bc-96a0a7b38446';
var limitedMetadataUUID = 'urn:uuid:a54d6aa5-d40d-43f9-88c5-b4633d873bdd';

//Declare function which classificate attribute using its UUID and assign value to prepXDSAtt
function assignClassification (rimClassification) {
  if(rimClassification.attributes.classificationScheme == authorUUID || rimClassification.attributes.classificationScheme == subAuthorUUID) {
    //Accept condition are author related -> subType.author
    //If element with rim:Classification passed in then element with matched UUID will be assign to the matched value
    for (var k=0; k<rimClassification.elements.length;k++){
      if(rimClassification.elements[k].attributes.name == 'authorPerson'){
        subType.author.authorPerson = rimClassification.elements[k].elements[0].elements[0].elements[0].text;
      }
      else if(rimClassification.elements[k].attributes.name == 'authorInstitution'){
        for(var l=0; l<rimClassification.elements[k].elements[0].elements.length;l++){
          subType.author.authorInstitution[l] = rimClassification.elements[k].elements[0].elements[l].elements[0].text;
        }
      }
      else if(rimClassification.elements[k].attributes.name == 'authorRole'){
        subType.author.authorRole = rimClassification.elements[k].elements[0].elements[0].elements[0].text;
      }
      else if(rimClassification.elements[k].attributes.name == 'authorSpecialty'){
        subType.author.authorSpecialty = rimClassification.elements[k].elements[0].elements[0].elements[0].text;
      }
    }
  }
  else if(rimClassification.attributes.classificationScheme == classCodeUUID) {
    for (var k=0; k<rimClassification.elements.length;k++){
      if(rimClassification.elements[k].name == 'rim:Slot' && rimClassification.elements[k].attributes.name == 'codingScheme'){
        subType.classCode.codingScheme = rimClassification.elements[k].elements[0].elements[0].elements[0].text;
      }
      else{
        subType.classCode.displayName = rimClassification.elements[k].elements[0].attributes.value;
      }
    }
  }
  else if(rimClassification.attributes.classificationScheme == confidentialityCodeUUID) {
    for (var k=0; k<rimClassification.elements.length;k++){
      if(rimClassification.elements[k].name == 'rim:Slot' && rimClassification.elements[k].attributes.name == 'codingScheme'){
        subType.confidentialityCode.codingScheme = rimClassification.elements[k].elements[0].elements[0].elements[0].text;
      }
      else{
        subType.confidentialityCode.displayName = rimClassification.elements[k].elements[0].attributes.value;
      }
    }
  }
  else if(rimClassification.attributes.classificationScheme == formatCodeUUID) {
    for (var k=0; k<rimClassification.elements.length;k++){
      if(rimClassification.elements[k].name == 'rim:Slot' && rimClassification.elements[k].attributes.name == 'codingScheme'){
        subType.formatCode.codingScheme = rimClassification.elements[k].elements[0].elements[0].elements[0].text;
      }
      else{
        subType.formatCode.displayName = rimClassification.elements[k].elements[0].attributes.value;
      }
    }
  }
  else if(rimClassification.attributes.classificationScheme == healthcareFacilityTypeCodeUUID) {
    for (var k=0; k<rimClassification.elements.length;k++){
      if(rimClassification.elements[k].name == 'rim:Slot' && rimClassification.elements[k].attributes.name == 'codingScheme'){
        subType.healthcareFacilityTypeCode.codingScheme = rimClassification.elements[k].elements[0].elements[0].elements[0].text;
      }
      else{
        subType.healthcareFacilityTypeCode.displayName = rimClassification.elements[k].elements[0].attributes.value;
      }
    }
  }
  else if(rimClassification.attributes.classificationScheme == practiceSettingCodeUUID) {
    for (var k=0; k<rimClassification.elements.length;k++){
      if(rimClassification.elements[k].name == 'rim:Slot' && rimClassification.elements[k].attributes.name == 'codingScheme'){
        subType.practiceSettingCode.codingScheme = rimClassification.elements[k].elements[0].elements[0].elements[0].text;
      }
      else{
        subType.practiceSettingCode.displayName = rimClassification.elements[k].elements[0].attributes.value;
      }
    }
  }
  else if(rimClassification.attributes.classificationScheme == typeCodeUUID) {
    for (var k=0; k<rimClassification.elements.length;k++){
      if(rimClassification.elements[k].name == 'rim:Slot' && rimClassification.elements[k].attributes.name == 'codingScheme'){
        subType.typeCode.codingScheme = rimClassification.elements[k].elements[0].elements[0].elements[0].text;
      }
      else{
        subType.typeCode.displayName = rimClassification.elements[k].elements[0].attributes.value;
      }
    }
  }
  else if(rimClassification.attributes.classificationScheme == contentTypeCodesUUID) {
    for (var k=0; k<rimClassification.elements.length;k++){
      if(rimClassification.elements[k].name == 'rim:Slot' && rimClassification.elements[k].attributes.name == 'codingScheme'){
        subType.contentTypeCodes.codingScheme = rimClassification.elements[k].elements[0].elements[0].elements[0].text;
      }
      else{
        subType.contentTypeCodes.displayName = rimClassification.elements[k].elements[0].attributes.value;
      }
    }
  }
}

function assignExternalId (rimExt) {
  //If element with rim:ExternalId passed in then element with matched UUID assign to value
  if(rimExt.attributes.identificationScheme == patientIdUUID || rimExt.attributes.identificationScheme == subPatientIdUUID) {
    subType.patientId = rimExt.attributes.value;
  }
  else if(rimExt.attributes.identificationScheme == uniqueIdUUID || rimExt.attributes.identificationScheme == subUniqueIdUUID) {
    subType.uniqueId = rimExt.attributes.value;
  }
  else if(rimExt.attributes.identificationScheme == sourceIdUUID) {
    subType.sourceId = rimExt.attributes.value;
  }
}

function assignValue (rim) { //assignValue to all possible attributes type
  assignSimple(rim); 
  assignClassification(rim); 
  assignExternalId(rim);
}

//How about assign attributes name to each iteration
//and reduce assignValue to 'assignValue(rimSlot, selectedAttributed[i])'
//declare selectedAttributed = ['author', 'availabilityStatus', ...]
//this may require addional for loop

//Main
function assignAll (XDSAttribute) {
  if('elements' in XDSAttribute) {
    if('elements' in XDSAttribute.elements[0]){
      if('elements' in XDSAttribute.elements[0].elements[0]){
        if('attributes' in XDSAttribute.elements[0].elements[0].elements[0]){
          var prevLoc = XDSAttribute.elements[0].elements[0];
              for (var groupType=0; groupType<XDSAttribute.elements[0].elements[0].elements.length; groupType++){
            var currentLoc = XDSAttribute.elements[0].elements[0].elements[groupType];
            if(prevLoc.elements[groupType].name == 'rim:ExtrinsicObject'){ //'rim:ExtrinsicObject' marked this section for DocumentEntry group
              subType = prepXDSAtt.DocumentEntry; //Select Group for prepXDSAtt using 'subType' variable
              if('elements' in currentLoc){
                  for (var i=0; i<currentLoc.elements.length; i++) {
                    const rim = currentLoc.elements[i];
                    if(rim.name != 'rim:Slot' && rim.name != 'rim:Classification' && rim.name != 'rim:ExternalIdentifier') continue; 
                          //condition check for loop by jump over to matched condition, any unmatch will be skipped
                    if('elements' in rim){
                      assignValue(rim);
                    }
                  }
                }
              }
            else if(prevLoc.elements[groupType].name == 'rim:RegistryPackage'){
                    subType = prepXDSAtt.SubmissionSet;
                    var Folder = prepXDSAtt.Folder; 
                    //A rim:Classification is used to distinguish between the SubmissionSet and Folder object Type
                    //So, attributes for folder will mainly identified with UUID in assignClassification
                    //assign attribute of SubmissionSet or Folder
                    if('elements' in currentLoc){
                        for (var i=0; i<currentLoc.elements.length; i++) {
                          const rim = currentLoc.elements[i];
                          if(rim.name != 'rim:Slot' && rim.name != 'rim:Classification' && rim.name != 'rim:ExternalIdentifier') continue; 
                          //condition check for loop by jump over to matched condition, any unmatch will be skipped
                          if('elements' in rim){
                            assignValue(rim);
                          }
                        }
                    }
            }
            else if(prevLoc.elements[groupType].name == 'rim:Classification'){
              subType = prepXDSAtt.SubmissionSet;
              if('attributes' in prevLoc.elements[groupType]){
                if('classificationNode' in prevLoc.elements[groupType].attributes){
                  if(prevLoc.elements[groupType].attributes.classificationNode == limitedMetadataUUID){
                    subType.limitedMetadata = 1;
                  }
                }
              }
            }
            else if(prevLoc.elements[groupType].name == 'rim:Association'){
              subType = prepXDSAtt.Association;
              subType.associationType = prevLoc.elements[groupType].attributes.associationType;
              subType.sourceObject = prevLoc.elements[groupType].attributes.sourceObject;
              subType.targetObject = prevLoc.elements[groupType].attributes.targetObject;
              subType.SubmissionSetStatus = prevLoc.elements[groupType].elements[0].elements[0].elements[0].elements[0].text;
            }
          }
        }
      }
    }
  }
  console.log('---------------------------------');
  console.log(prepXDSAtt);
  fs.writeFileSync("extractedObject", util.inspect(prepXDSAtt));
}

function processData (dataIn) {
  console.log('XML:\n' + dataIn);
  parseString(dataIn, function (err, result) {
    if (err) throw err;
    console.log('\nConverted to object: ');
    console.log('-----------------------\n' + result + '\n---------------------');
    var stringXDSAttrib = JSON.stringify(result);
    console.log('-----------------------\n' + stringXDSAttrib + '\n---------------------');
    fs.writeFile("temp2.json", stringXDSAttrib, function(err, data) {
      if (err) console.log(err);
      console.log("Successfully Written to File. ");
    });
    assignAll(result);
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
