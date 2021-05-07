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

import type { Verification } from "../Verification";

export class Verification__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    sector_: string,
    seed_: BytesLike,
    seedSubmitter_: string,
    submitProofTimeout_: BigNumberish,
    verifyProofTimeout_: BigNumberish,
    verifyThreshold_: BigNumberish,
    sectorReward_: BigNumberish,
    seedReward_: BigNumberish,
    verifyReward_: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<Verification> {
    return super.deploy(
      sector_,
      seed_,
      seedSubmitter_,
      submitProofTimeout_,
      verifyProofTimeout_,
      verifyThreshold_,
      sectorReward_,
      seedReward_,
      verifyReward_,
      overrides || {}
    ) as Promise<Verification>;
  }
  getDeployTransaction(
    sector_: string,
    seed_: BytesLike,
    seedSubmitter_: string,
    submitProofTimeout_: BigNumberish,
    verifyProofTimeout_: BigNumberish,
    verifyThreshold_: BigNumberish,
    sectorReward_: BigNumberish,
    seedReward_: BigNumberish,
    verifyReward_: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      sector_,
      seed_,
      seedSubmitter_,
      submitProofTimeout_,
      verifyProofTimeout_,
      verifyThreshold_,
      sectorReward_,
      seedReward_,
      verifyReward_,
      overrides || {}
    );
  }
  attach(address: string): Verification {
    return super.attach(address) as Verification;
  }
  connect(signer: Signer): Verification__factory {
    return super.connect(signer) as Verification__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Verification {
    return new Contract(address, _abi, signerOrProvider) as Verification;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address payable",
        name: "sector_",
        type: "address",
      },
      {
        internalType: "bytes28",
        name: "seed_",
        type: "bytes28",
      },
      {
        internalType: "address payable",
        name: "seedSubmitter_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "submitProofTimeout_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "verifyProofTimeout_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "verifyThreshold_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "sectorReward_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "seedReward_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "verifyReward_",
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
        name: "sector_afid",
        type: "bytes28",
      },
      {
        indexed: false,
        internalType: "bytes28",
        name: "seed",
        type: "bytes28",
      },
      {
        indexed: false,
        internalType: "bytes28",
        name: "proof",
        type: "bytes28",
      },
    ],
    name: "ProofSubmitted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes28",
        name: "sector_afid",
        type: "bytes28",
      },
      {
        indexed: false,
        internalType: "bytes28",
        name: "seed",
        type: "bytes28",
      },
      {
        indexed: false,
        internalType: "bytes28",
        name: "proof",
        type: "bytes28",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "result",
        type: "bool",
      },
    ],
    name: "ProofVerified",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bool",
        name: "result",
        type: "bool",
      },
    ],
    name: "VerifyFinish",
    type: "event",
  },
  {
    inputs: [],
    name: "STATUS_VERIFYING",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "STATUS_WAITING",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "abandoned",
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
    name: "collectFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "deadend",
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
    name: "expireSubmitProofDDL",
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
    name: "expireVerifyProofDDL",
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
    name: "fail",
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
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "hasVerified",
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
    name: "pass",
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
    name: "proof",
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
    name: "sector",
    outputs: [
      {
        internalType: "contract ISector",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "sectorReward",
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
    name: "seed",
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
    name: "seedReward",
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
    name: "seedSubmitter",
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
    name: "status",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes28",
        name: "proof_",
        type: "bytes28",
      },
    ],
    name: "submitProof",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "submitProofDDL",
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
    inputs: [
      {
        internalType: "bool",
        name: "result_",
        type: "bool",
      },
    ],
    name: "verifyProof",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "verifyProofDDL",
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
    name: "verifyReward",
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
    name: "verifyThreshold",
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
];

