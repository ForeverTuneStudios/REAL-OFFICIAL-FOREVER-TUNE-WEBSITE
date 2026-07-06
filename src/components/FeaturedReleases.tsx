"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface Release {
  id: number;
  title: string;
  type: string;
  coverArt: string | null;
  releaseDate: string;
  description: string | null;
}

export default function FeaturedReleases({ releases }: { releases: Release[] }) {
  if (releases.length === 0) return null;

  return (
    <section className="relative py-16 sm:py-20 md:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="text-[10px] sm:text-xs tracking-[0.3em] text-neon-pink/60 uppercase font-medium">Discography</span>
          <h2 className="section-heading mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Latest Releases</h2>
        </motion.div>

        {/* Releases grid - responsive */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {releases.slice(0, 6).map((release, i) => (
            <motion.div
              key={release.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/music/${release.id}`} className="group block">
                <div className="relative aspect-square rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden mb-2 sm:mb-3 md:mb-4 neon-border">
                  {/* Cover art or gradient placeholder */}
                  {release.coverArt ? (
                    <img
                      src={release.coverArt}
                      alt={release.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-neon-pink/20 via-neon-purple/20 to-neon-blue/20 flex items-center justify-center">
                      <svg className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                      </svg>
                    </div>
                  )}

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-dark-bg/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-3 sm:p-4 md:p-6">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-neon-pink flex items-center justify-center">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                      <span className="text-[10px] sm:text-xs md:text-sm font-medium text-white hidden sm:block">Listen Now</span>
                    </div>
                  </div>

                  {/* Type badge */}
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-dark-bg/80 backdrop-blur-sm border border-white/10 text-[8px] sm:text-[10px] font-medium tracking-wider text-white/60 uppercase">
                    {release.type}
                  </div>
                </div>

                <h3 className="text-sm sm:text-base md:text-lg font-bold text-white group-hover:text-neon-pink transition-colors duration-300 truncate">
                  {release.title}
                </h3>
                <p className="text-[10px] sm:text-xs md:text-sm text-white/40 mt-0.5 sm:mt-1">
                  {new Date(release.releaseDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8 sm:mt-12"
        >
          <Link href="/music" className="btn-secondary inline-flex items-center gap-2 text-xs sm:text-sm px-5 sm:px-8 py-2.5 sm:py-3">
            View All Releases
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
