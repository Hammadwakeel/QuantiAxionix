// src/components/Team.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import michaelImg from "../../assets/logo.png";
import member1 from "../../assets/logo.png";
import member2 from "../../assets/logo.png";
import member3 from "../../assets/logo.png";

/**
 * Team.jsx
 *
 * Behavior:
 * - Freeze page when a sentinel placed slightly above the bottom of the section becomes visible.
 * - While frozen: wheel/swipe/arrow keys navigate profiles (down => next, up => previous).
 * - Track seen profiles. When all profiles are seen, scrolling past the last or before the first unlocks native scrolling
 *   and nudges the page in the intended direction.
 *
 * Changes in this update:
 * - "Join our team" CTA navigates to /contact via React Router (SPA navigation).
 * - CTA keeps rectangular style and white text.
 */

const MEMBERS = [
  {
    id: "michael",
    name: "Michael Hofmannrichter",
    role: "CEO · Founder",
    img: michaelImg,
    short:
      "Michael leads QuantiAxionix’s strategy and operations — uniting product thinking with commercial experience to scale our SaaS and full-stack offerings.",
    education: "SIMC @ WU Vienna & Queen's University Kingston",
    background: [
      "Investment Management — Lenzing @ B&C",
      "E-Performance Management — Porsche",
      "Business Development — ÖBB",
    ],
  },
  {
    id: "aisha",
    name: "Aisha Khan",
    role: "CTO",
    img: member1,
    short:
      "Heads engineering and platform: resilient backends, secure infra and observability for production-grade SaaS.",
    education: "MSc Computer Science",
    background: ["Platform Engineering", "Systems Architecture", "Scaling SaaS"],
  },
  {
    id: "sara",
    name: "Sara Lee",
    role: "Head of Product",
    img: member2,
    short:
      "Designs product strategy and UX — aligning customer outcomes with engineering execution so features ship with impact.",
    education: "MBA / Product Management",
    background: ["Enterprise SaaS", "Design Systems", "Growth & Analytics"],
  },
  {
    id: "omar",
    name: "Omar Raza",
    role: "Engineering Lead",
    img: member3,
    short:
      "Hands-on tech lead responsible for full-stack delivery, CI/CD and developer experience improvements.",
    education: "BSc Software Engineering",
    background: ["Full-Stack Development", "DevOps & CI/CD", "AI Tooling"],
  },
];

