"use client";

import { motion } from "framer-motion";

const TIMELINE = [
  { year: "The Beginning", title: "Forever Tune Studios Founded", desc: "A vision was born — to create music that transcends time, trends, and boundaries." },
  { year: "First Release", title: "Debut Single Launch", desc: "Our first track dropped across all major streaming platforms, reaching listeners worldwide." },
  { year: "Growing", title: "Expanding the Catalog", desc: "Building a diverse catalog of singles, albums, and instrumentals across multiple genres." },
  { year: "The Future", title: "Infinite Possibilities", desc: "The journey continues with new releases, collaborations, and global expansion." },
];

export default function AboutPageClient() {
  return (
    <div className="pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <span className="text-[10px] sm:text-xs tracking-[0.3em] text-neon-pink/60 uppercase font-medium">Our Story</span>
          <h1 className="section-heading mt-2">About Forever Tune</h1>
        </motion.div>

        {/* Bio section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 mb-12 sm:mb-16 md:mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-10">
            {/* Art */}
            <div className="lg:col-span-2 flex justify-center">
              <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-xl sm:rounded-2xl bg-gradient-to-br from-neon-pink/20 via-dark-surface to-neon-blue/20 flex items-center justify-center relative overflow-hidden">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-6 sm:inset-8 border border-neon-pink/10 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-12 sm:inset-16 border border-neon-blue/10 rounded-full"
                />
                <span className="text-5xl sm:text-6xl md:text-7xl font-black bg-gradient-to-br from-neon-pink to-neon-blue bg-clip-text text-transparent relative z-10">
                  FT
                </span>
              </div>
            </div>

            {/* Bio text */}
            <div className="lg:col-span-3 flex flex-col justify-center text-center lg:text-left">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6">FOREVER TUNE STUDIOS</h2>
              <p className="text-white/50 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                FOREVER TUNE STUDIOS is a premium music production company dedicated to crafting timeless 
                music experiences. We push boundaries and create sonic landscapes that resonate with 
                audiences worldwide.
              </p>
              <p className="text-white/50 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                Our mission is simple: create music that lives forever. From the first note to the final 
                mix, every element is crafted with precision, passion, and an unwavering commitment to 
                excellence.
              </p>
              <p className="text-white/50 leading-relaxed text-sm sm:text-base">
                We believe music has the power to connect, inspire, and transform. Through innovative 
                production, bold creativity, and authentic artistry, we are building a legacy that will 
                echo through generations.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="section-heading text-center mb-8 sm:mb-12">The Journey</h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-pink/50 via-neon-purple/30 to-neon-blue/50 md:-translate-x-px" />

            {TIMELINE.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`relative flex items-start gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-neon-pink -translate-x-1 md:-translate-x-1.5 mt-1.5 sm:mt-2 z-10 shadow-lg shadow-neon-pink/30" />

                {/* Content */}
                <div className={`ml-10 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 lg:pr-16 md:text-right" : "md:pl-12 lg:pl-16"}`}>
                  <span className="text-[10px] sm:text-xs tracking-[0.2em] text-neon-pink/60 uppercase font-bold">{item.year}</span>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mt-1 mb-1 sm:mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-white/40">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-heading text-center mb-8 sm:mb-12">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              { emoji: "🎵", title: "Musical Excellence", desc: "Every production meets the highest standards of quality and creativity." },
              { emoji: "💡", title: "Innovation", desc: "Pushing boundaries and exploring new sonic territories." },
              { emoji: "♾️", title: "Timelessness", desc: "Creating music that remains relevant and impactful across generations." },
            ].map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 text-center"
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{v.emoji}</div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2">{v.title}</h3>
                <p className="text-xs sm:text-sm text-white/40">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
