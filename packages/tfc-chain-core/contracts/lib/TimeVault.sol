pragma solidity ^0.8.0;

/// @title A vault that allows balance to be locked for a period of time.
/// @author Wuqi Aaron Zhang
/// @notice The vault should contain many balance shards, each of which has their own unlock timestamp.
/// @dev When using this Vault, each address should correspond to one vault.
library TimeVault {
    struct HoldableVault {

    }

    /// @notice Give reword to the vault. The reward is attached to an unlock timestamp, after which the value can be withdrawn.
    function reward(HoldableVault storage vault, uint256 value) public {

    }

    /// @notice Deduct the value that is being hold in the vault.
    function punish(HoldableVault storage vault) public {

    }
}
