/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, Contract, ContractFactory, PayableOverrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";

import type { Sector } from "../Sector";

export class Sector__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    submitter_: string,
    rnode_: string,
    afid_: string,
    merkleRoot_: string,
    sectorVerificationShare_: string,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<Sector> {
    return super.deploy(
      submitter_,
      rnode_,
      afid_,
      merkleRoot_,
      sectorVerificationShare_,
      overrides || {}
    ) as Promise<Sector>;
  }
  getDeployTransaction(
    submitter_: string,
    rnode_: string,
    afid_: string,
    merkleRoot_: string,
    sectorVerificationShare_: string,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      submitter_,
      rnode_,
      afid_,
      merkleRoot_,
      sectorVerificationShare_,
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
        internalType: "address",
        name: "submitter_",
        type: "address",
      },
      {
        internalType: "address",
        name: "rnode_",
        type: "address",
      },
      {
        internalType: "string",
        name: "afid_",
        type: "string",
      },
      {
        internalType: "string",
        name: "merkleRoot_",
        type: "string",
      },
      {
        internalType: "contract ITFCShare",
        name: "sectorVerificationShare_",
        type: "address",
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
        internalType: "uint256",
        name: "position",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "releaseTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "position",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Punish",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "position",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "enforcedReleaseTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "realReleaseTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Release",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "sector",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "sector_afid",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "seed_afid",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    name: "SectorVerification",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DEPOSIT_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PUNISH_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "VERIFY_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "afid",
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
    name: "beneficiary",
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
        internalType: "uint256",
        name: "index_",
        type: "uint256",
      },
    ],
    name: "deposit",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "releaseTime",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "punished",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "released",
            type: "bool",
          },
          {
            internalType: "string",
            name: "comment",
            type: "string",
          },
        ],
        internalType: "struct Depositable.Dep",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "releaseTime_",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "comment_",
        type: "string",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
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
    name: "invalid",
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
    name: "merkleRoot",
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
    name: "numDeposits",
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
    inputs: [
      {
        internalType: "uint256",
        name: "index_",
        type: "uint256",
      },
    ],
    name: "punish",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "punishPool",
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
        internalType: "uint256",
        name: "index_",
        type: "uint256",
      },
    ],
    name: "release",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "rnode",
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
        internalType: "contract ISeed",
        name: "seed_",
        type: "address",
      },
      {
        internalType: "bool",
        name: "success_",
        type: "bool",
      },
    ],
    name: "submitVerification",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "submittedTime",
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
    name: "submitter",
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
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
];

