import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  Sun,
  Moon,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

import WWMSHORTENEDBLACK from "../assets/WWMSHORTENEDBLACK.png";
import WWMSHORTENEDWHITE from "../assets/WWMSHORTENEDWHITE.png";
import pavilionImg from "../assets/PAVILLION.jpg";
import A2A from "../assets/A2A.png";

export default function AllProjectsPage({ darkMode, setDarkMode }) {
  const allProjects = useMemo(
    () => [
      {
        id: "project-1",
        title: "Torre Faro – A2A Headquarters",
        images: [A2A, pavilionImg, pavilionImg],
        location: "Milan, Italy",
        sector: "Mixed-use high-rise headquarters",
        role: "Structural engineering, early design collaboration",
        status: "Completed",
        overview:
          "A 145-metre headquarters tower for A2A located in Milan’s Southern Area, forming a strategic urban link between the historic city centre and the emerging Symbiosis business district. Positioned opposite the future Olympic Village for the Milano–Cortina 2026 Winter Games, the project contributes to the city’s wider urban regeneration and sports infrastructure transformation.",
        details: {
          client: "A2A S.p.A.",
          year: "—",
          Collaborators: "Antonio C & Patricia V Architects",
        },
      },
      {
        id: "project-2",
        title: "Project 2",
        images: [pavilionImg],
        location: "Location",
        sector: "High-rise residential / mixed-use",
        role: "Structural and façade engineering",
        status: "Completed",
        overview:
          "High-rise tower overlooking Dubai Marina, designed with optimised structural systems and coordinated with complex façade geometry.",
        details: {
          client: "—",
          year: "—",
          scope: "Structure + façade coordination",
        },
      },
      {
        id: "project-3",
        title: "Project 3",
        images: [pavilionImg, pavilionImg],
        location: "Location",
        sector: "Transport & infrastructure",
        role: "Structural design, concourse integration",
        status: "In Design",
        overview:
          "Transit hub connecting metro, public realm and retail podiums, with large-span structures and integrated passenger flows.",
        details: {
          client: "—",
          year: "—",
          scope: "Concourse + large-span structure",
        },
      },
      {
        id: "project-4",
        title: "Project 4",
        images: [pavilionImg],
        location: "Location",
        sector: "Cultural / civic",
        role: "Structural design, roof geometry",
        status: "Concept",
        overview:
          "Cultural venue with expressive roof forms and flexible gallery spaces, integrating structure, daylight and public circulation.",
        details: {
          client: "—",
          year: "—",
          scope: "Roof geometry + concept structure",
        },
      },
    ],
    []
  );

  const [selected, setSelected] = useState(null);

  // ✅ Close modal with ESC
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-black text-white" : "bg-white text-gray-900"
      } font-sans transition-colors duration-500`}
    >
      {/* Top bar */}
      <div className="sticky top-0 z-50 backdrop-blur-xl">
        <div
          className={`border-b ${
            darkMode ? "border-white/10" : "border-gray-900/10"
          }`}
        >
          <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-6 flex items-center">
            {/* Centered Logo */}
            <Link
              to="/"
              className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3"
            >
              <img
                src={darkMode ? WWMSHORTENEDWHITE : WWMSHORTENEDBLACK}
                alt="WWM"
                className="h-7 w-auto"
              />
              <span
                className={`text-xs tracking-[0.28em] uppercase ${
                  darkMode ? "text-white/60" : "text-gray-900/60"
                } hidden sm:inline`}
              >
                All Projects
              </span>
            </Link>

            {/* Right Toggle */}
            <div className="ml-auto">
              <button
                onClick={() => setDarkMode((v) => !v)}
                className={`w-12 h-12 rounded-full ${
                  darkMode
                    ? "bg-white/10 hover:bg-white/20"
                    : "bg-gray-900/10 hover:bg-gray-900/20"
                } backdrop-blur-xl border ${
                  darkMode ? "border-white/20" : "border-gray-900/20"
                } flex items-center justify-center transition-all duration-300 hover:scale-110`}
                aria-label="Toggle dark mode"
                type="button"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <section className="px-6 lg:px-12 pt-16 pb-10">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-xs tracking-[0.3em] uppercase ${
              darkMode ? "text-white/50" : "text-gray-900/50"
            }`}
          >
            Projects Archive
          </div>
          <h1 className="mt-4 text-5xl lg:text-6xl font-bold">All Projects</h1>
          <p
            className={`mt-5 max-w-2xl text-lg ${
              darkMode ? "text-white/60" : "text-gray-900/60"
            }`}
          >
            A complete list of featured work and initiatives.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 lg:px-12 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {allProjects.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelected(p)}
                className={`text-left group rounded-3xl border overflow-hidden transition-all duration-500 hover:scale-[1.01] focus:outline-none ${
                  darkMode
                    ? "border-white/10 bg-white/[0.03]"
                    : "border-gray-900/10 bg-gray-900/[0.03]"
                }`}
              >
                <div className="relative aspect-[16/10] w-full">
                  <img
                    src={p.images?.[0] || pavilionImg}
                    alt={p.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div
                    className={`absolute inset-0 ${
                      darkMode ? "bg-black/25" : "bg-white/10"
                    }`}
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="text-xl font-semibold truncate">
                        {p.title}
                      </div>
                      <div
                        className={`mt-2 text-xs tracking-widest uppercase ${
                          darkMode ? "text-white/50" : "text-gray-900/50"
                        }`}
                      >
                        {p.location}
                      </div>
                    </div>

                    <span
                      className={`text-xs px-3 py-1 rounded-full whitespace-nowrap ${
                        darkMode
                          ? "bg-white/10 text-white/80"
                          : "bg-gray-900/10 text-gray-900/80"
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>

                  <div
                    className={`mt-5 h-px ${
                      darkMode ? "bg-white/10" : "bg-gray-900/10"
                    }`}
                  />

                  <div className="mt-5 space-y-3">
                    <div>
                      <div
                        className={`text-[10px] tracking-[0.25em] uppercase ${
                          darkMode ? "text-white/45" : "text-gray-900/55"
                        }`}
                      >
                        Sector
                      </div>
                      <div className="mt-1 text-sm">{p.sector}</div>
                    </div>

                    <div>
                      <div
                        className={`text-[10px] tracking-[0.25em] uppercase ${
                          darkMode ? "text-white/45" : "text-gray-900/55"
                        }`}
                      >
                        Role
                      </div>
                      <div className="mt-1 text-sm">{p.role}</div>
                    </div>

                    <div>
                      <div
                        className={`text-[10px] tracking-[0.25em] uppercase ${
                          darkMode ? "text-white/45" : "text-gray-900/55"
                        }`}
                      >
                        Summary
                      </div>
                      <p
                        className={`mt-1 text-sm leading-relaxed ${
                          darkMode ? "text-white/75" : "text-gray-900/75"
                        }`}
                      >
                        {p.overview}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div
                      className={`text-xs tracking-widest uppercase ${
                        darkMode ? "text-white/50" : "text-gray-900/50"
                      }`}
                    >
                      View
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-14 flex justify-center">
            <Link
              to="/"
              className={`px-8 py-4 rounded-full border text-xs tracking-widest transition-all duration-300 hover:scale-[1.02] ${
                darkMode
                  ? "border-white/25 text-white/75 hover:text-white hover:border-white"
                  : "border-gray-900/25 text-gray-900/75 hover:text-gray-900 hover:border-gray-900"
              }`}
            >
              BACK TO HOME
            </Link>
          </div>
        </div>
      </section>

      {/* ✅ MODAL POPUP (NOT EXPAND) */}
      {selected && (
        <ProjectModal
          darkMode={darkMode}
          project={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

function ProjectModal({ darkMode, project, onClose }) {
  const images = project.images?.length ? project.images : [pavilionImg];
  const [idx, setIdx] = useState(0);

  const next = () => setIdx((v) => (v + 1) % images.length);
  const prev = () => setIdx((v) => (v - 1 + images.length) % images.length);

  return (
    <div className="fixed inset-0 z-[999]">
      {/* backdrop */}
      <button
        type="button"
        aria-label="Close project modal"
        onClick={onClose}
        className={`absolute inset-0 ${
          darkMode ? "bg-black/70" : "bg-black/40"
        } backdrop-blur-sm`}
      />

      {/* panel */}
      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
        <div
          className={`relative w-full max-w-6xl rounded-3xl border overflow-hidden shadow-2xl ${
            darkMode ? "bg-black border-white/10" : "bg-white border-gray-900/10"
          }`}
        >
          {/* top bar */}
          <div
            className={`flex items-center justify-between px-5 sm:px-7 py-4 border-b ${
              darkMode ? "border-white/10" : "border-gray-900/10"
            }`}
          >
            <div className="min-w-0">
              <div className="text-sm tracking-[0.28em] uppercase opacity-70">
                Project
              </div>
              <div className="mt-1 text-2xl sm:text-3xl font-semibold truncate">
                {project.title}
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition hover:scale-105 ${
                darkMode
                  ? "border-white/15 bg-white/5 hover:bg-white/10"
                  : "border-gray-900/15 bg-gray-900/5 hover:bg-gray-900/10"
              }`}
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          {/* content */}
          <div className="grid lg:grid-cols-[1.6fr_1fr] gap-0">
            {/* left: image / carousel */}
            <div className="relative">
              {/* ✅ ROUNDED IMAGE WRAPPER + CLIP */}
              <div className="p-5 sm:p-7">
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden">
                  <img
                    src={images[idx]}
                    alt={`${project.title} image ${idx + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div
                    className={`absolute inset-0 ${
                      darkMode ? "bg-black/20" : "bg-white/10"
                    }`}
                  />
                </div>
              </div>

              {/* carousel controls (only show if more than 1 image) */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      prev();
                    }}
                    className={`absolute left-7 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border flex items-center justify-center ${
                      darkMode
                        ? "border-white/15 bg-black/40 hover:bg-black/55"
                        : "border-gray-900/15 bg-white/50 hover:bg-white/70"
                    }`}
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      next();
                    }}
                    className={`absolute right-7 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border flex items-center justify-center ${
                      darkMode
                        ? "border-white/15 bg-black/40 hover:bg-black/55"
                        : "border-gray-900/15 bg-white/50 hover:bg-white/70"
                    }`}
                    aria-label="Next image"
                  >
                    <ChevronRight size={18} />
                  </button>

                  <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
                    {images.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all ${
                          i === idx ? "w-8 opacity-100" : "w-3 opacity-50"
                        } ${darkMode ? "bg-white" : "bg-gray-900"}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* right: overview + details */}
            <div className="p-5 sm:p-7">
              <div
                className={`text-xs tracking-[0.3em] uppercase ${
                  darkMode ? "text-white/55" : "text-gray-900/55"
                }`}
              >
                Overview
              </div>

              <p
                className={`mt-4 text-base leading-relaxed ${
                  darkMode ? "text-white/75" : "text-gray-900/75"
                }`}
              >
                {project.overview}
              </p>

              <div
                className={`mt-7 h-px ${
                  darkMode ? "bg-white/10" : "bg-gray-900/10"
                }`}
              />

              {/* Project details card */}
              <div
                className={`mt-7 rounded-2xl border p-5 ${
                  darkMode
                    ? "border-white/10 bg-white/[0.03]"
                    : "border-gray-900/10 bg-gray-900/[0.03]"
                }`}
              >
                <div
                  className={`text-xs tracking-[0.3em] uppercase ${
                    darkMode ? "text-white/55" : "text-gray-900/55"
                  }`}
                >
                  Project Details
                </div>

                <div className="mt-5 space-y-4">
                  <Row darkMode={darkMode} label="Location" value={project.location} />
                  <Row darkMode={darkMode} label="Status" value={project.status} pill />
                  <Row darkMode={darkMode} label="Sector" value={project.sector} />
                  <Row darkMode={darkMode} label="Our Role" value={project.role} />

                  {project.details?.client && (
                    <Row darkMode={darkMode} label="Client" value={project.details.client} />
                  )}
                  {project.details?.year && (
                    <Row darkMode={darkMode} label="Year" value={project.details.year} />
                  )}
                  {project.details?.Collaborators && (
                    <Row darkMode={darkMode} label="Collaborators" value={project.details.Collaborators} />
                  )}
                  
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div
                  className={`text-xs tracking-widest uppercase ${
                    darkMode ? "text-white/50" : "text-gray-900/50"
                  }`}
                >
                  Close
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className={`px-5 py-3 rounded-full border text-xs tracking-widest transition hover:scale-[1.02] ${
                    darkMode
                      ? "border-white/25 text-white/80 hover:text-white hover:border-white"
                      : "border-gray-900/25 text-gray-900/80 hover:text-gray-900 hover:border-gray-900"
                  }`}
                >
                  DONE
                </button>
              </div>
            </div>
          </div>

          {/* tiny hint */}
          <div
            className={`px-5 sm:px-7 py-3 border-t text-[11px] tracking-widest uppercase ${
              darkMode
                ? "border-white/10 text-white/45"
                : "border-gray-900/10 text-gray-900/45"
            }`}
          >
            Press ESC to close
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ darkMode, label, value, pill = false }) {
  return (
    <div className="flex items-center justify-between gap-6">
      <div
        className={`text-xs tracking-widest uppercase ${
          darkMode ? "text-white/50" : "text-gray-900/50"
        }`}
      >
        {label}
      </div>

      {pill ? (
        <span
          className={`text-xs px-3 py-1 rounded-full whitespace-nowrap ${
            darkMode ? "bg-white/10 text-white/80" : "bg-gray-900/10 text-gray-900/80"
          }`}
        >
          {value}
        </span>
      ) : (
        <div
          className={`text-sm text-right ${
            darkMode ? "text-white/80" : "text-gray-900/80"
          }`}
        >
          {value}
        </div>
      )}
    </div>
  );
}
