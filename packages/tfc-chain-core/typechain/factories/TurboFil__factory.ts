/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  BigNumberish,
  Contract,
  ContractFactory,
  PayableOverrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";

import type { TurboFil } from "../TurboFil";

export class TurboFil__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    rewardUnit_: BigNumberish,
    lockPeriod_: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<TurboFil> {
    return super.deploy(
      rewardUnit_,
      lockPeriod_,
      overrides || {}
    ) as Promise<TurboFil>;
  }
  getDeployTransaction(
    rewardUnit_: BigNumberish,
    lockPeriod_: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      rewardUnit_,
      lockPeriod_,
      overrides || {}
    );
  }
  attach(address: string): TurboFil {
    return super.attach(address) as TurboFil;
  }
  connect(signer: Signer): TurboFil__factory {
    return super.connect(signer) as TurboFil__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TurboFil {
    return new Contract(address, _abi, signerOrProvider) as TurboFil;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "rewardUnit_",
        type: "uint256",
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
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes28",
        name: "afid",
        type: "bytes28",
      },
      {
        indexed: false,
        internalType: "address",
        name: "sector",
        type: "address",
      },
    ],
    name: "SectorSubmission",
    type: "event",
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
        internalType: "bytes28",
        name: "sector_afid",
        type: "bytes28",
      },
    ],
    name: "SeedSectorVerify",
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
    name: "MAINTAIN_ROLE",
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
    name: "SECTOR_ROLE",
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
    name: "SEED_ROLE",
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
    name: "depositRequirement",
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
    name: "lockPeriod",
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
    name: "rewardUnit",
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
    name: "sectorAtIndex",
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
        internalType: "bytes28",
        name: "sector_afid_",
        type: "bytes28",
      },
      {
        internalType: "bool",
        name: "result_",
        type: "bool",
      },
    ],
    name: "sectorVerification_callback",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes28",
        name: "afid_",
        type: "bytes28",
      },
    ],
    name: "sectorWithAfid",
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
    ],
    name: "seedUsed",
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
        internalType: "uint256",
        name: "lockPeriod_",
        type: "uint256",
      },
    ],
    name: "setLockPeriod",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "reward_",
        type: "uint256",
      },
    ],
    name: "setReward",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
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
    ],
    name: "submitSector",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes28",
        name: "seed_",
        type: "bytes28",
      },
    ],
    name: "submitSeed",
    outputs: [],
    stateMutability: "nonpayable",
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
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x6080604052604051611ba1380380611ba1833981016040819052610022916100e7565b61002d60003361003b565b60019190915560025561010a565b6100458282610049565b5050565b6000828152602081815260408083206001600160a01b038516845290915290205460ff16610045576000828152602081815260408083206001600160a01b03851684529091529020805460ff191660011790556100a33390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b600080604083850312156100f9578182fd5b505080516020909101519092909150565b611a88806101196000396000f3fe6080604052600436106101845760003560e01c8063428967da116100d657806391d148541161007f578063d41d0e5c11610059578063d41d0e5c146104af578063d547741f146104e3578063e23823c9146105035761018b565b806391d1485414610443578063a217fddf14610487578063b25d8cee1461049c5761018b565b806371c7c90c116100b057806371c7c90c146103ee578063779972da1461040e5780638bbcf85f1461042e5761018b565b8063428967da1461036d5780635c488da61461038357806360eb9549146103b75761018b565b8063293be456116101385780633a8c266a116101125780633a8c266a146102ed5780633ccfd60b146103425780633fd8b02f146103575761018b565b8063293be4561461028d5780632f2ff15d146102ad57806336568abe146102cd5761018b565b806304060c581161016957806304060c5814610207578063066b57ef14610229578063248a9ca31461025d5761018b565b806301ffc9a7146101905780630217516a146101c55761018b565b3661018b57005b600080fd5b34801561019c57600080fd5b506101b06101ab3660046112bb565b610523565b60405190151581526020015b60405180910390f35b3480156101d157600080fd5b506101f97ffc07948174d5b432cfe29332fd123b17c444c9f18f139c322a618ec51a67a47581565b6040519081526020016101bc565b34801561021357600080fd5b50610227610222366004611231565b6105bc565b005b34801561023557600080fd5b506101f97f27878d6fd2352e8c530d873016f67bb748d79859c781b7c2453cc2caffa896ff81565b34801561026957600080fd5b506101f961027836600461127f565b60009081526020819052604090206001015490565b34801561029957600080fd5b506102276102a836600461127f565b61081c565b3480156102b957600080fd5b506102276102c8366004611297565b6108c5565b3480156102d957600080fd5b506102276102e8366004611297565b610962565b3480156102f957600080fd5b5061032a6103083660046111f2565b63ffffffff19166000908152600360205260409020546001600160a01b031690565b6040516001600160a01b0390911681526020016101bc565b34801561034e57600080fd5b506102276109ea565b34801561036357600080fd5b506101f960025481565b34801561037957600080fd5b506101f960015481565b34801561038f57600080fd5b506101f97fc92661711815e9b609b0f92f233af70537e889630fb3ca91ccc85ac8f98c784f81565b3480156103c357600080fd5b506101b06103d23660046111f2565b63ffffffff191660009081526005602052604090205460ff1690565b3480156103fa57600080fd5b506102276104093660046111f2565b610abd565b34801561041a57600080fd5b5061022761042936600461127f565b610ce5565b34801561043a57600080fd5b506101f9610d8e565b34801561044f57600080fd5b506101b061045e366004611297565b6000918252602082815260408084206001600160a01b0393909316845291905290205460ff1690565b34801561049357600080fd5b506101f9600081565b6102276104aa3660046111ba565b610da5565b3480156104bb57600080fd5b506101f97fd262a1e181ec035692bcc8c920b971bccc173d5263f104f91c1561b5033679dd81565b3480156104ef57600080fd5b506102276104fe366004611297565b610fc5565b34801561050f57600080fd5b5061032a61051e36600461127f565b611052565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f7965db0b0000000000000000000000000000000000000000000000000000000014806105b657507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b92915050565b3360009081527f70912f16addbccb216ad6bdad396e8fdf5835d1a3528876519bbd4a04c7c193b602052604090205460ff1661068b5760405162461bcd60e51b815260206004820152604660248201527f547572626f46696c3a2063616c6c657220646f6573206e6f742068617665207060448201527f726976696c65676520746f207375626d697420766572696669636174696f6e2060648201527f726573756c740000000000000000000000000000000000000000000000000000608482015260a4015b60405180910390fd5b63ffffffff19831660009081526005602052604090205460ff16156106f25760405162461bcd60e51b815260206004820152601b60248201527f547572626f46696c3a207365656420616c7265616479207573656400000000006044820152606401610682565b63ffffffff1982166000908152600360205260409020546001600160a01b031661075e5760405162461bcd60e51b815260206004820152601f60248201527f547572626f46696c3a20736563746f7220646f6573206e6f74206578697374006044820152606401610682565b63ffffffff198381166000818152600560209081526040808320805460ff19166001908117909155948716835260039091529081902054925490517f83a9e784000000000000000000000000000000000000000000000000000000008152600481019290925283151560248301526001600160a01b039092169182916383a9e78491906044016000604051808303818588803b1580156107fd57600080fd5b505af1158015610811573d6000803e3d6000fd5b505050505050505050565b3360009081527fae0e3e90079b140685ffe82811e4f12bdad5cad554501b8278d0f5a224706b6d602052604090205460ff166108c05760405162461bcd60e51b815260206004820152603d60248201527f547572626f46696c3a2063616c6c657220646f6573206e6f742068617665207060448201527f726976696c65676520746f206d61696e7461696e20547572626f46696c0000006064820152608401610682565b600155565b6000828152602081905260409020600101546108e2905b3361045e565b6109545760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e60448201527f2061646d696e20746f206772616e7400000000000000000000000000000000006064820152608401610682565b61095e8282611090565b5050565b6001600160a01b03811633146109e05760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201527f20726f6c657320666f722073656c6600000000000000000000000000000000006064820152608401610682565b61095e828261112e565b3360009081527fae0e3e90079b140685ffe82811e4f12bdad5cad554501b8278d0f5a224706b6d602052604090205460ff16610a8e5760405162461bcd60e51b815260206004820152603d60248201527f547572626f46696c3a2063616c6c657220646f6573206e6f742068617665207060448201527f726976696c65676520746f206d61696e7461696e20547572626f46696c0000006064820152608401610682565b60405133904780156108fc02916000818181858888f19350505050158015610aba573d6000803e3d6000fd5b50565b3360009081527fceb024648002b7aa8bf572054d62dd3bc301b27fee40c0676cfe5d7af457c179602052604090205460ff16610b615760405162461bcd60e51b815260206004820152603760248201527f547572626f46696c3a2063616c6c657220646f6573206e6f742068617665207060448201527f726976696c65676520746f207375626d697420736565640000000000000000006064820152608401610682565b63ffffffff19811660009081526005602052604090205460ff1615610bc85760405162461bcd60e51b815260206004820152601b60248201527f547572626f46696c3a207365656420616c7265616479207573656400000000006044820152606401610682565b600454600090610bdc42602085901c6112fb565b610be69190611326565b9050600060048281548110610c0b57634e487b7160e01b600052603260045260246000fd5b9060005260206000200160009054906101000a90046001600160a01b031690507f25752522096f66ffeb7f69586652c28d77adc944c3ea7efac1daa16d0b2f80f283826001600160a01b0316630ff49f266040518163ffffffff1660e01b815260040160206040518083038186803b158015610c8657600080fd5b505afa158015610c9a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cbe9190611215565b6040805163ffffffff199384168152929091166020830152015b60405180910390a1505050565b3360009081527fae0e3e90079b140685ffe82811e4f12bdad5cad554501b8278d0f5a224706b6d602052604090205460ff16610d895760405162461bcd60e51b815260206004820152603d60248201527f547572626f46696c3a2063616c6c657220646f6573206e6f742068617665207060448201527f726976696c65676520746f206d61696e7461696e20547572626f46696c0000006064820152608401610682565b600255565b6000600254600154610da091906112fb565b905090565b3360009081527fa89c0f8ba48788a63faf58e7c9490f238a84082efa793d1a35ec2c48e19154f4602052604090205460ff16610e495760405162461bcd60e51b815260206004820152603960248201527f547572626f46696c3a2063616c6c657220646f6573206e6f742068617665207060448201527f726976696c65676520746f207375626d697420736563746f72000000000000006064820152608401610682565b600254600154610e5991906112fb565b341015610ea85760405162461bcd60e51b815260206004820152601c60248201527f547572626f46696c3a206e6f7420656e6f756768206465706f736974000000006044820152606401610682565b6000348383600254604051610ebc906111ad565b6001600160a01b03909316835263ffffffff19909116602083015260408201526060016040518091039082f0905080158015610efc573d6000803e3d6000fd5b5063ffffffff198316600081815260036020908152604080832080547fffffffffffffffffffffffff00000000000000000000000000000000000000009081166001600160a01b038881169182179093556004805460018101825596527f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b9095018054909116851790558151908916815291820193909352918201529091507f34da889154586424bd6c1f8c6719be8b74e3cc57fb04de7f502945dc6c12994390606001610cd8565b600082815260208190526040902060010154610fe0906108dc565b6109e05760405162461bcd60e51b815260206004820152603060248201527f416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e60448201527f2061646d696e20746f207265766f6b65000000000000000000000000000000006064820152608401610682565b60006004828154811061107557634e487b7160e01b600052603260045260246000fd5b6000918252602090912001546001600160a01b031692915050565b6000828152602081815260408083206001600160a01b038516845290915290205460ff1661095e576000828152602081815260408083206001600160a01b03851684529091529020805460ff191660011790556110ea3390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6000828152602081815260408083206001600160a01b038516845290915290205460ff161561095e576000828152602081815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b6106e48061136f83390190565b600080604083850312156111cc578182fd5b82356111d781611346565b915060208301356111e78161135b565b809150509250929050565b600060208284031215611203578081fd5b813561120e8161135b565b9392505050565b600060208284031215611226578081fd5b815161120e8161135b565b600080600060608486031215611245578081fd5b83356112508161135b565b925060208401356112608161135b565b915060408401358015158114611274578182fd5b809150509250925092565b600060208284031215611290578081fd5b5035919050565b600080604083850312156112a9578182fd5b8235915060208301356111e781611346565b6000602082840312156112cc578081fd5b81357fffffffff000000000000000000000000000000000000000000000000000000008116811461120e578182fd5b600081600019048311821515161561132157634e487b7160e01b81526011600452602481fd5b500290565b60008261134157634e487b7160e01b81526012600452602481fd5b500690565b6001600160a01b0381168114610aba57600080fd5b63ffffffff1981168114610aba57600080fdfe60806040526040516106e43803806106e48339810160408190526100229161007c565b60098054336001600160a01b031991821617909155600780549091166001600160a01b038516179055600880546001600160e01b031916602084901c179055600061006d82346100d2565b60055550600655506100f29050565b600080600060608486031215610090578283fd5b83516001600160a01b03811681146100a6578384fd5b602085015190935063ffffffff19811681146100c0578283fd5b80925050604084015190509250925092565b6000826100ed57634e487b7160e01b81526012600452602481fd5b500490565b6105e3806101016000396000f3fe60806040526004361061005a5760003560e01c806383a9e7841161004357806383a9e784146100cc5780638da5cb5b146100e1578063bdc63c84146101015761005a565b80630ff49f261461005f5780632e53c5b014610094575b600080fd5b34801561006b57600080fd5b506008546100799060201b81565b60405163ffffffff1990911681526020015b60405180910390f35b3480156100a057600080fd5b506009546100b4906001600160a01b031681565b6040516001600160a01b03909116815260200161008b565b6100df6100da3660046104b9565b610124565b005b3480156100ed57600080fd5b506007546100b4906001600160a01b031681565b34801561010d57600080fd5b506101166102d3565b60405190815260200161008b565b6009546001600160a01b031633146101a95760405162461bcd60e51b815260206004820152602660248201527f536563746f723a2063616e206f6e6c792062652063616c6c656420627920547560448201527f72626f46696c000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b6000341161021e5760405162461bcd60e51b8152602060048201526024808201527f536563746f723a20766572696679207265776172642063616e6e6f742062652060448201527f7a65726f0000000000000000000000000000000000000000000000000000000060648201526084016101a0565b600080821561023957349150610233826102f8565b5061027d565b610241610447565b6009546040519192506001600160a01b0316903480156108fc02916000818181858888f1935050505015801561027b573d6000803e3d6000fd5b505b6040805163ffffffff19861681528415156020820152908101839052606081018290527f44597cff11b810d3efcb2de85f7ffc5694909f1cb95ecb95bb06a422cd047ece9060800160405180910390a150505050565b6006546005546000916102e591610516565b6003546102f291906104fe565b90505b90565b6006546000901561033d5760055461031090826104fe565b6006805491925060006103228361054c565b90915550506004805490600061033783610563565b91905055505b60025460015483916000918291610353916104fe565b815260200190815260200160002081905550816000600301600082825461037a91906104fe565b909155505060045460025410156103ac576001600060020160008282546103a191906104fe565b909155506104009050565b6001546000908152602081905260409020546103c890826104fe565b90506001600060010160008282546103e091906104fe565b9091555050600380548291906000906103fa908490610535565b90915550505b8015610442576007546040516001600160a01b039091169082156108fc029083906000818181858888f19350505050158015610440573d6000803e3d6000fd5b505b919050565b60065460055460009161045991610516565b61046390826104fe565b60035490915061047390826104fe565b905080156102f5576009546040516001600160a01b039091169082156108fc029083906000818181858888f193505050501580156104b5573d6000803e3d6000fd5b5090565b600080604083850312156104cb578182fd5b823563ffffffff19811681146104df578283fd5b9150602083013580151581146104f3578182fd5b809150509250929050565b600082198211156105115761051161057e565b500190565b60008160001904831182151516156105305761053061057e565b500290565b6000828210156105475761054761057e565b500390565b60008161055b5761055b61057e565b506000190190565b60006000198214156105775761057761057e565b5060010190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fdfea26469706673582212206bb64dbff77d72bb35b400495b60c4250639918b0b900083bd7b7bee70bf9e5f64736f6c63430008030033a2646970667358221220099e7578c861e2c944153086d42576064a090495bdd13d37bff50b3ed61d471464736f6c63430008030033";
