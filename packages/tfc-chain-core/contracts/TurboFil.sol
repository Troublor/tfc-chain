pragma solidity >=0.8.0 <0.9.0;

// SPDX-License-Identifier: MIT

import "./interfaces.sol";
import "./RNode.sol";
import "./FNode.sol";


contract TurboFil {
    address public vault;

    struct Mobile {
        string phoneNumber;
    }

    struct Account {
        address recommender;
        Mobile[] mobiles;
        RNode[] rnodes;
        FNode[] fnodes;
        bool registered;
    }

    mapping(string => RNode) rnodeMapping; // a mapping from rnode id to rnode contract
    mapping(string => FNode) fnodeMapping; // a mapping from fnode id to fnode contract
    mapping(address => Account) accounts; // a mapping from account address to its info struct

    event Register(address addr, address recommender);
    event RegisterMobile(address addr, string phone);
    event RegisterRNode(address addr, string id, RNode rnode);
    event RegisterFNode(address addr, string id, RNode rnode, FNode fnode);

    modifier onlyRegistered {
        require(accounts[msg.sender].registered, "TurboFil: Unregistered account");
        _;
    }

    modifier onlyUnregistered {
        require(!accounts[msg.sender].registered, "TurboFil: Already-registered account");
        _;
    }

    constructor(address _vault) {
        vault = _vault;
    }

    function register(address recommender) onlyUnregistered external {
        require(recommender == vault || accounts[recommender].registered, "TurboFil: Unregistered recommender");
        Account storage acc = accounts[msg.sender];
        acc.recommender = recommender;
        accounts[msg.sender] = acc;
        acc.registered = true;
        emit Register(msg.sender, recommender);
    }

    function registerMobile(string calldata phone) onlyRegistered external {
        Account storage acc = accounts[msg.sender];
        Mobile memory mobile = Mobile({phoneNumber : phone});
        mobile.phoneNumber = phone;
        acc.mobiles.push(mobile);
        emit RegisterMobile(msg.sender, phone);
    }

    function registerRNode(string calldata id) onlyRegistered external {
        require(address(rnodeMapping[id]) == address(0), "TurboFil: RNode is already registered");
        Account storage acc = accounts[msg.sender];
        RNode rnode = new RNode(id);
        acc.rnodes.push(rnode);
        rnodeMapping[id] = rnode;
        emit RegisterRNode(msg.sender, id, rnode);
    }

    function registerFNode(string calldata id, string calldata rnode_id) onlyRegistered external {
        registerFNode(id, rnodeMapping[rnode_id]);
    }

    function registerFNode(string calldata id, RNode rnode) onlyRegistered public {
        require(address(rnodeMapping[rnode.id()]) == address(rnode), "TurboFil: RNode is not registered");
        require(address(fnodeMapping[id]) == address(0), "TurboFil: FNode is already registered");
        Account storage acc = accounts[msg.sender];
        FNode fnode = new FNode(rnode, id);
        acc.fnodes.push(fnode);
        fnodeMapping[id] = fnode;
        emit RegisterFNode(msg.sender, id, rnode, fnode);
    }
}
