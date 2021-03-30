pragma solidity >=0.8.0 <0.9.0;

// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/utils/TokenTimelock.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract WTFCLock is TokenTimelock, AccessControl {
    bytes32 public constant PUNISH_ROLE = keccak256("PUNISH_ROLE");
    
    address _payer;
    
    constructor(IERC20 token_, address beneficiary_, uint256 releaseTime_) TokenTimelock(token_, beneficiary_, releaseTime_) {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        
        _payer = msg.sender;
        token_.approve(_payer, type(uint256).max);
    }
    
    function value() view public returns (uint256) {
        return token().balanceOf(address(this));
    }
    
    function punish() public {
        require(hasRole(PUNISH_ROLE, msg.sender), "WTFCLock: Caller does not have privilege to punish");
        token().transfer(_payer, value());
    }
}