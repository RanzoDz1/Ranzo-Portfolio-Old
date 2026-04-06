"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const GA_ID = "G-RYS7QE704Y";

export default function Analytics() {
    const [consented, setConsented] = useState(false);

    useEffect(() => {
        const check = () => {
            const consent = localStorage.getItem("cookie-consent");
            setConsented(consent === "accepted");
        };
        check();
        window.addEventListener("cookie-consent-updated", check);
        return () => window.removeEventListener("cookie-consent-updated", check);
    }, []);

    if (!GA_ID || GA_ID.includes("XXX") || !consented) return null;

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
            send_page_view: true,
            anonymize_ip: true
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
