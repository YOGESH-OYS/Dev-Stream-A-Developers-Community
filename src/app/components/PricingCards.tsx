'use client'

import { useIntersectionObserver } from './useIntersectionObserver'

interface PricingCardProps {
  name: string
  price: string
  desc: string
  cta: string
  accent: string
  highlight?: boolean
}

function PricingCard({ name, price, desc, cta, accent, highlight }: PricingCardProps) {
	return (
		<div className={`group relative rounded-2xl p-6 border ${highlight ? 'border-cyan-400/30' : 'border-white/10'} bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:-translate-y-2`}> 
			{/* Enhanced glow effect */}
			<div className={`absolute -inset-0.5 rounded-2xl ${highlight ? 'bg-gradient-to-r from-fuchsia-500/20 to-cyan-500/20' : 'bg-white/5'} blur-2xl group-hover:blur-xl transition-all duration-500`} />
			
			{/* Floating particles for highlight cards */}
			{highlight && (
				<div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-fuchsia-500 to-cyan-500 rounded-full animate-pulse shadow-[0_0_20px] shadow-fuchsia-500/50" />
			)}
			
			<div className="relative">
				<div className={`text-xs uppercase tracking-widest inline-block bg-gradient-to-r ${accent} bg-clip-text text-transparent font-bold`}>{name}</div>
				<div className="mt-3 text-4xl font-extrabold text-white">{price}<span className="text-sm text-zinc-400 font-normal">/mo</span></div>
				<p className="mt-3 text-zinc-300 leading-relaxed">{desc}</p>
				
				{/* Enhanced button with perfect alignment */}
				<div className="mt-6 flex justify-center">
					<button className="group/btn relative w-full px-6 py-3 rounded-xl bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-black font-semibold shadow-[0_0_20px] shadow-cyan-500/40 hover:shadow-fuchsia-500/40 transition-all duration-300 overflow-hidden">
						{/* Button glow effect */}
						<div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-cyan-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
						
						{/* Button content */}
						<span className="relative z-10 flex items-center justify-center gap-2">
							{cta}
							<svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
							</svg>
						</span>
						
						{/* Ripple effect */}
						<div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
					</button>
				</div>
			</div>
		</div>
	)
}

export default function PricingCards() {
	const { elementRef, isIntersecting } = useIntersectionObserver()

	return (
		<div ref={elementRef} className="mt-10 grid md:grid-cols-3 gap-6">
			<div className={`transition-all duration-1000 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0ms' }}>
				<PricingCard name="Free" price="$0" desc="Basic Plan comes with create & share Codecasts, explore community" cta="Start free" accent="from-zinc-400 to-zinc-200" />
			</div>
			<div className={`transition-all duration-1000 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
				<PricingCard name="Pro" price="$12" desc="Advanced arenas, verified badges, custom sandboxes" cta="Go Pro" accent="from-fuchsia-500 to-cyan-500" highlight />
			</div>
			<div className={`transition-all duration-1000 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '400ms' }}>
				<PricingCard name="Team" price="$29" desc="Collaborative streams, org profiles.For More contact Dev-Stream support" cta="Start Team" accent="from-emerald-500 to-cyan-500" />
			</div>
		</div>
	)
}
