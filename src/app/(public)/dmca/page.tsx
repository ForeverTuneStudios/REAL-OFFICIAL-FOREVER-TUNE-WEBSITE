import type { Metadata } from "next";

export const metadata: Metadata = { title: "DMCA | FOREVER TUNE STUDIOS" };

export default function DmcaPage() {
  return (
    <div className="pt-24 pb-16 px-4 min-h-screen max-w-3xl mx-auto">
      <h1 className="section-heading mb-8">DMCA Policy</h1>
      <div className="glass rounded-2xl p-8 text-white/50 leading-relaxed space-y-4 text-sm">
        <p>Last updated: {new Date().getFullYear()}</p>
        <p>FOREVER TUNE STUDIOS respects the intellectual property rights of others and expects its users to do the same.</p>
        <h2 className="text-white font-bold text-lg pt-4">Copyright Infringement</h2>
        <p>If you believe that content available on this website infringes your copyright, please send a written notification to our designated agent with the following information:</p>
        <ul className="list-disc list-inside space-y-1 pl-4">
          <li>A description of the copyrighted work you claim has been infringed</li>
          <li>The URL or location of the infringing material</li>
          <li>Your contact information</li>
          <li>A statement of good faith belief that the use is unauthorized</li>
          <li>A statement under penalty of perjury that the information is accurate</li>
          <li>Your physical or electronic signature</li>
        </ul>
        <h2 className="text-white font-bold text-lg pt-4">Contact</h2>
        <p>Send DMCA notices to: business@forevertunestudios.com</p>
        <p className="pt-4 text-white/30">© FOREVER TUNE STUDIOS. All Rights Reserved.</p>
      </div>
    </div>
  );
}
