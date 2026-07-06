import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About | FOREVER TUNE STUDIOS",
  description: "Learn about FOREVER TUNE STUDIOS - our story, vision, and journey",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
