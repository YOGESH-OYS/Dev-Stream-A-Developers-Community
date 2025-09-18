import Link from "next/link"
import ScrollEffect from "../../ScroolEffect/scroll"
import { useEffect , useState } from "react"
import { TestimonialCarasole } from "../animated-testimonials"
import { WobbleCardDemo } from "../wobble-card"

export function IntroModal({ onClose }: { onClose: () => void }){
	const [isScrolling, setIsScrolling] = useState(false)
	
	useEffect(() => {
		let timeout: NodeJS.Timeout
		const handleScroll = () => {
			setIsScrolling(true)
			clearTimeout(timeout)
			timeout = setTimeout(() => setIsScrolling(false), 150)
		}
		
		const modal = document.getElementById('intro-modal')
		if (modal) {
			modal.addEventListener('scroll', handleScroll)
			// Focus the modal to enable keyboard and mouse wheel scrolling
			modal.focus()
			return () => {
				modal.removeEventListener('scroll', handleScroll)
				clearTimeout(timeout)
			}
		}
	}, [])

	return (
		<div className="fixed inset-0 z-[10000]">
			<ScrollEffect />
			<div className="absolute inset-0 bg-black/70 backdrop-blur-2xl" />
			<div className="absolute inset-0 pointer-events-none [background-image:radial-gradient(circle_at_20%_20%,rgba(168,85,247,.18),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(34,211,238,.18),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(16,185,129,.14),transparent_40%)]" />
			<div className="absolute inset-0 p-0">
				<div className="relative w-full h-full rounded-none border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-cyan-500/10 overflow-hidden">
					<div className="absolute -inset-0.5 bg-gradient-to-r from-fuchsia-500/20 to-cyan-500/20 blur-3xl" aria-hidden />
					<div 
						id="intro-modal"
						className="relative h-full w-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent focus:outline-none"
						tabIndex={0}
						onWheel={(e) => {
							e.currentTarget.scrollTop += e.deltaY
						}}
					>
						<div className="min-h-full flex flex-col items-center justify-center p-8 md:p-16 text-center">
							<div className="mb-5 inline-flex items-center gap-3">
								<span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-black font-bold">DS</span>
								<span className="text-4xl md:text-6xl font-extrabold bg-gradient-to-b from-white to-zinc-300 bg-clip-text text-transparent">Dev Stream</span>
							</div>
							<br />
							
							<WobbleCardDemo />
							
							{/* Testimonials Section */}
							<div className="mt-12 w-full max-w-4xl">
								<h3 className="text-2xl font-bold text-white mb-8">What developers are saying</h3>
								<TestimonialCarasole />
							</div>
							
							<div className="mt-10 flex flex-col sm:flex-row gap-4">
								<button onClick={onClose} className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-black font-semibold shadow-[0_0_30px] shadow-cyan-500/40 hover:shadow-fuchsia-500/40 transition">Get Started</button>
								<Link href="/Pages/pricing" className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/15 bg-white/5 text-white hover:bg-white/10 transition">Explore Plans</Link>
							</div>
						</div>
					</div>
							<button onClick={onClose} className="absolute bottom-6 right-6 text-sm text-zinc-400 hover:text-white transition">Skip</button>
				</div>
			</div>
		</div>
	)
}