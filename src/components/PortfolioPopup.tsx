"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    ExternalLink,
    ArrowRight,
    CheckCircle2,
    Clock,
    Layers,
    TrendingUp,
    Quote,
} from "lucide-react";
import { Project } from "@/lib/data";
import { popupData } from "@/lib/portfolioPopupData";
import { smoothScrollTo } from "@/lib/smoothScroll";
import {
    backdropVariants,
    modalVariants,
    staggerContainer,
    itemVariants,
    metricVariants,
} from "@/lib/animations";

interface PortfolioPopupProps {
    project: Project | null;
    onClose: () => void;
}

/* ── Gradient Mock Screen ──────────────────────────────────────────── */
function MockScreen({ gradient, title, index }: { gradient: string; title: string; index: number }) {
    const layouts = [
        // Navbar + hero layout
        <div key={0} className="absolute inset-0 flex flex-col">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-black/20">
                <div className="w-14 h-2 rounded-full bg-white/40" />
                <div className="flex gap-2">
                    <div className="w-8 h-1.5 rounded-full bg-white/30" />
                    <div className="w-8 h-1.5 rounded-full bg-white/30" />
                    <div className="w-8 h-1.5 rounded-full bg-white/30" />
                    <div className="w-16 h-1.5 rounded-full bg-white/60" />
                </div>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6">
                <div className="w-3/4 h-4 rounded-full bg-white/50" />
                <div className="w-2/3 h-3 rounded-full bg-white/30" />
                <div className="w-1/2 h-3 rounded-full bg-white/20" />
                <div className="flex gap-2 mt-3">
                    <div className="w-20 h-6 rounded-full bg-white/70" />
                    <div className="w-20 h-6 rounded-full border border-white/40" />
                </div>
            </div>
        </div>,
        // Dashboard layout
        <div key={1} className="absolute inset-0 flex">
            <div className="w-1/4 h-full bg-black/25 border-r border-white/10 flex flex-col gap-2 p-3">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className={`h-2 rounded-full ${i === 0 ? "bg-white/60 w-3/4" : "bg-white/20 w-2/3"}`} />
                ))}
            </div>
            <div className="flex-1 p-3 flex flex-col gap-2">
                <div className="grid grid-cols-3 gap-2">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-10 rounded-lg bg-white/10 border border-white/10" />
                    ))}
                </div>
                <div className="flex-1 rounded-lg bg-white/10 border border-white/10" />
            </div>
        </div>,
        // Landing page layout
        <div key={2} className="absolute inset-0 flex flex-col gap-2 p-4">
            <div className="w-full h-24 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-24 h-3 rounded-full bg-white/50" />
                    <div className="w-16 h-2 rounded-full bg-white/30" />
                    <div className="w-12 h-4 rounded-full bg-white/60 mt-1" />
                </div>
            </div>
            <div className="grid grid-cols-3 gap-2 flex-1">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="rounded-lg bg-white/10 border border-white/10" />
                ))}
            </div>
        </div>,
    ];

    return (
        <div className={`relative w-full h-full bg-gradient-to-br ${gradient} overflow-hidden`}>
            <div className="absolute inset-0 opacity-20 bg-noise" />
            {layouts[index % layouts.length]}
            <div className="absolute bottom-3 right-3 text-[8px] font-bold text-white/40 uppercase tracking-widest">
                {title}
            </div>
        </div>
    );
}

