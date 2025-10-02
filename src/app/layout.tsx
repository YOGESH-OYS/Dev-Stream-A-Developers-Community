import type { Metadata } from 'next'
import './globals.css'
import { Space_Grotesk, Inter } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' })
const inter = Inter({ subsets: ['latin'], variable: '--font-body' })

export const metadata: Metadata = {
	title: 'Dev Stream — The Developer Community Reimagined',
	description: 'Share Code. Stream Sessions. Build Together. Codecasts, Sandboxes, and a developer playground.',
	openGraph: {
		title: 'Dev Stream',
		description: 'The Developer Community Reimagined',
		type: 'website'
	}
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script defer src="https://unpkg.com/@splinetool/viewer@latest/build/spline-viewer.js"></script>
      </head>
      <body className="antialiased bg-[#0B0B0E] text-zinc-100">
        <div id="scroll-wrapper" style={{ overflowY: 'auto', height: '100vh' }}>
          <div id="scroll-content">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
