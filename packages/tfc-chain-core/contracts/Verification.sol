pragma solidity >=0.8.0 <0.9.0;

// SPDX-License-Identifier: MIT

import "./interfaces.sol";

contract Verification {
    uint8 public constant STATUS_WAITING = 0;
    uint8 public constant STATUS_VERIFYING = 1;

    uint8 public constant REWARD_SECTOR = 0;
    uint8 public constant REWARD_SEED = 1;
    uint8 public constant REWARD_VERIFY = 2;

    ITurboFil public turboFil;
    ISector public sector;
    bytes28 public seed;
    address payable public seedSubmitter;
    uint256 public sectorReward;
    uint256 public seedReward;
    uint256 public verifyReward;
    uint256 public verifyThreshold;

    uint8 public status;

    bytes28 _proof;
    uint256 _submitProofDDL;

    uint256 _verifyProofDDL;
    mapping(address=>bool) public hasVerified;
    address[] trueVerifiers;
    address[] falseVerifiers;

    modifier onlyStatus(uint8 status_) {
        require(status == status_, "Verification: not at required status");
        _;
    }

    event ProofSubmitted(bytes28 indexed sector_afid, bytes28 indexed seed, bytes28 proof);
    event ProofVerified(bytes28 indexed sector_afid, bytes28 indexed seed, bytes28 proof, bool indexed result);
    event Reward(uint8 indexed reward_type, address indexed to, uint256 amount);
    event VerifyFinish(bool indexed result);

    /// @dev created by TurboFil
    constructor(
        address payable sector_, bytes28 seed_, address payable seedSubmitter_,
        uint256 submitProofTimeout_, uint256 verifyProofTimeout_,
        uint256 verifyThreshold_,
        uint256 sectorReward_, uint256 seedReward_, uint256 verifyReward_
    ) payable {
        require(msg.value >= sectorReward_ + seedReward_ + verifyReward_ * verifyThreshold_, "Verification: not enough funds for rewards");
        turboFil = ITurboFil(msg.sender);
        sector = ISector(sector_);

        seed = seed_;
        seedSubmitter = seedSubmitter_;
        sectorReward = sectorReward_;
        seedReward = seedReward_;
        verifyReward = verifyReward_;

        _submitProofDDL = block.number + submitProofTimeout_;
        _verifyProofDDL = _submitProofDDL + verifyProofTimeout_;
        verifyThreshold = verifyThreshold_;
    }

    /// @notice Submit proof of the sector for verification
    /// @notice This function must be called by sector owner
    /// @param proof_ the afid of the proof
    function submitProof(bytes28 proof_) onlyStatus(STATUS_WAITING) external {
        require(sector.owner() == msg.sender, "Verification: caller is not sector owner");
        require(block.number <= _submitProofDDL, "Verification: submit proof too late");

        _proof = proof_;
        status = STATUS_VERIFYING;

        emit ProofSubmitted(sector.afid(), seed, proof_);
    }

    /// @notice Submit the verification result of the proof.
    /// @notice This function must be called by users who has VERIFY_ROLE in TurboFil contract.
    /// @param result_ whether the proof is valid or not
    function verifyProof(bool result_) onlyStatus(STATUS_VERIFYING) external {
        require(turboFil.hasVerifyRole(msg.sender), "Verification: does not have privilege to verify proof");
        require(block.number <= _verifyProofDDL, "Verification: verify proof too late");
        require(!hasVerified[msg.sender], "Verification: caller has already verified");

        if (result_) {
            trueVerifiers.push(msg.sender);
        } else {
            falseVerifiers.push(msg.sender);
        }
        hasVerified[msg.sender] = true;

        emit ProofVerified(sector.afid(), seed, proof(), result_);

        if (trueVerifiers.length >= verifyThreshold) {
            emit VerifyFinish(true);
            _reward();
        } else if (falseVerifiers.length >= verifyThreshold) {
            emit VerifyFinish(false);
            _punish();
        }
    }

    function _reward() internal {
        sector.verificationResult{value: sectorReward}(seed, true);
        emit Reward(REWARD_SECTOR, address(sector), sectorReward);
        bool success = seedSubmitter.send(seedReward);
        if (success) emit Reward(REWARD_SEED, seedSubmitter, seedReward);
        for (uint256 i = 0; i < trueVerifiers.length; i++){
            bool success = payable(trueVerifiers[i]).send(verifyReward);
            if (success) emit Reward(REWARD_VERIFY, trueVerifiers[i], verifyReward);
        }
        if (address(this).balance > 0) {
            payable(address(turboFil)).transfer(address(this).balance);
        }
    }

    function _punish() internal {
        sector.verificationResult(seed, false);
        seedSubmitter.transfer(seedReward);
        for (uint256 i = 0; i < falseVerifiers.length; i++){
            payable(falseVerifiers[i]).send(verifyReward);
        }
        if (address(this).balance > 0) {
            payable(address(turboFil)).transfer(address(this).balance);
        }
    }

    /// @notice collect TFC that is not given as reward.
    function collectFunds() public {
        require(!fail() && !pass() && (expireSubmitProofDDL() || expireVerifyProofDDL()), "Verification: not allowed to collect funds");
        if (address(this).balance > 0) payable(address(turboFil)).transfer(address(this).balance);
    }

    /* View functions */

    function proof() onlyStatus(STATUS_VERIFYING) view public returns (bytes28) {
        return _proof;
    }

    function submitProofDDL() onlyStatus(STATUS_WAITING) view public returns (uint256) {
        return _submitProofDDL;
    }

    function verifyProofDDL() onlyStatus(STATUS_VERIFYING) view public returns (uint256) {
        return _verifyProofDDL;
    }

    function expireSubmitProofDDL() view public returns (bool) {
        return block.number > submitProofDDL();
    }

    function expireVerifyProofDDL() view public returns (bool) {
        return block.number > verifyProofDDL();
    }

    function fail() view public returns (bool) {
        return falseVerifiers.length >= verifyThreshold;
    }

    function pass() view public returns (bool) {
        return trueVerifiers.length >= verifyThreshold;
    }

    // @notice Sector owner fails to submit proof within timeout.
    function abandoned() view public returns (bool) {
        if (status == STATUS_WAITING && expireSubmitProofDDL()) {
            return true;
        }else {
            return false;
        }
    }

    // @notice Sector owner succeeds to submit proof but there are not enough verifiers within timeout.
    function deadend() view public returns (bool) {
        if (status == STATUS_VERIFYING && expireVerifyProofDDL()){
            return false;
        }else {
            return true;
        }
    }
}