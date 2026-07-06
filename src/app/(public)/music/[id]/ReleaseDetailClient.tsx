"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import StreamingPlatforms from "@/components/StreamingPlatforms";

interface Release {
  id: number;
  title: string;
  type: string;
  coverArt: string | null;
  releaseDate: string;
  description: string | null;
  lyrics: string | null;
  credits: string | null;
  streamingLinks: Record<string, string> | null;
}

export default function ReleaseDetailClient({ release }: { release: Release }) {
  return (
    <div className="pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Back button */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 sm:mb-8">
          <Link href="/music" className="text-xs sm:text-sm text-white/40 hover:text-neon-pink transition-colors flex items-center gap-2">
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Music
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
          {/* Cover art */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-[300px] sm:max-w-[400px] lg:max-w-none mx-auto rounded-2xl sm:rounded-3xl overflow-hidden neon-border pulse-glow">
              {release.coverArt ? (
                <img src={release.coverArt} alt={release.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-neon-pink/20 via-dark-surface to-neon-blue/20 flex items-center justify-center">
                  <svg className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-white/10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                  </svg>
                </div>
              )}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neon-pink/20 bg-neon-pink/5 mb-3 sm:mb-4">
              <span className="text-[10px] sm:text-xs font-medium tracking-wider text-neon-pink uppercase">{release.type}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 sm:mb-4">{release.title}</h1>

            <p className="text-xs sm:text-sm text-white/40 mb-4 sm:mb-6">
              Released {new Date(release.releaseDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>

            {release.description && (
              <p className="text-white/60 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">{release.description}</p>
            )}

            {release.credits && (
              <div className="mb-6 sm:mb-8">
                <h3 className="text-xs sm:text-sm tracking-[0.2em] text-white/50 uppercase font-medium mb-2">Credits</h3>
                <p className="text-white/40 text-xs sm:text-sm">{release.credits}</p>
              </div>
            )}

            {/* Streaming links */}
            {release.streamingLinks && (
              <div className="mb-6 sm:mb-8">
                <StreamingPlatforms links={release.streamingLinks} releaseTitle={release.title} />
              </div>
            )}
          </motion.div>
        </div>

        {/* Lyrics section */}
        {release.lyrics && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 sm:mt-16 glass rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8"
          >
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
              <span className="text-neon-pink">♪</span> Lyrics
            </h2>
            <pre className="text-white/60 whitespace-pre-wrap font-sans leading-relaxed text-sm sm:text-base">{release.lyrics}</pre>
          </motion.div>
        )}
      </div>
    </div>
  );
}
