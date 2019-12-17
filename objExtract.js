var fs = require("fs");
var util = require("util");
//should import received object from XDSRegistry.js instead of declare it all here
var XDSAttribute = 
{ elements: 
   [ { type: 'element',
       name: 'lcm:SubmitObjectsRequest',
       attributes: 
        { 'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
          'xsi:schemaLocation': 'urn:oasis:names:tc:ebxml-regrep:xsd:lcm:3.0 ../../schema/ebRS/lcm.xsd',
          'xmlns:lcm': 'urn:oasis:names:tc:ebxml-regrep:xsd:lcm:3.0',
          'xmlns:rim': 'urn:oasis:names:tc:ebxml-regrep:xsd:rim:3.0',
          'xmlns:rs': 'urn:oasis:names:tc:ebxml-regrep:xsd:rs:3.0' },
       elements: 
        [ { type: 'element',
            name: 'rim:RegistryObjectList',
            elements: 
             [ { type: 'element',
                 name: 'rim:ExtrinsicObject',
                 attributes: 
                  { id: 'Document01',
                    mimeType: 'text/xml',
                    objectType: 'urn:uuid:7edca82f-054d-47f2-a032-9b2a5b5186c1' },
                 elements: 
                  [ { type: 'element',
                      name: 'rim:Slot',
                      attributes: { name: 'creationTime' },
                      elements: 
                       [ { type: 'element',
                           name: 'rim:ValueList',
                           elements: 
                            [ { type: 'element',
                                name: 'rim:Value',
                                elements: [ { type: 'text', text: '20051224' } ] } ] } ] },
                    { type: 'element',
                      name: 'rim:Slot',
                      attributes: { name: 'languageCode' },
                      elements: 
                       [ { type: 'element',
                           name: 'rim:ValueList',
                           elements: 
                            [ { type: 'element',
                                name: 'rim:Value',
                                elements: [ { type: 'text', text: 'en-us' } ] } ] } ] },
                    { type: 'element',
                      name: 'rim:Slot',
                      attributes: { name: 'serviceStartTime' },
                      elements: 
                       [ { type: 'element',
                           name: 'rim:ValueList',
                           elements: 
                            [ { type: 'element',
                                name: 'rim:Value',
                                elements: [ { type: 'text', text: '200412230800' } ] } ] } ] },
                    { type: 'element',
                      name: 'rim:Slot',
                      attributes: { name: 'serviceStopTime' },
                      elements: 
                       [ { type: 'element',
                           name: 'rim:ValueList',
                           elements: 
                            [ { type: 'element',
                                name: 'rim:Value',
                                elements: [ { type: 'text', text: '200412230801' } ] } ] } ] },
                    { type: 'element',
                      name: 'rim:Slot',
                      attributes: { name: 'sourcePatientId' },
                      elements: 
                       [ { type: 'element',
                           name: 'rim:ValueList',
                           elements: 
                            [ { type: 'element',
                                name: 'rim:Value',
                                elements: 
                                 [ { type: 'text',
                                     text: 'ST-1000^^^&1.3.6.1.4.1.21367.2003.3.9&ISO' } ] } ] } ] },
                    { type: 'element',
                      name: 'rim:Slot',
                      attributes: { name: 'sourcePatientInfo' },
                      elements: 
                       [ { type: 'element',
                           name: 'rim:ValueList',
                           elements: 
                            [ { type: 'element',
                                name: 'rim:Value',
                                elements: 
                                 [ { type: 'text',
                                     text: 'PID-3|ST-1000^^^&1.3.6.1.4.1.21367.2003.3.9&ISO' } ] },
                              { type: 'element',
                                name: 'rim:Value',
                                elements: [ { type: 'text', text: 'PID-5|Doe^John^^^' } ] },
                              { type: 'element',
                                name: 'rim:Value',
                                elements: [ { type: 'text', text: 'PID-7|19560527' } ] },
                              { type: 'element',
                                name: 'rim:Value',
                                elements: [ { type: 'text', text: 'PID-8|M' } ] },
                              { type: 'element',
                                name: 'rim:Value',
                                elements: 
                                 [ { type: 'text',
                                     text: 'PID-11|100 Main St^^Metropolis^Il^44130^USA' } ] } ] } ] },
                    { type: 'element',
                      name: 'rim:Name',
                      elements: 
                       [ { type: 'element',
                           name: 'rim:LocalizedString',
                           attributes: { value: 'Physical' } } ] },
                    { type: 'element', name: 'rim:Description' },
                    { type: 'element',
                      name: 'rim:Classification',
                      attributes: 
                       { id: 'cl01',
                         classificationScheme: 'urn:uuid:93606bcf-9494-43ec-9b4e-a7748d1a838d',
                         classifiedObject: 'Document01' },
                      elements: 
                       [ { type: 'element',
                           name: 'rim:Slot',
                           attributes: { name: 'authorPerson' },
                           elements: 
                            [ { type: 'element',
                                name: 'rim:ValueList',
                                elements: 
                                 [ { type: 'element',
                                     name: 'rim:Value',
                                     elements: [ { type: 'text', text: 'Gerald Smitty' } ] } ] } ] },
                         { type: 'element',
                           name: 'rim:Slot',
                           attributes: { name: 'authorInstitution' },
                           elements: 
                            [ { type: 'element',
                                name: 'rim:ValueList',
                                elements: 
                                 [ { type: 'element',
                                     name: 'rim:Value',
                                     elements: [ { type: 'text', text: 'Cleveland Clinic' } ] },
                                   { type: 'element',
                                     name: 'rim:Value',
                                     elements: [ { type: 'text', text: 'Parma Community' } ] } ] } ] },
                         { type: 'element',
                           name: 'rim:Slot',
                           attributes: { name: 'authorRole' },
                           elements: 
                            [ { type: 'element',
                                name: 'rim:ValueList',
                                elements: 
                                 [ { type: 'element',
                                     name: 'rim:Value',
                                     elements: [ { type: 'text', text: 'Attending' } ] } ] } ] },
                         { type: 'element',
                           name: 'rim:Slot',
                           attributes: { name: 'authorSpecialty' },
                           elements: 
                            [ { type: 'element',
                                name: 'rim:ValueList',
                                elements: 
                                 [ { type: 'element',
                                     name: 'rim:Value',
                                     elements: [ { type: 'text', text: 'Orthopedic' } ] } ] } ] } ] },
                    { type: 'element',
                      name: 'rim:Classification',
                      attributes: 
                       { id: 'cl02',
                         classificationScheme: 'urn:uuid:41a5887f-8865-4c09-adf7-e362475b143a',
                         classifiedObject: 'Document01',
                         nodeRepresentation: 'History and Physical' },
                      elements: 
                       [ { type: 'element',
                           name: 'rim:Slot',
                           attributes: { name: 'codingScheme' },
                           elements: 
                            [ { type: 'element',
                                name: 'rim:ValueList',
                                elements: 
                                 [ { type: 'element',
                                     name: 'rim:Value',
                                     elements: [ { type: 'text', text: 'Connect-a-thon classCodes' } ] } ] } ] },
                         { type: 'element',
                           name: 'rim:Name',
                           elements: 
                            [ { type: 'element',
                                name: 'rim:LocalizedString',
                                attributes: { value: 'History and Physical' } } ] } ] },
                    { type: 'element',
                      name: 'rim:Classification',
                      attributes: 
                       { id: 'cl03',
                         classificationScheme: 'urn:uuid:f4f85eac-e6cb-4883-b524-f2705394840f',
                         classifiedObject: 'Document01',
                         nodeRepresentation: '1.3.6.1.4.1.21367.2006.7.101' },
                      elements: 
                       [ { type: 'element',
                           name: 'rim:Slot',
                           attributes: { name: 'codingScheme' },
                           elements: 
                            [ { type: 'element',
                                name: 'rim:ValueList',
                                elements: 
                                 [ { type: 'element',
                                     name: 'rim:Value',
                                     elements: 
                                      [ { type: 'text', text: 'Connect-a-thon confidentialityCodes' } ] } ] } ] },
                         { type: 'element',
                           name: 'rim:Name',
                           elements: 
                            [ { type: 'element',
                                name: 'rim:LocalizedString',
                                attributes: { value: 'Clinical-Staff' } } ] } ] },
                    { type: 'element',
                      name: 'rim:Classification',
                      attributes: 
                       { id: 'cl04',
                         classificationScheme: 'urn:uuid:a09d5840-386c-46f2-b5ad-9c3699a4309d',
                         classifiedObject: 'Document01',
                         nodeRepresentation: 'CDAR2/IHE 1.0' },
                      elements: 
                       [ { type: 'element',
                           name: 'rim:Slot',
                           attributes: { name: 'codingScheme' },
                           elements: 
                            [ { type: 'element',
                                name: 'rim:ValueList',
                                elements: 
                                 [ { type: 'element',
                                     name: 'rim:Value',
                                     elements: [ { type: 'text', text: 'Connect-a-thon formatCodes' } ] } ] } ] },
                         { type: 'element',
                           name: 'rim:Name',
                           elements: 
                            [ { type: 'element',
                                name: 'rim:LocalizedString',
                                attributes: { value: 'CDAR2/IHE 1.0' } } ] } ] },
                    { type: 'element',
                      name: 'rim:Classification',
                      attributes: 
                       { id: 'cl05',
                         classificationScheme: 'urn:uuid:f33fb8ac-18af-42cc-ae0e-ed0b0bdb91e1',
                         classifiedObject: 'Document01',
                         nodeRepresentation: 'Outpatient' },
                      elements: 
                       [ { type: 'element',
                           name: 'rim:Slot',
                           attributes: { name: 'codingScheme' },
                           elements: 
                            [ { type: 'element',
                                name: 'rim:ValueList',
                                elements: 
                                 [ { type: 'element',
                                     name: 'rim:Value',
                                     elements: 
                                      [ { type: 'text',
                                          text: 'Connect-a-thon healthcareFacilityTypeCodes' } ] } ] } ] },
                         { type: 'element',
                           name: 'rim:Name',
                           elements: 
                            [ { type: 'element',
                                name: 'rim:LocalizedString',
                                attributes: { value: 'Outpatient' } } ] } ] },
                    { type: 'element',
                      name: 'rim:Classification',
                      attributes: 
                       { id: 'cl06',
                         classificationScheme: 'urn:uuid:cccf5598-8b07-4b77-a05e-ae952c785ead',
                         classifiedObject: 'Document01',
                         nodeRepresentation: 'General Medicine' },
                      elements: 
                       [ { type: 'element',
                           name: 'rim:Slot',
                           attributes: { name: 'codingScheme' },
                           elements: 
                            [ { type: 'element',
                                name: 'rim:ValueList',
                                elements: 
                                 [ { type: 'element',
                                     name: 'rim:Value',
                                     elements: 
                                      [ { type: 'text', text: 'Connect-a-thon practiceSettingCodes' } ] } ] } ] },
                         { type: 'element',
                           name: 'rim:Name',
                           elements: 
                            [ { type: 'element',
                                name: 'rim:LocalizedString',
                                attributes: { value: 'General Medicine' } } ] } ] },
                    { type: 'element',
                      name: 'rim:Classification',
                      attributes: 
                       { id: 'cl07',
                         classificationScheme: 'urn:uuid:f0306f51-975f-434e-a61c-c59651d33983',
                         classifiedObject: 'Document01',
                         nodeRepresentation: '34108-1' },
                      elements: 
                       [ { type: 'element',
                           name: 'rim:Slot',
                           attributes: { name: 'codingScheme' },
                           elements: 
                            [ { type: 'element',
                                name: 'rim:ValueList',
                                elements: 
                                 [ { type: 'element',
                                     name: 'rim:Value',
                                     elements: [ { type: 'text', text: 'LOINC' } ] } ] } ] },
                         { type: 'element',
                           name: 'rim:Name',
                           elements: 
                            [ { type: 'element',
                                name: 'rim:LocalizedString',
                                attributes: { value: 'Outpatient Evaluation And Management' } } ] } ] },
                    { type: 'element',
                      name: 'rim:ExternalIdentifier',
                      attributes: 
                       { id: 'ei01',
                         registryObject: 'Document01',
                         identificationScheme: 'urn:uuid:58a6f841-87b3-4a3e-92fd-a8ffeff98427',
                         value: 'SELF-5^^^&1.3.6.1.4.1.21367.2005.3.7&ISO' },
                      elements: 
                       [ { type: 'element',
                           name: 'rim:Name',
                           elements: 
                            [ { type: 'element',
                                name: 'rim:LocalizedString',
                                attributes: { value: 'XDSDocumentEntry.patientId' } } ] } ] },
                    { type: 'element',
                      name: 'rim:ExternalIdentifier',
                      attributes: 
                       { id: 'ei02',
                         registryObject: 'Document01',
                         identificationScheme: 'urn:uuid:2e82c1f6-a085-4c72-9da3-8640a32e42ab',
                         value: '1.3.6.1.4.1.21367.2005.3.9999.32' },
                      elements: 
                       [ { type: 'element',
                           name: 'rim:Name',
                           elements: 
                            [ { type: 'element',
                                name: 'rim:LocalizedString',
                                attributes: { value: 'XDSDocumentEntry.uniqueId' } } ] } ] } ] },
               { type: 'element',
                 name: 'rim:RegistryPackage',
                 attributes: { id: 'SubmissionSet01' },
                 elements: 
                  [ { type: 'element',
                      name: 'rim:Slot',
                      attributes: { name: 'submissionTime' },
                      elements: 
                       [ { type: 'element',
                           name: 'rim:ValueList',
                           elements: 
                            [ { type: 'element',
                                name: 'rim:Value',
                                elements: [ { type: 'text', text: '20041225235050' } ] } ] } ] },
                    { type: 'element',
                      name: 'rim:Name',
                      elements: 
                       [ { type: 'element',
                           name: 'rim:LocalizedString',
                           attributes: { value: 'Physical' } } ] },
                    { type: 'element',
                      name: 'rim:Description',
                      elements: 
                       [ { type: 'element',
                           name: 'rim:LocalizedString',
                           attributes: { value: 'Annual physical' } } ] },
                    { type: 'element',
                      name: 'rim:Classification',
                      attributes: 
                       { id: 'cl08',
                         classificationScheme: 'urn:uuid:a7058bb9-b4e4-4307-ba5b-e3f0ab85e12d',
                         classifiedObject: 'SubmissionSet01' },
                      elements: 
                       [ { type: 'element',
                           name: 'rim:Slot',
                           attributes: { name: 'authorPerson' },
                           elements: 
                            [ { type: 'element',
                                name: 'rim:ValueList',
                                elements: 
                                 [ { type: 'element',
                                     name: 'rim:Value',
                                     elements: [ { type: 'text', text: 'Sherry Dopplemeyer' } ] } ] } ] },
                         { type: 'element',
                           name: 'rim:Slot',
                           attributes: { name: 'authorInstitution' },
                           elements: 
                            [ { type: 'element',
                                name: 'rim:ValueList',
                                elements: 
                                 [ { type: 'element',
                                     name: 'rim:Value',
                                     elements: [ { type: 'text', text: 'Cleveland Clinic' } ] },
                                   { type: 'element',
                                     name: 'rim:Value',
                                     elements: [ { type: 'text', text: 'Berea Community' } ] } ] } ] },
                         { type: 'element',
                           name: 'rim:Slot',
                           attributes: { name: 'authorRole' },
                           elements: 
                            [ { type: 'element',
                                name: 'rim:ValueList',
                                elements: 
                                 [ { type: 'element',
                                     name: 'rim:Value',
                                     elements: [ { type: 'text', text: 'Primary Surgon' } ] } ] } ] },
                         { type: 'element',
                           name: 'rim:Slot',
                           attributes: { name: 'authorSpecialty' },
                           elements: 
                            [ { type: 'element',
                                name: 'rim:ValueList',
                                elements: 
                                 [ { type: 'element',
                                     name: 'rim:Value',
                                     elements: [ { type: 'text', text: 'Orthopedic' } ] } ] } ] } ] },
                    { type: 'element',
                      name: 'rim:Classification',
                      attributes: 
                       { id: 'cl09',
                         classificationScheme: 'urn:uuid:aa543740-bdda-424e-8c96-df4873be8500',
                         classifiedObject: 'SubmissionSet01',
                         nodeRepresentation: 'History and Physical' },
                      elements: 
                       [ { type: 'element',
                           name: 'rim:Slot',
                           attributes: { name: 'codingScheme' },
                           elements: 
                            [ { type: 'element',
                                name: 'rim:ValueList',
                                elements: 
                                 [ { type: 'element',
                                     name: 'rim:Value',
                                     elements: [ { type: 'text', text: 'Connect-a-thon contentTypeCodes' } ] } ] } ] },
                         { type: 'element',
                           name: 'rim:Name',
                           elements: 
                            [ { type: 'element',
                                name: 'rim:LocalizedString',
                                attributes: { value: 'History and Physical' } } ] } ] },
                    { type: 'element',
                      name: 'rim:ExternalIdentifier',
                      attributes: 
                       { id: 'ei03',
                         registryObject: 'SubmissionSet01',
                         identificationScheme: 'urn:uuid:96fdda7c-d067-4183-912e-bf5ee74998a8',
                         value: '1.3.6.1.4.1.21367.2005.3.9999.33' },
                      elements: 
                       [ { type: 'element',
                           name: 'rim:Name',
                           elements: 
                            [ { type: 'element',
                                name: 'rim:LocalizedString',
                                attributes: { value: 'XDSSubmissionSet.uniqueId' } } ] } ] },
                    { type: 'element',
                      name: 'rim:ExternalIdentifier',
                      attributes: 
                       { id: 'ei04',
                         registryObject: 'SubmissionSet01',
                         identificationScheme: 'urn:uuid:554ac39e-e3fe-47fe-b233-965d2a147832',
                         value: '3670984664' },
                      elements: 
                       [ { type: 'element',
                           name: 'rim:Name',
                           elements: 
                            [ { type: 'element',
                                name: 'rim:LocalizedString',
                                attributes: { value: 'XDSSubmissionSet.sourceId' } } ] } ] },
                    { type: 'element',
                      name: 'rim:ExternalIdentifier',
                      attributes: 
                       { id: 'ei05',
                         registryObject: 'SubmissionSet01',
                         identificationScheme: 'urn:uuid:6b5aea1a-874d-4603-a4bc-96a0a7b38446',
                         value: 'SELF-5^^^&1.3.6.1.4.1.21367.2005.3.7&ISO' },
                      elements: 
                       [ { type: 'element',
                           name: 'rim:Name',
                           elements: 
                            [ { type: 'element',
                                name: 'rim:LocalizedString',
                                attributes: { value: 'XDSSubmissionSet.patientId' } } ] } ] } ] },
               { type: 'element',
                 name: 'rim:Classification',
                 attributes: 
                  { id: 'cl10',
                    classifiedObject: 'SubmissionSet01',
                    classificationNode: 'urn:uuid:a54d6aa5-d40d-43f9-88c5-b4633d873bdd' } },
               { type: 'element',
                 name: 'rim:Association',
                 attributes: 
                  { id: 'as01',
                    associationType: 'HasMember',
                    sourceObject: 'SubmissionSet01',
                    targetObject: 'Document01' },
                 elements: 
                  [ { type: 'element',
                      name: 'rim:Slot',
                      attributes: { name: 'SubmissionSetStatus' },
                      elements: 
                       [ { type: 'element',
                           name: 'rim:ValueList',
                           elements: 
                            [ { type: 'element',
                                name: 'rim:Value',
                                elements: [ { type: 'text', text: 'Original' } ] 
                            } ] 
                        } ] 
                    } ] 
                } ] 
            } ] 
        } ] 
    }

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