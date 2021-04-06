import { ethers } from 'ethers';
export interface Event {
    name: string;
    args: Record<string, unknown>;
}
export declare function containsEvent(receipt: ethers.ContractReceipt, event: Event): boolean;
