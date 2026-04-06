import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Ranzo Web Design & Development",
  description: "Privacy Policy for Ranzo Web Design & Development. Learn how we collect, use, and protect your personal data.",
  alternates: { canonical: "https://ranzodz.com/privacy-policy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicy() {
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
          <h1 className="text-4xl font-extrabold tracking-tight mb-3">Privacy Policy</h1>
          <p className="text-gray-400 text-sm">Last updated: {lastUpdated}</p>
        </div>

        <div className="space-y-10 text-gray-300 text-[15px] leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Introduction</h2>
            <p>
              Ranzo Web Design &amp; Development (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates the website{" "}
              <a href="https://ranzo.dev" className="text-blue-400 underline">https://ranzo.dev</a>{" "}
              (the &ldquo;Service&rdquo;). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Information We Collect</h2>
            <h3 className="text-base font-semibold text-gray-100 mb-2">Information you provide directly:</h3>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>Name and email address (when submitting the contact form)</li>
              <li>Project details and messages sent via contact form</li>
            </ul>
            <h3 className="text-base font-semibold text-gray-100 mb-2">Information collected automatically (with consent):</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Pages visited and time spent on each page</li>
              <li>Browser type, operating system, and device type</li>
              <li>Referring URL and general geographic region</li>
              <li>Interactions with page elements (clicks, scrolls)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. How We Use Your Information</h2>
            <p className="mb-3">We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Respond to your inquiries and project requests</li>
              <li>Improve the website experience and content</li>
              <li>Analyze website traffic and user behavior (with consent)</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Analytics &amp; Cookies</h2>
            <p className="mb-3">
              We use <strong className="text-white">Google Analytics 4</strong> to analyze website traffic. This service may collect your IP address, browser information, and browsing behavior on our site. We only activate analytics after you provide explicit consent via our cookie banner.
            </p>
            <p>
              You can opt out of Google Analytics at any time by declining cookies on our banner or visiting{" "}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                Google Analytics Opt-out
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Third-Party Services</h2>
            <p className="mb-3">We use the following third-party services:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong className="text-white">FormSubmit.co</strong> — for processing contact form submissions</li>
              <li><strong className="text-white">Google Analytics</strong> — for website analytics (consent required)</li>
              <li><strong className="text-white">Google Fonts</strong> — for typography (may set cookies)</li>
              <li><strong className="text-white">Vercel</strong> — our hosting provider (may collect server logs)</li>
              <li><strong className="text-white">Unsplash</strong> — for stock photography on the website</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Data Retention</h2>
            <p>
              Contact form submissions are retained only as long as necessary to respond to your inquiry (typically 30 days). Analytics data is retained for 14 months as per Google Analytics default settings. We do not sell, rent, or share your personal data with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Your Rights (GDPR)</h2>
            <p className="mb-3">If you are located in the European Economic Area (EEA) or UK, you have the following rights:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong className="text-white">Access</strong> — Request a copy of the data we hold about you</li>
              <li><strong className="text-white">Rectification</strong> — Request correction of inaccurate data</li>
              <li><strong className="text-white">Erasure</strong> — Request deletion of your personal data</li>
              <li><strong className="text-white">Objection</strong> — Object to processing of your personal data</li>
              <li><strong className="text-white">Portability</strong> — Request transfer of your data</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at:{" "}
              <a href="mailto:contact@ranzodz.com" className="text-blue-400 underline">contact@ranzodz.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">8. Security</h2>
            <p>
              We implement industry-standard security measures including HTTPS encryption, Content Security Policy headers, and HSTS to protect information transmitted to and from our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">9. Children&apos;s Privacy</h2>
            <p>
              Our website is not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If you believe we have collected data from a minor, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. Changes will be posted on this page with an updated &ldquo;Last updated&rdquo; date. Continued use of the website after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">11. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us:
            </p>
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
