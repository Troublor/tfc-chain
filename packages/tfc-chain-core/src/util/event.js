"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.containsEvent = exports.isEqualEvents = void 0;
const ethers_1 = require("ethers");
function isEqualEvents(event0, event1) {
    if (!event0.args)
        return false;
    for (const keyIndex in Object.keys(event1.args)) {
        const key = Object.keys(event1.args)[keyIndex];
        const eventValue = event1.args[key];
        const evValue = event0.args[keyIndex];
        if (ethers_1.ethers.BigNumber.isBigNumber(eventValue) && ethers_1.ethers.BigNumber.isBigNumber(evValue)) {
            if (!eventValue.eq(evValue)) {
                return false;
            }
        }
        else {
            if (event1.args[key] !== event0.args[keyIndex]) {
                return false;
            }
        }
    }
    return true;
}
exports.isEqualEvents = isEqualEvents;
function containsEvent(receipt, event) {
    if (!receipt.events)
        return false;
    let found = false;
    for (const ev of receipt.events) {
        if (Object.keys(event.args).length !== ev.args?.length) {
            continue;
        }
        if (isEqualEvents(ev, event)) {
            found = true;
            break;
        }
    }
    return found;
}
exports.containsEvent = containsEvent;
//# sourceMappingURL=event.js.map