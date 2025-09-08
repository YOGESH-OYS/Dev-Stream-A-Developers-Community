'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IntroModal } from '../components/ui/model/Intromodel'
import { FloatingNavbar } from '../components/ui/floating-dock'

interface UserData {
  username: string
  firstName: string
  lastName: string
  email: string
  linkedin?: string
  github?: string
  bio?: string
  createdAt: Date
}

interface HomePageProps {
  userData: UserData | null
}

export default function HomePage({ userData }: HomePageProps) {
  async function logout() {
    await fetch('/api/logout', { method: 'POST' })
    window.location.href = '/'
  }

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
				{userData && (
					<h1 className="text-2xl font-bold mb-4">Hello, {userData.firstName}!</h1>
				)}
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
					document.cookie = 'ds_first_login=; Max-Age=0; path=/'
					setShowIntro(false)
				}} />
			)}
		</main>
	)
}


