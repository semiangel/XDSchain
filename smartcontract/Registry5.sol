pragma solidity >=0.4.22 <0.7.0; //SPDX-License-Identifier: UNLICENSED

contract Storage {

    //Declare variable to store XDS attributes value
    struct Document_Registry {
    	string[53] METADataAttributes;
    }
    uint DocID;
    uint numDoc;
    mapping (uint => Document_Registry) docreg; //assign variable "documentregist" to map value of struct Document_Registry

//Store Function=====================================================================================

    function storeDocumentEntryPart1(uint Docid,
                                    string memory DocumentEntry_author, 
                                    string memory DocumentEntry_availabilityStatus, 
                                    string memory DocumentEntry_classCode, 
                                    string memory DocumentEntry_comment,
                                    string memory DocumentEntry_confidentialityCode,
                                    string memory DocumentEntry_creationTime,
                                    string memory DocumentEntry_entryUUID,
                                    string memory DocumentEntry_eventCodeList,
                                    string memory DocumentEntry_formatCode,
                                    string memory DocumentEntry_hash,
                                    string memory DocumentEntry_healthcareFacilityTypeCode,
                                    string memory DocumentEntry_homeCommunityId,
                                    string memory DocumentEntry_languageCode,
                                    string memory DocumentEntry_legalAuthenticator
                                    //
                                    ) public {
        if (Docid > 0){
            DocID = Docid;
        }
        else{
            DocID++;
        }
        docreg[DocID].METADataAttributes[0] = DocumentEntry_author;
        docreg[DocID].METADataAttributes[1] = DocumentEntry_availabilityStatus;
        docreg[DocID].METADataAttributes[2] = DocumentEntry_classCode;
        docreg[DocID].METADataAttributes[3] = DocumentEntry_comment;
        docreg[DocID].METADataAttributes[4] = DocumentEntry_confidentialityCode;
        docreg[DocID].METADataAttributes[5] = DocumentEntry_creationTime;
        docreg[DocID].METADataAttributes[6] = DocumentEntry_entryUUID;
        docreg[DocID].METADataAttributes[7] = DocumentEntry_eventCodeList;
        docreg[DocID].METADataAttributes[8] = DocumentEntry_formatCode;
        docreg[DocID].METADataAttributes[9] = DocumentEntry_hash;
        docreg[DocID].METADataAttributes[10] = DocumentEntry_healthcareFacilityTypeCode;
        docreg[DocID].METADataAttributes[11] = DocumentEntry_homeCommunityId;
        docreg[DocID].METADataAttributes[12] = DocumentEntry_languageCode;
        docreg[DocID].METADataAttributes[13] = DocumentEntry_legalAuthenticator;
    }
    //should make the first transact return value of DocID, so this will allow following transact to follow the right DocID in sequence
    
    function storeDocumentEntryPart2(uint Docid,
                                    string memory DocumentEntry_limitedMetadata,
                                    string memory DocumentEntry_mimeType, 
                                    string memory DocumentEntry_objectType, 
                                    string memory DocumentEntry_patientId, 
                                    string memory DocumentEntry_practiceSettingCode,
                                    string memory DocumentEntry_referenceIdList,
                                    string memory DocumentEntry_repositoryUniqueId,
                                    string memory DocumentEntry_serviceStartTime,
                                    string memory DocumentEntry_serviceStopTime,
                                    string memory DocumentEntry_size
                                    ) public {
        if (Docid > 0){
            DocID = Docid;
        }
        else{
            DocID++;
        }
        docreg[DocID].METADataAttributes[14] = DocumentEntry_limitedMetadata;
        docreg[DocID].METADataAttributes[15] = DocumentEntry_mimeType;
        docreg[DocID].METADataAttributes[16] = DocumentEntry_objectType;
        docreg[DocID].METADataAttributes[17] = DocumentEntry_patientId;
        docreg[DocID].METADataAttributes[18] = DocumentEntry_practiceSettingCode;
        docreg[DocID].METADataAttributes[19] = DocumentEntry_referenceIdList;
        docreg[DocID].METADataAttributes[20] = DocumentEntry_repositoryUniqueId;
        docreg[DocID].METADataAttributes[21] = DocumentEntry_serviceStartTime;
        docreg[DocID].METADataAttributes[22] = DocumentEntry_serviceStopTime;
        docreg[DocID].METADataAttributes[23] = DocumentEntry_size;
    }
    
    function storeDocumentEntryPart3(uint Docid,//1150
                                    string memory DocumentEntry_sourcePatientId,
                                    string memory DocumentEntry_sourcePatientInfo,
                                    string memory DocumentEntry_title,
                                    string memory DocumentEntry_typeCode,
                                    string memory DocumentEntry_uniqueId,
                                    string memory DocumentEntry_URI 
                                    ) public {
        if (Docid > 0){
            DocID = Docid;
        }
        else{
            DocID++;
        }
        docreg[DocID].METADataAttributes[24] = DocumentEntry_sourcePatientId;
        docreg[DocID].METADataAttributes[25] = DocumentEntry_sourcePatientInfo;
        docreg[DocID].METADataAttributes[26] = DocumentEntry_title;
        docreg[DocID].METADataAttributes[27] = DocumentEntry_typeCode;
        docreg[DocID].METADataAttributes[28] = DocumentEntry_uniqueId;
        docreg[DocID].METADataAttributes[29] = DocumentEntry_URI;
    }
    
    function storeSubmissionSet(uint Docid,
                                string memory SubmissionSet_author,
                                string memory SubmissionSet_availabilityStatus,
                                string memory SubmissionSet_comments,
                                string memory SubmissionSet_contentTypeCode,
                                string memory SubmissionSet_entryUUID,
                                string memory SubmissionSet_homeCommunityId,
                                string memory SubmissionSet_intendedRecipient,
                                string memory SubmissionSet_limitedMetadata,
                                string memory SubmissionSet_patientId,
                                string memory SubmissionSet_sourceId,
                                string memory SubmissionSet_submissionTime,
                                string memory SubmissionSet_title,
                                string memory SubmissionSet_uniqueId
                                ) public {
        if (Docid > 0){
            DocID = Docid;
        }
        else{
            DocID++;
        }
        docreg[DocID].METADataAttributes[30] = SubmissionSet_author;
        docreg[DocID].METADataAttributes[31] = SubmissionSet_availabilityStatus;
        docreg[DocID].METADataAttributes[32] = SubmissionSet_comments;
        docreg[DocID].METADataAttributes[33] = SubmissionSet_contentTypeCode;
        docreg[DocID].METADataAttributes[34] = SubmissionSet_entryUUID;
        docreg[DocID].METADataAttributes[35] = SubmissionSet_homeCommunityId;
        docreg[DocID].METADataAttributes[36] = SubmissionSet_intendedRecipient;
        docreg[DocID].METADataAttributes[37] = SubmissionSet_limitedMetadata;
        docreg[DocID].METADataAttributes[38] = SubmissionSet_patientId;
        docreg[DocID].METADataAttributes[39] = SubmissionSet_sourceId;
        docreg[DocID].METADataAttributes[40] = SubmissionSet_submissionTime;
        docreg[DocID].METADataAttributes[41] = SubmissionSet_title;
        docreg[DocID].METADataAttributes[42] = SubmissionSet_uniqueId;
    }
    
     function storeFolder(uint Docid,
                                string memory Folder_availabilityStatus,
                                string memory Folder_codeList,
                                string memory Folder_comments,
                                string memory Folder_entryUUID,
                                string memory Folder_homeCommunityId,
                                string memory Folder_lastUpdateTime,
                                string memory Folder_limitedMetadata,
                                string memory Folder_patientId,
                                string memory Folder_title,
                                string memory Folder_uniqueId
                                ) public {
        if (Docid > 0){
            DocID = Docid;
        }
        else{
            DocID++;
        }
        docreg[DocID].METADataAttributes[43] = Folder_availabilityStatus;
        docreg[DocID].METADataAttributes[44] = Folder_codeList;
        docreg[DocID].METADataAttributes[45] = Folder_comments;
        docreg[DocID].METADataAttributes[46] = Folder_entryUUID;
        docreg[DocID].METADataAttributes[47] = Folder_homeCommunityId;
        docreg[DocID].METADataAttributes[48] = Folder_lastUpdateTime;
        docreg[DocID].METADataAttributes[49] = Folder_limitedMetadata;
        docreg[DocID].METADataAttributes[50] = Folder_patientId;
        docreg[DocID].METADataAttributes[51] = Folder_title;
        docreg[DocID].METADataAttributes[52] = Folder_uniqueId;
    }

//Return Function==============================================================================================

    function readDocumentRegistry(uint DocId, uint key) public view returns (string memory){
        string memory result;
        result = docreg[DocId].METADataAttributes[key];
        return result;
    }
}