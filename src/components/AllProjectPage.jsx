import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Sun, Moon, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import WWMSHORTENEDBLACK from "../assets/WWMSHORTENEDBLACK.png";
import WWMSHORTENEDWHITE from "../assets/WWMSHORTENEDWHITE.png";
import pavilionImg from "../assets/PAVILLION.jpg";

import A2A from "../assets/A2A.png";
import A2A2 from "../assets/A2A_2.jpg";
import A2A3 from "../assets/A2A_3.jpg";
import A2A4 from "../assets/A2A_4.jpg";
import A2A5 from "../assets/A2A_5.jpg";

import PDD1 from "../assets/PDD_1.jpg";
import PDD2 from "../assets/PDD_2.jpg";
import PDD3 from "../assets/PDD_3.jpg";

import CL1 from "../assets/CL_1.jpg";
import CL2 from "../assets/CL_2.jpg";
import CL3 from "../assets/CL_3.jpg";
import CL4 from "../assets/CL_4.jpg";
import CL5 from "../assets/CL_5.jpg";

import RP1 from "../assets/RP_1.png";
import RP2 from "../assets/RP_2.jpeg";

import NL1 from "../assets/NL1.jpg";
import NL2 from "../assets/NL2.jpg";
import NL3 from "../assets/NL2.jpg";
import NL4 from "../assets/NL_4.jpg";

/**
 * OPTION C: “Morphing card” (FLIP-like) animation
 * - grid never reflows (expanded view is fixed-position)
 * - clicked card visually expands into the detail panel
 * - close animates back into the original card
 */
