pragma solidity >=0.4.22 <0.6.0;

contract HelloWorld {

    string saySomething;
    struct DocumentEntry {
        string authorPerson;
        string authorInstitution;
        string authorRole;
        string authorSpecialty;
        string availabilityStatus;
        string classCode_CodingScheme;
        string classCode_displayName;
        string comment;
        string confidentialityCode_codingScheme;
        string confidentialityCode_displayName;
        string creationTime;
        string entryUUID;
        string eventCodeList;
        string formatCode_codingScheme;
        string formatCode_displayName;
        string hash;
        string healthcareFacilityTypeCode_codingScheme;
        string healthcareFacilityTypeCode_displayName;
        string homeCommunityId;
        string languageCode;
        string legalAuthenticator;
        string limitedMetadata;
        string mimeType;
        string objectType;
        string patientId;
        string practiceSettingCode_codingScheme;
        string practiceSettingCode_displayName;
        string referenceIdList;
        string repositoryUniqueId;
        string serviceStartTime;
        string serviceStopTime;
        string size;
        string sourcePatientId;
        string sourcePatientInfo;
        string title;
        string typeCode_codingScheme;
        string typeCode_displayName;
        string uniqueId;
        string URI;
    }

    struct SubmissionSet {
        string authorPerson;
        string authorInstitution;
        string authorRole;
        string authorSpecialty;
        string availabilityStatus;
        string comments;
        string contentTypeCodes_codingScheme;
        string contentTypeCodes_displayName;
        string entryUUID;
        string homeCommunityId;
        string intendedRecipient;
        string limitedMetadata;
        string patientId;
        string sourceId;
        string submissionTime;
        string title;
        string uniqueId;
    }

    struct Folder {
        string availabilityStatus;
        string codeList;
        string comments;
        string entryUUID;
        string homeCommunityId;
        string lastUpdateTime;
        string limitedMetadata;
        string patientId;
        string title;
        string uniqueId;
    }

    struct Association {
        string associationType;
        string sourceObject;
        string targetObject;
        string SubmissionSetStatus;
    }

    constructor() public  {
        saySomething = "Hello World!";
    }

    function speak() public view returns(string memory) {
        return saySomething;
    }

    function saySomethingElse(string memory newSaying) public  returns(bool success) {
        saySomething = newSaying;
        return true;
    }
}