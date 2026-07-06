"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface Release {
  id: number;
  title: string;
  type: string;
  coverArt: string | null;
  releaseDate: string;
  description: string | null;
  lyrics: string | null;
  credits: string | null;
  isFeatured: boolean;
  isUpcoming: boolean;
  streamingLinks: Record<string, string> | null;
}

interface AnalyticsData {
  totalViews: number;
  todayViews: number;
  weekViews: number;
  monthViews: number;
  topPages: { page: string; count: number }[];
  browsers: { browser: string; count: number }[];
  devices: { device: string; count: number }[];
  topClicks: { buttonName: string; count: number }[];
  platformClicks: { platform: string; count: number }[];
}

interface ContactMsg {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
}

type Tab = "overview" | "releases" | "add-release" | "settings" | "analytics" | "messages";

const PLATFORM_KEYS = [
  "spotify", "apple_music", "youtube_music", "amazon_music", "deezer",
  "tidal", "pandora", "iheartradio", "boomplay", "anghami", "audiomack",
  "tiktok", "instagram_music", "facebook_music", "snapchat", "tencent",
  "netease", "joox", "kkbox", "line_music", "awa",
];

export default function AdminDashboard() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<Tab>("overview");
  const [releases, setReleases] = useState<Release[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [messages, setMessages] = useState<ContactMsg[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [settingsSaved, setSettingsSaved] = useState(false);

  // New release form
  const [newRelease, setNewRelease] = useState({
    title: "", type: "single", description: "", coverArt: "", releaseDate: "",
    lyrics: "", credits: "", isFeatured: false, isUpcoming: false,
    streamingLinks: {} as Record<string, string>,
  });
  const [releaseStatus, setReleaseStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const checkAuth = useCallback(async () => {
    const res = await fetch("/api/auth/me");
    if (!res.ok) {
      router.push("/admin/login");
    } else {
      setAuthed(true);
    }
  }, [router]);

  useEffect(() => { checkAuth(); }, [checkAuth]);

  const loadReleases = useCallback(async () => {
    const res = await fetch("/api/releases");
    if (res.ok) setReleases(await res.json());
  }, []);

  const loadAnalytics = useCallback(async () => {
    const res = await fetch("/api/analytics/stats");
    if (res.ok) setAnalytics(await res.json());
  }, []);

  const loadMessages = useCallback(async () => {
    const res = await fetch("/api/contact");
    if (res.ok) setMessages(await res.json());
  }, []);

  const loadSettings = useCallback(async () => {
    const res = await fetch("/api/settings");
    if (res.ok) setSettings(await res.json());
  }, []);

  useEffect(() => {
    if (authed) {
      loadReleases();
      loadAnalytics();
      loadMessages();
      loadSettings();
    }
  }, [authed, loadReleases, loadAnalytics, loadMessages, loadSettings]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const handleSaveRelease = async (e: React.FormEvent) => {
    e.preventDefault();
    setReleaseStatus("saving");
    try {
      const res = await fetch("/api/releases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRelease),
      });
      if (res.ok) {
        setReleaseStatus("saved");
        setNewRelease({ title: "", type: "single", description: "", coverArt: "", releaseDate: "", lyrics: "", credits: "", isFeatured: false, isUpcoming: false, streamingLinks: {} });
        loadReleases();
        setTimeout(() => setReleaseStatus("idle"), 3000);
      } else {
        setReleaseStatus("error");
      }
    } catch {
      setReleaseStatus("error");
    }
  };

  const handleDeleteRelease = async (id: number) => {
    if (!confirm("Delete this release?")) return;
    await fetch(`/api/releases/${id}`, { method: "DELETE" });
    loadReleases();
  };

  const handleSaveSettings = async () => {
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    if (res.ok) {
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 3000);
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-neon-pink border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const TABS: { key: Tab; label: string; icon: string }[] = [
    { key: "overview", label: "Overview", icon: "📊" },
    { key: "releases", label: "Releases", icon: "🎵" },
    { key: "add-release", label: "Add Release", icon: "➕" },
    { key: "analytics", label: "Analytics", icon: "📈" },
    { key: "messages", label: "Messages", icon: "💬" },
    { key: "settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 h-16 glass border-b border-white/5 z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-pink to-neon-purple flex items-center justify-center">
            <span className="text-white font-black text-xs">FT</span>
          </div>
          <span className="text-white font-bold text-sm hidden sm:block">Admin Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" className="text-xs text-white/40 hover:text-white transition-colors">View Site</a>
          <button onClick={handleLogout} className="text-xs text-red-400 hover:text-red-300 transition-colors">Logout</button>
        </div>
      </div>

      <div className="flex pt-16">
        {/* Sidebar */}
        <div className="fixed left-0 top-16 bottom-0 w-16 md:w-56 glass border-r border-white/5 z-40 overflow-y-auto">
          <div className="p-2 md:p-4 space-y-1">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                  tab === t.key
                    ? "bg-gradient-to-r from-neon-pink/20 to-neon-purple/10 text-white border border-neon-pink/20"
                    : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="text-lg">{t.icon}</span>
                <span className="hidden md:block">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="ml-16 md:ml-56 flex-1 p-4 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-5xl"
            >
              {/* Overview */}
              {tab === "overview" && (
                <div>
                  <h1 className="text-2xl font-bold text-white mb-8">Dashboard Overview</h1>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {[
                      { label: "Total Views", value: analytics?.totalViews || 0, color: "from-neon-pink to-neon-purple" },
                      { label: "Today", value: analytics?.todayViews || 0, color: "from-neon-blue to-neon-purple" },
                      { label: "This Week", value: analytics?.weekViews || 0, color: "from-neon-orange to-neon-pink" },
                      { label: "Releases", value: releases.length, color: "from-green-500 to-emerald-500" },
                    ].map((s) => (
                      <div key={s.label} className="glass rounded-2xl p-6">
                        <p className="text-xs text-white/40 uppercase tracking-wider mb-2">{s.label}</p>
                        <p className={`text-3xl font-black bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>
                          {s.value.toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="glass rounded-2xl p-6">
                      <h3 className="font-bold text-white mb-4">Recent Releases</h3>
                      {releases.slice(0, 5).map((r) => (
                        <div key={r.id} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-pink/20 to-neon-blue/20 flex items-center justify-center flex-shrink-0">
                            {r.coverArt ? (
                              <img src={r.coverArt} alt="" className="w-full h-full rounded-lg object-cover" />
                            ) : (
                              <span className="text-sm">🎵</span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-white truncate">{r.title}</p>
                            <p className="text-xs text-white/30">{r.type}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="glass rounded-2xl p-6">
                      <h3 className="font-bold text-white mb-4">Recent Messages</h3>
                      {messages.slice(0, 5).map((m) => (
                        <div key={m.id} className="py-2 border-b border-white/5 last:border-0">
                          <p className="text-sm text-white">{m.name}</p>
                          <p className="text-xs text-white/30 truncate">{m.message}</p>
                        </div>
                      ))}
                      {messages.length === 0 && <p className="text-xs text-white/30">No messages yet</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Releases list */}
              {tab === "releases" && (
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold text-white">Manage Releases</h1>
                    <button onClick={() => setTab("add-release")} className="px-4 py-2 rounded-xl bg-gradient-to-r from-neon-pink to-neon-purple text-white text-sm font-medium">
                      + Add Release
                    </button>
                  </div>
                  <div className="space-y-3">
                    {releases.map((r) => (
                      <div key={r.id} className="glass rounded-xl p-4 flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-neon-pink/20 to-neon-blue/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {r.coverArt ? (
                            <img src={r.coverArt} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-2xl">🎵</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-white">{r.title}</h3>
                          <p className="text-xs text-white/40">
                            {r.type} · {new Date(r.releaseDate).toLocaleDateString()}
                            {r.isFeatured && " · ⭐ Featured"}
                            {r.isUpcoming && " · 🔜 Upcoming"}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteRelease(r.id)}
                          className="text-red-400 hover:text-red-300 text-sm px-3 py-1 rounded-lg hover:bg-red-500/10 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                    {releases.length === 0 && (
                      <div className="text-center py-12 text-white/30">
                        <p className="text-4xl mb-2">🎵</p>
                        <p>No releases yet. Add your first release!</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Add Release */}
              {tab === "add-release" && (
                <div>
                  <h1 className="text-2xl font-bold text-white mb-8">Add New Release</h1>
                  <form onSubmit={handleSaveRelease} className="glass rounded-2xl p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-white/40 uppercase tracking-wider mb-1 block">Title *</label>
                        <input
                          type="text" required value={newRelease.title}
                          onChange={(e) => setNewRelease({ ...newRelease, title: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-neon-pink/50"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-white/40 uppercase tracking-wider mb-1 block">Type</label>
                        <select
                          value={newRelease.type}
                          onChange={(e) => setNewRelease({ ...newRelease, type: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-neon-pink/50"
                        >
                          <option value="single">Single</option>
                          <option value="album">Album</option>
                          <option value="ep">EP</option>
                          <option value="instrumental">Instrumental</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-white/40 uppercase tracking-wider mb-1 block">Release Date</label>
                        <input
                          type="date" value={newRelease.releaseDate}
                          onChange={(e) => setNewRelease({ ...newRelease, releaseDate: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-neon-pink/50"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-white/40 uppercase tracking-wider mb-1 block">Cover Art URL</label>
                        <input
                          type="url" value={newRelease.coverArt}
                          onChange={(e) => setNewRelease({ ...newRelease, coverArt: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-neon-pink/50"
                          placeholder="https://..."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-white/40 uppercase tracking-wider mb-1 block">Description</label>
                      <textarea
                        value={newRelease.description} rows={3}
                        onChange={(e) => setNewRelease({ ...newRelease, description: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-neon-pink/50 resize-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-white/40 uppercase tracking-wider mb-1 block">Credits</label>
                      <input
                        type="text" value={newRelease.credits}
                        onChange={(e) => setNewRelease({ ...newRelease, credits: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-neon-pink/50"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-white/40 uppercase tracking-wider mb-1 block">Lyrics</label>
                      <textarea
                        value={newRelease.lyrics} rows={6}
                        onChange={(e) => setNewRelease({ ...newRelease, lyrics: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-neon-pink/50 resize-none"
                      />
                    </div>

                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 text-sm text-white/60">
                        <input type="checkbox" checked={newRelease.isFeatured}
                          onChange={(e) => setNewRelease({ ...newRelease, isFeatured: e.target.checked })}
                          className="rounded" />
                        Featured
                      </label>
                      <label className="flex items-center gap-2 text-sm text-white/60">
                        <input type="checkbox" checked={newRelease.isUpcoming}
                          onChange={(e) => setNewRelease({ ...newRelease, isUpcoming: e.target.checked })}
                          className="rounded" />
                        Upcoming
                      </label>
                    </div>

                    {/* Streaming Links */}
                    <div>
                      <h3 className="text-sm font-bold text-white mb-3">Streaming Links</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {PLATFORM_KEYS.map((key) => (
                          <div key={key}>
                            <label className="text-xs text-white/30 capitalize mb-1 block">
                              {key.replace(/_/g, " ")}
                            </label>
                            <input
                              type="url"
                              value={newRelease.streamingLinks[key] || ""}
                              onChange={(e) => setNewRelease({
                                ...newRelease,
                                streamingLinks: { ...newRelease.streamingLinks, [key]: e.target.value },
                              })}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-neon-pink/50"
                              placeholder={`https://...`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={releaseStatus === "saving"}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-neon-pink to-neon-purple text-white font-bold text-sm transition-all hover:shadow-lg hover:shadow-neon-pink/20 disabled:opacity-50"
                    >
                      {releaseStatus === "saving" ? "Saving..." : releaseStatus === "saved" ? "✓ Saved!" : "Save Release"}
                    </button>

                    {releaseStatus === "error" && <p className="text-red-400 text-sm text-center">Failed to save. Try again.</p>}
                  </form>
                </div>
              )}

              {/* Analytics */}
              {tab === "analytics" && analytics && (
                <div>
                  <h1 className="text-2xl font-bold text-white mb-8">Analytics</h1>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {[
                      { label: "Total Views", value: analytics.totalViews },
                      { label: "Today", value: analytics.todayViews },
                      { label: "This Week", value: analytics.weekViews },
                      { label: "This Month", value: analytics.monthViews },
                    ].map((s) => (
                      <div key={s.label} className="glass rounded-2xl p-6">
                        <p className="text-xs text-white/40 uppercase tracking-wider mb-2">{s.label}</p>
                        <p className="text-3xl font-black text-white">{s.value.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Top pages */}
                    <div className="glass rounded-2xl p-6">
                      <h3 className="font-bold text-white mb-4">Top Pages</h3>
                      {analytics.topPages.map((p, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                          <span className="text-sm text-white/60 truncate flex-1">{p.page}</span>
                          <span className="text-sm font-bold text-white ml-4">{p.count}</span>
                        </div>
                      ))}
                      {analytics.topPages.length === 0 && <p className="text-xs text-white/30">No data yet</p>}
                    </div>

                    {/* Devices */}
                    <div className="glass rounded-2xl p-6">
                      <h3 className="font-bold text-white mb-4">Devices</h3>
                      {analytics.devices.map((d, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                          <span className="text-sm text-white/60">{d.device || "Unknown"}</span>
                          <span className="text-sm font-bold text-white">{d.count}</span>
                        </div>
                      ))}
                      {analytics.devices.length === 0 && <p className="text-xs text-white/30">No data yet</p>}
                    </div>

                    {/* Browsers */}
                    <div className="glass rounded-2xl p-6">
                      <h3 className="font-bold text-white mb-4">Browsers</h3>
                      {analytics.browsers.map((b, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                          <span className="text-sm text-white/60">{b.browser || "Unknown"}</span>
                          <span className="text-sm font-bold text-white">{b.count}</span>
                        </div>
                      ))}
                      {analytics.browsers.length === 0 && <p className="text-xs text-white/30">No data yet</p>}
                    </div>

                    {/* Platform clicks */}
                    <div className="glass rounded-2xl p-6">
                      <h3 className="font-bold text-white mb-4">Platform Clicks</h3>
                      {analytics.platformClicks.map((c, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                          <span className="text-sm text-white/60 capitalize">{(c.platform || "unknown").replace(/_/g, " ")}</span>
                          <span className="text-sm font-bold text-white">{c.count}</span>
                        </div>
                      ))}
                      {analytics.platformClicks.length === 0 && <p className="text-xs text-white/30">No data yet</p>}
                    </div>
                  </div>

                  <div className="mt-6 glass rounded-2xl p-6">
                    <h3 className="font-bold text-white mb-2">Platform Analytics Note</h3>
                    <p className="text-xs text-white/40">
                      YouTube, Spotify, and Instagram analytics require official API keys configured in your environment variables.
                      Detailed platform-specific analytics (subscribers, monthly listeners, etc.) must be viewed through each
                      platform&apos;s own analytics dashboard (YouTube Studio, Spotify for Artists, Instagram Insights).
                    </p>
                  </div>
                </div>
              )}

              {/* Messages */}
              {tab === "messages" && (
                <div>
                  <h1 className="text-2xl font-bold text-white mb-8">Messages ({messages.length})</h1>
                  <div className="space-y-3">
                    {messages.map((m) => (
                      <div key={m.id} className="glass rounded-xl p-6">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-white">{m.name}</h3>
                            <p className="text-xs text-white/40">{m.email}</p>
                          </div>
                          <span className="text-xs text-white/30">
                            {new Date(m.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        {m.subject && <p className="text-sm text-neon-pink/60 mb-2">{m.subject}</p>}
                        <p className="text-sm text-white/60">{m.message}</p>
                      </div>
                    ))}
                    {messages.length === 0 && (
                      <div className="text-center py-12 text-white/30">
                        <p className="text-4xl mb-2">💬</p>
                        <p>No messages yet</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Settings */}
              {tab === "settings" && (
                <div>
                  <h1 className="text-2xl font-bold text-white mb-8">Site Settings</h1>
                  <div className="glass rounded-2xl p-6 space-y-6">
                    {[
                      { key: "site_name", label: "Site Name" },
                      { key: "artist_name", label: "Artist Name" },
                      { key: "hero_tagline", label: "Hero Tagline" },
                      { key: "business_email", label: "Business Email" },
                      { key: "youtube_url", label: "YouTube URL" },
                      { key: "spotify_url", label: "Spotify URL" },
                      { key: "instagram_url", label: "Instagram URL" },
                      { key: "bio", label: "Artist Bio", textarea: true },
                      { key: "copyright_text", label: "Copyright Text" },
                      { key: "primary_color", label: "Primary Color" },
                      { key: "secondary_color", label: "Secondary Color" },
                      { key: "accent_color", label: "Accent Color" },
                    ].map((field) => (
                      <div key={field.key}>
                        <label className="text-xs text-white/40 uppercase tracking-wider mb-1 block">{field.label}</label>
                        {"textarea" in field && field.textarea ? (
                          <textarea
                            value={settings[field.key] || ""}
                            onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })}
                            rows={4}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-neon-pink/50 resize-none"
                          />
                        ) : (
                          <input
                            type="text"
                            value={settings[field.key] || ""}
                            onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-neon-pink/50"
                          />
                        )}
                      </div>
                    ))}

                    <button
                      onClick={handleSaveSettings}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-neon-pink to-neon-purple text-white font-bold text-sm"
                    >
                      {settingsSaved ? "✓ Settings Saved!" : "Save Settings"}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
