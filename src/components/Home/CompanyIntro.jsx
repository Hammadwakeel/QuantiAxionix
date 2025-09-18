// src/components/CompanyIntro.jsx
import React from "react";
import { motion } from "framer-motion";
import companyPhoto from "../../assets/company.jpeg"; // <<-- fixed path

export default function CompanyIntro() {
  return (
    <section
      className="w-full bg-black text-white py-24 px-6"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        
        {/* Left side image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-start"
        >
          <img
            src={companyPhoto}
            alt="Our Company"
            className="shadow-lg object-cover w-[90%] max-h-[750px]"
          />
        </motion.div>

        {/* Right side content */}
        <div className="flex flex-col justify-between h-full space-y-16">
          {/* Top part */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="uppercase tracking-widest text-white/50 text-sm md:text-base">
              About us
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-snug">
              <span className="text-white">We build. We scale.</span>
              <br />
              <span className="text-[#0097b2]">We automate.</span>
            </h2>
          </motion.div>

          {/* Bottom part */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
          >
            {/* Description */}
            <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-xl">
              Our team engineers intelligent SaaS solutions infused with AI.  
              We focus on automating workflows, accelerating product delivery,  
              and creating measurable growth for businesses worldwide.
            </p>

            {/* Button */}
            <a
              href="/about"
              className="px-4 py-1.5 text-base font-medium whitespace-nowrap border border-[#0097b2] text-[#0097b2] hover:bg-[#0097b2] hover:text-black transition-all duration-300"
            >
              More about us
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
