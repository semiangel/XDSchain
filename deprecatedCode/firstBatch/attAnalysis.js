var fs = require("fs");
var convert = require('xml-js');
const util = require('util');
var i = 0;
var j = 0;

fs.readFile("RegisterDocumentSet-bRequest.xml", function(err, buf) {

    var result = convert.xml2js(buf);
    //console.log(result);
    //console.log(util.inspect(result, {depth: null}));
    //var stringResult = result.toString();
    console.log('------------------------------');

    var doc1 = result.elements[0].elements[0].elements[0].elements;
    //creationTime: result.elements[0].elements[0].elements[0].elements[0].elements[0].elements[0].elements[0].text
    var Document = {
    	author: {
            authorInstitution: null,
            authorPerson: null,
            authorRole: null,
            authorSpecialty: null,
            authorTelecommunication: null
        },
        availabilityStatus: null,
        classCode: null,
        comment: null,
        confidentialityCode: null,
        creationTime: null, //checked
        entryUUID: null,
        eventCodeList: null,
        formatCode: null,
        hash: null,
        healthcareFacilityTypeCode: null,
        homeCommunityId: null,
        languageCode: null, //checked
        legalAuthenticator: null,
        limitedMetadata: null,
        mimeType: null,
        objectType: null,
        patientId: null,
        practiceSettingCode: null,
        referenceIdList: null,
        repositoryUniqueId: null,
        serviceStartTime: null, //checked
        serviceStopTime: null, //checked
        size: null,
        sourcePatientId: null, //checked
        sourcePatientInfo: [], //checked
        title: null,
        typeCode: null,
        uniqueId: null,
        URI: null
    }

    var submissionSet = {
        author: {
            authorInstitution: null,
            authorPerson: null,
            authorRole: null,
            authorSpecialty: null,
            authorTelecommunication: null
        },
        availabilityStatus: null,
        comments: null,
        contentTypeCode: null, //submissionSet exclusive
        entryUUID: null,
        homeCommunityId: null,
        intendedRecipient: null,
        limitedMetadata: null,
        patientId: null,
        sourceId: null, //submissionSet exclusive
        submissionTime: null,
        title: null,
        uniqueId: null
    }

    var Folder = {
        availabilityStatus: null,
        codeList: null, //Folder exclusive
        comments: null,
        entryUUID: null,
        homeCommunityId: null,
        lastUpdateTime: null, //Folder exclusive
        limitedMetadata: null,
        patientId: null,
        title: null,
        uniqueId: null
    }

    for (i = 0; i < doc1.length ; i++){
    	console.log(i);
    	if ('attributes' in doc1[i]) {
	    	if(doc1[i].attributes.name == 'creationTime'){
                console.log(doc1[i].attributes.name);
	    		Document.creationTime = doc1[i].elements[0].elements[0].elements[0].text;
	    		console.log(Document.creationTime);
	    	}
	    	else if(doc1[i].attributes.name == 'languageCode'){
                console.log(doc1[i].attributes.name);
	    		Document.languageCode = doc1[i].elements[0].elements[0].elements[0].text;
	    		console.log(Document.languageCode);
	    	}
	    	else if(doc1[i].attributes.name == 'serviceStartTime'){
                console.log(doc1[i].attributes.name);
	    		Document.serviceStartTime = doc1[i].elements[0].elements[0].elements[0].text;
	    		console.log(Document.serviceStartTime);
	    	}
	    	else if(doc1[i].attributes.name == 'serviceStopTime'){
                console.log(doc1[i].attributes.name);
	    		Document.serviceStopTime = doc1[i].elements[0].elements[0].elements[0].text;
	    		console.log(Document.serviceStopTime);
	    	}
	    	else if(doc1[i].attributes.name == 'sourcePatientId'){
                console.log(doc1[i].attributes.name);
	    		Document.sourcePatientId = doc1[i].elements[0].elements[0].elements[0].text;
	    		console.log(Document.sourcePatientId);
	    	}
	    	else if(doc1[i].attributes.name == 'sourcePatientInfo'){
                console.log(doc1[i].attributes.name);
	    		for (j = 0; j < doc1[i].elements[0].elements.length; j++) {
	    			Document.sourcePatientInfo[j] = doc1[i].elements[0].elements[j].elements[0].text;
	    		}
	    		console.log(Document.sourcePatientInfo);	
	    	}
            else {
                if('id' in doc1[i].attributes) {
                    if(doc1[i].attributes.classificationScheme == 'urn:uuid:93606bcf-9494-43ec-9b4e-a7748d1a838d') {
                        for (j = 0; j < doc1[i].elements.length; j++) {
                            if(doc1[i].elements[j].attributes.name == 'authorPerson') {
                                console.log(doc1[i].elements[j].attributes.name);
                                Document.author.authorPerson = doc1[i].elements[j].elements[0].elements[0].elements[0].text;
                                console.log(Document.author.authorPerson);
                                submissionSet.author.authorPerson = doc1[i].elements[j].elements[0].elements[0].elements[0].text;
                                console.log(submissionSet.author.authorPerson);
                            }
                            else if(doc1[i].elements[j].attributes.name == 'authorInstitution') {
                                console.log(doc1[i].elements[j].attributes.name);
                                Document.author.authorInstitution = doc1[i].elements[j].elements[0].elements[0].elements[0].text;
                                console.log(Document.author.authorInstitution);
                                submissionSet.author.authorInstitution = doc1[i].elements[j].elements[0].elements[0].elements[0].text;
                                console.log(submissionSet.author.authorInstitution);
                            }
                            else if(doc1[i].elements[j].attributes.name == 'authorRole') {
                                console.log(doc1[i].elements[j].attributes.name);
                                Document.author.authorRole = doc1[i].elements[j].elements[0].elements[0].elements[0].text;
                                console.log(Document.author.authorRole);
                                submissionSet.author.authorRole = doc1[i].elements[j].elements[0].elements[0].elements[0].text;
                                console.log(submissionSet.author.authorRole);
                            }
                            else if(doc1[i].elements[j].attributes.name == 'authorSpecialty') {
                                console.log(doc1[i].elements[j].attributes.name);
                                Document.author.authorSpecialty = doc1[i].elements[j].elements[0].elements[0].elements[0].text;
                                console.log(Document.author.authorSpecialty);
                                submissionSet.author.authorSpecialty = doc1[i].elements[j].elements[0].elements[0].elements[0].text;
                                console.log(submissionSet.author.authorSpecialty);
                            }
                            else if(doc1[i].elements[j].attributes.name == 'authorTelecommunication') {
                                console.log(doc1[i].elements[j].attributes.name);
                                Document.author.authorTelecommunication = doc1[i].elements[j].elements[0].elements[0].elements[0].text;
                                console.log(Document.author.authorTelecommunication);
                                submissionSet.author.authorTelecommunication = doc1[i].elements[j].elements[0].elements[0].elements[0].text;
                                console.log(submissionSet.author.authorTelecommunication);
                            }
                            console.log('-------');
                        }
                    }
                }
            }
	    }
    	console.log('--------------');
    	//console.log(doc1[i].elements[0].elements[0].elements[0].text);
    }
    
    //console.log(documentID.creationTime);
    var docSum = util.inspect(Document) + '\n' + util.inspect(submissionSet) + '\n' + util.inspect(Folder);
    console.log('------------------------------');
    console.log(docSum);
    fs.writeFile("objRecreated.txt", util.inspect(docSum, {depth: null}), function(err, data) {
            if (err) console.log(err);
            console.log("Successfully Written to File.");
    });  
    console.log('------------------------------');
    //console.log(result.elements[0].elements[0].elements[0].elements.length);
});

