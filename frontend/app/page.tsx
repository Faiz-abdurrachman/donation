import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsCards from "@/components/StatsCards";
import DonationForm from "@/components/DonationForm";
import DonationsTable from "@/components/DonationsTable";
import ContractInfo from "@/components/ContractInfo";
import Footer from "@/components/Footer";
import { BlockchainProvider } from "@/components/BlockchainProvider";

export default function Home() {
  return (
    <BlockchainProvider>
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1">
          <Hero />
          <StatsCards />
          <DonationForm />
          <DonationsTable />
          <ContractInfo />
        </main>
        <Footer />
      </div>
    </BlockchainProvider>
  );
}
