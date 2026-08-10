// Site configuration — nav items, social links, metadata
export const siteConfig = {
  name: "Dzikra Alfiyah Althaf",
  title: "Dzikra Althaf — Web Developer",
  description:
    "Portfolio website Dzikra Althaf, seorang web developer yang membangun dengan detail dan passion.",
  url: "https://dzikra-althaf.dev",
} as const;

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  // { label: "Contact", href: "#contact" }, // Temporarily disabled
] as const;

export const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/dzikraalthaf4",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/dzikraalt/",
    icon: "linkedin",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/althfz_/",
    icon: "instagram",
  },
] as const;

export type NavItem = (typeof navItems)[number];
export type SocialLink = (typeof socialLinks)[number];
