pragma solidity ^0.8.0;

// SPDX-License-Identifier: MIT

library SectorVerification {
    struct Verifiable {
        bool done;
    }

    /// @notice This function is called when we have got one verification result from off-chain.
    /// @dev The triggering of verification should be made outside this library.
    /// @return done Whether more seed verification is needed or not. If this returns false, caller should do more verification.
    function verify(Verifiable storage verification, string calldata seed_afid, bool success) public returns (bool done) {

    }
}
