// src/components/Career/CareerHero.jsx
import React from "react";

/**
 * CareerHero.jsx
 * - Text update:
 *   - eyebrow + titleMain + titleSub use the same size.
 *   - eyebrow and titleMain are white.
 *   - titleSub uses accentColor (#0097b2 by default).
 * - Visuals left unchanged.
 */

export default function CareerHero({
  accentColor = "#0097b2",
  barColor = "#E5E7EB",
  eyebrow = "Build. Scale. Automate.",
  // removed titlePre
  titleMain = "software &",
  titleSub = "SaaS products",
  descriptionLines = [
    "We design and engineer end-to-end software and SaaS products,",
    "infused with AI to automate workflows and accelerate delivery,",
    "driving measurable growth for our partners.",
  ],
}) {
  // center & radii (concentric)
  const cx = 800;
  const cy = 900;

  // semicircle radii
  const outerFillR = 920;
  const innerFillR = 820;

  // dashed ring radii
  const dashedInner = 880;
  const dashedOuter = 960;

  // bars geometry (unchanged)
  const barRadius = (outerFillR + innerFillR) / 2;
  const barWidth = 12;
  const barHeight = 72;
  const fullRotationDur = "6s";

  return (
    <section
      id="career"
      className="relative bg-black text-white overflow-hidden"
      style={{ fontFamily: "'Playfair Display', serif" }}
      aria-labelledby="career-heading"
    >
      {/* SVG background (unchanged) */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg
          className="w-full h-full"
          viewBox="0 0 1600 900"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-hidden="true"
        >
          <defs>
            <pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill={accentColor} fillOpacity="0.12" />
            </pattern>
            <pattern id="dots2" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="translate(3,3)">
              <circle cx="1" cy="1" r="0.9" fill={accentColor} fillOpacity="0.08" />
            </pattern>

            <radialGradient id="vignette" cx="50%" cy="60%" r="70%">
              <stop offset="0%" stopColor="#000" stopOpacity="0" />
              <stop offset="100%" stopColor="#000" stopOpacity="0.45" />
            </radialGradient>

            <style>{`.ring-dash { stroke-dasharray: 8 14; stroke-width: 4; fill: none; opacity: 0.35 }`}</style>

            <filter id="barGlow" x="-75%" y="-75%" width="250%" height="250%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
              <feFlood floodColor={barColor} floodOpacity="0.25" result="flood" />
              <feComposite in="flood" in2="blur" operator="in" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <clipPath id="topHalf">
              <rect x={-2000} y={-outerFillR} width={4000} height={outerFillR} />
            </clipPath>
          </defs>

          <rect x="0" y="0" width="1600" height="900" fill="url(#vignette)" />

          <g transform={`translate(${cx},${cy})`}>
            <g clipPath="url(#topHalf)">
              <circle r={outerFillR} fill="url(#dots)" />
              <circle r={outerFillR} fill="url(#dots2)" />
              <circle r={dashedInner} className="ring-dash" stroke={accentColor} />
              <circle r={dashedOuter} className="ring-dash" stroke="#111" strokeOpacity="0.5" />
            </g>

            <g clipPath="url(#topHalf)">
              <circle r={innerFillR} fill="url(#dots)" />
              <circle r={innerFillR} fill="url(#dots2)" />
              <circle r={innerFillR - 12} className="ring-dash" stroke={accentColor} strokeOpacity="0.95" />
            </g>

            {/* bars unchanged */}
            <g>
              <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 0 0" to="360 0 0" dur={fullRotationDur} begin="0s" repeatCount="indefinite" />
              <g transform={`translate(0, -${barRadius})`}>
                <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 0 0" to="-360 0 0" dur={fullRotationDur} begin="0s" repeatCount="indefinite" />
                <rect
                  x={-barWidth / 2}
                  y={-barHeight}
                  width={barWidth}
                  height={barHeight}
                  rx={3}
                  fill={barColor}
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="1"
                  filter="url(#barGlow)"
                />
              </g>
            </g>

            <g>
              <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 0 0" to="360 0 0" dur={fullRotationDur} begin="0.9s" repeatCount="indefinite" />
              <g transform={`translate(0, -${barRadius})`}>
                <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 0 0" to="-360 0 0" dur={fullRotationDur} begin="0.9s" repeatCount="indefinite" />
                <rect
                  x={-barWidth / 2}
                  y={-barHeight}
                  width={barWidth}
                  height={barHeight}
                  rx={3}
                  fill={barColor}
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="1"
                  filter="url(#barGlow)"
                />
              </g>
            </g>

            <g>
              <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 0 0" to="360 0 0" dur={fullRotationDur} begin="1.8s" repeatCount="indefinite" />
              <g transform={`translate(0, -${barRadius})`}>
                <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 0 0" to="-360 0 0" dur={fullRotationDur} begin="1.8s" repeatCount="indefinite" />
                <rect
                  x={-barWidth / 2}
                  y={-barHeight}
                  width={barWidth}
                  height={barHeight}
                  rx={3}
                  fill={barColor}
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="1"
                  filter="url(#barGlow)"
                />
              </g>
            </g>
          </g>
        </svg>
      </div>

      {/* Content container - only text updated below */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-28 md:py-32 lg:py-40">
        <div className="text-center">
          {/* eyebrow: white and same size as titles */}
          <p className="mb-4 text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-wide" style={{ color: "#ffffff" }}>
            {eyebrow}
          </p>

          <h1 id="career-heading" className="mx-auto max-w-3xl">
            {/* titleMain: white, same size as eyebrow */}
            <span className="block text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight" style={{ color: "#ffffff" }}>
              {titleMain}
            </span>

            {/* titleSub: accent color, same size as eyebrow/titleMain */}
            <span className="block text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mt-3" style={{ color: accentColor }}>
              {titleSub}
            </span>
          </h1>

          {/* description split into 3 lines */}
          <div className="mt-6 mx-auto max-w-3xl text-sm md:text-base lg:text-lg text-white/75 leading-relaxed space-y-2">
            {descriptionLines.map((line, idx) => (
              <p key={idx} className="m-0">
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
