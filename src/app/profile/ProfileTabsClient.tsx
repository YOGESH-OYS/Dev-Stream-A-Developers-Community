'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";

export function ProfileSwitchboard(){
	return (
		<div className="w-full">
			<ProfileTabs />
			<div className="max-w-5xl mx-auto px-8">
      	<HoverEffect items={projects} />
    	</div>
		</div>
	)
}

export const projects = [
  {
    title: "Stripe",
    description:
      "A technology company that builds economic infrastructure for the internet.",
    link: "https://stripe.com",
  },
  {
    title: "Netflix",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    link: "https://netflix.com",
  },
  {
    title: "Google",
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
    link: "https://google.com",
  },
  {
    title: "Meta",
    description:
      "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    link: "https://meta.com",
  },
  {
    title: "Amazon",
    description:
      "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    link: "https://amazon.com",
  },
  {
    title: "Microsoft",
    description:
      "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    link: "https://microsoft.com",
  },
];

function ProfileTabs(){
	const [active, setActive] = useState<'General'|'Works'|'Products'|'Followers'>('General')
	return (
		<div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-2 flex items-center gap-6 overflow-x-auto">
			{['General','Works','Products','Followers'].map(label => (
				<button
					key={label}
					onClick={() => setActive(label as any)}
					className={
						`px-5 py-2 rounded-xl text-sm font-medium transition `+
						(active===label ? 'bg-white text-black shadow-[0_0_20px] shadow-cyan-500/20' : 'text-zinc-300 hover:text-white')
					}
				>
					{label}
				</button>
			))}
		</div>
	)
}

function TabContent(){
	const [tab] = useState<'General'|'Works'|'Products'|'Followers'>('General')
	return (
		<ContentRouter tab={tab} />
	)
}

function ContentRouter({ tab }:{ tab: 'General'|'Works'|'Products'|'Followers' }){
	return (
		<div>
			<CardGrid />
		</div>
	)
}

function CardGrid(){
	const cards = Array.from({length:6}).map((_,i)=>({
		name: 'Sophie Bennett',
		title: i%2? 'A Product Designer focused on intuitive user experiences.' : 'Product Designer who focuses on simplicity & usability.',
		src: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1080&auto=format&fit=crop'
	}))
	return (
		<div className="grid md:grid-cols-3 gap-6">
			{cards.map((c,idx)=> (
				<div key={idx} className="group rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden shadow-2xl shadow-cyan-500/5 hover:shadow-cyan-500/20 transition">
					<div className="p-3">
						<img src={c.src} alt="card" className="rounded-[24px] w-full h-64 object-cover" />
					</div>
					<div className="px-6 pb-6 -mt-4">
						<h3 className="text-xl font-semibold flex items-center gap-2">{c.name}<span className="inline-block h-3 w-3 rounded-full bg-emerald-500" /></h3>
						<p className="mt-2 text-zinc-300 text-sm leading-relaxed">{c.title}</p>
						<div className="mt-5 flex items-center justify-between">
							<div className="text-zinc-400 text-sm flex items-center gap-4">
								<span>312</span>
								<span>48</span>
							</div>
							<button className="px-5 py-2 rounded-2xl bg-white text-black font-medium hover:shadow-[0_0_25px] hover:shadow-cyan-500/30 transition">Follow +</button>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}


export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <a
          href={item?.link}
          key={item?.link}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </a>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
