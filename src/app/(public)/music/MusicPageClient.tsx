"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Release {
  id: number;
  title: string;
  type: string;
  coverArt: string | null;
  releaseDate: string;
  description: string | null;
  isUpcoming: boolean;
}

const FILTERS = [
  { key: "all", label: "All" },
  { key: "single", label: "Singles" },
  { key: "album", label: "Albums" },
  { key: "ep", label: "EPs" },
  { key: "instrumental", label: "Instrumentals" },
  { key: "upcoming", label: "Upcoming" },
];

export default function MusicPageClient({ releases }: { releases: Release[] }) {
  const [filter, setFilter] = useState("all");

  const filtered = releases.filter((r) => {
    if (filter === "all") return true;
    if (filter === "upcoming") return r.isUpcoming;
    return r.type === filter;
  });

  return (
    <div className="pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="text-[10px] sm:text-xs tracking-[0.3em] text-neon-pink/60 uppercase font-medium">Discography</span>
          <h1 className="section-heading mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Music Library</h1>
          <p className="text-white/40 mt-3 sm:mt-4 max-w-lg mx-auto text-sm sm:text-base px-4">
            Explore every release from Forever Tune Studios. Stream on your favorite platform.
          </p>
        </motion.div>

        {/* Filters - scrollable on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 sm:mb-12 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          <div className="flex items-center justify-start sm:justify-center gap-2 min-w-max sm:min-w-0 sm:flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  filter === f.key
                    ? "bg-gradient-to-r from-neon-pink to-neon-purple text-white shadow-lg shadow-neon-pink/20"
                    : "bg-white/5 text-white/50 hover:text-white hover:bg-white/10 border border-white/5"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
          >
            {filtered.map((release, i) => (
              <motion.div
                key={release.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/music/${release.id}`} className="group block">
                  <div className="relative aspect-square rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden mb-2 sm:mb-3 neon-border">
                    {release.coverArt ? (
                      <img
                        src={release.coverArt}
                        alt={release.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-neon-pink/20 via-dark-surface to-neon-blue/20 flex items-center justify-center">
                        <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white/10" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                        </svg>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 sm:pb-6">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-neon-pink/90 flex items-center justify-center shadow-lg shadow-neon-pink/30">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                    {release.isUpcoming && (
                      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-neon-orange/90 text-white text-[8px] sm:text-[10px] font-bold tracking-wider uppercase">
                        Coming Soon
                      </div>
                    )}
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-dark-bg/80 backdrop-blur-sm border border-white/10 text-[8px] sm:text-[10px] font-medium tracking-wider text-white/60 uppercase">
                      {release.type}
                    </div>
                  </div>
                  <h3 className="font-bold text-white group-hover:text-neon-pink transition-colors duration-300 truncate text-sm sm:text-base">
                    {release.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-white/40 mt-0.5 sm:mt-1">
                    {new Date(release.releaseDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16 sm:py-20">
            <div className="text-4xl sm:text-5xl md:text-6xl mb-4">🎵</div>
            <p className="text-white/40 text-sm sm:text-base">No releases found in this category yet.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
