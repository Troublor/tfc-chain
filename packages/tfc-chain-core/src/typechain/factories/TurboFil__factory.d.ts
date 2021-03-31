import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TurboFil } from "../TurboFil";
export declare class TurboFil__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<TurboFil>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): TurboFil;
    connect(signer: Signer): TurboFil__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): TurboFil;
}
