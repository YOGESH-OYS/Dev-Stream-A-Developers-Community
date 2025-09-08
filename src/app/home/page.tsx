'use client'

import Link from 'next/link'
import ScrollEffect from '../components/ScroolEffect/scroll'
import { FloatingDock } from '../components/ui/floating-dock'
import { AnimatedTestimonials } from '../components/ui/animated-testimonials' 
import { useEffect, useState } from 'react'

import { RiHome9Fill } from "react-icons/ri"
import { IoIosAddCircleOutline } from "react-icons/io";
import { BiSearchAlt } from "react-icons/bi";
import { MdNotificationsActive } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

export default function HomePage() {
	async function logout() {
		await fetch('/api/logout', { method: 'POST' })
		window.location.href = '/'
	}

	const [ username , setusername ] = useState() 
	async function getuser() {
		try {
			const name = await fetch('/api/user',{method:'GET'})
			console.log(name)
			const data =await name.json();
			setusername(data.username);
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(()=>{
		try {
			getuser();
		} catch (error) {
			console.log(error)
		}
	},[])

	const [showIntro, setShowIntro] = useState(false)
	useEffect(() => {
		try {
			// Prefer cookie hint set on first login, fallback to local flag
			const hasCookie = document.cookie.split('; ').some(c => c.startsWith('ds_first_login='))
			const seenLocal = localStorage.getItem('ds_seen_intro')
			if (hasCookie || !seenLocal) setShowIntro(true)
		} catch {}
	}, [])
	useEffect(() => {
		if (showIntro) {
			const original = document.body.style.overflow
			document.body.style.overflow = 'hidden'
			return () => { document.body.style.overflow = original }
		}
	}, [showIntro])
	return (
		<main className="min-h-screen bg-black text-white overflow-x-hidden relative">
			<div className="relative z-10 w-full md:w-4/5 mx-auto px-4 md:px-0 pt-24 pb-16">
				<h1 className="text-4xl font-bold mb-4">Welcome to Dev Stream</h1>
				<h1 className="text-2xl font-bold mb-4">{username}</h1>
				<p className="text-zinc-400 mb-8">You are authenticated. This is your home.</p>
				<div className="flex gap-4">
					<Link href="/" className="px-4 py-2 rounded-lg bg-white/10 border border-white/10">Go to Landing</Link>
					<button onClick={logout} className="px-4 py-2 rounded-lg bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-black font-semibold">Logout</button>
				</div>
			</div>
			{!showIntro && <FloatingNavbar />}
			{showIntro && (
				<IntroModal onClose={() => {
					try { localStorage.setItem('ds_seen_intro', '1') } catch {}
					// Clear the hint cookie
					document.cookie = 'ds_first_login=; Max-Age=0; path=/'
					setShowIntro(false)
				}} />
			)}
		</main>
	)
}

function FloatingNavbar(){
	return(
		<main>
			<div className="fixed top-0 left-0 w-full z-[9999]">
			<ScrollEffect />
      <FloatingDock
        items={[
          { title: "Home", icon: <RiHome9Fill />, href: "/" },
          { title: "Search", icon: <BiSearchAlt />, href: "/" },
          { title: "Post", icon: <IoIosAddCircleOutline />, href: "/" },
          { title: "Notification", icon: <MdNotificationsActive />, href: "/" },
          { title: "Profile", icon: <CgProfile />, href: "/" },
        ]}
        desktopClassName="fixed bottom-4 left-1/2 -translate-x-1/2"
        mobileClassName="fixed bottom-4 right-4"
      />
			</div>
		</main>
	)
}

function TestimonialCarasole(){
	const testimonials = [
		{
			quote:
				"The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
			name: "Sarah Chen",
			designation: "Product Manager at TechFlow",
			src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		},
		{
			quote:
				"Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
			name: "Michael Rodriguez",
			designation: "CTO at InnovateSphere",
			src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		},
		{
			quote:
				"This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
			name: "Emily Watson",
			designation: "Operations Director at CloudScale",
			src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		},
		{
			quote:
				"Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
			name: "James Kim",
			designation: "Engineering Lead at DataPro",
			src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		},
		{
			quote:
				"The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
			name: "Lisa Thompson",
			designation: "VP of Technology at FutureNet",
			src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		},
	];
	return <AnimatedTestimonials testimonials={testimonials} />;
}

function IntroModal({ onClose }: { onClose: () => void }){
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
								<span className="text-sm text-zinc-300">Welcome to</span>
							</div>
							<h2 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-b from-white to-zinc-300 bg-clip-text text-transparent">Dev Stream</h2>
							<p className="mt-4 max-w-2xl text-zinc-300 text-lg leading-relaxed">
								Share Codecasts, fork Sandboxes, and build together in real time. Your profile, streams, and arenas live here.
							</p>
							<ul className="mt-8 space-y-4 text-zinc-200">
								<li className="flex items-center justify-center gap-3"><span className="h-2 w-2 rounded-full bg-cyan-400"></span><span>Create and share 60s Codecasts</span></li>
								<li className="flex items-center justify-center gap-3"><span className="h-2 w-2 rounded-full bg-fuchsia-400"></span><span>Spin up repro-ready Sandboxes</span></li>
								<li className="flex items-center justify-center gap-3"><span className="h-2 w-2 rounded-full bg-emerald-400"></span><span>Battle snippets in Dev Arena</span></li>
							</ul>
							
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

