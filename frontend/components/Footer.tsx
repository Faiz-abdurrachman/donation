export default function Footer() {
  return (
    <footer className="border-t-4 border-black bg-[#FF3300] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-3 text-xl font-black uppercase tracking-widest bg-black px-4 py-2 border-2 border-white">
            <span className="flex h-8 w-8 items-center justify-center border-2 border-black bg-[#00E5FF] text-black text-xl">
              S
            </span>
            <span className="text-[#FFDE59]">Built on Stellar</span>
          </div>
          <div className="text-sm font-black uppercase tracking-widest text-black bg-[#FFDE59] px-4 py-2 border-2 border-black">
            Donation Tracker &copy; {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </footer>
  );
}
