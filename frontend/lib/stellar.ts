import { rpc, Contract, Account, TransactionBuilder, scValToNative, nativeToScVal, xdr, Networks } from "@stellar/stellar-sdk";
import { signTransaction } from "@stellar/freighter-api";
import type { Donation } from "./types";

export const CONTRACT_ID = "CDNBJG3SKPFMHTDD7WRIOUYXHSH7QFFEJG64FX3O7QRKWXTYOSNKG56A";
export const NETWORK_PASSPHRASE = Networks.TESTNET;
export const RPC_URL = "https://soroban-testnet.stellar.org";

export const server = new rpc.Server(RPC_URL);
const contract = new Contract(CONTRACT_ID);

// Dummy account for simulateTransaction (reads)
const DUMMY_ACCOUNT = new Account("GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF", "0");

async function simulateRead(method: string, args: xdr.ScVal[] = []) {
  const tx = new TransactionBuilder(DUMMY_ACCOUNT, {
    fee: "100",
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .addOperation(contract.call(method, ...args))
    .setTimeout(30)
    .build();

  const response = await server.simulateTransaction(tx);
  
  if (rpc.Api.isSimulationError(response)) {
    throw new Error(`Simulation Error: ${response.error}`);
  }
  
  if (!response.result || !response.result.retval) {
    throw new Error("No result returned from simulation.");
  }
  
  return scValToNative(response.result.retval);
}

export async function getDonations(): Promise<Donation[]> {
  try {
    const data = await simulateRead("get_donations");
    if (!data || !Array.isArray(data)) return [];
    
    // Contract returns Vec<Donation>
    // struct Donation { id: u64, donor: String, amount: u64 }
    return data.map((d: any) => ({
      id: d.id.toString(),
      donor: d.donor,
      amount: Number(d.amount),
      // Dummy values since contract doesn't store these yet
      timestamp: new Date(), 
      txHash: "",
      message: ""
    })).reverse(); // Reverse so newest is first
  } catch (err) {
    console.error("getDonations error:", err);
    return [];
  }
}

export async function getTotalDonation(): Promise<number> {
  try {
    const data = await simulateRead("get_total_donation");
    return Number(data);
  } catch (err) {
    console.error("getTotalDonation error:", err);
    return 0;
  }
}

export async function getDonationCount(): Promise<number> {
  try {
    const data = await simulateRead("get_donation_count");
    return Number(data);
  } catch (err) {
    console.error("getDonationCount error:", err);
    return 0;
  }
}

export async function donate(donorName: string, amount: number, sourcePublicKey: string) {
  // 1. Get sequence number
  const sourceAccountReq = await server.getAccount(sourcePublicKey);
  const sourceAccount = new Account(sourcePublicKey, sourceAccountReq.sequenceNumber());

  // 2. Build Transaction
  const args = [
    nativeToScVal(donorName, { type: "string" }),
    nativeToScVal(amount, { type: "u64" })
  ];

  let tx = new TransactionBuilder(sourceAccount, {
    fee: "1000",
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .addOperation(contract.call("donate", ...args))
    .setTimeout(300)
    .build();

  // 3. Prepare transaction (this automatically simulates, gets footprint, and sets fees)
  tx = await server.prepareTransaction(tx);

  // 4. Sign with Freighter
  const signRes = await signTransaction(tx.toXDR(), {
    networkPassphrase: NETWORK_PASSPHRASE
  });
  
  if (signRes.error) {
    throw new Error(signRes.error as string);
  }

  const signedTx = TransactionBuilder.fromXDR(signRes.signedTxXdr, NETWORK_PASSPHRASE);

  // 5. Submit to Network
  const response = await server.sendTransaction(signedTx);
  if (response.status === "ERROR") {
    const errorDetails = JSON.stringify(response, null, 2);
    console.error("Submission failed details:", errorDetails);
    throw new Error(`TX SUBMISSION ERROR: ${response.errorResult || "No error result"}. Details: ${errorDetails}`);
  }

  // 6. Wait for confirmation
  let txResponse = await server.getTransaction(response.hash);
  let retries = 0;
  while (txResponse.status === "NOT_FOUND" && retries < 20) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    txResponse = await server.getTransaction(response.hash);
    retries++;
  }

  if (txResponse.status !== "SUCCESS") {
    throw new Error(`Transaction failed: ${txResponse.status}`);
  }

  return response.hash;
}