/* ── Main Popup ────────────────────────────────────────────────────── */
export default function PortfolioPopup({ project, onClose }: PortfolioPopupProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const data = project ? popupData[project.id] : null;

    // Reset scroll on open
    useEffect(() => {
        if (project && scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
    }, [project]);

    // Escape key to close
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    // Lock body scroll when open
    useEffect(() => {
        if (project) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [project]);

    return (
        <AnimatePresence>
            {project && data && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
                        aria-hidden="true"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-[101] flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none">
                        <motion.div
                            key="modal"
                            role="dialog"
                            aria-modal="true"
                            aria-label={`${project.title} case study`}
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            ref={scrollRef}
                            className="pointer-events-auto relative w-full sm:max-w-3xl max-h-[96dvh] sm:max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-[var(--card)] border border-[var(--border)] shadow-2xl focus:outline-none"
                            tabIndex={-1}
                        >
                            {/* ── Sticky Close ── */}
                            <button
                                onClick={onClose}
                                aria-label="Close popup"
                                className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/30 text-white/70 hover:text-white hover:bg-black/50 transition-all duration-200 backdrop-blur-sm"
                            >
                                <X size={16} />
                            </button>

                            {/* ── Hero Banner ── */}
                            <div className={`relative h-52 sm:h-64 w-full bg-gradient-to-br ${project.gradient} overflow-hidden flex-shrink-0`}>
                                <MockScreen gradient={project.gradient} title={project.title} index={0} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                {/* Badges */}
                                <div className="absolute top-4 left-4 flex items-center gap-2">
                                    <span className="px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm text-white text-xs font-bold tracking-wide border border-white/20">
                                        {project.type}
                                    </span>
                                    <span className="px-3 py-1 rounded-full text-white text-xs font-medium"
                                        style={{ background: `${project.accentColor}40`, border: `1px solid ${project.accentColor}60` }}>
                                        {project.industry}
                                    </span>
                                </div>
                                {/* Title overlay */}
                                <div className="absolute bottom-4 left-5 right-14">
                                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-lg">
                                        {project.title}
                                    </h2>
                                </div>
                            </div>

                            {/* ── Body ── */}
                            <motion.div
                                variants={staggerContainer}
                                initial="hidden"
                                animate="visible"
                                className="px-5 sm:px-8 pb-8 pt-6 space-y-8"
                            >
                                {/* ── Metrics Strip ── */}
                                <motion.div variants={itemVariants}>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                        {data.metrics.map((m) => (
                                            <motion.div
                                                key={m.label}
                                                variants={metricVariants}
                                                className="relative flex flex-col items-center justify-center gap-1 p-4 rounded-2xl border border-[var(--border)] bg-[var(--muted)] overflow-hidden group"
                                            >
                                                <div
                                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-75"
                                                    style={{ background: `linear-gradient(135deg, ${project.accentColor}12, transparent)` }}
                                                />
                                                <span
                                                    className="text-2xl font-extrabold tracking-tight"
                                                    style={{ color: project.accentColor }}
                                                >
                                                    {m.value}
                                                </span>
                                                <span className="text-[10px] font-semibold text-[var(--muted-foreground)] uppercase tracking-wider text-center leading-tight">
                                                    {m.label}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* ── Mock Screens Gallery ── */}
                                <motion.div variants={itemVariants}>
                                    <div className="grid grid-cols-3 gap-3 h-28 sm:h-36 rounded-2xl overflow-hidden">
                                        {[0, 1, 2].map((i) => (
                                            <div key={i} className="rounded-xl overflow-hidden border border-[var(--border)] relative">
                                                <MockScreen gradient={project.gradient} title={project.title} index={i} />
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* ── Challenge ── */}
                                <motion.div variants={itemVariants} className="space-y-2">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)] flex items-center gap-2">
                                        <span className="w-4 h-px" style={{ background: project.accentColor }} />
                                        The Challenge
                                    </h3>
                                    <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
                                        {data.challenge}
                                    </p>
                                </motion.div>

                                {/* ── Solution ── */}
                                <motion.div variants={itemVariants} className="space-y-2">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)] flex items-center gap-2">
                                        <span className="w-4 h-px" style={{ background: project.accentColor }} />
                                        The Solution
                                    </h3>
                                    <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
                                        {data.solution}
                                    </p>
                                </motion.div>

                                {/* ── Features / Accomplishments ── */}
                                <motion.div variants={itemVariants} className="space-y-3">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)] flex items-center gap-2">
                                        <span className="w-4 h-px" style={{ background: project.accentColor }} />
                                        Key Accomplishments
                                    </h3>
                                    <ul className="grid sm:grid-cols-2 gap-2">
                                        {data.features.map((f) => (
                                            <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--foreground)]">
                                                <CheckCircle2
                                                    size={15}
                                                    className="flex-shrink-0 mt-[2px]"
                                                    style={{ color: project.accentColor }}
                                                />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>

                                {/* ── Project Details Card ── */}
                                <motion.div variants={itemVariants}>
                                    <div
                                        className="rounded-2xl border border-[var(--border)] overflow-hidden"
                                        style={{ background: `${project.accentColor}08` }}
                                    >
                                        <div className="px-5 py-4 border-b border-[var(--border)]">
                                            <h3 className="text-sm font-bold text-[var(--foreground)] flex items-center gap-2">
                                                <Layers size={14} style={{ color: project.accentColor }} />
                                                Project Details
                                            </h3>
                                        </div>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 divide-x divide-y divide-[var(--border)]">
                                            <div className="px-4 py-3">
                                                <p className="text-[10px] font-semibold text-[var(--muted-foreground)] uppercase tracking-widest mb-1">
                                                    Timeline
                                                </p>
                                                <p className="text-sm font-semibold text-[var(--foreground)] flex items-center gap-1.5">
                                                    <Clock size={12} style={{ color: project.accentColor }} />
                                                    {data.timeline}
                                                </p>
                                            </div>
                                            <div className="px-4 py-3">
                                                <p className="text-[10px] font-semibold text-[var(--muted-foreground)] uppercase tracking-widest mb-1">
                                                    Scope
                                                </p>
                                                <p className="text-sm font-semibold text-[var(--foreground)]">
                                                    {data.scope}
                                                </p>
                                            </div>
                                            <div className="px-4 py-3 col-span-2 sm:col-span-1">
                                                <p className="text-[10px] font-semibold text-[var(--muted-foreground)] uppercase tracking-widest mb-1">
                                                    Industry
                                                </p>
                                                <p className="text-sm font-semibold text-[var(--foreground)]">
                                                    {project.industry}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="px-5 py-4 border-t border-[var(--border)]">
                                            <p className="text-[10px] font-semibold text-[var(--muted-foreground)] uppercase tracking-widest mb-2.5">
                                                Deliverables
                                            </p>
                                            <ul className="space-y-1.5">
                                                {data.deliverables.map((d) => (
                                                    <li key={d} className="flex items-center gap-2 text-xs text-[var(--foreground)]">
                                                        <span
                                                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                                            style={{ background: project.accentColor }}
                                                        />
                                                        {d}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* ── Tech Stack ── */}
                                <motion.div variants={itemVariants} className="space-y-3">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)] flex items-center gap-2">
                                        <span className="w-4 h-px" style={{ background: project.accentColor }} />
                                        Tech Stack
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {data.techStack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1.5 rounded-full text-xs font-semibold border"
                                                style={{
                                                    color: project.accentColor,
                                                    background: `${project.accentColor}12`,
                                                    borderColor: `${project.accentColor}30`,
                                                }}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* ── Testimonial ── */}
                                {data.testimonial && (
                                    <motion.div variants={itemVariants}>
                                        <div
                                            className="relative p-6 rounded-2xl border overflow-hidden"
                                            style={{
                                                borderColor: `${project.accentColor}30`,
                                                background: `linear-gradient(135deg, ${project.accentColor}08, transparent)`,
                                            }}
                                        >
                                            <Quote
                                                size={32}
                                                className="absolute top-4 right-5 opacity-15"
                                                style={{ color: project.accentColor }}
                                            />
                                            <p className="text-sm sm:text-base text-[var(--foreground)] italic leading-relaxed mb-4">
                                                &ldquo;{data.testimonial.quote}&rdquo;
                                            </p>
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                                                    style={{ background: `linear-gradient(135deg, ${project.accentColor}, ${project.accentColor}88)` }}
                                                >
                                                    {data.testimonial.author.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-[var(--foreground)]">
                                                        {data.testimonial.author}
                                                    </p>
                                                    <p className="text-xs text-[var(--muted-foreground)]">
                                                        {data.testimonial.role}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* ── Footer CTA ── */}
                                <motion.div variants={itemVariants}>
                                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 border-t border-[var(--border)]">
                                        <motion.button
                                            onClick={() => {
                                                onClose();
                                                setTimeout(() => smoothScrollTo("#contact"), 300);
                                            }}
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            transition={{ type: "tween", duration: 0.08 }}
                                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-white font-semibold text-sm shadow-lg transition-all duration-200"
                                            style={{
                                                background: `linear-gradient(135deg, ${project.accentColor}, ${project.accentColor}cc)`,
                                                boxShadow: `0 8px 32px ${project.accentColor}30`,
                                            }}
                                        >
                                            Start a Similar Project
                                            <ArrowRight size={15} />
                                        </motion.button>

                                        {data.liveUrl && (
                                            <motion.a
                                                href={data.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                                transition={{ type: "tween", duration: 0.08 }}
                                                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[var(--border)] text-[var(--foreground)] font-semibold text-sm hover:border-current transition-all duration-200"
                                                style={{ "--tw-border-opacity": 1 } as React.CSSProperties}
                                            >
                                                View Live
                                                <ExternalLink size={14} />
                                            </motion.a>
                                        )}

                                        <motion.button
                                            onClick={onClose}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            transition={{ type: "tween", duration: 0.08 }}
                                            className="sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-full border border-[var(--border)] text-[var(--muted-foreground)] font-medium text-sm hover:text-[var(--foreground)] hover:border-[var(--foreground)]/30 transition-all duration-200"
                                        >
                                            <TrendingUp size={14} />
                                            View All Projects
                                        </motion.button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
