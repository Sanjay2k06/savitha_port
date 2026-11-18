"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const HERO_TITLE = "SAVITHA";

const InteractiveLetter = ({ char, index }) => {
  return (
    <motion.span
      className="inline-block cursor-pointer select-none origin-bottom will-change-transform"
      initial={{ y: "120%", opacity: 0 }}
      animate={{ y: "0%", opacity: 1 }}
      transition={{
        duration: 0.9,
        delay: 0.25 + index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        y: -26,
        scale: 1.08,
        rotate: index % 2 === 0 ? -4 : 4,
        transition: { type: "spring", stiffness: 450, damping: 12 },
      }}
      whileTap={{ scale: 0.94 }}
    >
      {char}
    </motion.span>
  );
};

export default function HeroSection() {
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
      const day = days[now.getDay()];
      const hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      const displayHours = hours % 12 || 12;
      setTimeStr(`${day} ${displayHours}:${minutes}:${seconds} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero-section"
      className="relative w-full h-screen min-h-[620px] flex flex-col justify-between select-none overflow-hidden bg-[#F3F3EF] text-[#060607] pt-24 sm:pt-28"
    >
      {/* Center Statement with clean brutalist styling matching the reference */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-12 lg:px-20 text-center z-10 py-8 md:py-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl text-sm sm:text-base md:text-lg lg:text-[1.32rem] font-bold uppercase tracking-[0.16em] sm:tracking-[0.2em] leading-relaxed md:leading-[2.2] text-fg"
        >
          <span className="border-b-[1.5px] border-current pb-0.5">
            COMPUTER SCIENCE STUDENT
          </span>{" "}
          BUILDING{" "}
          <span className="border-b-[1.5px] border-current pb-0.5">
            PRACTICAL SOFTWARE SOLUTIONS
          </span>{" "}
          THROUGH TECHNOLOGY AND INNOVATION.
        </motion.p>
      </div>

      {/* Bottom Container: Info/Meta Bar + Giant Interactive Letters */}
      <div className="w-full flex flex-col z-10">
        {/* Status / Meta Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full px-6 sm:px-10 lg:px-14 flex items-center justify-between text-[10px] sm:text-xs font-bold tracking-[0.16em] uppercase text-[#060607]/75 border-t border-[#060607]/10 pt-3 pb-2 select-none"
        >
          {/* Left: Live Time + Location */}
          <div className="flex items-center gap-4 sm:gap-8">
            <span className="tabular-nums font-mono text-[11px] sm:text-xs">
              {timeStr || "WED 5:01:42 AM"}
            </span>
            <span className="hidden sm:inline">CHENNAI, INDIA</span>
          </div>

          {/* Center: Role / Squad */}
          <div className="hidden md:inline-block">
            <span>PRODUCT SQUAD</span>
          </div>

          {/* Right: Social & Contact Links */}
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href="https://www.linkedin.com/in/savitha-balaji-415558439"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#060607] hover:underline transition-colors cursor-pointer"
            >
              LINKEDIN
            </a>
            <a
              href="https://github.com/savitha18-b"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#060607] hover:underline transition-colors cursor-pointer"
            >
              GITHUB
            </a>
            <a
              href="mailto:savithabalaji04@gmail.com"
              className="hover:text-[#060607] hover:underline transition-colors cursor-pointer"
            >
              EMAIL
            </a>
          </div>
        </motion.div>

        {/* Giant Edge-to-Edge Interactive Kinetic Typography */}
        <div className="w-full text-center overflow-hidden leading-[0.78] select-none pt-10 -mt-8 pb-0 -mb-2 sm:-mb-3">
          <h1
            className="w-full text-center font-black tracking-[-0.035em] uppercase text-[#060607] leading-[0.78] whitespace-nowrap flex justify-center items-end"
            style={{
              fontSize: "clamp(4.2rem, 18.8vw, 20rem)",
              fontFamily: "'AeonikBold', 'Inter', -apple-system, sans-serif",
            }}
          >
            {HERO_TITLE.split("").map((char, index) => (
              <InteractiveLetter key={index} char={char} index={index} />
            ))}
          </h1>
        </div>
      </div>
    </section>
  );
}
