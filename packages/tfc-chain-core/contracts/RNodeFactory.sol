pragma solidity >=0.8.0 <0.9.0;

// SPDX-License-Identifier: MIT

import './RNode.sol';
import "./interfaces.sol";

contract RNodeFactory is IRNodeFactory {
    function produce(address owner, string calldata afid, ITFCShare _sectorSubmissionShare, ITFCShare _sectorVerificationShare) external override returns (address) {
        RNode rnode = new RNode(owner, afid, _sectorSubmissionShare, _sectorVerificationShare);
        return address(rnode);
    }
}