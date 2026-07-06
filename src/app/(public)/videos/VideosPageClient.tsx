"use client";

import { motion } from "framer-motion";
import { YOUTUBE_URL } from "@/lib/constants";

export default function VideosPageClient() {
  return (
    <div className="pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="text-[10px] sm:text-xs tracking-[0.3em] text-red-500/60 uppercase font-medium">YouTube</span>
          <h1 className="section-heading mt-2">Videos</h1>
          <p className="text-white/40 mt-3 sm:mt-4 max-w-lg mx-auto text-sm sm:text-base px-4">
            Watch the latest music videos, shorts, and exclusive content
          </p>
        </motion.div>

        {/* YouTube Channel Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center"
        >
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-red-600 to-red-700 items-center justify-center mb-8 shadow-xl shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-300 hover:scale-105 mx-auto"
          >
            <svg className="w-14 h-14 sm:w-16 sm:h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">FOREVER TUNE</h2>
          <p className="text-white/40 text-sm sm:text-base mb-8 max-w-lg mx-auto">
            Subscribe for music videos, behind-the-scenes content, shorts, live sessions, and more. New releases drop regularly!
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 bg-red-600 hover:bg-red-700 rounded-full text-white font-bold text-sm sm:text-base transition-all duration-300 shadow-lg shadow-red-500/20 hover:shadow-red-500/40 hover:scale-105"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Subscribe on YouTube
            </a>
          </div>
        </motion.div>

        {/* Content Types */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8"
        >
          {[
            { icon: "🎬", label: "Music Videos" },
            { icon: "📱", label: "Shorts" },
            { icon: "🎤", label: "Live Sessions" },
            { icon: "🎥", label: "Behind Scenes" },
          ].map((item) => (
            <a
              key={item.label}
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-xl p-4 sm:p-6 text-center hover:scale-105 transition-all duration-300"
            >
              <div className="text-2xl sm:text-3xl mb-2">{item.icon}</div>
              <div className="text-xs sm:text-sm text-white/60">{item.label}</div>
            </a>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
