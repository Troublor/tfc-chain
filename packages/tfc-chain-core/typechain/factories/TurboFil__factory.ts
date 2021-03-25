/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";

import type { TurboFil } from "../TurboFil";

export class TurboFil__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TurboFil> {
    return super.deploy(overrides || {}) as Promise<TurboFil>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
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
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "recommender",
        type: "address",
      },
    ],
    name: "Register",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "id",
        type: "string",
      },
      {
        indexed: false,
        internalType: "contract RNode",
        name: "rnode",
        type: "address",
      },
      {
        indexed: false,
        internalType: "contract FNode",
        name: "fnode",
        type: "address",
      },
    ],
    name: "RegisterFNode",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "phone",
        type: "string",
      },
    ],
    name: "RegisterMobile",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "id",
        type: "string",
      },
      {
        indexed: false,
        internalType: "contract RNode",
        name: "rnode",
        type: "address",
      },
    ],
    name: "RegisterRNode",
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
    name: "REGISTER_ROLE",
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
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "accounts",
    outputs: [
      {
        internalType: "address",
        name: "recommender",
        type: "address",
      },
      {
        internalType: "bool",
        name: "registered",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "fnodeMapping",
    outputs: [
      {
        internalType: "contract FNode",
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
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "mobileMapping",
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
        internalType: "address",
        name: "recommender",
        type: "address",
      },
    ],
    name: "register",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "id",
        type: "string",
      },
      {
        internalType: "string",
        name: "rnode_id",
        type: "string",
      },
      {
        internalType: "address",
        name: "bind_address",
        type: "address",
      },
    ],
    name: "registerFNode",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "id",
        type: "string",
      },
      {
        internalType: "contract RNode",
        name: "rnode",
        type: "address",
      },
      {
        internalType: "address",
        name: "bind_address",
        type: "address",
      },
    ],
    name: "registerFNode",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "phone",
        type: "string",
      },
    ],
    name: "registerMobile",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "id",
        type: "string",
      },
      {
        internalType: "address",
        name: "bind_address",
        type: "address",
      },
    ],
    name: "registerRNode",
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
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "rnodeMapping",
    outputs: [
      {
        internalType: "contract RNode",
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
  "0x60806040523480156200001157600080fd5b50620000276000801b336200002d60201b60201c565b620001a6565b6200003f82826200004360201b60201c565b5050565b6200005582826200013460201b60201c565b6200013057600160008084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550620000d56200019e60201b60201c565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45b5050565b600080600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b600033905090565b6137e080620001b66000396000f3fe60806040523480156200001157600080fd5b5060043610620001245760003560e01c80634ee8abf411620000b1578063a217fddf116200007b578063a217fddf1462000330578063d031a5b71462000352578063d134a5871462000372578063d547741f1462000392578063f3ff2f8014620003b25762000124565b80634ee8abf414620002815780635e5c06e214620002a157806374f5331714620002d857806391d1485414620002fa5762000124565b80632f2ff15d11620000f35780632f2ff15d146200020157806336568abe14620002215780634420e48614620002415780634ab596e014620002615762000124565b806301ffc9a7146200012957806303967495146200015f5780630520b6311462000195578063248a9ca314620001cb575b600080fd5b62000147600480360381019062000141919062001ef6565b620003e8565b60405162000156919062002592565b60405180910390f35b6200017d6004803603810190620001779190620020cf565b62000465565b6040516200018c919062002449565b60405180910390f35b620001b36004803603810190620001ad9190620020cf565b620004ae565b604051620001c29190620025e9565b60405180910390f35b620001e96004803603810190620001e3919062001e89565b620004f7565b604051620001f89190620025af565b60405180910390f35b6200021f600480360381019062000219919062001eb5565b62000516565b005b6200023f600480360381019062000239919062001eb5565b62000587565b005b6200025f600480360381019062000259919062001e5d565b62000611565b005b6200027f60048036038101906200027991906200203d565b62000973565b005b6200029f600480360381019062000299919062001f22565b62000b13565b005b620002bf6004803603810190620002b9919062001e5d565b62000e31565b604051620002cf92919062002493565b60405180910390f35b620002e262000e82565b604051620002f19190620025af565b60405180910390f35b62000318600480360381019062000312919062001eb5565b62000ea6565b60405162000327919062002592565b60405180910390f35b6200033a62000f10565b604051620003499190620025af565b60405180910390f35b6200037060048036038101906200036a919062001f6b565b62000f17565b005b6200039060048036038101906200038a919062001fc9565b6200125b565b005b620003b06004803603810190620003aa919062001eb5565b620016db565b005b620003d06004803603810190620003ca9190620020cf565b6200174c565b604051620003df9190620025cc565b60405180910390f35b60007f7965db0b000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806200045e57506200045d8262001795565b5b9050919050565b6001818051602081018201805184825260208301602085012081835280955050505050506000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6002818051602081018201805184825260208301602085012081835280955050505050506000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000806000838152602001908152602001600020600101549050919050565b620005356200052583620004f7565b6200052f620017ff565b62000ea6565b62000577576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200056e9062002662565b60405180910390fd5b62000583828262001807565b5050565b62000591620017ff565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161462000601576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620005f890620027d8565b60405180910390fd5b6200060d8282620018ec565b5050565b33600460008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060040160009054906101000a900460ff1615620006a5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200069c906200272e565b60405180910390fd5b3073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614806200072c5750600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060040160009054906101000a900460ff165b6200076e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200076590620026a6565b60405180910390fd5b6000600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000209050828160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001820181600101908054620008b3929190620019d2565b506002820181600201908054620008cc92919062001a4d565b506003820181600301908054620008e592919062001aa4565b506004820160009054906101000a900460ff168160040160006101000a81548160ff02191690831515021790555090505060018160040160006101000a81548160ff0219169083151502179055507f98ada70a1cb506dc4591465e1ee9be3fd7a2b6c73ecf3b949009718c9a35151933846040516200096692919062002466565b60405180910390a1505050565b80600460008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060040160009054906101000a900460ff1662000a06576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620009fd90620027b6565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff166002858560405162000a3292919062002415565b908152602001604051809103902060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141562000abb576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040162000ab2906200270c565b60405180910390fd5b62000b0b86866002878760405162000ad592919062002415565b908152602001604051809103902060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16856200125b565b505050505050565b33600460008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060040160009054906101000a900460ff1662000ba6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040162000b9d90620027b6565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff166001848460405162000bd292919062002415565b908152602001604051809103902060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161462000c5a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040162000c519062002794565b60405180910390fd5b6000600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090506000604051806020016040528086868080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050815250905084848080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050508160000181905250816001018190806001815401808255809150506001900390600052602060002001600090919091909150600082015181600001908051906020019062000d8992919062001afb565b505050336001868660405162000da192919062002415565b908152602001604051809103902060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f1b37e8517041d7696a3d644274e4c0af083a51d6bac14f8be9c558572f566d1833868660405162000e2293929190620024c0565b60405180910390a15050505050565b60046020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060040160009054906101000a900460ff16905082565b7fd1f21ec03a6eb050fba156f5316dad461735df521fb446dd42c5a4728e9c70fe81565b600080600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b6000801b81565b80600460008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060040160009054906101000a900460ff1662000faa576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040162000fa190620027b6565b60405180910390fd5b62000fd67fd1f21ec03a6eb050fba156f5316dad461735df521fb446dd42c5a4728e9c70fe3362000ea6565b62001018576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200100f9062002750565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff16600285856040516200104492919062002415565b908152602001604051809103902060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614620010cc576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620010c390620026ea565b60405180910390fd5b6000600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905060008585604051620011219062001b8c565b6200112e9291906200263c565b604051809103906000f0801580156200114b573d6000803e3d6000fd5b50905081600201819080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508060028787604051620011c892919062002415565b908152602001604051809103902060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f46bc52218a97aa4ed4b2aa696354ee28ef74935b8ea0f8aa14ec713b8b66a556848787846040516200124b9493929190620024f6565b60405180910390a1505050505050565b80600460008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060040160009054906101000a900460ff16620012ee576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620012e590620027b6565b60405180910390fd5b6200131a7fd1f21ec03a6eb050fba156f5316dad461735df521fb446dd42c5a4728e9c70fe3362000ea6565b6200135c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200135390620026c8565b60405180910390fd5b8273ffffffffffffffffffffffffffffffffffffffff1660028473ffffffffffffffffffffffffffffffffffffffff1663af640d0f6040518163ffffffff1660e01b815260040160006040518083038186803b158015620013bc57600080fd5b505afa158015620013d1573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f82011682018060405250810190620013fc919062002114565b6040516200140b919062002430565b908152602001604051809103902060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161462001493576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200148a906200270c565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff1660038686604051620014bf92919062002415565b908152602001604051809103902060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161462001547576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200153e9062002772565b60405180910390fd5b6000600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905060008487876040516200159d9062001b9a565b620015ab9392919062002606565b604051809103906000f080158015620015c8573d6000803e3d6000fd5b50905081600301819080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600388886040516200164592919062002415565b908152602001604051809103902060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507fa328fce4308528d7319b1e2bb4e4fcfb1617dbcdb83a18db1fea064457149be18488888885604051620016ca9594939291906200253c565b60405180910390a150505050505050565b620016fa620016ea83620004f7565b620016f4620017ff565b62000ea6565b6200173c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620017339062002684565b60405180910390fd5b620017488282620018ec565b5050565b6003818051602081018201805184825260208301602085012081835280955050505050506000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b600033905090565b62001813828262000ea6565b620018e857600160008084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506200188d620017ff565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45b5050565b620018f8828262000ea6565b15620019ce57600080600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555062001973620017ff565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45b5050565b82805482825590600052602060002090810192821562001a3a5760005260206000209182015b8281111562001a39578282600082018160000190805462001a19906200299f565b62001a2692919062001ba8565b50505091600101919060010190620019f8565b5b50905062001a49919062001c40565b5090565b82805482825590600052602060002090810192821562001a915760005260206000209182015b8281111562001a9057825482559160010191906001019062001a73565b5b50905062001aa0919062001c6b565b5090565b82805482825590600052602060002090810192821562001ae85760005260206000209182015b8281111562001ae757825482559160010191906001019062001aca565b5b50905062001af7919062001c6b565b5090565b82805462001b09906200299f565b90600052602060002090601f01602090048101928262001b2d576000855562001b79565b82601f1062001b4857805160ff191683800117855562001b79565b8280016001018555821562001b79579182015b8281111562001b7857825182559160200191906001019062001b5b565b5b50905062001b88919062001c6b565b5090565b6105338062002e7183390190565b61040780620033a483390190565b82805462001bb6906200299f565b90600052602060002090601f01602090048101928262001bda576000855562001c2d565b82601f1062001bed578054855562001c2d565b8280016001018555821562001c2d57600052602060002091601f016020900482015b8281111562001c2c57825482559160010191906001019062001c0f565b5b50905062001c3c919062001c6b565b5090565b5b8082111562001c67576000808201600062001c5d919062001c8a565b5060010162001c41565b5090565b5b8082111562001c8657600081600090555060010162001c6c565b5090565b50805462001c98906200299f565b6000825580601f1062001cac575062001ccd565b601f01602090049060005260206000209081019062001ccc919062001c6b565b5b50565b600062001ce762001ce18462002823565b620027fa565b90508281526020810184848401111562001d0057600080fd5b62001d0d8482856200295a565b509392505050565b600062001d2c62001d268462002823565b620027fa565b90508281526020810184848401111562001d4557600080fd5b62001d5284828562002969565b509392505050565b60008135905062001d6b8162002e08565b92915050565b60008135905062001d828162002e22565b92915050565b60008135905062001d998162002e3c565b92915050565b60008135905062001db08162002e56565b92915050565b60008083601f84011262001dc957600080fd5b8235905067ffffffffffffffff81111562001de357600080fd5b60208301915083600182028301111562001dfc57600080fd5b9250929050565b600082601f83011262001e1557600080fd5b813562001e2784826020860162001cd0565b91505092915050565b600082601f83011262001e4257600080fd5b815162001e5484826020860162001d15565b91505092915050565b60006020828403121562001e7057600080fd5b600062001e808482850162001d5a565b91505092915050565b60006020828403121562001e9c57600080fd5b600062001eac8482850162001d71565b91505092915050565b6000806040838503121562001ec957600080fd5b600062001ed98582860162001d71565b925050602062001eec8582860162001d5a565b9150509250929050565b60006020828403121562001f0957600080fd5b600062001f198482850162001d88565b91505092915050565b6000806020838503121562001f3657600080fd5b600083013567ffffffffffffffff81111562001f5157600080fd5b62001f5f8582860162001db6565b92509250509250929050565b60008060006040848603121562001f8157600080fd5b600084013567ffffffffffffffff81111562001f9c57600080fd5b62001faa8682870162001db6565b9350935050602062001fbf8682870162001d5a565b9150509250925092565b6000806000806060858703121562001fe057600080fd5b600085013567ffffffffffffffff81111562001ffb57600080fd5b620020098782880162001db6565b945094505060206200201e8782880162001d9f565b9250506040620020318782880162001d5a565b91505092959194509250565b6000806000806000606086880312156200205657600080fd5b600086013567ffffffffffffffff8111156200207157600080fd5b6200207f8882890162001db6565b9550955050602086013567ffffffffffffffff8111156200209f57600080fd5b620020ad8882890162001db6565b93509350506040620020c28882890162001d5a565b9150509295509295909350565b600060208284031215620020e257600080fd5b600082013567ffffffffffffffff811115620020fd57600080fd5b6200210b8482850162001e03565b91505092915050565b6000602082840312156200212757600080fd5b600082015167ffffffffffffffff8111156200214257600080fd5b620021508482850162001e30565b91505092915050565b620021648162002880565b82525050565b620021758162002894565b82525050565b6200218681620028a0565b82525050565b62002197816200290a565b82525050565b620021a88162002932565b82525050565b6000620021bc838562002864565b9350620021cb8385846200295a565b620021d68362002a69565b840190509392505050565b6000620021ef838562002875565b9350620021fe8385846200295a565b82840190509392505050565b6000620022178262002859565b62002223818562002875565b93506200223581856020860162002969565b80840191505092915050565b600062002250602f8362002864565b91506200225d8262002a7a565b604082019050919050565b60006200227760308362002864565b9150620022848262002ac9565b604082019050919050565b60006200229e60228362002864565b9150620022ab8262002b18565b604082019050919050565b6000620022c5603a8362002864565b9150620022d28262002b67565b604082019050919050565b6000620022ec60258362002864565b9150620022f98262002bb6565b604082019050919050565b60006200231360218362002864565b9150620023208262002c05565b604082019050919050565b60006200233a60248362002864565b9150620023478262002c54565b604082019050919050565b600062002361603a8362002864565b91506200236e8262002ca3565b604082019050919050565b60006200238860258362002864565b9150620023958262002cf2565b604082019050919050565b6000620023af60268362002864565b9150620023bc8262002d41565b604082019050919050565b6000620023d6601e8362002864565b9150620023e38262002d90565b602082019050919050565b6000620023fd602f8362002864565b91506200240a8262002db9565b604082019050919050565b600062002424828486620021e1565b91508190509392505050565b60006200243e82846200220a565b915081905092915050565b600060208201905062002460600083018462002159565b92915050565b60006040820190506200247d600083018562002159565b6200248c602083018462002159565b9392505050565b6000604082019050620024aa600083018562002159565b620024b960208301846200216a565b9392505050565b6000604082019050620024d7600083018662002159565b8181036020830152620024ec818486620021ae565b9050949350505050565b60006060820190506200250d600083018762002159565b818103602083015262002522818587620021ae565b90506200253360408301846200219d565b95945050505050565b600060808201905062002553600083018862002159565b818103602083015262002568818688620021ae565b90506200257960408301856200219d565b6200258860608301846200218c565b9695505050505050565b6000602082019050620025a960008301846200216a565b92915050565b6000602082019050620025c660008301846200217b565b92915050565b6000602082019050620025e360008301846200218c565b92915050565b60006020820190506200260060008301846200219d565b92915050565b60006040820190506200261d60008301866200219d565b818103602083015262002632818486620021ae565b9050949350505050565b6000602082019050818103600083015262002659818486620021ae565b90509392505050565b600060208201905081810360008301526200267d8162002241565b9050919050565b600060208201905081810360008301526200269f8162002268565b9050919050565b60006020820190508181036000830152620026c1816200228f565b9050919050565b60006020820190508181036000830152620026e381620022b6565b9050919050565b600060208201905081810360008301526200270581620022dd565b9050919050565b60006020820190508181036000830152620027278162002304565b9050919050565b6000602082019050818103600083015262002749816200232b565b9050919050565b600060208201905081810360008301526200276b8162002352565b9050919050565b600060208201905081810360008301526200278d8162002379565b9050919050565b60006020820190508181036000830152620027af81620023a0565b9050919050565b60006020820190508181036000830152620027d181620023c7565b9050919050565b60006020820190508181036000830152620027f381620023ee565b9050919050565b60006200280662002819565b9050620028148282620029d5565b919050565b6000604051905090565b600067ffffffffffffffff82111562002841576200284062002a3a565b5b6200284c8262002a69565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b60006200288d82620028ea565b9050919050565b60008115159050919050565b6000819050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b6000620028e38262002880565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600062002917826200291e565b9050919050565b60006200292b82620028ea565b9050919050565b60006200293f8262002946565b9050919050565b60006200295382620028ea565b9050919050565b82818337600083830152505050565b60005b83811015620029895780820151818401526020810190506200296c565b8381111562002999576000848401525b50505050565b60006002820490506001821680620029b857607f821691505b60208210811415620029cf57620029ce62002a0b565b5b50919050565b620029e08262002a69565b810181811067ffffffffffffffff8211171562002a025762002a0162002a3a565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e60008201527f2061646d696e20746f206772616e740000000000000000000000000000000000602082015250565b7f416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e60008201527f2061646d696e20746f207265766f6b6500000000000000000000000000000000602082015250565b7f547572626f46696c3a20556e72656769737465726564207265636f6d6d656e6460008201527f6572000000000000000000000000000000000000000000000000000000000000602082015250565b7f547572626f46696c3a2043616c6c657220646f6573206e6f742068617665207060008201527f726976696c65676520746f20726567697374657220464e6f6465000000000000602082015250565b7f547572626f46696c3a20524e6f646520697320616c726561647920726567697360008201527f7465726564000000000000000000000000000000000000000000000000000000602082015250565b7f547572626f46696c3a20524e6f6465206973206e6f742072656769737465726560008201527f6400000000000000000000000000000000000000000000000000000000000000602082015250565b7f547572626f46696c3a20416c72656164792d726567697374657265642061636360008201527f6f756e7400000000000000000000000000000000000000000000000000000000602082015250565b7f547572626f46696c3a2043616c6c657220646f6573206e6f742068617665207060008201527f726976696c65676520746f20726567697374657220524e6f6465000000000000602082015250565b7f547572626f46696c3a20464e6f646520697320616c726561647920726567697360008201527f7465726564000000000000000000000000000000000000000000000000000000602082015250565b7f547572626f46696c3a204d6f62696c6520697320616c7265616479207265676960008201527f7374657265640000000000000000000000000000000000000000000000000000602082015250565b7f547572626f46696c3a20556e72656769737465726564206163636f756e740000600082015250565b7f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560008201527f20726f6c657320666f722073656c660000000000000000000000000000000000602082015250565b62002e138162002880565b811462002e1f57600080fd5b50565b62002e2d81620028a0565b811462002e3957600080fd5b50565b62002e4781620028aa565b811462002e5357600080fd5b50565b62002e6181620028d6565b811462002e6d57600080fd5b5056fe608060405234801561001057600080fd5b506040516105333803806105338339818101604052810190610032919061015a565b806000908051906020019061004892919061004f565b50506102f6565b82805461005b90610224565b90600052602060002090601f01602090048101928261007d57600085556100c4565b82601f1061009657805160ff19168380011785556100c4565b828001600101855582156100c4579182015b828111156100c35782518255916020019190600101906100a8565b5b5090506100d191906100d5565b5090565b5b808211156100ee5760008160009055506001016100d6565b5090565b6000610105610100846101c0565b61019b565b90508281526020810184848401111561011d57600080fd5b6101288482856101f1565b509392505050565b600082601f83011261014157600080fd5b81516101518482602086016100f2565b91505092915050565b60006020828403121561016c57600080fd5b600082015167ffffffffffffffff81111561018657600080fd5b61019284828501610130565b91505092915050565b60006101a56101b6565b90506101b18282610256565b919050565b6000604051905090565b600067ffffffffffffffff8211156101db576101da6102b6565b5b6101e4826102e5565b9050602081019050919050565b60005b8381101561020f5780820151818401526020810190506101f4565b8381111561021e576000848401525b50505050565b6000600282049050600182168061023c57607f821691505b602082108114156102505761024f610287565b5b50919050565b61025f826102e5565b810181811067ffffffffffffffff8211171561027e5761027d6102b6565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b61022e806103056000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063af640d0f14610030575b600080fd5b61003861004e565b6040516100459190610115565b60405180910390f35b6000805461005b90610186565b80601f016020809104026020016040519081016040528092919081815260200182805461008790610186565b80156100d45780601f106100a9576101008083540402835291602001916100d4565b820191906000526020600020905b8154815290600101906020018083116100b757829003601f168201915b505050505081565b60006100e782610137565b6100f18185610142565b9350610101818560208601610153565b61010a816101e7565b840191505092915050565b6000602082019050818103600083015261012f81846100dc565b905092915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610171578082015181840152602081019050610156565b83811115610180576000848401525b50505050565b6000600282049050600182168061019e57607f821691505b602082108114156101b2576101b16101b8565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000601f19601f830116905091905056fea2646970667358221220e3f62e7d566d7cf1d42a80cd98d3aa88933bebdd3c97016be6cc856737e2d41064736f6c63430008020033608060405234801561001057600080fd5b50604051610407380380610407833981810160405281019061003291906101b0565b816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508060019080519060200190610088929190610090565b5050506103ba565b82805461009c906102d1565b90600052602060002090601f0160209004810192826100be5760008555610105565b82601f106100d757805160ff1916838001178555610105565b82800160010185558215610105579182015b828111156101045782518255916020019190600101906100e9565b5b5090506101129190610116565b5090565b5b8082111561012f576000816000905550600101610117565b5090565b600061014661014184610229565b610204565b90508281526020810184848401111561015e57600080fd5b61016984828561029e565b509392505050565b600081519050610180816103a3565b92915050565b600082601f83011261019757600080fd5b81516101a7848260208601610133565b91505092915050565b600080604083850312156101c357600080fd5b60006101d185828601610171565b925050602083015167ffffffffffffffff8111156101ee57600080fd5b6101fa85828601610186565b9150509250929050565b600061020e61021f565b905061021a8282610303565b919050565b6000604051905090565b600067ffffffffffffffff82111561024457610243610363565b5b61024d82610392565b9050602081019050919050565b60006102658261027e565b9050919050565b60006102778261025a565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60005b838110156102bc5780820151818401526020810190506102a1565b838111156102cb576000848401525b50505050565b600060028204905060018216806102e957607f821691505b602082108114156102fd576102fc610334565b5b50919050565b61030c82610392565b810181811067ffffffffffffffff8211171561032b5761032a610363565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b6103ac8161026c565b81146103b757600080fd5b50565b603f806103c86000396000f3fe6080604052600080fdfea264697066735822122070ddf62e559b2b839317d2225a5dc586289d9baa2e3078f11aaa9f0c2821f76f64736f6c63430008020033a2646970667358221220d525ddbffcdf45aaaa69915319ce8466ae014432e5c235a3d198506db7a86db664736f6c63430008020033";