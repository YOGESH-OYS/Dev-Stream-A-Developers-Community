'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function RegisterPage() {
	return (
		<main className="min-h-screen bg-black text-white overflow-x-hidden relative">
			{/* Background Elements - Same as Landing Page */}
			<GlowParticles />
			<GlowGrid />
			<HeroBackground />
			
			{/* Navigation */}
			<NavBar />
			
			{/* Content Container */}
			<div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-24">
				<div className="w-full max-w-2xl">
					{/* Logo & Header */}
					<div className="text-center mb-8">
						<div className="inline-block p-3 rounded-2xl bg-gradient-to-r from-fuchsia-500/20 to-cyan-500/20 border border-fuchsia-500/30 mb-4">
							<div className="w-12 h-12 rounded-xl bg-gradient-to-r from-fuchsia-500 to-cyan-500 flex items-center justify-center">
								<svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
									<path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
								</svg>
							</div>
						</div>
						<h1 className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
							Join Dev Stream
						</h1>
						<p className="mt-2 text-zinc-400">
							Start building with the community
						</p>
					</div>

					{/* Registration Form */}
					<RegisterForm />

					{/* Toggle to Login */}
					<div className="mt-8 text-center">
						<p className="text-zinc-400">
							Already have an account?{' '}
							<Link href="/Pages/login" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
								Sign In
							</Link>
						</p>
					</div>

					{/* Social Registration */}
					<div className="mt-8">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-white/10" />
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-black text-zinc-400">Or continue with</span>
							</div>
						</div>

						<div className="mt-6 grid grid-cols-2 gap-3">
							<button className="flex items-center justify-center px-4 py-2 border border-white/10 rounded-xl hover:bg-white/5 hover:shadow-[0_0_15px] hover:shadow-cyan-500/30 transition-all duration-300">
								<svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
									<path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
									<path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
									<path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
									<path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
								</svg>
								Google
							</button>
							<button className="flex items-center justify-center px-4 py-2 border border-white/10 rounded-xl hover:bg-white/5 hover:shadow-[0_0_15px] hover:shadow-cyan-500/30 transition-all duration-300">
								<svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
									<path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
								</svg>
								LinkedIn
							</button>
						</div>
					</div>

					{/* Footer Links */}
					<div className="mt-8 text-center text-sm text-zinc-500">
						<Link href="/terms" className="hover:text-white transition-colors">
							Terms of Service
						</Link>
						<span className="mx-2">•</span>
						<Link href="/privacy" className="hover:text-white transition-colors">
							Privacy Policy
						</Link>
					</div>
				</div>
			</div>
		</main>
	)
}

