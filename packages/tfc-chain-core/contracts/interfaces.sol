pragma solidity >=0.8.0 <0.9.0;

// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface ITFCShare is IAccessControl {
    function totalSupply() view external returns (uint256);
    function mint(address recepient, uint256 amount) external;
    function distributeTFC(uint256 releaseTime_, string memory comment_) payable external;
}


interface IRNode is IAccessControl {
    function afid() view external returns (string memory);
    function owner() view external returns (address);
}

interface ISector is IAccessControl {
    function invalid() view external returns (bool);
    function submitVerification(ISeed seed_, bool success_) external;
}

interface ISeed {
    function submitter() view external returns (address);
    function afid() view external returns (string memory);
    function consumed() view external returns (bool);
    function consume() external;
    function likes() view external returns (uint256);
    function dislikes() view external returns (uint256);
}
