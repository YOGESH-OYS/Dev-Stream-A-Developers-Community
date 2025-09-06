'use client'

import Link from 'next/link'
import ScrollEffect from '../components/ScroolEffect/scroll'
import { FloatingDock } from '../components/ui/floating-dock'
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
	return (
		<main className="min-h-screen bg-black text-white overflow-x-hidden relative">
			<FloatingNavbar />
			<div className="relative z-10 w-full md:w-4/5 mx-auto px-4 md:px-0 pt-24 pb-16">
				<h1 className="text-4xl font-bold mb-4">Welcome to Dev Stream</h1>
				<p className="text-zinc-400 mb-8">You are authenticated. This is your home.</p>
				<div className="flex gap-4">
					<Link href="/" className="px-4 py-2 rounded-lg bg-white/10 border border-white/10">Go to Landing</Link>
					<button onClick={logout} className="px-4 py-2 rounded-lg bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-black font-semibold">Logout</button>
				</div>
			</div>
		</main>
	)
}

function FloatingNavbar(){
	return(
		<main>
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
		</main>
	)
}

