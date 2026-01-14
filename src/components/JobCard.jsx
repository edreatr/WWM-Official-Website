import React, { useMemo, useState } from "react";
import { ArrowUpRight, ChevronDown, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import WWMSHORTENEDBLACK from "../assets/WWMSHORTENEDBLACK.png";
import WWMSHORTENEDWHITE from "../assets/WWMSHORTENEDWHITE.png";

/**
 * JobCard.jsx (Join Us page)
 * - Big title: JOIN US
 * - BIG.dk-style list
 * - Every job expands into: Role Overview + Responsibilities + Requirements + Personal Qualities + Quick Info + Apply
 * - Dark/Light mode toggle (user switch)
 * - Job rows hover is flat light grey (no gradient)
 * - Clicking the banner toggles open/close
 * - WHEN OPEN: clicking anywhere inside the expanded content closes it
 * - BUT: clicking the email (mailto) should still work
 */
export default function JobCard({ darkMode, setDarkMode }) {


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
        "We are seeking a Structural Engineer to join our Singapore team on a full-time basis. " +
        "This role is suited to an engineer with strong experience in structural design of buildings, " +
        "who is comfortable working from concept through detailed design on complex, integrated projects. " +
        "You will play a key role in shaping complex engineering systems that integrate seamlessly with architectural design.",
      responsibilities: [
        "Be part of multidisciplinary project teams, providing timely and high-quality design outputs",
        "Support senior engineers with design, analysis, and innovative problem-solving for complex projects",
        "Learn to develop parametric models and algorithms using coding skills (e.g., Python, Grasshopper, Dynamo) to optimise and automate design processes",
        "Develop detailed Finite Element Analysis (FEA) to assess structural performance under various load cases using software such as ETABS, SAP2000, SAFE, etc.",
        "Work with the project team to prepare detailed construction drawings, specifications, and calculations for submissions to relevant authorities (e.g., BCA, LTA) or for international projects",
        "Learn to develop skillsets that meet the firm’s quality standards and comply with client requirements and safety protocols",
        "Actively collaborate with and learn from senior staff, developing both technical and communication skills",
        "Review and comment on drawings and BIM models to ensure compliance with structural requirements",
      ],
      requirements: [
        "Degree in Civil or Structural Engineering from a recognised institution",
        "2–3 years of professional experience in structural design",
        "Familiarity with Singapore authority requirements (LTA, PUB, BCA, NParks, etc.)",
        "Familiarity with 3D design and modelling tools such as Rhino/Grasshopper, ETABS, SAP2000",
        "Ability to work across disciplines and understand the interconnected nature of infrastructure and building systems",
        "Experience with BIM workflows and coordination in Revit is advantageous",
      ],
      personalQualities: [
        "Highly motivated with a passion for transdisciplinary design",
        "Collaborative mindset, strong communicator, and team player",
        "Detail-oriented and technically curious",
        "Confident in managing multiple priorities in a dynamic environment",
        "Curious, proactive, and keen to engage with digital and parametric workflows",
      ],
    },
    {
      id: "senior-structural-engineer",
      title: "Senior Structural Engineer",
      location: "Singapore Studio",
      type: "Full-time",
      department: "Structural Engineering",
      overview:
        "We are seeking a Senior Structural Engineer to join our Singapore team on a full-time basis." +
        " This role is suited to an engineer with strong experience in structural design of buildings, who is comfortable working from concept through detailed design on complex, integrated projects." +
        " You will play a key role in shaping complex engineering systems that integrate seamlessly with architectural design.",
      responsibilities: [
        "Lead and manage multidisciplinary project teams, ensuring the timely and high-quality delivery of engineering design projects.",
        "Provide advanced engineering expertise in design, analysis, and innovative problem-solving for complex projects.",
        "Develop and implement parametric models and algorithms using coding skills (e.g., Python, Grasshopper, Dynamo) to optimize and automate design processes.",
        "Perform and validate detailed Finite Element Analysis (FEA) to assess structural performance under various load cases using software like Etabs / SAP2000 / Safe etc.",
        "Prepare and review detailed construction drawings, specifications, and calculations for submissions to relevant authorities (e.g., BCA, LTA) or for international projects.",
        "Ensure compliance with local, national, and international regulations and standards in all project designs and deliverables.",
        "Review and approve engineering designs, calculations, and technical specifications prepared by project teams.",
        "Ensure that all projects meet the firm’s quality standards and comply with client requirements and safety protocols.",
        "Mentor junior engineers and design staff, offering technical guidance and support for professional development.",
      ],
      requirements: [
        "Degree in Civil or Structural Engineering from a recognised institution",
        "5–6 years of professional experience in both infrastructure and structural design",
        "Familiarity with Singapore authority requirements (LTA, PUB, BCA, NParks, etc.)",
        "Strong skills in 3D design and modelling tools: Rhino/Grasshopper, Etabs, SAP2000",
        "Ability to work across disciplines and understand the interconnected nature of infrastructure and building systems",
        "Experience with BIM workflows and coordination in Revit is advantageous",
      ],
      personalQualities: [
        "Highly motivated with a passion for transdisciplinary design",
        "Collaborative mindset, strong communicator, and team player",
        "Detail-oriented and technically curious",
        "Confident in managing multiple priorities in a dynamic environment",
      ],
    },
    {
      id: "ops-marketing-coordinator",
      title: "Operation and Marketing Coordinator",
      location: "Singapore Studio",
      type: "Full-time",
      department: "Operations / Marketing",
      overview:
        "We are a dynamic, design-led engineering and design consultancy working across the built environment (AEC). " +
        "We collaborate with forward-thinking architects and developers to deliver innovative, sustainable, and elegant structures around the world. " +
        "We are seeking a proactive, creative, and highly organised Operations and Marketing Coordinator to join our growing Singapore team. " +
        "This varied role bridges operations, office management, and marketing across a range of business functions.",
      responsibilities: [
        "Oversee daily office operations, ensuring a smooth, efficient, and welcoming studio environment",
        "Provide general administrative support to the Director, Managing Director, and wider team",
        "Manage office supplies, equipment, and external service providers",
        "Support coordination of meetings and schedules",
        "Assist with onboarding new staff and maintaining company databases and internal systems",
        "Help prepare internal reports, presentations, and correspondence for leadership",
        "Support bids and tenders, including preparation of submissions, project sheets, and company profiles",
        "Conduct market research on clients, competitors, and new opportunities",
        "Develop, implement, and measure digital marketing campaigns across social media, email, and web platforms",
        "Produce marketing analytics reports demonstrating the reach and impact of campaigns",
        "Coordinate website updates and content management, from day-to-day edits to major refreshes",
        "Write and edit editorial content for online and print channels, including news posts, press releases, and newsletters",
        "Create and maintain marketing collateral, project write-ups, and case studies",
        "Support events, exhibitions, and seminars, including logistics, branding, and follow-up",
        "Assist with press and PR activities, liaising with media and external partners",
      ],
      requirements: [
        "Minimum 2 years of experience in a similar role, ideally within the engineering, architecture, or design consultancy sector (AEC)",
        "Highly web-literate with a strong understanding of digital platforms, tools, and analytics",
        "Practical experience with social media, email marketing, and content management systems",
        "Strong analytical and research skills",
        "Excellent writing and storytelling abilities, with an adaptable tone for different audiences and media",
        "Keen eye for detail, design quality, and proofreading",
        "Comfortable managing multiple priorities in a fast-paced environment",
      ],
      personalQualities: [
        "Confident, approachable, and collaborative",
        "Strong communicator who enjoys working across teams and disciplines",
        "Energetic, organised, and proactive, with a hands-on approach",
        "Creative thinker with a passion for design, architecture, and engineering",
        "Self-starter who takes initiative and ownership of their work",
      ],
    },
    {
      id: "bim-draftman",
      title: "BIM Draftman",
      location: "Singapore Studio",
      type: "Full-time",
      department: "BIM / Digital Delivery",
      overview:
        "We are seeking a BIM modeller with a passion for design integration, precision, and innovation. " +
        "You will be part of a collaborative and forward-thinking team working across local and international projects in the built environment, " +
        "spanning complex mixed-use developments, towers, and cultural buildings. " +
        "You will support the engineering team in developing, coordinating, and delivering high-quality digital models that communicate ideas clearly and accurately. " +
        "The role goes beyond conventional modelling, as we are looking for someone who combines technical rigour with creativity and is excited to explore the intersection between BIM, geometry, and computational design.",
      responsibilities: [
        "Develop and manage BIM models for structural, civil, and multidisciplinary projects across all design stages",
        "Coordinate and integrate models with other disciplines (architecture, MEP, facade, landscape, etc.) to ensure seamless collaboration",
        "Prepare accurate drawings, schedules, and documentation aligned with project standards",
        "Support engineers in producing 3D visualisations, design studies, and structural details",
        "Assist in the development and maintenance of BIM standards, templates, and workflows",
        "Explore and implement computational design techniques to enhance efficiency, accuracy, and design optimisation",
        "Work closely with the Director, engineers, and designers to ensure alignment between design intent and model output",
      ],
      requirements: [
        "Diploma or Degree in Civil or Structural Engineering, Architecture, or a related field",
        "4–5 years of experience in BIM modelling for engineering or AEC projects",
        "Strong proficiency in Revit (essential) and familiarity with BIM coordination platforms such as Navisworks or ACC",
        "Competence in Rhino and Grasshopper (computational design tools)",
        "Knowledge of parametric workflows, interoperability (Rhino.Inside.Revit, Dynamo, etc.), and scripting (Python or C#) is an advantage",
        "Solid understanding of structural systems, detailing, and documentation requirements",
        "Strong eye for detail, accuracy, and design quality",
        "Collaborative, proactive, and eager to learn and experiment",
      ],
      personalQualities: [
        "Passionate about digital design, engineering, and innovation",
        "Curious, open-minded, and solutions-driven",
        "Enjoys teamwork and cross-disciplinary collaboration",
        "Highly organised and able to manage priorities efficiently",
        "Motivated to contribute to the continuous development of tools and processes",
      ],
    },
    {
      id: "intern",
      title: "Intern",
      location: "Singapore Studio",
      type: "Internship",
      department: "Design / Engineering / Digital",
      overview:
        "Over the years, we have collaborated with several Singaporean and international universities, " +
        "and we are committed to contributing to young talent’s academic development and education. " +
        "We welcome students from diverse educational backgrounds to join us for internships at our Singapore studio. " +
        "We are a dynamic, international, and fast-growing group of enthusiasts who believe strongly in diversity of thought and experience. " +
        "This internship offers the opportunity to learn cutting-edge industry workflows while working alongside engineers, designers, and digital specialists on high-profile international projects.",
      responsibilities: [
        "Support the delivery of transdisciplinary and holistic design solutions for high-profile international projects",
        "Assist the team in developing and delivering design solutions across various project stages",
        "Contribute to the preparation of design materials, presentations, and reports",
        "Assist with 3D modelling for analytical, structural, or geometrical studies",
        "Support the team with design-related tasks across multiple projects",
        "Contribute to benchmarking studies for building and urban design",
      ],
      requirements: [
        "Undergraduate student in Engineering, Architecture, Architecture and Sustainable Design, Computer Science, or a related field",
        "Strong commitment to teamwork and professional responsibility",
        "Interest in computational design and programming",
        "Familiarity with computational design tools",
        "Legal right to work in Singapore",
      ],
      personalQualities: [
        "Positive attitude and strong eagerness to learn",
        "Interest in developing workflows using computational and digital tools",
        "Enjoys working across multiple disciplines",
        "Curious, proactive, and keen to engage with digital and parametric workflows",
        "Comfortable managing multiple workstreams in a dynamic and fast-paced environment",
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
            {/* Center: SMALL WWM LOGO (clickable) */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <Link to="/">
                <img
                  src={darkMode ? WWMSHORTENEDWHITE : WWMSHORTENEDBLACK}
                  alt="WWM"
                  className="h-6 w-auto opacity-85 cursor-pointer hover:opacity-100 transition-opacity"
                />
              </Link>
            </div>
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
            className={`rounded-3xl p-8 lg:p-10 ${
              darkMode ? "bg-white/[0.03]" : "bg-gray-900/[0.03]"
            }`}
          >
            <div
              className={`space-y-3 leading-relaxed text-justify text-base lg:text-[17px] ${
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
  `Hi WWM Team,\n\n` +
    `I would like to apply for the role: ${job.title}.\n\n` +
    `1) PERSONAL DETAILS\n` +
    `-------------------\n` +
    `Full Name:\n` +
    `Nationality:\n` +
    `Year of Birth:\n` +
    `LinkedIn:\n\n` +
    `2) PROFESSIONAL INFORMATION\n` +
    `-----------------------\n` +
    `University of Degree:\n` +
    `Years of Experience:\n` +
    `Current Employer:\n` +
    `Current Position:\n` +
    `Require Visa to Work in Singapore (yes/no):\n\n` +
    `3) ATTACHMENTS / LINKS\n` +
    `----------------------\n` +
    `Please Attach your CV \n` +
    `Please Attach your Portfolio (if applicable):\n\n` +

    `[Add Text here as needed]\n\n` +

   
    `Kind regards,\n` +
    `[Your Name]\n`
);



    return `mailto:joinus@wwm-design.com?subject=${subject}&body=${body}`;
  }, [job.title]);

  return (
    <div
      className={`group relative rounded-2xl overflow-hidden transition-all duration-500
      ${
        darkMode
          ? "border border-white/10 hover:border-white/40"
          : "border border-gray-900/10 hover:border-gray-900/40"
      }
      ${open ? (darkMode ? "border-white/30" : "border-gray-900/30") : ""}`}
    >
      {/* (Removed) Gradient glow background */}

      {/* Big row header (BANNER) */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`relative z-10 w-full text-left p-7 sm:p-8 lg:p-10 flex items-center gap-6 justify-between transition-all duration-300
        ${
          darkMode
            ? "bg-white/[0.04] group-hover:bg-white/[0.12]"
            : "bg-gray-100 group-hover:bg-gray-200"
        }
        ${open ? (darkMode ? "bg-white/[0.12]" : "bg-gray-200") : ""}`}
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

          <h3
            className={`mt-4 text-2xl sm:text-3xl font-bold tracking-tight transition-colors duration-300 ${
              darkMode ? "group-hover:text-white" : "group-hover:text-black"
            }`}
          >
            {job.title}
          </h3>

          <div
            className={`mt-2 text-sm sm:text-base font-medium transition-colors duration-300 ${
              darkMode
                ? "text-white/40 group-hover:text-white/70"
                : "text-gray-900/40 group-hover:text-gray-900/70"
            }`}
          >
            {job.type} <span className="mx-2 opacity-30">|</span>{" "}
            {job.department}
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

      {/* Expanded content (CLICK ANYWHERE TO CLOSE) */}
      <div
        className={`relative z-30 grid transition-all duration-400 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          {/* This wrapper closes on any click inside expanded content */}
          <div
            onClick={() => setOpen(false)}
            className={`p-7 sm:p-8 lg:p-10 border-t cursor-pointer ${
              darkMode ? "border-white/10" : "border-gray-900/10"
            }`}
          >
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Left content */}
              <div className="lg:col-span-2 space-y-10">
                <section>
                  <div
                    className={`text-base sm:text-lg font-semibold tracking-[0.25em] uppercase mb-4 ${
                      darkMode ? "text-white/60" : "text-gray-900/60"
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
                    className={`text-base sm:text-lg font-semibold tracking-[0.25em] uppercase mb-4 ${
                      darkMode ? "text-white/60" : "text-gray-900/60"
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
                    className={`text-base sm:text-lg font-semibold tracking-[0.25em] uppercase mb-4 ${
                      darkMode ? "text-white/60" : "text-gray-900/60"
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
                    className={`text-base sm:text-lg font-semibold tracking-[0.25em] uppercase mb-4 ${
                      darkMode ? "text-white/60" : "text-gray-900/60"
                    }`}
                  >
                    Personal Qualities
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

                {/* stopPropagation so clicking email does NOT close before opening mail client */}
                <a
                  href={mailto}
                  onClick={(e) => e.stopPropagation()}
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
