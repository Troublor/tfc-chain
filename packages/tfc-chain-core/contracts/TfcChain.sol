pragma solidity >=0.4.16 <0.9.0;

contract TfcChain {

    struct AccountInfo {
        string phone; // phone number of mobile account
        string recommender; // the address of the account who recommends tfc to this account
        string[] fnids; // a list of FNode id (one account can have multiple FNodes)
        string rnid; // RNode id
    }

    struct RNode {
        string id;
        FNode[] fnodes; // a list of fnodes
    }

    struct FNode {
        Sector[] sectors;
    }

    struct Sector {
        address submitter; // the account that mines this sector
        string id; // the id of this sector
        string afid; // the afid of this sector
        string merkleRoot; // the merkle root of this sector
        Seed[] seeds;
    }

    struct Seed {
        address submitter; // the account who takes this photo as seed
        address[] verifiers; // the list of accounts who have verified the seed
        string afid; // afid of this photo
        uint timestamp; // timestamp of this photo
        address rnode; // the account who generate the sector corresponding to this seed
        string sectorId; // the id of the sector
        string sectorAfid; // the afid of the sector
        string merkleRoot; // the merkle root of the sector
    }

    mapping(address => AccountInfo) accounts; // a mapping from account address to its info struct

    constructor(){

    }
}
