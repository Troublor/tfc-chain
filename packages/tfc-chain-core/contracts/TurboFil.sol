pragma solidity >=0.8.0 <0.9.0;

// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./interfaces.sol";
import "./RNode.sol";
import "./Sector.sol";
import "./Seed.sol";


contract TurboFil is AccessControl {
    bytes32 public constant REGISTER_ROLE = keccak256("REGISTER_ROLE");
    bytes32 public constant SUBMIT_ROLE = keccak256("SUBMIT_ROLE");
    bytes32 public constant SEED_ROLE = keccak256("SEED_ROLE");
    bytes32 public constant REWARD_ROLE = keccak256("REWARD_ROLE");
    bytes32 public constant VERIFY_ROLE = keccak256("VERIFY_ROLE");
    
    ITFCShare _sectorSubmissionShare; // reward for sector submission, giving to rnode
    ITFCShare _sectorVerificationShare; // reward for sector verification, giving to sector submitter
    ITFCShare _seedSubmissionShare; // reward for seed submission, giving to seed submitter after the seed is used
    ITFCShare _seedEvaluationShare; // reward for seed evaluation, giving to seed evaluator
    
    mapping(RNode=>bool) registeredRNodes;
    mapping(Sector=>bool) submittedSectors;
    mapping(Seed=>bool) submittedSeeds;

    event RegisterRNode(address owner, address rnode, string afid);
    event SubmitSector(address submitter, address sector, string afid);
    event SubmitSeed(address submitter, address seed, string afid);
    event EvaluateSeed(address evaluator, string afid, bool like);
    event VerifySector(address sector, address seed, bool success);
    
    /// @dev should be deploy separately by admin.
    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }
    
    function initialize(
                address sectorSubmissionShare_, address sectorVerificationShare_, address seedSubmissionShare_, address seedEvaluationShare_) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "TurboFil: Caller does not have privilege to initialize");
        
        _sectorSubmissionShare = ITFCShare(sectorSubmissionShare_);
        _sectorVerificationShare = ITFCShare(sectorVerificationShare_);
        _seedSubmissionShare = ITFCShare(seedSubmissionShare_);
        _seedEvaluationShare = ITFCShare(seedEvaluationShare_);
    }

    /// @notice Register a RNode
    /// @dev This function create a RNode contract and save it in the mapping.
    function registerRNode(address owner_, string calldata afid_) public returns (IRNode) {
        require(hasRole(REGISTER_ROLE, msg.sender), "TurboFil: Caller does not have privilege to register RNode");
        
        RNode rnode = new RNode(owner_, afid_, address(this));
        registeredRNodes[rnode] = true;
        emit RegisterRNode(owner_, address(rnode), afid_);
        
        return rnode;
    }
    
    function submitSector(IRNode rnode_, address submitter_, string calldata afid_, string calldata merkleRoot_) payable public {
        require(hasRole(SUBMIT_ROLE, msg.sender), "TurboFil: Caller does not have privilege to submit sector");
        require(submitter_ == rnode_.owner(), "TurboFil: Sector submitter is not the owner");
        require(msg.value == 3 ether, "TurboFil: Sector submission requires 3 TFC deposit");
        
        // locking for 12 weeks
        // create a new sector contract
        Sector sector = new Sector{value: msg.value}(submitter_, address(rnode_), afid_, merkleRoot_, _sectorVerificationShare);
        
        bytes32 role = keccak256("MINTER_ROLE");
        _sectorVerificationShare.grantRole(role, address(sector));

        role = keccak256("VERIFY_ROLE");
        sector.grantRole(role, address(this));
        
        submittedSectors[sector] = true;
        
        emit SubmitSector(submitter_, address(sector), afid_);
    }
    
    /// @notice A mobile user uses this function to submit a seed (photo).
    /// @dev A submitted seed should not get reward until it gets at least 3 likes.
    function submitSeed(address submitter_, string calldata afid_) public returns (ISeed) {
        require(hasRole(SEED_ROLE, msg.sender), "TurboFil: Caller does not have privilege to submit seed");
        Seed seed = new Seed({
            submitter_: submitter_,
            afid_: afid_,
            seedSubmissionShare_: _seedSubmissionShare,
            seedEvaluationShare_: _seedEvaluationShare
        });
        
        // grant MINTER_ROLE in TFCShare to seed, so that the seed is able to mint seedEvaluationShare. 
        bytes32 MINTER_ROLE = keccak256("MINTER_ROLE");
        _seedEvaluationShare.grantRole(MINTER_ROLE, address(seed));
        _seedSubmissionShare.grantRole(MINTER_ROLE, address(seed));
        
        emit SubmitSeed(submitter_, address(seed), afid_);
        
        submittedSeeds[seed] = true;
        
        return seed;
    }
    
    function verifySector(Sector sector_, Seed seed_, bool success_) public {
        require(hasRole(VERIFY_ROLE, msg.sender), "TurboFil: Caller does not have privilege to verify sector");
        require(submittedSectors[sector_], "TurboFil: Unknown sector");
        require(submittedSeeds[seed_], "TurboFil: Unknown seed");
        
        bytes32 role = keccak256("CONSUMER_ROLE");
        seed_.grantRole(role, address(sector_));
        
        sector_.submitVerification(seed_, success_);
        
        emit VerifySector(address(sector_), address(seed_), success_);
    }

    /// @notice This function receive the total amount of TFC that should be released today and distribute to users.
    function distributeTFC(uint256 releaseTime_, string memory comment_) payable public {
        require(hasRole(REWARD_ROLE, msg.sender), "TurboFil: Caller does not have privilege to distribute TFC");
        uint256 miningProportion = 1;
        uint256 verifyingProportion = 1;
        uint256 seedingProportion = 1;
        uint256 evaluatingProportion = 1;
        uint256 totalProportion = miningProportion + verifyingProportion;
        
        uint256 miningReward = (miningProportion / totalProportion) * msg.value;
        if (_sectorSubmissionShare.totalSupply() > 0){
            _sectorSubmissionShare.distributeTFC{value: miningReward}(releaseTime_, comment_);
        }else{
            payable(msg.sender).transfer(miningReward);
        }
        
        uint256 verifyingReward = (verifyingProportion / totalProportion) * msg.value;
        if (_sectorVerificationShare.totalSupply() > 0) {
            _sectorVerificationShare.distributeTFC{value: verifyingReward}(releaseTime_, comment_);
        }else{
            payable(msg.sender).transfer(verifyingReward);
        }
        
        uint256 seedingReward = (seedingProportion / totalProportion) * msg.value;
        if (_seedSubmissionShare.totalSupply() > 0) {
            _seedSubmissionShare.distributeTFC{value: seedingReward}(releaseTime_, comment_);
        }else{
            payable(msg.sender).transfer(seedingReward);
        }
        
        uint256 evaluatingReward = (evaluatingProportion / totalProportion) * msg.value;
        if (_seedEvaluationShare.totalSupply() > 0) {
            _seedEvaluationShare.distributeTFC{value: evaluatingReward}(releaseTime_, comment_);
        }else{
            payable(msg.sender).transfer(evaluatingReward);
        }
    }
}
