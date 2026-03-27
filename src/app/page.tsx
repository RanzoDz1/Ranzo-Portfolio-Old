import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import Skills from "@/components/sections/Skills";
import CTA from "@/components/sections/CTA";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <ScrollProgress />
      <main id="main-content" className="min-h-screen bg-[var(--background)]">
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Services />
        <Testimonials />
        <Skills />
        <CTA />
        <FAQ />
        <Contact />
        <Footer />
      </main>
      <ScrollToTop />
    </>
  );
}
