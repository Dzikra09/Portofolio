"use client";

import { useEffect, useRef } from "react";
import type Lenis from "lenis";

interface SmoothScrollProps {
  children: React.ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  // Menginisialisasi smooth scroll menggunakan Lenis untuk memberikan pengalaman menggulir yang lebih halus
  useEffect(() => {
    let lenisInstance: Lenis;

    import("lenis").then(({ default: LenisClass }) => {
      lenisInstance = new LenisClass({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false,
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
