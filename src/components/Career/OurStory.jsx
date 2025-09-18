// src/components/OurStory.jsx
import React from "react";

/**
 * OurStory.jsx
 *
 * Layout:
 * - Two columns on md+: left and right.
 * - Each column is a flex column with three zones: top, middle (centered), bottom.
 * - On mobile columns stack and zones flow naturally.
 *
 * Props:
 * - accentColor (default #0097b2)
 *
 * Usage:
 *  <OurStory />
 */

export default function OurStory({ accentColor = "#0097b2" }) {
  return (
    <section
      id="our-story"
      className="w-full bg-black text-white py-16 md:py-24 px-6"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-stretch">
        {/* LEFT column */}
        <div className="order-1 md:order-1 flex flex-col min-h-[420px]">
          {/* TOP */}
          <div className="flex-shrink-0">
            <p
              className="text-sm md:text-base uppercase tracking-widest mb-3"
              style={{ color: accentColor }}
            >
              Our story
            </p>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight mb-4">
              From friction to fluent software
            </h2>

            <p className="text-sm md:text-base text-white/80 leading-relaxed">
              We’re Quanti Axionix — founded by four builders in 2024 to deliver quality software that removes
              repetitive work, stabilizes delivery, and helps teams focus on product.
            </p>
          </div>

          {/* MIDDLE (centered vertically) */}
          <div className="flex-1 flex items-center justify-center">
            <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-white/95 text-center max-w-lg">
              Despite widespread innovation, many teams still wrestle with brittle tooling and manual workflows —
              we build to fix that.
            </p>
          </div>

          {/* BOTTOM */}
          <div className="flex-shrink-0 mt-6">
            <p className="text-sm md:text-base text-white/75 leading-relaxed">
              Founded in 2024 by four makers and engineers, we combine hands-on engineering with product rigor. We
              build end-to-end SaaS and custom software infused with practical AI that automates real work — not
              complexity.
            </p>
          </div>
        </div>

        {/* RIGHT column */}
        <div className="order-2 md:order-2 flex flex-col min-h-[420px]">
          {/* TOP */}
          <div className="flex-shrink-0">
            <h3 className="text-lg md:text-xl font-semibold mb-3" style={{ color: accentColor }}>
              Problems we solve
            </h3>

            <ul className="space-y-2 text-sm md:text-base text-white/80 mb-4">
              <li>Manual, repetitive workflows that waste skilled time.</li>
              <li>Slow delivery caused by fragile integrations and ad-hoc scripts.</li>
              <li>Difficulty scaling reliably — testing, observability and deployment gaps.</li>
              <li>Poorly integrated AI experiments that add noise rather than automation.</li>
            </ul>
          </div>

          {/* MIDDLE (centered vertically) */}
          <div className="flex-1 flex items-center justify-center">
            <p className="text-lg md:text-2xl font-semibold text-white/95 text-center max-w-lg">
              We design AI-first tooling and scalable SaaS to automate workflows, accelerate delivery, and drive
              measurable growth.
            </p>
          </div>

          {/* BOTTOM */}
          <div className="flex-shrink-0 mt-6">
            <div className="bg-white/3 p-5 rounded-xl border border-white/6">
              <p className="text-sm md:text-base text-white/90 mb-3">
                Our approach:
              </p>
              <ul className="list-disc list-inside text-sm md:text-base text-white/75 space-y-2">
                <li>Ship small, valuable increments that reduce risk.</li>
                <li>Embed automation where it produces measurable ROI.</li>
                <li>Design systems that are observable and maintainable.</li>
              </ul>

              <div className="mt-4">
                <a
                  href="/about"
                  className="inline-block px-5 py-2 rounded-md font-medium border border-white/10 text-white hover:bg-white hover:text-black transition"
                >
                  Learn more about us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
