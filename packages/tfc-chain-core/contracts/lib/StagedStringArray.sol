pragma solidity ^0.8.0;

// SPDX-License-Identifier: MIT

library StagedStringArray {
    
    struct Array {
        string[] committed;
        string[] proposed;
        function (string memory) internal view returns (bool) commitCondition;
    }
    
    function propose(Array storage array, string calldata payload) internal {
        array.proposed.push(payload);
    }
    
    function commit(Array storage array) internal {
        uint256 i = 0;
        while(i < array.proposed.length) {
            string memory item = array.proposed[i];
            if (array.commitCondition(item)) {
                // swap and delete the item in proposed list
                array.proposed[i] = array.proposed[array.proposed.length - 1];
                array.proposed.pop();
                // insert in committed list
                array.committed.push(item);
            }else{
                i++;
            }
        }
    }
}