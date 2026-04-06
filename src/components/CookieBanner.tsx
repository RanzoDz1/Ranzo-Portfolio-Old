"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/components/Analytics";

export default function CookieBanner() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) setVisible(true);
    }, []);

    const accept = () => {
        localStorage.setItem("cookie-consent", "accepted");
        setVisible(false);
        trackEvent("cookie_consent", { action: "accepted" });
        window.dispatchEvent(new Event("cookie-consent-updated"));
    };

    const decline = () => {
        localStorage.setItem("cookie-consent", "declined");
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div
            role="dialog"
            aria-label="Cookie consent"
            className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6"
        >
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-sm px-5 py-4 shadow-2xl">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                    <span className="text-lg mt-0.5 shrink-0">🍪</span>
                    <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                        We use cookies and Google Analytics to understand how visitors use our site and improve your experience. See our{" "}
                        <a href="/privacy-policy" className="underline hover:text-[var(--foreground)] transition-colors">
                            Privacy Policy
                        </a>{" "}
                        for details.
                    </p>
                </div>
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                    <button
                        onClick={decline}
                        className="px-4 py-2 text-xs font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] border border-[var(--border)] rounded-lg transition-all duration-200 hover:bg-white/5"
                    >
                        Decline
                    </button>
                    <button
                        onClick={accept}
                        className="px-4 py-2 text-xs font-semibold bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-lg transition-all duration-200"
                    >
                        Accept All
                    </button>
                </div>
            </div>
        </div>
    );
}
