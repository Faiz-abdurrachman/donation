"use client";

import { useBlockchain } from "./BlockchainProvider";
import { formatXlm } from "@/lib/utils";

export default function DonationsTable() {
  const { donations, isLoading } = useBlockchain();

  return (
    <section id="history" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col sm:flex-row items-center justify-between border-b-4 border-black pb-4 gap-4">
        <h2 className="text-4xl font-black uppercase tracking-tight text-black bg-white inline-block border-2 border-black px-4 py-1">
          THE LEDGER
        </h2>
        <div className="flex items-center gap-2 border-2 border-black bg-[#FFDE59] px-3 py-1 shadow-brutal-sm">
          <span className="flex h-3 w-3 animate-ping bg-[#FF3300] border border-black" />
          <span className="text-sm font-black uppercase tracking-widest text-black">
            Live Feed
          </span>
        </div>
      </div>

      <div className="border-4 border-black bg-white shadow-brutal-lg overflow-hidden p-2 sm:p-6">
        <div className="border-2 border-black bg-white overflow-x-auto shadow-brutal-sm">
          <table className="w-full text-left text-sm whitespace-nowrap border-collapse">
            <thead className="bg-[#00E5FF] border-b-4 border-black">
              <tr>
                <th className="px-6 py-4 border-r-2 border-black font-black uppercase text-black">ID</th>
                <th className="px-6 py-4 border-r-2 border-black font-black uppercase text-black">Alias</th>
                <th className="px-6 py-4 border-r-2 border-black font-black uppercase text-black">Amount (XLM)</th>
                <th className="px-6 py-4 font-black uppercase text-black">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-black font-mono font-bold text-black bg-white">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-lg font-black uppercase text-[#555555]">
                    FETCHING DATA...
                  </td>
                </tr>
              ) : donations.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-lg font-black uppercase text-[#FF3300]">
                    NO TRANSACTIONS YET
                  </td>
                </tr>
              ) : (
                donations.map((d, i) => (
                  <tr key={i} className="hover:bg-[#FFDE59] transition-colors group">
                    <td className="px-6 py-4 border-r-2 border-black">#{d.id}</td>
                    <td className="px-6 py-4 border-r-2 border-black uppercase text-black">
                      <span className="bg-[#00E5FF] border-2 border-black px-2 py-0.5 text-black shadow-brutal-sm group-hover:bg-[#FF3300] group-hover:text-white transition-colors">{d.donor}</span>
                    </td>
                    <td className="px-6 py-4 border-r-2 border-black text-[#FF3300] text-xl">
                      {formatXlm(d.amount).split(" ")[0]}
                    </td>
                    <td className="px-6 py-4 text-[#555555] group-hover:text-black">
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
