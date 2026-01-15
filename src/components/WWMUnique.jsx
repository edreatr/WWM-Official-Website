import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Sun, Moon, Users, Linkedin, LayoutGrid } from "lucide-react";
import { Link } from "react-router-dom";

import wwmLogo from "../assets/WWM_WHITELOGO_PNG.png";
import wwmLogoDark from "../assets/WWM_BLACKTEXT.png";
import WWMSHORTENEDBLACK from "../assets/WWMSHORTENEDBLACK.png";
import WWMSHORTENEDWHITE from "../assets/WWMSHORTENEDWHITE.png";
import pavilionImg from "../assets/PAVILLION.jpg";
import servicebg from "../assets/servicebg.jpg";
import smartTechImg from "../assets/SMARTTECH.jpg";
import sustainabilityImg from "../assets/SUSTAINABILITY.png";
import masterplanningImg from "../assets/MASTERPLANNING.png";
import tallBuildingImg from "../assets/servicebg.jpg";
import idcImg from "../assets/IDC.png";
import digitalDesignImg from "../assets/DIGITALDESIGN.jpg";

// ✅ Map assets (as you asked) — (your file swaps these names)
import blackmap from "../assets/whitemap.png";
import whitemap from "../assets/blackmap.png";
import blackmaphighlight from "../assets/whitemaphighlight.png";
import whitemaphighlight from "../assets/blackmaphighlight.png";