function RegisterForm() {
	return (
		<form className="space-y-4">
			{/* Personal Information */}
			<div className="grid md:grid-cols-2 gap-4">
				<div>
					<label htmlFor="firstName" className="block text-sm font-medium text-zinc-300 mb-2">
						First Name
					</label>
					<input
						type="text"
						id="firstName"
						name="firstName"
						required
						className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 text-white placeholder-zinc-400"
						placeholder="John"
					/>
				</div>
				<div>
					<label htmlFor="lastName" className="block text-sm font-medium text-zinc-300 mb-2">
						Last Name
					</label>
					<input
						type="text"
						id="lastName"
						name="lastName"
						required
						className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 text-white placeholder-zinc-400"
						placeholder="Doe"
					/>
				</div>
			</div>

			{/* Platform Identity */}
			<div className="grid md:grid-cols-2 gap-4">
				<div>
					<label htmlFor="username" className="block text-sm font-medium text-zinc-300 mb-2">
						Username
					</label>
					<input
						type="text"
						id="username"
						name="username"
						required
						className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 text-white placeholder-zinc-400"
						placeholder="johndoe"
					/>
				</div>
				<div>
					<label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
						Email Address
					</label>
					<input
						type="email"
						id="email"
						name="email"
						required
						className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 text-white placeholder-zinc-400"
						placeholder="you@example.com"
					/>
				</div>
			</div>

			{/* Social Media Profiles */}
			<div className="grid md:grid-cols-2 gap-4">
				<div>
					<label htmlFor="linkedin" className="block text-sm font-medium text-zinc-300 mb-2">
						LinkedIn Profile
					</label>
					<input
						type="url"
						id="linkedin"
						name="linkedin"
						className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 text-white placeholder-zinc-400"
						placeholder="https://linkedin.com/in/username"
					/>
				</div>
				<div>
					<label htmlFor="github" className="block text-sm font-medium text-zinc-300 mb-2">
						GitHub Profile
					</label>
					<input
						type="url"
						id="github"
						name="github"
						className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 text-white placeholder-zinc-400"
						placeholder="https://github.com/username"
					/>
				</div>
			</div>

			{/* Bio */}
			<div>
				<label htmlFor="bio" className="block text-sm font-medium text-zinc-300 mb-2">
					Bio
				</label>
				<textarea
					id="bio"
					name="bio"
					rows={3}
					className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 text-white placeholder-zinc-400 resize-none"
					placeholder="Tell us about yourself and your coding journey..."
				/>
			</div>

			{/* Security */}
			<div className="grid md:grid-cols-2 gap-4">
				<div>
					<label htmlFor="password" className="block text-sm font-medium text-zinc-300 mb-2">
						Password
					</label>
					<input
						type="password"
						id="password"
						name="password"
						required
						className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 text-white placeholder-zinc-400"
						placeholder="••••••••"
					/>
				</div>
				<div>
					<label htmlFor="confirmPassword" className="block text-sm font-medium text-zinc-300 mb-2">
						Confirm Password
					</label>
					<input
						type="password"
						id="confirmPassword"
						name="confirmPassword"
						required
						className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 text-white placeholder-zinc-400"
						placeholder="••••••••"
					/>
				</div>
			</div>

			{/* Terms Agreement */}
			<div className="flex items-start">
				<input
					type="checkbox"
					id="terms"
					name="terms"
					required
					className="w-4 h-4 text-cyan-500 bg-white/5 border-white/10 rounded focus:ring-cyan-500/50 focus:ring-offset-0 mt-1"
				/>
				<label htmlFor="terms" className="ml-2 text-sm text-zinc-300">
					I agree to the{' '}
					<Link href="/terms" className="text-cyan-400 hover:text-cyan-300">
						Terms of Service
					</Link>{' '}
					and{' '}
					<Link href="/privacy" className="text-cyan-400 hover:text-cyan-300">
						Privacy Policy
					</Link>
				</label>
			</div>

			{/* Submit Button */}
			<button
				type="submit"
				className="w-full py-3 px-4 bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-black font-semibold rounded-xl hover:shadow-[0_0_30px] hover:shadow-cyan-500/40 transition-all duration-300"
			>
				Create Account
			</button>
		</form>
	)
}

function NavBar() {
	return (
		<div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
			<nav className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl shadow-cyan-500/10 px-6 py-3 flex items-center gap-6">
				<Link href="/" className="text-sm text-zinc-300 hover:text-white transition">← Back to Home</Link>
				<Link href="/Pages/pricing" className="text-sm text-zinc-300 hover:text-white transition">Pricing</Link>
				<Link href="/Pages/login" className="ml-2 px-4 py-1 rounded-lg bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-black font-semibold shadow-[0_0_20px] shadow-cyan-500/40 hover:shadow-fuchsia-500/40 transition">Sign in</Link>
			</nav>
		</div>
	)
}

function GlowParticles() {
	return (
		<div aria-hidden className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_20%_20%,rgba(168,85,247,.06),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(34,211,238,.06),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(16,185,129,.06),transparent_40%)]" />
	)
}

function GlowGrid() {
	return (
		<div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
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
