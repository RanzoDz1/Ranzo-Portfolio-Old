"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 200,
        damping: 50,
        restDelta: 0.001,
    });

    return (
        <motion.div
            className="pm-scroll-progress"
            style={{ scaleX }}
            aria-hidden="true"
        />
    );
}
