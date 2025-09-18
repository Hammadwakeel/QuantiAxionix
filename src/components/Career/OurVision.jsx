// src/components/OurVision.jsx
import React from "react";
import logo from "../../assets/logo.png"; // ensure this exists at src/assets/logo.png

/**
 * OurVision.jsx
 *
 * - Two-column on desktop: heading on LEFT, small description on RIGHT
 * - Full-width solid grey line at the very top of the section
 * - Big logo (src/assets/logo.png) centered at the bottom
 * - Text updated to reflect QuantiAxionix as a software house (SaaS + full-stack apps)
 * - Uses Playfair Display (add to public/index.html if you haven't)
 */

export default function OurVision({
  accentColor = "#0097b2",
  eyebrow = "Our vision",
  // Strong, unique headline for a software house that builds SaaS & full-stack apps
  headlineLine1 = "Automate outcomes,",
  headlineLine2 = "not just tasks",
  // Short, focused description for the right column
  descriptionLines = [
    "QuantiAxionix builds SaaS and full-stack products that remove operational friction and deliver measurable impact.",
    "We design software that automates decisions and scales teams — so product teams ship faster and operate cleaner.",
  ],
  lineColor = "#374151",
}) {
  return (
    <section
      id="our-vision"
      className="w-full bg-black text-white relative py-16 md:py-24 px-0"
      style={{ fontFamily: "'Playfair Display', serif" }}
      aria-labelledby="our-vision-heading"
    >
      {/* Full-width solid grey line at the very top */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-full"
        style={{ height: 2, background: lineColor }}
      />

      {/* Content wrapper */}
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-start pt-6">
        {/* LEFT: headline (large, memorable) */}
        <div className="order-1 md:order-1 flex flex-col justify-start">
          <p
            className="uppercase tracking-widest mb-3 text-sm md:text-base"
            style={{ color: accentColor }}
          >
            {eyebrow}
          </p>

          <h2
            id="our-vision-heading"
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
          >
            <span className="block" style={{ color: "#ffffff" }}>
              {headlineLine1}
            </span>
            <span className="block" style={{ color: accentColor }}>
              {headlineLine2}
            </span>
          </h2>
        </div>

        {/* RIGHT: concise small description */}
        <div className="order-2 md:order-2">
          <div className="max-w-xl">
            {descriptionLines.map((line, idx) => (
              <p
                key={idx}
                className="text-xs md:text-sm lg:text-sm text-white/70 leading-relaxed mb-3"
                style={{ lineHeight: 1.6 }}
              >
                {line}
              </p>
            ))}

            <p className="mt-4 text-xs md:text-sm text-white/60">
              We partner with product teams to turn ideas into resilient SaaS and full-stack systems that scale.
            </p>
          </div>
        </div>
      </div>

      {/* Big logo centered at the bottom */}
      <div className="mt-12 flex items-center justify-center">
        <img
          src={logo}
          alt="QuantiAxionix logo"
          className="h-36 md:h-56 lg:h-72 object-contain"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/assets/Logo.jpg";
          }}
        />
      </div>
    </section>
  );
}

