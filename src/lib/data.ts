export interface Project {
    id: string;
    title: string;
    industry: string;
    description: string;
    features: string[];
    tags: string[];
    category: "landing" | "website" | "webflow" | "app" | "dashboard" | "mobile";
    gradient: string;
    accentColor: string;
    year: string;
    type: string;
}

export const projects: Project[] = [
    {
        id: "website-redesign",
        title: "Website Redesign",
        type: "Website",
        industry: "B2B Tech",
        description:
            "A complete visual and structural overhaul for an aging B2B website. Designed to modernize the brand, improve UX, and significantly boost lead generation.",
        features: [
            "Modernized brand identity system",
            "Streamlined user journey",
            "Component-based design system",
            "Seamless CMS integration",
        ],
        tags: ["UX/UI Redesign", "B2B Tech", "Branding"],
        category: "website",
        gradient: "from-violet-600 via-purple-500 to-fuchsia-500",
        accentColor: "#a855f7",
        year: "2024",
    },
    {
        id: "webflow-migration",
        title: "Webflow Migration",
        type: "Webflow",
        industry: "Enterprise SaaS",
        description:
            "Transferred a slow WordPress site into a lightning-fast Webflow powerhouse. Zero downtime, perfectly preserved SEO rankings, and fully editable by the marketing team.",
        features: [
            "Pixel-perfect WordPress to Webflow",
            "Zero SEO traffic drop during move",
            "Advanced CMS collections setup",
            "Custom client-first class naming",
        ],
        tags: ["Migration", "Webflow", "Enterprise"],
        category: "webflow",
        gradient: "from-blue-600 via-indigo-500 to-sky-400",
        accentColor: "#3b82f6",
        year: "2024",
    },
    {
        id: "conversion-optimization",
        title: "Conversion Optimization",
        type: "Landing Page",
        industry: "E-Commerce",
        description:
            "Deep CRO audit and redesign of a core product landing page. Addressed drop-off points, simplified checkout, and drove a 140% increase in monthly conversions.",
        features: [
            "Heatmap-driven UX improvements",
            "A/B tested hero layouts",
            "Frictionless checkout flow",
            "Trust and social proof triggers",
        ],
        tags: ["CRO", "Landing Page", "E-Commerce"],
        category: "landing",
        gradient: "from-emerald-500 via-teal-400 to-cyan-500",
        accentColor: "#10b981",
        year: "2024",
    },
    {
        id: "page-speed-optimization",
        title: "Speed Optimization",
        type: "Website",
        industry: "Media & Publishing",
        description:
            "Technical refactoring and asset optimization that took a content-heavy media site from failing Core Web Vitals to a 99/100 Google Lighthouse score.",
        features: [
            "Next-Gen image formats & lazy loading",
            "Critical CSS generation",
            "Removed heavy third-party bloat",
            "Achieved 99/100 Lighthouse score",
        ],
        tags: ["Performance", "Technical SEO", "Speed"],
        category: "website",
        gradient: "from-orange-500 via-amber-400 to-yellow-400",
        accentColor: "#f59e0b",
        year: "2024",
    },
    {
        id: "saas-platform-ui",
        title: "SaaS Platform UI",
        type: "Dashboard",
        industry: "B2B Software",
        description:
            "Complete user interface design for a complex B2B software tool. Turned overwhelming data tables into an intuitive, user-friendly, and visually engaging dashboard.",
        features: [
            "Intuitive data visualization",
            "Dark mode first design system",
            "Modular dashboard widgets",
            "Comprehensive UI component kit",
        ],
        tags: ["SaaS UI", "Dashboard", "UX Design"],
        category: "dashboard",
        gradient: "from-cyan-600 via-sky-500 to-blue-400",
        accentColor: "#06b6d4",
        year: "2025",
    },
    {
        id: "local-seo-funnel",
        title: "Local SEO Funnel",
        type: "Landing Page",
        industry: "Home Services",
        description:
            "High-intent local funnel designed specifically to capture and convert high-value leads from Google Ads and local search results.",
        features: [
            "Dynamic location-based content",
            "Sticky CTA mobile layout",
            "Automated lead capture integration",
            "Trust-building review section",
        ],
        tags: ["Local SEO", "Lead Gen", "Advertising"],
        category: "landing",
        gradient: "from-rose-500 via-pink-500 to-purple-500",
        accentColor: "#ec4899",
        year: "2025",
    },
    {
        id: "fintech-mobile-app",
        title: "FinTech Mobile App",
        type: "Mobile App",
        industry: "Finance",
        description:
            "Sleek, intuitive UI design for a mobile banking and investment application. Focused on secure feeling, clear typography, and buttery-smooth micro-interactions.",
        features: [
            "Secure biometric login flow",
            "Interactive portfolio charts",
            "One-tap transfer interface",
            "Custom financial icon set",
        ],
        tags: ["Mobile App", "FinTech", "UI/UX"],
        category: "mobile",
        gradient: "from-lime-500 via-green-400 to-emerald-500",
        accentColor: "#22c55e",
        year: "2025",
    },
    {
        id: "custom-crm-dashboard",
        title: "Custom CRM Dashboard",
        type: "Dashboard",
        industry: "Logistics",
        description:
            "Bespoke internal tool and CRM for a logistics firm. Replaced three fragmented software subscriptions with one unified, blazing-fast, custom-built interface.",
        features: [
            "Real-time fleet tracking map link",
            "Drag-and-drop pipeline management",
            "Automated reporting exports",
            "Role-based permission architecture",
        ],
        tags: ["Internal Tool", "CRM", "Dashboard"],
        category: "dashboard",
        gradient: "from-indigo-600 via-blue-600 to-violet-600",
        accentColor: "#818cf8",
        year: "2025",
    },
    {
        id: "b2b-lead-gen",
        title: "B2B Lead Generation",
        type: "Webflow",
        industry: "Professional Services",
        description:
            "A sophisticated Webflow site acting as an automated 24/7 sales machine. Features gated content, dynamic CMS case studies, and seamless CRM integrations.",
        features: [
            "Gated whitepaper funnel",
            "Dynamic CMS case study architecture",
            "Native HubSpot form integration",
            "Scroll-triggered micro-animations",
        ],
        tags: ["Lead Gen", "B2B", "Webflow"],
        category: "webflow",
        gradient: "from-red-500 via-orange-400 to-amber-400",
        accentColor: "#f43f5e",
        year: "2025",
    },
];

