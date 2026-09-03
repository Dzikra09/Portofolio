import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Semua proyek web development Dzikra Althaf — web app, landing page, dan dashboard yang pernah dibangun.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