const _bytecode =
  "0x6080604052604051620013dc380380620013dc8339810160408190526200002691620001a5565b6200003284826200024e565b6200003e838562000233565b6200004a919062000233565b341015620000de576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f566572696669636174696f6e3a206e6f7420656e6f7567682066756e6473206660448201527f6f72207265776172647300000000000000000000000000000000000000000000606482015260840160405180910390fd5b60008054336001600160a01b0319918216179091556001805482166001600160a01b038c811691909117909155600280547fffffffff000000000000000000000000000000000000000000000000000000001660208c901c1790556003805490921690891617905560048390556005829055600681905562000161864362000233565b60098190556200017390869062000233565b600a55505050600755506200029f9350505050565b80516001600160a01b0381168114620001a057600080fd5b919050565b60008060008060008060008060006101208a8c031215620001c4578485fd5b620001cf8a62000188565b985060208a015163ffffffff1981168114620001e9578586fd5b9750620001f960408b0162000188565b965060608a0151955060808a0151945060a08a0151935060c08a0151925060e08a015191506101008a015190509295985092959850929598565b6000821982111562000249576200024962000270565b500190565b60008160001904831182151516156200026b576200026b62000270565b500290565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b61112d80620002af6000396000f3fe608060405234801561001057600080fd5b50600436106101985760003560e01c8063a7a1ed72116100e3578063c27c25141161008c578063f69bce2411610066578063f69bce2414610308578063faf924cf14610311578063fda5ee891461031957610198565b8063c27c2514146102ca578063d245fbe1146102ed578063ed32cc6d1461030057610198565b8063af22c359116100bd578063af22c359146102a6578063b5a85222146102af578063b7aec7ff146102c257610198565b8063a7a1ed7214610284578063a966672514610291578063a9cc47181461029957610198565b8063551edf64116101455780637d94792a1161011f5780637d94792a1461025157806396ae8f7f14610274578063a0e452781461027c57610198565b8063551edf64146102355780635b9806281461023e5780635ddb37971461024857610198565b8063200d2ed211610176578063200d2ed2146101fb5780632e53c5b01461021a578063346b7ba21461022d57610198565b8063047168e01461019d57806316f81cd8146101ba578063177536ea146101d0575b600080fd5b6101a561032c565b60405190151581526020015b60405180910390f35b6101c2610359565b6040519081526020016101b1565b6001546101e3906001600160a01b031681565b6040516001600160a01b0390911681526020016101b1565b6008546102089060ff1681565b60405160ff90911681526020016101b1565b6000546101e3906001600160a01b031681565b610208600081565b6101c260055481565b6102466103ca565b005b6101c260045481565b60025461025e9060201b81565b60405163ffffffff1990911681526020016101b1565b6101a56104b5565b6101a56104c6565b600754600c5410156101a5565b610208600181565b600754600d5410156101a5565b6101c260075481565b6102466102bd366004611062565b6104d0565b6101c26107ba565b6101a56102d8366004610feb565b600b6020526000908152604090205460ff1681565b6102466102fb36600461102a565b610828565b6101a5610cac565b6101c260065481565b61025e610cdc565b6003546101e3906001600160a01b031681565b60085460009060ff1615801561034557506103456104b5565b1561035257506001610356565b5060005b90565b600854600090819060ff16156103c25760405162461bcd60e51b8152602060048201526024808201527f566572696669636174696f6e3a206e6f742061742072657175697265642073746044820152636174757360e01b60648201526084015b60405180910390fd5b505060095490565b600754600d541080156103e05750600754600c54105b80156103fd57506103ef6104b5565b806103fd57506103fd6104c6565b61046f5760405162461bcd60e51b815260206004820152602a60248201527f566572696669636174696f6e3a206e6f7420616c6c6f77656420746f20636f6c60448201527f6c6563742066756e64730000000000000000000000000000000000000000000060648201526084016103b9565b3031156104b357600080546040516001600160a01b0390911691303180156108fc02929091818181858888f193505050501580156104b1573d6000803e3d6000fd5b505b565b60006104bf610359565b4311905090565b60006104bf6107ba565b60085460009060ff16156105325760405162461bcd60e51b8152602060048201526024808201527f566572696669636174696f6e3a206e6f742061742072657175697265642073746044820152636174757360e01b60648201526084016103b9565b600154604080517f8da5cb5b000000000000000000000000000000000000000000000000000000008152905133926001600160a01b031691638da5cb5b916004808301926020929190829003018186803b15801561058f57600080fd5b505afa1580156105a3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105c7919061100e565b6001600160a01b0316146106435760405162461bcd60e51b815260206004820152602860248201527f566572696669636174696f6e3a2063616c6c6572206973206e6f74207365637460448201527f6f72206f776e657200000000000000000000000000000000000000000000000060648201526084016103b9565b6009544311156106a15760405162461bcd60e51b815260206004820152602360248201527f566572696669636174696f6e3a207375626d69742070726f6f6620746f6f206c60448201526261746560e81b60648201526084016103b9565b6008805460017fffffff0000000000000000000000000000000000000000000000000000000000909116610100602086811c9190910260ff191691909117821790925554604080516307fa4f9360e11b815290517f6d8409d5130d9982d8d4e6f32b95a9073d7f0e7aef72c00487f1507483a270ae936001600160a01b0390931692630ff49f269260048082019391829003018186803b15801561074457600080fd5b505afa158015610758573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061077c919061107e565b6002546040516107ae929160201b90869063ffffffff1993841681529183166020830152909116604082015260600190565b60405180910390a15050565b60085460009060019060ff1681146108205760405162461bcd60e51b8152602060048201526024808201527f566572696669636174696f6e3a206e6f742061742072657175697265642073746044820152636174757360e01b60648201526084016103b9565b5050600a5490565b60085460019060ff16811461088b5760405162461bcd60e51b8152602060048201526024808201527f566572696669636174696f6e3a206e6f742061742072657175697265642073746044820152636174757360e01b60648201526084016103b9565b6000546040517fc3c56e660000000000000000000000000000000000000000000000000000000081523360048201526001600160a01b039091169063c3c56e669060240160206040518083038186803b1580156108e757600080fd5b505afa1580156108fb573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061091f9190611046565b6109915760405162461bcd60e51b815260206004820152603560248201527f566572696669636174696f6e3a20646f6573206e6f742068617665207072697660448201527f696c65676520746f207665726966792070726f6f66000000000000000000000060648201526084016103b9565b600a544311156109ef5760405162461bcd60e51b815260206004820152602360248201527f566572696669636174696f6e3a207665726966792070726f6f6620746f6f206c60448201526261746560e81b60648201526084016103b9565b336000908152600b602052604090205460ff1615610a755760405162461bcd60e51b815260206004820152602960248201527f566572696669636174696f6e3a2063616c6c65722068617320616c726561647960448201527f207665726966696564000000000000000000000000000000000000000000000060648201526084016103b9565b8115610acf57600c80546001810182556000919091527fdf6966c971051c3d54ec59162606531493a51404a002842f56009d7e5cf4a8c701805473ffffffffffffffffffffffffffffffffffffffff191633179055610b1f565b600d80546001810182556000919091527fd7b6990105719101dabeb77144f2a3385c8033acd3af97e9423a695e81ad1eb501805473ffffffffffffffffffffffffffffffffffffffff1916331790555b336000908152600b6020908152604091829020805460ff191660019081179091555482516307fa4f9360e11b815292517f34f93b456c3ffdb7064f4ce11127d2f8d8cb5d8a040b8afbdc223656648f56ef936001600160a01b039290921692630ff49f269260048082019391829003018186803b158015610b9f57600080fd5b505afa158015610bb3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bd7919061107e565b60025460201b610be5610cdc565b6040805163ffffffff1994851681529284166020840152921681830152841515606082015290519081900360800190a1600754600c5410610c6157604051600181527f22ef6b57ff0520c18bf784aafde82545aaf4682cfe59344462f5b1cbdf6704059060200160405180910390a1610c5c610d52565b610ca8565b600754600d5410610ca857604051600081527f22ef6b57ff0520c18bf784aafde82545aaf4682cfe59344462f5b1cbdf6704059060200160405180910390a1610ca8610ec8565b5050565b60085460009060ff166001148015610cc75750610cc76104c6565b15610cd457506000610356565b506001610356565b60085460009060019060ff168114610d425760405162461bcd60e51b8152602060048201526024808201527f566572696669636174696f6e3a206e6f742061742072657175697265642073746044820152636174757360e01b60648201526084016103b9565b5050600854610100900460201b90565b6001805460048054600254604051630e9af4c960e01b81526001600160a01b0390941694630e9af4c9949293610da39360209390931b920163ffffffff199290921682521515602082015260400190565b6000604051808303818588803b158015610dbc57600080fd5b505af1158015610dd0573d6000803e3d6000fd5b50506003546005546040516001600160a01b03909216945080156108fc02935091506000818181858888f19350505050158015610e11573d6000803e3d6000fd5b5060005b600c54811015610e8557600c8181548110610e4057634e487b7160e01b600052603260045260246000fd5b60009182526020822001546006546040516001600160a01b039092169281156108fc029290818181858888f19350505050508080610e7d9061109a565b915050610e15565b503031156104b357600080546040516001600160a01b0390911691303180156108fc02929091818181858888f193505050501580156104b1573d6000803e3d6000fd5b600154600254604051630e9af4c960e01b815260209190911b63ffffffff19166004820152600060248201526001600160a01b0390911690630e9af4c990604401600060405180830381600087803b158015610f2357600080fd5b505af1158015610f37573d6000803e3d6000fd5b50506003546005546040516001600160a01b03909216935080156108fc029250906000818181858888f19350505050158015610f77573d6000803e3d6000fd5b5060005b600d54811015610e8557600d8181548110610fa657634e487b7160e01b600052603260045260246000fd5b60009182526020822001546006546040516001600160a01b039092169281156108fc029290818181858888f19350505050508080610fe39061109a565b915050610f7b565b600060208284031215610ffc578081fd5b8135611007816110c1565b9392505050565b60006020828403121561101f578081fd5b8151611007816110c1565b60006020828403121561103b578081fd5b8135611007816110d6565b600060208284031215611057578081fd5b8151611007816110d6565b600060208284031215611073578081fd5b8135611007816110e4565b60006020828403121561108f578081fd5b8151611007816110e4565b60006000198214156110ba57634e487b7160e01b81526011600452602481fd5b5060010190565b6001600160a01b03811681146104b157600080fd5b80151581146104b157600080fd5b63ffffffff19811681146104b157600080fdfea2646970667358221220f7f23979daf4855b8ec2baf5e6e2b55831339c6c7683338bda3e85e04bfccad364736f6c63430008030033";
