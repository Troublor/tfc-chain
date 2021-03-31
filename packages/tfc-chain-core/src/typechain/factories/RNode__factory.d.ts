import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { RNode } from "../RNode";
export declare class RNode__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(owner_: string, afid_: string, turboFil_: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<RNode>;
    getDeployTransaction(owner_: string, afid_: string, turboFil_: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): RNode;
    connect(signer: Signer): RNode__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): RNode;
}
