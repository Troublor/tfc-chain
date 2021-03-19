pragma solidity >=0.4.16 <0.9.0;

import "./interfaces.sol";

contract RNode {
    string id;
    IFNode[] fnodes; // a list of fnodes
}
