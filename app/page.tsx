import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { ProjectsSection } from "@/components/sections/projects-preview";
import { AboutSection } from "@/components/sections/about";
import { ContactSection } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Portfolio Dzikra Althaf — Web Developer yang membangun antarmuka web dengan detail, performa tinggi, dan user experience terbaik.",
};

/**
 * Single-page portfolio layout.
 * Sections: #home → #projects → #about → #contact
 * Navbar scroll-spy watches each section via Intersection Observer.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ProjectsSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
