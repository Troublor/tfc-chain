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

    /// @notice The number of blocks before which sector owner must submit proof after the verification is requested.
    uint256 public submitProofTimeout;

    /// @notice The number of blocks before which verifiers (those who has VERIFY_ROLE) must submit proof verification result after the submitProofTimeout is reached.
    uint256 public verifyProofTimeout;

    /// @notice The minimum number of verifiers (those who has VERIFY_ROLE) required to decide whether a sector proof is valid or not.
    uint256 public verifyThreshold;

    /// @notice The amount of TFC to give seed submitter as reward each time when the sector is verified.
    uint256 public seedReward;

    /// @notice The amount of TFC to give sector owner as reward each time when the sector is verified.
    uint256 public sectorReward;

    /// @notice The amount of TFC to give verifier as reward each time when the sector is verified.
    uint256 public verifyReward;

    /// @notice The number of subsequent verifications after which the sector reward is unlocked and paid to sector owners.
    uint256 public lockPeriod;

    mapping(bytes28=>Sector) sectors;
    Sector[] sectorList;
    
    mapping(bytes28=>bool) usedSeeds;

    /// @notice SectorSubmission event is emitted when a new sector is submitted.
    /// @param owner the address of the sector owner.
    /// @param afid the afid of the sector.
    /// @param sector the address of the created Sector contract.
    event SectorSubmission(address owner, bytes28 afid, address sector);

    /// @notice VerificationTask event is emitted when a seed is submitted and a sector is selected to verify.
    /// @param sector_afid the afid of the sector.
    /// @param seed the afid of the seed.
    /// @param verification the address of the created verification contract.
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

    /// @notice Submit sector (afid) and specify its owner.
    /// @notice Deposit must be paid when calling this function.
    /// @dev This function allows delegate submission which means
    ///      someone who has SECTOR_ROLE can submit sector on behalf of
    ///      someone else, specifying the sector owner in the argument.
    /// @param owner_ address of the sector owner
    /// @param afid_ afid of the sector
    function submitSector(address payable owner_, bytes28 afid_) payable external {
        //TODO sector no repeat
        require(hasRole(SECTOR_ROLE, msg.sender), "TurboFil: caller does not have privilege to submit sector");
        require(msg.value >= sectorReward * lockPeriod, "TurboFil: not enough deposit");
        Sector sector = new Sector{value:msg.value}(owner_, afid_, lockPeriod);
        sectors[afid_] = sector;
        sectorList.push(sector);
        emit SectorSubmission(owner_, afid_, address(sector));
    }

    /// @notice Submit seed (its afid)
    /// @dev This function select the sector to verify based on the seed afid and timestamp.
    /// @dev If a sector is currently under verification, we skip it and select the next sector.
    /// @dev A Verification contract will be created to perform the verification logic for the selected sector.
    /// @param seed_ the afid of the seed
    function submitSeed(bytes28 seed_) public {
        require(hasRole(SEED_ROLE, msg.sender), "TurboFil: caller does not have privilege to submit seed");
        require(!seedUsed(seed_), "TurboFil: seed already used");
        require(sectorList.length > 0, "TurboFil: no available sectors");
        usedSeeds[seed_] = true;

        // We try to find a sector that is ready to verify (i.e., no on-going verification and not punished)
        uint256 originalIndex = uint224(seed_) * block.timestamp % sectorList.length;
        uint256 index = originalIndex;
        while(!_sectorAtIndexReady(index)) {
            index = (index + 1) % sectorList.length;
            if (originalIndex >= sectorList.length || index == originalIndex) {
                revert("TurboFil: no available sectors");
            }
        }
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
    
    // @dev Check if the sector is ready for a new verification.
    // @dev If sector's verification is finished, return true;
    // @dev If sector's verification does not get proof from sector owner but timeout, then punish, delete from sectorList and return true;
    // @dev If sector's verification does not get enough verifiers but timeout, return true;
    // @dev If sector's verification is still on-going, return false;
    function _sectorAtIndexReady(uint256 sectorIndex_) internal returns (bool) {
        Sector sector = sectorList[sectorIndex_];
        if (sector.dead()) {
            _deleteSectorAtIndex(sectorIndex_);
            return true;
        }else if (address(sector.verification()) == address(0)){
            return true;
        }else if (sector.verification().abandoned()){
            sector.punish();
            _deleteSectorAtIndex(sectorIndex_);
            return true;
        }else if (sector.verification().deadend()){
            return true;
        }else {
            return true;
        }
    }
    
    function _deleteSectorAtIndex(uint256 sectorIndex_) internal {
        Sector sector = sectorList[sectorIndex_];
        sectorList[sectorIndex_] = sectorList[sectorList.length - 1];
        sectorList.pop();
        bytes28 afid = sector.afid();
        sectors[afid] = Sector(address(0));
    }
    
    /* Maintenance functions */
    
    modifier onlyMantainer {
        require(hasRole(MAINTAIN_ROLE, msg.sender), "TurboFil: caller does not have privilege to maintain TurboFil");
        _;
    }

    /// @notice Withdraw all funds in this TurboFil contract.
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