/* ---------------- Slot Machine Text (NO BORDER / NO ROUNDED CONTAINER) ---------------- */
function SlotMachineText({ text = "DESIGN DIFFERENT", className = "" }) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const targetChars = text.split("");

  const [displayText, setDisplayText] = useState(targetChars);
  const [settled, setSettled] = useState(Array(targetChars.length).fill(false));

  useEffect(() => {
    setDisplayText(Array(targetChars.length).fill(""));
    setSettled(Array(targetChars.length).fill(false));

    const intervals = [];
    const timers = [];

    targetChars.forEach((targetChar, index) => {
      const settleDelay = index * 150;

      if (targetChar === " ") {
        setDisplayText((prev) => {
          const next = [...prev];
          next[index] = " ";
          return next;
        });
        setSettled((prev) => {
          const next = [...prev];
          next[index] = true;
          return next;
        });
        return;
      }

      const spinInterval = setInterval(() => {
        setDisplayText((prev) => {
          const next = [...prev];
          if (!settled[index]) {
            next[index] = chars[Math.floor(Math.random() * chars.length)];
          }
          return next;
        });
      }, 50);
      intervals.push(spinInterval);

      const settleTimer = setTimeout(() => {
        setDisplayText((prev) => {
          const next = [...prev];
          next[index] = targetChar;
          return next;
        });
        setSettled((prev) => {
          const next = [...prev];
          next[index] = true;
          return next;
        });
        clearInterval(spinInterval);
      }, 2000 + settleDelay);
      timers.push(settleTimer);
    });

    return () => {
      intervals.forEach(clearInterval);
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <div className={`w-full flex items-center justify-center select-none ${className}`} aria-label={text}>
      <div className="flex justify-center tracking-[0.22em]">
        {displayText.map((char, i) => (
          <span key={i} className="inline-block text-center px-[0.08em]">
            {char === "" ? "\u00A0" : char}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Shared Logo (same on loading + hero) ---------------- */
function HeroLogo({ darkMode }) {
  return (
    <div className="mb-8 transition-transform duration-300">
      <img
        src={darkMode ? WWMSHORTENEDWHITE : WWMSHORTENEDBLACK}n
        alt="Whitby Wood Mills logo"
        className="w-[42vw] md:w-[25vw] mx-auto opacity-90"
      />
    </div>
  );
}

function useSpinningNumber(min = 10, max = 99, interval = 1200) {
  const [value, setValue] = useState(Math.floor(Math.random() * (max - min + 1)) + min);

  useEffect(() => {
    const id = setInterval(() => {
      setValue(Math.floor(Math.random() * (max - min + 1)) + min);
    }, interval);

    return () => clearInterval(id);
  }, [min, max, interval]);

  return value;
}

/* ---------------- Studios Map (OPTION B: swap to highlight image near Singapore) ---------------- */
function StudiosMap({ darkMode }) {
  const [hoveringSingapore, setHoveringSingapore] = useState(false);

  // 🔧 Adjust these to align the hover zone over Singapore on your map
  const singapore = {
    x: 76.5, // % from left
    y: 55.0, // % from top
    radius: 120, // px - bigger = easier to trigger
  };

  const baseSrc = darkMode ? whitemap : blackmap;
  const highlightSrc = darkMode ? whitemaphighlight : blackmaphighlight;

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      <img
        src={baseSrc}
        alt="WWM global map"
        className="w-full h-auto block opacity-70 select-none"
        draggable={false}
      />

      <img
        src={highlightSrc}
        alt="WWM global map highlight"
        className={`pointer-events-none absolute inset-0 w-full h-auto transition-opacity duration-300 ${
          hoveringSingapore ? "opacity-100" : "opacity-0"
        }`}
        draggable={false}
      />

      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${singapore.x}%`,
          top: `${singapore.y}%`,
          width: singapore.radius * 2,
          height: singapore.radius * 2,
        }}
        onMouseEnter={() => setHoveringSingapore(true)}
        onMouseLeave={() => setHoveringSingapore(false)}
      />
    </div>
  );
}

/* =======================================================================
   UPDATED: Horizontal projects
   - Collapsed: ONLY one image (p.image)
   - Expanded: SAME image area becomes a viewer for p.images (left/right)
   - No extra "Project Images" carousel below (removes repetition)
   ======================================================================= */
function HorizontalProjects({ projects = [], darkMode }) {
  const scrollerRef = useRef(null);

  // ✅ seamless infinite loop via clones
  const CLONES = Math.min(2, projects.length);
  const hasLoop = projects.length > 1 && CLONES > 0;

  // virtual list = [tail clones] + [real] + [head clones]
  const virtualProjects = hasLoop
    ? [
        ...projects.slice(projects.length - CLONES),
        ...projects,
        ...projects.slice(0, CLONES),
      ]
    : projects;

  // ✅ active / expanded stay in REAL index space (0..projects.length-1)
  const [active, setActive] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState(null);

  // per-card current image index (keyed by REAL index)
  const [imgIndexByCard, setImgIndexByCard] = useState({});

  // ✅ Hide project-switch arrows when any card is expanded
  const anyExpanded = expandedIndex !== null;

  const mod = (n, m) => ((n % m) + m) % m;

  const realFromVirtual = (vIdx) => {
    if (!hasLoop) return vIdx;
    return mod(vIdx - CLONES, projects.length);
  };

  const virtualFromReal = (rIdx) => {
    if (!hasLoop) return rIdx;
    return rIdx + CLONES;
  };

  // ✅ Center-scroll helper (VIRTUAL index)
  const scrollToVirtualIndex = (vIdx, behavior = "smooth") => {
    if (!scrollerRef.current) return;

    const el = scrollerRef.current;
    const cards = el.querySelectorAll("[data-project-card='1']");
    if (!cards?.length) return;

    const next = Math.max(0, Math.min(vIdx, cards.length - 1));
    const target = cards[next];
    if (!target) return;

    const elRect = el.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    // target left inside scroller content coordinate
    const targetLeftWithinScroller = targetRect.left - elRect.left + el.scrollLeft;

    // center target in viewport
    const nextScrollLeft =
      targetLeftWithinScroller - (elRect.width / 2 - targetRect.width / 2);

    el.scrollTo({ left: nextScrollLeft, behavior });
  };

  // ✅ Public helper (REAL index) — wraps automatically
  const scrollToIndex = (idx, behavior = "smooth") => {
    if (!projects.length) return;

    const nextReal = hasLoop ? mod(idx, projects.length) : Math.max(0, Math.min(idx, projects.length - 1));
    const vIdx = hasLoop ? virtualFromReal(nextReal) : nextReal;

    scrollToVirtualIndex(vIdx, behavior);
  };

  // ✅ Start from Project 1 (real index 0)
  useEffect(() => {
    if (!scrollerRef.current) return;

    setActive(0);
    setExpandedIndex(null);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const startVIdx = hasLoop ? CLONES : 0;
        scrollToVirtualIndex(startVIdx, "auto"); // instant jump
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasLoop, CLONES, projects.length]);

  const onScroll = (e) => {
    const el = e.currentTarget;
    const cards = el.querySelectorAll("[data-project-card='1']");
    if (!cards?.length) return;

    const left = el.getBoundingClientRect().left;
    let bestVIdx = 0;
    let bestDist = Infinity;

    cards.forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      const dist = Math.abs(rect.left - left);
      if (dist < bestDist) {
        bestDist = dist;
        bestVIdx = i;
      }
    });

    const realIdx = realFromVirtual(bestVIdx);
    setActive(realIdx);

    // ✅ Seamless "teleport" when hitting clones
    if (!hasLoop) return;

    const totalReal = projects.length;

    // In leading clones (0..CLONES-1) -> jump forward by totalReal
    if (bestVIdx < CLONES) {
      const jumpTo = bestVIdx + totalReal;
      requestAnimationFrame(() => scrollToVirtualIndex(jumpTo, "auto"));
    }

    // In trailing clones (totalReal+CLONES .. end) -> jump backward by totalReal
    if (bestVIdx >= totalReal + CLONES) {
      const jumpTo = bestVIdx - totalReal;
      requestAnimationFrame(() => scrollToVirtualIndex(jumpTo, "auto"));
    }
  };

  // Mouse wheel => horizontal scroll (section only)
  const onWheel = (e) => {
    if (!scrollerRef.current) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      scrollerRef.current.scrollLeft += e.deltaY;
    }
  };

  const toggleExpand = (realIdx) => {
    setExpandedIndex((prev) => {
      const next = prev === realIdx ? null : realIdx;

      // when opening: ensure index exists
      if (next !== null) {
        setImgIndexByCard((m) => (m[realIdx] === undefined ? { ...m, [realIdx]: 0 } : m));
      }

      // when closing: reset back to first image
      if (next === null) {
        setImgIndexByCard((m) => ({ ...m, [realIdx]: 0 }));
      }

      return next;
    });
  };

  // ✅ IMPORTANT: after expand/collapse changes layout, re-center the active/expanded card
  useEffect(() => {
    if (!projects.length) return;

    // When expanded: center expanded card after layout updates
    if (expandedIndex !== null) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          scrollToIndex(expandedIndex, "smooth");
        });
      });
      return;
    }

    // When collapsed: center the currently active card
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToIndex(active, "smooth");
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expandedIndex]);

  const stepImage = (realIdx, dir, total) => {
    setImgIndexByCard((prev) => {
      const cur = prev[realIdx] ?? 0;
      const next = (cur + dir + total) % total;
      return { ...prev, [realIdx]: next };
    });
  };

  const arrowBase =
    "absolute top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300";
  const arrowStyle = darkMode
    ? "bg-black/60 text-white border border-white/10"
    : "bg-white/85 text-black border border-gray-900/10";

  return (
    <div className="relative">
      {/* ✅ Project scroller arrows (hide when anyExpanded) */}
      <button
        type="button"
        onClick={() => scrollToIndex(active - 1)}
        className={`${arrowBase} left-4 ${arrowStyle} ${
          anyExpanded
            ? "opacity-0 pointer-events-none"
            : "opacity-0 lg:opacity-100 hover:scale-105"
        }`}
        aria-label="Previous project"
      >
        <span className="text-2xl leading-none select-none">‹</span>
      </button>

      <button
        type="button"
        onClick={() => scrollToIndex(active + 1)}
        className={`${arrowBase} right-4 ${arrowStyle} ${
          anyExpanded
            ? "opacity-0 pointer-events-none"
            : "opacity-0 lg:opacity-100 hover:scale-105"
        }`}
        aria-label="Next project"
      >
        <span className="text-2xl leading-none select-none">›</span>
      </button>

      {/* Scroller */}
      <div
        ref={scrollerRef}
        onScroll={onScroll}
        onWheel={onWheel}
        className="overflow-x-auto overflow-y-hidden no-scrollbar snap-x snap-mandatory scroll-smooth px-2 sm:px-6"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="flex gap-4 sm:gap-6 pb-2">
          {virtualProjects.map((p, vIdx) => {
            const realIdx = realFromVirtual(vIdx);

            const isExpanded = expandedIndex === realIdx;
            const someExpanded = expandedIndex !== null;
            const isOther = someExpanded && !isExpanded;

            const imgs = p.images?.length ? p.images : [p.image];
            const imgIdx = imgIndexByCard[realIdx] ?? 0;
            const displaySrc = isExpanded ? imgs[imgIdx] : p.image;

            return (
              <div
                key={`v-${vIdx}`}
                data-project-card="1"
                className={[
                  "snap-start shrink-0 transition-all duration-700",
                  !isExpanded ? "w-[86vw] sm:w-[70vw] lg:w-[48vw] xl:w-[40vw]" : "",
                  isExpanded ? "w-[92vw] sm:w-[84vw] lg:w-[70vw] xl:w-[62vw]" : "",
                  isOther ? "opacity-30 blur-[1px]" : "opacity-100",
                ].join(" ")}
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleExpand(realIdx)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") toggleExpand(realIdx);
                  }}
                  className={`group relative rounded-3xl overflow-hidden border transition-all duration-700 ${
                    darkMode ? "border-white/10 bg-white/[0.03]" : "border-gray-900/10 bg-gray-900/[0.03]"
                  } ${isExpanded ? "scale-[1.01]" : "hover:scale-[1.01]"}`}
                  aria-expanded={isExpanded}
                >
                  {/* TOP IMAGE */}
                  <div className={`relative w-full ${isExpanded ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
                    <img
                      src={displaySrc}
                      alt={p.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                      draggable={false}
                    />

                    {/* overlay */}
                    <div
                      className={`absolute inset-0 ${
                        darkMode
                          ? "bg-gradient-to-t from-black/75 via-black/10 to-black/15"
                          : "bg-gradient-to-t from-black/65 via-black/5 to-black/10"
                      }`}
                    />

                    {/* status pill */}
                    <div className="absolute top-5 left-5">
                      <span
                        className={`text-[11px] tracking-widest uppercase px-3 py-1 rounded-full backdrop-blur-xl border ${
                          darkMode
                            ? "bg-white/10 text-white/85 border-white/15"
                            : "bg-white/20 text-white/90 border-white/20"
                        }`}
                      >
                        {p.status}
                      </span>
                    </div>

                    {/* Image arrows ONLY when expanded */}
                    {isExpanded && imgs.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            stepImage(realIdx, -1, imgs.length);
                          }}
                          className={`${arrowBase} left-4 ${arrowStyle} opacity-0 group-hover:opacity-100 hover:scale-105`}
                          aria-label="Previous image"
                        >
                          <span className="text-2xl leading-none select-none">‹</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            stepImage(realIdx, +1, imgs.length);
                          }}
                          className={`${arrowBase} right-4 ${arrowStyle} opacity-0 group-hover:opacity-100 hover:scale-105`}
                          aria-label="Next image"
                        >
                          <span className="text-2xl leading-none select-none">›</span>
                        </button>

                        {/* counter */}
                        <div className="absolute bottom-5 right-5" onClick={(e) => e.stopPropagation()}>
                          <div
                            className={`text-[11px] tracking-widest uppercase px-3 py-1 rounded-full backdrop-blur-xl border ${
                              darkMode
                                ? "bg-white/10 text-white/80 border-white/15"
                                : "bg-white/15 text-white/85 border-white/20"
                            }`}
                          >
                            {imgIdx + 1} / {imgs.length}
                          </div>
                        </div>
                      </>
                    )}

                    {/* title block */}
                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                      <div className="flex items-end justify-between gap-4">
                        <div className="min-w-0">
                          <div className="text-2xl sm:text-3xl font-bold text-white truncate">{p.title}</div>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="text-xs text-white/80 tracking-wider uppercase">{p.location}</span>
                            <span className="text-white/35">•</span>
                            <span className="text-xs text-white/80 tracking-wider uppercase">{p.role}</span>
                          </div>
                        </div>

                        <div className="shrink-0">
                          <div
                            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                              darkMode ? "bg-white text-black" : "bg-white text-black"
                            } ${isExpanded ? "rotate-180 scale-110" : "group-hover:scale-110"}`}
                            aria-hidden="true"
                          >
                            <ArrowUpRight size={18} />
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 h-px w-20 bg-white/40" />
                    </div>
                  </div>

                  {/* EXPANDED DETAILS */}
                  <div className={`transition-all duration-700 ${isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}>
                    <div
                      className={`p-6 sm:p-8 border-t ${darkMode ? "border-white/10" : "border-gray-900/10"}`}
                      onClick={(e) => e.stopPropagation()}
                      onKeyDown={(e) => e.stopPropagation()}
                      role="presentation"
                    >
                      <div className="space-y-8">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className={`rounded-2xl p-5 border ${darkMode ? "border-white/10 bg-white/5" : "border-gray-900/10 bg-gray-900/5"}`}>
                            <div className={`text-[10px] tracking-[0.25em] uppercase ${darkMode ? "text-white/45" : "text-gray-900/55"}`}>Sector</div>
                            <div className="mt-2 text-sm">{p.sector}</div>
                          </div>

                          <div className={`rounded-2xl p-5 border ${darkMode ? "border-white/10 bg-white/5" : "border-gray-900/10 bg-gray-900/5"}`}>
                            <div className={`text-[10px] tracking-[0.25em] uppercase ${darkMode ? "text-white/45" : "text-gray-900/55"}`}>Status</div>
                            <div className="mt-2 text-sm">{p.status}</div>
                          </div>
                        </div>

                        <div
                          className={`rounded-2xl p-6 border ${
                            darkMode
                              ? "border-white/10 bg-gradient-to-br from-white/5 to-transparent"
                              : "border-gray-900/10 bg-gradient-to-br from-gray-900/5 to-transparent"
                          }`}
                        >
                          <div className={`text-[10px] tracking-[0.25em] uppercase ${darkMode ? "text-white/45" : "text-gray-900/55"}`}>Overview</div>
                          <p className={`mt-3 text-sm leading-relaxed ${darkMode ? "text-white/80" : "text-gray-900/80"}`}>{p.summary}</p>
                        </div>

                        <div className={`text-xs tracking-widest uppercase ${darkMode ? "text-white/45" : "text-gray-900/45"}`}>
                          Click again to collapse
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* end expanded */}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots (REAL projects only) */}
      {projects.length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active
                  ? darkMode
                    ? "w-7 bg-white/80"
                    : "w-7 bg-gray-900/80"
                  : darkMode
                  ? "w-2 bg-white/25"
                  : "w-2 bg-gray-900/25"
              }`}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}



/* =======================================================================
   MAIN: Landing page
   ======================================================================= */
export default function WWMUnique() {
  const INITIAL_PUBLISH = false;

  const [scrolled, setScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});
  const [hoveredService, setHoveredService] = useState(null);
  const [highlightAllCapabilities, setHighlightAllCapabilities] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  useSpinningNumber(8, 35, 900);
  useSpinningNumber(40, 180, 1000);
  useSpinningNumber(6, 25, 1100);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 1500);
    const loadTimer = setTimeout(() => setIsLoading(false), 2500);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(loadTimer);
    };
  }, []);

  useEffect(() => {
    if (INITIAL_PUBLISH) return;
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [INITIAL_PUBLISH]);

  useEffect(() => {
    if (INITIAL_PUBLISH) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.15 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [INITIAL_PUBLISH]);

  const handleSendMessage = () => {
    const subject = encodeURIComponent("WWM Website Inquiry");
    window.location.href = `mailto:info@wwm-design.com?subject=${subject}`;
  };

  const services = [
    { id: 1, title: "Structure", desc: "Concept-to-delivery structural design for buildings and complex infrastructure, optimised for efficiency and buildability.", color: "#FF6B6B", angle: 45, image: servicebg },
    { id: 2, title: "MEP", desc: "Integrated, innovative MEP systems designed for performance, system efficiency, and cost control.", color: "#98D8C8", angle: 30, image: servicebg },
    { id: 3, title: "Sustainability", desc: "Low-carbon strategies, operational energy reduction, and sustainability frameworks embedded into design decisions.", color: "#45B7D1", angle: 15, image: sustainabilityImg },
    { id: 4, title: "Smart Technology", desc: "Smart city and building systems strategy combining smart-enabled infrastructure, data and AI, with a strong focus on user-centric design and experience.", color: "#4ECDC4", angle: -30, image: smartTechImg },
    { id: 5, title: "Tall Building", desc: "Tall building design driven by a holistic, cross-disciplinary engineering approach, enabling highly integrated and efficient systems", color: "#C7CEEA", angle: -15, image: tallBuildingImg },
    { id: 6, title: "Masterplanning", desc: "Urban-scale planning and infrastructure frameworks that connect mobility, resilience, and public realm systems.", color: "#FFA07A", angle: -45, image: masterplanningImg },
    { id: 7, title: "Industrialized Design & Construction", desc: "DfMA / MMC strategies, modularisation, and repeatable systems to improve speed, quality, and cost certainty.", color: "#F6C453", angle: 35, image: idcImg },
    { id: 8, title: "Digital Design", desc: "Computational workflows, parametric modelling, and design automation to accelerate iteration and coordination.", color: "#FF9FF3", angle: -25, image: digitalDesignImg },
  ];

  const projects = [
    { title: "Project 1", scale: 1.2, color: "#2C3E50", image: pavilionImg, images: [pavilionImg, pavilionImg, pavilionImg, pavilionImg], location: "Location", sector: "Mixed-use smart city masterplan", role: "Structural engineering, smart city integration", status: "Ongoing", summary: "Large-scale future city development focusing on resilient infrastructure, integrated mobility, and smart public realm systems." },
    { title: "Project 2", scale: 0.9, color: "#E67E22", image: pavilionImg, images: [pavilionImg, pavilionImg, pavilionImg, pavilionImg], location: "Location", sector: "High-rise residential / mixed-use", role: "Structural and façade engineering", status: "Completed", summary: "High-rise tower overlooking Dubai Marina, designed with optimised structural systems and coordinated with complex façade geometry." },
    { title: "Project 3", scale: 1.4, color: "#16A085", image: pavilionImg, images: [pavilionImg, pavilionImg, pavilionImg, pavilionImg], location: "Location", sector: "Transport & infrastructure", role: "Structural design, concourse integration", status: "In Design", summary: "Transit hub connecting metro, public realm and retail podiums, with large-span structures and integrated passenger flows." },
    { title: "Project 4", scale: 1.1, color: "#8E44AD", image: pavilionImg, images: [pavilionImg, pavilionImg, pavilionImg, pavilionImg], location: "Location", sector: "Cultural / civic", role: "Structural design, roof geometry", status: "Concept", summary: "Cultural venue with expressive roof forms and flexible gallery spaces, integrating structure, daylight and public circulation." },
  ];

  const teamMembers = [
    { name: "Shonn Mills", role: "Managing Director", location: "Singapore", linkedin: "https://www.linkedin.com/in/shonnmills/", photo: null },
    { name: "Giovanni Vigano", role: "Design Director", location: "Singapore", linkedin: "https://www.linkedin.com/in/giovanni-viganò-81a78250/", photo: null },
    { name: "Angelo Perini", role: "Senior Associate", location: "Singapore", linkedin: "https://www.linkedin.com/in/angelo-perini-745634ab/", photo: null },
    { name: "Samuel Halim", role: "Lead Designer", location: "Singapore", linkedin: "https://www.linkedin.com/in/samuel-previano-halim-b98223167/", photo: null },
    { name: "Aish Saboo", role: "Sustainability Specialist", location: "Singapore", linkedin: "https://www.linkedin.com/in/aishwarya-saboo-a671271b4/", photo: null },
    { name: "Jaimin Korat", role: "Senior Structural Engineer", location: "Singapore", linkedin: "https://www.linkedin.com/in/jaiminkorat/", photo: null },
    { name: "Hao Yang Lim", role: "Designer", location: "Singapore", linkedin: "https://www.linkedin.com/in/limhaoyang/", photo: null },
    { name: "Jun Rong Tan", role: "Structural Engineer", location: "Singapore", linkedin: "https://www.linkedin.com/in/tjunrong96/", photo: null },
    { name: "Sylvester Tze Feng Sia", role: "Civil & Structural Engineer", location: "Singapore", linkedin: "https://www.linkedin.com/in/sylvestertfs/", photo: null },
    { name: "Clarence Rebeka", role: "Structural Engineer", location: "Singapore", linkedin: "https://www.linkedin.com/in/clarencerebeka/", photo: null },
  ];

  return (
    <div
      className={`${darkMode ? "bg-black text-white" : "bg-white text-gray-900"} font-sans transition-colors duration-500 ${
        INITIAL_PUBLISH ? "h-screen overflow-hidden" : "overflow-hidden"
      }`}
    >
      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse-glow { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
        .float-animation { animation: float 6s ease-in-out infinite; }
        .rotate-slow { animation: rotate 20s linear infinite; }
        .pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Unique Loading Screen */}
      {isLoading && (
        <div
          className={`fixed inset-0 z-[9999] ${darkMode ? "bg-black" : "bg-white"} flex items-center justify-center transition-opacity duration-1000 ${
            fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <div className="relative z-10 text-center px-6">
            <HeroLogo darkMode={darkMode} />
            <div className="mt-16 opacity-0 pointer-events-none select-none">
              <SlotMachineText
                text="DESIGN DIFFERENT"
                className={`text-2xl sm:text-3xl md:text-4xl font-semibold ${
                  darkMode ? "text-white/90" : "text-gray-900/90"
                }`}
              />
            </div>
          </div>

          <div className={`absolute -inset-4 ${darkMode ? "bg-white/10" : "bg-black/10"} blur-3xl -z-10 pulse-glow`} />
        </div>
      )}

      {/* Top-right actions: JOIN US + Dark/Light Toggle */}
      <div className="fixed top-8 right-8 z-50 flex items-center gap-3">
        <a
          href="/join-us"
          className={`px-5 py-3 rounded-full text-xs tracking-widest border backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] ${
            darkMode
              ? "bg-white/10 hover:bg-white/20 border-white/20 text-white/85 hover:text-white"
              : "bg-gray-900/10 hover:bg-gray-900/20 border-gray-900/20 text-gray-900/85 hover:text-gray-900"
          }`}
        >
          JOIN US
        </a>

        <button
          onClick={() => setDarkMode((v) => !v)}
          className={`w-12 h-12 rounded-full ${
            darkMode ? "bg-white/10 hover:bg-white/20" : "bg-gray-900/10 hover:bg-gray-900/20"
          } backdrop-blur-xl border ${
            darkMode ? "border-white/20" : "border-gray-900/20"
          } flex items-center justify-center transition-all duration-300 hover:scale-110`}
          aria-label="Toggle dark mode"
          type="button"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Minimal Floating Navigation */}
      {!INITIAL_PUBLISH && (
        <nav className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ${scrolled ? "scale-90" : "scale-100"}`}>
          <div className="flex flex-col items-center gap-3">
            {scrolled && (
              <a href="#hero" className="transition-opacity duration-300 opacity-90 hover:opacity-60" aria-label="Back to top">
                <img src={darkMode ? WWMSHORTENEDWHITE : WWMSHORTENEDBLACK} alt="WWM" className="h-6 w-auto" />
              </a>
            )}

            <div className={`flex items-center gap-1 ${darkMode ? "bg-white/5 border-white/10" : "bg-gray-900/5 border-gray-900/10"} backdrop-blur-xl border rounded-full px-6 py-3`}>
              <a href="#services" className={`px-4 py-2 text-xs tracking-wider ${darkMode ? "hover:text-white/60" : "hover:text-gray-900/60"} transition-colors`}>CAPABILITIES</a>
              <div className={`w-px h-4 ${darkMode ? "bg-white/20" : "bg-gray-900/20"}`} />
              <a href="#projects" className={`px-4 py-2 text-xs tracking-wider ${darkMode ? "hover:text-white/60" : "hover:text-gray-900/60"} transition-colors`}>PROJECTS</a>
              <div className={`w-px h-4 ${darkMode ? "bg-white/20" : "bg-gray-900/20"}`} />
              <a href="#team" className={`px-4 py-2 text-xs tracking-wider ${darkMode ? "hover:text-white/60" : "hover:text-gray-900/60"} transition-colors`}>TEAM</a>
              <div className={`w-px h-4 ${darkMode ? "bg-white/20" : "bg-gray-900/20"}`} />
              <a href="#contact" className={`px-4 py-2 text-xs tracking-wider ${darkMode ? "hover:text-white/60" : "hover:text-gray-900/60"} transition-colors`}>CONTACT</a>
            </div>
          </div>
        </nav>
      )}

      {/* Hero */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-[10%] w-64 h-64 rounded-full blur-3xl float-animation" />
          <div className="absolute bottom-20 right-[15%] w-96 h-96 rounded-full blur-3xl float-animation" style={{ animationDelay: "2s" }} />
        </div>

        <div className="relative z-10 text-center px-6">
          <HeroLogo darkMode={darkMode} />
          <div className="mt-16 flex justify-center">
            <SlotMachineText
              text="DESIGN DIFFERENT"
              className={`text-lg sm:text-xl md:text-2xl font-semibold ${darkMode ? "text-white/90" : "text-gray-900/90"}`}
            />
          </div>
        </div>

        {!INITIAL_PUBLISH && (
          <div className="absolute bottom-12 inset-x-0 flex flex-col items-center gap-2 animate-bounce">
            <div className={`text-xs tracking-widest ${darkMode ? "text-white/50" : "text-gray-900/50"}`}>SCROLL</div>
            <div className={`w-px h-12 bg-gradient-to-b ${darkMode ? "from-white/50" : "from-gray-900/50"} to-transparent`} />
          </div>
        )}
      </section>

      {!INITIAL_PUBLISH && (
        <>
          {/* About */}
          <section id="about" className="py-32 px-6 lg:px-12">
            <div className="max-w-6xl mx-auto w-full">
              <div className={`transition-all duration-1000 ${visibleSections.about ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                <div className="mb-14">
                  <div className={`w-16 h-0.5 mb-6 ${darkMode ? "bg-white" : "bg-gray-900"}`} />
                  <h2 className="text-5xl lg:text-7xl font-bold tracking-tight">About Us</h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                  <div>
                    <p className="text-2xl lg:text-3xl font-light leading-relaxed">
                      <span className="font-semibold">WWM</span> is an independent international engineering consultancy that designs buildings and urban spaces through deep collaboration.
                    </p>

                    <div className={`mt-10 h-px ${darkMode ? "bg-white/10" : "bg-gray-900/10"}`} />

                    <p className={`mt-6 text-sm tracking-[0.25em] uppercase ${darkMode ? "text-white/50" : "text-gray-900/50"}`}>
                      Design different
                    </p>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h3 className={`text-sm uppercase tracking-wider mb-3 ${darkMode ? "text-white/50" : "text-gray-900/50"}`}>Our Approach</h3>
                      <p className={`text-lg leading-relaxed ${darkMode ? "text-white/80" : "text-gray-900/80"}`}>
                        We combine low-carbon technologies, computational tools, and systems thinking to deliver integrated, cost-effective solutions.
                      </p>
                    </div>

                    <div>
                      <h3 className={`text-sm uppercase tracking-wider mb-3 ${darkMode ? "text-white/50" : "text-gray-900/50"}`}>Cross-Disciplinary</h3>
                      <p className={`text-lg leading-relaxed ${darkMode ? "text-white/80" : "text-gray-900/80"}`}>
                        Our cross-disciplinary approach provides integrated design that spans across disciplines with holistic solutions.
                      </p>
                    </div>

                    <div>
                      <h3 className={`text-sm uppercase tracking-wider mb-3 ${darkMode ? "text-white/50" : "text-gray-900/50"}`}>Global Teams</h3>
                      <p className={`text-lg leading-relaxed ${darkMode ? "text-white/80" : "text-gray-900/80"}`}>
                        Our project teams are sourced from the best talents globally, making us fast, agile, and adaptive. We design, co-create, enable, and disrupt—driven by a common goal: to make things better.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Services */}
          <section id="services" className="py-32 px-6 lg:px-12 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <div className={`inline-block text-xs tracking-[0.3em] ${darkMode ? "text-white/50" : "text-gray-900/50"} mb-6`}>01 —</div>
                <h2 className="text-5xl lg:text-6xl font-bold">Capabilities</h2>

                <div className="mt-8 max-w-3xl mx-auto">
                  <div
                    onMouseEnter={() => setHighlightAllCapabilities(true)}
                    onMouseLeave={() => setHighlightAllCapabilities(false)}
                    className={`inline-block cursor-pointer transition-colors ${darkMode ? "text-white" : "text-gray-900"}`}
                  >
                    <div className="text-base sm:text-lg font-semibold tracking-wide">Cross Disciplinary Design</div>
                    <p className={`mt-3 text-sm sm:text-base leading-relaxed transition-colors ${darkMode ? "text-white/65" : "text-gray-900/65"}`}>
                      Integrated design solutions spanning disciplines, redefining engineering.
                    </p>
                    <div
                      className={`mt-4 h-px w-20 mx-auto transition-all duration-300 ${
                        highlightAllCapabilities ? "opacity-100 scale-100" : "opacity-40 scale-90"
                      } ${darkMode ? "bg-white/40" : "bg-gray-900/30"}`}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
                {services.map((service, index) => (
                  <div
                    key={service.id}
                    onMouseEnter={() => setHoveredService(service.id)}
                    onMouseLeave={() => setHoveredService(null)}
                    className={`group relative aspect-[50/49] rounded-2xl border ${
                      darkMode ? "border-white/10" : "border-gray-900/10"
                    } overflow-hidden cursor-pointer transition-all duration-700 ${
                      highlightAllCapabilities ? "hover:scale-[1.03]" : "hover:scale-[1.02]"
                    } ${visibleSections.services ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
                    style={{
                      transitionDelay: `${index * 100}ms`,
                      background: `linear-gradient(${service.angle}deg, ${service.color}25, transparent)`,
                    }}
                  >
                    <img
                      src={service.image || servicebg}
                      alt={service.title}
                      className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ${
                        highlightAllCapabilities ? "opacity-70 scale-[1.01]" : "opacity-85"
                      } group-hover:opacity-70 group-hover:scale-[1.03]`}
                      draggable={false}
                    />

                    <div
                      className={`absolute inset-0 transition-opacity duration-700 ${
                        darkMode
                          ? "bg-gradient-to-br from-black/40 via-black/10 to-black/25"
                          : "bg-gradient-to-br from-white/25 via-white/10 to-white/20"
                      } ${highlightAllCapabilities ? "opacity-70" : "opacity-100"}`}
                    />

                    <div className={`absolute inset-0 transition-opacity duration-700 ${darkMode ? "bg-black/55" : "bg-black/35"} ${
                      highlightAllCapabilities ? "opacity-100" : "opacity-0"
                    } group-hover:opacity-100`} />

                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-8 transition-all duration-500 group-hover:opacity-0 group-hover:scale-[0.98]">
                      <div className={`text-6xl font-bold ${darkMode ? "text-white/90" : "text-gray-900/90"} drop-shadow`}>
                        {String(service.id).padStart(2, "0")}
                      </div>
                      <div className={`mt-3 text-lg font-semibold tracking-wide ${darkMode ? "text-white" : "text-gray-900"} drop-shadow`}>
                        {service.title}
                      </div>
                    </div>

                    <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 lg:p-7 transition-all duration-700 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                      <div className="flex items-end justify-between gap-4">
                        <div className="min-w-0">
                          <div className={`text-5xl lg:text-6xl font-bold ${darkMode ? "text-white/90" : "text-white/95"} drop-shadow`}>
                            {String(service.id).padStart(2, "0")}
                          </div>
                          <div className="mt-2 text-lg lg:text-xl font-semibold tracking-wide text-white drop-shadow">{service.title}</div>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-white/70 shrink-0" />
                      </div>

                      <p className={`mt-4 text-sm leading-relaxed ${darkMode ? "text-white/85" : "text-white/90"}`}>{service.desc}</p>
                    </div>

                    <div className="absolute top-4 right-4 z-10 w-2 h-2 rounded-full bg-white/40 group-hover:bg-white transition-colors duration-500" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Projects */}
          <section id="projects" className="py-32 px-0 sm:px-0 lg:px-0 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10 px-6 lg:px-12">
              <div className="text-center mb-16">
                <div className={`inline-block text-xs tracking-[0.3em] ${darkMode ? "text-white/50" : "text-gray-900/50"} mb-6`}>02 —</div>
                <h2 className="text-5xl lg:text-6xl font-bold">Featured Projects</h2>
                <p className={`mt-5 text-lg ${darkMode ? "text-white/50" : "text-gray-900/50"} max-w-2xl mx-auto`}>
                  Transforming visions into reality
                </p>
              </div>
            </div>

            <div className="max-w-7xl mx-auto">
              <HorizontalProjects projects={projects} darkMode={darkMode} />
            </div>

            <div className="mt-16 flex justify-center px-6 lg:px-12">
              <Link
                to="/projects"
                aria-label="View all projects"
                className={`group inline-flex items-center gap-3 px-10 py-4 rounded-full border backdrop-blur-xl text-xs tracking-widest transition-all duration-300 hover:scale-[1.03] ${
                  darkMode
                    ? "border-white/30 text-white/75 hover:text-white hover:border-white bg-white/5 hover:bg-white/10"
                    : "border-gray-900/30 text-gray-900/75 hover:text-gray-900 hover:border-gray-900 bg-gray-900/5 hover:bg-gray-900/10"
                }`}
              >
                VIEW ALL PROJECTS
                <LayoutGrid size={16} className="opacity-70 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </section>

          {/* Team */}
          <section id="team" className="py-32 px-6 lg:px-12">
            <div className="max-w-7xl mx-auto w-full">
              <div className="text-center mb-20">
                <div className={`inline-block text-xs tracking-[0.3em] ${darkMode ? "text-white/50" : "text-gray-900/50"} mb-6`}>03 —</div>
                <h2 className="text-5xl lg:text-6xl font-bold mb-4">Our Team</h2>
                <p className={`text-lg ${darkMode ? "text-white/50" : "text-gray-900/50"} max-w-2xl mx-auto`}>
                  Meet the people behind the work
                </p>

                <div className="mt-10 flex justify-center">
                  <a
                    href="/join-us"
                    className={`group inline-flex items-center gap-3 px-8 py-4 border rounded-full text-xs tracking-widest transition-all duration-300 ${
                      darkMode
                        ? "border-white/30 text-white/80 hover:text-white hover:border-white"
                        : "border-gray-900/30 text-gray-900/80 hover:text-gray-900 hover:border-gray-900"
                    }`}
                  >
                    JOIN US
                    <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                </div>
              </div>

              <div className={`transition-all duration-1000 ${visibleSections.team ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                  {teamMembers.map((m, i) => {
                    const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      m.name
                    )}&size=512&background=111111&color=ffffff&bold=true&format=png`;

                    return (
                      <div
                        key={i}
                        className={`group relative rounded-2xl border overflow-hidden ${
                          darkMode ? "border-white/10 bg-white/5" : "border-gray-900/10 bg-gray-900/5"
                        } transition-all duration-500 hover:scale-[1.02]`}
                      >
                        <div className="relative aspect-[4/5] w-full">
                          <img src={m.photo || avatarFallback} alt={m.name} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                          <div className={`absolute inset-0 ${darkMode ? "bg-black/15" : "bg-white/10"}`} />
                        </div>

                        <div
                          className={`absolute inset-0 p-6 flex flex-col justify-end transition-all duration-500 ${
                            darkMode ? "bg-black/75" : "bg-white/85"
                          } opacity-0 group-hover:opacity-100`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                              <div className="text-lg font-semibold leading-tight truncate">{m.name}</div>
                              <div className={`text-sm mt-1 ${darkMode ? "text-white/70" : "text-gray-900/70"}`}>{m.role}</div>
                            </div>

                            <div className={`text-xs px-3 py-1 rounded-full whitespace-nowrap ${darkMode ? "bg-white/10 text-white/80" : "bg-gray-900/10 text-gray-900/80"}`}>
                              {m.location}
                            </div>
                          </div>

                          <div className={`mt-4 h-px ${darkMode ? "bg-white/10" : "bg-gray-900/10"}`} />

                          <a
                            href={m.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`mt-4 inline-block text-xs tracking-widest ${darkMode ? "text-white/70 hover:text-white" : "text-gray-900/70 hover:text-gray-900"} transition-colors`}
                          >
                            LinkedIn
                          </a>
                        </div>

                        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/40 group-hover:bg-white transition-colors duration-500" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Contact / Studios */}
          <section id="contact" className="py-32 px-6 lg:px-12">
            <div className="max-w-7xl mx-auto w-full">
              <div className="flex flex-col items-center text-center mb-4">
                <div className={`inline-block text-xs tracking-[0.3em] ${darkMode ? "text-white/50" : "text-gray-900/50"} mb-4`}>04 —</div>
                <h2 className="text-5xl lg:text-6xl font-bold">Our Studios</h2>
              </div>

              <div className="w-full mb-6">
                <StudiosMap darkMode={darkMode} />
              </div>

              <div className="grid lg:grid-cols-2 gap-20">
                <div className={`transition-all duration-1000 ${visibleSections.contact ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}>
                  <h2 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
                    Let&apos;s build
                    <br />
                    something
                    <br />
                    <span className={`${darkMode ? "text-white/40" : "text-gray-900/40"} italic`}>different</span>
                  </h2>

                  <div className="mt-4 flex items-center gap-6">
                    <a
                      href="/join-us"
                      className={`group inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase transition-colors ${
                        darkMode ? "text-white/55 hover:text-white" : "text-gray-900/55 hover:text-gray-900"
                      }`}
                    >
                      <Users size={18} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                      <span>Join Us</span>
                      <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>

                    <a
                      href="https://www.linkedin.com/company/wwm-design/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase transition-colors ${
                        darkMode ? "text-white/55 hover:text-white" : "text-gray-900/55 hover:text-gray-900"
                      }`}
                    >
                      <Linkedin size={18} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                      <span>Follow</span>
                      <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </div>
                </div>

                <div className={`transition-all duration-1000 delay-300 ${visibleSections.contact ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}>
                  <div className="space-y-8">
                    <div>
                      <input
                        type="text"
                        placeholder="Name"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className={`w-full bg-transparent border-b ${
                          darkMode
                            ? "border-white/20 focus:border-white placeholder:text-white/30"
                            : "border-gray-900/20 focus:border-gray-900 placeholder:text-gray-900/30"
                        } py-4 text-lg outline-none transition-colors`}
                      />
                    </div>

                    <div>
                      <input
                        type="email"
                        placeholder="Email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className={`w-full bg-transparent border-b ${
                          darkMode
                            ? "border-white/20 focus:border-white placeholder:text-white/30"
                            : "border-gray-900/20 focus:border-gray-900 placeholder:text-gray-900/30"
                        } py-4 text-lg outline-none transition-colors`}
                      />
                    </div>

                    <div>
                      <textarea
                        rows={4}
                        placeholder="Tell us about your inquiry"
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        className={`w-full bg-transparent border-b ${
                          darkMode
                            ? "border-white/20 focus:border-white placeholder:text-white/30"
                            : "border-gray-900/20 focus:border-gray-900 placeholder:text-gray-900/30"
                        } py-4 text-lg outline-none transition-colors resize-none`}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleSendMessage}
                      className={`group relative px-8 py-4 border ${
                        darkMode ? "border-white/30 hover:border-white" : "border-gray-900/30 hover:border-gray-900"
                      } transition-all duration-500 overflow-hidden`}
                    >
                      <span className="relative z-10 flex items-center gap-3 text-sm tracking-widest">
                        SEND MESSAGE
                        <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </span>
                      <div className={`absolute inset-0 ${darkMode ? "bg-white" : "bg-gray-900"} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className={`border-t ${darkMode ? "border-white/10" : "border-gray-900/10"} py-12 px-6 lg:px-12`}>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
              <img src={darkMode ? wwmLogo : wwmLogoDark} alt="WWM Logo" className="h-8 w-auto opacity-90" />
              <div className={`text-sm ${darkMode ? "text-white/50" : "text-gray-900/50"} absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0`}>
                © 2025 WWM PTE.LTD. — Design Different
              </div>

              <div className="flex gap-8 text-sm">
                <a
                  href="https://www.linkedin.com/company/wwm-design/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${darkMode ? "hover:text-white/60" : "hover:text-gray-900/60"} transition-colors`}
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
