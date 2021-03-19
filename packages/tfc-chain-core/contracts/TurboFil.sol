pragma solidity >=0.4.16 <0.9.0;

import "./interfaces.sol";

contract TurboFil {

    struct Mobile {
        string id;
        string phoneNumber;
    }

    struct Account {
        address addr;
        Mobile[] mobiles;
        IRNode[] rnodes;
        IFNode[] fnodes;
    }

    mapping(address => Account) accounts; // a mapping from account address to its info struct

    constructor(){

    }
}
