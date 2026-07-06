/* Complete list of streaming platforms supported by RouteNote */
export interface StreamingPlatform {
  key: string;
  name: string;
  color: string;
  icon: string; // SVG path or emoji fallback
}

export const STREAMING_PLATFORMS: StreamingPlatform[] = [
  { key: "spotify", name: "Spotify", color: "#1DB954", icon: "🎵" },
  { key: "apple_music", name: "Apple Music", color: "#FA2D48", icon: "🍎" },
  { key: "youtube_music", name: "YouTube Music", color: "#FF0000", icon: "▶️" },
  { key: "amazon_music", name: "Amazon Music", color: "#00A8E1", icon: "🎶" },
  { key: "deezer", name: "Deezer", color: "#A238FF", icon: "🎧" },
  { key: "tidal", name: "TIDAL", color: "#000000", icon: "🌊" },
  { key: "pandora", name: "Pandora", color: "#224099", icon: "📻" },
  { key: "iheartradio", name: "iHeartRadio", color: "#C6002B", icon: "❤️" },
  { key: "boomplay", name: "Boomplay", color: "#F5A623", icon: "💥" },
  { key: "anghami", name: "Anghami", color: "#A238FF", icon: "🎤" },
  { key: "audiomack", name: "Audiomack", color: "#FFA500", icon: "🔊" },
  { key: "tiktok", name: "TikTok", color: "#000000", icon: "🎵" },
  { key: "instagram_music", name: "Instagram Music", color: "#E1306C", icon: "📸" },
  { key: "facebook_music", name: "Facebook Music", color: "#1877F2", icon: "📘" },
  { key: "snapchat", name: "Snapchat", color: "#FFFC00", icon: "👻" },
  { key: "tencent", name: "Tencent Music", color: "#12B7F5", icon: "🎵" },
  { key: "netease", name: "NetEase Cloud Music", color: "#C20C0C", icon: "☁️" },
  { key: "joox", name: "JOOX", color: "#00CC00", icon: "🎶" },
  { key: "kkbox", name: "KKBOX", color: "#09CEE8", icon: "📦" },
  { key: "line_music", name: "LINE MUSIC", color: "#00C300", icon: "🎵" },
  { key: "awa", name: "AWA", color: "#FC6431", icon: "🔶" },
];
