pragma solidity >=0.8.0 <0.9.0;

// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./interfaces.sol";

contract RNode is AccessControl, IRNode {
    bytes32 public constant SUBMIT_ROLE = keccak256("SUBMIT_ROLE");
    
    address public turboFil;
    address public override owner;
    string public override afid;
    
    /// @dev Only called by TurboFil
    constructor(address owner_, string memory afid_, address turboFil_) {
        _setupRole(DEFAULT_ADMIN_ROLE, turboFil_);
        turboFil = turboFil_;
        owner = owner_;
        afid = afid_;
    }
}

