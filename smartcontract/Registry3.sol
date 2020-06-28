pragma solidity >=0.4.22 <0.7.0;

contract Storage {

    //Declare XDS attributes variable
    //DocumentEntry
    struct Document_Registry {
    
        string DocumentEntry_author;
        string DocumentEntry_availabilityStatus; 
        string DocumentEntry_classCode;
        string DocumentEntry_comment;
        string DocumentEntry_confidentialityCode;
        string DocumentEntry_creationTime;
        string DocumentEntry_entryUUID;
        string DocumentEntry_eventCodeList; 
        string DocumentEntry_formatCode;
        string DocumentEntry_hash;
        string DocumentEntry_healthcareFacilityTypeCode;
        string DocumentEntry_homeCommunityId;
        string DocumentEntry_languageCode;
        string DocumentEntry_legalAuthenticator;
        string DocumentEntry_limitedMetadata;
        string DocumentEntry_mimeType;
        string DocumentEntry_objectType;
        string DocumentEntry_patientId;
        string DocumentEntry_practiceSettingCode;
        string DocumentEntry_referenceIdList;
        string DocumentEntry_repositoryUniqueId;
        string DocumentEntry_serviceStartTime;
        string DocumentEntry_serviceStopTime;
        string DocumentEntry_size;
        string DocumentEntry_sourcePatientId;
        string DocumentEntry_sourcePatientInfo;
        string DocumentEntry_title;
        string DocumentEntry_typeCode;
        string DocumentEntry_uniqueId;
        string DocumentEntry_URI;
        
        //SubmissionSet
        string SubmissionSet_author;
        string SubmissionSet_availabilityStatus;
        string SubmissionSet_comments;
        string SubmissionSet_contentTypeCode;
        string SubmissionSet_entryUUID;
        string SubmissionSet_homeCommunityId;
        string SubmissionSet_intendedRecipient;
        string SubmissionSet_limitedMetadata;
        string SubmissionSet_patientId;
        string SubmissionSet_sourceId;
        string SubmissionSet_submissionTime;
        string SubmissionSet_title;
        string SubmissionSet_uniqueId;
        
        //Folder
        string Folder_availabilityStatus;
        string Folder_codeList;
        string Folder_comments;
        string Folder_entryUUID;
        string Folder_homeCommunityId;
        string Folder_lastUpdateTime;
        string Folder_limitedMetadata;
        string Folder_patientId;
        string Folder_title;
        string Folder_uniqueId;
    
    }
    
    uint numDoc;
    mapping (uint => Document_Registry) docreg; //assign variable "documentregist" to map value of struct Document_Registry

//Store Function=====================================================================================

    function storeDocumentEntryPart1(string memory D_author, 
                                    string memory D_availS, 
                                    string memory D_classCode, 
                                    string memory D_comment,
                                    string memory D_confC,
                                    string memory D_createTime,
                                    string memory D_UUID,
                                    string memory D_eventCode,
                                    string memory D_fC,
                                    string memory D_hash,
                                    string memory D_healthFac,
                                    string memory D_homeCId,
                                    string memory D_langCode,
                                    string memory D_legalAuth,
                                    string memory D_limitedMet
                                    //string memory D_mimeType
                                    ) public returns (uint DocID) {
        DocID = numDoc++; //need to add more condition to check if it's new document or existing document | and maybe for current solution we need to return DocID to allow updater to pick right DocID
        docreg[DocID].DocumentEntry_author = D_author;
        docreg[DocID].DocumentEntry_availabilityStatus = D_availS;
        docreg[DocID].DocumentEntry_classCode = D_classCode;
        docreg[DocID].DocumentEntry_comment = D_comment;
        docreg[DocID].DocumentEntry_confidentialityCode = D_confC;
        docreg[DocID].DocumentEntry_creationTime = D_createTime;
        docreg[DocID].DocumentEntry_entryUUID = D_UUID;
        docreg[DocID].DocumentEntry_eventCodeList = D_eventCode;
        docreg[DocID].DocumentEntry_formatCode = D_fC;
        docreg[DocID].DocumentEntry_hash = D_hash;
        docreg[DocID].DocumentEntry_healthcareFacilityTypeCode = D_healthFac;
        docreg[DocID].DocumentEntry_homeCommunityId = D_homeCId;
        docreg[DocID].DocumentEntry_languageCode = D_langCode;
        docreg[DocID].DocumentEntry_legalAuthenticator = D_legalAuth;
        docreg[DocID].DocumentEntry_limitedMetadata = D_limitedMet;
        //documentregist[DocID].DocumentEntry_mimeType = D_mimeType;
    }
    /*
    function storeDocumentEntryPart2(string memory D_objType,
                                    string memory D_patId,
                                    string memory D_practiceSet,
                                    string memory D_refId,
                                    string memory D_reposId,
                                    string memory D_servStartTime,
                                    string memory D_servStopTime,
                                    string memory D_size,
                                    string memory D_sourcePatId,
                                    string memory D_sourcePatInfo,
                                    string memory D_title,
                                    string memory D_typeCode,
                                    string memory D_uniqueId,
                                    string memory D_URI
                                    ) public {
        DocumentEntry_objectType = D_objType;
        DocumentEntry_patientId = D_patId;
        DocumentEntry_practiceSettingCode = D_practiceSet;
        DocumentEntry_referenceIdList = D_refId;
        DocumentEntry_repositoryUniqueId = D_reposId;
        DocumentEntry_serviceStartTime = D_servStartTime;
        DocumentEntry_serviceStopTime = D_servStopTime;
        DocumentEntry_size = D_size;
        DocumentEntry_sourcePatientId = D_sourcePatId;
        DocumentEntry_sourcePatientInfo = D_sourcePatInfo;
        DocumentEntry_title = D_title;
        DocumentEntry_typeCode = D_typeCode;
        DocumentEntry_uniqueId = D_uniqueId;
        DocumentEntry_URI = D_URI;
    }
    
    function storeSubmissionSet(string memory S_author,
                                string memory S_availS,
                                string memory S_comment,
                                string memory S_contentTC,
                                string memory S_UUID,
                                string memory S_homeComId,
                                string memory S_intendRec,
                                string memory S_limitedMet,
                                string memory S_patId,
                                string memory S_sourceId,
                                string memory S_subTime,
                                string memory S_title,
                                string memory S_uniqueId
                                ) public {
        SubmissionSet_author = S_author;
        SubmissionSet_availabilityStatus = S_availS;
        SubmissionSet_comments = S_comment;
        SubmissionSet_contentTypeCode = S_contentTC;
        SubmissionSet_entryUUID = S_UUID;
        SubmissionSet_homeCommunityId = S_homeComId;
        SubmissionSet_intendedRecipient = S_intendRec;
        SubmissionSet_limitedMetadata = S_limitedMet;
        SubmissionSet_patientId = S_patId;
        SubmissionSet_sourceId = S_sourceId;
        SubmissionSet_submissionTime = S_subTime;
        SubmissionSet_title = S_title;
        SubmissionSet_uniqueId = S_uniqueId;
    }
    
    
     function storeFolder(string memory F_availS,
                        string memory F_codeList,
                        string memory F_comment,
                        string memory F_UUID,
                        string memory F_homeComId,
                        string memory F_lastUpdateTime,
                        string memory F_limitedMet,
                        string memory F_patId,
                        string memory F_title,
                        string memory F_uniqueId
                        ) public {
        Folder_availabilityStatus = F_availS;
        Folder_codeList = F_codeList;
        Folder_comments = F_comment;
        Folder_entryUUID = F_UUID;
        Folder_homeCommunityId = F_homeComId;
        Folder_lastUpdateTime = F_lastUpdateTime;
        Folder_limitedMetadata = F_limitedMet;
        Folder_patientId = F_patId;
        Folder_title = F_title;
        Folder_uniqueId = F_uniqueId;
    }*/

//Return Function==============================================================================================

    function readDocumentRegistry(uint DocID, string memory key) public view returns (string memory){
        string memory result;
        bytes memory stringTest = bytes(key);
        //Find a way to access struct element to query for specific variable inside struct
        //think about alternative way to return the whole bunch of variable
        if ( stringTest.length == 0 ){
            result = "No result";
        }
        else {
            result = docreg[DocID].; //how to replace this with prefer key in struct, maybe replace entire content of struct with array, or maybe put the entire struct in one array
            //should try 2 main case 1.Convert inside of struct to array, so we can access value in form of arrat 2.Pack all variables in struct into 1 variable and return at once.
            return result;
        }
    }
}