pragma solidity >=0.4.22 <0.7.0; //SPDX-License-Identifier: UNLICENSED

contract Storage {

    struct Document_Registry {
    	string[53] METADataAttributes;
    }
    uint DocID; //Assign DocID Here
    mapping (uint => Document_Registry) docreg; 

//Store metadata attributes =====================================================================================================
    function storeDocumentEntry(uint Docid, //DocId marking Document
                                    string memory DocumentEntry, //and store metadata attributes of DocumentEntry of this document
                                    //
                                    ) public {
        ...
    }
    
    function storeSubmissionSet(uint Docid, //DocId marking Document
                                string memory SubmissionSet, //and store metadata attributes of SubmissionSet of this document
                                ) public {
        ...
    }
    
     function storeFolder(uint Docid, //DocId marking Document
                                string memory Folder, //and store metadata attributes of Folder of this document
                                ) public {
        ...
    }

//Return metadata attributes ===================================================================================================
    function readDocumentRegistry(uint DocId, uint key) public view returns (string memory){
        string memory result;
        result = docreg[DocId].METADataAttributes[key];
        return result; //DocId marking Document return all stored metadata attributes value of this document
    }
}