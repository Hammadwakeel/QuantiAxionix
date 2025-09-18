// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomeHero from "./components/Home/HomeHero";
import CareerHero from "./components/Career/CareerHero";
import OurStory from "./components/Career/OurStory";
import OurVision from "./components/Career/OurVision";
import Team from "./components/Career/Team";
import JobOpenings from "./components/Career/JobOpenings";
import GetInTouch from "./components/ContactSection/ContactSection";
import CompanyIntro from "./components/Home/CompanyIntro";
import ProblemStatement from "./components/Home/ProblemStatement";
import SolutionSection from "./components/Home/SolutionSection";
import ContactLanding from "./components/Home/ContactLanding";
import Footer from "./components/Footer";

/**
 * App.jsx
 *
 * Routes:
 *  - "/"        -> HomeMain (one-page home)
 *  - "/career"  -> CareerPage
 *  - "/contact" -> ContactPage (Get in touch)
 *  - "*"        -> redirect to "/"
 *
 * Note:
 *  - Navbar remains mounted across routes.
 *  - Each page component uses a top padding (pt-20) so the fixed navbar doesn't overlap content.
 */

function HomeMain() {
  return (
    <div className="pt-20">
      <HomeHero />
      <CompanyIntro />
      <ProblemStatement />
      <SolutionSection />
      <ContactLanding />
      <Footer />
    </div>
  );
}

function CareerPage() {
  return (
    <div className="pt-20">
      <CareerHero />
      <OurStory />
      <OurVision />
      <Team />
      <JobOpenings />
      <Footer />
    </div>
  );
}

function ContactPage() {
  return (
    <div className="pt-20">
      <GetInTouch />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="App bg-[#000000] min-h-screen text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeMain />} />
          <Route path="/career" element={<CareerPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
