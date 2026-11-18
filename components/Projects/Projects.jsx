"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PROJECTS = [
  {
    name: "Maruthi Cars Showroom Website",
    role: "Python • HTML • CSS",
    kind: "2025–26",
    note: "Developed a Maruti Cars Showroom website using Python, HTML, and CSS. Displayed car models, specifications, prices, and showroom details through a simple user-friendly interface.",
    image: null,
  },
  {
    name: "AI-Based Anesthesia Monitoring System",
    role: "Python • HTML • React • FastAPI",
    kind: "2026–27",
    note: "Developed an AI-Based Anesthesia Monitoring System using Python, HTML, React, and FastAPI. Implemented real-time patient monitoring, risk-level prediction, and alert features for improved anesthesia safety.",
    image: null,
  },
];

const VENTURES = [
  {
    name: "AI & Real-Time Monitoring Systems",
    role: "FastAPI • React • Python",
    kind: "Capability",
    note: "AI-assisted patient monitoring, risk-level prediction, and real-time alert systems for enhanced safety and healthcare.",
  },
  {
    name: "Web Applications & UI Development",
    role: "Python • HTML • CSS • React",
    kind: "Capability",
    note: "User-friendly web interfaces, dynamic displays, product catalogs, and clean responsive web applications.",
  },
  {
    name: "Core Software & Algorithm Engineering",
    role: "Python • C • C++ Programming",
    kind: "Capability",
    note: "Strong foundation in data structures, algorithms, object-oriented principles, and computational problem solving.",
  },
  {
    name: "Office Tools & Computer Applications",
    role: "MS Office • Data Management",
    kind: "Capability",
    note: "Data organization, professional documentation, analysis, and comprehensive computer application skills.",
  },
];

const Row = ({ item, index }) => {
  return (
    <li className="pj-row">
      <div className="pj-link pj-link--static">
        <span className="pj-num">{String(index + 1).padStart(2, "0")}</span>
        {item.image && (
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-14 sm:w-28 sm:h-18 object-contain bg-white/5 rounded-xl border border-white/10 shrink-0"
          />
        )}
        <div className="pj-meta">
          <span className="pj-name">{item.name}</span>
          {item.role && <span className="pj-role">{item.role}</span>}
          {item.note && <span className="pj-note">{item.note}</span>}
        </div>
        <span className="pj-kind">{item.kind}</span>
      </div>
    </li>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const rows = sectionRef.current.querySelectorAll(".pj-row");
      gsap.from(rows, {
        opacity: 0,
        y: 60,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      const titles = sectionRef.current.querySelectorAll(".pj-title");
      gsap.from(titles, {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects-section" ref={sectionRef}>
      <div className="pj-head">
        <span className="pj-label">PROJECTS</span>
        <h2 className="pj-title">selected work</h2>
      </div>

      <ul className="pj-list">
        {PROJECTS.map((p, i) => (
          <Row key={p.name} item={p} index={i} />
        ))}
      </ul>

      <div id="ventures" className="pj-head pj-head--secondary">
        <span className="pj-label">WHAT I BUILD</span>
        <h2 className="pj-title">products &amp; solutions</h2>
      </div>

      <ul className="pj-list">
        {VENTURES.map((v, i) => (
          <Row key={v.name} item={v} index={i} />
        ))}
      </ul>
    </section>
  );
};

export default Projects;
