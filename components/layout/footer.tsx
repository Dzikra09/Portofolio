import Link from "next/link";
import { Github, Linkedin, Instagram } from "lucide-react";
import { socialLinks, siteConfig } from "@/config/site";

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
} as const;

/**
 * Simple footer with copyright and social links.
 * Server Component — no interactivity needed.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        {/* Copyright */}
        <p className="text-sm text-foreground/50">
          &copy; {currentYear}{" "}
          <span className="font-medium text-foreground/70">
            {siteConfig.name}
          </span>
          . All rights reserved.
        </p>

        {/* Social links */}
        <ul className="flex items-center gap-3" role="list">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon as keyof typeof iconMap];
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-border text-foreground/50 transition-all duration-200 hover:border-accent-secondary hover:text-accent-secondary hover:bg-accent-primary/10"
                >
                  {Icon && <Icon size={16} strokeWidth={1.75} aria-hidden />}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
