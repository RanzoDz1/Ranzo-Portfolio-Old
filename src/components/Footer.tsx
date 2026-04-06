"use client";

import { motion } from "framer-motion";
import { smoothScrollTo } from "@/lib/smoothScroll";

const footerLinks = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#services", label: "Services" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
];

const legalLinks = [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms" },
];

export default function Footer() {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        smoothScrollTo(href);
    };

    return (
        <footer className="border-t border-[var(--border)] bg-[var(--background)] py-10 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Logo */}
                    <motion.a
                        href="#"
                        onClick={(e) => { e.preventDefault(); smoothScrollTo("top"); }}
                        className="text-lg font-bold tracking-tight"
                        whileHover={{ scale: 1.02 }}
                    >
                        <span className="text-gradient">Ranzo</span>
                        <span className="text-[var(--muted-foreground)] font-light">.dev</span>
                    </motion.a>

                    {/* Nav links */}
                    <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-6">
                        {footerLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => handleClick(e, link.href)}
                                className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-300 pm-underline"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    {/* Copyright */}
                    <p className="text-xs text-[var(--muted-foreground)] text-center">
                        © {new Date().getFullYear()} Ranzo. All rights reserved.
                    </p>
                </div>

                {/* Legal links */}
                <div className="mt-6 pt-4 border-t border-[var(--border)] flex flex-wrap justify-center gap-4">
                    {legalLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
