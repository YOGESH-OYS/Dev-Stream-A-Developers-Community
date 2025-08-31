'use client'

import React from "react";
import Link from 'next/link'
import { useState } from 'react'

export default function PricingPage() {
	const [isYearly, setIsYearly] = useState(false)

	return (
		<main className="min-h-screen bg-black text-white overflow-x-hidden">
			{/* Background Elements */}
			<GlowParticles />
			<GlowGrid />
			
			{/* Navigation */}
			<NavBar />
			
			{/* Content Container */}
			<div className="w-full md:w-4/5 mx-auto px-4 md:px-0">
				{/* Header Section */}
				<HeaderSection isYearly={isYearly} setIsYearly={setIsYearly} />
				
				{/* Pricing Cards */}
				<PricingCards isYearly={isYearly} />
				
				{/* Feature Comparison */}
				<FeatureComparison />
				
				{/* Outro CTA */}
				<OutroSection />
			</div>
			
			{/* Footer */}
			<Footer />
		</main>
	)
}

function NavBar() {
	return (
		<div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
			<nav className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl shadow-cyan-500/10 px-6 py-3 flex items-center gap-6">
				<Link href="/" className="text-sm text-zinc-300 hover:text-white transition">← Back to Home</Link>
				<Link href="#pricing" className="text-sm text-zinc-300 hover:text-white transition">Pricing</Link>
				<Link href="https://github.com" className="text-sm text-zinc-300 hover:text-white transition">GitHub</Link>
			</nav>
		</div>
	)
}

function HeaderSection({ isYearly, setIsYearly }: { isYearly: boolean, setIsYearly: (value: boolean) => void }) {
	return (
		<section className="relative py-32 text-center">
			<div className="relative z-10">
				<h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
					Choose your plan.
				</h1>
				<h2 className="mt-4 text-5xl md:text-7xl font-extrabold tracking-tight leading-tight bg-gradient-to-b from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
					Build without limits.
				</h2>
				<p className="mt-6 text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto">
					From hobbyists to enterprise teams, we've got the perfect plan for your development journey.
				</p>
				
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

function PricingCards({ isYearly }: { isYearly: boolean }) {
	const plans = [
		{
			name: "Free",
			subtitle: "For hobbyists & learners",
			price: "$0",
			period: "forever",
			description: "Perfect for getting started with AI-powered development",
			cta: "Start Free",
			accent: "from-zinc-400 to-zinc-200",
			highlight: true,
			features: [
				"Terminal-style AI chat (limited usage)",
				"10 AI responses / day",
				"1 Project thread saved in MongoDB",
				"Basic markdown rendering",
				"Access to community discussions",
				"Email support (24–48h response)"
			]
		},
		{
			name: "Pro",
			subtitle: "For serious indie devs 🚀",
			price: isYearly ? "$99" : "$12",
			period: isYearly ? "/year" : "/month",
			description: "Unlock unlimited AI assistance and advanced features",
			cta: "Upgrade to Pro",
			accent: "from-fuchsia-500 to-cyan-500",
      highlight: true,
			features: [
				"Unlimited terminal-style AI chat",
				"Unlimited saved project threads",
				"Advanced AI coding assistance",
				"Real-time project threads w/ community",
				"Secure cloud sync & history search",
				"Priority email + Discord support",
				"Early access to experimental features"
			]
		},
		{
			name: "Enterprise",
			subtitle: "For teams & orgs",
			price: "Custom",
			period: "",
			description: "Enterprise-grade solutions with dedicated support",
			cta: "Contact Sales",
			accent: "from-emerald-500 to-cyan-500",
      highlight: true,
			features: [
				"Everything in Pro",
				"Team workspaces with shared history",
				"Admin & role-based access control",
				"Advanced analytics & reporting",
				"Dedicated MongoDB cluster with backups",
				"On-prem / self-host deployment options",
				"24/7 priority support + dedicated engineer"
			]
		}
	]

	return (
		<section className="py-20">
			<div className="grid md:grid-cols-3 gap-8">
				{plans.map((plan, index) => (
					<PricingCard key={`${plan.name}-${isYearly}`} plan={plan} index={index} />
				))}
			</div>
		</section>
	)
}

function PricingCard({ plan, index }: { plan: any, index: number }) {
	return (
		<div className={`group relative rounded-2xl p-8 border transition-all duration-500 hover:scale-105 hover:-translate-y-2 flex flex-col ${
			plan.highlight 
				? 'border-cyan-400/30 bg-white/10' 
				: 'border-white/10 bg-white/5'
		} backdrop-blur-xl`}>
			{/* Glow effect */}
      <div
      
        className={`absolute -inset-0.5 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500
          ${plan.name === "Pro"
            ? "bg-gradient-to-r from-fuchsia-500/20 to-cyan-500/20"
            : plan.name === "Free"
              ? "bg-gradient-to-r from-blue-600/30 via-blue-400/15 to-cyan-400/30"
            : plan.name === "Enterprise"
              ? "bg-gradient-to-r from-green-400/20 via-violet-500/20 to-blue-500/20"
            : "bg-white/5"
          }`}
      ></div>

      {/* Badge */}
      {plan.name === "Pro" && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full 
          bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-black text-xs font-bold 
          uppercase tracking-widest animate-pulse">
          Most Popular
        </div>
      )}

      {plan.name === "Free" && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full 
          bg-gradient-to-r from-blue-500 via-cyan-400 to-white text-black text-xs font-bold 
          uppercase tracking-widest">
          Starter Plan
        </div>
      )}

      {plan.name === "Enterprise" && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full 
          bg-gradient-to-r from-green-400 via-violet-500 to-blue-500 text-black text-xs font-bold 
          uppercase tracking-widest">
          Enterprise Elite
        </div>
      )}


			
			<div className="relative flex flex-col h-full">
				{/* Plan Header */}
				<div className="text-center mb-8">
					<div className={`text-xs uppercase tracking-widest inline-block bg-gradient-to-r ${plan.accent} bg-clip-text text-transparent font-bold`}>
						{plan.name}
					</div>
					<p className="mt-2 text-sm text-zinc-400">{plan.subtitle}</p>
					<div className="mt-4">
						<span className="text-4xl font-extrabold text-white">{plan.price}</span>
						{plan.period && (
							<span className="text-lg text-zinc-400 font-normal">{plan.period}</span>
						)}
					</div>
					<p className="mt-3 text-zinc-300 text-sm">{plan.description}</p>
				</div>
				
				{/* Features List - flex-grow to push button to bottom */}
				<div className="space-y-3 mb-8 flex-grow">
					{plan.features.map((feature: string, featureIndex: number) => (
						<div key={featureIndex} className="flex items-start gap-3">
							<div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center mt-0.5">
								<svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
									<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
								</svg>
							</div>
							<span className="text-sm text-zinc-300 leading-relaxed">{feature}</span>
						</div>
					))}
				</div>
				
				{/* CTA Button - now at bottom of card */}
				<div className="text-center mt-auto">
					<button className={`group/btn relative w-full px-6 py-3 rounded-xl font-semibold shadow-[0_0_20px] transition-all duration-300 overflow-hidden ${
						plan.highlight
							? 'bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-black shadow-cyan-500/40 hover:shadow-fuchsia-500/40'
							: 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
					}`}>
						{/* Button glow effect for highlight */}
						{plan.highlight && (
							<div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-cyan-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
						)}
						
						{/* Button content */}
						<span className="relative z-10 flex items-center justify-center gap-2">
							{plan.cta}
							<svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
							</svg>
						</span>
					</button>
				</div>
			</div>
		</div>
	)
}

