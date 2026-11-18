"use client";

import React, { useEffect, useState, useRef } from "react";
import GoldenHalo from "../HeroSection/GoldenHalo";
import Menu from "./Menu";

const EMAIL = "savithabalaji04@gmail.com";
const WHATSAPP_URL = "https://wa.me/918122689667";
const LINKEDIN_URL = "https://www.linkedin.com/in/savitha-balaji-415558439";

const scrollToSection = (id) => {
  if (typeof window === "undefined") return;
  const target = id === "top" ? 0 : document.getElementById(id);
  if (target == null) return;
  const lenis = window.__lenis;
  if (lenis && typeof lenis.scrollTo === "function") {
    lenis.scrollTo(target, { offset: 0, duration: 1.4 });
    return;
  }
  if (target === 0) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const MOBILE_NAV_ITEMS = [
  { label: "HOME", target: "top" },
  { label: "ABOUT", target: "about" },
  { label: "WORK", target: "projects-section" },
  { label: "CONTACT", target: "contact-section" },
];

const GlobeIcon = ({ className = "w-4 h-4 sm:w-5 sm:h-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuBtnRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  const handleMobileNav = (e, target) => {
    e.preventDefault();
    setMobileOpen(false);
    setTimeout(() => scrollToSection(target), 50);
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    scrollToSection("contact-section");
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[100001] px-6 sm:px-10 lg:px-14 py-4 sm:py-6 flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? "bg-[#F3F3EF]/90 backdrop-blur-md border-b border-fg/5 py-3 sm:py-4 shadow-sm"
            : "bg-transparent"
        }`}
      >
        {/* Left: Contact Us with Globe icon */}
        <div className="flex-1 flex items-center justify-start">
          <a
            href="#contact-section"
            onClick={handleContactClick}
            className="flex items-center gap-2 text-xs sm:text-sm font-bold tracking-[0.18em] uppercase text-fg hover:opacity-70 transition-opacity select-none group cursor-pointer"
          >
            <GlobeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-current group-hover:rotate-45 transition-transform duration-500" />
            <span>CONTACT US</span>
          </a>
        </div>

        {/* Center: Golden 3D Halo Ring */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <GoldenHalo />
        </div>

        {/* Right: Open Menu button */}
        <div className="flex-1 flex items-center justify-end relative" ref={menuBtnRef}>
          {/* Desktop Menu Trigger */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="hidden lg:flex items-center gap-2 text-xs sm:text-sm font-bold tracking-[0.18em] uppercase text-fg hover:opacity-70 transition-opacity select-none cursor-pointer"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span>{menuOpen ? "CLOSE MENU" : "OPEN MENU"}</span>
          </button>

          {/* Desktop Dropdown Menu */}
          <div className="hidden lg:block">
            <Menu
              open={menuOpen}
              onOutsideClick={(e) => {
                if (menuBtnRef.current && !menuBtnRef.current.contains(e.target)) {
                  setMenuOpen(false);
                }
              }}
              onClose={() => setMenuOpen(false)}
            />
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex lg:hidden items-center text-xs font-bold tracking-[0.18em] uppercase text-fg hover:opacity-70 transition-opacity select-none cursor-pointer"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <span>{mobileOpen ? "CLOSE" : "OPEN MENU"}</span>
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-[100000] lg:hidden transition-opacity duration-300 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        aria-hidden={!mobileOpen}
      >
        <div
          className="absolute inset-0 bg-bg"
          onClick={() => setMobileOpen(false)}
        />
        <div className="relative z-10 h-full w-full flex flex-col pt-24 pb-8 px-6">
          <nav className="flex flex-col gap-1">
            {MOBILE_NAV_ITEMS.map((item, i) => (
              <a
                key={item.target}
                href={item.target === "top" ? "#" : `#${item.target}`}
                onClick={(e) => handleMobileNav(e, item.target)}
                className="flex items-center justify-between py-4 border-b border-theme-border text-fg text-3xl font-semibold transition-colors duration-200 hover:text-brblue"
                style={{
                  letterSpacing: "-0.03em",
                  transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
                  opacity: mobileOpen ? 1 : 0,
                  transition: `transform 0.4s ease ${0.05 + i * 0.05}s, opacity 0.4s ease ${0.05 + i * 0.05
                    }s, color 0.2s ease`,
                }}
              >
                <span>{item.label}</span>
                <span className="text-fg-muted text-base">0{i + 1}</span>
              </a>
            ))}
          </nav>

          <div className="mt-auto pt-8 flex flex-col gap-3">
            <p className="text-fg-muted text-xs tracking-[0.2em] uppercase">Get in touch</p>
            <a
              href={`mailto:${EMAIL}`}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between bg-fg text-bg rounded-full px-5 py-4 text-sm tracking-[0.2em] font-semibold"
            >
              <span>EMAIL</span>
              <span aria-hidden="true">↗</span>
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between border-2 border-fg text-fg rounded-full px-5 py-4 text-sm tracking-[0.2em] font-semibold"
            >
              <span>WHATSAPP</span>
              <span aria-hidden="true">↗</span>
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between border-2 border-fg text-fg rounded-full px-5 py-4 text-sm tracking-[0.2em] font-semibold"
            >
              <span>LINKEDIN</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
