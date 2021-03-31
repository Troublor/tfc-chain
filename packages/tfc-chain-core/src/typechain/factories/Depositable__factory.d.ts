import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Depositable } from "../Depositable";
export declare class Depositable__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(beneficiary_: string, punishPool_: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<Depositable>;
    getDeployTransaction(beneficiary_: string, punishPool_: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): Depositable;
    connect(signer: Signer): Depositable__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): Depositable;
}
