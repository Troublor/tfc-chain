pragma solidity >=0.8.0 <0.9.0;

// SPDX-License-Identifier: MIT

interface IRNode {
    function submitSector(string calldata _afid, string calldata _merkleRoot) external;
    function verifySector(string calldata sector_afid, string calldata seed_afid) external;
    function verifySector_callback(string calldata sector_afid, string calldata seed_afid, bool success) external;
}

interface ITFCShare {
    function mint(address recepient, uint256 amount) external;
    function distributeTFC() payable external;
}

interface IRNodeFactory {
    function produce(address owner, string calldata afid, ITFCShare _sectorSubmissionShare, ITFCShare _sectorVerificationShare) external returns (address);
}