function FeatureComparison() {
	return (
		<section className="py-20">
			<div className="text-center mb-16">
				<h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
					Why choose Dev Stream?
				</h2>
				<p className="mt-4 text-zinc-300 text-lg">
					Built by developers, for developers
				</p>
			</div>
			
			<div className="grid md:grid-cols-3 gap-8">
				<FeatureCard 
					icon="🚀"
					title="Lightning Fast"
					description="AI responses in milliseconds, not minutes. Get back to coding faster."
				/>
				<FeatureCard 
					icon="🔒"
					title="Enterprise Security"
					description="SOC 2 compliant with end-to-end encryption. Your code stays private."
				/>
				<FeatureCard 
					icon="🌐"
					title="Global Community"
					description="Connect with developers worldwide. Share, learn, and grow together."
				/>
			</div>
		</section>
	)
}

function FeatureCard({ icon, title, description }: { icon: string, title: string, description: string }) {
	return (
		<div className="group text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
			<div className="text-4xl mb-4">{icon}</div>
			<h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
			<p className="text-zinc-300 text-sm leading-relaxed">{description}</p>
		</div>
	)
}

function OutroSection() {
	return (
		<section className="py-32 text-center">
			<div className="relative">
				<div className="absolute inset-0 -z-10 blur-3xl opacity-40 bg-[conic-gradient(at_50%_50%,#22d3ee,transparent, #a855f7, transparent,#22d3ee)]" />
				<h2 className="text-5xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
					The future of development is one plan away.
				</h2>
				<p className="mt-6 text-lg text-zinc-300 max-w-2xl mx-auto">
					Join thousands of developers already building the future with AI-powered tools.
				</p>
				<div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
					
					<Link href="https://github.com" className="px-8 py-4 rounded-xl border border-white/10 text-zinc-200 hover:bg-white/5 transition hover:scale-105">
						View on GitHub
					</Link>
				</div>
			</div>
		</section>
	)
}

function Footer() {
	return (
		<footer className="py-10 border-t border-white/10 text-sm text-zinc-400">
			<div className="flex flex-col md:flex-row items-center justify-between gap-4">
				<div>© {new Date().getFullYear()} Dev Stream</div>
				<div className="flex items-center gap-6">
					<Link href="#" className="hover:text-white transition">Docs</Link>
					<Link href="https://github.com" className="hover:text-white transition">GitHub</Link>
					<Link href="#" className="hover:text-white transition">Discord</Link>
					<Link href="#" className="hover:text-white transition">Twitter</Link>
				</div>
			</div>
		</footer>
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
