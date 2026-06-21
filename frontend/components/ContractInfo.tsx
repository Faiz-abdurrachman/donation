"use client";

const CONTRACT_ID = "CDNBJG3SKPFMHTDD7WRIOUYXHSH7QFFEJG64FX3O7QRKWXTYOSNKG56A";

const contractFunctions = [
  { name: "donate()", description: "Submit transaction payload" },
  { name: "get_donations()", description: "Fetch immutable ledger state" },
  { name: "get_total_donation()", description: "Aggregate XLM sum" },
  { name: "get_donation_count()", description: "Count total operations" },
];

export default function ContractInfo() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-12 border-b-8 border-black pb-4 text-center sm:text-left">
        <h2 className="text-5xl font-black uppercase tracking-tight text-white bg-black inline-block px-6 py-2 rotate-1">
          SYSTEM SPECS
        </h2>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        <div className="border-8 border-black bg-white shadow-brutal p-8 relative -rotate-1 hover:rotate-0 transition-transform">
          <div className="absolute -right-4 -top-4 bg-[#00E5FF] border-4 border-black px-4 py-2 text-xl font-black uppercase text-black rotate-6">
            Blueprint
          </div>
          
          <h3 className="mb-8 bg-[#FF3300] px-6 py-3 inline-block text-2xl font-black uppercase text-white border-4 border-black -rotate-2">
            Architecture
          </h3>

          <div className="space-y-8">
            <div>
              <p className="mb-2 text-lg font-black uppercase tracking-widest text-[#555555]">
                Contract ID
              </p>
              <div className="flex border-4 border-black bg-[#FFDE59] shadow-brutal-sm">
                <code className="flex-1 overflow-x-auto whitespace-nowrap p-4 font-mono text-lg font-bold text-black">
                  {CONTRACT_ID}
                </code>
                <button
                  onClick={() => navigator.clipboard.writeText(CONTRACT_ID)}
                  className="border-l-4 border-black bg-black px-6 text-white font-black hover:bg-[#FF3300] transition-colors text-xl"
                  title="Copy contract ID"
                >
                  COPY
                </button>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="border-4 border-black p-6 bg-[#00E5FF] shadow-brutal-sm rotate-1">
                <p className="text-sm font-black uppercase tracking-widest text-black">Network</p>
                <p className="mt-2 text-2xl font-black text-white bg-black px-2 py-1 inline-block">TESTNET</p>
              </div>

              <div className="border-4 border-black p-6 bg-[#FF3300] shadow-brutal-sm -rotate-1">
                <p className="text-sm font-black uppercase tracking-widest text-black">Runtime</p>
                <p className="mt-2 text-2xl font-black text-white bg-black px-2 py-1 inline-block">SOROBAN WASM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-8 border-black bg-[#FFDE59] shadow-brutal p-8 relative rotate-1 hover:rotate-0 transition-transform">
          <div className="absolute -left-4 -top-4 bg-white border-4 border-black px-4 py-2 text-xl font-black uppercase text-black -rotate-6">
            Endpoints
          </div>

          <h3 className="mb-8 bg-black px-6 py-3 inline-block text-2xl font-black uppercase text-white border-4 border-white rotate-2">
            Exposed APIs
          </h3>

          <div className="space-y-6">
            {contractFunctions.map((fn) => (
              <div
                key={fn.name}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-4 border-black pb-4 last:border-b-0 last:pb-0"
              >
                <code className="bg-white border-4 border-black px-4 py-2 font-mono text-lg font-black text-[#FF3300] shadow-brutal-sm hover:translate-x-1 transition-transform">
                  {fn.name}
                </code>
                <p className="text-lg font-bold uppercase text-black sm:text-right bg-white/50 px-2">
                  {fn.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
