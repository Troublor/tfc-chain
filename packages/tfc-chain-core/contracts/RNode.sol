pragma solidity >=0.4.16 <0.9.0;

import "./interfaces.sol";

contract RNode {
    string id;
    IFNode[] fnodes; // a list of fnodes

    Sector[] rewardedSectors;
    Sector[] unrewardedSectors;

    struct Sector {
        address submitter; // the account that mines this sector
        string id; // the id of this sector
        string afid; // the afid of this sector
        string merkleRoot; // the merkle root of this sector
        Seed[] rewardedSeeds;
        Seed[] unrewardedSeeds;
    }

    struct Seed {
        address submitter; // the account who takes this photo as seed
        address[] rewardedVerifiers; // the list of accounts who have verified the seed
        address[] unrewardedVerifiers; // the list of accounts who have verified the seed
        string afid; // afid of this photo
        uint256 timestamp; // timestamp of this photo
        address rnodeOwner; // the account who generate the sector corresponding to this seed
        string sectorId; // the id of the sector
        string sectorAfid; // the afid of the sector
        string merkleRoot; // the merkle root of the sector
    }

    constructor(string _id) {
        id = _id;
    }

    function submitSector(string id, string afid, string merkleRoot) public {
        Sector sector;
        // TODO may need to check msg.sender is human
        sector.submitter = msg.sender;
        sector.id = id;
        sector.afid = afid;
        sector.merkleRoot = merkleRoot;
        unrewardedSectors.push(sector);
    }

    function submitSeed(string afid, uint256 timestamp, address rnodeOwner, string rnodeId, string sectorId, string sectorAfid, string merkleRoot) public {
        Seed seed;
        // TODO may need to check msg.sender is human
        seed.submitter = msg.sender;
        seed.afid = afid;
        seed.timestamp = timestamp;
        seed.rnodeOwner = rnodeOwner;
        seed.sectorId = sectorId;
        seed.sectorAfid = sectorAfid;
        seed.merkleRoot = merkleRoot;
    }
}
