import type { Metadata } from "next";
import { HeroProjectsSection } from "@/components/sections/hero-projects-section";
import { AboutSection } from "@/components/sections/about";
import { ContactSection } from "@/components/sections/contact";

export const metadata: Metadata = {
  description:
    "Portfolio Dzikra Althaf — Web Developer yang membangun antarmuka web dengan detail, performa tinggi, dan user experience terbaik.",
};

// Single-page portfolio: #home → #projects → #about → #contact
// Sections home dan projects berada dalam satu komponen HeroProjectsSection
export default function HomePage() {
  return (
    <>
      <HeroProjectsSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