export default function Team({ accentColor = "#0097b2", members = MEMBERS }) {
  // state
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [locked, setLocked] = useState(false);

  // refs & control
  const sectionRef = useRef(null);
  const sentinelRef = useRef(null);
  const lastActionRef = useRef(0);
  const THROTTLE_MS = 650;
  const seenRef = useRef(new Set([0])); // track seen indices
  const prevBodyOverflowRef = useRef("");
  const touchStartRef = useRef(null);
  const unlockCooldownRef = useRef(0); // prevents immediate relock after unlocking

  // offset in px from the bottom to place sentinel (adjust to your taste)
  const SENTINEL_OFFSET_PX = 120;
  const UNLOCK_NUDGE = 90; // px to nudge after unlocking

  // helper: change index with a small fade animation
  function animatedSetIndex(nextIndex) {
    const now = Date.now();
    if (now - lastActionRef.current < THROTTLE_MS) return;
    lastActionRef.current = now;

    const wrapped = ((nextIndex % members.length) + members.length) % members.length;
    setVisible(false);
    setTimeout(() => {
      setIndex(wrapped);
      if (!seenRef.current.has(wrapped)) {
        seenRef.current.add(wrapped);
      }
      setTimeout(() => setVisible(true), 60);
    }, 140);
  }

  function showNext() {
    animatedSetIndex(index + 1);
  }
  function showPrev() {
    animatedSetIndex(index - 1);
  }

  // unlock and nudge page in given direction (+1 down, -1 up)
  function unlockAndNudge(direction = 1) {
    // restore body overflow
    document.body.style.overflow = prevBodyOverflowRef.current || "";
    setLocked(false);
    // cooldown so IO won't immediately relock
    unlockCooldownRef.current = Date.now() + 700;
    // nudge page so native scroll continues in user's intended direction
    try {
      window.scrollBy({ top: direction * UNLOCK_NUDGE, left: 0, behavior: "smooth" });
    } catch {
      window.scrollBy(0, direction * UNLOCK_NUDGE);
    }
  }

  // wheel/touch handlers (take over when locked)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    function onWheel(e) {
      if (!locked) return; // only intercept when locked
      e.preventDefault();
      e.stopPropagation();

      const delta = e.deltaY;
      if (Math.abs(delta) < 6) return;

      const seenAll = seenRef.current.size === members.length;

      if (delta > 0) {
        // scroll down -> next
        if (seenAll && index === members.length - 1) {
          unlockAndNudge(1);
        } else {
          showNext();
        }
      } else {
        // scroll up -> previous
        if (seenAll && index === 0) {
          unlockAndNudge(-1);
        } else {
          showPrev();
        }
      }
    }

    function onTouchStart(e) {
      const t = e.touches && e.touches[0];
      if (t) touchStartRef.current = t.clientY;
    }

    function onTouchEnd(e) {
      const t = (e.changedTouches && e.changedTouches[0]) || null;
      if (!t || touchStartRef.current == null) return;
      const dy = touchStartRef.current - t.clientY;
      touchStartRef.current = null;
      const THRESH = 30;
      if (Math.abs(dy) < THRESH) return;

      const seenAll = seenRef.current.size === members.length;

      if (dy > 0) {
        // swipe up => next
        if (seenAll && index === members.length - 1) unlockAndNudge(1);
        else showNext();
      } else {
        // swipe down => prev
        if (seenAll && index === 0) unlockAndNudge(-1);
        else showPrev();
      }
    }

    // non-passive so we can preventDefault when locked
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: false });

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [locked, index, members.length]);

  // keyboard navigation while locked
  useEffect(() => {
    function onKey(e) {
      if (!locked) return;
      const seenAll = seenRef.current.size === members.length;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        if (seenAll && index === members.length - 1) unlockAndNudge(1);
        else showNext();
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        if (seenAll && index === 0) unlockAndNudge(-1);
        else showPrev();
      }
    }
    window.addEventListener("keydown", onKey, { passive: false });
    return () => window.removeEventListener("keydown", onKey);
  }, [locked, index, members.length]);

  // IntersectionObserver: lock when sentinel (slightly above bottom) becomes visible in viewport
  useEffect(() => {
    const sentinelEl = sentinelRef.current;
    if (!sentinelEl) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // prevent immediate relock after an unlock
          if (Date.now() < unlockCooldownRef.current) return;

          if (entry.isIntersecting) {
            // sentinel visible -> lock page scroll
            prevBodyOverflowRef.current = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            setLocked(true);
            // ensure current index is marked seen
            if (!seenRef.current.has(index)) {
              seenRef.current.add(index);
            }
          } else {
            // sentinel not visible -> restore normal scrolling
            document.body.style.overflow = prevBodyOverflowRef.current || "";
            setLocked(false);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0,
      }
    );

    io.observe(sentinelEl);

    return () => {
      io.disconnect();
      document.body.style.overflow = prevBodyOverflowRef.current || "";
      setLocked(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  // ensure seen set includes initial index
  useEffect(() => {
    seenRef.current.add(0);
  }, []);

  // helper to jump to a particular member (e.g., via dots)
  function goTo(i) {
    animatedSetIndex(i);
  }

  const member = members[index];

  return (
    <section
      id="team"
      ref={sectionRef}
      className="w-full bg-black text-white py-16 md:py-28 px-6"
      style={{ fontFamily: "'Playfair Display', serif", position: "relative" }}
      aria-labelledby="team-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Intro */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <p className="uppercase tracking-widest mb-3 text-sm md:text-base" style={{ color: accentColor }}>
              Team
            </p>

            <h2 id="team-heading" className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-3">
              <span className="block text-white">From vision to reality:</span>
              <span className="block text-white/95">Meet the QuantiAxionix team</span>
            </h2>

            <div className="max-w-2xl text-sm md:text-base text-white/75 leading-relaxed space-y-4 mb-6">
              <p>
                We’re a focused software house building SaaS platforms and full-stack applications that automate workflows,
                stabilise delivery, and deliver measurable ROI. We value curiosity, craftsmanship and responsibility —
                especially when integrating AI into core product flows.
              </p>

              <p>
                We’re always looking for passionate, curious and purpose-driven people who want to build product,
                improve systems, and help teams ship better software.
              </p>

              {/* "Join our team" button that navigates to /contact */}
              <div className="mt-4">
                <RouterLink
                  to="/contact"
                  className="inline-flex items-center justify-center px-5 py-2 font-medium border border-[#0097b2] text-white bg-transparent hover:bg-[#0097b2] hover:text-black transition cursor-pointer"
                  style={{ borderRadius: 0 }}
                >
                  Join our team
                </RouterLink>
              </div>
            </div>
          </div>

          <div />
        </div>

        {/* separator */}
        <div className="mt-6">
          <div className="w-full" style={{ height: 2, background: "#374151" }} />
        </div>

        {/* dividing section */}
        <div className="mt-20 relative">
          <div
            aria-hidden="true"
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px"
            style={{ background: "rgba(255,255,255,0.06)", transform: "translateX(-0.5px)" }}
          />

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* LEFT: large image */}
            <div className="flex items-start justify-center md:justify-end">
              <div className="w-full max-w-xl">
                <div className="overflow-hidden rounded-lg">
                  <img
                    key={member.id}
                    src={member.img}
                    alt={member.name}
                    className="w-full object-cover rounded-lg shadow-2xl ring-1 ring-white/8"
                    style={{
                      height: 620,
                      maxHeight: "min(78vh, 820px)",
                      width: "100%",
                      objectFit: "cover",
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateY(0px)" : "translateY(-12px)",
                      transition: "opacity 420ms ease, transform 420ms ease",
                    }}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/assets/avatar-placeholder.png";
                    }}
                  />
                </div>
              </div>
            </div>

            {/* RIGHT: plain details */}
            <div className="flex flex-col justify-start">
              <h3 className="text-2xl md:text-3xl font-semibold text-white" style={{ opacity: visible ? 1 : 0 }}>
                {member.name}
              </h3>

              <p className="text-sm md:text-base text-white/70 mt-2 mb-4" style={{ opacity: visible ? 1 : 0 }}>
                {member.role}
              </p>

              <p className="text-sm md:text-base text-white/75 leading-relaxed" style={{ opacity: visible ? 1 : 0 }}>
                {member.short}
              </p>

              <div className="mt-6 text-sm md:text-base text-white/75" style={{ opacity: visible ? 1 : 0 }}>
                <div className="font-medium text-white/90 mb-1">Education</div>
                <div className="mb-4">{member.education}</div>

                <div className="font-medium text-white/90 mb-2">Background</div>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  {member.background.map((b, i) => (
                    <li key={i} className="text-white/70 text-[14px] leading-tight">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6" style={{ opacity: visible ? 1 : 0 }}>
                <div className="mt-4 flex gap-2 items-center">
                  {members.map((m, i) => (
                    <button
                      key={m.id}
                      onClick={() => goTo(i)}
                      aria-label={`Show ${m.name}`}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${i === index ? "bg-white" : "bg-white/20 hover:bg-white/40"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* sentinel element slightly above the bottom of the section */}
        <div
          ref={sentinelRef}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: SENTINEL_OFFSET_PX + "px",
            height: 1,
            pointerEvents: "none",
          }}
        />
      </div>
    </section>
  );
}
