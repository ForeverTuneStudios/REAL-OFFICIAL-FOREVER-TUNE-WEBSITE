import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#ff00aa",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://forevertunestudios.com"),
  title: {
    default: "FOREVER TUNE STUDIOS | Where Music Lives Forever",
    template: "%s | FOREVER TUNE STUDIOS",
  },
  description: "Official website of FOREVER TUNE STUDIOS - Premium music production, releases, videos, and more. Where Music Lives Forever.",
  keywords: ["Forever Tune Studios", "Forever Tune", "music", "artist", "producer", "music production", "streaming", "hip hop", "beats", "music videos"],
  authors: [{ name: "FOREVER TUNE STUDIOS" }],
  creator: "FOREVER TUNE STUDIOS",
  publisher: "FOREVER TUNE STUDIOS",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon-512.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-512.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon-512.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://forevertunestudios.com",
    siteName: "FOREVER TUNE STUDIOS",
    title: "FOREVER TUNE STUDIOS | Where Music Lives Forever",
    description: "Official website of FOREVER TUNE STUDIOS - Premium music production, releases, videos, and more.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FOREVER TUNE STUDIOS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FOREVER TUNE STUDIOS | Where Music Lives Forever",
    description: "Official website of FOREVER TUNE STUDIOS - Premium music production, releases, videos, and more.",
    images: ["/og-image.png"],
    creator: "@forevertune",
  },
  verification: {
    google: "verification_token",
  },
  category: "music",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon-512.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="FOREVER TUNE" />
        <meta name="application-name" content="FOREVER TUNE STUDIOS" />
        <meta name="msapplication-TileColor" content="#0a0a0f" />
      </head>
      <body className="bg-dark-bg text-white antialiased overflow-x-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
