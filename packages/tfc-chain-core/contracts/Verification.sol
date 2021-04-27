pragma solidity >=0.8.0 <0.9.0;

// SPDX-License-Identifier: MIT

import "./interfaces.sol";

contract Verification {
    uint8 public constant STATUS_WAITING = 0;
    uint8 public constant STATUS_VERIFYING = 1;
    
    ITurboFil public turboFil;
    ISector public sector;
    bytes28 public seed;
    address payable public seedSubmitter;
    uint256 public sectorReward;
    uint256 public seedReward;
    uint256 public verifyReward;
    uint256 public verifyThreshold;
    
    uint8 public status;
    
    string _proof;
    uint256 _submitProofDDL;
    
    uint256 _verifyProofDDL;
    mapping(address=>bool) public hasVerified;
    address[] trueVerifiers;
    address[] falseVerifiers;
    
    modifier onlyStatus(uint8 status_) {
        require(status == status_, "Verification: not at required status");
        _;
    }
    
    event ProofSubmitted(bytes28 sector_afid, bytes28 seed, string proof);
    event ProofVerified(bytes28 sector_afid, bytes28 seed, string proof, bool result);
    event VerifyFinish(bool result);
    
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
    
    function submitProof(string calldata proof_) onlyStatus(STATUS_WAITING) external {
        require(sector.owner() == msg.sender, "Verification: caller is not sector owner");
        require(block.number <= _submitProofDDL, "Verification: submit proof too late");
        
        _proof = proof_;
        status = STATUS_VERIFYING;
        
        emit ProofSubmitted(sector.afid(), seed, proof_);
    }
    
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
        seedSubmitter.transfer(seedReward);
        for (uint256 i = 0; i < trueVerifiers.length; i++){
            payable(trueVerifiers[i]).send(verifyReward);
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
    
    function collectFunds() public {
        require(!fail() && !pass() && (expireSubmitProofDDL() || expireVerifyProofDDL()), "Verification: not allowed to collect funds");
        if (address(this).balance > 0) payable(address(turboFil)).transfer(address(this).balance);
    }
    
    /* View functions */
    
    function proof() onlyStatus(STATUS_VERIFYING) view public returns (string memory) {
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
}