"use client";

import { motion } from "framer-motion";
import { YOUTUBE_URL } from "@/lib/constants";
import { YouTubeIcon, ArrowIcon } from "@/components/icons/PlatformIcons";

export default function YouTubeVideosSection() {
  return (
    <section className="relative py-20 sm:py-28 px-4 overflow-hidden">
      <div className="section-divider mb-20 sm:mb-28" />

      <div className="max-w-4xl mx-auto relative">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12">
          <p className="text-[10px] sm:text-xs tracking-[0.3em] text-red-500/50 uppercase font-semibold mb-3">YouTube</p>
          <h2 className="section-heading">Watch &amp; Subscribe</h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass rounded-3xl p-8 sm:p-12 md:p-16 text-center relative overflow-hidden">
          {/* inner glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full opacity-[0.06]"
            style={{ background: "radial-gradient(circle, #ff0000, transparent 60%)", filter: "blur(60px)" }} />

          <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-red-600 to-red-700 items-center justify-center mb-8 shadow-xl shadow-red-600/20 hover:shadow-red-600/40 transition-all duration-500 hover:scale-105 relative">
            <YouTubeIcon className="w-12 h-12 sm:w-14 sm:h-14 text-white" />
            <div className="absolute inset-0 rounded-full border border-white/10" />
          </a>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">FOREVER TUNE</h3>
          <p className="text-sm sm:text-base text-white/35 mb-10 max-w-md mx-auto leading-relaxed">
            Music videos, behind-the-scenes content, shorts, and more. Subscribe for every new release.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-500 rounded-full text-white font-bold text-sm tracking-wide transition-all duration-300 shadow-lg shadow-red-600/25 hover:shadow-red-500/40 hover:scale-[1.03] hover:-translate-y-0.5">
              <YouTubeIcon className="w-5 h-5" />
              Subscribe
            </a>
            <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer"
              className="w-full sm:w-auto btn-outline">
              View Channel
              <ArrowIcon />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
