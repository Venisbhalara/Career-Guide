import { useEffect } from "react";
import Lenis from "lenis";

/**
 * useLenis — initialises Lenis smooth scrolling for the whole app.
 * Call once at the top of App.jsx.
 */
export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // scroll animation duration (seconds)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth ease-out
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8, // slightly slower than default for a premium feel
      touchMultiplier: 2,
    });

    // RAF loop — required for Lenis to work
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}
