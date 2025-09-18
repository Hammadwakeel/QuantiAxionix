import React, { useState } from "react";

// src/components/ProblemStatement.jsx
// Updated to QUANTI AXIONIX–relevant problems and details

const problems = [
  {
    title: "Technical Debt & Legacy Systems",
    subtitle: "Monolithic codebases slow innovation and increase maintenance costs",
    details: `Years of quick fixes, outdated stacks, and undocumented glue-code make adding features slow and risky. Teams spend more time firefighting than innovating, which raises costs and time-to-market.

QUANTI AXIONIX addresses this by modernizing architecture incrementally — extracting services, introducing tests and CI, and creating clear upgrade paths so engineering velocity recovers while risk is contained.`,
  },
  {
    title: "Fragmented Workflows",
    subtitle: "Disparate tools and manual handoffs create slow, error-prone processes",
    details: `Product, design, and operations teams often work in separate silos with manual handoffs across tools (spreadsheets, emails, custom scripts). This causes rework, missed SLAs, and unclear ownership.

We design unified delivery pipelines and automation layers that connect tooling, enforce checks, and eliminate repetitive manual steps — saving time and reducing human error.`,
  },
  {
    title: "Scalability & Reliability",
    subtitle: "Systems fail to scale predictably under real user growth",
    details: `Apps that work in staging can break in production when traffic spikes. Lack of autoscaling, poor observability, and brittle deployments lead to downtime and revenue loss.

Our teams implement cloud-native patterns, autoscaling, blue/green deployments and observability so platforms remain resilient and performance stays consistent as load increases.`,
  },
  {
    title: "Data Silos & Poor Insights",
    subtitle: "Valuable data is trapped across services and spreadsheets",
    details: `When telemetry, user behavior, and business data live in separate places, teams can’t make data-driven decisions. Product roadmaps suffer and AI initiatives stall for lack of clean data.

We build unified data pipelines, reliable ETL, and analytics layers so businesses get actionable insights and can safely apply ML/AI to improve products and operations.`,
  },
  {
    title: "Security & Compliance",
    subtitle: "Regulation and weak security posture increase risk and friction",
    details: `Growing regulatory requirements (GDPR, SOC, industry-specific standards) combined with under-invested security practices create legal and operational exposure.

QUANTI AXIONIX embeds security and compliance into the development lifecycle — threat modeling, automated testing, and policy-as-code — so products meet required standards without blocking delivery.`,
  },
];

export default function ProblemStatement() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleProblem = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="w-full bg-black text-white py-24" id="problems">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left column */}
        <div className="flex flex-col justify-between">
            <p className="uppercase text-white/40 text-sm tracking-widest mb-2">
            Challenges
          </p>
          <h3
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight whitespace-pre-line"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Today’s software systems don’t {"\n"}
            <span style={{ color: "#0097b2" }}>meet tomorrow’s needs</span>
          </h3>
        </div>

        {/* Right column — problems list */}
        <div className="space-y-6">
          {problems.map((p, idx) => (
            <div
              key={idx}
              className="border-b border-white/20 pb-4 cursor-pointer"
              onClick={() => toggleProblem(idx)}
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h4
                    className="text-lg font-semibold"
                    style={{ fontFamily: "'Playfair Display', serif", color: "#0097b2" }}
                  >
                    {p.title}
                  </h4>
                  <p className="text-white/80 text-sm mt-1">{p.subtitle}</p>
                </div>

                <span className="text-2xl text-[#0097b2] select-none">{openIndex === idx ? '−' : '+'}</span>
              </div>

              {openIndex === idx && (
                <div className="mt-3 text-white/80 text-sm leading-relaxed">
                  {p.details.split("\n\n").map((para, i) => (
                    <p key={i} className="mb-3">
                      {para}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}