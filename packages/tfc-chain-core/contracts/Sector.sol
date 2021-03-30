pragma solidity ^0.8.0;

// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./interfaces.sol";

contract Sector is ISector, AccessControl {
    bytes32 public constant VERIFY_ROLE = keccak256("VERIFY_ROLE");
    
    ITFCShare _sectorVerificationShare;
    
    string public afid;
    string public merkleRoot;
    address public submitter;
    address public rnode;
    TFCStake _deposit;
    uint256 public submittedTime;
    bool public override invalid; 
    
    event SectorVerification(address sector, string sector_afid, string seed_afid, bool success);
    
    constructor(address submitter_, address rnode_, string memory afid_, string memory merkleRoot_, TFCStake deposit_, ITFCShare sectorVerificationShare_) {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        
        afid = afid_;
        submitter = submitter_;
        rnode = rnode_;
        merkleRoot = merkleRoot_;
        _deposit = deposit_;
        submittedTime = block.timestamp;
        invalid = false;
        _sectorVerificationShare = sectorVerificationShare_;
    }
    
    /// @dev Called by TurboFil. TurboFil should have the VERIFY_ROLE.
    function submitVerification(ISeed seed_, bool success_) public override {
        require(hasRole(VERIFY_ROLE, msg.sender), "Sector: Caller does not have privilege to submit verification");
        if (success_) {
            _sectorVerificationShare.mint(rnode, 1);
        }else {
            invalid = true;
            _deposit.punish();
        }
        emit SectorVerification(address(this), afid, seed_.afid(), success_);
    }
}

contract SectorFactory is ISectorFactory, AccessControl {
    bytes32 public constant PRODUCER_ROLE = keccak256("PRODUCER_ROLE"); // should only grant to the TurboFil
    
    address public turboFil;
    
    constructor(address turboFil_) {
        _setupRole(DEFAULT_ADMIN_ROLE, turboFil_);
        turboFil = turboFil_;
        
        _setupRole(PRODUCER_ROLE, turboFil_);
    }
    
    /// @dev Called by RNode. When registering RNode, TurboFil should grant RNode PRODUCER_ROLE;
    function produce(address submitter_, address rnode_, string memory afid_, string memory merkleRoot_, TFCStake deposit_, ITFCShare sectorVerificationShare_) external override returns (ISector) {
        require(hasRole(PRODUCER_ROLE, msg.sender), "SectorFactory: Caller does not have privilege to produce");
        Sector sector = new Sector(submitter_, rnode_, afid_, merkleRoot_, deposit_, sectorVerificationShare_);
        bytes32 VERIFY_ROLE = keccak256("VERIFY_ROLE"); // same VERIFY_ROLE as in Sector
        sector.grantRole(VERIFY_ROLE, turboFil);
        return sector;
    }
}