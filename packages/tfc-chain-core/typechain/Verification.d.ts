/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface VerificationInterface extends ethers.utils.Interface {
  functions: {
    "STATUS_VERIFYING()": FunctionFragment;
    "STATUS_WAITING()": FunctionFragment;
    "collectFunds()": FunctionFragment;
    "expireSubmitProofDDL()": FunctionFragment;
    "expireVerifyProofDDL()": FunctionFragment;
    "fail()": FunctionFragment;
    "hasVerified(address)": FunctionFragment;
    "pass()": FunctionFragment;
    "proof()": FunctionFragment;
    "sector()": FunctionFragment;
    "sectorReward()": FunctionFragment;
    "seed()": FunctionFragment;
    "seedReward()": FunctionFragment;
    "seedSubmitter()": FunctionFragment;
    "status()": FunctionFragment;
    "submitProof(bytes28)": FunctionFragment;
    "submitProofDDL()": FunctionFragment;
    "turboFil()": FunctionFragment;
    "verifyProof(bool)": FunctionFragment;
    "verifyProofDDL()": FunctionFragment;
    "verifyReward()": FunctionFragment;
    "verifyThreshold()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "STATUS_VERIFYING",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "STATUS_WAITING",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "collectFunds",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "expireSubmitProofDDL",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "expireVerifyProofDDL",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "fail", values?: undefined): string;
  encodeFunctionData(functionFragment: "hasVerified", values: [string]): string;
  encodeFunctionData(functionFragment: "pass", values?: undefined): string;
  encodeFunctionData(functionFragment: "proof", values?: undefined): string;
  encodeFunctionData(functionFragment: "sector", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "sectorReward",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "seed", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "seedReward",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "seedSubmitter",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "status", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "submitProof",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "submitProofDDL",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "turboFil", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "verifyProof",
    values: [boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "verifyProofDDL",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "verifyReward",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "verifyThreshold",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "STATUS_VERIFYING",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "STATUS_WAITING",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "collectFunds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "expireSubmitProofDDL",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "expireVerifyProofDDL",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "fail", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "hasVerified",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "pass", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "proof", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "sector", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "sectorReward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "seed", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "seedReward", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "seedSubmitter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "status", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "submitProof",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "submitProofDDL",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "turboFil", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "verifyProof",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "verifyProofDDL",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "verifyReward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "verifyThreshold",
    data: BytesLike
  ): Result;

  events: {
    "ProofSubmitted(bytes28,bytes28,bytes28)": EventFragment;
    "ProofVerified(bytes28,bytes28,bytes28,bool)": EventFragment;
    "VerifyFinish(bool)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ProofSubmitted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ProofVerified"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "VerifyFinish"): EventFragment;
}

export class Verification extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: VerificationInterface;

  functions: {
    STATUS_VERIFYING(overrides?: CallOverrides): Promise<[number]>;

    "STATUS_VERIFYING()"(overrides?: CallOverrides): Promise<[number]>;

    STATUS_WAITING(overrides?: CallOverrides): Promise<[number]>;

    "STATUS_WAITING()"(overrides?: CallOverrides): Promise<[number]>;

    collectFunds(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "collectFunds()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    expireSubmitProofDDL(overrides?: CallOverrides): Promise<[boolean]>;

    "expireSubmitProofDDL()"(overrides?: CallOverrides): Promise<[boolean]>;

    expireVerifyProofDDL(overrides?: CallOverrides): Promise<[boolean]>;

    "expireVerifyProofDDL()"(overrides?: CallOverrides): Promise<[boolean]>;

    fail(overrides?: CallOverrides): Promise<[boolean]>;

    "fail()"(overrides?: CallOverrides): Promise<[boolean]>;

    hasVerified(arg0: string, overrides?: CallOverrides): Promise<[boolean]>;

    "hasVerified(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    pass(overrides?: CallOverrides): Promise<[boolean]>;

    "pass()"(overrides?: CallOverrides): Promise<[boolean]>;

    proof(overrides?: CallOverrides): Promise<[string]>;

    "proof()"(overrides?: CallOverrides): Promise<[string]>;

    sector(overrides?: CallOverrides): Promise<[string]>;

    "sector()"(overrides?: CallOverrides): Promise<[string]>;

    sectorReward(overrides?: CallOverrides): Promise<[BigNumber]>;

    "sectorReward()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    seed(overrides?: CallOverrides): Promise<[string]>;

    "seed()"(overrides?: CallOverrides): Promise<[string]>;

    seedReward(overrides?: CallOverrides): Promise<[BigNumber]>;

    "seedReward()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    seedSubmitter(overrides?: CallOverrides): Promise<[string]>;

    "seedSubmitter()"(overrides?: CallOverrides): Promise<[string]>;

    status(overrides?: CallOverrides): Promise<[number]>;

    "status()"(overrides?: CallOverrides): Promise<[number]>;

    submitProof(
      proof_: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "submitProof(bytes28)"(
      proof_: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    submitProofDDL(overrides?: CallOverrides): Promise<[BigNumber]>;

    "submitProofDDL()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    turboFil(overrides?: CallOverrides): Promise<[string]>;

    "turboFil()"(overrides?: CallOverrides): Promise<[string]>;

    verifyProof(
      result_: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "verifyProof(bool)"(
      result_: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    verifyProofDDL(overrides?: CallOverrides): Promise<[BigNumber]>;

    "verifyProofDDL()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    verifyReward(overrides?: CallOverrides): Promise<[BigNumber]>;

    "verifyReward()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    verifyThreshold(overrides?: CallOverrides): Promise<[BigNumber]>;

    "verifyThreshold()"(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  STATUS_VERIFYING(overrides?: CallOverrides): Promise<number>;

  "STATUS_VERIFYING()"(overrides?: CallOverrides): Promise<number>;

  STATUS_WAITING(overrides?: CallOverrides): Promise<number>;

  "STATUS_WAITING()"(overrides?: CallOverrides): Promise<number>;

  collectFunds(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "collectFunds()"(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  expireSubmitProofDDL(overrides?: CallOverrides): Promise<boolean>;

  "expireSubmitProofDDL()"(overrides?: CallOverrides): Promise<boolean>;

  expireVerifyProofDDL(overrides?: CallOverrides): Promise<boolean>;

  "expireVerifyProofDDL()"(overrides?: CallOverrides): Promise<boolean>;

  fail(overrides?: CallOverrides): Promise<boolean>;

  "fail()"(overrides?: CallOverrides): Promise<boolean>;

  hasVerified(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  "hasVerified(address)"(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  pass(overrides?: CallOverrides): Promise<boolean>;

  "pass()"(overrides?: CallOverrides): Promise<boolean>;

  proof(overrides?: CallOverrides): Promise<string>;

  "proof()"(overrides?: CallOverrides): Promise<string>;

  sector(overrides?: CallOverrides): Promise<string>;

  "sector()"(overrides?: CallOverrides): Promise<string>;

  sectorReward(overrides?: CallOverrides): Promise<BigNumber>;

  "sectorReward()"(overrides?: CallOverrides): Promise<BigNumber>;

  seed(overrides?: CallOverrides): Promise<string>;

  "seed()"(overrides?: CallOverrides): Promise<string>;

  seedReward(overrides?: CallOverrides): Promise<BigNumber>;

  "seedReward()"(overrides?: CallOverrides): Promise<BigNumber>;

  seedSubmitter(overrides?: CallOverrides): Promise<string>;

  "seedSubmitter()"(overrides?: CallOverrides): Promise<string>;

  status(overrides?: CallOverrides): Promise<number>;

  "status()"(overrides?: CallOverrides): Promise<number>;

  submitProof(
    proof_: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "submitProof(bytes28)"(
    proof_: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  submitProofDDL(overrides?: CallOverrides): Promise<BigNumber>;

  "submitProofDDL()"(overrides?: CallOverrides): Promise<BigNumber>;

  turboFil(overrides?: CallOverrides): Promise<string>;

  "turboFil()"(overrides?: CallOverrides): Promise<string>;

  verifyProof(
    result_: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "verifyProof(bool)"(
    result_: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  verifyProofDDL(overrides?: CallOverrides): Promise<BigNumber>;

  "verifyProofDDL()"(overrides?: CallOverrides): Promise<BigNumber>;

  verifyReward(overrides?: CallOverrides): Promise<BigNumber>;

  "verifyReward()"(overrides?: CallOverrides): Promise<BigNumber>;

  verifyThreshold(overrides?: CallOverrides): Promise<BigNumber>;

  "verifyThreshold()"(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    STATUS_VERIFYING(overrides?: CallOverrides): Promise<number>;

    "STATUS_VERIFYING()"(overrides?: CallOverrides): Promise<number>;

    STATUS_WAITING(overrides?: CallOverrides): Promise<number>;

    "STATUS_WAITING()"(overrides?: CallOverrides): Promise<number>;

    collectFunds(overrides?: CallOverrides): Promise<void>;

    "collectFunds()"(overrides?: CallOverrides): Promise<void>;

    expireSubmitProofDDL(overrides?: CallOverrides): Promise<boolean>;

    "expireSubmitProofDDL()"(overrides?: CallOverrides): Promise<boolean>;

    expireVerifyProofDDL(overrides?: CallOverrides): Promise<boolean>;

    "expireVerifyProofDDL()"(overrides?: CallOverrides): Promise<boolean>;

    fail(overrides?: CallOverrides): Promise<boolean>;

    "fail()"(overrides?: CallOverrides): Promise<boolean>;

    hasVerified(arg0: string, overrides?: CallOverrides): Promise<boolean>;

    "hasVerified(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    pass(overrides?: CallOverrides): Promise<boolean>;

    "pass()"(overrides?: CallOverrides): Promise<boolean>;

    proof(overrides?: CallOverrides): Promise<string>;

    "proof()"(overrides?: CallOverrides): Promise<string>;

    sector(overrides?: CallOverrides): Promise<string>;

    "sector()"(overrides?: CallOverrides): Promise<string>;

    sectorReward(overrides?: CallOverrides): Promise<BigNumber>;

    "sectorReward()"(overrides?: CallOverrides): Promise<BigNumber>;

    seed(overrides?: CallOverrides): Promise<string>;

    "seed()"(overrides?: CallOverrides): Promise<string>;

    seedReward(overrides?: CallOverrides): Promise<BigNumber>;

    "seedReward()"(overrides?: CallOverrides): Promise<BigNumber>;

    seedSubmitter(overrides?: CallOverrides): Promise<string>;

    "seedSubmitter()"(overrides?: CallOverrides): Promise<string>;

    status(overrides?: CallOverrides): Promise<number>;

    "status()"(overrides?: CallOverrides): Promise<number>;

    submitProof(proof_: BytesLike, overrides?: CallOverrides): Promise<void>;

    "submitProof(bytes28)"(
      proof_: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    submitProofDDL(overrides?: CallOverrides): Promise<BigNumber>;

    "submitProofDDL()"(overrides?: CallOverrides): Promise<BigNumber>;

    turboFil(overrides?: CallOverrides): Promise<string>;

    "turboFil()"(overrides?: CallOverrides): Promise<string>;

    verifyProof(result_: boolean, overrides?: CallOverrides): Promise<void>;

    "verifyProof(bool)"(
      result_: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    verifyProofDDL(overrides?: CallOverrides): Promise<BigNumber>;

    "verifyProofDDL()"(overrides?: CallOverrides): Promise<BigNumber>;

    verifyReward(overrides?: CallOverrides): Promise<BigNumber>;

    "verifyReward()"(overrides?: CallOverrides): Promise<BigNumber>;

    verifyThreshold(overrides?: CallOverrides): Promise<BigNumber>;

    "verifyThreshold()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    ProofSubmitted(
      sector_afid: null,
      seed: null,
      proof: null
    ): TypedEventFilter<
      [string, string, string],
      { sector_afid: string; seed: string; proof: string }
    >;

    ProofVerified(
      sector_afid: null,
      seed: null,
      proof: null,
      result: null
    ): TypedEventFilter<
      [string, string, string, boolean],
      { sector_afid: string; seed: string; proof: string; result: boolean }
    >;

    VerifyFinish(
      result: null
    ): TypedEventFilter<[boolean], { result: boolean }>;
  };

  estimateGas: {
    STATUS_VERIFYING(overrides?: CallOverrides): Promise<BigNumber>;

    "STATUS_VERIFYING()"(overrides?: CallOverrides): Promise<BigNumber>;

    STATUS_WAITING(overrides?: CallOverrides): Promise<BigNumber>;

    "STATUS_WAITING()"(overrides?: CallOverrides): Promise<BigNumber>;

    collectFunds(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "collectFunds()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    expireSubmitProofDDL(overrides?: CallOverrides): Promise<BigNumber>;

    "expireSubmitProofDDL()"(overrides?: CallOverrides): Promise<BigNumber>;

    expireVerifyProofDDL(overrides?: CallOverrides): Promise<BigNumber>;

    "expireVerifyProofDDL()"(overrides?: CallOverrides): Promise<BigNumber>;

    fail(overrides?: CallOverrides): Promise<BigNumber>;

    "fail()"(overrides?: CallOverrides): Promise<BigNumber>;

    hasVerified(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    "hasVerified(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    pass(overrides?: CallOverrides): Promise<BigNumber>;

    "pass()"(overrides?: CallOverrides): Promise<BigNumber>;

    proof(overrides?: CallOverrides): Promise<BigNumber>;

    "proof()"(overrides?: CallOverrides): Promise<BigNumber>;

    sector(overrides?: CallOverrides): Promise<BigNumber>;

    "sector()"(overrides?: CallOverrides): Promise<BigNumber>;

    sectorReward(overrides?: CallOverrides): Promise<BigNumber>;

    "sectorReward()"(overrides?: CallOverrides): Promise<BigNumber>;

    seed(overrides?: CallOverrides): Promise<BigNumber>;

    "seed()"(overrides?: CallOverrides): Promise<BigNumber>;

    seedReward(overrides?: CallOverrides): Promise<BigNumber>;

    "seedReward()"(overrides?: CallOverrides): Promise<BigNumber>;

    seedSubmitter(overrides?: CallOverrides): Promise<BigNumber>;

    "seedSubmitter()"(overrides?: CallOverrides): Promise<BigNumber>;

    status(overrides?: CallOverrides): Promise<BigNumber>;

    "status()"(overrides?: CallOverrides): Promise<BigNumber>;

    submitProof(
      proof_: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "submitProof(bytes28)"(
      proof_: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    submitProofDDL(overrides?: CallOverrides): Promise<BigNumber>;

    "submitProofDDL()"(overrides?: CallOverrides): Promise<BigNumber>;

    turboFil(overrides?: CallOverrides): Promise<BigNumber>;

    "turboFil()"(overrides?: CallOverrides): Promise<BigNumber>;

    verifyProof(
      result_: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "verifyProof(bool)"(
      result_: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    verifyProofDDL(overrides?: CallOverrides): Promise<BigNumber>;

    "verifyProofDDL()"(overrides?: CallOverrides): Promise<BigNumber>;

    verifyReward(overrides?: CallOverrides): Promise<BigNumber>;

    "verifyReward()"(overrides?: CallOverrides): Promise<BigNumber>;

    verifyThreshold(overrides?: CallOverrides): Promise<BigNumber>;

    "verifyThreshold()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    STATUS_VERIFYING(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "STATUS_VERIFYING()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    STATUS_WAITING(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "STATUS_WAITING()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    collectFunds(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "collectFunds()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    expireSubmitProofDDL(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "expireSubmitProofDDL()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    expireVerifyProofDDL(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "expireVerifyProofDDL()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    fail(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "fail()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    hasVerified(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "hasVerified(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    pass(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "pass()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    proof(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "proof()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    sector(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "sector()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    sectorReward(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "sectorReward()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    seed(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "seed()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    seedReward(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "seedReward()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    seedSubmitter(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "seedSubmitter()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    status(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "status()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    submitProof(
      proof_: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "submitProof(bytes28)"(
      proof_: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    submitProofDDL(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "submitProofDDL()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    turboFil(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "turboFil()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    verifyProof(
      result_: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "verifyProof(bool)"(
      result_: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    verifyProofDDL(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "verifyProofDDL()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    verifyReward(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "verifyReward()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    verifyThreshold(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "verifyThreshold()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
