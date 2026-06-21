"use client";

import { useState, type FormEvent } from "react";
import { useBlockchain } from "./BlockchainProvider";
import { donate } from "@/lib/stellar";
import { shortenHash } from "@/lib/utils";

export default function DonationForm() {
  const { address, connect, refreshData } = useBlockchain();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [txHash, setTxHash] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!address) {
      await connect();
      return;
    }

    if (!name.trim() || !amount.trim()) {
      setStatus("error");
      setErrorMessage("FILL IN ALL REQUIRED FIELDS.");
      return;
    }

    const parsed = parseFloat(amount);
    if (isNaN(parsed) || parsed <= 0) {
      setStatus("error");
      setErrorMessage("INVALID DONATION AMOUNT.");
      return;
    }

    setStatus("loading");
    setTxHash(null);
    setErrorMessage(null);

    try {
      const hash = await donate(name.trim(), parsed, address);
      
      setTxHash(hash);
      setStatus("success");
      setName("");
      setAmount("");
      setMessage("");
      
      await refreshData();
      setTimeout(() => setStatus("idle"), 8000);
    } catch (error: any) {
      console.error("Donation failed:", error);
      setStatus("error");
      setErrorMessage(error?.message?.toUpperCase() || "TRANSACTION FAILED.");
    }
  }

  return (
    <section id="donate" className="w-full bg-[#00E5FF] border-b-4 border-black">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="border-4 border-black bg-white shadow-brutal-lg">
          <div className="border-b-4 border-black bg-[#FF3300] px-8 py-6 relative overflow-hidden">
            <div className="absolute right-0 top-0 text-7xl font-black text-black opacity-10 translate-x-4 -translate-y-2">XLM</div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white relative z-10">DROP SOME XLM</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-10 bg-[#FFDE59]">
            {status === "success" && (
              <div className="border-4 border-black bg-white p-6 text-black shadow-brutal-sm">
                <div className="font-black text-xl uppercase tracking-wider mb-2">TX SUCCESS</div>
                {txHash && (
                  <a 
                    href={`https://stellar.expert/explorer/testnet/tx/${txHash}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block border-2 border-black bg-[#00E5FF] px-4 py-2 font-black uppercase hover:bg-[#FF3300] hover:text-white transition-colors text-sm"
                  >
                    VIEW ON EXPLORER: {shortenHash(txHash)}
                  </a>
                )}
              </div>
            )}

            {status === "error" && (
              <div className="border-4 border-black bg-black p-6 text-white font-black text-xl uppercase shadow-brutal-sm">
                ERROR: {errorMessage}
              </div>
            )}

            <div className="grid gap-10 sm:grid-cols-2">
              <div className="relative">
                <label htmlFor="name" className="absolute -top-3 left-4 bg-white border-2 border-black px-2 py-0.5 text-xs font-black uppercase tracking-widest text-black z-10">
                  Alias / Identifier *
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="YOUR ALIAS"
                  disabled={status === "loading"}
                  className="w-full border-4 border-black bg-white p-5 pt-6 text-xl font-black uppercase placeholder-[#AAAAAA] outline-none focus:bg-[#00E5FF] disabled:opacity-50 transition-all shadow-brutal-sm focus:shadow-brutal focus:-translate-y-1 focus:-translate-x-1"
                />
              </div>

              <div className="relative">
                <label htmlFor="amount" className="absolute -top-3 left-4 bg-white border-2 border-black px-2 py-0.5 text-xs font-black uppercase tracking-widest text-black z-10">
                  Amount (XLM) *
                </label>
                <input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="100.00"
                  disabled={status === "loading"}
                  className="w-full border-4 border-black bg-white p-5 pt-6 text-xl font-black uppercase placeholder-[#AAAAAA] outline-none focus:bg-[#00E5FF] disabled:opacity-50 transition-all shadow-brutal-sm focus:shadow-brutal focus:-translate-y-1 focus:-translate-x-1"
                />
              </div>
            </div>

            <div className="relative">
              <label htmlFor="message" className="absolute -top-3 left-4 bg-white border-2 border-black px-2 py-0.5 text-xs font-black uppercase tracking-widest text-black z-10">
                Memo (Off-chain)
              </label>
              <textarea
                id="message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="LEAVE A TRACE..."
                disabled={status === "loading"}
                className="w-full border-4 border-black bg-white p-5 pt-6 text-xl font-black uppercase placeholder-[#AAAAAA] outline-none focus:bg-[#00E5FF] disabled:opacity-50 transition-all shadow-brutal-sm focus:shadow-brutal focus:-translate-y-1 focus:-translate-x-1"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full border-4 border-black bg-[#FF3300] py-6 text-2xl font-black uppercase text-white transition-all hover:-translate-y-1 hover:-translate-x-1 hover:shadow-brutal-lg active:translate-x-0 active:translate-y-0 active:shadow-none disabled:opacity-50 disabled:hover:-translate-y-0 disabled:hover:shadow-none"
            >
              {status === "loading" ? "PROCESSING..." : !address ? "CONNECT WALLET TO PROCEED" : "EXECUTE TRANSACTION"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
