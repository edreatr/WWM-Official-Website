import React, { useMemo, useState } from "react";
import { ArrowUpRight, ChevronDown, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * JobCard.jsx (Join Us page)
 * - Big title: JOIN US
 * - Placeholder text: 10 rows
 * - BIG.dk-style list
 * - Every job expands into: Role Overview + Responsibilities + Requirements + Quick Info + Apply
 */
export default function JobCard({ darkMode = true }) {
  const jobs = [
    {
      id: "civil-engineer",
      title: "Civil Engineer",
      location: "Singapore",
      type: "Full-time",
      department: "Civil Engineering",
      overview:
        "Placeholder description. Add your role summary here—short, clear, and easy to scan.",
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
    },
    {
      id: "structural-engineer",
      title: "Structural Engineer",
      location: "Singapore",
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
    },
    {
      id: "senior-structural-engineer",
      title: "Senior Structural Engineer",
      location: "Singapore",
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
    },
    {
      id: "ops-marketing-coordinator",
      title: "Operation and Marketing Coordinator",
      location: "Singapore",
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
    },
    {
      id: "bim-draftman",
      title: "BIM Draftman",
      location: "Singapore",
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
    },
  ];

  return (
    <div
      className={`${
        darkMode ? "bg-black text-white" : "bg-white text-gray-900"
      } min-h-screen transition-colors duration-500`}
    >
      {/* Sticky top bar */}
      <header className="sticky top-0 z-40 backdrop-blur-xl">
        <div
          className={`border-b ${
            darkMode
              ? "border-white/10 bg-black/40"
              : "border-gray-900/10 bg-white/70"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between gap-4">
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
            We’re always looking for people who want to design different.
          </div>
        </div>

        {/* Space for text (10 rows placeholder) */}
        <section className="mb-14 lg:mb-16">
          <div
            className={`rounded-3xl border p-8 lg:p-10 ${
              darkMode
                ? "border-white/10 bg-white/[0.03]"
                : "border-gray-900/10 bg-gray-900/[0.03]"
            }`}
          >
            <div
              className={`space-y-3 leading-relaxed ${
                darkMode ? "text-white/75" : "text-gray-900/75"
              }`}
            >
              {Array.from({ length: 10 }).map((_, i) => (
                <p key={i}>
                  Placeholder text line {i + 1}. Add your careers intro, culture,
                  and what you look for.
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Openings */}
        <section>
          <div className="flex items-end justify-between gap-6 mb-6">
            <div>
              <div
                className={`text-xs tracking-[0.3em] ${
                  darkMode ? "text-white/50" : "text-gray-900/60"
                }`}
              >
                OPEN POSITIONS
              </div>
              <h2 className="mt-3 text-3xl sm:text-4xl font-semibold">
                Current openings
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
  className={`group relative rounded-2xl overflow-hidden transition-all duration-300
  ${darkMode ? "border border-white/10" : "border border-gray-900/10"}
  hover:-translate-y-[2px] hover:shadow-2xl`}
>
  {/* glow / light-up layer */}
  <div
    className={`pointer-events-none absolute -inset-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
      darkMode
        ? "bg-[radial-gradient(600px_circle_at_50%_30%,rgba(255,255,255,0.18),transparent_60%)]"
        : "bg-[radial-gradient(600px_circle_at_50%_30%,rgba(0,0,0,0.10),transparent_60%)]"
    }`}
  />

      {/* Big row header */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`w-full text-left p-7 sm:p-8 lg:p-10 flex items-center gap-6 justify-between transition-colors ${
          darkMode
            ? "bg-white/[0.03] hover:bg-white/[0.06]"
            : "bg-gray-900/[0.03] hover:bg-gray-900/[0.06]"
        }`}
      >
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <div
              className={`text-xs tracking-[0.3em] ${
                darkMode ? "text-white/50" : "text-gray-900/50"
              }`}
            >
              OPENING
            </div>
            <div
              className={`text-xs px-3 py-1 rounded-full ${
                darkMode
                  ? "bg-white/10 text-white/70"
                  : "bg-gray-900/10 text-gray-900/70"
              }`}
            >
              {job.location}
            </div>
          </div>

          <h3 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight">
            {job.title}
          </h3>

          <div
            className={`mt-2 text-sm sm:text-base ${
              darkMode ? "text-white/60" : "text-gray-900/60"
            }`}
          >
            {job.type} • {job.department}
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center border ${
              darkMode ? "border-white/15" : "border-gray-900/15"
            }`}
          >
            <ChevronDown
              size={18}
              className={`transition-transform duration-300 ${
                open ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
        </div>
      </button>

      {/* Expanded content — SAME STRUCTURE FOR EVERY JOB */}
      <div
        className={`grid transition-all duration-400 ease-out ${
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
                        <span className={darkMode ? "text-white/40" : "text-gray-900/40"}>
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
                        <span className={darkMode ? "text-white/40" : "text-gray-900/40"}>
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
                      <span className={darkMode ? "text-white/60" : "text-gray-900/60"}>
                        Location
                      </span>
                      <span className="font-medium">{job.location}</span>
                    </div>
                    <div className={`h-px ${darkMode ? "bg-white/10" : "bg-gray-900/10"}`} />

                    <div className="flex justify-between gap-4">
                      <span className={darkMode ? "text-white/60" : "text-gray-900/60"}>
                        Type
                      </span>
                      <span className="font-medium">{job.type}</span>
                    </div>
                    <div className={`h-px ${darkMode ? "bg-white/10" : "bg-gray-900/10"}`} />

                    <div className="flex justify-between gap-4">
                      <span className={darkMode ? "text-white/60" : "text-gray-900/60"}>
                        Department
                      </span>
                      <span className="font-medium">{job.department}</span>
                    </div>
                  </div>
                </div>

                <a
                  href={mailto}
                  className={`group w-full inline-flex items-center justify-between px-6 py-4 border rounded-2xl transition-all duration-300 ${
                    darkMode
                      ? "border-white/20 hover:border-white"
                      : "border-gray-900/20 hover:border-gray-900"
                  }`}
                >
                  <span className="text-sm tracking-widest">
                    APPLY — joinus@wwm-design.com
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </a>

                <div
                  className={`text-xs leading-relaxed ${
                    darkMode ? "text-white/50" : "text-gray-900/50"
                  }`}
                >
                  Attach your CV + portfolio link (if any). We’ll get back as soon
                  as we can.
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
