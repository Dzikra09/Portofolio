/**
 * Core type definitions for the portfolio website.
 */

// ─── Project ────────────────────────────────────────────────────────────────

export interface Project {
  /** URL-friendly identifier, used for routing to /projects/[slug] */
  slug: string;
  /** Display title of the project */
  title: string;
  /** Category label — e.g. "Web App", "Landing Page", "Dashboard" */
  category: string;
  /** Short description shown on project cards */
  description: string;
  /** Path to cover image, relative to /public */
  coverImage: string;
  /** Array of technology / library names */
  techStack: string[];
  /** Live demo URL (optional) */
  liveUrl?: string;
  /** Source code repository URL (optional) */
  repoUrl?: string;
  /** If true, shown in the Home page Projects Preview */
  featured: boolean;
  /** Extended detailed description for project page */
  fullDescription?: string;
  /** List of key features for project detail page */
  features?: string[];
  /** Background story / development context */
  background?: string;
}

// ─── Social Link ─────────────────────────────────────────────────────────────

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

// ─── Nav Item ────────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
}
