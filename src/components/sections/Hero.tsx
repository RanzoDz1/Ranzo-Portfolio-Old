"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Sparkles, BarChart3, CheckCircle2, Code2 } from "lucide-react";
import { smoothScrollTo } from "@/lib/smoothScroll";
import { trackEvent } from "@/components/Analytics";
import { pmEase } from "@/lib/animations";

// Curated Unsplash hero background — dark workspace / premium office
const HERO_BG_URL =
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=75&fm=webp&auto=format&fit=crop";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [bgLoaded, setBgLoaded] = useState(false);
    const [heroTitle, setHeroTitle] = useState("Your Website.");

    useEffect(() => {
        fetch("/api/settings")
            .then(res => res.json())
            .then(data => {
                if (data.hero_title) setHeroTitle(data.hero_title);
            })
            .catch(() => {});
    }, []);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile, { passive: true });
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Preload hero background (desktop only)
    useEffect(() => {
        if (isMobile) return;
        const img = new window.Image();
        img.src = HERO_BG_URL;
        img.onload = () => setBgLoaded(true);
    }, [isMobile]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // Simple transforms — no spring, no blur, no scale
    const y1      = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const bgY     = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

    return (
        <section
            ref={containerRef}
            id="hero"
            className="relative min-h-[140vh] flex items-start"
        >
            <div
                className="sticky top-0 w-full h-screen overflow-hidden text-[#f0f4ff] bg-[#0a0f1c]"
                style={{ transform: "translateZ(0)" }}
            >
                {/* Static vignette */}
                <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-b from-black/50 via-transparent to-black/50" />

                {/* Background — parallax only on desktop */}
                <motion.div
                    style={isMobile ? {} : { y: bgY }}
                    className="absolute inset-[-5%] w-[110%] h-[110%] pointer-events-none"
                >
                    {!isMobile && (
                        <div
                            className={`absolute inset-0 transition-opacity duration-700 ${bgLoaded ? "opacity-100" : "opacity-0"}`}
                            style={{
                                backgroundImage: `url(${HERO_BG_URL})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1c]/80 via-[#0a0f1c]/70 to-[#0a0f1c]/90" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1c]/50 via-transparent to-[#0a0f1c]/50" />

                    {/* Static color orbs — no animation, just CSS */}
                    <div className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-blue-600/15 blur-[80px] pointer-events-none" />
                    <div className="absolute bottom-[15%] right-[20%] w-[35vw] h-[35vw] rounded-full bg-purple-600/10 blur-[80px] pointer-events-none" />
                </motion.div>

                {/* Subtle grid — desktop only, static */}
                {!isMobile && (
                    <div
                        className="absolute inset-0 pointer-events-none opacity-20"
                        style={{
                            backgroundImage: `
                                linear-gradient(to right, rgba(59,130,246,0.06) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(59,130,246,0.06) 1px, transparent 1px)
                            `,
                            backgroundSize: "60px 60px",
                        }}
                    />
                )}

                {/* Floating decoration cards — desktop only, appear once, no infinite loop */}
                {!isMobile && (
                    <motion.div style={{ y: y1, opacity }} className="absolute inset-0 pointer-events-none overflow-hidden">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6, duration: 0.5, ease: pmEase.entrance }}
                            className="hidden lg:flex absolute top-[25%] left-[8%] flex-col gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 shadow-2xl"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                    <BarChart3 size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-medium">+140%</p>
                                    <p className="text-sm text-white font-bold">Conversion</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.5, ease: pmEase.entrance }}
                            className="hidden lg:flex absolute bottom-[28%] right-[12%] flex-col gap-2 p-4 rounded-xl bg-white/5 border border-white/10 shadow-2xl"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                                    <Code2 size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-medium">Built with</p>
                                    <p className="text-sm text-white font-bold">Next.js &amp; Webflow</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8, duration: 0.5, ease: pmEase.entrance }}
                            className="hidden md:flex absolute top-[15%] right-[8%] items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-2xl"
                        >
                            <CheckCircle2 size={16} className="text-emerald-400" />
                            <span className="text-sm text-emerald-100 font-medium">SEO Optimized</span>
                        </motion.div>
                    </motion.div>
                )}

                {/* Main Content */}
                <motion.div
                    style={isMobile ? { opacity } : { y: y1, opacity }}
                    className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 w-full pb-[15vh]"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.4, ease: pmEase.entrance }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-8"
                    >
                        <Sparkles size={14} />
                        Premium Web Design &amp; Development
                    </motion.div>

                    {/* Heading */}
                    <div className="space-y-3 relative">
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-500/8 blur-[60px] -z-10 rounded-full pointer-events-none" />
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.4, ease: pmEase.entrance }}
                            className="text-[2.5rem] sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[1.1] sm:leading-none relative z-10"
                        >
                            Design. Build. Develop.
                        </motion.h1>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.4, ease: pmEase.entrance }}
                            className="text-[2.5rem] sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.1] sm:leading-none text-gradient relative z-10"
                        >
                            {heroTitle}
                        </motion.h1>
                    </div>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.4, ease: pmEase.entrance }}
                        className="mt-8 max-w-2xl text-lg sm:text-xl text-gray-300 leading-relaxed"
                    >
                        I&apos;m <span className="text-white font-semibold">Ranzo</span>, a premium freelance web developer crafting high-converting landing pages and custom websites.
                        Elevate your digital presence with pixel-perfect design and a <strong className="text-blue-400 font-semibold">50% introductory discount</strong> on your first project.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.4, ease: pmEase.entrance }}
                        className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center relative z-20 w-full px-2 sm:max-w-none mx-auto"
                    >
                        <button
                            onClick={() => {
                                smoothScrollTo("#projects");
                                trackEvent("hero_cta_work", { section: "hero" });
                            }}
                            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-blue-600/30 pm-btn-primary"
                        >
                            View My Work
                        </button>
                        <button
                            onClick={() => {
                                smoothScrollTo("#contact");
                                trackEvent("hero_cta_talk", { section: "hero" });
                            }}
                            className="w-full sm:w-auto px-7 py-3.5 rounded-full border border-white/20 text-white font-semibold text-sm hover:bg-white/5 active:scale-95 transition-all duration-200"
                        >
                            Let&apos;s Talk
                        </button>
                    </motion.div>
                </motion.div>

                {/* Tech strip — desktop only */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                    className="hidden md:flex absolute bottom-12 lg:bottom-24 left-0 w-full flex-col items-center pointer-events-none"
                >
                    <p className="text-xs text-gray-400 tracking-widest uppercase mb-4 font-medium">
                        Crafting high-performance digital products
                    </p>
                    <div className="flex items-center justify-center gap-8 md:gap-16 text-gray-300">
                        <span className="text-sm font-semibold opacity-80 flex items-center gap-2"><Code2 size={16} /> Webflow</span>
                        <span className="text-sm font-semibold opacity-80">Figma</span>
                        <span className="text-sm font-semibold opacity-80">Next.js</span>
                        <span className="text-sm font-semibold opacity-80 hidden sm:flex">Framer</span>
                    </div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                    style={{ opacity }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 pointer-events-none"
                >
                    <span className="text-[10px] tracking-widest uppercase font-semibold">Scroll</span>
                    <ArrowDown size={14} className="animate-bounce" />
                </motion.div>
            </div>
        </section>
    );
}
