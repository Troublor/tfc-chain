pragma solidity >=0.8.0 <0.9.0;

// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./TFCStake.sol";

interface IWTFC is IERC20 {
     function exchangeFromTFC() payable external;
}

interface ITFCShare is IAccessControl {
    function mint(address recepient, uint256 amount) external;
    function distributeTFC() payable external;
}


interface IRNode is IAccessControl {
    function afid() view external returns (string memory);
    function owner() view external returns (address);
}

interface IRNodeFactory is IAccessControl {
    function produce(address owner, string calldata afid, ISectorFactory sectorFactory_, ITFCShare _sectorSubmissionShare, ITFCShare _sectorVerificationShare, ITFCShare _seedSubmissionShare, ITFCShare _seedEvaluationShare) external returns (IRNode);
}

interface ISector is IAccessControl {
    function invalid() view external returns (bool);
    function submitVerification(ISeed seed_, bool success_) external;
}

interface ISectorFactory is IAccessControl  {
    function produce(address submitter_, address rnode_, string memory afid_, string memory merkleRoot_, TFCStake deposit_, ITFCShare sectorVerificationShare_) external returns (ISector);
}

interface ISeed {
    function afid() view external returns (string memory);
    function consumed() view external returns (bool);
    function consume() external;
    function likes() view external returns (uint256);
    function dislikes() view external returns (uint256);
}

interface ISeedFactory is IAccessControl  {
    function produce(address submitter_, string memory afid_, ITFCShare seedEvaluationShare_) external returns (ISeed);
}