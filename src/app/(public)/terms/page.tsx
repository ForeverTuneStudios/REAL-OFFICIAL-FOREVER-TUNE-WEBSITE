import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service | FOREVER TUNE STUDIOS" };

export default function TermsPage() {
  return (
    <div className="pt-24 pb-16 px-4 min-h-screen max-w-3xl mx-auto">
      <h1 className="section-heading mb-8">Terms of Service</h1>
      <div className="glass rounded-2xl p-8 text-white/50 leading-relaxed space-y-4 text-sm">
        <p>Last updated: {new Date().getFullYear()}</p>
        <p>By accessing and using the FOREVER TUNE STUDIOS website, you accept and agree to be bound by these Terms of Service.</p>
        <h2 className="text-white font-bold text-lg pt-4">Use of Content</h2>
        <p>All content on this website, including music, artwork, text, and graphics, is the property of FOREVER TUNE STUDIOS and is protected by copyright law. You may not reproduce, distribute, or create derivative works without explicit written permission.</p>
        <h2 className="text-white font-bold text-lg pt-4">User Conduct</h2>
        <p>You agree to use this website for lawful purposes only and in a way that does not infringe the rights of others.</p>
        <h2 className="text-white font-bold text-lg pt-4">Limitation of Liability</h2>
        <p>FOREVER TUNE STUDIOS is not liable for any damages arising from your use of this website.</p>
        <p className="pt-4 text-white/30">© FOREVER TUNE STUDIOS. All Rights Reserved.</p>
      </div>
    </div>
  );
}
