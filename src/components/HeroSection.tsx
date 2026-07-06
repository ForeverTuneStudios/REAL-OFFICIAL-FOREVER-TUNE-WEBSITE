"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { YOUTUBE_URL } from "@/lib/constants";
import { PlayIcon, YouTubeIcon } from "@/components/icons/PlatformIcons";

export default function HeroSection() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const h = (e: MouseEvent) =>
      setMouse({ x: (e.clientX / innerWidth - 0.5) * 30, y: (e.clientY / innerHeight - 0.5) * 30 });
    addEventListener("mousemove", h);
    return () => removeEventListener("mousemove", h);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-dark-bg" />

        {/* Cinematic orbs */}
        <motion.div animate={{ x: [0,80,-40,0], y: [0,-60,40,0], scale: [1,1.15,0.9,1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[20%] w-[50vw] max-w-[600px] aspect-square rounded-full opacity-[0.12]"
          style={{ background: "radial-gradient(circle, #ff00aa 0%, transparent 65%)", filter: "blur(80px)" }} />
        <motion.div animate={{ x: [0,-60,50,0], y: [0,50,-30,0], scale: [1,0.85,1.2,1] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] right-[15%] w-[45vw] max-w-[500px] aspect-square rounded-full opacity-[0.10]"
          style={{ background: "radial-gradient(circle, #00ccff 0%, transparent 65%)", filter: "blur(80px)" }} />
        <motion.div animate={{ x: [0,30,-50,0], y: [0,-40,60,0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[45%] left-[45%] w-[35vw] max-w-[400px] aspect-square rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #8b5cf6 0%, transparent 65%)", filter: "blur(60px)" }} />

        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.018]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.12) 1px,transparent 1px)", backgroundSize: "80px 80px" }} />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050508_80%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/60 via-transparent to-dark-bg" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-5 sm:px-8 max-w-5xl mx-auto pt-24 pb-20">
        {/* Equalizer */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="flex items-end justify-center gap-[3px] sm:gap-1 mb-8 h-7">
          {Array.from({ length: 18 }).map((_, i) => (
            <motion.div key={i}
              animate={{ scaleY: [0.15, 0.4 + Math.random() * 0.6, 0.15] }}
              transition={{ duration: 0.7 + Math.random() * 0.5, repeat: Infinity, delay: i * 0.04, ease: "easeInOut" }}
              className="w-[2px] sm:w-[3px] h-full origin-bottom rounded-full"
              style={{ background: "linear-gradient(to top, #ff00aa, #00ccff)" }} />
          ))}
        </motion.div>

        {/* Label */}
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
          className="text-[10px] sm:text-xs font-semibold tracking-[0.35em] text-neon-pink/70 uppercase mb-4">
          Official Website
        </motion.p>

        {/* Title */}
        <motion.h1 initial={{ opacity: 0, y: 50, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ transform: `translate(${mouse.x * 0.25}px, ${mouse.y * 0.25}px)` }}
          className="leading-[0.88] mb-3">
          <span className="block text-[clamp(2.8rem,11vw,8rem)] font-black tracking-[-0.04em] text-white drop-shadow-[0_4px_40px_rgba(255,255,255,0.08)]">
            FOREVER
          </span>
          <span className="block text-[clamp(2.8rem,11vw,8rem)] font-black tracking-[-0.04em] glow-text"
            style={{ background: "linear-gradient(135deg, #ff00aa 0%, #c471f5 35%, #00ccff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            TUNE
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.7 }}
          className="text-[10px] sm:text-xs tracking-[0.3em] text-white/30 uppercase font-medium mb-12">
          Where Music Lives Forever
        </motion.p>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.15, duration: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-2">
          <Link href="/music" className="w-full sm:w-auto btn-cta">
            <PlayIcon className="w-4 h-4" />
            LISTEN NOW
          </Link>
          <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer"
            className="w-full sm:w-auto btn-outline">
            <YouTubeIcon className="w-4 h-4 text-red-500" />
            YOUTUBE
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator – right edge */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
        className="fixed bottom-6 sm:bottom-10 right-4 sm:right-8 z-20">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.2, repeat: Infinity }}
          className="flex flex-col items-center gap-1.5">
          <span className="text-[7px] sm:text-[8px] tracking-[0.3em] text-white/20 uppercase font-medium">Scroll</span>
          <div className="w-[18px] h-7 rounded-full border border-white/15 flex items-start justify-center pt-1.5">
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2.2, repeat: Infinity }}
              className="w-1 h-1 rounded-full bg-neon-pink/80" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
