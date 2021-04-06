import {ethers} from 'ethers';

export interface Event {
    name: string,
    args: Record<string, unknown>
}

export function containsEvent(receipt: ethers.ContractReceipt, event: Event): boolean {
    if (!receipt.events) return false;
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
            if (ethers.BigNumber.isBigNumber(eventValue) && ethers.BigNumber.isBigNumber(evValue)) {
                if (!eventValue.eq(evValue)) {
                    match = false;
                    break;
                }
            }else {
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