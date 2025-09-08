/**
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/

"use client"

import { cn } from "@/lib/utils";
import ScrollEffect from "../ScroolEffect/scroll";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";

import { RiHome9Fill } from "react-icons/ri"
import { IoIosAddCircleOutline } from "react-icons/io";
import { BiSearchAlt } from "react-icons/bi";
import { MdNotificationsActive } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  const pathname = usePathname();
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} pathname={pathname} />
      <FloatingDockMobile items={items} className={mobileClassName} pathname={pathname} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
  pathname,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
  pathname: string | null;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2 "
          >
            {items.map((item, idx) => {
              const isActive = pathname === item.href;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: 10,
                    transition: {
                      delay: idx * 0.05,
                    },
                  }}
                  transition={{ delay: (items.length - 1 - idx) * 0.05 }}
                >
                  <Link
                    href={item.href}
                    prefetch
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full",
                      isActive
                        ? "bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-black shadow-[0_0_20px] shadow-cyan-500/30"
                        : "bg-gray-50 dark:bg-neutral-900"
                    )}
                  >
                    <div className="h-4 w-4">{item.icon}</div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-800"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
  pathname,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
  pathname: string | null;
}) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl shadow-cyan-500/10 px-6 py-3 flex items-center gap-6",
        className,
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} isActive={pathname === item.href} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  isActive,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
  isActive: boolean;
}) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 80, 20]);
  let heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20],
  );

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);
  

  return (
    <Link href={href} prefetch>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "relative flex aspect-square items-center justify-center rounded-full transition-colors",
          isActive ? "bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-black shadow-[0_0_25px] shadow-cyan-500/30" : "bg-gray-200 dark:bg-neutral-800"
        )}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="absolute -top-8 left-1/2 w-fit rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs whitespace-pre text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white "
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    </Link>
  );
}


export function FloatingNavbar(){
  const pathname = usePathname();
	return(
		<main>
			<div className="fixed top-0 left-0 w-full z-[9999]">
			<ScrollEffect />
      <FloatingDock
        items={[
          { title: "Home", icon: <RiHome9Fill />, href: "/home" },
          { title: "Search", icon: <BiSearchAlt />, href: "/search" },
          { title: "Post", icon: <IoIosAddCircleOutline />, href: "/post" },
          { title: "Notification", icon: <MdNotificationsActive />, href: "/notification" },
          { title: "Profile", icon: <CgProfile />, href: "/profile" },
        ]}
        desktopClassName="fixed bottom-4 left-1/2 -translate-x-1/2"
        mobileClassName="fixed bottom-4 right-4"
      />
			</div>
		</main>
	)
}