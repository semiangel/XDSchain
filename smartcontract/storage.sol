pragma solidity >=0.4.22 <0.7.0; //SPDX-License-Identifier: UNLICENSED

/**
 * @title Storage
 * @dev Store & retreive value in a variable
 */
contract Storage {

    string storedJSON;

    function store(string memory receivedJSON) public {
        storedJSON = receivedJSON;
    }

    /**
     * @dev Return value 
     * @return value of 'number'
     */
    function retreive() public view returns (string memory){
        return storedJSON;
    }
}