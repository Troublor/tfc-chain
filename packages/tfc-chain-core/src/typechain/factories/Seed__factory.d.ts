import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Seed } from "../Seed";
export declare class Seed__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(submitter_: string, afid_: string, seedSubmissionShare_: string, seedEvaluationShare_: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<Seed>;
    getDeployTransaction(submitter_: string, afid_: string, seedSubmissionShare_: string, seedEvaluationShare_: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): Seed;
    connect(signer: Signer): Seed__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): Seed;
}
