// src/pages/ContactLanding.jsx
import React from "react";

/**
 * ContactLanding.jsx
 * - Hero with boxed dotted background and corner accents
 * - Centered headline + CTA inside the box
 * - Newsletter section below
 *
 * NOTE: This uses Tailwind CSS utility classes. If you are not using Tailwind,
 * convert classes to your CSS equivalents.
 */

const ACCENT = "#0097b2";

export default function ContactLanding() {
  // dotted background style for the framed box
  const dottedBg = {
    backgroundImage:
      // small teal dots on dark, repeating radial pattern
      `radial-gradient(${ACCENT} 0.6px, rgba(0,0,0,0) 0.6px)`,
    backgroundSize: "10px 10px",
    backgroundColor: "#0b0b0b",
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
      {/* NAV SPACER (if you have a fixed navbar) */}
      <div className="h-20" />

      {/* HERO */}
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <section className="flex items-center justify-center">
          {/* Framed box */}
          <div className="relative w-full">
            {/* Outer container to center the box and limit width */}
            <div className="mx-auto" style={{ maxWidth: 1100 }}>
              {/* Frame with dotted background */}
              <div
                className="relative rounded-md overflow-visible"
                style={{
                  padding: "64px 48px",
                  border: `1px solid rgba(0,151,178,0.9)`,
                  boxShadow: "0 0 0 4px rgba(0,0,0,0.6) inset",
                  ...dottedBg,
                }}
              >
                {/* Corner decorations (small L-corners) */}
                <div className="absolute left-4 top-4 w-6 h-6 border-t-2 border-l-2" style={{ borderColor: ACCENT }} />
                <div
                  className="absolute right-4 top-4 w-6 h-6 border-t-2 border-r-2"
                  style={{ borderColor: ACCENT, transform: "scaleX(-1)" }}
                />
                <div
                  className="absolute left-4 bottom-4 w-6 h-6 border-b-2 border-l-2"
                  style={{ borderColor: ACCENT, transform: "scaleY(-1)" }}
                />
                <div
                  className="absolute right-4 bottom-4 w-6 h-6 border-b-2 border-r-2"
                  style={{ borderColor: ACCENT, transform: "scale(-1, -1)" }}
                />

                {/* Centered content */}
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight" style={{ color: "white" }}>
                    <span className="block">Ready to rethink</span>
                    <span className="block" style={{ color: ACCENT }}>your software systems?</span>
                  </h1>
                </div>

                  
                </div>

                {/* subtle inner border rounded corners accent (to emulate the screenshot edges) */}
                <svg
                  className="pointer-events-none absolute inset-0 mx-auto"
                  width="1100"
                  height="220"
                  viewBox="0 0 1100 220"
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    opacity: 0.02,
                    mixBlendMode: "overlay",
                  }}
                >
                  {/* tiny decorative svg to give a high-tech look (very subtle) */}
                  <rect x="6" y="6" rx="14" ry="14" width="1088" height="208" stroke={ACCENT} strokeWidth="1" fill="none" />
                </svg>
              </div>
            </div>
        </section>

        {/* Newsletter / Subscribe */}
        <section className="mt-20 md:mt-28">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start px-6">
            {/* Left text */}
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
                Don't miss out on
                <span className="block text-[#0097b2]">any updates</span>
              </h2>

              <p className="mt-4 text-white/80 max-w-lg">
                Subscribe to our newsletter to receive the latest updates on products, our AI automation
                capabilities, product launches, and how QUANTI AXIONIX helps companies ship faster while
                reducing operational cost and complexity.
              </p>
            </div>

            {/* Right: email form */}
            <div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const email = e.currentTarget.email?.value;
                  // handle subscribe (API call) — placeholder:
                  alert(email ? `Thanks — we will send updates to ${email}` : "Please enter your email");
                  e.currentTarget.reset();
                }}
                className="flex flex-col sm:flex-row gap-4 items-center"
              >
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Your email address"
                  required
                  className="w-full sm:flex-1 bg-transparent border-b border-white/20 focus:border-[#0097b2] outline-none px-2 py-3 text-white placeholder:text-white/40"
                  style={{ minWidth: 260 }}
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-[#0097b2] bg-[#000000] text-white font-medium hover:bg-[#0097b2] hover:text-black transition"
                >
                  Subscribe
                </button>
              </form>

              <p className="mt-3 text-xs text-white/60 max-w-sm">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
