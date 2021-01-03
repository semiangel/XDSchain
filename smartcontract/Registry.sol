pragma solidity >=0.4.22 <0.7.0; //SPDX-License-Identifier: UNLICENSED

contract Storage {

    struct Document_Registry {
    	string searchAttributes; //Storing META-Data Attributes for search operation
    	string fullAttributes; //Storing META-Data Attributes for return result
    }
    uint DocID = 0; //This variable is for selecting Document ID, always reset to 0
    uint lastDoc; //This variable keep track for the latest Document ID being used
    mapping (uint => Document_Registry) docreg; 
    //Assign variable "documentregist" to map value of struct Document_Registry
    //Constructor Document_Registry store JSON string for search and for return as full response

    //Store string JSON 
    function store(uint Docid, string memory searchJSON, string memory fullJSON) public {
        if (Docid > 0){
            DocID = Docid; //If Docid was specified (not 0) replacing string JSON of existing Docid
                           //This probably require some kind of authentication
        }
        else{
            lastDoc++; //If Docid was not specified, create new ID
            DocID = lastDoc;
        }
        docreg[DocID].searchAttributes = searchJSON;
        docreg[DocID].fullAttributes = fullJSON;
    }
    
    //Check the lastest ID being used
    function checkLastID() public view returns (uint) {
        return lastDoc;
    }

    //Call for string JSON for Search Program
    function retreiveSearch(uint Docid) public view returns (string memory) {
        return docreg[Docid].searchAttributes;
    }
    
    //Call for string JSON for Result Return Program
    function retreiveFull(uint Docid) public view returns (string memory) {
        return docreg[Docid].fullAttributes;
    }
}