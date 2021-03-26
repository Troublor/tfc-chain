pragma solidity >=0.8.0 <0.9.0;

// SPDX-License-Identifier: MIT

import "./interfaces.sol";
import "./RNode.sol";


contract TurboFil  {
    struct Seed {
        address submitter; // the account who takes this photo as seed
        string afid; // afid of this photo
        uint256 timestamp; // timestamp of this photo
        string sectorAfid; // the afid of the sector
        string merkleRoot; // the merkle root of the sector
    }

    RNode[] rnodes;
    Seed[] seeds;

    /// @notice This function should be called by off-chain, to verify a random sector.
    /// @dev A sector should be selected randomly from all rnodes. Then a seed should be picked randomly to do the verification.
    function verify() public {

    }

    /// @notice Verify a specific sector.
    function verifySector(string sector_afid) internal {

    }

    /// @notice This function calculate the total amount of TFC that should be released today and distribute to users.
    function distributeReward() public {

    }
}
