import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ISeed } from "../ISeed";
export declare class ISeed__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): ISeed;
}
