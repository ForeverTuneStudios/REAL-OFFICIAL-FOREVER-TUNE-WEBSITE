"use client";

import { motion } from "framer-motion";
import { YOUTUBE_URL, SPOTIFY_URL, INSTAGRAM_URL } from "@/lib/constants";
import { SpotifyIcon, AppleMusicIcon, YouTubeIcon, AmazonMusicIcon, DeezerIcon, TidalIcon, TikTokIcon, InstagramIcon, FacebookIcon, SoundCloudIcon, PandoraIcon, IHeartIcon, ShazamIcon, NapsterIcon, MusicNoteIcon } from "@/components/icons/PlatformIcons";
import type { ReactNode } from "react";

interface Platform { name: string; icon: ReactNode; color: string; url?: string }

const CATEGORIES: { title: string; platforms: Platform[] }[] = [
  {
    title: "Major Global Streaming",
    platforms: [
      { name: "Spotify", icon: <SpotifyIcon />, color: "#1DB954", url: SPOTIFY_URL },
      { name: "Apple Music", icon: <AppleMusicIcon />, color: "#FA2D48" },
      { name: "YouTube Music", icon: <YouTubeIcon />, color: "#FF0000", url: YOUTUBE_URL },
      { name: "Amazon Music", icon: <AmazonMusicIcon />, color: "#00A8E1" },
      { name: "Deezer", icon: <DeezerIcon />, color: "#A238FF" },
      { name: "TIDAL", icon: <TidalIcon />, color: "#00FFFF" },
      { name: "Napster", icon: <NapsterIcon />, color: "#1A1A2E" },
      { name: "Pandora", icon: <PandoraIcon />, color: "#224099" },
      { name: "Qobuz", icon: <MusicNoteIcon />, color: "#0088CC" },
    ],
  },
  {
    title: "Social & Video Platforms",
    platforms: [
      { name: "TikTok / Resso", icon: <TikTokIcon />, color: "#EE1D52" },
      { name: "Instagram", icon: <InstagramIcon />, color: "#E1306C", url: INSTAGRAM_URL },
      { name: "YouTube", icon: <YouTubeIcon />, color: "#FF0000", url: YOUTUBE_URL },
      { name: "SoundCloud", icon: <SoundCloudIcon />, color: "#FF5500" },
      { name: "Facebook", icon: <FacebookIcon />, color: "#1877F2" },
    ],
  },
  {
    title: "Asian & Regional Markets",
    platforms: [
      { name: "Tencent Music", icon: <MusicNoteIcon />, color: "#12B7F5" },
      { name: "NetEase Cloud", icon: <MusicNoteIcon />, color: "#C20C0C" },
      { name: "JioSaavn", icon: <MusicNoteIcon />, color: "#2BC5B4" },
      { name: "KKBOX", icon: <MusicNoteIcon />, color: "#09CEE8" },
      { name: "Boomplay", icon: <MusicNoteIcon />, color: "#F5A623" },
      { name: "Anghami", icon: <MusicNoteIcon />, color: "#8B5CF6" },
      { name: "LINE MUSIC", icon: <MusicNoteIcon />, color: "#00C300" },
      { name: "AWA", icon: <MusicNoteIcon />, color: "#FC6431" },
      { name: "Melon", icon: <MusicNoteIcon />, color: "#00CD3C" },
      { name: "Bugs!", icon: <MusicNoteIcon />, color: "#FF3D00" },
      { name: "FLO", icon: <MusicNoteIcon />, color: "#3D5AFE" },
      { name: "JOOX", icon: <MusicNoteIcon />, color: "#00CC00" },
    ],
  },
  {
    title: "Distribution Networks",
    platforms: [
      { name: "Kanjian Network", icon: <MusicNoteIcon />, color: "#FF6B35" },
      { name: "Kuack Media", icon: <MusicNoteIcon />, color: "#7B68EE" },
      { name: "iHeartRadio", icon: <IHeartIcon />, color: "#C6002B" },
      { name: "Shazam", icon: <ShazamIcon />, color: "#0088FF" },
      { name: "Claro-música", icon: <MusicNoteIcon />, color: "#DA291C" },
    ],
  },
];

export default function AllPlatformsSection() {
  return (
    <section className="relative py-20 sm:py-28 px-4 overflow-hidden">
      <div className="section-divider mb-20 sm:mb-28" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-14">
          <p className="text-[10px] sm:text-xs tracking-[0.3em] text-neon-pink/50 uppercase font-semibold mb-3">Listen Everywhere</p>
          <h2 className="section-heading">All Platforms</h2>
          <p className="text-white/30 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
            Find FOREVER TUNE on 50+ streaming services worldwide
          </p>
        </motion.div>

        {CATEGORIES.map((cat, ci) => (
          <motion.div key={cat.title} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: ci * 0.08 }}
            className="mb-10">
            <h3 className="text-xs sm:text-sm font-bold text-white/70 mb-4 flex items-center gap-2.5 tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-neon-pink to-neon-blue" />
              {cat.title}
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2.5">
              {cat.platforms.map((p, i) => {
                const inner = (
                  <>
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center mb-2 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${p.color}12`, color: p.color }}>
                      {p.icon}
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-semibold text-white/50 group-hover:text-white/80 transition-colors leading-tight text-center">
                      {p.name}
                    </span>
                  </>
                );

                return (
                  <motion.div key={p.name} initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.02 }}>
                    {p.url ? (
                      <a href={p.url} target="_blank" rel="noopener noreferrer"
                        className="group glass rounded-xl p-3 sm:p-4 flex flex-col items-center text-center h-full hover:scale-[1.04] hover:-translate-y-0.5 transition-all duration-300">
                        {inner}
                      </a>
                    ) : (
                      <div className="group glass rounded-xl p-3 sm:p-4 flex flex-col items-center text-center h-full opacity-60">
                        {inner}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}

        <p className="text-center text-[10px] text-white/20 mt-8">
          Distributed globally via RouteNote to 50+ platforms. New services added regularly.
        </p>
      </div>
    </section>
  );
}
