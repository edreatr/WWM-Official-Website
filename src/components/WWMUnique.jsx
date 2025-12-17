import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Sun, Moon } from 'lucide-react';
import wwmLogo from '../assets/WWM_WHITELOGO_PNG.png';
import wwmLogoDark from '../assets/WWM_BLACKTEXT.png'; // Black version
import pavilionImg from '../assets/PAVILLION.jpg'; // Project image
import servicebg from '../assets/servicebg.jpg'; // Service background image
import smartTechImg from '../assets/SMARTTECH.jpg';
import sustainabilityImg from '../assets/SUSTAINABILITY.png';
import masterplanningImg from '../assets/MASTERPLANNING.png';
import tallBuildingImg from '../assets/servicebg.jpg';
import idcImg from '../assets/IDC.png';
import digitalDesignImg from '../assets/DIGITALDESIGN.jpg';

function useSpinningNumber(min = 10, max = 99, interval = 1200) {
  const [value, setValue] = useState(
    Math.floor(Math.random() * (max - min + 1)) + min
  );

  useEffect(() => {
    const id = setInterval(() => {
      setValue(Math.floor(Math.random() * (max - min + 1)) + min);
    }, interval);

    return () => clearInterval(id);
  }, [min, max, interval]);

  return value;
}



export default function WWMUnique() {
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeProject, setActiveProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});
  const [hoveredService, setHoveredService] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const teamsCount = useSpinningNumber(8, 35, 900);
  const projectsCount = useSpinningNumber(40, 180, 1000);
  const countriesCount = useSpinningNumber(6, 25, 1100);

  


  // Loading animation
  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 1500);
    const loadTimer = setTimeout(() => setIsLoading(false), 2500);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(loadTimer);
    };
  }, []);

  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.15 },
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const services = [
  { id: 1, title: 'Structure', color: '#FF6B6B', angle: 45, image: null },

  {
    id: 2,
    title: 'Smart Technology',
    color: '#4ECDC4',
    angle: -30,
    image: smartTechImg,
  },
  {
    id: 3,
    title: 'Sustainability',
    color: '#45B7D1',
    angle: 15,
    image: sustainabilityImg,
  },
  {
    id: 4,
    title: 'Masterplanning',
    color: '#FFA07A',
    angle: -45,
    image: masterplanningImg,
  },
  { id: 5, title: 'MEP', color: '#98D8C8', angle: 30, image: null },

  {
    id: 6,
    title: 'Tall Building',
    color: '#C7CEEA',
    angle: -15,
    image: tallBuildingImg,
  },
  {
    id: 7,
    title: 'Industrialized Design & Construction',
    color: '#F6C453',
    angle: 35,
    image: idcImg,
  },
  {
    id: 8,
    title: 'Digital Design', // (fixed typo from “Digital Drsign”)
    color: '#FF9FF3',
    angle: -25,
    image: digitalDesignImg,
  },
];


  // enriched projects so details + image can show inline
  const projects = [
    {
      title: 'NEOM Phase 1',
      scale: 1.2,
      color: '#2C3E50',
      image: pavilionImg,
      location: 'Saudi Arabia',
      sector: 'Mixed-use smart city masterplan',
      role: 'Structural engineering, smart city integration',
      status: 'Ongoing',
      summary:
        'Large-scale future city development focusing on resilient infrastructure, integrated mobility, and smart public realm systems.',
    },
    {
      title: 'Dubai Marina Tower',
      scale: 0.9,
      color: '#E67E22',
      image: pavilionImg,
      location: 'Dubai, UAE',
      sector: 'High-rise residential / mixed-use',
      role: 'Structural and façade engineering',
      status: 'Completed',
      summary:
        'High-rise tower overlooking Dubai Marina, designed with optimised structural systems and coordinated with complex façade geometry.',
    },
    {
      title: 'Riyadh Metro Hub',
      scale: 1.4,
      color: '#16A085',
      image: pavilionImg,
      location: 'Riyadh, Saudi Arabia',
      sector: 'Transport & infrastructure',
      role: 'Structural design, concourse integration',
      status: 'In Design',
      summary:
        'Transit hub connecting metro, public realm and retail podiums, with large-span structures and integrated passenger flows.',
    },
    {
      title: 'Abu Dhabi Cultural Center',
      scale: 1.1,
      color: '#8E44AD',
      image: pavilionImg,
      location: 'Abu Dhabi, UAE',
      sector: 'Cultural / civic',
      role: 'Structural design, roof geometry',
      status: 'Concept',
      summary:
        'Cultural venue with expressive roof forms and flexible gallery spaces, integrating structure, daylight and public circulation.',
    },
  ];

  return (
    <div
      className={`${
        darkMode ? 'bg-black text-white' : 'bg-white text-gray-900'
      } font-sans overflow-hidden transition-colors duration-500`}
    >
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .float-animation { animation: float 6s ease-in-out infinite; }
        .rotate-slow { animation: rotate 20s linear infinite; }
        .pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
      `}</style>

      {/* Unique Loading Screen */}
      {isLoading && (
        <div
          className={`fixed inset-0 z-[9999] ${
            darkMode ? 'bg-black' : 'bg-white'
          } flex items-center justify-center transition-opacity duration-1000 ${
            fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="relative z-10 text-center px-6">
            {/* SAME EXACT LOGO WRAPPER AS HERO */}
            <div
              className="mb-8 transition-transform duration-300"
              style={{
                transform: `translate(${mousePosition.x * 35}px, ${
                  mousePosition.y * 10
                }px)`,
              }}
            >
              <img
                src={darkMode ? wwmLogo : wwmLogoDark}
                alt="Whitby Wood Mills logo"
                className="w-[60vw] md:w-[35vw] mx-auto opacity-90"
              />
            </div>

            {/* Invisible metrics block to keep same vertical spacing */}
            <div className="mt-16 flex justify-center gap-8 opacity-0 pointer-events-none select-none">
              <div className="text-center">
                <div className="text-4xl font-light mb-1">{teamsCount}+</div>
                <div className="text-xs tracking-wider">TEAMS</div>
              </div>
              <div className="w-px bg-transparent"></div>
              <div className="text-center">
                <div className="text-4xl font-light mb-1">{projectsCount}+</div>
                <div className="text-xs tracking-wider">PROJECTS</div>
              </div>
              <div className="w-px bg-transparent"></div>
              <div className="text-center">
                <div className="text-4xl font-light mb-1">{countriesCount}</div>
                <div className="text-xs tracking-wider">COUNTRIES</div>
              </div>
            </div>
          </div>

          <div
            className={`absolute -inset-4 ${
              darkMode ? 'bg-white/10' : 'bg-black/10'
            } blur-3xl -z-10 pulse-glow`}
          ></div>
        </div>
      )}

      {/* Dark/Light Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`fixed top-8 right-8 z-50 w-12 h-12 rounded-full ${
          darkMode
            ? 'bg-white/10 hover:bg-white/20'
            : 'bg-gray-900/10 hover:bg-gray-900/20'
        } backdrop-blur-xl border ${
          darkMode ? 'border-white/20' : 'border-gray-900/20'
        } flex items-center justify-center transition-all duration-300 hover:scale-110`}
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Minimal Floating Navigation */}
      <nav
        className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ${
          scrolled ? 'scale-90' : 'scale-100'
        }`}
      >
        <div
          className={`flex items-center gap-1 ${
            darkMode
              ? 'bg-white/5 border-white/10'
              : 'bg-gray-900/5 border-gray-900/10'
          } backdrop-blur-xl border rounded-full px-6 py-3`}
        >
          <a
            href="#hero"
            className={`px-4 py-2 text-xs tracking-wider ${
              darkMode ? 'hover:text-white/60' : 'hover:text-gray-900/60'
            } transition-colors`}
          >
            HOME
          </a>
          <div
            className={`w-px h-4 ${
              darkMode ? 'bg-white/20' : 'bg-gray-900/20'
            }`}
          ></div>

    
          <a
            href="#about"
            className={`px-4 py-2 text-xs tracking-wider ${
              darkMode ? 'hover:text-white/60' : 'hover:text-gray-900/60'
            } transition-colors`}
          >
            ABOUT
          </a>
          <div
            className={`w-px h-4 ${
              darkMode ? 'bg-white/20' : 'bg-gray-900/20'
            }`}
          ></div>

          {/* NEW: Capabilities link */}
    <a
      href="#services" // your Capabilities section uses id="services"
      className={`px-4 py-2 text-xs tracking-wider ${
        darkMode ? 'hover:text-white/60' : 'hover:text-gray-900/60'
      } transition-colors`}
    >
      CAPABILITIES
    </a>
    <div
      className={`w-px h-4 ${
        darkMode ? 'bg-white/20' : 'bg-gray-900/20'
      }`}
    ></div>


          <a
            href="#projects"
            className={`px-4 py-2 text-xs tracking-wider ${
              darkMode ? 'hover:text-white/60' : 'hover:text-gray-900/60'
            } transition-colors`}
          >
            PROJECTS
          </a>
          <div
            className={`w-px h-4 ${
              darkMode ? 'bg-white/20' : 'bg-gray-900/20'
            }`}
          />

          <a
            href="#contact"
            className={`px-4 py-2 text-xs tracking-wider ${
              darkMode ? 'hover:text-white/60' : 'hover:text-gray-900/60'
            } transition-colors`}
          >
            CONTACT
          </a>
        </div>
      </nav>

      {/* Hero - Full Screen Typography */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div
            className={`absolute top-20 left-[10%] w-64 h-64 ${
              darkMode ? 'bg-blue-500/10' : 'bg-blue-500/20'
            } rounded-full blur-3xl float-animation`}
          ></div>
          <div
            className={`absolute bottom-20 right-[15%] w-96 h-96 ${
              darkMode ? 'bg-purple-500/10' : 'bg-purple-500/20'
            } rounded-full blur-3xl float-animation`}
            style={{ animationDelay: '2s' }}
          ></div>
          <div
            className={`absolute top-1/2 left-1/2 w-[500px] h-[500px] border ${
              darkMode ? 'border-white/5' : 'border-gray-900/5'
            } rounded-full rotate-slow`}
          ></div>
        </div>

        <div className="relative z-10 text-center px-6">
          <div
            className="mb-8 transition-transform duration-300"
            style={{
              transform: `translate(${mousePosition.x * 35}px, ${
                mousePosition.y * 35
              }px)`,
            }}
          >
            <img
              src={darkMode ? wwmLogo : wwmLogoDark}
              alt="Whitby Wood Mills logo"
              className="w-[60vw] md:w-[35vw] mx-auto opacity-90"
            />
          </div>

          <div className="mt-16 flex justify-center gap-8">
            <div className="text-center">
              <div className="text-4xl font-light mb-1">{teamsCount}+</div>
              <div
                className={`text-xs ${
                  darkMode ? 'text-white/50' : 'text-gray-900/50'
                } tracking-wider`}
              >
                TEAMS
              </div>
            </div>
            <div
              className={`w-px ${
                darkMode ? 'bg-white/10' : 'bg-gray-900/10'
              }`}
            ></div>
            <div className="text-center">
              <div className="text-4xl font-light mb-1">{projectsCount}+</div>
              <div
                className={`text-xs ${
                  darkMode ? 'text-white/50' : 'text-gray-900/50'
                } tracking-wider`}
              >
                PROJECTS
              </div>
            </div>
            <div
              className={`w-px ${
                darkMode ? 'bg-white/10' : 'bg-gray-900/10'
              }`}
            ></div>
            <div className="text-center">
              <div className="text-4xl font-light mb-1">{countriesCount}</div>

              <div
                className={`text-xs ${
                  darkMode ? 'text-white/50' : 'text-gray-900/50'
                } tracking-wider`}
              >
                COUNTRIES
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div
            className={`text-xs tracking-widest ${
              darkMode ? 'text-white/50' : 'text-gray-900/50'
            }`}
          >
            SCROLL
          </div>
          <div
            className={`w-px h-12 bg-gradient-to-b ${
              darkMode ? 'from-white/50' : 'from-gray-900/50'
            } to-transparent`}
          ></div>
        </div>
      </section>

      {/* About - Split Screen */}
      <section
        id="about"
        className="min-h-screen flex items-center py-32 px-6 lg:px-12"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div
              className={`transition-all duration-1000 ${
                visibleSections.about
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-20'
              }`}
            >
              <div
                className={`inline-block text-xs tracking-[0.3em] ${
                  darkMode ? 'text-white/50' : 'text-gray-900/50'
                } mb-6`}
              >
                01 — 
              </div>
              <h2 className="text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                About
                <br />
                <span
                  className={darkMode ? 'text-white/40' : 'text-gray-900/40'}
                >
                  Our Company
                </span>
              </h2>
              <p
                className={`text-lg ${
                  darkMode ? 'text-white/70' : 'text-gray-900/70'
                } leading-relaxed mb-6 text-justify`}
              >
                Whitby Wood Mills is an independent international engineering
                consultancy that designs buildings and urban spaces through deep
                collaboration. We combine low-carbon technologies, computational
                tools, and systems thinking to deliver integrated, cost-effective
                solutions.
              </p>
              <p
                className={`text-lg ${
                  darkMode ? 'text-white/70' : 'text-gray-900/70'
                } leading-relaxed text-justify`}
              >
                Our global project teams are sourced from the best and most
                suitable talents, wherever they are. This makes us fast, agile,
                and adaptive.
                 </p>
                <p> We foster collaboration, commitment, personal development, and flexibility. ​</p>
                <p> We design, co-create, enable, and disrupt, driven by a common goal: to make things better. </p>
            
            </div>

            <div
              className={`relative transition-all duration-1000 delay-300 ${
                visibleSections.about
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-20'
              }`}
            >
              {/* Photo in About section */}
              <div
                className={`aspect-square rounded-3xl overflow-hidden border ${
                  darkMode ? 'border-white/10' : 'border-gray-900/10'
                }`}
              >
                <img
                  src={pavilionImg}
                  alt="WWM About"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div
                className={`absolute -top-6 -left-6 w-24 h-24 ${
                  darkMode ? 'bg-white/5' : 'bg-gray-900/5'
                } rounded-xl blur-xl`}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services - Experimental Grid */}
      <section
        id="services"
        className="min-h-screen py-32 px-6 lg:px-12 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block text-xs tracking-[0.3em] text-white/50 mb-6">
              02 — 
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold">Capabilities</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {services.map((service, index) => (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
                className={`relative aspect-[50/49]  rounded-2xl border border-white/10 overflow-hidden cursor-pointer group transition-all duration-700 ${
                  visibleSections.services
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-90'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                  background:
                    hoveredService === service.id
                      ? `linear-gradient(${service.angle}deg, ${service.color}40, transparent)`
                      : 'transparent',
                }}
              >
                {/* Image layer – appears on hover, in black & white */}
                <img
    src={service.image || servicebg}
    alt={service.title}
    className={`absolute inset-0 w-full h-full opacity-0 group-hover:opacity-80 transition-opacity duration-700 filter grayscale ${
      service.title === 'Sustainability'
        ? 'object-cover scale-125'
        : 'object-cover'
    }`}
  />

                {/* Soft highlight overlay on hover (keeps the color feel) */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
                  <div className="text-6xl mb-4 opacity-20 group-hover:opacity-100 transition-opacity duration-700">
                    {String(service.id).padStart(2, '0')}
                  </div>
                  <h3 className="text-lg font-semibold tracking-wide">
                    {service.title}
                  </h3>
                </div>

                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/30 group-hover:bg-white transition-colors duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects - Elevated Design */}
      <section
        id="projects"
        className="min-h-screen py-32 px-6 lg:px-12 relative overflow-hidden"
      >
        {/* Ambient Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className={`absolute top-1/4 left-1/4 w-[600px] h-[600px] ${
              darkMode ? 'bg-blue-500/5' : 'bg-blue-500/10'
            } rounded-full blur-3xl`}
          ></div>
          <div
            className={`absolute bottom-1/4 right-1/4 w-[500px] h-[500px] ${
              darkMode ? 'bg-purple-500/5' : 'bg-purple-500/10'
            } rounded-full blur-3xl`}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div
              className={`inline-block text-xs tracking-[0.3em] ${
                darkMode ? 'text-white/50' : 'text-gray-900/50'
              } mb-6`}
            >
              03 — 
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold mb-4">
              Featured Projects
            </h2>
            <p
              className={`text-lg ${
                darkMode ? 'text-white/50' : 'text-gray-900/50'
              } max-w-2xl mx-auto`}
            >
              Transforming visions into reality 
            </p>
          </div>

          <div className="relative space-y-4">
            {projects.map((project, index) => {
              const isActive = activeProject === index;
              const isOtherActive = activeProject !== null && !isActive;

              return (
                <div
                  key={index}
                  className={`transition-all duration-700 ${
                    isOtherActive ? 'opacity-30 blur-sm' : 'opacity-100'
                  }`}
                >
                  {/* Main project row - Enhanced */}
                  <div
                    onClick={() =>
                      setActiveProject((prev) =>
                        prev === index ? null : index,
                      )
                    }
                    className={`group relative cursor-pointer transition-all duration-700 ${
                      isActive ? 'mb-8' : 'mb-0 hover:scale-[1.01]'
                    }`}
                  >
                    {/* Background glow effect */}
                    <div
                      className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl -z-10`}
                      style={{
                        background: `radial-gradient(circle at center, ${project.color}30, transparent 70%)`,
                      }}
                    ></div>

                    <div
                      className={`relative rounded-3xl border ${
                        darkMode
                          ? 'border-white/5 bg-white/[0.02]'
                          : 'border-gray-900/5 bg-gray-900/[0.02]'
                      } backdrop-blur-sm p-6 lg:p-8 transition-all duration-700 ${
                        isActive
                          ? darkMode
                            ? 'border-white/20 bg-white/5'
                            : 'border-gray-900/20 bg-gray-900/5'
                          : ''
                      } group-hover:${
                        darkMode ? 'border-white/10' : 'border-gray-900/10'
                      }`}
                    >
                      <div className="flex items-center gap-6 lg:gap-12">
                        {/* Enhanced index number */}
                        <div className="relative">
                          <div
                            className={`text-6xl lg:text-8xl font-bold transition-all duration-700 ${
                              darkMode ? 'text-white/5' : 'text-gray-900/5'
                            } ${isActive ? 'scale-110' : 'scale-100'}`}
                          >
                            {String(index + 1).padStart(2, '0')}
                          </div>
                          <div
                            className="absolute inset-0 text-6xl lg:text-8xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                            style={{ color: project.color }}
                          >
                            {String(index + 1).padStart(2, '0')}
                          </div>
                        </div>

                        {/* Content area */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-2xl lg:text-4xl font-bold mb-3 transition-all duration-700 group-hover:translate-x-2">
                            {project.title}
                          </h3>
                          <div className="flex flex-wrap gap-3 mb-4">
                            <span
                              className={`text-xs px-3 py-1 rounded-full ${
                                darkMode
                                  ? 'bg-white/5 text-white/60'
                                  : 'bg-gray-900/5 text-gray-900/60'
                              }`}
                            >
                              {project.location}
                            </span>
                            <span
                              className={`text-xs px-3 py-1 rounded-full ${
                                darkMode
                                  ? 'bg-white/5 text-white/60'
                                  : 'bg-gray-900/5 text-gray-900/60'
                              }`}
                            >
                              {project.status}
                            </span>
                          </div>
                          <div
                            className={`h-px w-full bg-gradient-to-r ${
                              darkMode ? 'from-white/20' : 'from-gray-900/20'
                            } to-transparent transition-all duration-700 ${
                              isActive ? 'opacity-0' : 'opacity-100'
                            }`}
                          ></div>
                        </div>

                        {/* Preview thumbnail - Enhanced */}
                        <div className="hidden lg:block relative">
                          <div
                            className="w-[32rem] h-48 rounded-2xl overflow-hidden transition-all duration-700 border border-white/10"
                            style={{
                              transform: isActive
                                ? 'scale(1.06)'
                                : 'scale(0.98)',
                            }}
                          >
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div
                              className="absolute inset-0 opacity-60 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-30"
                              style={{ backgroundColor: project.color }}
                            ></div>
                          </div>

                          {/* Expand indicator */}
                          <div
                            className={`absolute -bottom-3 -right-3 w-10 h-10 rounded-full ${
                              darkMode
                                ? 'bg-white text-black'
                                : 'bg-gray-900 text-white'
                            } flex items-center justify-center transition-all duration-700 ${
                              isActive
                                ? 'rotate-180 scale-110'
                                : 'rotate-0 scale-100'
                            }`}
                          >
                            <ArrowUpRight
                              size={20}
                              className="transition-transform duration-700"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded detail panel - Enhanced */}
                  <div
                    className={`overflow-hidden transition-all duration-700 ${
                      isActive
                        ? 'max-h-[2000px] opacity-100'
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="pl-4 sm:pl-8 lg:pl-24 pt-0 pb-8">
                      <div
                        className={`rounded-3xl p-6 lg:p-10 border ${
                          darkMode
                            ? 'border-white/10 bg-gradient-to-br from-white/5 to-transparent'
                            : 'border-gray-900/10 bg-gradient-to-br from-gray-900/5 to-transparent'
                        } backdrop-blur-xl`}
                      >
                        {/* Large image showcase with overlay */}
                        {project.image && (
                          <div className="mb-8 lg:mb-12">
                            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 group/img">
                              <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                              />
                              {/* Gradient overlay */}
                              <div
                                className="absolute inset-0 opacity-40"
                                style={{
                                  background: `linear-gradient(to bottom, transparent 50%, ${project.color}40)`,
                                }}
                              ></div>
                              {/* Corner accent */}
                              <div
                                className="absolute top-6 right-6 w-16 h-16 rounded-full opacity-20 blur-xl"
                                style={{ backgroundColor: project.color }}
                              ></div>
                            </div>
                          </div>
                        )}

                        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                          {/* Summary - Enhanced typography */}
                          <div className="lg:col-span-2 space-y-6">
                            <div>
                              <div
                                className={`text-xs tracking-[0.3em] uppercase mb-4 flex items-center gap-3 ${
                                  darkMode
                                    ? 'text-white/50'
                                    : 'text-gray-900/60'
                                }`}
                              >
                                <div
                                  className="w-8 h-px"
                                  style={{ backgroundColor: project.color }}
                                ></div>
                                Overview
                              </div>
                              <p
                                className={`text-base lg:text-lg leading-relaxed ${
                                  darkMode
                                    ? 'text-white/80'
                                    : 'text-gray-900/80'
                                }`}
                              >
                                {project.summary}
                              </p>
                            </div>

                            {/* Additional project stats */}
                            <div className="grid grid-cols-2 gap-4 pt-6">
                              <div
                                className={`p-4 rounded-xl ${
                                  darkMode
                                    ? 'bg-white/5'
                                    : 'bg-gray-900/5'
                                }`}
                              >
                                <div
                                  className={`text-xs tracking-wider mb-1 ${
                                    darkMode
                                      ? 'text-white/40'
                                      : 'text-gray-900/50'
                                  }`}
                                >
                                  SECTOR
                                </div>
                                <div className="font-medium">
                                  {project.sector}
                                </div>
                              </div>
                              <div
                                className={`p-4 rounded-xl ${
                                  darkMode
                                    ? 'bg-white/5'
                                    : 'bg-gray-900/5'
                                }`}
                              >
                                <div
                                  className={`text-xs tracking-wider mb-1 ${
                                    darkMode
                                      ? 'text-white/40'
                                      : 'text-gray-900/50'
                                  }`}
                                >
                                  OUR ROLE
                                </div>
                                <div className="font-medium">
                                  {project.role}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Meta info - Enhanced cards */}
                          <div className="space-y-6">
                            <div
                              className={`p-6 rounded-2xl border ${
                                darkMode
                                  ? 'border-white/10 bg-white/5'
                                  : 'border-gray-900/10 bg-gray-900/5'
                              }`}
                            >
                              <div
                                className={`text-xs tracking-[0.25em] uppercase mb-4 ${
                                  darkMode
                                    ? 'text-white/40'
                                    : 'text-gray-900/50'
                                }`}
                              >
                                Project Details
                              </div>
                              <div className="space-y-4 text-sm">
                                <div className="flex justify-between items-center">
                                  <span
                                    className={
                                      darkMode
                                        ? 'text-white/60'
                                        : 'text-gray-900/60'
                                    }
                                  >
                                    Location
                                  </span>
                                  <span className="font-medium">
                                    {project.location}
                                  </span>
                                </div>
                                <div
                                  className={`h-px ${
                                    darkMode
                                      ? 'bg-white/10'
                                      : 'bg-gray-900/10'
                                  }`}
                                ></div>
                                <div className="flex justify-between items-center">
                                  <span
                                    className={
                                      darkMode
                                        ? 'text-white/60'
                                        : 'text-gray-900/60'
                                    }
                                  >
                                    Status
                                  </span>
                                  <span
                                    className="px-3 py-1 rounded-full text-xs font-medium"
                                    style={{
                                      backgroundColor: `${project.color}20`,
                                      color: project.color,
                                    }}
                                  >
                                    {project.status}
                                  </span>
                                </div>
                              </div>
                            </div>

                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      

      {/* Contact - Minimalist */}
      <section
        id="contact"
        className="min-h-screen flex items-center py-32 px-6 lg:px-12"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-20">
            <div
              className={`transition-all duration-1000 ${
                visibleSections.contact
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-20'
              }`}
            >

              
              <div
                className={`inline-block text-xs tracking-[0.3em] ${
                  darkMode ? 'text-white/50' : 'text-gray-900/50'
                } mb-6`}
              >
                04 — STUDIOS
              </div>
              <h2 className="text-5xl lg:text-7xl font-bold mb-12 leading-tight">
                Let&apos;s build
                <br />
                something
                <br />
                <span
                  className={`${
                    darkMode ? 'text-white/40' : 'text-gray-900/40'
                  } italic`}
                >
                  different
                </span>
              </h2>

              <div className="space-y-6">
                <div>
                  <div
                    className={`text-xs tracking-widest ${
                      darkMode ? 'text-white/50' : 'text-gray-900/50'
                    } mb-2`}
                  >
                    EMAIL
                  </div>
                  <a
                    href="mailto:info@wwm.com"
                    className={`text-xl ${
                      darkMode
                        ? 'hover:text-white/60'
                        : 'hover:text-gray-900/60'
                    } transition-colors`}
                  >
                    info@wwm.com
                  </a>
                </div>
                
                
              </div>
            </div>

            <div
              className={`transition-all duration-1000 delay-300 ${
                visibleSections.contact
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-20'
              }`}
            >
              <div className="space-y-8">
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    className={`w-full bg-transparent border-b ${
                      darkMode
                        ? 'border-white/20 focus:border-white placeholder:text-white/30'
                        : 'border-gray-900/20 focus:border-gray-900 placeholder:text-gray-900/30'
                    } py-4 text-lg outline-none transition-colors`}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className={`w-full bg-transparent border-b ${
                      darkMode
                        ? 'border-white/20 focus:border-white placeholder:text-white/30'
                        : 'border-gray-900/20 focus:border-gray-900 placeholder:text-gray-900/30'
                    } py-4 text-lg outline-none transition-colors`}
                  />
                </div>
                <div>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your inquiry"
                    className={`w-full bg-transparent border-b ${
                      darkMode
                        ? 'border-white/20 focus:border-white placeholder:text-white/30'
                        : 'border-gray-900/20 focus:border-gray-900 placeholder:text-gray-900/30'
                    } py-4 text-lg outline-none transition-colors resize-none`}
                  />
                </div>
                <button
                  className={`group relative px-8 py-4 border ${
                    darkMode
                      ? 'border-white/30 hover:border-white'
                      : 'border-gray-900/30 hover:border-gray-900'
                  } transition-all duration-500 overflow-hidden`}
                >
                  <span className="relative z-10 flex items-center gap-3 text-sm tracking-widest">
                    SEND MESSAGE
                    <ArrowUpRight
                      size={16}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                  </span>
                  <div
                    className={`absolute inset-0 ${
                      darkMode ? 'bg-white' : 'bg-gray-900'
                    } opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  ></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`border-t ${
          darkMode ? 'border-white/10' : 'border-gray-900/10'
        } py-12 px-6 lg:px-12`}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <img
            src={darkMode ? wwmLogo : wwmLogoDark}
            alt="WWM Logo"
            className="h-8 w-auto opacity-90"
          />
          <div
            className={`text-sm ${
              darkMode ? 'text-white/50' : 'text-gray-900/50'
            }`}
          >
            © 2025 WWM PTE.LTD. — Design Different
          </div>
          <div className="flex gap-8 text-sm">
           <a
  href="https://www.linkedin.com/company/wwm-design/"
  target="_blank"
  rel="noopener noreferrer"
  className={`${
    darkMode ? 'hover:text-white/60' : 'hover:text-gray-900/60'
  } transition-colors`}
>
  LinkedIn
</a>

            <a
              href="#"
              className={`${
                darkMode ? 'hover:text-white/60' : 'hover:text-gray-900/60'
              } transition-colors`}
            >
              Instagram
            </a>
            
          </div>
        </div>
      </footer>
    </div>
  );
}

