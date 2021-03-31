import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IDepositable } from "../IDepositable";
export declare class IDepositable__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): IDepositable;
}
