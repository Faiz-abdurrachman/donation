import { Buffer } from "buffer";
import { Address } from "@stellar/stellar-sdk";
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  MethodOptions,
  Result,
  Spec as ContractSpec,
} from "@stellar/stellar-sdk/contract";
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Timepoint,
  Duration,
} from "@stellar/stellar-sdk/contract";
export * from "@stellar/stellar-sdk";
export * as contract from "@stellar/stellar-sdk/contract";
export * as rpc from "@stellar/stellar-sdk/rpc";

if (typeof window !== "undefined") {
  //@ts-ignore Buffer exists
  window.Buffer = window.Buffer || Buffer;
}


export const networks = {
  testnet: {
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CDNBJG3SKPFMHTDD7WRIOUYXHSH7QFFEJG64FX3O7QRKWXTYOSNKG56A",
  }
} as const


export interface Donation {
  amount: u64;
  donor: string;
  id: u64;
}

export interface Client {
  /**
   * Construct and simulate a donate transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  donate: ({donor, amount}: {donor: string, amount: u64}, options?: MethodOptions) => Promise<AssembledTransaction<string>>

  /**
   * Construct and simulate a get_donations transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_donations: (options?: MethodOptions) => Promise<AssembledTransaction<Array<Donation>>>

  /**
   * Construct and simulate a get_donation_count transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_donation_count: (options?: MethodOptions) => Promise<AssembledTransaction<u64>>

  /**
   * Construct and simulate a get_total_donation transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_total_donation: (options?: MethodOptions) => Promise<AssembledTransaction<u64>>

}
export class Client extends ContractClient {
  static async deploy<T = Client>(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options: MethodOptions &
      Omit<ContractClientOptions, "contractId"> & {
        /** The hash of the Wasm blob, which must already be installed on-chain. */
        wasmHash: Buffer | string;
        /** Salt used to generate the contract's ID. Passed through to {@link Operation.createCustomContract}. Default: random. */
        salt?: Buffer | Uint8Array;
        /** The format used to decode `wasmHash`, if it's provided as a string. */
        format?: "hex" | "base64";
      }
  ): Promise<AssembledTransaction<T>> {
    return ContractClient.deploy(null, options)
  }
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAAAQAAAAAAAAAAAAAACERvbmF0aW9uAAAAAwAAAAAAAAAGYW1vdW50AAAAAAAGAAAAAAAAAAVkb25vcgAAAAAAABAAAAAAAAAAAmlkAAAAAAAG",
        "AAAAAAAAAAAAAAAGZG9uYXRlAAAAAAACAAAAAAAAAAVkb25vcgAAAAAAABAAAAAAAAAABmFtb3VudAAAAAAABgAAAAEAAAAQ",
        "AAAAAAAAAAAAAAANZ2V0X2RvbmF0aW9ucwAAAAAAAAAAAAABAAAD6gAAB9AAAAAIRG9uYXRpb24=",
        "AAAAAAAAAAAAAAASZ2V0X2RvbmF0aW9uX2NvdW50AAAAAAAAAAAAAQAAAAY=",
        "AAAAAAAAAAAAAAASZ2V0X3RvdGFsX2RvbmF0aW9uAAAAAAAAAAAAAQAAAAY=" ]),
      options
    )
  }
  public readonly fromJSON = {
    donate: this.txFromJSON<string>,
        get_donations: this.txFromJSON<Array<Donation>>,
        get_donation_count: this.txFromJSON<u64>,
        get_total_donation: this.txFromJSON<u64>
  }
}