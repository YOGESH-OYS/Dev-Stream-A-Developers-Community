import Link from "next/link"

export function Footer() {
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