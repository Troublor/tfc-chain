pragma solidity ^0.8.0;

// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./interfaces.sol";

contract Seed is ISeed, AccessControl {
    bytes32 public constant CONSUMER_ROLE = keccak256("CONSUMER_ROLE");
    
    ITFCShare _seedEvaluationShare;
    
    string public override afid;
    address public submitter;
    bool public override consumed;
    uint256 public override likes;
    uint256 public override dislikes;
    uint256 public submittedTime;
    
    mapping(address=>bool) _evaluated;
    
    event SeedEvaluation(address seed, string afid, address evaluator, bool like);
    
    constructor(address submitter_, string memory afid_, ITFCShare seedEvaluationShare_) {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        
        submitter = submitter_;
        afid = afid_;
        consumed = false;
        submittedTime = block.timestamp;
        likes = 0;
        dislikes = 0;
    
        _seedEvaluationShare = seedEvaluationShare_;
    }
    
    /// @dev Only called by TurboFil. 
    function consume() public override {
        require(hasRole(CONSUMER_ROLE, msg.sender), "Seed: Caller does not have privilege to consume");
        consumed = true;
    }
    
    /// @notice To evaluate a seed by liking or disliking it. 
    /// @dev Each address can only evaluate a seed once. 
    function evaluate(address evaluator_, bool like_) public {
        require(!_evaluated[msg.sender], "Seed: Caller has already evaluated");
        if (like_) likes++;
        else dislikes++;
        _seedEvaluationShare.mint(evaluator_, 1);
        emit SeedEvaluation(address(this), afid, evaluator_, like_);
    }
}

contract SeedFactory is ISeedFactory, AccessControl {
    bytes32 public constant PRODUCER_ROLE = keccak256("PRODUCER_ROLE"); // should only grant to the TurboFil
    
    address public turboFil;
    
    constructor(address turboFil_) {
        _setupRole(DEFAULT_ADMIN_ROLE, turboFil_);
        turboFil = turboFil_;
        
         // grant PRODUCER_ROLE for turboFil so that turboFil can register RNode.
        _setupRole(PRODUCER_ROLE, turboFil_);
    }
    
    function produce(address submitter_, string memory afid_, ITFCShare seedEvaluationShare_) external override returns (ISeed) {
        require(hasRole(PRODUCER_ROLE, msg.sender), "SeedFactory: Caller does not have privilege to produce");
        Seed seed = new Seed(submitter_, afid_, seedEvaluationShare_);
        
        // grant CONSUMER_ROLE in Seed to TurboFil, so that the TurboFil is able to consume seed. 
        bytes32 CONSUMER_ROLE = keccak256("CONSUMER_ROLE"); // same CONSUMER_ROLE as in Seed
        seed.grantRole(CONSUMER_ROLE, turboFil);
        return seed;
    }
}