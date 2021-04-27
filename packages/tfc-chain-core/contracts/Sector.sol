pragma solidity >=0.8.0 <0.9.0;

// SPDX-License-Identifier: MIT

import "./interfaces.sol";

contract Sector is ISector {
    /// The reward queue. 
    struct Queue {
        mapping(uint256 => uint256) q;
        uint256 start;
        uint256 len;
        uint256 total;
        uint256 maxSize;
    }
    Queue _rewards;

    /// The deposit of the sector
    struct Deposit{
        uint256 shard;
        uint256 nShards;
    }
    Deposit _deposit;

    address payable public override owner;
    bytes28 public override afid;
    ITurboFil public turboFil;
    
    address public verification;

    event Verification(bytes28 seed, bool result, uint256 reward, uint256 punish);
    
    modifier onlyTurboFil {
        require(msg.sender == address(turboFil), "Sector: can only be called by TurboFil");
        _;
    }
    
    modifier onlyOwner {
        require(msg.sender == owner, "Sector: can only be called by owner");
        _;
    }
    
    modifier onlyVerification {
        require(msg.sender == verification, "Sector: can only be called by correct verification");
        _;
    }

    constructor(address payable owner_, bytes28 afid_, uint256 lockPeriod_) payable {
        turboFil = ITurboFil(msg.sender);
        owner = owner_;
        afid = afid_;
        uint256 shard = msg.value / lockPeriod_;
        _deposit.shard = shard;
        _deposit.nShards = lockPeriod_;
    }
    
    function setVerification(address verification_) onlyTurboFil external {
        verification = verification_;
    }
    
    function verificationResult(bytes28 seed_, bool result_) onlyVerification payable external override {
        uint256 reward;
        uint256 punish;
        if (result_){
            reward = msg.value;
            _reward(reward);
        } else {
            punish = _punish();
            payable(address(turboFil)).transfer(msg.value);
        }
        emit Verification(seed_, result_, reward, punish);
    }

    function _reward(uint256 amount_) internal returns (uint256 unlocked) {
        if (_deposit.nShards > 0) {
            unlocked += _deposit.shard;
            _deposit.nShards--;
            _rewards.maxSize++;
        }

        _rewards.q[_rewards.start+_rewards.len] = amount_;
        _rewards.total += amount_;
        if (_rewards.len < _rewards.maxSize) {
            _rewards.len += 1;
        } else {
            unlocked += _rewards.q[_rewards.start];
            _rewards.start += 1;
            _rewards.total -= unlocked;
        }

        if (unlocked > 0){
            owner.transfer(unlocked);
        }
    }

    function _punish() internal returns (uint256 amount) {
        amount += _deposit.shard * _deposit.nShards;
        amount += _rewards.total;
        if(amount > 0){
            payable(address(turboFil)).transfer(amount);
        }
    }
    
    /* View functions */
    
    function lockedTFC() view public returns(uint256) {
        return _rewards.total + _deposit.shard * _deposit.nShards;
    }
}
