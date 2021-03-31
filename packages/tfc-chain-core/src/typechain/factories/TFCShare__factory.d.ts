import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TFCShare } from "../TFCShare";
export declare class TFCShare__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_group: string, turboFil_: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<TFCShare>;
    getDeployTransaction(_group: string, turboFil_: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): TFCShare;
    connect(signer: Signer): TFCShare__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): TFCShare;
}
