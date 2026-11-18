"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function MonolithSplash({ onComplete }) {
  const [percent, setPercent] = useState(0);
  const splashRef = useRef(null);
  const leftLogoRef = useRef(null);
  const rightLogoRef = useRef(null);
  const centerSlotRef = useRef(null);
  const bottomBarRef = useRef(null);
  const topBarRef = useRef(null);
  const finishedRef = useRef(false);

  useEffect(() => {
    // Lock scroll during splash
    document.body.style.overflow = "hidden";
    if (typeof window !== "undefined" && window.__lenis) {
      window.__lenis.stop();
    }

    const ctx = gsap.context(() => {
      // 1. Initial State
      gsap.set(splashRef.current, { yPercent: 0, autoAlpha: 1 });
      gsap.set([topBarRef.current, bottomBarRef.current], { opacity: 0, y: 15 });
      gsap.set(centerSlotRef.current, { scale: 0.85, opacity: 0 });

      // 2. Open up the split logo (Monolith signature mechanic)
      const tl = gsap.timeline();

      // Reveal top & bottom bars
      tl.to([topBarRef.current, bottomBarRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      });

      // Split logo halves apart
      tl.to(
        leftLogoRef.current,
        {
          x: "-28%",
          duration: 0.9,
          ease: "power3.inOut",
        },
        "-=0.3"
      );

      tl.to(
        rightLogoRef.current,
        {
          x: "28%",
          duration: 0.9,
          ease: "power3.inOut",
        },
        "<"
      );

      // Fade in center slot
      tl.to(
        centerSlotRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "<"
      );

      // 3. Counter Animation (00% -> 100%)
      const counterObj = { value: 0 };
      gsap.to(counterObj, {
        value: 100,
        duration: 2.2,
        ease: "power3.inOut",
        onUpdate: () => {
          setPercent(Math.round(counterObj.value));
        },
        onComplete: () => {
          triggerExit();
        },
      });
    }, splashRef);

    const triggerExit = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;

      const exitTl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          if (typeof window !== "undefined" && window.__lenis) {
            window.__lenis.start();
          }
          if (typeof onComplete === "function") {
            onComplete();
          }
        },
      });

      // Lock logo back together & hide center slot
      exitTl.to(centerSlotRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
        ease: "power2.in",
      });

      exitTl.to(
        [leftLogoRef.current, rightLogoRef.current],
        {
          x: "0%",
          duration: 0.6,
          ease: "power3.inOut",
        },
        "-=0.2"
      );

      // Fade out bottom and top bars
      exitTl.to(
        [bottomBarRef.current, topBarRef.current],
        {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: "power2.in",
        },
        "<"
      );

      // Signature Monolith Curtain Slide Wipe
      exitTl.to(splashRef.current, {
        yPercent: -100,
        duration: 0.95,
        ease: "power4.inOut",
      });
    };

    return () => {
      document.body.style.overflow = "";
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.start();
      }
      ctx.revert();
    };
  }, [onComplete]);

  const formattedPercent = String(percent).padStart(2, "0");

  return (
    <div
      ref={splashRef}
      className="fixed inset-0 z-[200000] flex flex-col justify-between bg-[#F3F3EF] text-[#060607] px-6 sm:px-12 py-8 sm:py-10 select-none overflow-hidden"
      style={{ willChange: "transform" }}
    >
      {/* Top Bar: Editorial / Context Meta */}
      <div
        ref={topBarRef}
        className="w-full flex items-center justify-between text-[11px] sm:text-xs font-mono tracking-[0.2em] uppercase text-[#060607]/60"
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#060607]/80 animate-pulse" />
          <span>INITIALIZING</span>
        </div>
        <div className="hidden sm:block">
          <span>SAVITHA BALAJI — 2026 EDITION</span>
        </div>
        <div>
          <span>NEW YORK • CHENNAI</span>
        </div>
      </div>

      {/* Centerpiece: Monolith NYC Split Logo Reveal */}
      <div className="relative w-full flex items-center justify-center overflow-hidden my-auto py-12">
        {/* Left Half of Logo */}
        <div
          ref={leftLogoRef}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[-0.04em] uppercase text-[#060607] select-none"
          style={{
            fontFamily: "'AeonikBold', 'Inter', sans-serif",
            willChange: "transform",
          }}
        >
          SAVI
        </div>

        {/* Center Slot (revealed in the gap like Monolith's image showcase) */}
        <div
          ref={centerSlotRef}
          className="mx-3 sm:mx-6 w-16 sm:w-24 md:w-32 h-24 sm:h-36 md:h-44 rounded-lg overflow-hidden border border-[#060607]/20 bg-[#E5E5DF] flex-shrink-0 flex items-center justify-center shadow-2xl relative"
          style={{ willChange: "transform, opacity" }}
        >
          <img
            src="/savi.jpg.jpeg"
            alt="Showcase"
            className="w-full h-full object-cover contrast-110 opacity-90"
          />
          {/* Subtle Scanning Scanline */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#060607]/10 to-transparent animate-pulse pointer-events-none" />
        </div>

        {/* Right Half of Logo */}
        <div
          ref={rightLogoRef}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[-0.04em] uppercase text-[#060607] select-none"
          style={{
            fontFamily: "'AeonikBold', 'Inter', sans-serif",
            willChange: "transform",
          }}
        >
          THA
        </div>
      </div>

      {/* Bottom Bar: Loading Label + Precision Percentage Counter */}
      <div
        ref={bottomBarRef}
        className="w-full flex items-end justify-between border-t border-[#060607]/15 pt-4 text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-[#060607]"
      >
        <div className="flex items-center gap-3">
          <span className="text-[#060607]/60">(loading)</span>
          <span className="hidden md:inline text-[11px] text-[#060607]/40">
            COMPUTING ASSETS &bull; MONOLITH ENGINE
          </span>
        </div>

        {/* Precision Percentage Counter (00% -> 100%) */}
        <div className="flex items-baseline gap-1 text-2xl sm:text-3xl font-bold font-mono tracking-wider tabular-nums">
          <span>{formattedPercent}</span>
          <span className="text-base sm:text-lg text-[#060607]/60">%</span>
        </div>
      </div>
    </div>
  );
}
