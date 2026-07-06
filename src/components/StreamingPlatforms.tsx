"use client";

import { motion } from "framer-motion";
import { STREAMING_PLATFORMS } from "@/lib/streaming-platforms";

interface Props {
  links: Record<string, string>;
  releaseTitle?: string;
}

export default function StreamingPlatforms({ links, releaseTitle }: Props) {
  const activePlatforms = STREAMING_PLATFORMS.filter(
    (p) => links[p.key] && links[p.key].trim() !== ""
  );

  const handleOpenLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (activePlatforms.length === 0) return null;

  return (
    <div>
      <h3 className="text-xs sm:text-sm tracking-[0.2em] text-white/50 uppercase font-medium mb-3 sm:mb-4">
        Listen on your favorite platform
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
        {activePlatforms.map((platform, i) => (
          <motion.button
            key={platform.key}
            onClick={() => handleOpenLink(links[platform.key])}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg sm:rounded-xl glass hover:border-white/10 transition-all duration-300 cursor-pointer active:bg-white/5 w-full text-left"
            title={`Listen to ${releaseTitle || "this track"} on ${platform.name}`}
          >
            <span className="text-lg sm:text-xl">{platform.icon}</span>
            <span className="text-xs sm:text-sm font-medium text-white/70 group-hover:text-white transition-colors truncate">
              {platform.name}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Show all available RouteNote platforms */}
      <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/5">
        <p className="text-[10px] sm:text-xs text-white/30 mb-2 sm:mb-3">Also available on:</p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {STREAMING_PLATFORMS.filter(p => !links[p.key] || links[p.key].trim() === "").slice(0, 10).map((p) => (
            <span key={p.key} className="text-[10px] sm:text-xs text-white/20 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded border border-white/5">
              {p.name}
            </span>
          ))}
          <span className="text-[10px] sm:text-xs text-white/20 px-1.5 sm:px-2 py-0.5 sm:py-1">+ more</span>
        </div>
      </div>
    </div>
  );
}
