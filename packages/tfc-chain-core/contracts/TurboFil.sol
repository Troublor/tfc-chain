pragma solidity >=0.8.0 <0.9.0;

// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/AccessControl.sol";

import "./interfaces.sol";
import "./RNode.sol";
import "./FNode.sol";


contract TurboFil is AccessControl {
    bytes32 public constant REGISTER_ROLE = keccak256("REGISTER_ROLE");

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

    mapping(string => address) public mobileMapping;
    mapping(string => RNode) public rnodeMapping; // a mapping from rnode id to rnode contract
    mapping(string => FNode) public fnodeMapping; // a mapping from fnode id to fnode contract
    mapping(address => Account) public  accounts; // a mapping from account address to its info struct

    event Register(address addr, address recommender);
    event RegisterMobile(address addr, string phone);
    event RegisterRNode(address addr, string id, RNode rnode);
    event RegisterFNode(address addr, string id, RNode rnode, FNode fnode);

    modifier onlyRegistered(address addr) {
        require(accounts[addr].registered, "TurboFil: Unregistered account");
        _;
    }

    modifier onlyUnregistered(address addr) {
        require(!accounts[addr].registered, "TurboFil: Already-registered account");
        _;
    }

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function register(address recommender) onlyUnregistered(msg.sender) external {
        require(recommender == address(this) || accounts[recommender].registered, "TurboFil: Unregistered recommender");
        Account storage acc = accounts[msg.sender];
        acc.recommender = recommender;
        accounts[msg.sender] = acc;
        acc.registered = true;
        emit Register(msg.sender, recommender);
    }

    function registerMobile(string calldata phone) onlyRegistered(msg.sender) external {
        require(mobileMapping[phone] == address(0), "TurboFil: Mobile is already registered");
        Account storage acc = accounts[msg.sender];
        Mobile memory mobile = Mobile({phoneNumber : phone});
        mobile.phoneNumber = phone;
        acc.mobiles.push(mobile);
        mobileMapping[phone] = msg.sender;
        emit RegisterMobile(msg.sender, phone);
    }

    function registerRNode(string calldata id, address bind_address) onlyRegistered(bind_address) external {
        require(hasRole(REGISTER_ROLE, msg.sender), "TurboFil: Caller does not have privilege to register RNode");
        require(address(rnodeMapping[id]) == address(0), "TurboFil: RNode is already registered");
        Account storage acc = accounts[bind_address];
        RNode rnode = new RNode(id);
        acc.rnodes.push(rnode);
        rnodeMapping[id] = rnode;
        emit RegisterRNode(bind_address, id, rnode);
    }

    function registerFNode(string calldata id, string calldata rnode_id, address bind_address) onlyRegistered(bind_address) external {
        require(address(rnodeMapping[rnode_id]) != address(0), "TurboFil: RNode is not registered");
        registerFNode(id, rnodeMapping[rnode_id], bind_address);
    }

    function registerFNode(string calldata id, RNode rnode, address bind_address) onlyRegistered(bind_address) public {
        require(hasRole(REGISTER_ROLE, msg.sender), "TurboFil: Caller does not have privilege to register FNode");
        require(address(rnodeMapping[rnode.id()]) == address(rnode), "TurboFil: RNode is not registered");
        require(address(fnodeMapping[id]) == address(0), "TurboFil: FNode is already registered");
        Account storage acc = accounts[bind_address];
        FNode fnode = new FNode(rnode, id);
        acc.fnodes.push(fnode);
        fnodeMapping[id] = fnode;
        emit RegisterFNode(bind_address, id, rnode, fnode);
    }
}
