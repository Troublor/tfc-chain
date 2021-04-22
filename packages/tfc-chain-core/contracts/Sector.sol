pragma solidity >=0.8.0 <0.9.0;

// SPDX-License-Identifier: MIT

contract Sector {
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

    address payable public owner;
    bytes28 public afid;
    address payable public turboFil;

    event Verification(bytes28 seed, bool success, uint256 reward, uint256 punish);
    
    modifier onlyTurboFil {
        require(msg.sender == turboFil, "Sector: can only be called by TurboFil");
        _;
    }

    constructor(address payable owner_, bytes28 afid_, uint256 lockPeriod_) payable {
        turboFil = payable(msg.sender);
        owner = owner_;
        afid = afid_;
        uint256 shard = msg.value / lockPeriod_;
        _deposit.shard = shard;
        _deposit.nShards = lockPeriod_;
    }

    function verify(bytes28 seed_, bool success_) onlyTurboFil payable public {
        require(msg.value > 0, "Sector: verify reward cannot be zero");
        uint256 reward;
        uint256 punish;
        if (success_){
            reward = msg.value;
            _reward(reward);
        } else {
            punish = _punish();
            turboFil.transfer(msg.value);
        }
        emit Verification(seed_, success_, reward, punish);
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
            turboFil.transfer(amount);
        }
    }
    
    /* View functions */
    
    function lockedTFC() view public returns(uint256) {
        return _rewards.total + _deposit.shard * _deposit.nShards;
    }
}
