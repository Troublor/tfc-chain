pragma solidity ^0.8.0;

// SPDX-License-Identifier: MIT

import "./interfaces.sol";
import "./Depositable.sol";

contract Sector is ISector, Depositable {
    bytes32 public constant VERIFY_ROLE = keccak256("VERIFY_ROLE");
    
    ITFCShare _sectorVerificationShare;

    string public afid;
    string public merkleRoot;
    address public submitter;
    address public rnode;
    uint256 public submittedTime;
    
    bool public override invalid; 
    
    event SectorVerification(address sector, string sector_afid, string seed_afid, bool success);
    
    constructor(address submitter_, address rnode_, string memory afid_, string memory merkleRoot_, ITFCShare sectorVerificationShare_) Depositable(payable(rnode_), payable(msg.sender)) payable {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        
        _deposit(block.timestamp + 12 weeks, "initial deposit");
        
        afid = afid_;
        submitter = submitter_;
        rnode = rnode_;
        merkleRoot = merkleRoot_;
        submittedTime = block.timestamp;
        invalid = false;
        
        _sectorVerificationShare = sectorVerificationShare_;
        _setupRole(DEPOSIT_ROLE, address(sectorVerificationShare_));
    }
    
    /// @dev Called by TurboFil. TurboFil should have the VERIFY_ROLE.
    function submitVerification(ISeed seed_, bool success_) public override {
        require(hasRole(VERIFY_ROLE, msg.sender), "Sector: Caller does not have privilege to submit verification");
        require(!invalid, "Sector: Sector is already invalidated");
        seed_.consume();
        if (success_) {
            _sectorVerificationShare.mint(address(this), 1); // give reward to the sector submitter
        } else {
            invalid = true;
            _punishAll(); // punish all, including initial deposit and rewards got for verifications.
        }
        emit SectorVerification(address(this), afid, seed_.afid(), success_);
    }
    
    function _punishAll() internal {
        for (uint256 i = 0; i < deposits.length; i++) {
            if (!deposits[i].released && !deposits[i].punished) {
                _punish(i);
            }
        }
    }
}

// contract SectorFactory is ISectorFactory, AccessControl {
//     bytes32 public constant PRODUCER_ROLE = keccak256("PRODUCER_ROLE"); // should only grant to the TurboFil
    
//     address public turboFil;
    
//     constructor(address turboFil_) {
//         _setupRole(DEFAULT_ADMIN_ROLE, turboFil_);
//         turboFil = turboFil_;
        
//         _setupRole(PRODUCER_ROLE, turboFil_);
//     }
    
//     /// @dev Called by RNode. When registering RNode, TurboFil should grant RNode PRODUCER_ROLE;
//     function produce(address submitter_, address rnode_, string memory afid_, string memory merkleRoot_, ITFCShare sectorVerificationShare_, uint256 depositReleaseTime_) payable external override returns (ISector) {
//         require(hasRole(PRODUCER_ROLE, msg.sender), "SectorFactory: Caller does not have privilege to produce");
//         Sector sector = new Sector{value: msg.value}(submitter_, rnode_, afid_, merkleRoot_, sectorVerificationShare_, depositReleaseTime_);
//         bytes32 VERIFY_ROLE = keccak256("VERIFY_ROLE"); // same VERIFY_ROLE as in Sector
//         sector.grantRole(VERIFY_ROLE, turboFil);
//         sector.grantRole(DEFAULT_ADMIN_ROLE, turboFil);
//         return sector;
//     }
// }