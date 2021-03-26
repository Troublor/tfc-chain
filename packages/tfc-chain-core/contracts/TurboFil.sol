pragma solidity >=0.8.0 <0.9.0;

// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./interfaces.sol";


contract TurboFil is AccessControl, Initializable {
    bytes32 public constant REGISTER_ROLE = keccak256("REGISTER_ROLE");
    bytes32 public constant SEED_ROLE = keccak256("SEED_ROLE");
    bytes32 public constant REWARD_ROLE = keccak256("REWARD_ROLE");
    
    IRNodeFactory rnodeFactory;
    ITFCShare sectorSubmissionShare;
    ITFCShare sectorVerificationShare;
    ITFCShare seedSubmissionShare;
    ITFCShare seedEvaluationShare;

    struct Seed {
        address submitter; // the account who takes this photo as seed
        string afid; // afid of this photo
        uint256 timestamp; // timestamp of this photo
        uint256 likes;
        uint256 dislikes;
    }

    using EnumerableSet for EnumerableSet.AddressSet;
    
    // RNodes
    EnumerableSet.AddressSet rnodes;
    mapping(string=>IRNode) public rnodeMapping;
    
    // Seeds
    mapping(string=>Seed) public proposedSeedMapping;
    Seed[] committedSeeds;
    
    event RegisterRNode(address owner, address rnode, string afid);
    event SubmitSeed(address submitter, string afid);
    event EvaluateSeed(address evaluator, string afid, bool like);
    
    function initialize(address _rnodeFactory, address _sectorSubmissionShare, address _sectorVerificationShare, address _seedSubmissionShare, address _seedEvaluationShare) initializer external {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        rnodeFactory = IRNodeFactory(_rnodeFactory);
        sectorSubmissionShare = ITFCShare(_sectorSubmissionShare);
        sectorVerificationShare = ITFCShare(_sectorVerificationShare);
        seedSubmissionShare = ITFCShare(_seedSubmissionShare);
        seedEvaluationShare = ITFCShare(_seedEvaluationShare);
    }

    /// @notice Register a RNode
    /// @dev This function create a RNode contract and save it in the mapping.
    function registerRNode(address owner, string calldata afid) public {
        require(hasRole(REGISTER_ROLE, msg.sender), "TurboFil: Caller does not have privilege to register RNode");
        IRNode rnode = IRNode(rnodeFactory.produce(owner, afid, sectorSubmissionShare, sectorVerificationShare));
        rnodeMapping[afid] = rnode;
        rnodes.add(address(rnode));
        emit RegisterRNode(owner, address(rnode), afid);
    }
    
    /// @notice A mobile user uses this function to submit a seed (photo).
    /// @dev A submitted seed should not get reward until it gets at least 3 likes.
    function submitSeed(string calldata afid) public {
        address submitter = msg.sender;
        require(hasRole(SEED_ROLE, submitter), "TurboFil: Caller does not have privilege to submit seed");
        proposedSeedMapping[afid] = Seed({
            submitter: submitter,
            afid: afid,
            timestamp: block.timestamp,
            likes: 0,
            dislikes: 0
        });
        emit SubmitSeed(submitter, afid);
    }
    
    /// @notice This function is called with a photo (seed) gets evaluated (thumb up/down).
    function submitSeedEvaluation(string calldata seed_afid, bool like) public {
        uint256 seed_like_thredhold = 3;
        uint256 seed_dislike_thredhold = 3;
        address evaluator = msg.sender;
        require(hasRole(SEED_ROLE, evaluator), "TurboFil: Caller does not have privilege to evaluate seed");
        require(proposedSeedMapping[seed_afid].submitter != address(0), "TurboFil: Unknown seed");
        Seed storage seed = proposedSeedMapping[seed_afid];
        if (like) {
            seed.likes++;
            if (seed.likes >= seed_like_thredhold) {
                // the seed got enough likes, ready for verification
                delete proposedSeedMapping[seed_afid];
                committedSeeds.push(seed);
                seedSubmissionShare.mint(seed.submitter, 1);
            }
        }else {
            seed.dislikes++;
            if (seed.dislikes >= seed_dislike_thredhold) {
                // the seed got too many dislikes, discarded
                delete proposedSeedMapping[seed_afid];
            }
        }
        seedEvaluationShare.mint(evaluator, 1);
        emit EvaluateSeed(evaluator, seed_afid, like);
    }

    /// @notice This function should be called by off-chain, to verify a random sector.
    /// @dev A sector should be selected randomly from all rnodes. Then a seed should be picked randomly to do the verification.
    function verify() public {
        
    }

    /// @notice Verify a specific sector.
    function verifySector(string calldata sector_afid) public {

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
        sectorSubmissionShare.distributeTFC{value: miningReward}();
        
        uint256 verifyingReward = (verifyingProportion / totalProportion) * msg.value;
        sectorVerificationShare.distributeTFC{value: verifyingReward}();
        
        uint256 seedingReward = (seedingProportion / totalProportion) * msg.value;
        seedSubmissionShare.distributeTFC{value: seedingReward}();
        
        uint256 evaluatingReward = (evaluatingProportion / totalProportion) * msg.value;
        seedEvaluationShare.distributeTFC{value: evaluatingReward}();
    }
}
