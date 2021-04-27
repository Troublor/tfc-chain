pragma solidity >=0.8.0 <0.9.0;

// SPDX-License-Identifier: MIT

interface ITurboFil {
    function hasVerifyRole(address addr_) view external returns (bool);
}

interface ISector {
    
    function verificationResult(bytes28 seed_, bool result_) payable external;
    
    /* view functions */
    function owner() view external returns (address payable);
    function afid() view external returns (bytes28);
    
}