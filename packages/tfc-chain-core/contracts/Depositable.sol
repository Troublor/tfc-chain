pragma solidity ^0.8.0;

// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/AccessControl.sol";

interface IDepositable {
    function deposit(uint256 releaseTime_, string memory comment_) payable external;
}

contract Depositable is AccessControl, IDepositable {
    bytes32 public constant DEPOSIT_ROLE = keccak256("DEPOSIT_ROLE");
    bytes32 public constant PUNISH_ROLE = keccak256("PUNISH_ROLE");
    
    address payable public beneficiary;
    address payable public punishPool; 
    struct Dep {
        uint256 amount;
        uint256 releaseTime;
        bool punished;
        bool released;
        string comment;
    }
    Dep[] internal deposits;
    
    constructor(address payable beneficiary_, address payable punishPool_) {
         _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
         
         beneficiary = beneficiary_;
         punishPool = punishPool_;
    }
    
    event Deposit(address beneficiary, uint256 releaseTime, uint256 amount);
    event Release(address beneficiary, uint256 enforcedReleaseTime, uint256 realReleaseTime, uint256 amount);
    event Punish(address beneficiary, uint256 amount);
    
    function deposit(uint256 releaseTime_, string memory comment_) payable public override {
        require(hasRole(DEPOSIT_ROLE, msg.sender), "Depositable: Caller does not have privilege to deposit");
        _deposit(releaseTime_, comment_);
    }
    
    function _deposit(uint256 releaseTime_, string memory comment_) internal {
        require(msg.value > 0, "Depositable: no TFC to deposit");
        require(releaseTime_ >= block.timestamp, "Depositable: release time is before current time");

        Dep memory d = Dep({
            amount: msg.value,
            releaseTime: releaseTime_,
            punished: false,
            released: false,
            comment: comment_
        });
        deposits.push(d);
        emit Deposit(beneficiary, releaseTime_, msg.value);
    }
    
    function release(uint256 index_) external {
        Dep memory d = deposit(index_);
        require(block.timestamp >= d.releaseTime, "Depositable: Current time is before release time");
        require(!d.punished, "Depositable: Deposit punished");
        require(!d.released, "Depositable: Deposit already released");
        beneficiary.transfer(d.amount);
        d.released = true;
        deposits[index_] = d;
        emit Release(beneficiary, d.releaseTime, block.timestamp, d.amount);
    }
    
    function deposit(uint256 index_) view public returns (Dep memory) {
        require(index_ < deposits.length, "Depositable: Index out of range");
        return deposits[index_];
    }
    
    function _punish(uint256 index_) internal {
        Dep memory d = deposit(index_);
        require(block.timestamp >= d.releaseTime, "Depositable: Current time is before release time");
        require(!d.punished, "Depositable: Deposit already punished");
        require(!d.released, "Depositable: Deposit already released");
        punishPool.transfer(d.amount);
        d.punished = true;
        deposits[index_] = d;
        emit Punish(beneficiary, d.amount);
    }
    
    function punish(uint256 index_) public {
        require(hasRole(PUNISH_ROLE, msg.sender), "Depositable: Caller does not have privilege to punish");
        _punish(index_);
    }
}