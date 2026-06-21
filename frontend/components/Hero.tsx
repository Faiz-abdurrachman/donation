export default function Hero() {
  return (
    <section className="border-b-4 border-black bg-transparent">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8 relative">
            {/* Playful background element */}
            <div className="absolute -top-12 -left-8 z-[-1] h-32 w-32 rounded-full border-4 border-black bg-[#FF3300] opacity-90" />
            
            <div className="mb-6 inline-flex rotate-2 border-2 border-black bg-[#00E5FF] px-4 py-1.5 text-sm font-black uppercase tracking-widest text-black shadow-brutal-sm transition-transform hover:-rotate-1">
              Built on Soroban
            </div>
            
            <h1 className="text-6xl font-black uppercase leading-[1.0] tracking-tighter text-black sm:text-7xl lg:text-[6.5rem]">
              Throw <br/> 
              <span className="bg-[#FFDE59] px-3 text-[#FF3300] border-4 border-black inline-block mt-2 mb-2 shadow-brutal-sm hover:translate-x-2 transition-transform">Money</span><br/>
              At The Chain.
            </h1>
            
            <p className="mt-10 max-w-2xl text-xl font-bold text-black sm:text-2xl border-l-4 border-[#FF3300] pl-6">
              No middlemen. No boring dashboards. <br/> Just pure, immutable, on-chain mechanics.
            </p>
          </div>
          
          <div className="lg:col-span-4 flex flex-col gap-6">
            <a
              href="#donate"
              className="group flex w-full justify-center border-4 border-black bg-[#FF3300] px-8 py-6 text-2xl font-black uppercase text-white transition-all hover:-translate-y-1 hover:-translate-x-1 hover:shadow-brutal-lg active:translate-x-0 active:translate-y-0 active:shadow-none"
            >
              FEED THE CHAIN
            </a>
            
            <a
              href="#history"
              className="group flex w-full justify-center border-4 border-black bg-white px-8 py-6 text-2xl font-black uppercase text-black transition-all hover:-translate-y-1 hover:-translate-x-1 hover:shadow-brutal-lg active:translate-x-0 active:translate-y-0 active:shadow-none"
            >
              SNOOP AROUND
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
