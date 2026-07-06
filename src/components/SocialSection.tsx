"use client";

import { motion } from "framer-motion";
import { YOUTUBE_URL, SPOTIFY_URL, INSTAGRAM_URL } from "@/lib/constants";
import { YouTubeIcon, SpotifyIcon, InstagramIcon, ArrowIcon } from "@/components/icons/PlatformIcons";

const CARDS = [
  {
    name: "YouTube",
    icon: <YouTubeIcon className="w-7 h-7" />,
    color: "#FF0000",
    url: YOUTUBE_URL,
    desc: "Music videos, shorts, exclusive content",
    cta: "Subscribe",
  },
  {
    name: "Spotify",
    icon: <SpotifyIcon className="w-7 h-7" />,
    color: "#1DB954",
    url: SPOTIFY_URL,
    desc: "Stream all releases and playlists",
    cta: "Listen",
  },
  {
    name: "Instagram",
    icon: <InstagramIcon className="w-7 h-7" />,
    color: "#E1306C",
    url: INSTAGRAM_URL,
    desc: "Behind the scenes and updates",
    cta: "Follow",
  },
];

export default function SocialSection() {
  return (
    <section className="relative py-20 sm:py-28 px-4">
      <div className="section-divider mb-20 sm:mb-28" />

      <div className="max-w-4xl mx-auto relative">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12">
          <p className="text-[10px] sm:text-xs tracking-[0.3em] text-neon-blue/50 uppercase font-semibold mb-3">Connect</p>
          <h2 className="section-heading">Follow Us</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {CARDS.map((card, i) => (
            <motion.a key={card.name} href={card.url} target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.12 }}
              className="group relative glass rounded-2xl p-6 sm:p-7 text-center overflow-hidden hover:scale-[1.03] hover:-translate-y-1 transition-all duration-400">
              {/* hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.07] transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 50% 40%, ${card.color}, transparent 65%)` }} />

              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-transform duration-400 group-hover:scale-110 relative"
                style={{ background: `${card.color}15`, color: card.color }}>
                {card.icon}
                <div className="absolute inset-0 rounded-2xl border border-white/5" />
              </div>

              <h3 className="text-lg font-bold text-white mb-1 tracking-tight">{card.name}</h3>
              <p className="text-xs text-white/30 mb-5 leading-relaxed">{card.desc}</p>

              <div className="flex items-center justify-center gap-1.5 text-xs font-semibold transition-colors"
                style={{ color: card.color }}>
                {card.cta}
                <ArrowIcon className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
