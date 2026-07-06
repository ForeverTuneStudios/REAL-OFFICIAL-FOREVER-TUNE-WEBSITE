import type { ReactNode } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Ambient light effect */}
      <div className="ambient-light" />
      <ParticleBackground />
      <Navigation />
      <main className="relative z-10 min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
