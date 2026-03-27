import { Variants } from "framer-motion";

/* ── Premium Easing Curves ─────────────────────────────────────── */
export const pmEase = {
    entrance: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    hover: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
    scroll: [0.16, 1, 0.3, 1] as [number, number, number, number],
    smooth: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

/* ── Backdrop & Modal ──────────────────────────────────────────── */
export const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.18, ease: "easeOut" } },
    exit: { opacity: 0, transition: { duration: 0.12, ease: "easeIn" } },
};

export const modalVariants: Variants = {
    hidden: { opacity: 0, scale: 0.96, y: 12 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.28, ease: pmEase.smooth },
    },
    exit: {
        opacity: 0,
        scale: 0.96,
        y: 8,
        transition: { duration: 0.18, ease: [0.64, 0, 0.78, 0] },
    },
};

/* ── Premium Stagger Container ─────────────────────────────────── */
export const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.06, delayChildren: 0.04 },
    },
};

export const staggerContainerFast: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.035, delayChildren: 0.02 },
    },
};

/* ── Fast Item Reveal ──────────────────────────────────────────── */
export const itemVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: pmEase.entrance },
    },
};

export const itemVariantsFade: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.35, ease: pmEase.smooth },
    },
};

/* ── Premium Scale Reveal ──────────────────────────────────────── */
export const metricVariants: Variants = {
    hidden: { opacity: 0, scale: 0.93 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.4, ease: pmEase.entrance },
    },
};

/* ── Premium Card Hover ────────────────────────────────────────── */
export const cardHover = {
    scale: 1.02,
    y: -4,
    transition: { duration: 0.25, ease: pmEase.smooth },
};

export const cardTap = {
    scale: 0.98,
    transition: { duration: 0.08 },
};

/* ── Section Header Reveal ─────────────────────────────────────── */
export const sectionHeaderVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.42, ease: pmEase.entrance },
    },
};
