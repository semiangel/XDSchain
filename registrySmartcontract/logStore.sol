pragma solidity >=0.4.22 <0.7.0; //SPDX-License-Identifier: UNLICENSED

contract Storage {

    //Declare variable to store XDS attributes value
    struct Log_Memory {
    	string logValue;
    }
    uint logID = 0;
    mapping (uint => Log_Memory) memLog; //assign variable "documentregist" to map value of struct Document_Registry

//Store Function=====================================================================================

    function storeLog(string memory logValue) public {
        memLog[logID].logValue = logValue;
        logID++;
    }
    //should make the first transact return value of DocID, so this will allow following transact to follow the right DocID in sequence
    
//Return Function==============================================================================================

    function readLog(uint assignedLogID) public view returns (string memory){
        string memory result;
        result = memLog[assignedLogID].logValue;
        return result;
    }
}