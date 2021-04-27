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
        internalType: "string",
        name: "proof",
        type: "string",
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
        internalType: "string",
        name: "proof",
        type: "string",
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
    name: "collectFunds",
    outputs: [],
    stateMutability: "nonpayable",
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
        internalType: "string",
        name: "",
        type: "string",
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
        internalType: "string",
        name: "proof_",
        type: "string",
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
  "0x60806040526040516200152338038062001523833981016040819052620000269162000160565b62000032848262000209565b6200003e8385620001ee565b6200004a9190620001ee565b341015620000b15760405162461bcd60e51b815260206004820152602a60248201527f566572696669636174696f6e3a206e6f7420656e6f7567682066756e647320666044820152696f72207265776172647360b01b606482015260840160405180910390fd5b60008054336001600160a01b0319918216179091556001805482166001600160a01b038c811691909117909155600280546001600160e01b03191660208c901c179055600380549092169089161790556004839055600582905560068190556200011c8643620001ee565b600a8190556200012e908690620001ee565b600b5550505060075550620002419350505050565b80516001600160a01b03811681146200015b57600080fd5b919050565b60008060008060008060008060006101208a8c0312156200017f578485fd5b6200018a8a62000143565b985060208a015163ffffffff1981168114620001a4578586fd5b9750620001b460408b0162000143565b965060608a0151955060808a0151945060a08a0151935060c08a0151925060e08a015191506101008a015190509295985092959850929598565b600082198211156200020457620002046200022b565b500190565b60008160001904831182151516156200022657620002266200022b565b500290565b634e487b7160e01b600052601160045260246000fd5b6112d280620002516000396000f3fe608060405234801561001057600080fd5b50600436106101825760003560e01c8063a0e45278116100d8578063b7aec7ff1161008c578063f69bce2411610066578063f69bce24146102e2578063faf924cf146102eb578063fda5ee891461030057610182565b8063b7aec7ff146102a4578063c27c2514146102ac578063d245fbe1146102cf57610182565b8063a9666725116100bd578063a966672514610286578063a9cc47181461028e578063af22c3591461029b57610182565b8063a0e4527814610271578063a7a1ed721461027957610182565b8063346b7ba21161013a5780635ddb3797116101145780635ddb37971461022d5780637d94792a1461023657806396ae8f7f1461025957610182565b8063346b7ba214610214578063551edf641461021c5780635b9806281461022557610182565b8063200d2ed21161016b578063200d2ed2146101cd5780632c2e8faf146101ec5780632e53c5b01461020157610182565b806316f81cd814610187578063177536ea146101a2575b600080fd5b61018f610313565b6040519081526020015b60405180910390f35b6001546101b5906001600160a01b031681565b6040516001600160a01b039091168152602001610199565b6008546101da9060ff1681565b60405160ff9091168152602001610199565b6101ff6101fa3660046110c8565b610386565b005b6000546101b5906001600160a01b031681565b6101da600081565b61018f60055481565b6101ff610633565b61018f60045481565b6002546102439060201b81565b60405163ffffffff199091168152602001610199565b61026161071c565b6040519015158152602001610199565b61026161072d565b600754600d541015610261565b6101da600181565b600754600e541015610261565b61018f60075481565b61018f610733565b6102616102ba36600461102c565b600c6020526000908152604090205460ff1681565b6101ff6102dd36600461106b565b6107a1565b61018f60065481565b6102f3610c0e565b6040516101999190611204565b6003546101b5906001600160a01b031681565b600854600090819060ff161561037c5760405162461bcd60e51b8152602060048201526024808201527f566572696669636174696f6e3a206e6f742061742072657175697265642073746044820152636174757360e01b60648201526084015b60405180910390fd5b600a5491505b5090565b60085460009060ff16156103e85760405162461bcd60e51b8152602060048201526024808201527f566572696669636174696f6e3a206e6f742061742072657175697265642073746044820152636174757360e01b6064820152608401610373565b600154604080517f8da5cb5b000000000000000000000000000000000000000000000000000000008152905133926001600160a01b031691638da5cb5b916004808301926020929190829003018186803b15801561044557600080fd5b505afa158015610459573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061047d919061104f565b6001600160a01b0316146104f95760405162461bcd60e51b815260206004820152602860248201527f566572696669636174696f6e3a2063616c6c6572206973206e6f74207365637460448201527f6f72206f776e65720000000000000000000000000000000000000000000000006064820152608401610373565b600a544311156105575760405162461bcd60e51b815260206004820152602360248201527f566572696669636174696f6e3a207375626d69742070726f6f6620746f6f206c60448201526261746560e81b6064820152608401610373565b61056360098484610f9c565b506008805460ff1916600190811790915554604080516307fa4f9360e11b815290517fa79c7494911eca7aec126f69f576a6e301f083512c5beb7d028f7acc5cac4506926001600160a01b031691630ff49f26916004808301926020929190829003018186803b1580156105d657600080fd5b505afa1580156105ea573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061060e91906110a3565b600254604051610626929160201b9087908790611180565b60405180910390a1505050565b600754600e541080156106495750600754600d54105b8015610666575061065861071c565b80610666575061066661072d565b6106d85760405162461bcd60e51b815260206004820152602a60248201527f566572696669636174696f6e3a206e6f7420616c6c6f77656420746f20636f6c60448201527f6c6563742066756e6473000000000000000000000000000000000000000000006064820152608401610373565b471561071a57600080546040516001600160a01b03909116914780156108fc02929091818181858888f19350505050158015610718573d6000803e3d6000fd5b505b565b6000610726610313565b4311905090565b60006107265b60085460009060019060ff1681146107995760405162461bcd60e51b8152602060048201526024808201527f566572696669636174696f6e3a206e6f742061742072657175697265642073746044820152636174757360e01b6064820152608401610373565b5050600b5490565b60085460019060ff1681146108045760405162461bcd60e51b8152602060048201526024808201527f566572696669636174696f6e3a206e6f742061742072657175697265642073746044820152636174757360e01b6064820152608401610373565b6000546040517fc3c56e660000000000000000000000000000000000000000000000000000000081523360048201526001600160a01b039091169063c3c56e669060240160206040518083038186803b15801561086057600080fd5b505afa158015610874573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108989190611087565b61090a5760405162461bcd60e51b815260206004820152603560248201527f566572696669636174696f6e3a20646f6573206e6f742068617665207072697660448201527f696c65676520746f207665726966792070726f6f6600000000000000000000006064820152608401610373565b600b544311156109685760405162461bcd60e51b815260206004820152602360248201527f566572696669636174696f6e3a207665726966792070726f6f6620746f6f206c60448201526261746560e81b6064820152608401610373565b336000908152600c602052604090205460ff16156109ee5760405162461bcd60e51b815260206004820152602960248201527f566572696669636174696f6e3a2063616c6c65722068617320616c726561647960448201527f20766572696669656400000000000000000000000000000000000000000000006064820152608401610373565b8115610a4857600d80546001810182556000919091527fd7b6990105719101dabeb77144f2a3385c8033acd3af97e9423a695e81ad1eb501805473ffffffffffffffffffffffffffffffffffffffff191633179055610a98565b600e80546001810182556000919091527fbb7b4a454dc3493923482f07822329ed19e8244eff582cc204f8554c3620c3fd01805473ffffffffffffffffffffffffffffffffffffffff1916331790555b336000908152600c6020908152604091829020805460ff191660019081179091555482516307fa4f9360e11b815292517f9a5292fbad8e26c723de97e7c518937c80e586290c02269d4a2c02943ce9c1ef936001600160a01b039290921692630ff49f269260048082019391829003018186803b158015610b1857600080fd5b505afa158015610b2c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b5091906110a3565b60025460201b610b5e610c0e565b85604051610b6f94939291906111c7565b60405180910390a1600754600d5410610bc357604051600181527f22ef6b57ff0520c18bf784aafde82545aaf4682cfe59344462f5b1cbdf6704059060200160405180910390a1610bbe610d05565b610c0a565b600754600e5410610c0a57604051600081527f22ef6b57ff0520c18bf784aafde82545aaf4682cfe59344462f5b1cbdf6704059060200160405180910390a1610c0a610e79565b5050565b60085460609060019060ff168114610c745760405162461bcd60e51b8152602060048201526024808201527f566572696669636174696f6e3a206e6f742061742072657175697265642073746044820152636174757360e01b6064820152608401610373565b60098054610c8190611217565b80601f0160208091040260200160405190810160405280929190818152602001828054610cad90611217565b8015610cfa5780601f10610ccf57610100808354040283529160200191610cfa565b820191906000526020600020905b815481529060010190602001808311610cdd57829003601f168201915b505050505091505090565b6001805460048054600254604051630e9af4c960e01b81526001600160a01b0390941694630e9af4c9949293610d569360209390931b920163ffffffff199290921682521515602082015260400190565b6000604051808303818588803b158015610d6f57600080fd5b505af1158015610d83573d6000803e3d6000fd5b50506003546005546040516001600160a01b03909216945080156108fc02935091506000818181858888f19350505050158015610dc4573d6000803e3d6000fd5b5060005b600d54811015610e3857600d8181548110610df357634e487b7160e01b600052603260045260246000fd5b60009182526020822001546006546040516001600160a01b039092169281156108fc029290818181858888f19350505050508080610e3090611252565b915050610dc8565b50471561071a57600080546040516001600160a01b03909116914780156108fc02929091818181858888f19350505050158015610718573d6000803e3d6000fd5b600154600254604051630e9af4c960e01b815260209190911b63ffffffff19166004820152600060248201526001600160a01b0390911690630e9af4c990604401600060405180830381600087803b158015610ed457600080fd5b505af1158015610ee8573d6000803e3d6000fd5b50506003546005546040516001600160a01b03909216935080156108fc029250906000818181858888f19350505050158015610f28573d6000803e3d6000fd5b5060005b600e54811015610e3857600e8181548110610f5757634e487b7160e01b600052603260045260246000fd5b60009182526020822001546006546040516001600160a01b039092169281156108fc029290818181858888f19350505050508080610f9490611252565b915050610f2c565b828054610fa890611217565b90600052602060002090601f016020900481019282610fca5760008555611010565b82601f10610fe35782800160ff19823516178555611010565b82800160010185558215611010579182015b82811115611010578235825591602001919060010190610ff5565b506103829291505b808211156103825760008155600101611018565b60006020828403121561103d578081fd5b813561104881611279565b9392505050565b600060208284031215611060578081fd5b815161104881611279565b60006020828403121561107c578081fd5b81356110488161128e565b600060208284031215611098578081fd5b81516110488161128e565b6000602082840312156110b4578081fd5b815163ffffffff1981168114611048578182fd5b600080602083850312156110da578081fd5b823567ffffffffffffffff808211156110f1578283fd5b818501915085601f830112611104578283fd5b813581811115611112578384fd5b866020828501011115611123578384fd5b60209290920196919550909350505050565b60008151808452815b8181101561115a5760208185018101518683018201520161113e565b8181111561116b5782602083870101525b50601f01601f19169290920160200192915050565b63ffffffff198581168252841660208201526060604082018190528101829052600082846080840137818301608090810191909152601f909201601f191601019392505050565b600063ffffffff198087168352808616602084015250608060408301526111f16080830185611135565b9050821515606083015295945050505050565b6000602082526110486020830184611135565b600181811c9082168061122b57607f821691505b6020821081141561124c57634e487b7160e01b600052602260045260246000fd5b50919050565b600060001982141561127257634e487b7160e01b81526011600452602481fd5b5060010190565b6001600160a01b038116811461071857600080fd5b801515811461071857600080fdfea26469706673582212205c2d8f1c444ef3d1a47bfde521ab67c9201fccecfa0c273376b8e7a921f5fd8c64736f6c63430008030033";
