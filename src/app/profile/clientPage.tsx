import ScrollEffect from "../components/ScroolEffect/scroll"
import { FloatingNavbar } from "../components/ui/floating-dock"
import { Footer } from "../components/ui/footer"
import { ProfileSwitchboard } from './ProfileTabsClient'

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

interface ProfilePageProps {
  userData: UserData | null
}

export default async function Profile({ userData } : ProfilePageProps){
	return(
		<main className="min-h-screen bg-black text-white overflow-x-hidden relative">

      <ScrollEffect />
			{/* Cover / Template (persistent) */}
			<section className="relative">
				<div aria-hidden className="h-56 w-full bg-[radial-gradient(1000px_300px_at_20%_-10%,rgba(168,85,247,.25),transparent),radial-gradient(1000px_300px_at_80%_-10%,rgba(34,211,238,.25),transparent)]" />
				<div className="w-full md:w-4/5 mx-auto px-4 md:px-0 -mt-16">
					<div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
						{/* Avatar */}
						<div className="shrink-0 p-1 rounded-3xl bg-white/10 border border-white/10 backdrop-blur-xl">
							<img src="https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=640&auto=format&fit=crop" alt="avatar" className="h-36 w-36 md:h-44 md:w-44 object-cover rounded-2xl" />
						</div>
						{/* Identity */}
						<div className="flex-1">
							<div className="flex items-center gap-3">
								{userData && (
									<h1 className="text-3xl md:text-4xl font-extrabold">{userData.firstName}</h1>
								)}
								<span className="px-2 py-1 rounded-md text-xs font-bold bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-black">PRO</span>
							</div>
							<p className="mt-2 text-zinc-300">Interface and Brand Designer based in San Antonio</p>
							<div className="mt-5 flex flex-wrap items-center gap-3">
								<button className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 hover:bg-white/15 transition">Follow</button>
								<button className="px-4 py-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-black font-semibold">Get in touch</button>
							</div>
						</div>
						{/* Stats */}
						<div className="grid grid-cols-3 gap-8">
							<div>
								<div className="text-zinc-400 text-sm">Followers</div>
								<div className="text-3xl font-bold">2,985</div>
							</div>
							<div>
								<div className="text-zinc-400 text-sm">Following</div>
								<div className="text-3xl font-bold">132</div>
							</div>
							<div>
								<div className="text-zinc-400 text-sm">Likes</div>
								<div className="text-3xl font-bold">548</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Switchable content below the template */}
			<section className="w-full md:w-4/5 mx-auto px-4 md:px-0 mt-10 min-h-screen">
  <ProfileSwitchboard />
</section>


			{/* Floating navigation */}
			<FloatingNavbar />
      <Footer />
		</main>
	)
}