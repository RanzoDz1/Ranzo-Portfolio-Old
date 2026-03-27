"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * Animates a number from 0 to `target` when element comes into view.
 * Returns [displayValue, ref] — attach ref to a container element.
 */
export function useCountUp(target: string, duration = 1.2) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "0px" });
    const [display, setDisplay] = useState(target);

    useEffect(() => {
        if (!isInView) return;

        const match = target.match(/^([#]?)(\d+)(.*)$/);
        if (!match) {
            setDisplay(target);
            return;
        }

        const prefix = match[1];
        const numericTarget = parseInt(match[2], 10);
        const suffix = match[3];

        let startTime: number | null = null;
        let rafId: number;

        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * numericTarget);
            setDisplay(`${prefix}${current}${suffix}`);
            if (progress < 1) rafId = requestAnimationFrame(step);
        };

        rafId = requestAnimationFrame(step);
        return () => cancelAnimationFrame(rafId);
    }, [isInView, target, duration]);

    return [display, ref] as const;
}

/**
 * Premium easing constants for Framer Motion
 */
export const premiumEasing = {
    entrance: [0.25, 0.46, 0.45, 0.94] as const,
    hover: [0.34, 1.56, 0.64, 1] as const,
    scroll: [0.16, 1, 0.3, 1] as const,
    smooth: [0.22, 1, 0.36, 1] as const,
};

/**
 * Premium timing constants — fast & snappy
 */
export const premiumTiming = {
    entrance: 0.4,
    hover: 0.25,
    scroll: 0.45,
    staggerChild: 0.06,
    staggerFast: 0.035,
};
