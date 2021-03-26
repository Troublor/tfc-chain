pragma solidity >=0.8.0 <0.9.0;

// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "./interfaces.sol";

/// @title TFCShare
/// @notice This contract represents a share of TFC before reward is given. 
///         This token is helpful since we only know the total amount of TFC to distribute after each day ends.
///         With TFCS, we can record the shares in advance and TFC is distributed later based on total amount. 
/// @dev This contract is specific to a group of shares, e.g., RNode mining share. 
/// @dev This contract is able to iterate shares and distribute the paid TFC evenly to share holders.
contract TFCShare is Ownable, ITFCShare {
    using EnumerableSet for EnumerableSet.AddressSet;
    
    string public group;
    
    uint256 public totalSupply;
    mapping(address=>uint256) public shares;
    EnumerableSet.AddressSet holders;
    
    event Reward(address recipient, uint256 amount, string group, uint256 timestamp);
    
    constructor(string memory _group) {
        group = _group;
    }
    
    function mint(address recipient, uint256 amount) onlyOwner override public {
        require(recipient != address(0), "TFCShare: mint to the zero address");
        if (amount == 0) return;
        if (shares[recipient] == 0) holders.add(recipient);
        shares[recipient] += amount;
        totalSupply += amount;
    }
    
    /// @notice Distribute the given TFC value evenly to the share holders (proportional to the amount of shares);
    function distributeTFC() onlyOwner payable override public {
        uint256 value = msg.value;
        for (uint256 i = 0; i < holders.length(); i++) {
            address payable holder = payable(holders.at(i));
            uint256 share = shares[holder];
            uint256 amount = (share / totalSupply) * value;
            bool success = holder.send(amount);
            // if failed to give reward, send back to owner of this contract, which should be TurboFil
            if (!success) payable(owner()).transfer(amount);
            
            // reset this recipient
            delete shares[holder];
            holders.remove(holder);
            
            emit Reward(holder, amount, group, block.timestamp);
        }
        // reset totalSupply
        totalSupply = 0;
    }
}