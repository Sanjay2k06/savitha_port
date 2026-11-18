"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    // Only enable on desktop / fine-pointer devices
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) setVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check if hovering interactive target
      const target = e.target;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".cursor-pointer") ||
        target.closest("[role='button']")
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    const render = () => {
      // Smooth lerp trailing for the outer ring
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [visible]);

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[999999] overflow-hidden select-none">
      {/* Small Lead Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-fg transition-opacity duration-300 pointer-events-none ${
          visible ? "opacity-90" : "opacity-0"
        } ${hovered ? "scale-0" : "scale-100"}`}
        style={{ willChange: "transform" }}
      />

      {/* Trailing Elastic Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border border-fg/50 pointer-events-none transition-all duration-300 ease-out ${
          visible ? "opacity-100" : "opacity-0"
        } ${
          hovered
            ? "w-12 h-12 -ml-6 -mt-6 bg-fg/10 border-fg scale-110"
            : "w-8 h-8 -ml-4 -mt-4 scale-100"
        }`}
        style={{ willChange: "transform" }}
      />
    </div>
  );
}
