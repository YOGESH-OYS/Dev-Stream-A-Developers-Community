'use client'

import { useState } from 'react'
import Link from 'next/link'
import ScrollEffect from '../components/ScroolEffect/scroll'

export default function ContactPage() {
	return (
		<main className="min-h-screen bg-black text-white overflow-x-hidden relative">
			<ScrollEffect />
			{/* Background Elements */}
			<GlowParticles />
			<GlowGrid />
			<HeroBackground />
			
			{/* Navigation */}
			<NavBar />
			
			{/* Content Container */}
			<div className="relative z-10 w-full md:w-4/5 mx-auto px-4 md:px-0 pt-24 pb-16">
				{/* Header Section */}
				<div className="text-center mb-16">
					<div className="inline-block p-4 rounded-2xl bg-gradient-to-r from-fuchsia-500/20 to-cyan-500/20 border border-fuchsia-500/30 mb-6">
						<div className="w-16 h-16 rounded-xl bg-gradient-to-r from-fuchsia-500 to-cyan-500 flex items-center justify-center">
							<svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
							</svg>
						</div>
					</div>
					<h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent mb-6">
						Let's Build Together
					</h1>
					<p className="text-xl text-zinc-400 max-w-3xl mx-auto">
						Ready to transform your development workflow? Whether you're an individual developer, 
						startup team, or enterprise organization, we're here to help you succeed.
					</p>
				</div>

				{/* Contact Form Section */}
				<div className="grid lg:grid-cols-2 gap-12 mb-20">
					{/* Contact Form */}
					<div className="space-y-8">
						<div>
							<h2 className="text-3xl font-bold text-white mb-2">Get in Touch</h2>
							<p className="text-zinc-400">
								Tell us about your project and we'll get back to you within 24 hours.
							</p>
						</div>

						<ContactForm />
					</div>

					{/* Contact Info & Enterprise Details */}
					<div className="space-y-8">
						<div>
							<h2 className="text-3xl font-bold text-white mb-2">Enterprise Solutions</h2>
							<p className="text-zinc-400 mb-6">
								Scale your development team with enterprise-grade features and dedicated support.
							</p>
						</div>

						<EnterpriseFeatures />
						
						<div className="pt-8 border-t border-white/10">
							<h3 className="text-xl font-semibold text-white mb-4">Other Ways to Connect</h3>
							<ContactMethods />
						</div>
					</div>
				</div>

				{/* CTA Section */}
				<div className="text-center">
					<div className="max-w-4xl mx-auto p-8 rounded-3xl bg-gradient-to-r from-fuchsia-500/10 to-cyan-500/10 border border-fuchsia-500/20">
						<h2 className="text-3xl font-bold text-white mb-4">
							Ready to Streamline Your Development?
						</h2>
						<p className="text-zinc-300 mb-8 text-lg">
							Join thousands of developers who've already transformed their workflow with Dev Stream.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link 
								href="/Pages/pricing" 
								className="px-8 py-4 bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-black font-semibold rounded-xl hover:shadow-[0_0_30px] hover:shadow-cyan-500/40 transition-all duration-300"
							>
								View Pricing Plans
							</Link>
							<Link 
								href="/" 
								className="px-8 py-4 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 hover:border-white/30 transition-all duration-300"
							>
								Explore Features
							</Link>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}

function ContactForm() {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		company: '',
		companySize: '',
		phone: '',
		projectType: '',
		teamSize: '',
		message: '',
		urgency: 'medium',
		hearAboutUs: '',
		newsletter: false
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value, type } = e.target
		if (type === 'checkbox') {
			const target = e.target as HTMLInputElement
			setFormData(prev => ({ ...prev, [name]: target.checked }))
		} else {
			setFormData(prev => ({ ...prev, [name]: value }))
		}
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		console.log('Form submitted:', formData)
		// Handle form submission here
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			{/* Personal Information */}
			<div className="grid md:grid-cols-2 gap-4">
				<div>
					<label htmlFor="firstName" className="block text-sm font-medium text-zinc-300 mb-2">
						First Name *
					</label>
					<input
						type="text"
						id="firstName"
						name="firstName"
						required
						value={formData.firstName}
						onChange={handleChange}
						className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 text-white placeholder-zinc-400"
						placeholder="John"
					/>
				</div>
				<div>
					<label htmlFor="lastName" className="block text-sm font-medium text-zinc-300 mb-2">
						Last Name *
					</label>
					<input
						type="text"
						id="lastName"
						name="lastName"
						required
						value={formData.lastName}
						onChange={handleChange}
						className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 text-white placeholder-zinc-400"
						placeholder="Doe"
					/>
				</div>
			</div>

			{/* Contact Information */}
			<div className="grid md:grid-cols-2 gap-4">
				<div>
					<label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
						Work Email *
					</label>
					<input
						type="email"
						id="email"
						name="email"
						required
						value={formData.email}
						onChange={handleChange}
						className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 text-white placeholder-zinc-400"
						placeholder="john.doe@company.com"
					/>
				</div>
				<div>
					<label htmlFor="phone" className="block text-sm font-medium text-zinc-300 mb-2">
						Phone Number
					</label>
					<input
						type="tel"
						id="phone"
						name="phone"
						value={formData.phone}
						onChange={handleChange}
						className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 text-white placeholder-zinc-400"
						placeholder="+1 (555) 123-4567"
					/>
				</div>
			</div>

			{/* Company Information */}
			<div className="grid md:grid-cols-2 gap-4">
				<div>
					<label htmlFor="company" className="block text-sm font-medium text-zinc-300 mb-2">
						Company Name *
					</label>
					<input
						type="text"
						id="company"
						name="company"
						required
						value={formData.company}
						onChange={handleChange}
						className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 text-white placeholder-zinc-400"
						placeholder="Acme Corp"
					/>
				</div>
				<div>
					<label htmlFor="companySize" className="block text-sm font-medium text-zinc-300 mb-2">
						Company Size *
					</label>
					<select
						id="companySize"
						name="companySize"
						required
						value={formData.companySize}
						onChange={handleChange}
						className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 text-white"
					>
						<option value="">Select company size</option>
						<option value="1-10">1-10 employees</option>
						<option value="11-50">11-50 employees</option>
						<option value="51-200">51-200 employees</option>
						<option value="201-500">201-500 employees</option>
						<option value="501-1000">501-1000 employees</option>
						<option value="1000+">1000+ employees</option>
					</select>
				</div>
			</div>

			{/* Project Details */}
			<div className="grid md:grid-cols-2 gap-4">
				<div>
					<label htmlFor="projectType" className="block text-sm font-medium text-zinc-300 mb-2">
						Project Type *
					</label>
					<select
						id="projectType"
						name="projectType"
						required
						value={formData.projectType}
						onChange={handleChange}
						className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 text-white"
					>
						<option value="">Select project type</option>
						<option value="enterprise">Enterprise Implementation</option>
						<option value="team">Team Collaboration</option>
						<option value="custom">Custom Development</option>
						<option value="integration">API Integration</option>
						<option value="consulting">Technical Consulting</option>
						<option value="other">Other</option>
					</select>
				</div>
				<div>
					<label htmlFor="teamSize" className="block text-sm font-medium text-zinc-300 mb-2">
						Development Team Size
					</label>
					<select
						id="teamSize"
						name="teamSize"
						value={formData.teamSize}
						onChange={handleChange}
						className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 text-white"
					>
						<option value="">Select team size</option>
						<option value="1-5">1-5 developers</option>
						<option value="6-15">6-15 developers</option>
						<option value="16-30">16-30 developers</option>
						<option value="31-50">31-50 developers</option>
						<option value="50+">50+ developers</option>
					</select>
				</div>
			</div>

			{/* Urgency & How They Heard About Us */}
			<div className="grid md:grid-cols-2 gap-4">
				<div>
					<label htmlFor="urgency" className="block text-sm font-medium text-zinc-300 mb-2">
						Project Urgency
					</label>
					<select
						id="urgency"
						name="urgency"
						value={formData.urgency}
						onChange={handleChange}
						className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 text-white"
					>
						<option value="low">Low - Planning phase</option>
						<option value="medium">Medium - Starting soon</option>
						<option value="high">High - Need to start ASAP</option>
						<option value="urgent">Urgent - Critical timeline</option>
					</select>
				</div>
				<div>
					<label htmlFor="hearAboutUs" className="block text-sm font-medium text-zinc-300 mb-2">
						How did you hear about us?
					</label>
					<select
						id="hearAboutUs"
						name="hearAboutUs"
						value={formData.hearAboutUs}
						onChange={handleChange}
						className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 text-white"
					>
						<option value="">Select option</option>
						<option value="search">Search engine</option>
						<option value="social">Social media</option>
						<option value="referral">Referral</option>
						<option value="conference">Conference/Event</option>
						<option value="github">GitHub</option>
						<option value="other">Other</option>
					</select>
				</div>
			</div>

			{/* Message */}
			<div>
				<label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-2">
					Project Details & Requirements *
				</label>
				<textarea
					id="message"
					name="message"
					required
					rows={6}
					value={formData.message}
					onChange={handleChange}
					className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 text-white placeholder-zinc-400 resize-none"
					placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
				/>
			</div>

			{/* Newsletter Subscription */}
			<div className="flex items-center">
				<input
					type="checkbox"
					id="newsletter"
					name="newsletter"
					checked={formData.newsletter}
					onChange={handleChange}
					className="w-4 h-4 text-cyan-500 bg-white/5 border-white/10 rounded focus:ring-cyan-500/50 focus:ring-offset-0"
				/>
				<label htmlFor="newsletter" className="ml-2 text-sm text-zinc-300">
					Subscribe to our newsletter for product updates and developer insights
				</label>
			</div>

			{/* Submit Button */}
			<button
				type="submit"
				className="w-full py-4 px-6 bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-black font-semibold rounded-xl hover:shadow-[0_0_30px] hover:shadow-cyan-500/40 transition-all duration-300"
			>
				Send Message
			</button>
		</form>
	)
}

