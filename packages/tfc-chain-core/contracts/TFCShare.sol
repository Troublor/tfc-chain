pragma solidity >=0.8.0 <0.9.0;

// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "./interfaces.sol";
import "./Depositable.sol";

/// @title TFCShare
/// @notice This contract represents a share of TFC before reward is given. 
///         This token is helpful since we only know the total amount of TFC to distribute after each day ends.
///         With TFCS, we can record the shares in advance and TFC is distributed later based on total amount. 
/// @dev This contract is specific to a group of shares, e.g., RNode mining share. 
/// @dev This contract is able to iterate shares and distribute the paid TFC evenly to share holders.
contract TFCShare is AccessControl, ITFCShare {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAYER_ROLE = keccak256("PAYER_ROLE");
    
    using EnumerableSet for EnumerableSet.AddressSet;
    
    string public group;
    
    uint256 public override totalSupply;
    mapping(address=>uint256) public shares;
    EnumerableSet.AddressSet holders;
    
    event Reward(address recipient, uint256 amount, uint256 timestamp);
    
    constructor(string memory _group, address turboFil_) {
        _setupRole(DEFAULT_ADMIN_ROLE, turboFil_);
        group = _group;
        
        _setupRole(MINTER_ROLE, turboFil_);
        _setupRole(PAYER_ROLE, turboFil_);
    }
    
    function mint(address recipient, uint256 amount) override public {
        require(hasRole(MINTER_ROLE, msg.sender), "TFCShare: Caller does not have privilege to mint");
        require(recipient != address(0), "TFCShare: mint to the zero address");
        if (amount == 0) return;
        if (shares[recipient] == 0) holders.add(recipient);
        shares[recipient] += amount;
        totalSupply += amount;
    }
    
    /// @notice Distribute the given TFC value evenly to the share holders (proportional to the amount of shares);
    function distributeTFC(uint256 releaseTime_, string memory comment_) payable override public {
        require(hasRole(PAYER_ROLE, msg.sender), "TFCShare: Caller does not have privilege to distribute TFC");
        require(totalSupply > 0 , "TFCShare: No supply");
        uint256 value = msg.value;
        while(holders.length() > 0) {
            address payable holder = payable(holders.at(0));
            uint256 share = shares[holder];
            uint256 amount = (share * value) / totalSupply;
            
            // first try to call deposit (if the address implements IDepositable);
            uint256 size;
            // solhint-disable-next-line no-inline-assembly
            assembly { size := extcodesize(holder) }
            if (size > 0){
                IDepositable depositable = IDepositable(holder);
                try depositable.deposit(releaseTime_, comment_) {} catch {
                    // fails to call deposit, try direct transfer
                    bool success = holder.send(amount);
                    // if failed to give reward, send back to the sender, which should be TurboFil
                    if (!success) payable(msg.sender).transfer(amount);
                }
            }else {
                bool success = holder.send(amount);
                // if failed to give reward, send back to the sender, which should be TurboFil
                if (!success) payable(msg.sender).transfer(amount);
            }
            
            // reset this recipient
            delete shares[holder];
            holders.remove(holder);
            
            emit Reward(holder, amount, block.timestamp);
        }
        // reset totalSupply
        totalSupply = 0;
    }
}