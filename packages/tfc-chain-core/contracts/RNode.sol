pragma solidity >=0.8.0 <0.9.0;

// SPDX-License-Identifier: MIT

import "./interfaces.sol";
import "./lib/SectorVerification.sol";

contract RNode is IRNode {
    string public id;

    Sector[] rewardedSectors;
    Sector[] unrewardedSectors;

    struct Sector {
        address submitter; // the account that mines this sector
        string afid; // the afid of this sector
        string merkleRoot; // the merkle root of this sector
        SectorVerification.Verification[] verifications;
    }

    constructor(string memory _id) {
        id = _id;
    }

    /// @notice Given a sector and a seed, call Provable service to verify this sector.
    function verifySector(string sector_afid, string seed_afid) public {

    }

    /// @notice Callback called by Provable service, notifying the verification result.
    function verifySector_callback(string sector_afid, string seed_afid, bool success) public {

    }
}
