"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { YOUTUBE_URL, SPOTIFY_URL, INSTAGRAM_URL, BUSINESS_EMAIL, COMPANY_NAME } from "@/lib/constants";

export default function ContactPageClient() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 sm:mb-12"
        >
          <span className="text-[10px] sm:text-xs tracking-[0.3em] text-neon-pink/60 uppercase font-medium">Get In Touch</span>
          <h1 className="section-heading mt-2">Contact</h1>
          <p className="text-white/40 mt-3 sm:mt-4 max-w-lg mx-auto text-sm sm:text-base px-4">
            For business inquiries, collaborations, and bookings
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 space-y-4"
          >
            <div className="glass rounded-xl p-5 sm:p-6">
              <h3 className="font-bold text-white mb-4 text-sm sm:text-base">Business</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-[10px] sm:text-xs text-white/30 uppercase tracking-wider">Company</span>
                  <p className="text-white/70 font-medium text-sm">{COMPANY_NAME}</p>
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs text-white/30 uppercase tracking-wider">Email</span>
                  <a href={`mailto:${BUSINESS_EMAIL}`} className="text-white/70 text-sm break-all hover:text-neon-pink transition-colors block">
                    {BUSINESS_EMAIL}
                  </a>
                </div>
              </div>
            </div>

            <div className="glass rounded-xl p-5 sm:p-6">
              <h3 className="font-bold text-white mb-4 text-sm sm:text-base">Social</h3>
              <div className="space-y-2">
                {[
                  { name: "YouTube", url: YOUTUBE_URL, color: "#FF0000" },
                  { name: "Spotify", url: SPOTIFY_URL, color: "#1DB954" },
                  { name: "Instagram", url: INSTAGRAM_URL, color: "#E1306C" },
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110" style={{ background: `${s.color}20` }}>
                      <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                    </div>
                    <span className="text-xs sm:text-sm text-white/60 group-hover:text-white transition-colors">{s.name}</span>
                    <svg className="w-3 h-3 ml-auto text-white/20 group-hover:text-white/50 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="glass rounded-xl p-5 sm:p-6 md:p-8">
              <h3 className="font-bold text-white mb-5 text-sm sm:text-base">Send a Message</h3>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] sm:text-xs text-white/40 uppercase tracking-wider mb-1.5 block">Name *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-neon-pink/50 focus:bg-white/[0.07] transition-all duration-300"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] sm:text-xs text-white/40 uppercase tracking-wider mb-1.5 block">Email *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-neon-pink/50 focus:bg-white/[0.07] transition-all duration-300"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] sm:text-xs text-white/40 uppercase tracking-wider mb-1.5 block">Subject</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-neon-pink/50 focus:bg-white/[0.07] transition-all duration-300"
                    placeholder="Business inquiry"
                  />
                </div>

                <div>
                  <label className="text-[10px] sm:text-xs text-white/40 uppercase tracking-wider mb-1.5 block">Message *</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-neon-pink/50 focus:bg-white/[0.07] transition-all duration-300 resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-3.5 rounded-lg bg-gradient-to-r from-neon-pink to-neon-purple text-white font-bold tracking-wider text-sm transition-all duration-300 hover:shadow-lg hover:shadow-neon-pink/30 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {status === "sending" ? "Sending..." : status === "sent" ? "✓ Sent!" : "Send Message"}
                </button>

                {status === "error" && <p className="text-red-400 text-xs text-center">Something went wrong. Try again.</p>}
                {status === "sent" && <p className="text-green-400 text-xs text-center">Thank you! We&apos;ll get back to you soon.</p>}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
