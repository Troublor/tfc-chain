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
    name: "VerificationResult",
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
    name: "dead",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
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
    inputs: [],
    name: "punish",
    outputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
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
        internalType: "contract Verification",
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
  "0x608060405260405161090e38038061090e83398101604081905261002291610094565b60098054336001600160a01b031991821617909155600780549091166001600160a01b038516179055600880547fffffffff0000000000000000000000000000000000000000000000000000000016602084901c179055600061008582346100ea565b60055550600655506101239050565b6000806000606084860312156100a8578283fd5b83516001600160a01b03811681146100be578384fd5b602085015190935063ffffffff19811681146100d8578283fd5b80925050604084015190509250925092565b60008261011e577f4e487b710000000000000000000000000000000000000000000000000000000081526012600452602481fd5b500490565b6107dc806101326000396000f3fe6080604052600436106100965760003560e01c80634ffe2a8b116100695780638da5cb5b1161004e5780638da5cb5b14610191578063971f8bb1146101b1578063bdc63c84146101d157610096565b80634ffe2a8b1461014e578063826d3dec1461016e57610096565b80630e9af4c91461009b5780630ff49f26146100b05780632e53c5b0146100e557806336cf7c871461011d575b600080fd5b6100ae6100a93660046106b2565b6101e6565b005b3480156100bc57600080fd5b506008546100ca9060201b81565b60405163ffffffff1990911681526020015b60405180910390f35b3480156100f157600080fd5b50600954610105906001600160a01b031681565b6040516001600160a01b0390911681526020016100dc565b34801561012957600080fd5b5060095461013e90600160a01b900460ff1681565b60405190151581526020016100dc565b34801561015a57600080fd5b50600a54610105906001600160a01b031681565b34801561017a57600080fd5b50610183610320565b6040519081526020016100dc565b34801561019d57600080fd5b50600754610105906001600160a01b031681565b3480156101bd57600080fd5b506100ae6101cc366004610684565b610457565b3480156101dd57600080fd5b50610183610511565b600a546001600160a01b0316331461026b5760405162461bcd60e51b815260206004820152603260248201527f536563746f723a2063616e206f6e6c792062652063616c6c656420627920636f60448201527f727265637420766572696669636174696f6e000000000000000000000000000060648201526084015b60405180910390fd5b60008082156102865734915061028082610535565b506102ca565b61028e610320565b6009546040519192506001600160a01b0316903480156108fc02916000818181858888f193505050501580156102c8573d6000803e3d6000fd5b505b6040805163ffffffff19861681528415156020820152908101839052606081018290527f194223085d96876503fca1fe649fa0ed49ad5c5a9f80c7826f35e94caf9923dd9060800160405180910390a150505050565b6009546000906001600160a01b03163314806103465750600a546001600160a01b031633145b6103b85760405162461bcd60e51b815260206004820152603060248201527f536563746f723a2063616c6c657220646f6573206e6f7420686176652070726960448201527f76696c65676520746f2070756e697368000000000000000000000000000000006064820152608401610262565b6006546005546103c8919061070f565b6103d290826106f7565b6003549091506103e290826106f7565b90508015610426576009546040516001600160a01b039091169082156108fc029083906000818181858888f19350505050158015610424573d6000803e3d6000fd5b505b600980547fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff16600160a01b17905590565b6009546001600160a01b031633146104d75760405162461bcd60e51b815260206004820152602660248201527f536563746f723a2063616e206f6e6c792062652063616c6c656420627920547560448201527f72626f46696c00000000000000000000000000000000000000000000000000006064820152608401610262565b600a80547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0392909216919091179055565b6006546005546000916105239161070f565b60035461053091906106f7565b905090565b6006546000901561057a5760055461054d90826106f7565b60068054919250600061055f83610745565b9091555050600480549060006105748361075c565b91905055505b60025460015483916000918291610590916106f7565b81526020019081526020016000208190555081600060030160008282546105b791906106f7565b909155505060045460025410156105e9576001600060020160008282546105de91906106f7565b9091555061063d9050565b60015460009081526020819052604090205461060590826106f7565b905060016000600101600082825461061d91906106f7565b90915550506003805482919060009061063790849061072e565b90915550505b801561067f576007546040516001600160a01b039091169082156108fc029083906000818181858888f1935050505015801561067d573d6000803e3d6000fd5b505b919050565b600060208284031215610695578081fd5b81356001600160a01b03811681146106ab578182fd5b9392505050565b600080604083850312156106c4578081fd5b823563ffffffff19811681146106d8578182fd5b9150602083013580151581146106ec578182fd5b809150509250929050565b6000821982111561070a5761070a610777565b500190565b600081600019048311821515161561072957610729610777565b500290565b60008282101561074057610740610777565b500390565b60008161075457610754610777565b506000190190565b600060001982141561077057610770610777565b5060010190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fdfea2646970667358221220873961d2311ada93315524aed9260ad0c40ea46f854a5bc740c67b3a4cec61bb64736f6c63430008030033";