export default function AllProjectsPage({ darkMode, setDarkMode }) {
  const location = useLocation();

  const allProjects = useMemo(
    () => [
      {
        id: "project-1",
        title: "Torre Faro – A2A Headquarters",
        images: [
          { src: A2A, credit: null },
          { src: A2A2, credit: null },
          { src: A2A3, credit: "Image © ACPV Architects" },
          { src: A2A4, credit: "Image © Focchi" },
          { src: A2A5, credit: "Image © Focchi" },
        ],
        location: "Milan, Italy",
        sector: "Mixed-use high-rise headquarters",
        role: "Structural engineering, early design collaboration",
        status: "Completed",
        overview:
          "Torre Faro is a 145-metre-tall headquarters tower for A2A located in Milan’s strategic Southern Area, forming a key urban link between the historic city centre and the emerging Symbiosis business district. Positioned directly opposite the future Olympic Village for the Milano–Cortina 2026 Winter Games, the project plays a significant role in Milan’s wider urban regeneration and sports infrastructure transformation. The development comprises the new tower, a three-storey fully glazed annex, and the renovation of existing A2A buildings. The tower’s circular plan and eccentric truncated-cone form generate highly complex structural and façade conditions, with bespoke glazed modules and varying structural slabs at every level. Key architectural spaces—including the ground floor, an intermediate sky garden, and the 27th-floor belvedere—feature double-height volumes supported by inclined belt trusses.",
        details: {
          client: "A2A S.p.A.",
          collaborators: "Antonio C & Patricia V Architects",
        },
      },
      {
        id: "project-2",
        title: "Punggol Digital District",
        images: [
          { src: PDD1, credit: "Image © Rachel Loh - monocle.com" },
          { src: PDD2, credit: "Image © JTC Corporation" },
          { src: PDD3, credit: "Image © FINNBAR FALLON - WOHA" },
        ],
        location: "Singapore",
        sector: "Urban Development, Smart City Mixed-Use District",
        role: "Civil Engineering, Structural Engineering, SMART Engineering, Sustainability",
        status: "Completed",
        overview:
          "The 50-hectare Punggol Digital District (PDD) in Singapore, developed by JTC Corporation and designed by WOHA Architects, is a cornerstone of the North Coast Innovation Corridor and a key driver of Singapore’s Smart Nation initiative. The district integrates a business park, the new Singapore Institute of Technology (SIT) campus, and an underground MRT station, creating a highly connected ecosystem that encourages collaboration between academia and industry. PDD was awarded the Green Mark Platinum for Districts (2024). While at Ramboll, Shonn Mills led the Smart City and smart technology design and implementation, including the development of the Open Digital Platform (ODP) concept. Sustainability underpins the district’s design; at Web Structures, Giovanni Viganò championed modern methods of construction to reduce embodied carbon and improve construction efficiency. He also contributed to Tower 86, a timber–concrete hybrid building within PDD, which recently received a CTBUH award. Life-centric features such as nature-based solutions, waterfront green linkages, and a campus boulevard with seamless access to amenities further enhance the district’s liveability. PDD has also been recognised with BCA Green Mark Platinum for Super Low Energy (2021).",
        details: { client: "JTC Corporation", collaborators: "WOHA Architect" },
      },
      {
        id: "project-3",
        title: "City Life",
        images: [
          { src: CL1, credit: null },
          { src: CL2, credit: "Image © Sonae Sierra" },
          { src: CL3, credit: "Image © ArchDaily" },
          { src: CL4, credit: "Image © Wikipedia" },
          { src: CL5, credit: "Image © StudioLibeskind" },
        ],
        location: "Milan, Italy",
        sector: "Large-scale mixed-use urban redevelopment and public realm",
        role: "Multi Discipline Engineering, Concept",
        status: "Completed",
        overview:
          "Whitby Wood Director Shonn Mills, while at Ramboll and in partnership with J&A Consultants (Milan), was appointed to provide project management, value engineering, and multi-disciplinary technical review services for the next design phases of CityLife Milan. The 37-hectare redevelopment comprises three landmark towers: Il Dritto by Arata Isozaki, Lo Storto by Zaha Hadid, and Il Curvo by Daniel Libeskind, collectively redefining the skyline of the historic Fiera Milano district as part of Europe’s largest urban renewal project. The scheme integrates commercial and office spaces with extensive public and private green areas, supported by a district heating network that delivers efficient winter heating and summer cooling, setting a benchmark for sustainable urban development.",
        details: {
          client: "Generali Real Estate",
          collaborators: "Zaha Hadid, Daniel Leipskin, Arata Isozaki",
        },
      },
      {
        id: "project-4",
        title: "Rajawali Place",
        images: [
          { src: RP1, credit: null },
          { src: RP2, credit: "Image © Colliers" },
        ],
        location: "Jakarta, Indonesia",
        sector: "Commercial mixed-use development",
        role: "Project Director",
        status: "Completed",
        overview:
          "Rajawali Place is a 31-storey commercial office building in Setiabudi, Jakarta, featuring six basement parking levels and part of a mixed-use development with the St. Regis Hotel and Residences. WWM Director Shonn Mills, while at Ramboll acted as Project Director for Rajawali Place Office Tower. The tower is a prestigious 31-storey commercial office building with 6 basement carpark space which form part of a mixed used superblock development comprising of the luxurious St Regis Hotel, St Regis Residence and is conveniently located in the heart of Jakarta Golden Triangle. Much attention has been paid to the quality and architectural detail of the finishes, from the impressive façade of blue-grey glass to the polished Italian marble floors and walls to its exquisite landscaping designed by the renowned designer Bill Bensley. The facade is designed to minimize solar gain and emphasize vertical layers giving the impression of a woven surface. The construction is headed by the architect firm Gensler. Rajawali Place has been awarded the BCA Green Mark Platinum, recognizing its commitment to environmentally sustainable construction design and operations.",
        details: { client: "Rajawali Corpora", collaborators: "Gensler, PDW Architects" },
      },
      {
        id: "project-5",
        title: "Nimit Langsuan",
        images: [
          { src: NL1, credit: null },
          { src: NL2, credit: null },
          { src: NL4, credit: "Image © Keller Henson" },
        ],
        location: "Bangkok, Thailand",
        sector: "Project Director",
        role: "Project Director",
        status: "Completed",
        overview:
          "Nimit Langsuan Residences project, located in Bangkok, Thailand, is a 210-meter-tall high end residence. WWM Director Shonn Mills, while at Ramboll, served as Project Director for Nimit Langsuan, a 210-meter tall high-rise residential development that sets a benchmark for luxury living in the central business district of Bangkok. The 55-storey tower featured a state-of-the-art three-dimensional glass façade, offering clear, unobstructed corner views of the city.",
        details: { client: "Rajawali Corpora", collaborators: "Gensler, PDW Architects" },
      },
      {
        id: "project-coming-soon",
        title: "More Projects Coming Soon",
        scale: 1.0,
        color: "#444444",
        location: "—",
        sector: "—",
        role: "—",

        summary:
          "We’re currently curating and publishing additional work. Check back soon for new case studies and project updates.",
        isPlaceholder: true,
      },
    ],
    []
  );

  const [selectedId, setSelectedId] = useState(null);
  const [highlightId, setHighlightId] = useState(null);

  // grid refs (scroll + FLIP measurement)
  const cardRefs = useRef({});
  const cardButtonRefs = useRef({});

  const selectedProject = useMemo(
    () => allProjects.find((p) => p.id === selectedId) || null,
    [allProjects, selectedId]
  );

  // --------- Morph state ----------
  const [morph, setMorph] = useState(null);
  // morph: { id, fromRect, toRect, expanded: boolean, closing: boolean }
  const transitionMs = 520;

  const calcToRect = () => {
    const pad = window.innerWidth < 640 ? 16 : 32;
    const maxW = 1152; // ~max-w-6xl
    const w = Math.min(window.innerWidth - pad * 2, maxW);
    const h = Math.min(window.innerHeight - pad * 2, window.innerHeight - 80);
    const left = Math.round((window.innerWidth - w) / 2);
    const top = Math.round((window.innerHeight - h) / 2);
    return { top, left, width: Math.round(w), height: Math.round(h) };
  };

  const openProject = (id) => {
    const btn = cardButtonRefs.current[id];
    if (!btn) {
      setSelectedId(id);
      return;
    }

    const r = btn.getBoundingClientRect();
    const fromRect = {
      top: Math.round(r.top),
      left: Math.round(r.left),
      width: Math.round(r.width),
      height: Math.round(r.height),
    };

    const toRect = calcToRect();

    setSelectedId(id);
    setMorph({
      id,
      fromRect,
      toRect,
      expanded: false,
      closing: false,
    });

    // next frame -> animate to "toRect"
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setMorph((m) => (m ? { ...m, expanded: true } : m));
      });
    });
  };

  const closeProject = () => {
    setMorph((m) => (m ? { ...m, closing: true, expanded: false } : m));
  };

  // keep toRect updated on resize while open
  useEffect(() => {
    if (!morph) return;
    const onResize = () => {
      setMorph((m) => (m ? { ...m, toRect: calcToRect() } : m));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [morph]);

  // close with ESC
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        if (morph) closeProject();
        else setSelectedId(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [morph]);

  // lock body scroll while morph open
  useEffect(() => {
    if (!morph) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [morph]);

  // when closing animation finishes, clear selectedId + morph
  const onMorphTransitionEnd = (e) => {
    // only react to the container transitions (width/height is enough)
    if (e.propertyName !== "width" && e.propertyName !== "height") return;

    setMorph((m) => {
      if (!m) return null;
      if (m.closing) {
        setSelectedId(null);
        return null;
      }
      return m;
    });
  };

  // open from URL (?project=project-1 or title)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const target = params.get("project");
    if (!target) return;

    const found =
      allProjects.find((p) => p.id === target) ||
      allProjects.find((p) => p.title === target);

    if (found) {
      setHighlightId(found.id);

      requestAnimationFrame(() => {
        const el = cardRefs.current[found.id];
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      });

      // open after scroll settles a bit
      setTimeout(() => openProject(found.id), 180);

      const t = setTimeout(() => setHighlightId(null), 2200);
      return () => clearTimeout(t);
    }
  }, [location.search, allProjects]);

  // compute current morph style
  const morphStyle = useMemo(() => {
    if (!morph) return null;
    const rect = morph.expanded ? morph.toRect : morph.fromRect;
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    };
  }, [morph]);

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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-auto">
            {allProjects.map((p) => (
              <div
                key={p.id}
                ref={(el) => {
                  if (el) cardRefs.current[p.id] = el;
                }}
                className="relative"
              >
                <button
                  ref={(el) => {
                    if (el) cardButtonRefs.current[p.id] = el;
                  }}
                  type="button"
                  onClick={() => openProject(p.id)}
                  className={`w-full text-left group rounded-3xl border overflow-hidden transition-all duration-500 focus:outline-none ${
                    darkMode
                      ? "border-white/10 bg-white/[0.03]"
                      : "border-gray-900/10 bg-gray-900/[0.03]"
                  } ${
                    highlightId === p.id
                      ? darkMode
                        ? "ring-2 ring-white/60 scale-[1.02]"
                        : "ring-2 ring-gray-900/60 scale-[1.02]"
                      : ""
                  } hover:scale-[1.01]`}
                >
                  {/* Image */}
                  <div className="relative aspect-[16/11] w-full">
                    <img
                      src={p.images?.[0]?.src || pavilionImg}
                      alt={p.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                    <div
                      className={`absolute inset-0 ${
                        darkMode
                          ? "bg-gradient-to-t from-black/70 via-black/15 to-black/10"
                          : "bg-gradient-to-t from-black/45 via-black/5 to-transparent"
                      }`}
                    />
                  </div>

                  {/* Minimal text */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-xl sm:text-2xl font-semibold leading-snug truncate">
                          {p.title}
                        </div>
                        <div
                          className={`mt-2 text-xs tracking-[0.22em] uppercase ${
                            darkMode ? "text-white/60" : "text-gray-900/55"
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
                      className={`mt-5 text-[10px] tracking-[0.25em] uppercase ${
                        darkMode ? "text-white/45" : "text-gray-900/55"
                      }`}
                    >
                      Role / Discipline
                    </div>
                    <div
                      className={`mt-1 text-sm leading-relaxed ${
                        darkMode ? "text-white/80" : "text-gray-900/80"
                      }`}
                    >
                      {p.role}
                    </div>
                  </div>
                </button>
              </div>
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

      {/* ✅ MORPH LAYER */}
      {morph && selectedProject && morphStyle && (
        <div className="fixed inset-0 z-[999]">
          {/* Backdrop (click to close) */}
          <button
            type="button"
            onClick={closeProject}
            aria-label="Close overlay"
            className={`absolute inset-0 w-full h-full cursor-default transition-opacity duration-300 ${
              morph.expanded ? "opacity-100" : "opacity-0"
            } ${darkMode ? "bg-black/60" : "bg-black/35"} backdrop-blur-sm`}
          />

          {/* Morphing container */}
          <div
            onTransitionEnd={onMorphTransitionEnd}
            className={`fixed overflow-hidden rounded-3xl border shadow-2xl will-change-[top,left,width,height] ${
              darkMode
                ? "border-white/10 bg-black"
                : "border-gray-900/10 bg-white"
            }`}
            style={{
              top: morphStyle.top,
              left: morphStyle.left,
              width: morphStyle.width,
              height: morphStyle.height,
              transitionProperty: "top,left,width,height",
              transitionDuration: `${transitionMs}ms`,
              transitionTimingFunction: "cubic-bezier(0.2, 0.9, 0.2, 1)",
            }}
          >
            {/* content fade in after expansion starts */}
            <div
              className={`w-full h-full transition-opacity duration-300 ${
                morph.expanded ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: morph.expanded ? "120ms" : "0ms" }}
            >
              <InlineExpandedProject
                darkMode={darkMode}
                project={selectedProject}
                onClose={closeProject}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InlineExpandedProject({ darkMode, project, onClose }) {
  const images =
    project.images?.length
      ? project.images
      : [{ src: pavilionImg, credit: null }];

  const [idx, setIdx] = useState(0);

  useEffect(() => setIdx(0), [project?.id]);

  const next = () => setIdx((v) => (v + 1) % images.length);
  const prev = () => setIdx((v) => (v - 1 + images.length) % images.length);

  return (
    <div className="relative h-full">
      {/* Top bar */}
      <div
        className={`flex items-center justify-between px-6 sm:px-7 py-5 border-b ${
          darkMode ? "border-white/10" : "border-gray-900/10"
        }`}
      >
        <div className="min-w-0">
          <div
            className={`text-xs tracking-[0.28em] uppercase ${
              darkMode ? "text-white/55" : "text-gray-900/55"
            }`}
          />
          <div className="mt-1 text-2xl sm:text-3xl font-semibold truncate">
            {project.title}
          </div>
          <div
            className={`mt-2 text-xs tracking-[0.22em] uppercase ${
              darkMode ? "text-white/60" : "text-gray-900/55"
            }`}
          >
            {project.location}
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
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

      {/* Make inner scroll (so morph container can be viewport-limited) */}
      <div className="h-[calc(100%-84px)] overflow-auto">
        {/* IMAGE LEFT + OVERVIEW BELOW IMAGE, DETAILS RIGHT */}
        <div className="grid lg:grid-cols-[2.2fr_1fr] gap-0">
          {/* LEFT: IMAGE + OVERVIEW */}
          <div className="relative">
            {/* IMAGE / CAROUSEL */}
            <div className="p-4 sm:p-5">
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden">
                <img
                  src={images[idx].src}
                  alt={`${project.title} image ${idx + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* PHOTO CREDIT */}
                {images[idx].credit && (
                  <div className="absolute bottom-3 right-4 text-[10px] tracking-wide uppercase px-2 py-1 rounded-md bg-black/50 text-white/70 backdrop-blur">
                    {images[idx].credit}
                  </div>
                )}

                <div
                  className={`absolute inset-0 ${
                    darkMode ? "bg-black/20" : "bg-white/10"
                  }`}
                />
              </div>
            </div>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  className={`absolute left-6 top-[180px] sm:top-[200px] w-11 h-11 rounded-full border flex items-center justify-center ${
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
                  className={`absolute right-6 top-[180px] sm:top-[200px] w-11 h-11 rounded-full border flex items-center justify-center ${
                    darkMode
                      ? "border-white/15 bg-black/40 hover:bg-black/55"
                      : "border-gray-900/15 bg-white/50 hover:bg-white/70"
                  }`}
                  aria-label="Next image"
                >
                  <ChevronRight size={18} />
                </button>

                <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
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

            {/* OVERVIEW BELOW IMAGE */}
            <div className="px-4 sm:px-5 pb-6 sm:pb-7">
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
                {project.overview || project.summary}
              </p>
            </div>
          </div>

          {/* RIGHT: PROJECT DETAILS */}
          <div className="p-6 sm:p-7">
            <div className="lg:sticky lg:top-6">
              <div
                className={`rounded-2xl border p-5 ${
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
                  <Row
                    darkMode={darkMode}
                    label="Status"
                    value={project.status}
                    pill
                  />
                  <Row darkMode={darkMode} label="Sector" value={project.sector || "—"} />
                  <Row darkMode={darkMode} label="Our Role" value={project.role || "—"} />
                  <Row
                    darkMode={darkMode}
                    label="Client"
                    value={project.details?.client || "—"}
                  />
                  <Row
                    darkMode={darkMode}
                    label="Collaborations"
                    value={project.details?.collaborators || "—"}
                  />
                </div>
              </div>

              <div
                className={`mt-4 px-1 text-[11px] tracking-widest uppercase ${
                  darkMode ? "text-white/40" : "text-gray-900/45"
                }`}
              >
                Press ESC to close
              </div>
            </div>
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
            darkMode
              ? "bg-white/10 text-white/80"
              : "bg-gray-900/10 text-gray-900/80"
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
