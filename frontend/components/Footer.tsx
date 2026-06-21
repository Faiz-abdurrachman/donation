export default function Footer() {
  return (
    <footer className="border-t-8 border-black bg-[#FF3300] text-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          {/* Subtle pattern for footer */}
          <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
        </div>

        <div className="flex flex-col items-center justify-between gap-10 sm:flex-row relative z-10">
          <div className="flex items-center gap-4 text-2xl font-black uppercase tracking-widest bg-black px-6 py-3 -rotate-2 hover:rotate-1 transition-transform border-4 border-white">
            <span className="flex h-10 w-10 items-center justify-center border-4 border-black bg-[#00E5FF] text-black text-3xl">
              S
            </span>
            <span className="text-[#FFDE59]">Built on Stellar</span>
          </div>
          <div className="text-xl font-black uppercase tracking-widest text-black bg-[#FFDE59] px-6 py-3 border-4 border-black rotate-1 hover:-rotate-1 transition-transform">
            Donation Tracker &copy; {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </footer>
  );
}
