import React, { useMemo, useState } from "react";
import { ArrowUpRight, ChevronDown, ArrowLeft, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import WWMSHORTENEDBLACK from "../assets/WWMSHORTENEDBLACK.png";
import WWMSHORTENEDWHITE from "../assets/WWMSHORTENEDWHITE.png";

/**
 * JobCard.jsx (Join Us page)
 * - Big title: JOIN US
 * - BIG.dk-style list
 * - Every job expands into: Role Overview + Responsibilities + Requirements + Personal Qualities + Quick Info + Apply
 * - Dark/Light mode toggle (user switch)
 * - Job rows "light up" on hover (MORE CONTRAST)
 */
export default function JobCard() {
  const [darkMode, setDarkMode] = useState(true);

  const jobs = [
    {
      id: "civil-engineer",
      title: "Civil Engineer",
      location: "Singapore Studio",
      type: "Full-time",
      department: "Civil Engineering",
      overview:
        "We are seeking a Civil Engineer to join our Singapore team on a full-time basis. " +
        "This role is suited to a civil engineer with strong experience in site development and infrastructure design, who is comfortable working from concept through detailed design on complex, integrated projects. " +
        "You will play a key role in shaping site-wide civil solutions that integrate seamlessly with architectural and structural designs.",
      responsibilities: [
        "Civil design and coordination of site-wide infrastructure",
        "Grading plans and earthworks design (cut–fill optimisation, levels coordination)",
        "Road and pavement design, including horizontal and vertical alignment",
        "Plan and profile drawings for roads, drainage, and utilities",
        "Stormwater Management (SWM) design and modelling, including detention, attenuation, and discharge compliance",
        "Preparation of earthworks, drainage, pavement and infrastructure drawings for concept and detailed design stages",
        "Development and management of Civil 3D models",
        "Coordination of civil works with architectural, structural, and landscape design teams",
        "Contribution to integrated digital workflows across Civil 3D, Revit, Rhino / Grasshopper",
        "Involvement in sustainability-driven infrastructure strategies, including efficient earthworks, water management, and resilient site planning",
      ],
      requirements: [
        "Degree in Civil Engineering from a recognised institution",
        "Minimum 5 years of professional experience in civil / infrastructure design",
        "Demonstrated experience in grading and earthworks design",
        "Experience with road and pavement geometry",
        "Strong understanding of drainage and SWM systems",
        "Experience producing plan and profile drawings",
        "Strong proficiency in Civil 3D",
        "Experience coordinating civil design within multidisciplinary BIM environments",
        "Familiarity with Revit and Rhino / Grasshopper is advantageous",
      ],
      personalQualities: [
        "Technically rigorous, detail-oriented, and solutions-driven",
        "Strong collaborator with clear communication skills",
        "Comfortable working across disciplines and design scales",
        "Curious, proactive, and keen to engage with digital and parametric workflows",
        "Able to manage multiple workstreams in a dynamic consultancy environment",
      ],
    },
    {
      id: "structural-engineer",
      title: "Structural Engineer",
      location: "Singapore Studio",
      type: "Full-time",
      department: "Structural Engineering",
      overview:
        "Placeholder description. Add your main project types, scope, and collaboration expectations.",
      responsibilities: [
        "Placeholder responsibility line 1",
        "Placeholder responsibility line 2",
        "Placeholder responsibility line 3",
      ],
      requirements: [
        "Placeholder requirement line 1",
        "Placeholder requirement line 2",
        "Placeholder requirement line 3",
      ],
      personalQualities: [
        "Collaborative and proactive",
        "Detail-oriented and solutions-driven",
        "Clear communicator across disciplines",
      ],
    },
    {
      id: "senior-structural-engineer",
      title: "Senior Structural Engineer",
      location: "Singapore Studio",
      type: "Full-time",
      department: "Structural Engineering",
      overview:
        "Placeholder description. Mention leadership, coordination, delivery responsibility, and client-facing expectations.",
      responsibilities: [
        "Placeholder responsibility line 1",
        "Placeholder responsibility line 2",
        "Placeholder responsibility line 3",
      ],
      requirements: [
        "Placeholder requirement line 1",
        "Placeholder requirement line 2",
        "Placeholder requirement line 3",
      ],
      personalQualities: [
        "Collaborative and proactive",
        "Detail-oriented and solutions-driven",
        "Clear communicator across disciplines",
      ],
    },
    {
      id: "ops-marketing-coordinator",
      title: "Operation and Marketing Coordinator",
      location: "Singapore Studio",
      type: "Full-time",
      department: "Operations / Marketing",
      overview:
        "Placeholder description. Add workflow support, coordination, marketing materials, and internal communications scope.",
      responsibilities: [
        "Placeholder responsibility line 1",
        "Placeholder responsibility line 2",
        "Placeholder responsibility line 3",
      ],
      requirements: [
        "Placeholder requirement line 1",
        "Placeholder requirement line 2",
        "Placeholder requirement line 3",
      ],
      personalQualities: [
        "Collaborative and proactive",
        "Detail-oriented and solutions-driven",
        "Clear communicator across disciplines",
      ],
    },
    {
      id: "bim-draftman",
      title: "BIM Draftman",
      location: "Singapore Studio",
      type: "Full-time",
      department: "BIM / Digital Delivery",
      overview:
        "Placeholder description. Include software, model coordination, drawing production, QA/QC, and collaboration.",
      responsibilities: [
        "Placeholder responsibility line 1",
        "Placeholder responsibility line 2",
        "Placeholder responsibility line 3",
      ],
      requirements: [
        "Placeholder requirement line 1",
        "Placeholder requirement line 2",
        "Placeholder requirement line 3",
      ],
      personalQualities: [
        "Collaborative and proactive",
        "Detail-oriented and solutions-driven",
        "Clear communicator across disciplines",
      ],
    },
  ];

  return (
    <div
      className={`${
        darkMode ? "bg-black text-white" : "bg-white text-gray-900"
      } min-h-screen transition-colors duration-500`}
    >
      {/* Dark/Light Mode Toggle */}
      <button
        onClick={() => setDarkMode((v) => !v)}
        className={`fixed top-6 right-6 z-50 w-12 h-12 rounded-full ${
          darkMode
            ? "bg-white/10 hover:bg-white/20"
            : "bg-gray-900/10 hover:bg-gray-900/20"
        } backdrop-blur-xl border ${
          darkMode ? "border-white/20" : "border-gray-900/20"
        } flex items-center justify-center transition-all duration-300 hover:scale-110`}
        aria-label="Toggle dark mode"
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Sticky top bar */}
      <header className="sticky top-0 z-40 backdrop-blur-xl">
        <div
          className={`border-b ${
            darkMode
              ? "border-white/10 bg-black/40"
              : "border-gray-900/10 bg-white/70"
          }`}
        >
          <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
            {/* Left: BACK */}
            <Link
              to="/"
              className={`inline-flex items-center gap-2 text-xs tracking-widest ${
                darkMode
                  ? "text-white/70 hover:text-white"
                  : "text-gray-900/70 hover:text-gray-900"
              } transition-colors`}
            >
              <ArrowLeft size={16} />
              BACK
            </Link>

            {/* Center: SMALL WWM LOGO */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <img
                src={darkMode ? WWMSHORTENEDWHITE : WWMSHORTENEDBLACK}
                alt="WWM"
                className="h-6 w-auto opacity-85"
              />
            </div>

            {/* Right: APPLY */}
            <a
              href="mailto:joinus@wwm-design.com?subject=Application%20—%20WWM%20Join%20Us"
              className={`text-xs tracking-widest px-4 py-2 rounded-full border transition-colors ${
                darkMode
                  ? "border-white/20 hover:border-white text-white/80 hover:text-white"
                  : "border-gray-900/20 hover:border-gray-900 text-gray-900/80 hover:text-gray-900"
              }`}
            >
              APPLY — joinus@wwm-design.com
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-16 sm:py-20 lg:py-24">
        {/* Big title */}
        <div className="text-center mb-14 lg:mb-16">
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight">
            JOIN US
          </h1>
          <div
            className={`mt-6 text-sm sm:text-base ${
              darkMode ? "text-white/60" : "text-gray-900/60"
            }`}
          >
            Design Different with Us
          </div>
        </div>

        {/* Intro text */}
        <section className="mb-14 lg:mb-16">
          <div
            className={`rounded-3xl border p-8 lg:p-10 ${
              darkMode
                ? "border-white/10 bg-white/[0.03]"
                : "border-gray-900/10 bg-gray-900/[0.03]"
            }`}
          >
            <div
              className={`space-y-3 leading-relaxed text-justify ${
                darkMode ? "text-white/75" : "text-gray-900/75"
              }`}
            >
              <p>
                A world in crisis needs a different kind of thinking. At WWM, we
                fuse design, engineering, and a systems philosophy to push the
                boundaries of what is possible. We fully embrace the changing
                landscape of digital tools, R&amp;D, and dynamic workflows to
                unlock new high-value sustainable results.
              </p>

              <p>
                You will be part of a studio that values technical depth, design
                intelligence, and digital innovation.
              </p>

              <p>
                You will be engaged with complex urban developments, collaborate
                closely and co-create with leading architects and designers, and
                realize innovative urban and engineering visions.
              </p>
            </div>
          </div>
        </section>

        {/* Openings */}
        <section>
          <div className="flex items-end justify-between gap-6 mb-6">
            <div>
              <h2 className="mt-3 text-2xl sm:text-3xl font-bold">
                OPEN POSITIONS
              </h2>
            </div>

            <div
              className={`text-xs ${
                darkMode ? "text-white/50" : "text-gray-900/50"
              }`}
            >
              Click a role to view details
            </div>
          </div>

          <div className="space-y-4">
            {jobs.map((job) => (
              <OpeningRow key={job.id} job={job} darkMode={darkMode} />
            ))}
          </div>
        </section>
      </main>

      <footer
        className={`border-t ${
          darkMode ? "border-white/10" : "border-gray-900/10"
        } py-10`}
      >
        <div
          className={`max-w-7xl mx-auto px-6 lg:px-12 text-sm ${
            darkMode ? "text-white/50" : "text-gray-900/50"
          }`}
        >
          © 2025 WWM PTE.LTD. — Join Us
        </div>
      </footer>
    </div>
  );
}

/* ---------------- Big Opening Row (Accordion) ---------------- */

function OpeningRow({ job, darkMode }) {
  const [open, setOpen] = useState(false);

  const mailto = useMemo(() => {
    const subject = encodeURIComponent(`Application — ${job.title}`);
    const body = encodeURIComponent(
      `Hi WWM Team,\n\nI would like to apply for the role: ${job.title}.\n\nName:\nPhone:\nLinkedIn/Portfolio:\nCV attached:\n\nMessage:\n`
    );
    return `mailto:joinus@wwm-design.com?subject=${subject}&body=${body}`;
  }, [job.title]);

  return (
    <div
      className={`group relative rounded-2xl overflow-hidden transition-all duration-500
      ${darkMode 
        ? "border border-white/10 hover:border-white/40" 
        : "border border-gray-900/10 hover:border-gray-900/40"
      }
      ${open ? (darkMode ? "border-white/30" : "border-gray-900/30") : ""}`}
    >
      {/* Dynamic Glow Background */}
      <div
        className={`pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
          darkMode
            ? "bg-gradient-to-br from-white/[0.08] via-transparent to-transparent"
            : "bg-gradient-to-br from-gray-900/[0.04] via-transparent to-transparent"
        }`}
      />

      {/* Big row header (BANNER) */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`relative z-10 w-full text-left p-7 sm:p-8 lg:p-10 flex items-center gap-6 justify-between transition-all duration-300
        ${
          darkMode
            ? "bg-white/[0.03] group-hover:bg-white/[0.08]"
            : "bg-gray-900/[0.02] group-hover:bg-gray-900/[0.06]"
        }
        ${open ? (darkMode ? "bg-white/[0.08]" : "bg-gray-900/[0.06]") : ""}`}
      >
        <div className="min-w-0 transform transition-transform duration-300 group-hover:translate-x-1">
          <div className="flex items-center gap-3">
            <div
              className={`text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border transition-colors duration-300 ${
                darkMode
                  ? "bg-white/5 border-white/10 text-white/50 group-hover:border-white/40 group-hover:text-white"
                  : "bg-gray-900/5 border-gray-900/10 text-gray-900/50 group-hover:border-gray-900/40 group-hover:text-gray-900"
              }`}
            >
              {job.location}
            </div>
          </div>

          <h3 className={`mt-4 text-2xl sm:text-3xl font-bold tracking-tight transition-colors duration-300 ${
            darkMode ? "group-hover:text-white" : "group-hover:text-black"
          }`}>
            {job.title}
          </h3>

          <div
            className={`mt-2 text-sm sm:text-base font-medium transition-colors duration-300 ${
              darkMode ? "text-white/40 group-hover:text-white/70" : "text-gray-900/40 group-hover:text-gray-900/70"
            }`}
          >
            {job.type} <span className="mx-2 opacity-30">|</span> {job.department}
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 ${
              darkMode 
                ? "border-white/10 group-hover:border-white/50 group-hover:bg-white text-white group-hover:text-black" 
                : "border-gray-900/10 group-hover:border-gray-900/50 group-hover:bg-gray-900 text-gray-900 group-hover:text-white"
            }`}
          >
            <ChevronDown
              size={20}
              className={`transition-transform duration-500 ${
                open ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
        </div>
      </button>

      {/* Expanded content */}
      <div
        className={`relative z-10 grid transition-all duration-400 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`p-7 sm:p-8 lg:p-10 border-t ${
              darkMode ? "border-white/10" : "border-gray-900/10"
            }`}
          >
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Left content */}
              <div className="lg:col-span-2 space-y-10">
                <section>
                  <div
                    className={`text-xs tracking-[0.3em] uppercase mb-3 ${
                      darkMode ? "text-white/50" : "text-gray-900/60"
                    }`}
                  >
                    Role overview
                  </div>
                  <p
                    className={`${
                      darkMode ? "text-white/80" : "text-gray-900/80"
                    } leading-relaxed`}
                  >
                    {job.overview}
                  </p>
                </section>

                <section>
                  <div
                    className={`text-xs tracking-[0.3em] uppercase mb-3 ${
                      darkMode ? "text-white/50" : "text-gray-900/60"
                    }`}
                  >
                    Responsibilities
                  </div>
                  <ul
                    className={`space-y-2 ${
                      darkMode ? "text-white/80" : "text-gray-900/80"
                    }`}
                  >
                    {job.responsibilities.map((x, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span
                          className={
                            darkMode ? "text-white/40" : "text-gray-900/40"
                          }
                        >
                          —
                        </span>
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <div
                    className={`text-xs tracking-[0.3em] uppercase mb-3 ${
                      darkMode ? "text-white/50" : "text-gray-900/60"
                    }`}
                  >
                    Requirements
                  </div>
                  <ul
                    className={`space-y-2 ${
                      darkMode ? "text-white/80" : "text-gray-900/80"
                    }`}
                  >
                    {job.requirements.map((x, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span
                          className={
                            darkMode ? "text-white/40" : "text-gray-900/40"
                          }
                        >
                          —
                        </span>
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <div
                    className={`text-xs tracking-[0.3em] uppercase mb-3 ${
                      darkMode ? "text-white/50" : "text-gray-900/60"
                    }`}
                  >
                    Personal qualities
                  </div>

                  <ul
                    className={`space-y-2 ${
                      darkMode ? "text-white/80" : "text-gray-900/80"
                    }`}
                  >
                    {(job.personalQualities || []).map((x, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span
                          className={
                            darkMode ? "text-white/40" : "text-gray-900/40"
                          }
                        >
                          —
                        </span>
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              {/* Right content */}
              <aside className="space-y-6">
                <div
                  className={`p-6 rounded-2xl border ${
                    darkMode
                      ? "border-white/10 bg-white/[0.03]"
                      : "border-gray-900/10 bg-gray-900/[0.03]"
                  }`}
                >
                  <div
                    className={`text-xs tracking-[0.3em] uppercase mb-4 ${
                      darkMode ? "text-white/50" : "text-gray-900/60"
                    }`}
                  >
                    Quick info
                  </div>

                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between gap-4">
                      <span
                        className={
                          darkMode ? "text-white/60" : "text-gray-900/60"
                        }
                      >
                        Location
                      </span>
                      <span className="font-medium">{job.location}</span>
                    </div>
                    <div
                      className={`h-px ${
                        darkMode ? "bg-white/10" : "bg-gray-900/10"
                      }`}
                    />

                    <div className="flex justify-between gap-4">
                      <span
                        className={
                          darkMode ? "text-white/60" : "text-gray-900/60"
                        }
                      >
                        Type
                      </span>
                      <span className="font-medium">{job.type}</span>
                    </div>
                    <div
                      className={`h-px ${
                        darkMode ? "bg-white/10" : "bg-gray-900/10"
                      }`}
                    />

                    <div className="flex justify-between gap-4">
                      <span
                        className={
                          darkMode ? "text-white/60" : "text-gray-900/60"
                        }
                      >
                        Department
                      </span>
                      <span className="font-medium">{job.department}</span>
                    </div>
                  </div>
                </div>

                <div
                  className={`text-xs leading-relaxed ${
                    darkMode ? "text-white/50" : "text-gray-900/50"
                  }`}
                >
                  APPLY WITH YOUR CV AND PORTFOLIO
                </div>

                <a
                  href={mailto}
                  className={`group w-full inline-flex items-center justify-between px-6 py-4 border rounded-2xl transition-all duration-300 ${
                    darkMode
                      ? "border-white/20 hover:border-white"
                      : "border-gray-900/20 hover:border-gray-900"
                  }`}
                >
                  
                  <span className="text-sm tracking-widest leading-relaxed">
                    joinus@wwm-design.com
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </a>

                
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
