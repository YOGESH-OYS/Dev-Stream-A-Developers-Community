'use client'
import Link from 'next/link'
import PricingCards from './components/PricingCards'
import { useState } from 'react'



	export default function Page() {
		return (
			<main>
				<NavBar />
				<HeroSection />
				<FeaturesSection />
				<ShowcaseSection />
				<CommunitySection />
				<PricingSection />
				<OutroSection />
				<Footer />
			</main>
		)
	}

	function GlowDivider() {
		return <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"></div>
	}

	function SectionWrapper({ children }: { children: React.ReactNode }) {
		return (
			<section className="relative overflow-hidden">
				<GlowParticles />
				{children}
			</section>
		)
	}

	function NavBar() {
		return (
			<div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
				<nav className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl shadow-cyan-500/10 px-6 py-3 flex items-center gap-6">
					<Link href="#features" className="text-sm text-zinc-300 hover:text-white transition">Features</Link>
					<Link href="#showcase" className="text-sm text-zinc-300 hover:text-white transition">Showcase</Link>
					<Link href="#community" className="text-sm text-zinc-300 hover:text-white transition">Community</Link>
					<Link href="#pricing" className="text-sm text-zinc-300 hover:text-white transition">Pricing</Link>
					<Link href="#pricing" className="ml-2 px-4 py-2 rounded-lg bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-black font-semibold shadow-[0_0_20px] shadow-cyan-500/40 hover:shadow-fuchsia-500/40 transition">Sign in</Link>
				</nav>
			</div>
		)
	}

	function HeroSection() {
		return (
			<SectionWrapper>
				<div className="relative min-h-[92vh] flex items-center justify-center">
					<HeroBackground />
					<div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
						<h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
							The Developer Community Reimagined
						</h1>
						<p className="mt-6 text-lg md:text-xl text-zinc-300">
							Share Code. Stream Sessions. Build Together.
						</p>
						<div className="mt-10 flex items-center justify-center gap-4">
							<Link href="#pricing" className="px-6 py-3 rounded-xl bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-black font-semibold shadow-[0_0_30px] shadow-cyan-500/40 hover:shadow-fuchsia-500/40 transition">
								Join the Beta
							</Link>
							<Link href="#features" className="px-6 py-3 rounded-xl border border-white/10 text-zinc-200 hover:bg-white/5 transition">
								Explore Features
							</Link>
						</div>
					</div>

					<div className="absolute inset-x-0 bottom-0 flex justify-center">
						<div className="h-24 w-px bg-gradient-to-b from-transparent via-fuchsia-400/60 to-transparent" />
					</div>
				</div>
			</SectionWrapper>
		)
	}

	function HeroBackground() {
		return (
			<div aria-hidden className="absolute inset-0">
				<GlowGrid />
				<div className="absolute inset-0 opacity-70">
					{/* <SplineBackground scene="https://prod.spline.design/NqR55KzOiGM0AJ1J/scene.splinecode" /> */}
				</div>
				<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(168,85,247,0.12),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(34,211,238,0.12),transparent_40%)]" />
			</div>
		)
	}

function FeaturesSection() {
	return (
		<SectionWrapper>
			<div id="features" className="relative max-w-7xl mx-auto px-6 py-28 space-y-24">
				<FeatureSplit
					title="Codecasts"
					sub="Share your build in 60 seconds"
					desc="Micro-streams you can fork. Record, publish, and let others remix your flow."
					badge="Forkable"
					align="left"
					mockup={<CodecastMockup />}
				/>
				<GlowDivider />
				<FeatureSplit
					title="Sandboxes"
					sub="One-click repros & demos"
					desc="Instant, shareable sandboxes that boot in seconds. Perfect for bug reports and examples."
					badge="Repro Ready"
					align="right"
					mockup={<SandboxMockup />}
				/>
				<GlowDivider />
				<FeatureSplit
					title="Dev Arena"
					sub="Snippets go head‑to‑head"
					desc="Community battles where code competes. Vote, fork, and crown champions."
					badge="Arena"
					align="left"
					mockup={<ArenaMockup />}
				/>
				<GlowDivider />
				<FeatureSplit
					title="Profiles"
					sub="Your dev identity, unified"
					desc="Snippets, streams, bounties: show the work that matters—all in one place."
					badge="Identity"
					align="right"
					mockup={<ProfileMockup />}
				/>
			</div>
		</SectionWrapper>
	)
}

