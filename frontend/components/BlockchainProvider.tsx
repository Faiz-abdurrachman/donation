"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { isAllowed, requestAccess, getAddress } from "@stellar/freighter-api";
import { getDonations, getTotalDonation, getDonationCount } from "@/lib/stellar";
import type { Donation, DashboardStats } from "@/lib/types";

interface BlockchainContextType {
  address: string | null;
  isWalletInstalled: boolean;
  connect: () => Promise<void>;
  donations: Donation[];
  stats: DashboardStats;
  refreshData: () => Promise<void>;
  isLoading: boolean;
}

const BlockchainContext = createContext<BlockchainContextType | null>(null);

export function useBlockchain() {
  const ctx = useContext(BlockchainContext);
  if (!ctx) throw new Error("useBlockchain must be used within a BlockchainProvider");
  return ctx;
}

export function BlockchainProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [isWalletInstalled, setIsWalletInstalled] = useState(true);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalDonation: 0,
    donationCount: 0,
    lastDonation: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  async function checkWallet() {
    try {
      const allowed = await isAllowed();
      setIsWalletInstalled(true);
      if (allowed) {
        const pubKey = await getAddress();
        if (typeof pubKey === "string") {
          setAddress(pubKey);
        } else if (pubKey && (pubKey as any).address) {
          setAddress((pubKey as any).address);
        }
      }
    } catch (e) {
      console.warn("Wallet check failed:", e);
      setIsWalletInstalled(false);
    }
  }

  async function connect() {
    try {
      const pubKey = await requestAccess();
      if (typeof pubKey === "string") {
        setAddress(pubKey);
      } else if (pubKey && (pubKey as any).address) {
        setAddress((pubKey as any).address);
      }
    } catch (e) {
      console.error("Failed to connect wallet:", e);
      alert("Failed to connect wallet. Please ensure Freighter is installed and unlocked.");
    }
  }

  async function refreshData() {
    setIsLoading(true);
    try {
      const [dList, tDonation, dCount] = await Promise.all([
        getDonations(),
        getTotalDonation(),
        getDonationCount(),
      ]);

      setDonations(dList);
      setStats({
        totalDonation: tDonation,
        donationCount: dCount,
        lastDonation: dList.length > 0 ? dList[0] : null,
      });
    } catch (e) {
      console.error("Failed to fetch data from blockchain:", e);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    checkWallet();
    refreshData();
  }, []);

  return (
    <BlockchainContext.Provider
      value={{
        address,
        isWalletInstalled,
        connect,
        donations,
        stats,
        refreshData,
        isLoading,
      }}
    >
      {children}
    </BlockchainContext.Provider>
  );
}
