import {ethers} from 'ethers';

export interface Event {
    name: string,
    args: Record<string, unknown>
}

export function isEqualEvents(event0: ethers.Event | ethers.utils.LogDescription, event1: Event): boolean {
    if (!event0.args) return false;
    for (const keyIndex in Object.keys(event1.args)) {
        const key = Object.keys(event1.args)[keyIndex];
        const eventValue = event1.args[key];
        const evValue = event0.args[keyIndex];
        if (ethers.BigNumber.isBigNumber(eventValue) && ethers.BigNumber.isBigNumber(evValue)) {
            if (!eventValue.eq(evValue)) {
                return false;
            }
        } else {
            if (event1.args[key] !== event0.args[keyIndex]) {
                return false;
            }
        }
    }
    return true;
}

export function containsEvent(receipt: ethers.ContractReceipt, event: Event): boolean {
    if (!receipt.events) return false;
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