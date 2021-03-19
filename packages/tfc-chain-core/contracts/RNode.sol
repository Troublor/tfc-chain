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

    function submitSeed(string afid, uint256 timestamp, string sectorId, string sectorAfid, string merkleRoot) public {
        Seed seed;
        // TODO may need to check msg.sender is human
        seed.submitter = msg.sender;
        seed.afid = afid;
        seed.timestamp = timestamp;
        seed.sectorId = sectorId;
        seed.sectorAfid = sectorAfid;
        seed.merkleRoot = merkleRoot;
        for (uint i = 0; i < unrewardedSectors.length; i++) {
            if (unrewardedSectors[i].id == sectorId) {
                unrewardedSectors[i].unrewardedSeeds.push(seed);
                return;
            }
        }
        for (uint i = 0; i < rewardedSectors.length; i++) {
            if (rewardedSectors[i].id == sectorId) {
                rewardedSectors[i].unrewardedSeeds.push(seed);
            }
        }
    }

    function submitVerification(string sectorId, string seedAfid, address verifier) public {
        for (uint i = 0; i < unrewardedSectors.length; i++) {
            Sector sector = unrewardedSectors[i];
            if (sector.id == sectorId) {
                for (uint j = 0; j < sector.unrewardedSeeds.length; j ++) {
                    if (sector.unrewardedSeeds[j].afid == seedAfid) {
                        sector.unrewardedSeeds[j].unrewardedVerifiers.push(verifier);
                        return;
                    }
                }
                for (uint j = 0; j < sector.rewardedSeeds.length; j ++) {
                    if (sector.rewardedSeeds[j].afid == seedAfid) {
                        sector.rewardedSeeds[j].unrewardedVerifiers.push(verifier);
                        return;
                    }
                }
            }
        }
        for (uint i = 0; i < rewardedSectors.length; i++) {
            Sector sector = rewardedSectors[i];
            if (sector.id == sectorId) {
                for (uint j = 0; j < sector.unrewardedSeeds.length; j ++) {
                    if (sector.unrewardedSeeds[j].afid == seedAfid) {
                        sector.unrewardedSeeds[j].unrewardedVerifiers.push(verifier);
                        return;
                    }
                }
                for (uint j = 0; j < sector.rewardedSeeds.length; j ++) {
                    if (sector.rewardedSeeds[j].afid == seedAfid) {
                        sector.rewardedSeeds[j].unrewardedVerifiers.push(verifier);
                        return;
                    }
                }
            }
        }
    }
}
