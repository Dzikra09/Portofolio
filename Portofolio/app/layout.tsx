import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { siteConfig } from "@/config/site";
import { Onboarding } from "@/components/layout/onboarding";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning // diperlukan next-themes untuk menghindari hydration mismatch
      className={inter.variable}
    >
      <body className="min-h-screen bg-background font-body text-foreground antialiased">
        {/* Intro overlay — tampil sekali per sesi, z-index di atas semua elemen */}
        <Onboarding />
        <ThemeProvider>
          <SmoothScroll>
            {/* Skip link untuk aksesibilitas keyboard */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent-secondary focus:px-4 focus:py-2 focus:text-white focus:outline-none"
            >
              Skip to content
            </a>

            <Navbar />

            <main id="main-content" className="flex flex-1 flex-col">
              {children}
            </main>

            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
