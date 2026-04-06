"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { projects, Project } from "@/lib/data";
import { smoothScrollTo } from "@/lib/smoothScroll";
import PortfolioPopup from "@/components/PortfolioPopup";
import { pmEase } from "@/lib/animations";

type FilterCategory = "all" | "landing" | "website" | "webflow" | "mobile" | "dashboard";

const filters: { key: FilterCategory; label: string }[] = [
    { key: "all", label: "All" },
    { key: "landing", label: "Landing Pages" },
    { key: "website", label: "Websites" },
    { key: "webflow", label: "Webflow" },
    { key: "mobile", label: "Mobile Apps" },
    { key: "dashboard", label: "Dashboards" },
];

/* ── Project Card ──────────────────────────────────────────────────── */
function ProjectCard({
    project,
    index,
    onOpen,
}: {
    project: Project;
    index: number;
    onOpen: (p: Project) => void;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "0px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: index * 0.08, ease: pmEase.entrance }}
            whileHover={{ y: -6, transition: { duration: 0.3, ease: pmEase.smooth } }}
            className="group relative flex flex-col h-full rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden transition-all duration-300 hover:shadow-[var(--pm-shadow-premium)] cursor-pointer"
            onClick={() => onOpen(project)}
            role="button"
            tabIndex={0}
            aria-label={`View ${project.title} case study`}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onOpen(project); }}
        >
            {/* Gradient header */}
            <div className={`relative h-28 sm:h-40 bg-gradient-to-br ${project.gradient} overflow-hidden flex items-center justify-center`}>
                {/* Animated orb */}
                <motion.div
                    className="absolute w-28 h-28 rounded-full opacity-25 blur-2xl bg-white"
                    animate={{ scale: [1, 1.4, 1], x: [0, 18, 0], y: [0, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Type badge */}
                <span className="absolute top-3 left-3 text-xs font-bold text-white/90 bg-black/25 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    {project.type}
                </span>

                {/* Hover overlay CTA */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileHover={{ scale: 1 }}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-gray-900 font-bold text-sm shadow-xl group-hover:scale-100 scale-90 transition-transform duration-300"
                    >
                        View Case Study <ArrowRight size={14} />
                    </motion.div>
                </div>

                {/* Project title */}
                <div className="relative z-10 text-center px-3 sm:px-5">
                    <p className="text-[9px] sm:text-[11px] font-semibold text-white/70 uppercase tracking-widest mb-1">
                        {project.industry}
                    </p>
                    <h3 className="text-sm sm:text-xl font-bold text-white leading-tight drop-shadow">
                        {project.title}
                    </h3>
                </div>
            </div>

            {/* Body */}
            <div className="flex flex-col flex-1 p-3 sm:p-5 gap-2 sm:gap-4">
                <p className="text-[11px] sm:text-sm text-[var(--muted-foreground)] leading-relaxed min-h-[3rem] sm:min-h-[4.5rem]">
                    {project.description}
                </p>

                {/* Feature list */}
                <ul className="hidden sm:block space-y-1.5 flex-1">
                    {project.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-xs text-[var(--muted-foreground)]">
                            <span
                                className="mt-[3px] w-2.5 h-2.5 rounded-full flex-shrink-0 border"
                                style={{ background: `${project.accentColor}30`, borderColor: `${project.accentColor}60` }}
                            />
                            {f}
                        </li>
                    ))}
                </ul>

                {/* Tags + CTA */}
                <div className="mt-auto pt-2 sm:pt-3 border-t border-[var(--border)] flex items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-medium"
                                style={{
                                    backgroundColor: `${project.accentColor}12`,
                                    color: project.accentColor,
                                    border: `1px solid ${project.accentColor}28`,
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <span
                        className="text-xs font-semibold flex items-center gap-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ color: project.accentColor }}
                    >
                        Open <ArrowRight size={11} />
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

/* ── Section ───────────────────────────────────────────────────────── */
export default function Projects() {
    const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const isHeaderInView = useInView(headerRef, { once: true, margin: "0px" });

    const filtered = activeFilter === "all"
        ? projects
        : projects.filter((p) => p.category === activeFilter);

    return (
        <section id="projects" className="py-28 px-6 bg-[var(--muted)]">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-14">
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, ease: pmEase.entrance }}
                        className="text-blue-500 text-sm font-semibold tracking-widest uppercase mb-3"
                    >
                        Portfolio
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.55, delay: 0.08, ease: pmEase.entrance }}
                        className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--foreground)]"
                    >
                        Featured{" "}
                        <span className="text-gradient">Projects</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.55, delay: 0.16, ease: pmEase.entrance }}
                        className="mt-4 text-[var(--muted-foreground)] max-w-xl mx-auto"
                    >
                        Landing pages, full websites, Webflow builds, mobile app UIs, and admin dashboards,
                        all built to rank, convert, and impress. Click any card to see the full case study.
                    </motion.p>

                    {/* Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.55, delay: 0.24, ease: pmEase.entrance }}
                        className="flex flex-wrap justify-center gap-2 mt-8"
                    >
                        {filters.map((f) => (
                            <motion.button
                                key={f.key}
                                onClick={() => setActiveFilter(f.key)}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                transition={{ type: "tween", duration: 0.15 }}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === f.key
                                    ? "bg-[var(--accent)] text-white shadow-lg shadow-blue-500/20"
                                    : "border border-[var(--border)] text-[var(--muted-foreground)] hover:border-[var(--accent)]/50 hover:text-[var(--foreground)]"
                                    }`}
                            >
                                {f.label}
                            </motion.button>
                        ))}
                    </motion.div>
                </div>

                {/* Grid */}
                <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((project, i) => (
                            <motion.div
                                key={project.id}
                                layout
                                exit={{ opacity: 0, scale: 0.92 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ProjectCard
                                    project={project}
                                    index={i}
                                    onOpen={setSelectedProject}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="text-center mt-14"
                >
                    <motion.button
                        onClick={() => smoothScrollTo("#contact")}
                        whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(59, 130, 246, 0.15)" }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "tween", duration: 0.2 }}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--border)] text-[var(--foreground)] font-semibold text-sm hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 transition-all duration-300"
                    >
                        Have a project in mind? Let&apos;s talk →
                    </motion.button>
                </motion.div>
            </div>

            {/* Popup */}
            <PortfolioPopup
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </section>
    );
}