export const services = [
    {
        icon: "layout",
        title: "Landing Pages",
        description:
            "High-converting, scroll-stopping landing pages designed to turn visitors into customers. Every pixel serves a purpose.",
        highlights: ["A/B Test Ready", "SEO Optimized", "Mobile-First"],
    },
    {
        icon: "monitor",
        title: "Website Design",
        description:
            "Full websites built around your brand story, from strategy and wireframes to polished, responsive design.",
        highlights: ["Brand-Aligned", "Performance Focused", "Scalable"],
    },
    {
        icon: "zap",
        title: "Webflow Development",
        description:
            "Pixel-perfect Webflow builds from Figma designs. Clean CMS structure, smooth animations, and no-code editable.",
        highlights: ["Figma-to-Webflow", "CMS Setup", "Animation Polish"],
    },
    {
        icon: "smartphone",
        title: "Mobile App Design",
        description:
            "Full mobile app UI design across multiple screens and flows. Intuitive, polished, and ready for development handoff.",
        highlights: ["Multi-Screen Flows", "Figma Handoff", "App Store Ready"],
    },
    {
        icon: "bar-chart",
        title: "Dashboard Design",
        description:
            "Data-heavy admin dashboards and analytics UIs designed for clarity, speed, and real-world usability.",
        highlights: ["Data Visualization", "Admin Panels", "Dark Mode First"],
    },
    {
        icon: "bot",
        title: "Automations",
        description:
            "No-code and low-code automations that save hours each week. From CRM flows to email sequences and API connections.",
        highlights: ["Zapier / Make", "Email Flows", "API Integrations"],
    },
];

export const skills = [
    { name: "Webflow", level: 95, category: "tool" },
    { name: "Figma", level: 92, category: "tool" },
    { name: "Next.js", level: 85, category: "code" },
    { name: "Tailwind CSS", level: 90, category: "code" },
    { name: "Framer Motion", level: 80, category: "code" },
    { name: "SEO Strategy", level: 88, category: "marketing" },
    { name: "UI/UX Design", level: 90, category: "design" },
    { name: "Conversion Rate Opt.", level: 85, category: "marketing" },
];
