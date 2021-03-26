pragma solidity >=0.8.0 <0.9.0;

// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./lib/SectorVerification.sol";
import "./interfaces.sol";

contract RNode is AccessControl, IRNode {
    ITFCShare sectorSubmissionShare;
    ITFCShare sectorVerificationShare;
    address public turbofil;
    address public owner;
    string public afid;

    Sector[] public sectors;
    
    SectorVerification.Verifiable[] verifications;

    struct Sector {
        string afid; // the afid of this sector
        string merkleRoot; // the merkle root of this sector
        uint256 verifications;
    }

    constructor(address _owner, string memory _afid, ITFCShare _sectorSubmissionShare, ITFCShare _sectorVerificationShare) {
        turbofil = msg.sender;
        owner = _owner;
        afid = _afid;
        sectorSubmissionShare = _sectorSubmissionShare;
        sectorVerificationShare = _sectorVerificationShare;
    }
    
    /// @notice This function is typically called by TurboFil to save the sector submitted.
    function submitSector(string calldata _afid, string calldata _merkleRoot) public override {
        require(msg.sender == turbofil, "RNode: Caller does not have privilege to submit sector");
        Sector memory sector = Sector({
            afid: _afid,
            merkleRoot: _merkleRoot,
            verifications: 0
        });
        sectors.push(sector);
        
        // mint sector submission share
        sectorSubmissionShare.mint(address(this), 1);
    }

    /// @notice Given a sector and a seed, call Provable service to verify this sector.
    function verifySector(string calldata sector_afid, string calldata seed_afid) public override {

    }

    /// @notice Callback called by Provable service, notifying the verification result.
    function verifySector_callback(string calldata sector_afid, string calldata seed_afid, bool success) public override {

    }
}
