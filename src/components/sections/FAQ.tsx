"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { smoothScrollTo } from "@/lib/smoothScroll";
import { pmEase } from "@/lib/animations";

const faqs = [
    {
        question: "How much does a custom landing page cost?",
        answer: "Landing page pricing starts from $500 and varies based on complexity, custom animations, and integrations needed. Currently offering 50% off your first project, bringing starter pages to just $250.",
    },
    {
        question: "What is the difference between Webflow and WordPress?",
        answer: "Webflow offers visual development with clean code output, no plugin dependencies, and built-in hosting. WordPress uses PHP with plugins that can slow performance. Webflow sites typically score 20-40 points higher on Google Lighthouse and require less maintenance.",
    },
    {
        question: "How long does it take to design and develop a website?",
        answer: "A landing page typically takes 1-2 business days. A full multi-page website takes 1-2 weeks depending on complexity. Webflow migrations from WordPress average 3-5 days. Rush delivery is available for urgent projects.",
    },
    {
        question: "Do you offer SEO optimization with web design?",
        answer: "Yes! Every project includes technical SEO as standard: proper meta tags, structured data markup, fast loading speeds, mobile optimization, sitemap generation, and Core Web Vitals optimization. Additional ongoing SEO strategy is available as an add-on service.",
    },
    {
        question: "Can you convert my Figma design to Webflow?",
        answer: "Absolutely. Figma-to-Webflow conversion is one of my core specialties. I deliver pixel-perfect builds with clean class naming, responsive breakpoints, CMS collections setup, and smooth interactions, all fully editable by your team.",
    },
    {
        question: "What industries do you work with?",
        answer: "I work across B2B SaaS, E-Commerce, FinTech, Professional Services, Home Services, Media & Publishing, and Logistics. With 300+ projects delivered, I bring cross-industry conversion insights to every project.",
    },
    {
        question: "Do you provide ongoing maintenance and support?",
        answer: "Yes. I offer monthly maintenance packages that include content updates, performance monitoring, security patches, analytics reviews, and priority support. This ensures your website stays fast, secure, and up-to-date.",
    },
    {
        question: "What is conversion rate optimization (CRO)?",
        answer: "CRO is the systematic process of improving your website to increase the percentage of visitors who take a desired action - whether that's filling out a form, making a purchase, or signing up. I use heatmap analysis, A/B testing, and UX best practices to maximize conversions.",
    },
    {
        question: "How do I get started with a project?",
        answer: "Simply fill out the contact form or send an email describing your project. I'll review your requirements within 12 hours and send a detailed proposal with timeline, pricing, and next steps. No commitment needed for the initial consultation.",
    },
    {
        question: "What makes your web design services different from others?",
        answer: "Three things: (1) Every design is built to convert, not just look pretty - I use data-driven layouts and proven UX patterns. (2) Technical performance is guaranteed - all sites achieve 95+ Lighthouse scores. (3) I handle everything from design to development to SEO, so you get a complete solution from one expert.",
    },
];

function FAQItem({ faq, index, isOpen, onToggle }: { faq: typeof faqs[0]; index: number; isOpen: boolean; onToggle: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.4, delay: index * 0.035, ease: pmEase.entrance }}
            className={`border border-[var(--border)] rounded-xl overflow-hidden bg-[var(--card)] transition-all duration-300 ${isOpen ? 'border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.06)]' : 'hover:border-blue-500/20'}`}
        >
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                aria-expanded={isOpen}
            >
                <span className="text-sm sm:text-base font-semibold text-[var(--foreground)] leading-snug pr-4">
                    {faq.question}
                </span>
                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.22, ease: pmEase.smooth }}
                    className="flex-shrink-0 text-[var(--muted-foreground)]"
                >
                    <ChevronDown size={18} />
                </motion.span>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="overflow-hidden will-change-auto"
                    >
                        <p className="px-6 pb-5 text-sm text-[var(--muted-foreground)] leading-relaxed">
                            {faq.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "0px" });

    return (
        <section id="faq" className="pt-28 pb-6 px-6 bg-[var(--muted)]" aria-label="Frequently Asked Questions">
            <div className="max-w-3xl mx-auto" ref={ref}>
                {/* Header */}
                <div className="text-center mb-14">
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, ease: pmEase.entrance }}
                        className="text-blue-500 text-sm font-semibold tracking-widest uppercase mb-3"
                    >
                        FAQ
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.08, duration: 0.4, ease: pmEase.entrance }}
                        className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--foreground)]"
                    >
                        Frequently Asked{" "}
                        <span className="text-gradient">Questions</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.16, duration: 0.4, ease: pmEase.entrance }}
                        className="mt-4 text-[var(--muted-foreground)] max-w-lg mx-auto"
                    >
                        Everything you need to know about working together. Can&apos;t find your answer? Feel free to reach out.
                    </motion.p>
                </div>

                {/* Accordion */}
                <div className="space-y-3">
                    {faqs.map((faq, i) => (
                        <FAQItem
                            key={i}
                            faq={faq}
                            index={i}
                            isOpen={openIndex === i}
                            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                        />
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="text-center mt-6"
                >
                    <p className="text-sm text-[var(--muted-foreground)] mb-4">
                        Still have questions?
                    </p>
                    <motion.button
                        onClick={() => smoothScrollTo("#contact")}
                        whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(59, 130, 246, 0.15)" }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--border)] text-[var(--foreground)] font-semibold text-sm hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/5 transition-all duration-300"
                    >
                        Contact Me →
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}
