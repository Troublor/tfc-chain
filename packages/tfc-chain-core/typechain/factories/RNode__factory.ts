/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";

import type { RNode } from "../RNode";

export class RNode__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _id: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<RNode> {
    return super.deploy(_id, overrides || {}) as Promise<RNode>;
  }
  getDeployTransaction(
    _id: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_id, overrides || {});
  }
  attach(address: string): RNode {
    return super.attach(address) as RNode;
  }
  connect(signer: Signer): RNode__factory {
    return super.connect(signer) as RNode__factory;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): RNode {
    return new Contract(address, _abi, signerOrProvider) as RNode;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_id",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "id",
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
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506040516105333803806105338339818101604052810190610032919061015a565b806000908051906020019061004892919061004f565b50506102f6565b82805461005b90610224565b90600052602060002090601f01602090048101928261007d57600085556100c4565b82601f1061009657805160ff19168380011785556100c4565b828001600101855582156100c4579182015b828111156100c35782518255916020019190600101906100a8565b5b5090506100d191906100d5565b5090565b5b808211156100ee5760008160009055506001016100d6565b5090565b6000610105610100846101c0565b61019b565b90508281526020810184848401111561011d57600080fd5b6101288482856101f1565b509392505050565b600082601f83011261014157600080fd5b81516101518482602086016100f2565b91505092915050565b60006020828403121561016c57600080fd5b600082015167ffffffffffffffff81111561018657600080fd5b61019284828501610130565b91505092915050565b60006101a56101b6565b90506101b18282610256565b919050565b6000604051905090565b600067ffffffffffffffff8211156101db576101da6102b6565b5b6101e4826102e5565b9050602081019050919050565b60005b8381101561020f5780820151818401526020810190506101f4565b8381111561021e576000848401525b50505050565b6000600282049050600182168061023c57607f821691505b602082108114156102505761024f610287565b5b50919050565b61025f826102e5565b810181811067ffffffffffffffff8211171561027e5761027d6102b6565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b61022e806103056000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063af640d0f14610030575b600080fd5b61003861004e565b6040516100459190610115565b60405180910390f35b6000805461005b90610186565b80601f016020809104026020016040519081016040528092919081815260200182805461008790610186565b80156100d45780601f106100a9576101008083540402835291602001916100d4565b820191906000526020600020905b8154815290600101906020018083116100b757829003601f168201915b505050505081565b60006100e782610137565b6100f18185610142565b9350610101818560208601610153565b61010a816101e7565b840191505092915050565b6000602082019050818103600083015261012f81846100dc565b905092915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610171578082015181840152602081019050610156565b83811115610180576000848401525b50505050565b6000600282049050600182168061019e57607f821691505b602082108114156101b2576101b16101b8565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000601f19601f830116905091905056fea2646970667358221220e3f62e7d566d7cf1d42a80cd98d3aa88933bebdd3c97016be6cc856737e2d41064736f6c63430008020033";
