export interface Metric {
    value: string;
    label: string;
}

export interface Testimonial {
    quote: string;
    author: string;
    role: string;
}

export interface PopupData {
    challenge: string;
    solution: string;
    metrics: Metric[];
    techStack: string[];
    timeline: string;
    scope: string;
    deliverables: string[];
    features: string[];
    testimonial?: Testimonial;
    liveUrl?: string;
}

export const popupData: Record<string, PopupData> = {
    "website-redesign": {
        challenge:
            "The client's existing B2B website was built in 2018, visually outdated, and generating fewer than 5 qualified leads per month. Navigation was confusing, mobile performance was poor, and the brand no longer reflected the company's enterprise-level positioning.",
        solution:
            "I led a ground-up redesign by starting with a brand audit, competitive research, and wireframe sprints. The new site uses a component-based design system, a restructured information architecture, and a modernized identity that speaks directly to enterprise buyers.",
        metrics: [
            { value: "3×", label: "Lead Increase" },
            { value: "67%", label: "Bounce Rate Drop" },
            { value: "4.2s → 1.1s", label: "Load Time" },
            { value: "96/100", label: "Lighthouse Score" },
        ],
        techStack: ["Figma", "Webflow", "GSAP", "HubSpot"],
        timeline: "6 weeks",
        scope: "Full UX/UI redesign + development",
        deliverables: [
            "Brand identity refresh & style guide",
            "12-page Webflow website",
            "CMS blog + resource hub",
            "HubSpot form integration",
            "SEO metadata + sitemap",
        ],
        features: [
            "Modernized visual identity aligned with enterprise positioning",
            "Streamlined 3-click navigation to any key page",
            "Component-based Figma design system for future scaling",
            "Animated hero section with scroll-triggered reveals",
            "Fully editable Webflow CMS for marketing team",
            "WCAG 2.1 AA accessibility compliance",
        ],
        testimonial: {
            quote:
                "Ranzo completely transformed how we show up online. Our sales team now leads demos with the website; it's that good. We closed two enterprise deals within the first month of launch.",
            author: "Alex Mercer",
            role: "CEO, TechFlow B2B",
        },
    },

    "webflow-migration": {
        challenge:
            "A fast-growing Enterprise SaaS company was stuck on a slow WordPress stack that their marketing team couldn't edit without developer help. Page load times were averaging 4.8 seconds, and Lighthouse scores were failing. They needed a no-code solution that wouldn't compromise their hard-earned SEO rankings.",
        solution:
            "I executed a careful pixel-perfect WordPress-to-Webflow migration using a custom redirect strategy, Client-First class naming conventions, and Webflow's CMS to replicate all content types. Zero SEO traffic was lost.",
        metrics: [
            { value: "0%", label: "SEO Traffic Drop" },
            { value: "4.8s → 0.9s", label: "Page Load" },
            { value: "41 → 94", label: "Lighthouse Score" },
            { value: "100%", label: "Team Self-Editing" },
        ],
        techStack: ["Webflow", "Figma", "Semrush", "Cloudflare"],
        timeline: "4 weeks",
        scope: "CMS migration + SEO audit + Webflow development",
        deliverables: [
            "Pixel-perfect Webflow rebuild of 18 pages",
            "Full SEO redirect mapping (301s)",
            "Webflow CMS collection setup",
            "Editor training & documentation",
            "Post-launch 30-day monitoring",
        ],
        features: [
            "Pixel-perfect visual parity with the original WordPress design",
            "Zero SEO traffic loss, validated via GSC post-launch",
            "Client-First naming convention for clean, scalable code",
            "Advanced CMS collections for blog, case studies, and changelog",
            "Cloudflare CDN + image optimization for sub-1s loads",
            "Comprehensive editor hand-off guide",
        ],
        testimonial: {
            quote:
                "The migration was completely seamless. Our organic traffic didn't dip at all, and now the whole marketing team can update the site without any dev tickets. Incredible work.",
            author: "Sarah Jenkins",
            role: "Head of Marketing, CloudServe SaaS",
        },
    },

    "conversion-optimization": {
        challenge:
            "An e-commerce brand was spending $40K/month on paid ads but converting at a dismal 0.8%, which was well below industry average. Their product landing page had high bounce rates and almost no social proof, causing visitors to drop off before adding to cart.",
        solution:
            "I conducted a full CRO audit using heatmaps, session recordings, and A/B test data. I redesigned the page from scratch, rebuilt the hero section, added a social proof layer, simplified the checkout CTA, and implemented urgency mechanics.",
        metrics: [
            { value: "+140%", label: "Conversion Rate" },
            { value: "0.8% → 1.9%", label: "CVR Lift" },
            { value: "-$18K/mo", label: "Ad Spend Saved" },
            { value: "38%", label: "Cart Abandon Drop" },
        ],
        techStack: ["Figma", "Webflow", "Hotjar", "Google Optimize"],
        timeline: "3 weeks",
        scope: "CRO audit + landing page redesign",
        deliverables: [
            "Full heatmap & recording audit report",
            "A/B test plan with 3 variants",
            "Redesigned Webflow landing page",
            "Social proof & trust layer implementation",
            "Post-launch 60-day conversion tracking",
        ],
        features: [
            "Heatmap-driven above-the-fold redesign",
            "A/B tested 3 hero variants, where the winning version was deployed",
            "Frictionless one-step checkout CTA flow",
            "Dynamic social proof ticker (live sales feed)",
            "Urgency + scarcity mechanics (countdown, stock indicators)",
            "Trust badges, compliance marks, and review carousels",
        ],
        testimonial: {
            quote:
                "I was skeptical at first, but the results speak for themselves. Our conversion rate more than doubled in 6 weeks and we're spending less on ads. Ranzo is the real deal.",
            author: "Marcus Reid",
            role: "E-Commerce Director, BoldStore",
        },
    },

    "page-speed-optimization": {
        challenge:
            "A content-heavy media and publishing site was struggling with Core Web Vitals failures across all pages. LCP was above 6 seconds, CLS was failing audits, and Google was demoting their content in search rankings as a result.",
        solution:
            "I performed a deep technical performance audit and executed a systematic optimization sprint: modernizing image formats, eliminating render-blocking scripts, generating critical CSS, and refactoring JavaScript bundles.",
        metrics: [
            { value: "6.2s → 0.8s", label: "LCP Improvement" },
            { value: "99/100", label: "Lighthouse Score" },
            { value: "+31%", label: "Organic Traffic" },
            { value: "0.01", label: "CLS Score" },
        ],
        techStack: ["Next.js", "Vercel", "Cloudflare", "WebP/AVIF"],
        timeline: "2 weeks",
        scope: "Technical performance audit + full optimization",
        deliverables: [
            "Full Core Web Vitals audit report",
            "Image optimization & next-gen format conversion",
            "Critical CSS extraction & delivery",
            "JavaScript bundle analysis & code-splitting",
            "Lighthouse 99/100 certification",
        ],
        features: [
            "Next-gen image formats (WebP/AVIF) with responsive srcsets",
            "Lazy loading for all off-screen media",
            "Critical CSS inlined for instant first paint",
            "Eliminated 4 heavy third-party scripts",
            "Achieved perfect 99/100 Google Lighthouse score",
            "Core Web Vitals passing: LCP, FID, and CLS all green",
        ],
        testimonial: {
            quote:
                "Our site went from embarrassing to industry-leading in two weeks. The organic traffic boost alone paid for the project 10x over. Hire Ranzo before your competitors do.",
            author: "Daniel Okafor",
            role: "CTO, MediaPeak Publishing",
        },
    },

    "saas-platform-ui": {
        challenge:
            "A B2B software company had built an incredibly powerful product, but their UI was driving churn. Users complained that the dashboard was confusing, data was overwhelming, and onboarding drop-off was above 60%. They needed a complete UI overhaul.",
        solution:
            "I designed a full UI design system from scratch: dark-first, component-driven, and focused on progressive data disclosure. I restructured navigation, created a modular widget architecture, and built an interactive Figma prototype for engineering handoff.",
        metrics: [
            { value: "-40%", label: "Onboarding Drop-off" },
            { value: "4.8★", label: "App Store Rating" },
            { value: "3×", label: "Feature Adoption" },
            { value: "60 screens", label: "Delivered" },
        ],
        techStack: ["Figma", "FigJam", "Lottie", "Storybook"],
        timeline: "8 weeks",
        scope: "Full SaaS UI design + component library",
        deliverables: [
            "60-screen interactive Figma prototype",
            "Complete UI component library (200+ components)",
            "Dark mode design system with tokens",
            "Lottie micro-animations for key interactions",
            "Developer handoff documentation",
        ],
        features: [
            "Dark-first design system with semantic color tokens",
            "Modular dashboard widget architecture",
            "Progressive disclosure to reduce cognitive load",
            "Intuitive data visualization (charts, tables, KPIs)",
            "200+ component Figma library with auto-layout",
            "Lottie-powered micro-animations for loading states",
        ],
        testimonial: {
            quote:
                "Our users finally love using the product. Churn is down, feature adoption is up, and we've gotten more 5-star reviews in the 3 months after launch than in the previous 2 years combined.",
            author: "Priya Sharma",
            role: "CPO, DataSuite B2B",
        },
    },

    "local-seo-funnel": {
        challenge:
            "A home services company was running Google Ads but sending traffic to their generic homepage. Conversion rates were below 1.2% and cost-per-lead was over $120, making their campaigns barely profitable.",
        solution:
            "I built a hyper-targeted local landing page system with location-based dynamic content, a sticky mobile CTA bar, an instant quote form, and a trust layer built around Google reviews and before/after visuals.",
        metrics: [
            { value: "1.2% → 4.7%", label: "Conv. Rate" },
            { value: "-61%", label: "Cost Per Lead" },
            { value: "$120 → $47", label: "CPL Drop" },
            { value: "12 cities", label: "Pages Generated" },
        ],
        techStack: ["Webflow", "Figma", "Google Ads", "Zapier"],
        timeline: "2 weeks",
        scope: "Lead gen landing page + ad funnel setup",
        deliverables: [
            "12 dynamic city-specific landing pages",
            "Instant quote calculator widget",
            "Sticky mobile CTA + click-to-call bar",
            "Google Ads campaign restructure",
            "CRM Zapier automation for instant lead alerts",
        ],
        features: [
            "Dynamic location-based headline personalization",
            "Sticky mobile CTA bar for instant call/quote requests",
            "Instant quote calculator with form capture",
            "Before/after image proof section",
            "Google review embed with live rating display",
            "Zapier automation for <5 minute lead response time",
        ],
        testimonial: {
            quote:
                "My ad campaigns went from barely breaking even to my highest ROI channel. The landing pages convert at nearly 5% now and my cost per lead dropped by more than half.",
            author: "James Whitfield",
            role: "Owner, Whitfield Home Services",
        },
    },

    "fintech-mobile-app": {
        challenge:
            "A fintech startup was preparing for their Series A pitch and needed a fully polished mobile app UI to present to investors. Their prototype was functional but looked rough, and they had 4 weeks before the pitch deck deadline.",
        solution:
            "I designed a complete, investor-ready mobile banking UI covering all key flows: onboarding, dashboard, spend analytics, transfers, and settings. The design was built for handoff-readiness and visual polish.",
        metrics: [
            { value: "40 screens", label: "Designed" },
            { value: "Series A", label: "Funded" },
            { value: "4 weeks", label: "Delivered" },
            { value: "4.9★", label: "Design Rating" },
        ],
        techStack: ["Figma", "Principle", "Lottie", "iOS HIG"],
        timeline: "4 weeks",
        scope: "Full mobile app UI design (iOS-first)",
        deliverables: [
            "40-screen iOS app design in Figma",
            "Onboarding, biometric login, and KYC flows",
            "Dashboard, portfolio, and analytics screens",
            "Transfer and bill payment flows",
            "Interactive prototype for investor demo",
        ],
        features: [
            "Biometric login flow with secure, trust-evoking UI",
            "Interactive portfolio performance chart (custom design)",
            "One-tap international transfer interface",
            "Spend analytics with animated category breakdown",
            "Custom financial icon set (48 icons, 3 weight styles)",
            "iOS Human Interface Guidelines compliance",
        ],
        testimonial: {
            quote:
                "We showed our Figma prototype in the Series A pitch and investors specifically commented on how polished and professional the app design looked. We closed the round.",
            author: "Yusuf Al-Amin",
            role: "Co-Founder, NovaPay FinTech",
        },
    },

    "custom-crm-dashboard": {
        challenge:
            "A growing logistics firm was managing operations across three separate SaaS tools, none of which integrated with each other. Dispatchers were copying data between screens, reporting took 3 hours per day, and no single view showed the full picture.",
        solution:
            "I designed and built a fully custom internal CRM web app replacing all three tools. One unified dashboard: fleet status, client pipeline, delivery tracking, and automated daily reports.",
        metrics: [
            { value: "3 → 1", label: "Tools Replaced" },
            { value: "3hrs → 12min", label: "Daily Reporting" },
            { value: "-$3,200/mo", label: "Software Cost" },
            { value: "24/7", label: "Live Data Access" },
        ],
        techStack: ["Next.js", "Tailwind CSS", "Prisma", "PostgreSQL"],
        timeline: "10 weeks",
        scope: "Custom CRM app design + full-stack development",
        deliverables: [
            "Full-stack Next.js CRM web application",
            "Fleet tracking dashboard with live status",
            "Client pipeline with drag-and-drop stages",
            "Automated PDF report generation",
            "Role-based access control (admin, dispatcher, viewer)",
        ],
        features: [
            "Real-time fleet status dashboard (GPS-integrated)",
            "Drag-and-drop client pipeline management",
            "Automated daily operations PDF report generation",
            "Role-based permission architecture (3 access levels)",
            "Advanced search, filtering, and data exports",
            "Replaced $3,200/month in legacy SaaS subscriptions",
        ],
        testimonial: {
            quote:
                "Our dispatchers used to dread Mondays because of all the data entry. Now everything is in one place, reports generate automatically, and we saved over $38K in the first year.",
            author: "David Chen",
            role: "CEO, Nexa Logistics",
        },
    },

    "b2b-lead-gen": {
        challenge:
            "A professional services firm was relying entirely on word-of-mouth for new business. Their website existed, but generated zero inbound leads. They needed a digital sales infrastructure that would work while they slept.",
        solution:
            "I architected a full B2B lead generation engine on Webflow: featuring gated content assets, HubSpot-integrated forms, dynamic case study pages, and scroll-triggered CTAs throughout the site.",
        metrics: [
            { value: "0 → 23/mo", label: "Inbound Leads" },
            { value: "6.2%", label: "Gated Content CVR" },
            { value: "4.1min", label: "Avg. Time on Site" },
            { value: "3 assets", label: "Lead Magnets Built" },
        ],
        techStack: ["Webflow", "HubSpot", "Figma", "Zapier"],
        timeline: "5 weeks",
        scope: "Full Webflow site + inbound lead funnel",
        deliverables: [
            "10-page Webflow marketing site",
            "3 downloadable lead magnet PDFs",
            "HubSpot CRM integration + lead routing",
            "Dynamic CMS case study architecture",
            "Automated email onboarding sequence",
        ],
        features: [
            "Gated whitepaper + checklist lead magnet funnels",
            "Dynamic Webflow CMS case study architecture",
            "Native HubSpot form integration with instant CRM sync",
            "Scroll-triggered micro-animations throughout",
            "Automated lead nurture email sequence (5-step)",
            "Live chat + calendar booking widget integration",
        ],
        testimonial: {
            quote:
                "We went from zero inbound leads to over 20 per month in just 8 weeks. This website is now our #1 sales tool. Ranzo built us a lead machine.",
            author: "Laura Mitchell",
            role: "Managing Director, Apex Advisory Group",
        },
    },
};