function EnterpriseFeatures() {
	const features = [
		{
			icon: "🔒",
			title: "Enterprise Security",
			description: "SOC 2 Type II compliant, SSO integration, advanced role management"
		},
		{
			icon: "📊",
			title: "Advanced Analytics",
			description: "Team performance metrics, code quality insights, productivity tracking"
		},
		{
			icon: "🌐",
			title: "Global Infrastructure",
			description: "Multi-region deployment, 99.9% uptime SLA, enterprise CDN"
		},
		{
			icon: "👥",
			title: "Dedicated Support",
			description: "24/7 priority support, dedicated account manager, custom onboarding"
		},
		{
			icon: "🔧",
			title: "Custom Integrations",
			description: "API-first architecture, webhook support, enterprise SSO providers"
		},
		{
			icon: "📈",
			title: "Scalability",
			description: "Unlimited users, custom rate limits, enterprise-grade performance"
		}
	]

	return (
		<div className="grid gap-4">
			{features.map((feature, index) => (
				<div key={index} className="flex items-start space-x-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
					<div className="text-2xl">{feature.icon}</div>
					<div>
						<h4 className="font-semibold text-white mb-1">{feature.title}</h4>
						<p className="text-sm text-zinc-400">{feature.description}</p>
					</div>
				</div>
			))}
		</div>
	)
}

