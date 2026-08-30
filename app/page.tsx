import type { Metadata } from "next";
import { HeroProjectsSection } from "@/components/sections/hero-projects-section";
import { AboutSection } from "@/components/sections/about";
import { ContactSection } from "@/components/sections/contact";

export const metadata: Metadata = {
  description:
    "Portfolio Dzikra Althaf — Web Developer yang membangun antarmuka web dengan detail, performa tinggi, dan user experience terbaik.",
};

/**
 * Single-page portfolio layout.
 *
 * Sections: #home → #projects → #about → #contact
 *
 * NOTE: #home and #projects are both inside HeroProjectsSection —
 * a single 300vh scroll container that animates the 4 project cards
 * from a stacked hero layout into a 2×2 projects grid.
 * There is exactly ONE set of 4 cards in the entire page.
 */
export default function HomePage() {
  return (
    <>
      {/* Hero + animated card transition + Projects — all ONE component */}
      <HeroProjectsSection />

      <AboutSection />
      <ContactSection />
    </>
  );
}
