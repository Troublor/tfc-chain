import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ISector } from "../ISector";
export declare class ISector__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): ISector;
}
