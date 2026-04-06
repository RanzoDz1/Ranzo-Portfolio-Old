"use client";
import { useEffect } from "react";

// Ensure hard refresh always starts at the very top
function ScrollToTop() {
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);
  return null;
}

// Back button behaviour:
//  1st press → if a modal is open, close it; otherwise scroll to top
//  2nd press → if already at top, browser navigates away normally
function BackInterceptor() {
  useEffect(() => {
    history.pushState({ __ranzodev: true }, "");

    const onPopState = () => {
      // Modal open? close it first, re-push state so next back scrolls to top
      const modals = (window as any).__ranzodz_modals as Set<string> | undefined;
      if (modals && modals.size > 0) {
        window.dispatchEvent(new CustomEvent("ranzodz:close-modal"));
        history.pushState({ __ranzodev: true }, "");
        return;
      }
      // Not at top? scroll up and re-push so next back leaves site
      if (window.scrollY > 50) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        history.pushState({ __ranzodev: true }, "");
      }
      // Already at top → do nothing, browser navigates away naturally
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);
  return null;
}

export default function ClientBootstrap() {
  return (
    <>
      <ScrollToTop />
      <BackInterceptor />
    </>
  );
}
