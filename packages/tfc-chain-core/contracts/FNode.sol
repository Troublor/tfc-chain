pragma solidity >=0.8.0 <0.9.0;

// SPDX-License-Identifier: MIT

import "./interfaces.sol";

contract FNode {
    IRNode rnode;
    string id;

    constructor(IRNode _rnode, string memory _id) {
        rnode = _rnode;
        id = _id;
    }
}