const _bytecode =
  "0x6080604052604051620022cb380380620022cb8339810160408190526200002691620005a9565b83336200003560008262000169565b600180546001600160a01b039384166001600160a01b031991821617909155600280549290931691161790556200006e60003362000169565b620000ad6200008142626ebe0062000652565b60408051808201909152600f81526e1a5b9a5d1a585b0819195c1bdcda5d608a1b602082015262000179565b8251620000c290600590602086019062000450565b50600780546001600160a01b038088166001600160a01b031992831617909255600880549287169290911691909117905581516200010890600690602085019062000450565b5042600955600a805460ff19169055600480546001600160a01b0319166001600160a01b0383161790556200015e7f2561bf26f818282a3be40719542054d2173eb0d38539e8a8d3cff22f29fd23848262000169565b505050505062000709565b620001758282620003b0565b5050565b60003411620001cf5760405162461bcd60e51b815260206004820152601e60248201527f4465706f73697461626c653a206e6f2054464320746f206465706f736974000060448201526064015b60405180910390fd5b428210156200023a5760405162461bcd60e51b815260206004820152603060248201527f4465706f73697461626c653a2052656c656173652074696d652069732062656660448201526f6f72652063757272656e742074696d6560801b6064820152608401620001c6565b6040805160a081018252348152602080820185815260009383018481526060840185815260808501878152600380546001810182559752855160049097027fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b810197885593517fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85c85015591517fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85d84018054925115156101000261ff00199215159290921661ffff199093169290921717905551805193948594909362000345937fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85e0192019062000450565b50506003547fd36a2f67d06d285786f61a32b052b9ace6b0b7abef5177b54358abdc83a0b69b91506200037b906001906200066d565b600154604080519283526001600160a01b039091166020830152810185905234606082015260800160405180910390a1505050565b6000828152602081815260408083206001600160a01b038516845290915290205460ff1662000175576000828152602081815260408083206001600160a01b03851684529091529020805460ff191660011790556200040c3390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b8280546200045e9062000687565b90600052602060002090601f016020900481019282620004825760008555620004cd565b82601f106200049d57805160ff1916838001178555620004cd565b82800160010185558215620004cd579182015b82811115620004cd578251825591602001919060010190620004b0565b50620004db929150620004df565b5090565b5b80821115620004db5760008155600101620004e0565b600082601f83011262000507578081fd5b81516001600160401b0380821115620005245762000524620006da565b604051601f8301601f19908116603f011681019082821181831017156200054f576200054f620006da565b816040528381526020925086838588010111156200056b578485fd5b8491505b838210156200058e57858201830151818301840152908201906200056f565b838211156200059f57848385830101525b9695505050505050565b600080600080600060a08688031215620005c1578081fd5b8551620005ce81620006f0565b6020870151909550620005e181620006f0565b60408701519094506001600160401b0380821115620005fe578283fd5b6200060c89838a01620004f6565b9450606088015191508082111562000622578283fd5b506200063188828901620004f6565b92505060808601516200064481620006f0565b809150509295509295909350565b60008219821115620006685762000668620006c4565b500190565b600082821015620006825762000682620006c4565b500390565b600181811c908216806200069c57607f821691505b60208210811415620006be57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b03811681146200070657600080fd5b50565b611bb280620007196000396000f3fe60806040526004361061018b5760003560e01c80635e853676116100d6578063bbd4e8c91161007f578063d41d0e5c11610059578063d41d0e5c146104a7578063d547741f146104db578063f1215d25146104fb5761018b565b8063bbd4e8c914610458578063bde9e40e1461046d578063d0161815146104875761018b565b806391d14854116100b057806391d14854146103d2578063a217fddf14610416578063b6b55f251461042b5761018b565b80635e8536761461037c5780638af0cc6e1461039c5780638dc45d9a146103b25761018b565b8063353efdcf1161013857806338af3eed1161011257806338af3eed146102f05780633ba9d5f71461032857806351e444ce1461035c5761018b565b8063353efdcf1461027c57806336568abe146102b057806337bdc99b146102d05761018b565b8063248a9ca311610169578063248a9ca3146102095780632eb4a7ab146102475780632f2ff15d1461025c5761018b565b806301ffc9a7146101905780630ff49f26146101c55780631c04cebf146101e7575b600080fd5b34801561019c57600080fd5b506101b06101ab366004611776565b61050e565b60405190151581526020015b60405180910390f35b3480156101d157600080fd5b506101da6105a7565b6040516101bc91906119e3565b3480156101f357600080fd5b5061020761020236600461172f565b610635565b005b34801561021557600080fd5b5061023961022436600461172f565b60009081526020819052604090206001015490565b6040519081526020016101bc565b34801561025357600080fd5b506101da6106ea565b34801561026857600080fd5b50610207610277366004611747565b6106f7565b34801561028857600080fd5b506102397f2561bf26f818282a3be40719542054d2173eb0d38539e8a8d3cff22f29fd238481565b3480156102bc57600080fd5b506102076102cb366004611747565b610794565b3480156102dc57600080fd5b506102076102eb36600461172f565b61081c565b3480156102fc57600080fd5b50600154610310906001600160a01b031681565b6040516001600160a01b0390911681526020016101bc565b34801561033457600080fd5b506102397fdd796a674049e64e697ba39011ca704e44dc374226c44390b929e9b04adfb99881565b34801561036857600080fd5b50600254610310906001600160a01b031681565b34801561038857600080fd5b50600854610310906001600160a01b031681565b3480156103a857600080fd5b5061023960095481565b3480156103be57600080fd5b50600754610310906001600160a01b031681565b3480156103de57600080fd5b506101b06103ed366004611747565b6000918252602082815260408084206001600160a01b0393909316845291905290205460ff1690565b34801561042257600080fd5b50610239600081565b34801561043757600080fd5b5061044b61044636600461172f565b610a8e565b6040516101bc91906119f6565b34801561046457600080fd5b50600354610239565b34801561047957600080fd5b50600a546101b09060ff1681565b34801561049357600080fd5b506102076104a23660046117bd565b610c24565b3480156104b357600080fd5b506102397fd262a1e181ec035692bcc8c920b971bccc173d5263f104f91c1561b5033679dd81565b3480156104e757600080fd5b506102076104f6366004611747565b610edc565b610207610509366004611866565b610f69565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f7965db0b0000000000000000000000000000000000000000000000000000000014806105a157507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b92915050565b600580546105b490611ae5565b80601f01602080910402602001604051908101604052809291908181526020018280546105e090611ae5565b801561062d5780601f106106025761010080835404028352916020019161062d565b820191906000526020600020905b81548152906001019060200180831161061057829003601f168201915b505050505081565b3360009081527f042d271402c8b0a2dde1f234cd713ed24839077936be3418c521578feee536b9602052604090205460ff166106de5760405162461bcd60e51b815260206004820152603560248201527f4465706f73697461626c653a2043616c6c657220646f6573206e6f742068617660448201527f652070726976696c65676520746f2070756e697368000000000000000000000060648201526084015b60405180910390fd5b6106e781611017565b50565b600680546105b490611ae5565b600082815260208190526040902060010154610714905b336103ed565b6107865760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e60448201527f2061646d696e20746f206772616e74000000000000000000000000000000000060648201526084016106d5565b6107908282611292565b5050565b6001600160a01b03811633146108125760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201527f20726f6c657320666f722073656c66000000000000000000000000000000000060648201526084016106d5565b6107908282611330565b600061082782610a8e565b905080602001514210156108a35760405162461bcd60e51b815260206004820152603060248201527f4465706f73697461626c653a2043757272656e742074696d652069732062656660448201527f6f72652072656c656173652074696d650000000000000000000000000000000060648201526084016106d5565b8060400151156108f55760405162461bcd60e51b815260206004820152601d60248201527f4465706f73697461626c653a204465706f7369742070756e697368656400000060448201526064016106d5565b8060600151156109555760405162461bcd60e51b815260206004820152602560248201527f4465706f73697461626c653a204465706f73697420616c72656164792072656c60448201526419585cd95960da1b60648201526084016106d5565b60015481516040516001600160a01b039092169181156108fc0291906000818181858888f19350505050158015610990573d6000803e3d6000fd5b506001606082015260038054829190849081106109bd57634e487b7160e01b600052603260045260246000fd5b600091825260209182902083516004909202019081558282015160018201556040830151600282018054606086015115156101000261ff00199315159390931661ffff1990911617919091179055608083015180519192610a2692600385019290910190611696565b50506001546020838101518451604080518881526001600160a01b03909516938501939093529183015242606083015260808201527f73d25490e3631d73af955b1d8767a17fedd5857ced85cd62c9edac6a55162379915060a0015b60405180910390a15050565b610ac46040518060a001604052806000815260200160008152602001600015158152602001600015158152602001606081525090565b6003548210610b155760405162461bcd60e51b815260206004820152601f60248201527f4465706f73697461626c653a20496e646578206f7574206f662072616e67650060448201526064016106d5565b60038281548110610b3657634e487b7160e01b600052603260045260246000fd5b60009182526020918290206040805160a081018252600490930290910180548352600181015493830193909352600283015460ff80821615159284019290925261010090041615156060820152600382018054919291608084019190610b9b90611ae5565b80601f0160208091040260200160405190810160405280929190818152602001828054610bc790611ae5565b8015610c145780601f10610be957610100808354040283529160200191610c14565b820191906000526020600020905b815481529060010190602001808311610bf757829003601f168201915b5050505050815250509050919050565b3360009081527f70912f16addbccb216ad6bdad396e8fdf5835d1a3528876519bbd4a04c7c193b602052604090205460ff16610cc85760405162461bcd60e51b815260206004820152603d60248201527f536563746f723a2043616c6c657220646f6573206e6f7420686176652070726960448201527f76696c65676520746f207375626d697420766572696669636174696f6e00000060648201526084016106d5565b600a5460ff1615610d415760405162461bcd60e51b815260206004820152602560248201527f536563746f723a20536563746f7220697320616c726561647920696e76616c6960448201527f646174656400000000000000000000000000000000000000000000000000000060648201526084016106d5565b816001600160a01b0316631dedc6f76040518163ffffffff1660e01b8152600401600060405180830381600087803b158015610d7c57600080fd5b505af1158015610d90573d6000803e3d6000fd5b505050508015610e1d57600480546040517f40c10f190000000000000000000000000000000000000000000000000000000081523092810192909252600160248301526001600160a01b0316906340c10f1990604401600060405180830381600087803b158015610e0057600080fd5b505af1158015610e14573d6000803e3d6000fd5b50505050610e32565b600a805460ff19166001179055610e326113af565b7fe68b65efd72273d974bdbb78eaf94ea617d40992b7112fc060ef81ed2373f9e2306005846001600160a01b0316630ff49f266040518163ffffffff1660e01b815260040160006040518083038186803b158015610e8f57600080fd5b505afa158015610ea3573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610ecb91908101906117ee565b84604051610a829493929190611911565b600082815260208190526040902060010154610ef79061070e565b6108125760405162461bcd60e51b815260206004820152603060248201527f416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e60448201527f2061646d696e20746f207265766f6b650000000000000000000000000000000060648201526084016106d5565b3360009081527f1d2212336a8094c2d6b1556a6593bc8bfe4d81ee6a63d158a870d84931aac374602052604090205460ff1661100d5760405162461bcd60e51b815260206004820152603660248201527f4465706f73697461626c653a2043616c6c657220646f6573206e6f742068617660448201527f652070726976696c65676520746f206465706f7369740000000000000000000060648201526084016106d5565b610790828261145e565b600061102282610a8e565b90508060200151421061109d5760405162461bcd60e51b815260206004820152602f60248201527f4465706f73697461626c653a2043757272656e742074696d652069732061667460448201527f65722072656c656173652074696d65000000000000000000000000000000000060648201526084016106d5565b8060400151156111155760405162461bcd60e51b815260206004820152602560248201527f4465706f73697461626c653a204465706f73697420616c72656164792070756e60448201527f697368656400000000000000000000000000000000000000000000000000000060648201526084016106d5565b8060600151156111755760405162461bcd60e51b815260206004820152602560248201527f4465706f73697461626c653a204465706f73697420616c72656164792072656c60448201526419585cd95960da1b60648201526084016106d5565b60025481516040516001600160a01b039092169181156108fc0291906000818181858888f193505050501580156111b0573d6000803e3d6000fd5b506001604082015260038054829190849081106111dd57634e487b7160e01b600052603260045260246000fd5b600091825260209182902083516004909202019081558282015160018201556040830151600282018054606086015115156101000261ff00199315159390931661ffff199091161791909117905560808301518051919261124692600385019290910190611696565b50506001548251604080518681526001600160a01b0390931660208401528201527fcedab0303a0b220beb3be6ea582ca81a5793d09876ab28ca0cf76b6d5e9acd109150606001610a82565b6000828152602081815260408083206001600160a01b038516845290915290205460ff16610790576000828152602081815260408083206001600160a01b03851684529091529020805460ff191660011790556112ec3390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6000828152602081815260408083206001600160a01b038516845290915290205460ff1615610790576000828152602081815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b60005b6003548110156106e757600381815481106113dd57634e487b7160e01b600052603260045260246000fd5b906000526020600020906004020160020160019054906101000a900460ff1615801561143e57506003818154811061142557634e487b7160e01b600052603260045260246000fd5b600091825260209091206002600490920201015460ff16155b1561144c5761144c81611017565b8061145681611b20565b9150506113b2565b600034116114ae5760405162461bcd60e51b815260206004820152601e60248201527f4465706f73697461626c653a206e6f2054464320746f206465706f736974000060448201526064016106d5565b428210156115245760405162461bcd60e51b815260206004820152603060248201527f4465706f73697461626c653a2052656c656173652074696d652069732062656660448201527f6f72652063757272656e742074696d650000000000000000000000000000000060648201526084016106d5565b6040805160a081018252348152602080820185815260009383018481526060840185815260808501878152600380546001810182559752855160049097027fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b810197885593517fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85c85015591517fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85d84018054925115156101000261ff00199215159290921661ffff199093169290921717905551805193948594909361162d937fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85e01920190611696565b50506003547fd36a2f67d06d285786f61a32b052b9ace6b0b7abef5177b54358abdc83a0b69b915061166190600190611a9e565b600154604080519283526001600160a01b039091166020830152810185905234606082015260800160405180910390a1505050565b8280546116a290611ae5565b90600052602060002090601f0160209004810192826116c4576000855561170a565b82601f106116dd57805160ff191683800117855561170a565b8280016001018555821561170a579182015b8281111561170a5782518255916020019190600101906116ef565b5061171692915061171a565b5090565b5b80821115611716576000815560010161171b565b600060208284031215611740578081fd5b5035919050565b60008060408385031215611759578081fd5b82359150602083013561176b81611b67565b809150509250929050565b600060208284031215611787578081fd5b81357fffffffff00000000000000000000000000000000000000000000000000000000811681146117b6578182fd5b9392505050565b600080604083850312156117cf578182fd5b82356117da81611b67565b91506020830135801515811461176b578182fd5b6000602082840312156117ff578081fd5b815167ffffffffffffffff811115611815578182fd5b8201601f81018413611825578182fd5b805161183861183382611a76565b611a45565b81815285602083850101111561184c578384fd5b61185d826020830160208601611ab5565b95945050505050565b60008060408385031215611878578182fd5b82359150602083013567ffffffffffffffff811115611895578182fd5b8301601f810185136118a5578182fd5b80356118b361183382611a76565b8181528660208385010111156118c7578384fd5b81602084016020830137908101602001929092525090939092509050565b600081518084526118fd816020860160208601611ab5565b601f01601f19169290920160200192915050565b60006001600160a01b0386168252602060808184015281865483600182811c91508083168061194157607f831692505b85831081141561195f57634e487b7160e01b87526022600452602487fd5b6080880183905260a0880181801561197e576001811461198f576119b9565b60ff198616825287820196506119b9565b60008d815260209020895b868110156119b35781548482015290850190890161199a565b83019750505b50505050505083810360408501526119d181876118e5565b9250505061185d606083018415159052565b6000602082526117b660208301846118e5565b6000602082528251602083015260208301516040830152604083015115156060830152606083015115156080830152608083015160a080840152611a3d60c08401826118e5565b949350505050565b604051601f8201601f1916810167ffffffffffffffff81118282101715611a6e57611a6e611b51565b604052919050565b600067ffffffffffffffff821115611a9057611a90611b51565b50601f01601f191660200190565b600082821015611ab057611ab0611b3b565b500390565b60005b83811015611ad0578181015183820152602001611ab8565b83811115611adf576000848401525b50505050565b600181811c90821680611af957607f821691505b60208210811415611b1a57634e487b7160e01b600052602260045260246000fd5b50919050565b6000600019821415611b3457611b34611b3b565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b03811681146106e757600080fdfea2646970667358221220e74dfa53dfa23d6ba878ec7532104f3f48fb81c820f52d8aded0d97cef7e9e9864736f6c63430008030033";
