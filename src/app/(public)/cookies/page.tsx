import type { Metadata } from "next";

export const metadata: Metadata = { title: "Cookie Policy | FOREVER TUNE STUDIOS" };

export default function CookiesPage() {
  return (
    <div className="pt-24 pb-16 px-4 min-h-screen max-w-3xl mx-auto">
      <h1 className="section-heading mb-8">Cookie Policy</h1>
      <div className="glass rounded-2xl p-8 text-white/50 leading-relaxed space-y-4 text-sm">
        <p>Last updated: {new Date().getFullYear()}</p>
        <p>This website uses cookies to enhance your browsing experience and provide anonymous analytics.</p>
        <h2 className="text-white font-bold text-lg pt-4">Essential Cookies</h2>
        <p>These cookies are necessary for the website to function and cannot be disabled. They include authentication cookies for the admin panel.</p>
        <h2 className="text-white font-bold text-lg pt-4">Analytics Cookies</h2>
        <p>We use analytics cookies to understand how visitors interact with our website. These collect anonymous data such as page views and device information.</p>
        <h2 className="text-white font-bold text-lg pt-4">Managing Cookies</h2>
        <p>You can control cookies through your browser settings. Disabling certain cookies may affect website functionality.</p>
        <p className="pt-4 text-white/30">© FOREVER TUNE STUDIOS. All Rights Reserved.</p>
      </div>
    </div>
  );
}
