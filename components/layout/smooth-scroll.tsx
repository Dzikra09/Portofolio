"use client";

import { useEffect, useRef } from "react";
import type Lenis from "lenis";

interface SmoothScrollProps {
  children: React.ReactNode;
}

/**
 * Initializes Lenis smooth scroll for the entire page.
 *
 * Configuration:
 * - duration: 1.2s — comfortable for portfolio browsing
 * - easing: exponential-out — natural deceleration feel
 * - syncTouch: false — native scroll on touch devices (better mobile UX) 
 * - Sticky elements (Navbar) are unaffected — Lenis only smooths scrollTop,
 *   it does not interfere with position:sticky behaviour.
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let lenisInstance: Lenis;

    import("lenis").then(({ default: LenisClass }) => {
      lenisInstance = new LenisClass({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential out
        smoothWheel: true,
        syncTouch: false, // native scroll on mobile
      });

      lenisRef.current = lenisInstance;

      function raf(time: number) {
        lenisInstance.raf(time);
        rafRef.current = requestAnimationFrame(raf);
      }

      rafRef.current = requestAnimationFrame(raf);
    });

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      if (lenisInstance) {
        lenisInstance.destroy();
      }
    };
  }, []);

  return <>{children}</>;
}
