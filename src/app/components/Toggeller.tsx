'use client'

export default function HeaderSection({ isYearly, setIsYearly }: { isYearly: boolean, setIsYearly: (value: boolean) => void }) {
	return (
		<section className="relative py-10 text-center">
			<div className="relative z-10">
				<h2 className="mt-4 text-5xl md:text-7xl font-extrabold tracking-tight leading-tight bg-gradient-to-b from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
					Build without limits.
				</h2>
				
				{/* Billing Toggle */}
				<div className="mt-12 flex items-center justify-center gap-4">
          

          {/* Toggle Pill */}
          <div className="relative w-20 h-10 flex items-center justify-center ml-20">
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="absolute inset-0 rounded-full bg-white/10 border border-white/10
                        hover:bg-white/20 transition-colors duration-300 focus:outline-none"
            >
              <span
                className={`absolute top-1 left-1 h-8 w-8 rounded-full
                            bg-gradient-to-r from-fuchsia-500 to-cyan-500 
                            shadow-[0_0_20px] shadow-fuchsia-500/30
                            transition-transform duration-300
                            ${isYearly ? 'translate-x-10' : 'translate-x-0'}`}
              />
            </button>
          </div>
          <span
            className={`text-lg font-medium transition-colors ${
              !isYearly ? 'text-white' : 'text-zinc-400'
            }`}
          >
            Monthly
          </span>

          <span
            className={`text-lg font-medium transition-colors ${
              isYearly ? 'text-white' : 'text-zinc-500'
            }`}
          >
            Yearly
          </span>

          {/* Badge with fixed space */}
          <div className="w-[90px] flex justify-center">
            {isYearly && (
              <div className="px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 text-sm text-emerald-300 font-medium">
                Save 20%
              </div>
            )}
          </div>
        </div>
			</div>
		</section>
	)
}