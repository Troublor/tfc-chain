pragma solidity >=0.8.0 <0.9.0;

// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./interfaces.sol";


contract TurboFil is AccessControl {
    bytes32 public constant REGISTER_ROLE = keccak256("REGISTER_ROLE");
    bytes32 public constant SUBMIT_ROLE = keccak256("SUBMIT_ROLE");
    bytes32 public constant SEED_ROLE = keccak256("SEED_ROLE");
    bytes32 public constant REWARD_ROLE = keccak256("REWARD_ROLE");
    bytes32 public constant VERIFY_ROLE = keccak256("VERIFY_ROLE");

    IRNodeFactory _rnodeFactory;
    ISectorFactory _sectorFactory;
    ISeedFactory _seedFactory;
    
    ITFCShare _sectorSubmissionShare;
    ITFCShare _sectorVerificationShare;
    ITFCShare _seedSubmissionShare;
    ITFCShare _seedEvaluationShare;

    event RegisterRNode(address owner, address rnode, string afid);
    event SubmitSeed(address submitter, string afid);
    event EvaluateSeed(address evaluator, string afid, bool like);
    
    /// @dev should be deploy separately by admin
    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }
    
    function initialize(address rnodeFactory_, address sectorFactory_, address seedFactory_, 
                address sectorSubmissionShare_, address sectorVerificationShare_, address seedSubmissionShare_, address seedEvaluationShare_) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "TurboFil: Caller does not have privilege to initialize");
        
        _rnodeFactory = IRNodeFactory(rnodeFactory_);
        _sectorFactory = ISectorFactory(sectorFactory_);
        _seedFactory = ISeedFactory(seedFactory_);
        
        _sectorSubmissionShare = ITFCShare(sectorSubmissionShare_);
        _sectorVerificationShare = ITFCShare(sectorVerificationShare_);
        _seedSubmissionShare = ITFCShare(seedSubmissionShare_);
        _seedEvaluationShare = ITFCShare(seedEvaluationShare_);
    }

    /// @notice Register a RNode
    /// @dev This function create a RNode contract and save it in the mapping.
    function registerRNode(address owner_, string calldata afid_) public returns (IRNode) {
        require(hasRole(REGISTER_ROLE, msg.sender), "TurboFil: Caller does not have privilege to register RNode");
        
        IRNode rnode = _rnodeFactory.produce(owner_, afid_, _sectorFactory, _sectorSubmissionShare, _sectorVerificationShare, _seedSubmissionShare, _seedEvaluationShare);
       
        // grant PRODUCER_ROLE in sectorFactory to rnode, so that the rnode is able to create Sector contracts. 
        bytes32 PRODUCER_ROLE = keccak256("PRODUCER_ROLE"); // same PRODUCER_ROLE as in SectorFactory
        _sectorFactory.grantRole(PRODUCER_ROLE, address(rnode));
        
        // grant MINTER_ROLE in TFCShare to rnode, so that the r node is able to mint sectorSubmissionShare. 
        bytes32 MINTER_ROLE = keccak256("MINTER_ROLE");
        _sectorSubmissionShare.grantRole(MINTER_ROLE, address(rnode));
        
        emit RegisterRNode(owner_, address(rnode), afid_);
        
        return rnode;
    }
    
    function submitSector(IRNode rnode_, address submitter_, string calldata afid_, string calldata merkleRoot_) payable public {
        require(hasRole(SUBMIT_ROLE, msg.sender), "TurboFil: Caller does not have privilege to submit sector");
        require(submitter_ == rnode_.owner(), "TurboFil: Sector submitter is not the owner");
        require(msg.value == 3 ether, "TurboFil: Sector submission requires 3 TFC deposit");
        
        // create a deposit, locking for 12 weeks
        TFCStake deposit = new TFCStake{value: msg.value}(payable(rnode_.owner()), block.timestamp + 12 weeks, payable(address(this)));
        
        // create a new sector contract
        ISector sector = _sectorFactory.produce(submitter_, address(rnode_), afid_, merkleRoot_, deposit, _sectorVerificationShare);
        
        // grant PUNISH_ROLE in WTFCLock to sector, so that the sector is able to punish the locked TFC when fail to verify. 
        bytes32 PUNISH_ROLE = keccak256("PUNISH_ROLE"); // same PUNISH_ROLE as in WTFCLock
        sector.grantRole(PUNISH_ROLE, address(sector));

        // mint sector submission share
        _sectorSubmissionShare.mint(address(this), 1);
    }
    
    /// @notice A mobile user uses this function to submit a seed (photo).
    /// @dev A submitted seed should not get reward until it gets at least 3 likes.
    function submitSeed(address submitter_, string calldata afid_) public returns (ISeed) {
        require(hasRole(SEED_ROLE, msg.sender), "TurboFil: Caller does not have privilege to submit seed");
        ISeed seed = _seedFactory.produce({
            submitter_: submitter_,
            afid_: afid_,
            seedEvaluationShare_: _seedEvaluationShare
        });
        
        // grant MINTER_ROLE in TFCShare to seed, so that the seed is able to mint seedEvaluationShare. 
        bytes32 MINTER_ROLE = keccak256("MINTER_ROLE");
        _seedEvaluationShare.grantRole(MINTER_ROLE, address(seed));
        
        emit SubmitSeed(submitter_, afid_);
        return seed;
    }
    
    function verifySector(ISector sector_, ISeed seed_, bool success_) public {
        require(hasRole(VERIFY_ROLE, msg.sender), "TurboFil: Caller does not have privilege to verify sector");
        require(!sector_.invalid(), "TurboFil: Sector is invalid to verify");
        require(!seed_.consumed(), "TurboFil: Seed is already consumed");
        sector_.submitVerification(seed_, success_);
    }

    /// @notice This function receive the total amount of TFC that should be released today and distribute to users.
    function distributeTFC() payable public {
        require(hasRole(REWARD_ROLE, msg.sender), "TurboFil: Caller does not have privilege to distribute TFC");
        uint256 miningProportion = 1;
        uint256 verifyingProportion = 1;
        uint256 seedingProportion = 1;
        uint256 evaluatingProportion = 1;
        uint256 totalProportion = miningProportion + verifyingProportion;
        
        uint256 miningReward = (miningProportion / totalProportion) * msg.value;
        _sectorSubmissionShare.distributeTFC{value: miningReward}();
        
        uint256 verifyingReward = (verifyingProportion / totalProportion) * msg.value;
        _sectorVerificationShare.distributeTFC{value: verifyingReward}();
        
        uint256 seedingReward = (seedingProportion / totalProportion) * msg.value;
        _seedSubmissionShare.distributeTFC{value: seedingReward}();
        
        uint256 evaluatingReward = (evaluatingProportion / totalProportion) * msg.value;
        _seedEvaluationShare.distributeTFC{value: evaluatingReward}();
    }
}
