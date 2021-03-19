pragma solidity >=0.4.16 <0.9.0;

import "./interfaces.sol";
import "./RNode.sol";
import "./FNode.sol";

contract TurboFil {

    struct Mobile {
        string id;
        string phoneNumber;
    }

    struct Account {
        address addr;
        address recommender;
        Mobile[] mobiles;
        RNode[] rnodes;
        FNode[] fnodes;
    }

    mapping(address => Account) accounts; // a mapping from account address to its info struct

    event Register(address owner, string mobileId, string rnodeId, string fnodeId, address recommender);

    constructor(){

    }

    function register(string mobileId, string rnodeId, string[] fnodeIdList, address recommender) public {
        Account acc;
        acc.addr = msg.sender;
        acc.recommender = recommender;
        if (mobileId != "") {
            acc.mobiles.push(mobileId);
        }
        if (rnodeId != "") {
            RNode rnode = new RNode(rnodeId);
            acc.rnodes.push(rnode);
            for (uint i = 0; i < fnodeIdList.length; i++) {// TODO might have integer overflow vulnerability
                string fnodeId = fnodeIdList[i];
                if (fnodeId != "") {
                    RNode fnode = new RNode(rnode, fnodeId);
                    acc.fnodes.push(fnode);
                }
            }
        }
        accounts[acc.addr] = acc;
    }

    function distributeRewards() public {

    }
}
