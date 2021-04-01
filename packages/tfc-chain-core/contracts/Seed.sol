pragma solidity ^0.8.0;

// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./interfaces.sol";

contract Seed is ISeed, AccessControl {
    bytes32 public constant CONSUMER_ROLE = keccak256("CONSUMER_ROLE");
    
    ITFCShare _seedEvaluationShare;
    ITFCShare _seedSubmissionShare;
    
    string public override afid;
    address public override submitter;
    bool public override consumed;
    uint256 public override likes;
    uint256 public override dislikes;
    uint256 public submittedTime;
    
    mapping(address=>bool) _evaluated;
    
    event EvaluateSeed(address seed, string afid, address evaluator, bool like);
    
    constructor(address submitter_, string memory afid_, ITFCShare seedSubmissionShare_, ITFCShare seedEvaluationShare_) {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        
        submitter = submitter_;
        afid = afid_;
        consumed = false;
        submittedTime = block.timestamp;
        likes = 0;
        dislikes = 0;
    
        _seedSubmissionShare = seedSubmissionShare_;
        _seedEvaluationShare = seedEvaluationShare_;
    }
    
    /// @dev Only called by TurboFil. 
    function consume() public override {
        require(hasRole(CONSUMER_ROLE, msg.sender), "Seed: Caller does not have privilege to consume");
        require(!consumed, "Seed: Already consumed");
        require(likes >= 3, "Seed: Not enough likes");
        _seedSubmissionShare.mint(submitter, 1);
        consumed = true;
    }
    
    /// @notice To evaluate a seed by liking or disliking it. 
    /// @dev Each address can only evaluate a seed once.
    /// @param evaluator_ address of the user who evaluate this seed.
    /// @param like_ whether the user likes this seed (photo)
    function evaluate(address evaluator_, bool like_) public {
        require(!_evaluated[evaluator_], "Seed: Caller has already evaluated");
        _evaluated[evaluator_] = true; 
        if (like_) likes++;
        else dislikes++;
        _seedEvaluationShare.mint(evaluator_, 1);
        emit EvaluateSeed(address(this), afid, evaluator_, like_);
    }
}