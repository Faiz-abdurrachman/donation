"use client";

import { CONTRACT_ID, NETWORK_NAME } from "@/lib/stellar";

const contractFunctions = [
  { name: "donate()", description: "Submit transaction payload" },
  { name: "get_donations()", description: "Fetch immutable ledger state" },
  { name: "get_total_donation()", description: "Aggregate XLM sum" },
  { name: "get_donation_count()", description: "Count total operations" },
];

export default function ContractInfo() {
  return (
    <section className="w-full bg-black border-b-4 border-black">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-12 pb-4 text-center sm:text-left">
          <h2 className="text-4xl font-black uppercase tracking-tight text-black bg-[#FFDE59] inline-block px-6 py-2 shadow-brutal-sm">
            SYSTEM SPECS
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="border-4 border-black bg-white shadow-brutal p-8 relative transition-transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-brutal-lg">
            <div className="absolute -right-3 -top-3 bg-[#00E5FF] border-2 border-black px-3 py-1 text-sm font-black uppercase text-black rotate-3 shadow-brutal-sm">
              Blueprint
            </div>
            
            <h3 className="mb-6 bg-[#FF3300] px-4 py-2 inline-block text-xl font-black uppercase text-white border-2 border-black">
              Architecture
            </h3>

            <div className="space-y-6">
              <div>
                <p className="mb-2 text-sm font-black uppercase tracking-widest text-[#555555]">
                  Contract ID
                </p>
                <div className="flex border-2 border-black bg-[#FFDE59] shadow-brutal-sm">
                  <code className="flex-1 overflow-x-auto whitespace-nowrap p-3 font-mono text-sm font-bold text-black">
                    {CONTRACT_ID}
                  </code>
                  <button
                    onClick={() => navigator.clipboard.writeText(CONTRACT_ID)}
                    className="border-l-2 border-black bg-black px-4 text-white font-black hover:bg-[#FF3300] transition-colors text-sm"
                    title="Copy contract ID"
                  >
                    COPY
                  </button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="border-2 border-black p-4 bg-[#00E5FF] shadow-brutal-sm">
                <p className="text-xs font-black uppercase tracking-widest text-black">Network</p>
                <p className="mt-1 text-lg font-black text-white bg-black px-2 py-0.5 inline-block">{NETWORK_NAME}</p>
              </div>

                <div className="border-2 border-black p-4 bg-[#FF3300] shadow-brutal-sm">
                  <p className="text-xs font-black uppercase tracking-widest text-black">Runtime</p>
                  <p className="mt-1 text-lg font-black text-white bg-black px-2 py-0.5 inline-block">SOROBAN WASM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-4 border-black bg-[#FFDE59] shadow-brutal p-8 relative transition-transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-brutal-lg">
            <div className="absolute -left-3 -top-3 bg-white border-2 border-black px-3 py-1 text-sm font-black uppercase text-black -rotate-3 shadow-brutal-sm">
              Endpoints
            </div>

            <h3 className="mb-6 bg-black px-4 py-2 inline-block text-xl font-black uppercase text-white border-2 border-white">
              Exposed APIs
            </h3>

            <div className="space-y-4">
              {contractFunctions.map((fn) => (
                <div
                  key={fn.name}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-black pb-3 last:border-b-0 last:pb-0"
                >
                  <code className="bg-white border-2 border-black px-3 py-1 font-mono text-sm font-black text-[#FF3300] shadow-brutal-sm hover:translate-x-1 transition-transform">
                    {fn.name}
                  </code>
                  <p className="text-sm font-bold uppercase text-black sm:text-right bg-white/50 px-2 py-0.5">
                    {fn.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
