pragma solidity ^0.8.0;

// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./WTFCLock.sol";
import "./interfaces.sol";

/// @title Wrapped TFC
/// @notice WTFC is meant to facilitate manipulating user's rewards, interests and punishments. 
///         When various events happens, e.g., sector submission, the user will only get WTFC token here. 
///         The fresh token is initially locked for a period of time, before it can be exchanged to TFC. 
///         If the user is caught cheating, his WTFC will be deducted as a punishment.
contract WTFC is ERC20, IWTFC, AccessControl {
    bytes32 public constant REGULATOR_ROLE = keccak256("REGULATOR_ROLE");
    
    constructor(uint256 totalSupply) ERC20("Wrapped TFC", "WTFC") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _mint(msg.sender, totalSupply);
    }
    
    function reward(address beneficiary_, uint256 amount_, uint256 lockTime_) public returns (address lock_) {
        address regulator = msg.sender;
        require(hasRole(REGULATOR_ROLE, regulator));
        require(balanceOf(address(this)) >= amount_);
        WTFCLock lock = new WTFCLock(IERC20(this), beneficiary_, block.timestamp + lockTime_);
        // add the reward value
        _transfer(address(this), address(lock), amount_);
        return address(lock);
    }
    
    function punish(address victim_, address lock_) public {
        address regulator = msg.sender;
        require(hasRole(REGULATOR_ROLE, regulator));
        require(victim_ == WTFCLock(lock_).beneficiary());
        _transfer(lock_, address(this), balanceOf(lock_));
    }
    
    function exchangeFromTFC() payable public override {
        uint256 amount = msg.value;
        require(balanceOf(address(this)) >= amount);
        _transfer(address(this), msg.sender, amount);
    }
    
    function exchangeToTFC(uint256 amount_) public {
        require(balanceOf(msg.sender) >= amount_);
        _transfer(msg.sender, address(this), amount_);
        payable(msg.sender).transfer(amount_);
    }
}