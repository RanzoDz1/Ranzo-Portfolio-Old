"use client";

import Script from "next/script";

// Replace G-XXXXXXXXXX with your real GA4 Measurement ID from:
// https://analytics.google.com > Admin > Data Streams > Web > Measurement ID
const GA_ID = "G-RYS7QE704Y";

export default function Analytics() {
    const isPlaceholder = GA_ID.includes("XXX");
    if (!GA_ID || isPlaceholder) return null;

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
            send_page_view: true
          });
        `}
            </Script>
        </>
    );
}

// Helper to track events from anywhere in the app
export function trackEvent(name: string, params?: Record<string, string | number>) {
    if (typeof window === "undefined") return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (typeof w.gtag === "function") {
        w.gtag("event", name, params);
    }
}
