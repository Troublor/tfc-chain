import { Provider } from '@ethersproject/providers';
import * as ethers from 'ethers';
import { Contracts } from '../defines';
export declare class MockEnvironment {
    readonly mnemonic: string;
    readonly provider: Provider;
    _ready: boolean;
    constructor();
    get signers(): ethers.Wallet[];
    get ready(): boolean;
    get contracts(): Contracts;
    setup(): Promise<MockEnvironment>;
}
