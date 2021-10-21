// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Hello {

    string greeting;

    constructor() {
        greeting = "hello";
    } 

    function getGreeting() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
    }

}
