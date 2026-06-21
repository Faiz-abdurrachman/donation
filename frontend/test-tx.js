const { rpc, TransactionBuilder, Account, Networks } = require("@stellar/stellar-sdk");

const account = new Account("GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF", "0");
const tx = new TransactionBuilder(account, {
  fee: "100",
  networkPassphrase: Networks.TESTNET
}).setTimeout(30).build();

const xdr = tx.toXDR();
console.log(typeof xdr); // should be string

try {
  const parsed = TransactionBuilder.fromXDR(xdr, Networks.TESTNET);
  console.log("Success parsing!");
} catch (err) {
  console.error("Error:", err);
}