function FeatureSplit(props: { title: string, sub: string, desc: string, badge: string, align: 'left'|'right', mockup: React.ReactNode }) {
	const isLeft = props.align === 'left'
	return (
		<div className={`grid md:grid-cols-2 gap-10 items-center ${isLeft ? '' : 'md:[&>div:first-child]:order-2'}`}>
			<div className="relative">
				<div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-cyan-300/80 border border-cyan-400/20 rounded-full px-3 py-1 bg-cyan-400/5">
					<span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
					{props.badge}
				</div>
				<h3 className="mt-4 text-3xl md:text-4xl font-bold text-white">{props.title}</h3>
				<p className="mt-3 text-zinc-300 max-w-xl">{props.desc}</p>
				<p className="mt-1 text-sm text-zinc-400">{props.sub}</p>
				<div className="mt-6 flex gap-3">
					<button className="group px-5 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-200 transition">
						Learn more
					</button>
					<button className="group px-5 py-2 rounded-lg bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-black font-semibold shadow-[0_0_20px] shadow-cyan-500/40 hover:shadow-fuchsia-500/40 transition">
						Try it
					</button>
				</div>
			</div>
			<div className="relative">
				<div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-fuchsia-500/10 to-cyan-500/10 blur-2xl" />
				<div className="relative rounded-2xl backdrop-blur-xl bg-black/30 border border-white/10 overflow-hidden">
					{props.mockup}
				</div>
			</div>
		</div>
	)
}

function ShowcaseSection() {
	return (
		<SectionWrapper>
			<div id="showcase" className="relative max-w-7xl mx-auto px-6 py-28">
				<h2 className="text-4xl font-bold">Not another feed. A developer playground.</h2>
				<p className="text-zinc-300 mt-2">Swipe through live mockups of the Dev Stream experience.</p>
				<div className="mt-10 grid md:grid-cols-3 gap-6">
					<ShowcaseCard title="Live Codecast">
						<CodecastMockup compact />
					</ShowcaseCard>
					<ShowcaseCard title="Snippet Feed">
						<FeedMockup />
					</ShowcaseCard>
					<ShowcaseCard title="Arena Poll">
						<ArenaMockup compact />
					</ShowcaseCard>
				</div>
			</div>
		</SectionWrapper>
	)
}

function ShowcaseCard({ title, children }: { title: string, children: React.ReactNode }) {
	return (
		<div className="relative rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 p-4">
			<div className="text-sm text-zinc-300 mb-3">{title}</div>
			<div className="rounded-xl overflow-hidden border border-white/10">
				{children}
			</div>
		</div>
	)
}

function CommunitySection() {
	return (
		<SectionWrapper>
			<div id="community" className="relative max-w-7xl mx-auto px-6 py-28">
				<h2 className="text-4xl font-bold">Beloved by developers</h2>
				<p className="text-zinc-300 mt-2">Floating glass cards with glowing reviews and live counters.</p>
				<div className="mt-10 grid md:grid-cols-3 gap-6">
					{[1,2,3,4,5,6].map(i => (
						<div key={i} className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-xl">
							<div className="flex items-center gap-3">
								<div className="h-10 w-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-500" />
								<div>
									<div className="font-semibold">Dev {i}</div>
									<div className="text-xs text-zinc-400">@builder{i}</div>
								</div>
							</div>
							<p className="mt-3 text-zinc-300">“Code doesn’t just live—it streams. This is how dev communities should feel.”</p>
						</div>
					))}
				</div>
				<div className="mt-12 grid md:grid-cols-3 gap-6">
					<Counter label="Codecasts Shared" value="10K+" color="from-fuchsia-500 to-cyan-500" />
					<Counter label="Sandboxes Forked" value="25K+" color="from-cyan-500 to-emerald-500" />
					<Counter label="Global Devs Onboarded" value="∞" color="from-emerald-500 to-fuchsia-500" />
				</div>
				<div className="mt-10 flex gap-2 text-xs">
					<Badge>Verified Provenance</Badge>
					<Badge>Repro Ready</Badge>
					<Badge>Arena Champion</Badge>
				</div>
			</div>
		</SectionWrapper>
	)
}

