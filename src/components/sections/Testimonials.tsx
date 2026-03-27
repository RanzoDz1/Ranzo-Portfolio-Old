"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { pmEase } from "@/lib/animations";

const testimonials = [
    {
        id: 1,
        name: "Alex Mercer",
        role: "Founder, TechFlow SaaS",
        content: "Ranzo completely transformed our conversion rates. The new landing page he designed and built in Webflow is not just beautiful, it's a lead-generation machine. We saw a 140% increase in signups in the first month.",
        rating: 5,
        gradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
        id: 2,
        name: "Sarah Jenkins",
        role: "Marketing Director, Elevate B2B",
        content: "Working with Ranzo was the best decision for our rebranding. He delivered a pixel-perfect, lightning-fast website that our entire team loves. His technical SEO knowledge also helped us rank on page 1 for our main keywords.",
        rating: 5,
        gradient: "from-violet-500/20 to-fuchsia-500/20",
    },
    {
        id: 3,
        name: "David Chen",
        role: "CEO, Nexa Logistics",
        content: "We needed a complex custom CRM dashboard, and Ranzo delivered beyond our expectations. He turned overwhelming data into an intuitive, seamless user interface. The attention to detail and UX is unmatched.",
        rating: 5,
        gradient: "from-emerald-500/20 to-teal-500/20",
    },
];

function StarRating({ rating, delay }: { rating: number; delay: number }) {
    return (
        <div className="flex gap-0.5 mb-4">
            {[...Array(rating)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                        delay: delay + i * 0.06,
                        duration: 0.35,
                        ease: pmEase.hover,
                    }}
                >
                    <Star size={14} fill="currentColor" className="text-amber-500" />
                </motion.div>
            ))}
        </div>
    );
}

export default function Testimonials() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "0px" });

    return (
        <section id="testimonials" className="py-28 px-6 bg-[var(--background)] relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

            <div className="max-w-6xl mx-auto" ref={ref}>
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, ease: pmEase.entrance }}
                        className="inline-flex items-center justify-center gap-1.5 mb-4"
                    >
                        <div className="flex text-amber-500">
                            {[...Array(5)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease: pmEase.hover }}
                                >
                                    <Star size={16} fill="currentColor" />
                                </motion.div>
                            ))}
                        </div>
                        <span className="text-sm font-semibold tracking-widest uppercase text-[var(--foreground)] ml-2">
                            4.9/5 Average Rating
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.08, duration: 0.4, ease: pmEase.entrance }}
                        className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--foreground)]"
                    >
                        Client <span className="text-gradient">Success Stories</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.16, duration: 0.4, ease: pmEase.entrance }}
                        className="mt-4 text-[var(--muted-foreground)] max-w-lg mx-auto"
                    >
                        Don&apos;t just take my word for it. Here is what leading founders and marketing directors have to say.
                    </motion.p>
                </div>

                {/* Testimonial Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, i) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.4, delay: 0.08 + i * 0.07, ease: pmEase.entrance }}
                            whileHover={{ y: -4, transition: { duration: 0.25, ease: pmEase.smooth } }}
                            className="relative p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] flex flex-col h-full hover:border-blue-500/30 transition-all duration-300 group hover:shadow-[var(--pm-shadow-premium)]"
                        >
                            {/* Subtle Gradient Glow on Hover */}
                            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: pmEase.hover }}
                            >
                                <Quote className="text-blue-500/20 w-10 h-10 mb-2" />
                            </motion.div>

                            <StarRating rating={testimonial.rating} delay={0.3 + i * 0.1} />

                            <p className="text-[var(--foreground)] text-sm sm:text-base leading-relaxed mb-6 flex-grow relative z-10">
                                &quot;{testimonial.content}&quot;
                            </p>

                            <div className="relative z-10 mt-auto pt-6 border-t border-[var(--border)]/50">
                                <p className="font-bold text-[var(--foreground)] text-sm">{testimonial.name}</p>
                                <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{testimonial.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
