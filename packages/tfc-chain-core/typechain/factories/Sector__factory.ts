/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  BytesLike,
  BigNumberish,
  Contract,
  ContractFactory,
  PayableOverrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";

import type { Sector } from "../Sector";

export class Sector__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    owner_: string,
    afid_: BytesLike,
    lockPeriod_: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<Sector> {
    return super.deploy(
      owner_,
      afid_,
      lockPeriod_,
      overrides || {}
    ) as Promise<Sector>;
  }
  getDeployTransaction(
    owner_: string,
    afid_: BytesLike,
    lockPeriod_: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      owner_,
      afid_,
      lockPeriod_,
      overrides || {}
    );
  }
  attach(address: string): Sector {
    return super.attach(address) as Sector;
  }
  connect(signer: Signer): Sector__factory {
    return super.connect(signer) as Sector__factory;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Sector {
    return new Contract(address, _abi, signerOrProvider) as Sector;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address payable",
        name: "owner_",
        type: "address",
      },
      {
        internalType: "bytes28",
        name: "afid_",
        type: "bytes28",
      },
      {
        internalType: "uint256",
        name: "lockPeriod_",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes28",
        name: "seed",
        type: "bytes28",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "result",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "reward",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "punish",
        type: "uint256",
      },
    ],
    name: "Verification",
    type: "event",
  },
  {
    inputs: [],
    name: "afid",
    outputs: [
      {
        internalType: "bytes28",
        name: "",
        type: "bytes28",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lockedTFC",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "verification_",
        type: "address",
      },
    ],
    name: "setVerification",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "turboFil",
    outputs: [
      {
        internalType: "contract ITurboFil",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "verification",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes28",
        name: "seed_",
        type: "bytes28",
      },
      {
        internalType: "bool",
        name: "result_",
        type: "bool",
      },
    ],
    name: "verificationResult",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040526040516107ad3803806107ad8339810160408190526100229161007c565b60098054336001600160a01b031991821617909155600780549091166001600160a01b038516179055600880546001600160e01b031916602084901c179055600061006d82346100d2565b60055550600655506100f29050565b600080600060608486031215610090578283fd5b83516001600160a01b03811681146100a6578384fd5b602085015190935063ffffffff19811681146100c0578283fd5b80925050604084015190509250925092565b6000826100ed57634e487b7160e01b81526012600452602481fd5b500490565b6106ac806101016000396000f3fe6080604052600436106100705760003560e01c80634ffe2a8b1161004e5780634ffe2a8b146100f75780638da5cb5b14610117578063971f8bb114610137578063bdc63c841461015757610070565b80630e9af4c9146100755780630ff49f261461008a5780632e53c5b0146100bf575b600080fd5b610088610083366004610582565b61017a565b005b34801561009657600080fd5b506008546100a49060201b81565b60405163ffffffff1990911681526020015b60405180910390f35b3480156100cb57600080fd5b506009546100df906001600160a01b031681565b6040516001600160a01b0390911681526020016100b6565b34801561010357600080fd5b50600a546100df906001600160a01b031681565b34801561012357600080fd5b506007546100df906001600160a01b031681565b34801561014357600080fd5b50610088610152366004610554565b6102b4565b34801561016357600080fd5b5061016c61036e565b6040519081526020016100b6565b600a546001600160a01b031633146101ff5760405162461bcd60e51b815260206004820152603260248201527f536563746f723a2063616e206f6e6c792062652063616c6c656420627920636f60448201527f727265637420766572696669636174696f6e000000000000000000000000000060648201526084015b60405180910390fd5b600080821561021a5734915061021482610393565b5061025e565b6102226104e2565b6009546040519192506001600160a01b0316903480156108fc02916000818181858888f1935050505015801561025c573d6000803e3d6000fd5b505b6040805163ffffffff19861681528415156020820152908101839052606081018290527f44597cff11b810d3efcb2de85f7ffc5694909f1cb95ecb95bb06a422cd047ece9060800160405180910390a150505050565b6009546001600160a01b031633146103345760405162461bcd60e51b815260206004820152602660248201527f536563746f723a2063616e206f6e6c792062652063616c6c656420627920547560448201527f72626f46696c000000000000000000000000000000000000000000000000000060648201526084016101f6565b600a80547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0392909216919091179055565b600654600554600091610380916105df565b60035461038d91906105c7565b90505b90565b600654600090156103d8576005546103ab90826105c7565b6006805491925060006103bd83610615565b9091555050600480549060006103d28361062c565b91905055505b600254600154839160009182916103ee916105c7565b815260200190815260200160002081905550816000600301600082825461041591906105c7565b909155505060045460025410156104475760016000600201600082825461043c91906105c7565b9091555061049b9050565b60015460009081526020819052604090205461046390826105c7565b905060016000600101600082825461047b91906105c7565b9091555050600380548291906000906104959084906105fe565b90915550505b80156104dd576007546040516001600160a01b039091169082156108fc029083906000818181858888f193505050501580156104db573d6000803e3d6000fd5b505b919050565b6006546005546000916104f4916105df565b6104fe90826105c7565b60035490915061050e90826105c7565b90508015610390576009546040516001600160a01b039091169082156108fc029083906000818181858888f19350505050158015610550573d6000803e3d6000fd5b5090565b600060208284031215610565578081fd5b81356001600160a01b038116811461057b578182fd5b9392505050565b60008060408385031215610594578081fd5b823563ffffffff19811681146105a8578182fd5b9150602083013580151581146105bc578182fd5b809150509250929050565b600082198211156105da576105da610647565b500190565b60008160001904831182151516156105f9576105f9610647565b500290565b60008282101561061057610610610647565b500390565b60008161062457610624610647565b506000190190565b600060001982141561064057610640610647565b5060010190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fdfea2646970667358221220be6734ffa64780038588ae283d5d1b963fe456bdc746c51b47d49efa83c565a164736f6c63430008030033";