function Counter({ label, value, color }: { label: string, value: string, color: string }) {
	return (
		<div className="rounded-2xl border border-white/10 p-6 bg-white/5 backdrop-blur-xl">
			<div className={`text-4xl font-extrabold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>{value}</div>
			<div className="text-sm text-zinc-400 mt-1">{label}</div>
		</div>
	)
}

function Badge({ children }: { children: React.ReactNode }) {
	return (
		<span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300">
			<span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
			{children}
		</span>
	)
}

function PricingSection() {
	const [isYearly, setIsYearly] = useState(false)
	return (
		<SectionWrapper>
			<div id="pricing" className="relative max-w-7xl mx-auto px-6 py-28">
				  <HeaderSection isYearly={isYearly} setIsYearly={setIsYearly} />
				<PricingCards />
				
				{/* Call to Action Button Below Pricing Cards */}
				<Link href='/pricing'>
				<div className="mt-12 text-center">
					<button className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-black font-semibold text-lg shadow-[0_0_30px] shadow-cyan-500/40 hover:shadow-fuchsia-500/40 transition-all duration-300 overflow-hidden hover:scale-105">
						{/* Button glow effect */}
						<div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
						
						{/* Button content */}
						<span className="relative z-10 flex items-center justify-center gap-3">
							For More Details
							<svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
							</svg>
						</span>
						
						{/* Ripple effect */}
						<div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
					</button>
				</div>
				</Link>
			</div>
		</SectionWrapper>
	)
}


function HeaderSection({ isYearly, setIsYearly }: { isYearly: boolean, setIsYearly: (value: boolean) => void }) {
	return (
		<section className="relative py-32 text-center">
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

function OutroSection() {
	return (
		<SectionWrapper>
			<div className="relative max-w-5xl mx-auto px-6 py-32 text-center">
				<div className="relative">
					<div className="absolute inset-0 -z-10 blur-3xl opacity-40 bg-[conic-gradient(at_50%_50%,#22d3ee,transparent, #a855f7, transparent,#22d3ee)]" />
					<h2 className="mt-4 text-5xl md:text-7xl font-extrabold tracking-tight leading-tight bg-gradient-to-b from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
					@DEV-Stream
				</h2>
					<p className="mt-4 text-zinc-400 text-sm">
						Join thousands of developers already building the future
					</p>
					<div className="mt-8 flex items-center justify-center gap-4">
						<Link href="https://github.com" className="px-6 py-3 rounded-xl border border-white/10 text-zinc-200 hover:bg-white/5 transition">Follow on GitHub</Link>
						<Link href="https://github.com" className="px-6 py-3 rounded-xl border border-white/10 text-zinc-200 hover:bg-white/5 transition">Follow on LinkedIn</Link>
						<Link href="https://github.com" className="px-6 py-3 rounded-xl border border-white/10 text-zinc-200 hover:bg-white/5 transition">Follow on Threads</Link>
					</div>
				</div>
			</div>
		</SectionWrapper>
	)
}

function Footer() {
	return (
		<footer className="px-6 py-10 border-t border-white/10 text-sm text-zinc-400">
			<div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
				<div>© {new Date().getFullYear()} Dev Stream</div>
				<div className="flex items-center gap-4">
					<Link href="https://github.com">GitHub</Link>
					<Link href="#">Docs</Link>
					<Link href="#">Discord</Link>
				</div>
			</div>
		</footer>
	)
}

// ----- Mockups & Visuals -----

function GlowParticles() {
	return <div aria-hidden className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_20%_20%,rgba(168,85,247,.06),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(34,211,238,.06),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(16,185,129,.06),transparent_40%)]" />
}

function GlowGrid() {
	return (
		<div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
	)
}

function CodecastMockup({ compact }: { compact?: boolean }) {
	return (
		<div className="bg-black/60">
			<div className="flex items-center justify-between px-4 py-2 text-xs text-zinc-400 border-b border-white/10">
				<div className="flex items-center gap-2">
					<div className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
					Live Codecast
				</div>
				<div>00:58</div>
			</div>
			<pre className={`p-4 text-[12px] leading-5 text-emerald-300/90 ${compact ? 'h-40' : 'h-72'} overflow-auto`}>
{`function useDevStream() {
	const [snippets, setSnippets] = useState([])
	useEffect(() => {
		stream.subscribe(setSnippets)
		return () => stream.unsubscribe()
	}, [])
	return snippets
}`}
			</pre>
		</div>
	)
}

function SandboxMockup() {
	return (
		<div className="bg-black/60">
			<div className="px-4 py-2 text-xs text-zinc-400 border-b border-white/10">Sandbox • nextjs + ts + tailwind</div>
			<div className="grid md:grid-cols-2">
				<div className="p-4 text-cyan-300/90 text-[12px]">
					$ npm create dev-stream@latest
					<br />
					npx dev-stream sandbox
				</div>
				<div className="p-4 border-t md:border-t-0 md:border-l border-white/10 text-zinc-300 text-sm">
					Preview ready in 2.1s ⚡️
				</div>
			</div>
		</div>
	)
}

function ArenaMockup({ compact }: { compact?: boolean }) {
	return (
		<div className="bg-black/60">
			<div className="px-4 py-2 text-xs text-zinc-400 border-b border-white/10">Dev Arena • vote your champion</div>
			<div className={`grid grid-cols-2 ${compact ? '' : 'min-h-60'}`}>
				<div className="p-4">
					<div className="rounded-lg border border-white/10 p-3">
						<pre className="text-[12px] text-fuchsia-300/90">{`const s=(a,b) =>a+b`}</pre>
					</div>
					<button className="mt-3 w-full rounded-md bg-fuchsia-600/80 hover:bg-fuchsia-500 text-white py-1.5 text-sm">Vote</button>
				</div>
				<div className="p-4 border-l border-white/10">
					<div className="rounded-lg border border-white/10 p-3">
						<pre className="text-[12px] text-cyan-300/90">{`function sum(a,b){ `}</pre>
					</div>
					<button className="mt-3 w-full rounded-md bg-cyan-600/80 hover:bg-cyan-500 text-white py-1.5 text-sm">Vote</button>
				</div>
			</div>
		</div>
	)
}

function ProfileMockup() {
	return (
		<div className="bg-black/60">
			<div className="px-4 py-2 text-xs text-zinc-400 border-b border-white/10">@you • Dev Stream Profile</div>
			<div className="p-4 grid md:grid-cols-3 gap-4">
				<div className="rounded-xl border border-white/10 p-4">
					<div className="h-16 w-16 rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-500" />
					<div className="mt-3 font-semibold">You The Dev</div>
					<div className="text-xs text-zinc-400">snippets • streams • bounties</div>
				</div>
				<div className="rounded-xl border border-white/10 p-4">Recent Snippets</div>
				<div className="rounded-xl border border-white/10 p-4">Bounties</div>
			</div>
		</div>
	)
}

function FeedMockup() {
  return (
		<div className="bg-black/60">
			<div className="px-4 py-2 text-xs text-zinc-400 border-b border-white/10">Snippet Feed</div>
			<div className="p-4 grid gap-3">
				{[1,2,3].map(i => (
					<div key={i} className="rounded-xl border border-white/10 p-3">
						<pre className="text-[12px] text-emerald-300/90">console.log('hello dev stream {i}')</pre>
					</div>
				))}
			</div>
		</div>
	)
}
