import React from "react";

/**
 * SolutionSection.jsx
 * - Dark background
 * - Left: stacked headline
 * - Right: paragraph describing QUANTI AXIONIX solution and a CTA button
 * - Uses Playfair Display (make sure font is in public/index.html)
 */

export default function SolutionSection() {
  return (
    <section
      id="solution"
      className="w-full bg-[#000000] text-white py-16 md:py-24"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: stacked headline */}
          <div className="text-left">
            <div className="space-y-3">
              <div className="text-sm uppercase tracking-widest text-white/60">
                Solution
              </div>

              <h2 className="leading-tight font-extrabold">
                <span className="block text-4xl md:text-5xl lg:text-6xl text-white">
                  A new era for
                </span>
                <span className="block text-4xl md:text-5xl lg:text-6xl text-[#0097b2]">
                  intelligent software solutions
                </span>
              </h2>
            </div>
          </div>

          {/* Right: description + CTA */}
          <div>
            <p className="text-base md:text-lg text-white/85 leading-relaxed max-w-prose">
              QUANTI AXIONIX enables businesses to build resilient, scalable, and intelligent software
              platforms with AI-driven automation. Our solutions streamline complex workflows,
              accelerate product delivery, and provide actionable insights for faster decision-making.
            </p>

            <p className="mt-6 text-sm text-white/70 max-w-prose">
              By integrating cloud-native architectures, modular design, and advanced automation,
              we help startups and enterprises reduce technical debt, overcome operational bottlenecks,
              and launch software that grows with their business.
            </p>

            <div className="mt-8">
              <a
                href="#get-in-touch"
                className="inline-block px-6 py-3 rounded-md border border-[#0097b2] bg-transparent text-white font-medium hover:bg-[#0097b2] hover:text-black transition"
                aria-label="Get in touch"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
