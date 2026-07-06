import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy | FOREVER TUNE STUDIOS" };

export default function PrivacyPage() {
  return (
    <div className="pt-24 pb-16 px-4 min-h-screen max-w-3xl mx-auto">
      <h1 className="section-heading mb-8">Privacy Policy</h1>
      <div className="glass rounded-2xl p-8 text-white/50 leading-relaxed space-y-4 text-sm">
        <p>Last updated: {new Date().getFullYear()}</p>
        <p>FOREVER TUNE STUDIOS (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website.</p>
        <h2 className="text-white font-bold text-lg pt-4">Information We Collect</h2>
        <p>We may collect information you provide directly, such as your name and email address when you submit a contact form. We also collect anonymous analytics data including page views, device type, and browser information to improve our website.</p>
        <h2 className="text-white font-bold text-lg pt-4">How We Use Your Information</h2>
        <p>We use your information to respond to your inquiries, improve our website, and provide a better user experience. We do not sell your personal information to third parties.</p>
        <h2 className="text-white font-bold text-lg pt-4">Cookies</h2>
        <p>We use essential cookies to ensure the website functions properly. Analytics cookies help us understand how visitors interact with our website.</p>
        <h2 className="text-white font-bold text-lg pt-4">Contact</h2>
        <p>For any privacy-related questions, contact us at business@forevertunestudios.com</p>
        <p className="pt-4 text-white/30">© FOREVER TUNE STUDIOS. All Rights Reserved.</p>
      </div>
    </div>
  );
}
