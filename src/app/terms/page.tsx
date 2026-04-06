import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Ranzo Web Design & Development",
  description: "Terms of Service for Ranzo Web Design & Development. Read the terms governing use of our website and services.",
  alternates: { canonical: "https://ranzodz.com/terms" },
  robots: { index: true, follow: true },
};

export default function Terms() {
  const lastUpdated = "April 7, 2026";

  return (
    <main className="min-h-screen bg-[#0a0f1c] text-[#f0f4ff] py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors mb-8 block"
          >
            ← Back to Home
          </a>
          <h1 className="text-4xl font-extrabold tracking-tight mb-3">Terms of Service</h1>
          <p className="text-gray-400 text-sm">Last updated: {lastUpdated}</p>
        </div>

        <div className="space-y-10 text-gray-300 text-[15px] leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the website at{" "}
              <a href="https://ranzo.dev" className="text-blue-400 underline">https://ranzo.dev</a>{" "}
              (&ldquo;the Website&rdquo;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Services Description</h2>
            <p>
              Ranzo Web Design &amp; Development provides freelance web design and development services including, but not limited to: landing page design, Webflow development, B2B website design, UI/UX design, and conversion rate optimization. The Website serves as a portfolio and point of contact for prospective clients.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Intellectual Property</h2>
            <p className="mb-3">
              All content on this Website — including text, graphics, logos, code, and design — is the intellectual property of Ranzo Web Design &amp; Development and is protected by applicable copyright and trademark laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, or create derivative works without prior written permission. Portfolio work showcased on this site is used with client permission or represents work completed under contract.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Use of the Website</h2>
            <p className="mb-3">You agree not to:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Use the website for any unlawful purpose or in violation of any regulations</li>
              <li>Attempt to gain unauthorized access to any part of the website or its infrastructure</li>
              <li>Transmit spam, malware, or any harmful code through our contact form</li>
              <li>Scrape, crawl, or extract content from the website using automated tools</li>
              <li>Misrepresent your identity when making contact or project inquiries</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Client Projects &amp; Agreements</h2>
            <p>
              Engagement for freelance services is governed by a separate client agreement or contract, which will be provided at the start of each project. These Terms of Service govern use of the Website only and do not constitute a service agreement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Disclaimer of Warranties</h2>
            <p>
              The Website is provided &ldquo;as is&rdquo; without warranties of any kind, either expressed or implied. We do not warrant that the Website will be uninterrupted, error-free, or free from viruses or other harmful components.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Ranzo Web Design &amp; Development shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of or inability to use the Website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">8. External Links</h2>
            <p>
              The Website may contain links to third-party websites. We are not responsible for the content, privacy practices, or terms of any external sites. Visiting linked websites is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">9. Governing Law</h2>
            <p>
              These Terms of Service are governed by and construed in accordance with applicable international law. Any disputes shall be resolved through good-faith negotiation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">10. Changes to Terms</h2>
            <p>
              We reserve the right to update these Terms of Service at any time. Changes will be posted on this page with an updated &ldquo;Last updated&rdquo; date. Continued use of the Website constitutes acceptance of revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">11. Contact</h2>
            <p>Questions about these Terms? Contact us:</p>
            <div className="mt-3 p-4 rounded-xl bg-white/5 border border-white/10 text-sm space-y-1">
              <p><strong className="text-white">Ranzo Web Design &amp; Development</strong></p>
              <p>Email: <a href="mailto:contact@ranzodz.com" className="text-blue-400 underline">contact@ranzodz.com</a></p>
              <p>Website: <a href="https://ranzo.dev" className="text-blue-400 underline">https://ranzo.dev</a></p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
