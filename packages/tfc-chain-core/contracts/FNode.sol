pragma solidity >=0.4.16 <0.9.0;

import "./interfaces.sol";

contract FNode {
    IRNode rnode;
    string id;

    constructor(address _rnode, string _id) {
        rnode = _rnode;
        id = _id;
    }
}
