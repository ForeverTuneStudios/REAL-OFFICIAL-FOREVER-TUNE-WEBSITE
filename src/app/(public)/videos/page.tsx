import type { Metadata } from "next";
import VideosPageClient from "./VideosPageClient";

export const metadata: Metadata = {
  title: "Videos | FOREVER TUNE STUDIOS",
  description: "Watch the latest music videos, shorts, and content from FOREVER TUNE STUDIOS",
};

export default function VideosPage() {
  return <VideosPageClient />;
}
