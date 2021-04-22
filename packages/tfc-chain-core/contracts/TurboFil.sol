pragma solidity >=0.8.0 <0.9.0;

// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/AccessControl.sol";

import "./Sector.sol";

contract TurboFil is AccessControl {
    // Roles
    bytes32 public constant SECTOR_ROLE = keccak256("SECTOR_ROLE"); // the role who can submit sector.
    bytes32 public constant VERIFY_ROLE = keccak256("VERIFY_ROLE"); // the role who can submit sector verify result.
    bytes32 public constant SEED_ROLE = keccak256("SEED_ROLE"); // the role who can submit seed.
    bytes32 public constant MAINTAIN_ROLE = keccak256("MAINTAIN_ROLE"); // the role who can do maintenance.
    
    uint256 public rewardUnit;
    uint256 public lockPeriod;

    mapping(bytes28=>Sector) sectors;
    Sector[] sectorList;
    mapping(bytes28=>bool) usedSeeds;

    event SectorSubmission(address owner, bytes28 afid, address sector);
    event SeedSectorVerify(bytes28 seed, bytes28 sector_afid);

    constructor(uint256 rewardUnit_, uint256 lockPeriod_) payable {
        // Grant the minter role to a specified account
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        
        rewardUnit = rewardUnit_;
        lockPeriod = lockPeriod_;
    }
    
    /* Core functions */

    function submitSector(address payable owner_, bytes28 afid_) payable external {
        require(hasRole(SECTOR_ROLE, msg.sender), "TurboFil: caller does not have privilege to submit sector");
        require(msg.value >= rewardUnit * lockPeriod, "TurboFil: not enough deposit");
        Sector sector = new Sector{value:msg.value}(owner_, afid_, lockPeriod);
        sectors[afid_] = sector;
        sectorList.push(sector);
        emit SectorSubmission(owner_, afid_, address(sector));
    }

    function submitSeed(bytes28 seed_) public {
        require(hasRole(SEED_ROLE, msg.sender), "TurboFil: caller does not have privilege to submit seed");
        require(usedSeeds[seed_] == false, "TurboFil: seed already used");
        uint256 index = uint224(seed_) * block.timestamp % sectorList.length;
        Sector sector = sectorList[index];
        // notify off-chain monitor that a verification should be performed.
        emit SeedSectorVerify(seed_, sector.afid());
    }
    
    function sectorVerification_callback(bytes28 seed_, bytes28 sector_afid_, bool result_) public {
        require(hasRole(VERIFY_ROLE, msg.sender), "TurboFil: caller does not have privilege to submit verification result");
        require(usedSeeds[seed_] == false, "TurboFil: seed already used");
        require(address(sectors[sector_afid_]) != address(0), "TurboFil: sector does not exist");
        usedSeeds[seed_] = true;
        Sector sector = sectors[sector_afid_];
        sector.verify{value:rewardUnit}(seed_, result_);
    }
    
    /* Maintenance functions */

    function withdraw() external {
        require(hasRole(MAINTAIN_ROLE, msg.sender), "TurboFil: caller does not have privilege to maintain TurboFil");
        payable(msg.sender).transfer(address(this).balance);
    }
    
    function setReward(uint256 reward_) external {
        require(hasRole(MAINTAIN_ROLE, msg.sender), "TurboFil: caller does not have privilege to maintain TurboFil");
        rewardUnit = reward_;
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
        return rewardUnit * lockPeriod;
    }
}
