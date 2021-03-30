pragma solidity >=0.8.0 <0.9.0;

// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./interfaces.sol";
import "./TFCStake.sol";

contract RNode is AccessControl, IRNode {
    bytes32 public constant SUBMIT_ROLE = keccak256("SUBMIT_ROLE");
    
    address public turboFil;
    address public _owner;
    string public _afid;

    ISectorFactory _sectorFactory;

    /// @dev Only called by TurboFil
    constructor(address owner_, string memory afid_, address turboFil_) {
        _setupRole(DEFAULT_ADMIN_ROLE, turboFil_);
        turboFil = turboFil_;
        _owner = owner_;
        _afid = afid_;
    }
    
    function afid() view external override returns (string memory) {
        return _afid;
    }
    
    function owner() view external override returns (address) {
        return _owner;
    }
}

contract RNodeFactory is IRNodeFactory, AccessControl {
    bytes32 public constant PRODUCER_ROLE = keccak256("PRODUCER_ROLE"); // grant privilege to TurboFil
    
    address public turboFil;
    
    constructor(address turboFil_) {
        _setupRole(DEFAULT_ADMIN_ROLE, turboFil_);
        turboFil = turboFil_;
        
        // grant PRODUCER_ROLE for turboFil so that turboFil can register RNode.
        _setupRole(PRODUCER_ROLE, turboFil_);
    }
    
    function produce(address owner_, string calldata afid_, ISectorFactory sectorFactory_, ITFCShare sectorSubmissionShare_, ITFCShare sectorVerificationShare_, ITFCShare seedSubmissionShare_, ITFCShare seedEvaluationShare_) external override returns (IRNode) {
        require(hasRole(PRODUCER_ROLE, msg.sender), "RNodeFactory: Caller does not have privilege to produce");
        RNode rnode = new RNode(owner_, afid_, turboFil);
        return rnode;
    }
}
