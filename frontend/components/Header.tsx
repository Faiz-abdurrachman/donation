"use client";

import { useBlockchain } from "./BlockchainProvider";

export default function Header() {
  const { address, connect, isWalletInstalled } = useBlockchain();

  function shortenAddress(addr: string) {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  }

  return (
    <header className="sticky top-0 z-50 border-b-8 border-black bg-[#00E5FF] px-4 py-4 sm:px-6 lg:px-8 shadow-brutal-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-3 transition-transform hover:scale-105 hover:-rotate-3">
          <div className="flex h-12 w-12 items-center justify-center border-4 border-black bg-[#FF3300] shadow-brutal-sm">
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={4}
            >
              <path
                strokeLinecap="square"
                strokeLinejoin="miter"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <span className="text-2xl font-black uppercase tracking-tighter text-black">
            Stellar<span className="text-white drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">Zap</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 border-4 border-black bg-[#FFDE59] px-3 py-1.5 text-xs font-black uppercase text-black shadow-brutal-sm sm:flex rotate-2 hover:rotate-0 transition-transform">
            <span className="h-3 w-3 animate-ping bg-[#FF3300] border-2 border-black" />
            Testnet Mode
          </div>

          {!isWalletInstalled ? (
            <a
              href="https://freighter.app"
              target="_blank"
              rel="noreferrer"
              className="border-4 border-black bg-[#FF3300] px-5 py-2.5 text-lg font-black uppercase text-white transition-all hover:-translate-y-1 hover:-translate-x-1 hover:shadow-brutal active:translate-x-0 active:translate-y-0 active:shadow-none -rotate-1"
            >
              Get Freighter
            </a>
          ) : address ? (
            <div className="border-4 border-black bg-white px-5 py-2.5 text-lg font-black uppercase text-black shadow-brutal hover:bg-[#FFDE59] transition-colors cursor-pointer">
              {shortenAddress(address)}
            </div>
          ) : (
            <button
              onClick={connect}
              className="border-4 border-black bg-[#FFDE59] px-5 py-2.5 text-lg font-black uppercase text-black transition-all hover:-translate-y-1 hover:-translate-x-1 hover:shadow-brutal active:translate-x-0 active:translate-y-0 active:shadow-none hover:-rotate-2"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
