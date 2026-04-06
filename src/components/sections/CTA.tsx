"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { smoothScrollTo } from "@/lib/smoothScroll";
import { pmEase } from "@/lib/animations";
import Image from "next/image";

// Unsplash: aerial dark cityscape / premium office
const CTA_BG_URL =
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&q=80&fm=webp&auto=format&fit=crop";

export default function CTA() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "0px" });

    return (
        <section className="relative py-28 px-6 bg-[var(--background)] overflow-hidden">
            {/* ── Full-width Unsplash background image + overlay ── */}
            <div className="absolute inset-0 pointer-events-none">
                <Image
                    src={CTA_BG_URL}
                    alt=""
                    fill
                    className="object-cover opacity-[0.08]"
                    sizes="100vw"
                    loading="lazy"
                    aria-hidden="true"
                />
                {/* Brand-color gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)]/80 via-[var(--background)]/60 to-[var(--background)]/80" />

                {/* Static ambient blobs — no animation */}
                <div className="absolute top-1/2 left-1/4 w-72 h-72 rounded-full bg-blue-500/8 blur-2xl pointer-events-none" />
                <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-violet-500/8 blur-2xl pointer-events-none" />
            </div>

            <div className="max-w-3xl mx-auto text-center relative z-10" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 16, scale: 0.96 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.4, ease: pmEase.entrance }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-8"
                >
                    <Sparkles size={14} />
                    Open for new projects
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 22 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.06, duration: 0.42, ease: pmEase.entrance }}
                    className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-[var(--foreground)]"
                >
                    Let&apos;s Build Something{" "}
                    <span className="text-gradient">Remarkable</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.12, duration: 0.4, ease: pmEase.entrance }}
                    className="mt-6 text-lg text-[var(--muted-foreground)] max-w-xl mx-auto"
                >
                    Whether you need a high-converting landing page, a full website redesign,
                    or a pixel-perfect Webflow build, I&apos;ve got you.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.18, duration: 0.4, ease: pmEase.entrance }}
                    className="mt-10 flex flex-wrap gap-4 justify-center"
                >
                    <motion.button
                        onClick={() => smoothScrollTo("#contact")}
                        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.3), 0 8px 24px rgba(59, 130, 246, 0.2)" }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.18, ease: pmEase.smooth }}
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--accent)] text-white font-semibold hover:bg-[var(--accent-hover)] transition-all duration-200 shadow-xl shadow-blue-500/25 text-sm pm-btn-primary"
                    >
                        Start a Project <ArrowRight size={15} />
                    </motion.button>
                    <motion.a
                        href="#projects"
                        onClick={(e) => { e.preventDefault(); smoothScrollTo("#projects"); }}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.18, ease: pmEase.smooth }}
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[var(--border)] text-[var(--foreground)] font-semibold hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/5 transition-all duration-200 text-sm"
                    >
                        View My Work
                    </motion.a>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.24, duration: 0.4 }}
                    className="mt-10 text-xs text-[var(--muted-foreground)]"
                >
                    ✓ Fast turnaround &nbsp; · &nbsp; ✓ Clean code &nbsp; · &nbsp; ✓ Results-driven design
                </motion.p>
            </div>
        </section>
    );
}
