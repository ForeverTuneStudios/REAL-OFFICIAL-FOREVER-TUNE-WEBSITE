"use client";

import Link from "next/link";
import { YOUTUBE_URL, SPOTIFY_URL, INSTAGRAM_URL, BUSINESS_EMAIL } from "@/lib/constants";
import { YouTubeIcon, SpotifyIcon, InstagramIcon } from "@/components/icons/PlatformIcons";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.04] bg-[#040407]/90 backdrop-blur-xl">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-neon-pink/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-neon-pink to-neon-purple flex items-center justify-center shadow-lg shadow-neon-pink/10">
                <span className="text-white font-black text-xs">FT</span>
              </div>
              <div>
                <div className="text-white font-extrabold text-sm tracking-wider">FOREVER TUNE</div>
                <div className="text-[8px] text-neon-pink/50 tracking-[0.2em] font-semibold -mt-0.5">STUDIOS</div>
              </div>
            </div>
            <p className="text-xs text-white/25 leading-relaxed mb-3">Where Music Lives Forever.</p>
            <a href={`mailto:${BUSINESS_EMAIL}`} className="text-xs text-white/25 hover:text-neon-pink transition-colors break-all">{BUSINESS_EMAIL}</a>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-white/60 font-semibold mb-4 text-[10px] tracking-[0.15em] uppercase">Navigate</h4>
            <div className="flex flex-col gap-2">
              {["/","/music","/videos","/about","/contact"].map((h) => (
                <Link key={h} href={h} className="text-xs text-white/25 hover:text-neon-pink transition-colors capitalize">
                  {h === "/" ? "Home" : h.slice(1)}
                </Link>
              ))}
            </div>
          </div>

          {/* Listen */}
          <div>
            <h4 className="text-white/60 font-semibold mb-4 text-[10px] tracking-[0.15em] uppercase">Listen</h4>
            <div className="flex flex-col gap-2">
              <a href={SPOTIFY_URL} target="_blank" rel="noopener noreferrer" className="text-xs text-white/25 hover:text-neon-pink transition-colors">Spotify</a>
              <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="text-xs text-white/25 hover:text-neon-pink transition-colors">YouTube</a>
              <span className="text-xs text-white/25">Apple Music</span>
              <span className="text-xs text-white/25">Amazon Music</span>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white/60 font-semibold mb-4 text-[10px] tracking-[0.15em] uppercase">Legal</h4>
            <div className="flex flex-col gap-2">
              {[{l:"Privacy Policy",h:"/privacy"},{l:"Terms",h:"/terms"},{l:"Cookies",h:"/cookies"},{l:"DMCA",h:"/dmca"}].map(({l,h}) => (
                <Link key={h} href={h} className="text-xs text-white/25 hover:text-neon-pink transition-colors">{l}</Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-white/20">© {new Date().getFullYear()} FOREVER TUNE STUDIOS. All Rights Reserved.</p>
          <div className="flex items-center gap-5">
            <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-red-500 transition-colors"><YouTubeIcon className="w-4 h-4" /></a>
            <a href={SPOTIFY_URL} target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-green-500 transition-colors"><SpotifyIcon className="w-4 h-4" /></a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-pink-500 transition-colors"><InstagramIcon className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
