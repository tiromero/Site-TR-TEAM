
"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "../../lib/utils";

export const FloatingNav = ({
  navItems,
  className,
  onNavigate,
  activeSection,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
    id: string;
  }[];
  className?: string;
  onNavigate?: (id: string) => void;
  activeSection?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const previous = scrollYProgress.getPrevious();
      const direction = current - (previous ?? 0);

      if (current < 0.02) {
        // Always show at the very top
        setVisible(true);
      } else {
        if (direction < 0) {
          // Show when scrolling up
          setVisible(true);
        } else {
          // Hide when scrolling down
          setVisible(false);
        }
      }
    }
  });

  const handleLinkClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(id);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
        className={cn(
          "flex max-w-fit fixed top-6 inset-x-0 mx-auto border border-white/[0.1] rounded-full bg-black/60 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[5000] pr-2 pl-6 py-2.5 items-center justify-center space-x-4",
          className
        )}
      >
        {navItems.map((navItem, idx) => {
          const isActive = activeSection === navItem.id;
          return (
            <a
              key={`link=${idx}`}
              href={navItem.link}
              onClick={(e) => handleLinkClick(e, navItem.id)}
              className={cn(
                "relative transition-all duration-300 items-center flex space-x-1 group",
                isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200"
              )}
            >
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="hidden sm:block text-[10px] font-black uppercase tracking-[0.15em] relative">
                {navItem.name}
                {isActive && (
                  <motion.span 
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-purple-500 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </span>
            </a>
          );
        })}
        <button 
          onClick={() => onNavigate?.('planos')}
          className="bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-black uppercase tracking-widest px-6 py-2.5 rounded-full shadow-lg shadow-purple-600/20 active:scale-95 transition-all"
        >
          <span>ASSINAR</span>
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
