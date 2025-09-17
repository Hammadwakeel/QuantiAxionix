// src/App.jsx
import React from "react";
import Navbar from "./components/Navbar";
import HomeHero from "./components/HomeHero";
import CompanyIntro from "./components/CompanyIntro";
import ProblemStatement from "./components/ProblemStatement";
import SolutionSection from "./components/SolutionSection"; 
import ContactLanding from "./components/ContactLanding";
import Footer from "./components/Footer";



// App.jsx — main application entry
// Paths used in this project:
// - Navbar component: src/components/Navbar.jsx
// - Home hero:         src/components/HomeHero.jsx
// - Problem section:   src/components/ProblemStatement.jsx
// - Logo:              src/assets/Logo.jpg
// - Hero video:        src/assets/home.mp4
// Notes:
// - If you put assets in public/ (e.g. public/assets/home.mp4), update imports in components to use '/assets/home.mp4' and don't import them with JS.
// - Add Playfair Display to public/index.html:
//   <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&display=swap" rel="stylesheet">

export default function App() {
  return (
    <div className="App bg-[#000000] min-h-screen text-white">
      {/* Navbar */}
      <Navbar />

      {/* Add top padding to account for navbar height */}
      <div className="pt-1">
        {/* Home hero section */}
        <HomeHero />

        {/* Company intro section */}
        <CompanyIntro />

        {/* Problem Statement section */}
        <ProblemStatement />

        {/* Solution section */}
        <SolutionSection />

        {/* Values scroll section */}
        {/* <ValuesScroll /> */}

        {/* Contact / Get in Touch section */}
        <ContactLanding />

        {/* Footer */}
        <Footer />


        
      </div>
    </div>
  );
}
