import { Signer, ContractFactory, PayableOverrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Sector } from "../Sector";
export declare class Sector__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(submitter_: string, rnode_: string, afid_: string, merkleRoot_: string, sectorVerificationShare_: string, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<Sector>;
    getDeployTransaction(submitter_: string, rnode_: string, afid_: string, merkleRoot_: string, sectorVerificationShare_: string, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): Sector;
    connect(signer: Signer): Sector__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): Sector;
}
