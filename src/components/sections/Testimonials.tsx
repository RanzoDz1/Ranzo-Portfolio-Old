"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Marcus Elliott",
    role: "Founder, LaunchPad Agency",
    text: "Ranzo delivered a landing page that converted 3x better than our previous one. The animations were buttery smooth and the design was absolutely stunning. Highly recommend.",
    rating: 5,
  },
  {
    name: "Sofia Navarro",
    role: "CEO, NovaBrand Studio",
    text: "Working with Ranzo was an incredible experience. He understood our vision immediately and turned it into a premium website that our clients love. Fast, professional, and talented.",
    rating: 5,
  },
  {
    name: "James Whitfield",
    role: "CTO, DevPulse Inc.",
    text: "The Next.js build Ranzo delivered was clean, scalable, and blazing fast. He thought about performance and UX at every step — not just what looks good, but what works.",
    rating: 5,
  },
  {
    name: "Amara Collins",
    role: "Owner, Empire Hair & Beauty",
    text: "Our new website completely transformed our online presence. Customers constantly tell us the site looks so professional. Sales through the website have noticeably improved.",
    rating: 5,
  },
  {
    name: "Tyler Brooks",
    role: "Director, Redrocks Carpet Co.",
    text: "Ranzo built us a site that truly reflects our brand. The design is premium and the performance is top-notch. We've seen a huge jump in quote form submissions since launch.",
    rating: 5,
  },
  {
    name: "Daniella Cruz",
    role: "Marketing Lead, Prescott Markets",
    text: "From the hero section to the reviews marquee, everything was crafted with care and precision. Ranzo doesn't just code websites — he builds experiences.",
    rating: 5,
  },
  {
    name: "Kevin Lee",
    role: "Co-founder, GridFlow SaaS",
    text: "We needed a fast SaaS landing page and Ranzo delivered in record time. The attention to detail — micro-animations, responsive design, clean typography — was exceptional.",
    rating: 5,
  },
  {
    name: "Rachel Gomez",
    role: "Owner, Gomez Woodworking",
    text: "Our site now looks as premium as our craftsmanship. Ranzo captured our brand's essence perfectly with a deep, dark wood aesthetic. We are incredibly proud to show it off.",
    rating: 5,
  },
  {
    name: "Lena Hartmann",
    role: "Creative Director, Hartmann Studio",
    text: "Ranzo has an uncanny ability to translate brand identity into digital form. Our studio site encapsulates exactly who we are — bold, creative, and conversion-driven.",
    rating: 5,
  },
  {
    name: "Omar Khalil",
    role: "CEO, NexGen Digital",
    text: "We were blown away by the quality of work. Ranzo delivered a full redesign on time, on budget, and beyond our expectations. Our bounce rate dropped by 40% overnight.",
    rating: 5,
  },
  {
    name: "Hannah Steele",
    role: "Founder, Steele & Stone Interior Design",
    text: "Our portfolio website needed to feel as luxurious as our projects. Ranzo nailed it — every scroll, every transition feels intentional. Our inquiries have tripled.",
    rating: 5,
  },
  {
    name: "Carlos Medina",
    role: "Owner, Medina Auto Detailing",
    text: "I was skeptical about investing in a custom site, but the ROI was instant. Within the first week, we had more online bookings than the entire previous month.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Co-founder, Bloom SaaS",
    text: "Ranzo doesn't just execute — he thinks strategically. He suggested features we hadn't even considered, and they turned out to be the ones users love most.",
    rating: 5,
  },
  {
    name: "David Okonkwo",
    role: "Director, Okonkwo Consulting",
    text: "The professionalism and communication throughout the project were outstanding. Ranzo keeps you in the loop, hits every deadline, and delivers elite-level work.",
    rating: 5,
  },
  {
    name: "Jessica Tran",
    role: "Marketing Manager, FreshBrew Co.",
    text: "Our e-commerce conversion rate nearly doubled after Ranzo redesigned our product pages. He understands how design directly impacts the bottom line.",
    rating: 5,
  },
  {
    name: "Arnaud Lefèvre",
    role: "Founder, Lefèvre Architecture",
    text: "A true craftsman of the web. Ranzo took our portfolio from outdated to world-class. Every client we show it to asks who built it — and we proudly say Ranzo.",
    rating: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={13} className="fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: (typeof reviews)[0] }) {
  const initials = review.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="flex-shrink-0 w-[340px] p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 mx-3">
      <StarRating count={review.rating} />
      <p className="mt-4 text-sm text-[var(--muted-foreground)] leading-relaxed line-clamp-4">
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="mt-5 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          {initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-[var(--foreground)]">{review.name}</p>
          <p className="text-xs text-[var(--muted-foreground)]">{review.role}</p>
        </div>
      </div>
    </div>
  );
}

function useMarquee(speed: number, reverse = false) {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const posRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function animate() {
      if (!pausedRef.current && track) {
        posRef.current += speed;
        const half = track.scrollWidth / 2;
        if (posRef.current >= half) posRef.current -= half;
        // Normal: slide left. Reverse: slide right by counting from -half toward 0
        track.style.transform = reverse
          ? `translateX(${posRef.current - half}px)`
          : `translateX(-${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    const outer = track.parentElement;
    const pause = () => { pausedRef.current = true; };
    const resume = () => { pausedRef.current = false; };
    outer?.addEventListener("mouseenter", pause);
    outer?.addEventListener("mouseleave", resume);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      outer?.removeEventListener("mouseenter", pause);
      outer?.removeEventListener("mouseleave", resume);
    };
  }, [speed, reverse]);

  return trackRef;
}

const row1 = reviews.slice(0, 8);
const row2 = reviews.slice(8);

export default function Testimonials() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: "-60px" });
  const track1Ref = useMarquee(0.5, false);
  const track2Ref = useMarquee(0.4, true);

  const doubled1 = [...row1, ...row1];
  const doubled2 = [...row2, ...row2];

  return (
    <section id="testimonials" className="py-24 bg-[var(--background)] overflow-hidden">
      {/* Header */}
      <div className="max-w-2xl mx-auto px-6 text-center mb-14" ref={headerRef}>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-blue-500 text-sm font-semibold tracking-widest uppercase mb-3"
        >
          Testimonials
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--foreground)]"
        >
          What Clients Say About{" "}
          <span className="text-gradient">Working With Me</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="mt-4 text-[var(--muted-foreground)] text-base"
        >
          Real feedback from business owners and founders who trusted me with their web presence.
        </motion.p>
      </div>

      {/* Marquee container – limited to ~3 cards wide */}
      <div className="max-w-[1120px] mx-auto">
        {/* Row 1 – scrolls left */}
        <div
          className="relative overflow-hidden py-3"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, #000 10%, #000 90%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, #000 10%, #000 90%, transparent 100%)",
          }}
        >
          <div
            ref={track1Ref}
            className="flex will-change-transform"
            style={{ width: "max-content" }}
          >
            {doubled1.map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </div>
        </div>

        {/* Row 2 – scrolls right */}
        <div
          className="relative overflow-hidden py-3 mt-4"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, #000 10%, #000 90%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, #000 10%, #000 90%, transparent 100%)",
          }}
        >
          <div
            ref={track2Ref}
            className="flex will-change-transform"
            style={{ width: "max-content" }}
          >
            {doubled2.map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6 }}
        className="text-center mt-10 text-xs text-[var(--muted-foreground)]"
      >
        ★★★★★ &nbsp; 5.0 average across all client projects
      </motion.p>
    </section>
  );
}
