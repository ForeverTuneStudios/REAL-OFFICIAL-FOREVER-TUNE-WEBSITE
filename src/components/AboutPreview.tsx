"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons/PlatformIcons";

export default function AboutPreview() {
  return (
    <section className="relative py-20 sm:py-28 px-4 overflow-hidden">
      <div className="section-divider mb-20 sm:mb-28" />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04]"
        style={{ background: "radial-gradient(circle, #ff00aa, transparent 55%)", filter: "blur(80px)" }} />

      <div className="max-w-6xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Visual */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9 }}
            className="relative order-2 lg:order-1 flex justify-center">
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-neon-pink/10 via-dark-surface to-neon-blue/10 overflow-hidden">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-4 border border-neon-pink/10 rounded-full" />
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-10 border border-neon-blue/10 rounded-full" />
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-16 border border-neon-purple/10 rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter"
                    style={{ background: "linear-gradient(135deg, #ff00aa, #00ccff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    FT
                  </span>
                </div>
              </div>
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-neon-pink/8 to-neon-blue/8 blur-2xl -z-10" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.15 }}
            className="order-1 lg:order-2 text-center lg:text-left">
            <p className="text-[10px] sm:text-xs tracking-[0.3em] text-neon-pink/50 uppercase font-semibold mb-3">The Story</p>
            <h2 className="section-heading mb-6">About Forever Tune</h2>
            <p className="text-white/40 leading-relaxed mb-4 text-sm sm:text-[15px]">
              FOREVER TUNE STUDIOS is a premium music production company crafting timeless sonic experiences.
              We push creative boundaries and build sonic landscapes that resonate across the globe.
            </p>
            <p className="text-white/40 leading-relaxed mb-8 text-sm sm:text-[15px]">
              From cinematic compositions to chart-ready hits — every note is crafted with precision,
              passion, and purpose. Our music transcends genres and defies expectations.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { val: "∞", label: "Releases" },
                { val: "50+", label: "Platforms" },
                { val: "Forever", label: "Vision" },
              ].map((s) => (
                <div key={s.label} className="glass rounded-xl p-3 sm:p-4 text-center">
                  <div className="text-xl sm:text-2xl font-extrabold tracking-tight"
                    style={{ background: "linear-gradient(135deg,#ff00aa,#00ccff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    {s.val}
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-white/30 mt-1 font-medium uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>

            <Link href="/about" className="btn-outline inline-flex">
              Read Full Story
              <ArrowIcon />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
