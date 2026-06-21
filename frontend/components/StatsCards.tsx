"use client";

import { useBlockchain } from "./BlockchainProvider";
import { formatXlm } from "@/lib/utils";

export default function StatsCards() {
  const { stats, isLoading } = useBlockchain();

  return (
    <section id="stats" className="w-full bg-white border-y-4 border-black">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Card 1 */}
          <div className="relative border-4 border-black bg-[#00E5FF] p-8 transition-transform hover:-translate-y-1 hover:-translate-x-1 shadow-brutal hover:shadow-brutal-lg">
            <div className="absolute -right-4 -top-4 bg-white border-2 border-black px-4 py-1 text-xl font-black uppercase text-black rotate-6 shadow-brutal-sm">
              #01
            </div>
            <h3 className="text-xl font-black uppercase tracking-widest text-black bg-white inline-block border-2 border-black px-4 py-1 shadow-brutal-sm">
              Total Loot
            </h3>
            <div className="mt-8 flex items-baseline gap-2 bg-white border-4 border-black p-6">
              <span className="text-6xl font-black tracking-tighter text-black sm:text-7xl leading-none">
                {isLoading ? "???" : formatXlm(stats.totalDonation).split(" ")[0]}
              </span>
              <span className="text-3xl font-black text-[#FF3300] uppercase">
                XLM
              </span>
            </div>
            <div className="mt-8 border-t-4 border-black pt-4 text-lg font-black uppercase text-black text-center">
              VERIFIED ON-CHAIN
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative border-4 border-black bg-[#FF3300] p-8 transition-transform hover:-translate-y-1 hover:-translate-x-1 shadow-brutal hover:shadow-brutal-lg mt-4 lg:mt-0">
            <div className="absolute -left-4 -top-4 bg-[#FFDE59] border-2 border-black px-4 py-1 text-xl font-black uppercase text-black -rotate-6 shadow-brutal-sm">
              #02
            </div>
            <h3 className="text-xl font-black uppercase tracking-widest text-black bg-[#FFDE59] inline-block border-2 border-black px-4 py-1 shadow-brutal-sm">
              Unique Donors
            </h3>
            <div className="mt-8 flex items-baseline gap-2 bg-white border-4 border-black p-6">
              <span className="text-6xl font-black tracking-tighter text-black sm:text-7xl leading-none">
                {isLoading ? "???" : stats.donationCount}
              </span>
              <span className="text-3xl font-black text-[#00E5FF] uppercase">
                TXs
              </span>
            </div>
            <div className="mt-8 border-t-4 border-black pt-4 text-lg font-black uppercase text-white text-center">
              GLOBAL PARTICIPATION
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
