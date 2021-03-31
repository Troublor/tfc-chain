import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ITFCShare } from "../ITFCShare";
export declare class ITFCShare__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): ITFCShare;
}
