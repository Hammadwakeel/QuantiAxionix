// src/components/ValuesAnimated.jsx
import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import bgSrc from "../assets/software.jpg";

export default function ValuesAnimated({
  phrases = [
    "a new software era",
    "resilient & scalable systems",
    "measurable business impact",
  ],
  sensitivity = 900,
  sectionHeight = "min-h-[120vh]",
  baseImageWidthPercent = 55,
  zoomStep = 0.035,
  minZoom = 0.92,
  maxZoom = 1.12,
  zoomRangeOnDelta = 0.06,
  smoothDuration = 700,
  // observer tuning; centerThreshold is fraction of viewport height allowed before locking
  observerRootMargin = "0px 0px -40% 0px",
  observerActiveThreshold = 0.6,
  observerCenterThreshold = 0.22, // NEW: fallback center threshold (22% of viewport)
  reverseOnScrollUp = true,
}) {
  const containerRef = useRef(null);
  const phraseRef = useRef(null);

  // locking & auto-scroll refs/state
  const lockedRef = useRef(false);
  const isAutoScrollingRef = useRef(false);
  const lastScrollYRef = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const smoothScrollRef = useRef(null);

  // interaction
  const [index, setIndex] = useState(0);
  const activeRef = useRef(false); // set by IO or center-check
  const hoverRef = useRef(false); // pointer/touch inside section
  const cumulativeRef = useRef(0);
  const dirRef = useRef(1); // 1 down, -1 up
  const [liveScale, setLiveScale] = useState(1);
  const [phraseHeight, setPhraseHeight] = useState(0);
  const touchStartYRef = useRef(null);

  const baseIndexScale = Math.max(minZoom, Math.min(maxZoom, 1 + index * zoomStep));
  const computeScaleFromDelta = (cum) => {
    const t = Math.max(-1, Math.min(1, cum / sensitivity));
    return Math.max(minZoom, Math.min(maxZoom, baseIndexScale + t * zoomRangeOnDelta));
  };

  const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  // ---- smoothScroll helpers (cancelable) ----
  const cancelSmoothScroll = () => {
    if (smoothScrollRef.current?.rafId) {
      cancelAnimationFrame(smoothScrollRef.current.rafId);
      try {
        smoothScrollRef.current.resolve?.();
      } catch {}
      smoothScrollRef.current = null;
    }
    isAutoScrollingRef.current = false;
  };

  const smoothScrollTo = (targetY, duration = smoothDuration) => {
    cancelSmoothScroll();
    const startY = window.pageYOffset;
    const diff = targetY - startY;
    if (!diff || duration <= 0) {
      window.scrollTo(0, targetY);
      return Promise.resolve();
    }
    isAutoScrollingRef.current = true;
    let rafId = null;
    let resolvePromise;
    const p = new Promise((res) => {
      resolvePromise = res;
    });
    const start = performance.now();

    const step = (now) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      const eased = easeInOutCubic(t);
      window.scrollTo(0, Math.round(startY + diff * eased));
      if (t < 1) {
        rafId = requestAnimationFrame(step);
        smoothScrollRef.current = { rafId, resolve: resolvePromise };
      } else {
        smoothScrollRef.current = null;
        isAutoScrollingRef.current = false;
        resolvePromise();
      }
    };

    rafId = requestAnimationFrame(step);
    smoothScrollRef.current = { rafId, resolve: resolvePromise };
    return p;
  };

  // ---- lock & release ----
  const engageLock = () => {
    if (lockedRef.current || isAutoScrollingRef.current) return;
    lockedRef.current = true;
    document.body.style.overflow = "hidden";
    lastScrollYRef.current = window.scrollY;
    cancelSmoothScroll();
    // ensure activeRef true
    activeRef.current = true;
  };

  const releaseLockAndScroll = (targetEl = null, offset = -80) => {
    if (!lockedRef.current) return;
    lockedRef.current = false;
    document.body.style.overflow = "";
    if (targetEl) {
      const top = targetEl.getBoundingClientRect().top + window.pageYOffset + offset;
      smoothScrollTo(top, smoothDuration).catch(() => {});
    }
  };

  // ---- IntersectionObserver + scroll fallback (robust locking) ----
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // IntersectionObserver (conservative)
    const thresholds = [0, observerActiveThreshold, 0.85, 1];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isActive = entry.intersectionRatio > observerActiveThreshold;
          activeRef.current = isActive;
          if (isActive && !isAutoScrollingRef.current) {
            engageLock();
          } else if (!isActive) {
            // keep local state reset but don't force release if auto-scrolling
            cumulativeRef.current = 0;
            setLiveScale(1);
            if (lockedRef.current && !isAutoScrollingRef.current) {
              // release if user scrolled away (rare)
              releaseLockAndScroll();
            }
          }
        });
      },
      { threshold: thresholds, rootMargin: observerRootMargin }
    );
    io.observe(el);

    // Scroll/resize fallback using getBoundingClientRect center check, throttled with rAF
    let ticking = false;
    const checkActive = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const sectionCenterY = (rect.top + rect.bottom) / 2;
      const viewportCenterY = window.innerHeight / 2;
      const centerDistance = Math.abs(sectionCenterY - viewportCenterY);
      const allowed = window.innerHeight * observerCenterThreshold; // e.g. 22% of viewport
      const centered = centerDistance <= allowed;

      // update activeRef; if centered and not auto-scrolling -> lock
      activeRef.current = centered;
      if (centered && !isAutoScrollingRef.current) {
        engageLock();
      } else {
        // if user scrolled away significantly and not auto-scrolling, reset accumulators
        cumulativeRef.current = 0;
        setLiveScale(1);
      }
    };

    const onScrollOrResize = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        checkActive();
        ticking = false;
      });
    };

    // initial check in case the section is already near center
    checkActive();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      // cleanup lock if present
      if (lockedRef.current) {
        lockedRef.current = false;
        document.body.style.overflow = "";
      }
    };
  }, [observerRootMargin, observerActiveThreshold, observerCenterThreshold]);

  // ---- pointer & touch detection so interactions over the section count ----
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onPointerEnter = () => (hoverRef.current = true);
    const onPointerLeave = () => {
      hoverRef.current = false;
      cumulativeRef.current = 0;
      setLiveScale(1);
    };
    const onTouchStart = (e) => {
      hoverRef.current = true;
      touchStartYRef.current = e.touches?.[0]?.clientY ?? null;
    };
    const onTouchEnd = () => {
      hoverRef.current = false;
      cumulativeRef.current = 0;
      setLiveScale(1);
      touchStartYRef.current = null;
    };

    el.addEventListener("pointerenter", onPointerEnter, { passive: true });
    el.addEventListener("pointerleave", onPointerLeave, { passive: true });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("pointerenter", onPointerEnter);
      el.removeEventListener("pointerleave", onPointerLeave);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  // ---- RAF loop pinning page while locked (but not during auto-scrolling) ----
  useEffect(() => {
    let raf = null;
    const loop = () => {
      if (lockedRef.current && !isAutoScrollingRef.current) {
        window.scrollTo(0, lastScrollYRef.current);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // ---- touch support: treat vertical touch moves similar to wheel ----
  useEffect(() => {
    const onTouchMove = (e) => {
      // only act when locked and user touching inside section
      if (!lockedRef.current || !hoverRef.current) return;
      if (!e.touches || e.touches.length === 0) return;
      const y = e.touches[0].clientY;
      if (touchStartYRef.current == null) {
        touchStartYRef.current = y;
        return;
      }
      const delta = touchStartYRef.current - y; // positive -> user swiped up -> go down
      // prevent native scrolling while locked
      if (e.cancelable) e.preventDefault();
      cumulativeRef.current += delta;
      touchStartYRef.current = y;

      setLiveScale(computeScaleFromDelta(cumulativeRef.current));

      if (Math.abs(cumulativeRef.current) >= sensitivity) {
        const goingDown = cumulativeRef.current > 0;
        if (goingDown) {
          if (index < phrases.length - 1) changeIndex(1);
          else {
            // reached end, release and scroll to next section
            releaseLockAndScroll(containerRef.current.nextElementSibling, -80);
          }
        } else {
          if (index > 0) changeIndex(-1);
          else {
            // first phrase + user scrolls up -> release to previous section
            releaseLockAndScroll(containerRef.current.previousElementSibling, -80);
          }
        }
        cumulativeRef.current = 0;
        setLiveScale(baseIndexScale);
      }
    };

    window.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => window.removeEventListener("touchmove", onTouchMove, { passive: false });
  }, [index, sensitivity, phrases.length, baseIndexScale]);

  // ---- change index helper ----
  const changeIndex = (delta) => {
    dirRef.current = delta > 0 ? 1 : -1;
    setIndex((prev) => {
      let next = prev + delta;
      if (next < 0) next = 0;
      if (next >= phrases.length) next = phrases.length - 1;
      return next;
    });
    cumulativeRef.current = 0;
  };

  // ---- wheel handling: when locked we prevent default so native page doesn't move; when not locked we ignore ----
  useEffect(() => {
    const onWheel = (e) => {
      if (!lockedRef.current) return;
      if (isAutoScrollingRef.current) cancelSmoothScroll();
      // prevent native scroll while locked
      if (e.cancelable) e.preventDefault();

      cumulativeRef.current += e.deltaY;
      setLiveScale(computeScaleFromDelta(cumulativeRef.current));

      if (Math.abs(cumulativeRef.current) < sensitivity) return;

      const goingDown = cumulativeRef.current > 0;
      if (goingDown) {
        if (index < phrases.length - 1) {
          changeIndex(1);
        } else {
          releaseLockAndScroll(containerRef.current.nextElementSibling, -80);
        }
      } else {
        if (index > 0) {
          changeIndex(-1);
        } else {
          releaseLockAndScroll(containerRef.current.previousElementSibling, -80);
        }
      }
      cumulativeRef.current = 0;
      setLiveScale(baseIndexScale);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel, { passive: false });
  }, [index, sensitivity, phrases.length, baseIndexScale]);

  // ---- measure phrase height to avoid clipping ----
  useLayoutEffect(() => {
    const measure = () => {
      const h = phraseRef.current?.offsetHeight ?? 0;
      if (h && h !== phraseHeight) setPhraseHeight(h);
    };
    measure();
    const onResize = () => measure();
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, phrases, phraseRef.current]);

  // ---- cancel smooth scroll on unmount and clear overflow ----
  useEffect(() => {
    return () => {
      cancelSmoothScroll();
      if (lockedRef.current) {
        lockedRef.current = false;
        document.body.style.overflow = "";
      }
    };
  }, []);

  // ---- variants & rendering helpers ----
  const variants = {
    enter: (dir) => ({ y: dir > 0 ? 20 : -20, opacity: 0 }),
    center: { y: 0, opacity: 1 },
    exit: (dir) => ({ y: dir > 0 ? -20 : 20, opacity: 0 }),
  };

  const renderColoredPhrase = (phrase, reversed = false) => {
    const parts = phrase.split(" ").filter(Boolean);
    const working = reversed ? [...parts].reverse() : parts;
    const last = working.pop();
    return (
      <>
        <span className="text-white">{(working.join(" ") ? working.join(" ") + " " : "")}</span>
        <span className="text-[#0097b2]">{last}</span>
      </>
    );
  };

  const shouldReverse = reverseOnScrollUp && dirRef.current === -1;

  return (
    <section
      ref={containerRef}
      className={`relative w-full ${sectionHeight} flex items-center justify-center overflow-hidden`}
      style={{ backgroundColor: "#000" }}
    >
      <motion.img
        src={bgSrc}
        alt=""
        aria-hidden
        animate={{ scale: liveScale }}
        transition={{ type: "spring", stiffness: 140, damping: 26 }}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: `${baseImageWidthPercent}%`,
          objectFit: "cover",
          filter: "brightness(0.36)",
        }}
      />

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-30 px-6 text-center">
        <div className="inline-flex items-baseline whitespace-nowrap gap-2">
          <span className="text-2xl md:text-3xl lg:text-4xl font-medium text-white">
            Quanti Axionix stands for
          </span>

          <div
            className="relative overflow-hidden"
            style={{ height: phraseHeight ? `${phraseHeight}px` : "auto" }}
          >
            <AnimatePresence mode="wait" custom={dirRef.current}>
              <motion.span
                ref={phraseRef}
                key={index + (shouldReverse ? "-r" : "")}
                custom={dirRef.current}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="block font-extrabold text-2xl md:text-3xl lg:text-4xl whitespace-nowrap leading-none"
              >
                {renderColoredPhrase(phrases[index], shouldReverse)}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
