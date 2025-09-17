// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-scroll";
import logo from "../assets/Logo.jpg"; // adjust path if needed

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navItems = [
    { name: "Home", to: "home" },
    { name: "Product", to: "product" },
    { name: "About", to: "about" },
    { name: "Career", to: "career" },
    { name: "Get in Touch", to: "get-in-touch" },
  ];

  return (
    <header
      className="fixed top-0 left-0 w-full bg-black text-white z-50 shadow-md"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
        <div className="w-full flex items-center justify-between h-20 px-10 sm:px-18">
        {/* brand left */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="QUANTI AXIONIX logo"
            className="h-12 w-12 rounded-full object-cover ring-2 ring-[#0097b2]/40"
          />
          <div className="flex items-center gap-1">
            <span className="font-semibold text-lg tracking-wide">QUANTI</span>
            <span className="font-extrabold text-lg text-[#0097b2]">
              AXIONIX
            </span>
          </div>
        </div>

        {/* nav right */}
        <nav className="hidden md:flex items-center gap-20 pr-2">
          {navItems.map((item) =>
            item.name === "Get in Touch" ? (
              <Link
                key={item.to}
                to={item.to}
                smooth={true}
                duration={600}
                offset={-80}
                className="inline-flex items-center px-5 py-2 border border-[#0097b2] bg-transparent text-[#0097b2] text-base font-medium shadow-sm hover:bg-[#0097b2] hover:text-[#0b0b0b] transition cursor-pointer"
              >
                {item.name}
              </Link>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                smooth={true}
                duration={600}
                offset={-80}
                className="text-white text-base font-medium hover:text-[#0097b2] transition cursor-pointer"
              >
                {item.name}
              </Link>
            )
          )}
        </nav>

        {/* mobile hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Toggle navigation"
            className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0097b2]"
            style={{
              color: "#ffffff",
              background: open ? "#0097b2" : "transparent",
            }}
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {open && (
        <div className="md:hidden bg-black px-4 pb-4 border-t border-white/10">
          <div className="flex flex-col gap-4 mt-3">
            {navItems.map((item) =>
              item.name === "Get in Touch" ? (
                <Link
                  key={item.to}
                  to={item.to}
                  smooth={true}
                  duration={600}
                  offset={-80}
                  onClick={() => setOpen(false)}
                  className="block w-full text-center px-5 py-3 border border-[#0097b2] text-[#0097b2] text-base font-medium hover:bg-[#0097b2] hover:text-[#0b0b0b] transition cursor-pointer"
                >
                  {item.name}
                </Link>
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  smooth={true}
                  duration={600}
                  offset={-80}
                  onClick={() => setOpen(false)}
                  className="block w-full text-center text-white text-base font-medium hover:text-[#0097b2] transition cursor-pointer"
                >
                  {item.name}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
}
