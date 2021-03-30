pragma solidity ^0.8.0;

// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/AccessControl.sol";

contract TFCStake is AccessControl {
    bytes32 public constant PUNISH_ROLE = keccak256("PUNISH_ROLE");
    
    address payable public beneficiary;
    uint256 releaseTime;
    address payable public pool;
    
    event Lock(address beneficiary, uint256 releaseTime, uint256 amount);
    event Release(address beneficiary, uint256 enforcedReleaseTime, uint256 realReleaseTime, uint256 amount);
    event Punish(address beneficiary);
    
    constructor(address payable beneficiary_, uint256 releaseTime_, address payable pool_) payable {
        require(releaseTime_ >= block.timestamp, "TFCStake: release time is before current time");
        require(msg.value > 0, "TFCStake: no TFC to lock as stake");
        
         _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        
        beneficiary = beneficiary_;
        releaseTime = releaseTime_;
        pool = pool_;
        emit Lock(beneficiary, releaseTime, msg.value);
    }
    
    function release() external {
        require(block.timestamp >= releaseTime, "TFCStake: current time is before release time");
        require(this.value() > 0, "TFCStake: no TFC to release");
        beneficiary.transfer(this.value());
        emit Release(beneficiary, releaseTime, block.timestamp, this.value());
    }
    
    function value() view public returns (uint256) {
        return address(this).balance;
    }
    
    function punish() public {
        require(hasRole(PUNISH_ROLE, msg.sender), "WTFCLock: Caller does not have privilege to punish");
        pool.transfer(value());
        emit Punish(beneficiary);
    }
}