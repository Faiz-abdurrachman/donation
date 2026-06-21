"use client";

import { useBlockchain } from "./BlockchainProvider";
import { formatXlm } from "@/lib/utils";

export default function DonationsTable() {
  const { donations, isLoading } = useBlockchain();

  return (
    <section id="history" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 flex flex-col sm:flex-row items-center justify-between border-b-8 border-black pb-6 gap-6">
        <h2 className="text-5xl font-black uppercase tracking-tight text-black bg-white inline-block border-4 border-black px-6 py-2 -rotate-2">
          THE LEDGER
        </h2>
        <div className="flex items-center gap-3 border-4 border-black bg-[#FFDE59] px-4 py-2 shadow-brutal-sm rotate-1">
          <span className="flex h-4 w-4 animate-ping bg-[#FF3300] border-2 border-black" />
          <span className="text-lg font-black uppercase tracking-widest text-black">
            Live Feed
          </span>
        </div>
      </div>

      <div className="border-8 border-black bg-[#00E5FF] shadow-brutal-lg overflow-hidden rotate-1 hover:rotate-0 transition-transform p-4 sm:p-8">
        <div className="border-4 border-black bg-white overflow-x-auto">
          <table className="w-full text-left text-base whitespace-nowrap border-collapse">
            <thead className="bg-[#FFDE59] border-b-8 border-black">
              <tr>
                <th className="px-6 py-5 border-r-4 border-black font-black uppercase text-xl text-black">ID</th>
                <th className="px-6 py-5 border-r-4 border-black font-black uppercase text-xl text-black">Alias</th>
                <th className="px-6 py-5 border-r-4 border-black font-black uppercase text-xl text-black">Amount (XLM)</th>
                <th className="px-6 py-5 font-black uppercase text-xl text-black">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y-4 divide-black font-mono font-bold text-lg text-black">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-2xl font-black uppercase bg-white">
                    FETCHING DATA...
                  </td>
                </tr>
              ) : donations.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-2xl font-black uppercase bg-white text-[#FF3300]">
                    NO TRANSACTIONS YET
                  </td>
                </tr>
              ) : (
                donations.map((d, i) => (
                  <tr key={i} className="hover:bg-[#FFDE59] transition-colors group">
                    <td className="px-6 py-6 border-r-4 border-black">#{d.id}</td>
                    <td className="px-6 py-6 border-r-4 border-black uppercase text-[#00E5FF] group-hover:text-black">
                      <span className="bg-black text-[#00E5FF] px-2 py-1 group-hover:bg-[#FF3300] group-hover:text-white transition-colors">{d.donor}</span>
                    </td>
                    <td className="px-6 py-6 border-r-4 border-black text-[#FF3300] text-2xl">
                      {formatXlm(d.amount).split(" ")[0]}
                    </td>
                    <td className="px-6 py-6 text-[#555555] group-hover:text-black">
                      {new Intl.DateTimeFormat('en-US', {
                        month: 'short',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      }).format(d.timestamp)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
