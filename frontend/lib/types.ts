export interface Donation {
  id: string;
  donor: string;
  amount: number;
  message?: string;
  timestamp: Date;
  txHash: string;
}

export interface DashboardStats {
  totalDonation: number;
  donationCount: number;
  lastDonation: Donation | null;
}
