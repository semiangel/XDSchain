pragma solidity >=0.4.22 <0.7.0;

contract Storage {

    //Declare XDS attributes variable
    //DocumentEntry
    string DocumentEntry_author;//
    string DocumentEntry_availabilityStatus; //
    string DocumentEntry_classCode;//
    string DocumentEntry_comment;//
    string DocumentEntry_confidentialityCode;//
    string DocumentEntry_creationTime;//
    string DocumentEntry_entryUUID;//
    string DocumentEntry_eventCodeList; //
    string DocumentEntry_formatCode;//
    string DocumentEntry_hash;//
    string DocumentEntry_healthcareFacilityTypeCode;//
    string DocumentEntry_homeCommunityId;//
    string DocumentEntry_languageCode;//
    string DocumentEntry_legalAuthenticator;//
    string DocumentEntry_limitedMetadata;//
    string DocumentEntry_mimeType;//
    string DocumentEntry_objectType;//
    string DocumentEntry_patientId;//
    string DocumentEntry_practiceSettingCode;//
    string DocumentEntry_referenceIdList;//
    string DocumentEntry_repositoryUniqueId;//
    string DocumentEntry_serviceStartTime;//
    string DocumentEntry_serviceStopTime;//
    string DocumentEntry_size;//
    string DocumentEntry_sourcePatientId;//
    string DocumentEntry_sourcePatientInfo;//
    string DocumentEntry_title;//
    string DocumentEntry_typeCode;//
    string DocumentEntry_uniqueId;//
    string DocumentEntry_URI;//
    
    //SubmissionSet
    string SubmissionSet_author;//
    string SubmissionSet_availabilityStatus;//
    string SubmissionSet_comments;//
    string SubmissionSet_contentTypeCode;//
    string SubmissionSet_entryUUID;//
    string SubmissionSet_homeCommunityId;//
    string SubmissionSet_intendedRecipient;//
    string SubmissionSet_limitedMetadata;//
    string SubmissionSet_patientId;//
    string SubmissionSet_sourceId;//
    string SubmissionSet_submissionTime;//
    string SubmissionSet_title;//
    string SubmissionSet_uniqueId;//
    
    //Folder
    string Folder_availabilityStatus;//
    string Folder_codeList;//
    string Folder_comments;//
    string Folder_entryUUID;//
    string Folder_homeCommunityId;//
    string Folder_lastUpdateTime;//
    string Folder_limitedMetadata;//
    string Folder_patientId;//
    string Folder_title;//
    string Folder_uniqueId;//

//Store Function=====================================================================================

    function s_DocumentEntry_author(string memory value1, string memory value2) public {
        DocumentEntry_author = value1;
        DocumentEntry_availabilityStatus = value2;
    }
    
    /*function s_DocumentEntry_availabilityStatus(string memory value) public {
        DocumentEntry_availabilityStatus = value;
    }
    
    function s_DocumentEntry_classCode(string memory value) public {
        DocumentEntry_classCode = value;
    }
    
    function s_DocumentEntry_comment(string memory value) public {
        DocumentEntry_comment = value;
    }
    
    function s_DocumentEntry_confidentialityCode(string memory value) public {
        DocumentEntry_confidentialityCode = value;
    }
    
    function s_DocumentEntry_creationTime(string memory value) public {
        DocumentEntry_creationTime = value;
    }
    
    function s_DocumentEntry_entryUUID(string memory value) public {
        DocumentEntry_entryUUID = value;
    }
    
    function s_DocumentEntry_eventCodeList(string memory value) public {
        DocumentEntry_eventCodeList = value;
    }
    
    function s_DocumentEntry_formatCode(string memory value) public {
        DocumentEntry_formatCode = value;
    }
    
    function s_DocumentEntry_hash(string memory value) public {
        DocumentEntry_hash = value;
    }
    
    function s_DocumentEntry_healthcareFacilityTypeCode(string memory value) public {
        DocumentEntry_healthcareFacilityTypeCode = value;
    }
    
    function s_DocumentEntry_homeCommunityId(string memory value) public {
        DocumentEntry_homeCommunityId = value;
    }
    
    function s_DocumentEntry_languageCode(string memory value) public {
        DocumentEntry_languageCode = value;
    }
    
    function s_DocumentEntry_legalAuthenticator(string memory value) public {
        DocumentEntry_legalAuthenticator = value;
    }
    
    function s_DocumentEntry_limitedMetadata(string memory value) public {
        DocumentEntry_limitedMetadata = value;
    }
    
    function s_DocumentEntry_mimeType(string memory value) public {
        DocumentEntry_mimeType = value;
    }
    
    function s_DocumentEntry_objectType(string memory value) public {
        DocumentEntry_objectType = value;
    }
    
    function s_DocumentEntry_patientId(string memory value) public {
        DocumentEntry_patientId = value;
    }
    
    function s_DocumentEntry_practiceSettingCode(string memory value) public {
        DocumentEntry_practiceSettingCode = value;
    }
    
    function s_DocumentEntry_referenceIdList(string memory value) public {
        DocumentEntry_referenceIdList = value;
    }
    
    function s_DocumentEntry_repositoryUniqueId(string memory value) public {
        DocumentEntry_repositoryUniqueId = value;
    }
    
    function s_DocumentEntry_serviceStartTime(string memory value) public {
        DocumentEntry_serviceStartTime = value;
    }
    
    function s_DocumentEntry_serviceStopTime(string memory value) public {
        DocumentEntry_serviceStopTime = value;
    }
    
    function s_DocumentEntry_size(string memory value) public {
        DocumentEntry_size = value;
    }
    
    function s_DocumentEntry_sourcePatientId(string memory value) public {
        DocumentEntry_sourcePatientId = value;
    }
    
    function s_DocumentEntry_sourcePatientInfo(string memory value) public {
        DocumentEntry_sourcePatientInfo = value;
    }
    
    function s_DocumentEntry_title(string memory value) public {
        DocumentEntry_title = value;
    }
    
    function s_DocumentEntry_typeCode(string memory value) public {
        DocumentEntry_typeCode = value;
    }
    
    function s_DocumentEntry_uniqueId(string memory value) public {
        DocumentEntry_uniqueId = value;
    }
    
    function s_DocumentEntry_URI(string memory value) public {
        DocumentEntry_URI = value;
    }
    
    function s_SubmissionSet_author(string memory value) public {
        SubmissionSet_author = value;
    }
    
    function s_SubmissionSet_availabilityStatus(string memory value) public {
        SubmissionSet_availabilityStatus = value;
    }
    
    function s_SubmissionSet_comments(string memory value) public {
        SubmissionSet_comments = value;
    }
    
    function s_SubmissionSet_contentTypeCode(string memory value) public {
        SubmissionSet_contentTypeCode = value;
    }
    
    function s_SubmissionSet_entryUUID(string memory value) public {
        SubmissionSet_entryUUID = value;
    }
    
    function s_SubmissionSet_homeCommunityId(string memory value) public {
        SubmissionSet_homeCommunityId = value;
    }
    
    function s_SubmissionSet_intendedRecipient(string memory value) public {
        SubmissionSet_intendedRecipient = value;
    }
    
    function s_SubmissionSet_limitedMetadata(string memory value) public {
        SubmissionSet_limitedMetadata = value;
    }
    
    function s_SubmissionSet_patientId(string memory value) public {
        SubmissionSet_patientId = value;
    }
    
    function s_SubmissionSet_sourceId(string memory value) public {
        SubmissionSet_sourceId = value;
    }
    
    function s_SubmissionSet_submissionTime(string memory value) public {
        SubmissionSet_submissionTime = value;
    }
    
    function s_SubmissionSet_title(string memory value) public {
        SubmissionSet_title = value;
    }
    
    function s_SubmissionSet_uniqueId(string memory value) public {
        SubmissionSet_uniqueId = value;
    }
    
    function s_Folder_availabilityStatus(string memory value) public {
        Folder_availabilityStatus = value;
    }
    
    function s_Folder_codeList(string memory value) public {
        Folder_codeList = value;
    }
    
    function s_Folder_comments(string memory value) public {
        Folder_comments = value;
    }
    
    function s_Folder_entryUUID(string memory value) public {
        Folder_entryUUID = value;
    }
    
    function s_Folder_homeCommunityId(string memory value) public {
        Folder_homeCommunityId = value;
    }
    
    function s_Folder_lastUpdateTime(string memory value) public {
        Folder_lastUpdateTime = value;
    }
    
    function s_Folder_limitedMetadata(string memory value) public {
        Folder_limitedMetadata = value;
    }
    
    function s_Folder_patientId(string memory value) public {
        Folder_patientId = value;
    }
    
    function s_Folder_title(string memory value) public {
        Folder_title = value;
    }
    
    function s_Folder_uniqueId(string memory value) public {
        Folder_uniqueId = value;
    }*/

//Return Function==============================================================================================

    function r_DocumentEntry_author() public view returns (string memory){
        return DocumentEntry_author;
    }
    

}