function ContactMethods() {
	const methods = [
		{
			icon: "📧",
			title: "Email Support",
			value: "enterprise@devstream.com",
			description: "For enterprise inquiries and technical support"
		},
		{
			icon: "💬",
			title: "Live Chat",
			value: "Available 24/7",
			description: "Get instant help from our support team"
		},
		{
			icon: "📞",
			title: "Phone Support",
			value: "+1 (555) 123-4567",
			description: "Priority support for enterprise customers"
		},
		{
			icon: "📋",
			title: "Documentation",
			value: "docs.devstream.com",
			description: "Comprehensive guides and API references"
		}
	]

	return (
		<div className="space-y-4">
			{methods.map((method, index) => (
				<div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-all duration-300">
					<div className="text-xl">{method.icon}</div>
					<div>
						<h4 className="font-medium text-white text-sm">{method.title}</h4>
						<p className="text-cyan-400 text-sm font-mono">{method.value}</p>
						<p className="text-xs text-zinc-500">{method.description}</p>
					</div>
				</div>
			))}
		</div>
	)
}

function NavBar() {
	return (
		<div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
			<nav className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl shadow-cyan-500/10 px-6 py-3 flex items-center gap-6">
				<Link href="/" className="text-sm text-zinc-300 hover:text-white transition">← Back to Home</Link>
				<Link href="/Pages/pricing" className="text-sm text-zinc-300 hover:text-white transition">Pricing</Link>
				<Link href="https://github.com" className="text-sm text-zinc-300 hover:text-white transition">GitHub</Link>
			</nav>
		</div>
	)
}

function GlowParticles() {
	return (
		<div aria-hidden className="pointer-events-none absolute inset-0 z-0 [background-image:radial-gradient(circle_at_20%_20%,rgba(168,85,247,.06),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(34,211,238,.06),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(16,185,129,.06),transparent_40%)]" />
	)
}

function GlowGrid() {
	return (
		<div aria-hidden className="pointer-events-none absolute inset-0 z-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
	)
}

function HeroBackground() {
	return (
		<div aria-hidden className="pointer-events-none absolute inset-0 z-0">
			<div className="absolute inset-0 opacity-70">
				{/* Same background as landing page */}
			</div>
		</div>
	)
}
