// src/LenisProvider.jsx
import React, { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

const LenisContext = createContext(null);

export function useLenis() {
  return useContext(LenisContext);
}

export default function LenisProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // create lenis instance with smoother, more natural feel
    lenisRef.current = new Lenis({
      duration: 1.6, // 1.4–1.8 feels super smooth, higher = slower easing
      easing: (t) => 1 - Math.pow(1 - t, 3), // smoother cubic curve
      smooth: true,
      smoothTouch: true,
      touchMultiplier: 1.5, // makes touch scrolling more fluid
      wheelMultiplier: 0.8, // slows down scroll step per wheel
      lerp: 0.07, // lower = more inertia, higher = snappier
    });

    const raf = (time) => {
      lenisRef.current.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>
      {children}
    </LenisContext.Provider>
  );
}
