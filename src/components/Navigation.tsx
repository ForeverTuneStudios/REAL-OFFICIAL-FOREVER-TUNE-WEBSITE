"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { YOUTUBE_URL, SPOTIFY_URL, INSTAGRAM_URL } from "@/lib/constants";
import { YouTubeIcon, SpotifyIcon, InstagramIcon } from "@/components/icons/PlatformIcons";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Music", href: "/music" },
  { label: "Videos", href: "/videos" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(scrollY > 60);
    addEventListener("scroll", h);
    return () => removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <motion.nav initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "glass border-b border-white/[0.04]" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14 sm:h-16 md:h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-neon-pink to-neon-purple flex items-center justify-center shadow-lg shadow-neon-pink/10 group-hover:shadow-neon-pink/20 transition-shadow">
              <span className="text-white font-black text-[10px] sm:text-xs">FT</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-extrabold text-xs sm:text-sm tracking-wider leading-tight">FOREVER TUNE</div>
              <div className="text-[7px] sm:text-[8px] text-neon-pink/50 tracking-[0.18em] font-semibold">STUDIOS</div>
            </div>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-0.5">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href}
                className="relative px-3.5 py-2 text-[13px] font-medium text-white/50 hover:text-white transition-colors duration-300 group">
                {l.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] rounded-full bg-gradient-to-r from-neon-pink to-neon-blue group-hover:w-3/4 transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Burger */}
          <button onClick={() => setOpen(!open)} className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px] z-50" aria-label="Menu">
            <motion.span animate={open ? { rotate: 45, y: 7 } : {}} className="w-5 h-[1.5px] bg-white block origin-center" />
            <motion.span animate={open ? { opacity: 0 } : {}} className="w-5 h-[1.5px] bg-white block" />
            <motion.span animate={open ? { rotate: -45, y: -7 } : {}} className="w-5 h-[1.5px] bg-white block origin-center" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden bg-[#050508]/[0.98] backdrop-blur-2xl flex flex-col items-center justify-center gap-7">
            {LINKS.map((l, i) => (
              <motion.div key={l.href} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }} transition={{ delay: i * 0.06 }}>
                <Link href={l.href} onClick={() => setOpen(false)}
                  className="text-2xl sm:text-3xl font-bold text-white hover:text-neon-pink transition-colors">{l.label}</Link>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
              className="flex gap-6 mt-6">
              <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-red-500 transition-colors"><YouTubeIcon className="w-5 h-5" /></a>
              <a href={SPOTIFY_URL} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-green-500 transition-colors"><SpotifyIcon className="w-5 h-5" /></a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-pink-500 transition-colors"><InstagramIcon className="w-5 h-5" /></a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
