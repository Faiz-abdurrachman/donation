"use client";

import { useBlockchain } from "./BlockchainProvider";
import { formatXlm } from "@/lib/utils";

export default function StatsCards() {
  const { stats, isLoading } = useBlockchain();

  return (
    <section id="stats" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="relative border-8 border-black bg-[#00E5FF] p-8 transition-transform hover:-translate-y-2 hover:-translate-x-2 shadow-brutal-lg -rotate-2 hover:rotate-0">
          <div className="absolute -right-6 -top-6 bg-white border-8 border-black px-6 py-2 text-2xl font-black uppercase text-black rotate-6 hover:animate-spin">
            #01
          </div>
          <h3 className="text-2xl font-black uppercase tracking-widest text-black bg-white inline-block border-4 border-black px-4 py-1">
            Total Loot
          </h3>
          <div className="mt-8 flex items-baseline gap-2 bg-white border-8 border-black p-4 -rotate-1">
            <span className="text-7xl font-black tracking-tighter text-black lg:text-[7rem] leading-none">
              {isLoading ? "???" : formatXlm(stats.totalDonation).split(" ")[0]}
            </span>
            <span className="text-4xl font-black text-[#FF3300] uppercase">
              XLM
            </span>
          </div>
          <div className="mt-8 border-t-8 border-black pt-4 text-xl font-black uppercase text-black text-center">
            VERIFIED ON-CHAIN
          </div>
        </div>

        <div className="relative border-8 border-black bg-[#FF3300] p-8 transition-transform hover:-translate-y-2 hover:-translate-x-2 shadow-brutal-lg rotate-2 hover:rotate-0 mt-8 lg:mt-0">
          <div className="absolute -left-6 -top-6 bg-[#FFDE59] border-8 border-black px-6 py-2 text-2xl font-black uppercase text-black -rotate-6 hover:animate-bounce">
            #02
          </div>
          <h3 className="text-2xl font-black uppercase tracking-widest text-black bg-[#FFDE59] inline-block border-4 border-black px-4 py-1">
            Unique Donors
          </h3>
          <div className="mt-8 flex items-baseline gap-2 bg-white border-8 border-black p-4 rotate-1">
            <span className="text-7xl font-black tracking-tighter text-black lg:text-[7rem] leading-none">
              {isLoading ? "???" : stats.donationCount}
            </span>
            <span className="text-4xl font-black text-[#00E5FF] uppercase">
              TXs
            </span>
          </div>
          <div className="mt-8 border-t-8 border-black pt-4 text-xl font-black uppercase text-white text-center">
            GLOBAL PARTICIPATION
          </div>
        </div>
      </div>
    </section>
  );
}
