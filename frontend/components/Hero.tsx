export default function Hero() {
  return (
    <section className="border-b-8 border-black bg-transparent">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8 relative">
            <div className="absolute -top-10 -left-6 z-[-1] h-32 w-32 rounded-full border-8 border-black bg-[#FF3300]" />
            
            <div className="mb-6 inline-flex rotate-3 border-4 border-black bg-[#00E5FF] px-4 py-2 text-lg font-black uppercase tracking-widest text-black shadow-brutal-sm transition-transform hover:-rotate-3 hover:scale-110">
              Built on Soroban
            </div>
            
            <h1 className="text-6xl font-black uppercase leading-[1.0] tracking-tighter text-black sm:text-7xl lg:text-[7rem]">
              Throw <br/> 
              <span className="bg-[#FFDE59] px-4 text-[#FF3300] border-4 border-black inline-block -rotate-1 hover:rotate-2 transition-transform">Money</span><br/>
              At The Chain.
            </h1>
            
            <p className="mt-8 max-w-2xl text-2xl font-bold text-black sm:text-3xl border-l-8 border-[#FF3300] pl-6 bg-white border-4 border-r-black border-y-black border-r-8 border-b-8 p-4 shadow-brutal -rotate-1">
              No middlemen. No boring dashboards. Just pure, immutable, on-chain chaos.
            </p>
          </div>
          
          <div className="lg:col-span-4 flex flex-col gap-8">
            <a
              href="#donate"
              className="group relative flex w-full items-center justify-between border-8 border-black bg-[#FF3300] px-8 py-8 text-3xl font-black uppercase text-white transition-all hover:-translate-y-2 hover:-translate-x-2 hover:shadow-brutal-lg active:translate-x-0 active:translate-y-0 active:shadow-none hover:rotate-2"
            >
              <span>FEED THE CHAIN</span>
            </a>
            
            <a
              href="#history"
              className="group flex w-full items-center justify-between border-8 border-black bg-white px-8 py-8 text-3xl font-black uppercase text-black transition-all hover:-translate-y-2 hover:-translate-x-2 hover:shadow-brutal-lg active:translate-x-0 active:translate-y-0 active:shadow-none hover:-rotate-2"
            >
              <span>SNOOP AROUND</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
