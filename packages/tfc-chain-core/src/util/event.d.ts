import { ethers } from 'ethers';
export interface Event {
    name: string;
    args: Record<string, unknown>;
}
export declare function isEqualEvents(event0: ethers.Event | ethers.utils.LogDescription, event1: Event): boolean;
export declare function containsEvent(receipt: ethers.ContractReceipt, event: Event): boolean;
