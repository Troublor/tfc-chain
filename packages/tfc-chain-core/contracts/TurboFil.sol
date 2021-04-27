pragma solidity >=0.8.0 <0.9.0;

// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/AccessControl.sol";

import "./Sector.sol";
import "./Verification.sol";
import "./interfaces.sol";

contract TurboFil is AccessControl, ITurboFil {
    // Roles
    bytes32 public constant SECTOR_ROLE = keccak256("SECTOR_ROLE"); // the role who can submit sector.
    bytes32 public constant VERIFY_ROLE = keccak256("VERIFY_ROLE"); // the role who can verify sector proof.
    bytes32 public constant SEED_ROLE = keccak256("SEED_ROLE"); // the role who can submit seed.
    bytes32 public constant MAINTAIN_ROLE = keccak256("MAINTAIN_ROLE"); // the role who can do maintenance.
    
    uint256 public submitProofTimeout;
    uint256 public verifyProofTimeout;
    uint256 public verifyThreshold;
    
    uint256 public seedReward;
    uint256 public sectorReward;
    uint256 public verifyReward;
    uint256 public lockPeriod;

    mapping(bytes28=>Sector) sectors;
    Sector[] sectorList;
    
    mapping(bytes28=>bool) usedSeeds;

    event SectorSubmission(address owner, bytes28 afid, address sector);
    event VerificationTask(bytes28 indexed sector_afid, bytes28 seed, address verification);

    constructor(uint256 sectorReward_, uint256 seedReward_, uint256 verifyReward_, uint256 lockPeriod_,
    uint256 submitProofTimeout_, uint256 verifyProofTimeout_, uint256 verifyThreshold_) payable {
        // Grant the minter role to a specified account
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        
        sectorReward = sectorReward_;
        seedReward = seedReward_;
        verifyReward = verifyReward_;
        lockPeriod = lockPeriod_;
        
        submitProofTimeout = submitProofTimeout_;
        verifyProofTimeout = verifyProofTimeout_;
        verifyThreshold = verifyThreshold_;
    }
    
    /* Core functions */

    function submitSector(address payable owner_, bytes28 afid_) payable external {
        //TODO sector no repeat
        require(hasRole(SECTOR_ROLE, msg.sender), "TurboFil: caller does not have privilege to submit sector");
        require(msg.value >= sectorReward * lockPeriod, "TurboFil: not enough deposit");
        Sector sector = new Sector{value:msg.value}(owner_, afid_, lockPeriod);
        sectors[afid_] = sector;
        sectorList.push(sector);
        emit SectorSubmission(owner_, afid_, address(sector));
    }
    
    function submitSeed(bytes28 seed_) public {
        require(hasRole(SEED_ROLE, msg.sender), "TurboFil: caller does not have privilege to submit seed");
        require(!seedUsed(seed_), "TurboFil: seed already used");

        uint256 index = uint224(seed_) * block.timestamp % sectorList.length;
        Sector sector = sectorList[index];
        
        uint256 reward = sectorReward + seedReward + verifyReward * verifyThreshold;
        
        Verification verification = new Verification{value: reward}(
            payable(address(sector)), seed_, payable(msg.sender),
            submitProofTimeout, verifyProofTimeout,
            verifyThreshold,
            sectorReward, seedReward, verifyReward
        );
        sector.setVerification(address(verification));
        
        // notify off-chain monitor that a verification should be performed.
        emit VerificationTask(sector.afid(), seed_, address(verification));
    }
    
    /* Maintenance functions */
    
    modifier onlyMantainer {
        require(hasRole(MAINTAIN_ROLE, msg.sender), "TurboFil: caller does not have privilege to maintain TurboFil");
        _;
    }

    function withdraw() onlyMantainer external {
        payable(msg.sender).transfer(address(this).balance);
    }
    
    function setSubmitProofTimeout(uint256 timeout_) onlyMantainer external {
        submitProofTimeout = timeout_;
    }
    
    function setVerifyProofTimeout(uint256 timeout_) onlyMantainer external {
        verifyProofTimeout = timeout_;
    }
    
    function setVerifyThreshold(uint256 threshold_) onlyMantainer external {
        verifyThreshold = threshold_;
    }
    
    function setSectorReward(uint256 reward_) onlyMantainer external {
        sectorReward = reward_;
    } 
    
    function setSeedReward(uint256 reward_) onlyMantainer external {
        seedReward = reward_;
    } 
    
    function setVerifyReward(uint256 reward_) onlyMantainer external {
        verifyReward = reward_;
    } 
    
    function setLockPeriod(uint256 lockPeriod_) external {
        require(hasRole(MAINTAIN_ROLE, msg.sender), "TurboFil: caller does not have privilege to maintain TurboFil");
        lockPeriod = lockPeriod_;
    }
        
    receive() payable external {
    }
    
    /* View functions */
    
    function sectorAtIndex(uint256 index_) view public returns (address) {
        return address(sectorList[index_]);
    }
    
    function sectorWithAfid(bytes28 afid_) view public returns (address) {
        return address(sectors[afid_]);
    }
    
    function seedUsed(bytes28 seed_) view public returns (bool) {
        return usedSeeds[seed_];
    }
    
    function depositRequirement() view public returns (uint256) {
        return sectorReward * lockPeriod;
    }
    
    function hasVerifyRole(address addr_) view public override returns (bool) {
        return hasRole(VERIFY_ROLE, addr_);
    }
}
