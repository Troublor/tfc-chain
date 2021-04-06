"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.containsEvent = void 0;
const ethers_1 = require("ethers");
function containsEvent(receipt, event) {
    if (!receipt.events)
        return false;
    let found = false;
    for (const ev of receipt.events) {
        if (Object.keys(event.args).length !== ev.args?.length) {
            continue;
        }
        let match = true;
        for (const keyIndex in Object.keys(event.args)) {
            const key = Object.keys(event.args)[keyIndex];
            const eventValue = event.args[key];
            const evValue = ev.args[keyIndex];
            if (ethers_1.ethers.BigNumber.isBigNumber(eventValue) && ethers_1.ethers.BigNumber.isBigNumber(evValue)) {
                if (!eventValue.eq(evValue)) {
                    match = false;
                    break;
                }
            }
            else {
                if (event.args[key] !== ev.args[keyIndex]) {
                    match = false;
                    break;
                }
            }
        }
        if (match) {
            found = true;
            break;
        }
    }
    return found;
}
exports.containsEvent = containsEvent;
//# sourceMappingURL=event.js.map