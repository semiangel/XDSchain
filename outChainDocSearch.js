var util = require("util");
//----Assort Search Input----------------------
//Define search keyword, begin with defined inside program
var sK = [
			['DocumentEntry',['author','authorPerson'],'^Smitty^Gerald^^^'],
			['DocumentEntry','comment',''],
			['DocumentEntry',['classCode','codingScheme'],'1.3.6.1.4.1.19376.1.2.6.1'],
			['DocumentEntry','sourcePatientInfo',['PID-3|pid1^^^&1.2.3&ISO','PID-5|Doe^John^^^','PID-7|19560527','PID-8|M','PID-11|100 Main St^^Metropolis^Il^44130^USA']]
		]; //Array represent input retrieved from Front-End
//Above value suppose to be retrieved from ITI-18
console.log('Input keyword:');
console.log(sK);
/*
//Define searchXDSAtt to store as object ready for compare with object within smartcontract
var searchXDSAtt = {
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
*/
var searchXDSAtt = {
  DocumentEntry: {
    author: [{
      authorPerson: '^Smitty^Gerald^^^',
      authorInstitution: [],
      authorRole: 'N/A',
      authorSpecialty: 'N/A'
    }],
    availabilityStatus: 'N/A',
    classCode: {
      codingScheme: '1.3.6.1.4.1.19376.1.2.6.1',
      displayName: 'N/A'
    },
    comment: '',
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
    sourcePatientInfo: ['PID-3|pid1^^^&1.2.3&ISO','PID-5|Doe^John^^^','PID-7|19560527','PID-8|M','PID-11|100 Main St^^Metropolis^Il^44130^USA'],
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

//----------------------------------------------------------------------
//callRegSearch while run along Docid from 1 to latest (known using checkID)
//----------------------------------------------------------------------

var matchedCount = 0;

for (i = 0; i < sK.length; i++){
	var keyCount = i+1;
	if (Array.isArray(sK[i][1])){
		if (sK[i][1][0] == 'author') {
			if (searchXDSAtt[sK[i][0]][sK[i][1][0]][0][sK[i][1][1]] == sK[i][2]){
				matchedCount++;
				console.log('Keyword ' + keyCount + ' matched...');
			}
		}
		else {
			if (searchXDSAtt[sK[i][0]][sK[i][1][0]][sK[i][1][1]] == sK[i][2]){
				matchedCount++;
				console.log('Keyword ' + keyCount + ' matched...');
			}
		}
	}
	else {
		if (searchXDSAtt[sK[i][0]][sK[i][1]] == sK[i][2]){
			matchedCount++;
			console.log('Keyword ' + keyCount + ' matched...');
		}
		if (Array.isArray(sK[i][2])){
			if (searchXDSAtt[sK[i][0]][sK[i][1]][0] == sK[i][2][0]){
				matchedCount++;
				console.log('Keyword ' + keyCount + ' matched...');
			}
		}
	}
}

console.log('matchedCount = ' + matchedCount + '\nsK.length =' + sK.length);

if (matchedCount == sK.length){
	console.log('All matched \nFound Document:');
	console.log(searchXDSAtt.DocumentEntry);
}
else {
	console.log('unmatched');
}

//Compare keyword with search JSON
//ID with all keyword matched push into result array (.push)
//use result array with callRegFull one by one, then return all results to user
//should check again in ITI Framework about response for ITI-18