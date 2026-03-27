import { animate } from "framer-motion";

/**
 * smoothScrollTo – custom eased scroll animation using Framer Motion.
 * duration: 0.9s for a visible, deliberate glide.
 */
export function smoothScrollTo(targetId: string, offset = 80) {
    let targetPosition = 0;

    if (targetId !== "top") {
        const element = document.querySelector(targetId);
        if (!element) {
            console.warn(`[smoothScrollTo] Element not found: ${targetId}`);
            return;
        }
        // Calculate absolute top position
        const rect = element.getBoundingClientRect();
        targetPosition = rect.top + window.scrollY - offset;
    }

    const startPosition = window.scrollY;

    // Use Framer Motion's animate for a reliable, interruptible curve
    animate(startPosition, targetPosition, {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (latest) => {
            window.scrollTo(0, latest);
        },
    });
}
