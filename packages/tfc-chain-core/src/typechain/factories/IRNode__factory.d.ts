import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IRNode } from "../IRNode";
export declare class IRNode__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): IRNode;
}
