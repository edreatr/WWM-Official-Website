import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Sun, Moon } from 'lucide-react';
import wwmLogo from '../assets/WWM_WHITELOGO_PNG.png'; // White version with slogan
import wwmLogoDark from '../assets/WWM_BLACKTEXT.png'; // Black version with slogan
import WWMSHORTENEDBLACK from '../assets/WWMSHORTENEDBLACK.png'; // Black shortened logo
import WWMSHORTENEDWHITE from '../assets/WWMSHORTENEDWHITE.png'; // White shortened logo
import pavilionImg from '../assets/PAVILLION.jpg'; // Project image
import servicebg from '../assets/servicebg.jpg'; // Service background image
import smartTechImg from '../assets/SMARTTECH.jpg';
import sustainabilityImg from '../assets/SUSTAINABILITY.png';
import masterplanningImg from '../assets/MASTERPLANNING.png';
import tallBuildingImg from '../assets/servicebg.jpg';
import idcImg from '../assets/IDC.png';
import digitalDesignImg from '../assets/DIGITALDESIGN.jpg';
import blackmap from '../assets/blackmap.png';
import whitemap from '../assets/whitemap.png';


/* ---------------- Slot Machine Text (NO BORDER / NO ROUNDED CONTAINER) ---------------- */
function SlotMachineText({ text = 'DESIGN DIFFERENT', className = '' }) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const targetChars = text.split('');

  const [displayText, setDisplayText] = useState(targetChars);
  const [settled, setSettled] = useState(Array(targetChars.length).fill(false));

  useEffect(() => {
    setDisplayText(Array(targetChars.length).fill(''));
    setSettled(Array(targetChars.length).fill(false));

    const intervals = [];
    const timers = [];

    // Spin each character
    targetChars.forEach((targetChar, index) => {
      const settleDelay = index * 150; // Stagger the settling

      // Don't spin spaces — just place them immediately
      if (targetChar === ' ') {
        setDisplayText((prev) => {
          const newText = [...prev];
          newText[index] = ' ';
          return newText;
        });
        setSettled((prev) => {
          const newSettled = [...prev];
          newSettled[index] = true;
          return newSettled;
        });
        return;
      }

      const spinInterval = setInterval(() => {
        setDisplayText((prev) => {
          const newText = [...prev];
          if (!settled[index]) {
            newText[index] = chars[Math.floor(Math.random() * chars.length)];
          }
          return newText;
        });
      }, 50);
      intervals.push(spinInterval);

      // Settle to final character
      const settleTimer = setTimeout(() => {
        setDisplayText((prev) => {
          const newText = [...prev];
          newText[index] = targetChar;
          return newText;
        });
        setSettled((prev) => {
          const newSettled = [...prev];
          newSettled[index] = true;
          return newSettled;
        });
        clearInterval(spinInterval);
      }, 2000 + settleDelay);
      timers.push(settleTimer);
    });

    return () => {
      intervals.forEach(clearInterval);
      timers.forEach(clearTimeout);
    };
  }, [text]); // keep logic exactly as requested

  return (
    <div className={`w-full flex items-center justify-center select-none ${className}`} aria-label={text}>
      <div className="flex justify-center tracking-[0.22em]">
        {displayText.map((char, i) => (
          <span key={i} className="inline-block text-center px-[0.08em]">
            {char === '' ? '\u00A0' : char}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Shared Logo (same on loading + hero) ---------------- */
function HeroLogo({ darkMode, mousePosition }) {
  return (
    <div
      className="mb-8 transition-transform duration-300"
      //style={{
        //transform: `translate(${mousePosition.x * 35}px, ${mousePosition.y * 35}px)`,
      //}}
    >
      <img
        src={darkMode ? WWMSHORTENEDWHITE : WWMSHORTENEDBLACK}
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
  //useEffect(() => {
   // const handleMouseMove = (e) => {
      //setMousePosition({
        //x: (e.clientX / window.innerWidth - 0.5) * 2,
        //y: (e.clientY / window.innerHeight - 0.5) * 2,
      //});
    //};
    //window.addEventListener('mousemove', handleMouseMove);
    //return () => window.removeEventListener('mousemove', handleMouseMove);
  //}, []);

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
      { threshold: 0.15 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const services = [
    { id: 1, title: 'Structure', color: '#FF6B6B', angle: 45, image: null },
    { id: 2, title: 'Smart Technology', color: '#4ECDC4', angle: -30, image: smartTechImg },
    { id: 3, title: 'Sustainability', color: '#45B7D1', angle: 15, image: sustainabilityImg },
    { id: 4, title: 'Masterplanning', color: '#FFA07A', angle: -45, image: masterplanningImg },
    { id: 5, title: 'MEP', color: '#98D8C8', angle: 30, image: null },
    { id: 6, title: 'Tall Building', color: '#C7CEEA', angle: -15, image: tallBuildingImg },
    { id: 7, title: 'Industrialized Design & Construction', color: '#F6C453', angle: 35, image: idcImg },
    { id: 8, title: 'Digital Design', color: '#FF9FF3', angle: -25, image: digitalDesignImg },
  ];

  const projects = [
    {
      title: 'Project 1',
      scale: 1.2,
      color: '#2C3E50',
      image: pavilionImg,
      location: 'Location',
      sector: 'Mixed-use smart city masterplan',
      role: 'Structural engineering, smart city integration',
      status: 'Ongoing',
      summary:
        'Large-scale future city development focusing on resilient infrastructure, integrated mobility, and smart public realm systems.',
    },
    {
      title: 'Project 2',
      scale: 0.9,
      color: '#E67E22',
      image: pavilionImg,
      location: 'Location',
      sector: 'High-rise residential / mixed-use',
      role: 'Structural and façade engineering',
      status: 'Completed',
      summary:
        'High-rise tower overlooking Dubai Marina, designed with optimised structural systems and coordinated with complex façade geometry.',
    },
    {
      title: 'Project 3',
      scale: 1.4,
      color: '#16A085',
      image: pavilionImg,
      location: 'Location',
      sector: 'Transport & infrastructure',
      role: 'Structural design, concourse integration',
      status: 'In Design',
      summary:
        'Transit hub connecting metro, public realm and retail podiums, with large-span structures and integrated passenger flows.',
    },
    {
      title: 'Project 4',
      scale: 1.1,
      color: '#8E44AD',
      image: pavilionImg,
      location: 'Location',
      sector: 'Cultural / civic',
      role: 'Structural design, roof geometry',
      status: 'Concept',
      summary:
        'Cultural venue with expressive roof forms and flexible gallery spaces, integrating structure, daylight and public circulation.',
    },
  ];

  const teamMembers = [
    {
      name: 'Shonn Mills',
      role: 'Managing Director',
      location: 'Singapore',
      linkedin: 'https://www.linkedin.com/in/shonnmills/',
      photo: null,
    },
    {
      name: 'Giovanni Vigano',
      role: 'Design Director',
      location: 'Singapore',
      linkedin: 'https://www.linkedin.com/in/giovanni-viganò-81a78250/',
      photo: null,
    },
    {
      name: 'Angelo Perini',
      role: 'Senior Associate',
      location: 'Singapore',
      linkedin: 'https://www.linkedin.com/in/angelo-perini-745634ab/',
      photo: null,
    },
    {
      name: 'Samuel Halim',
      role: 'Lead Designer',
      location: 'Singapore',
      linkedin: 'https://www.linkedin.com/in/samuel-previano-halim-b98223167/',
      photo: null,
    },
    {
      name: 'Aish Saboo',
      role: 'Sustainability Specialist',
      location: 'Singapore',
      linkedin: 'https://www.linkedin.com/in/aishwarya-saboo-a671271b4/',
      photo: null,
    },
    {
      name: 'Jaimin Korat',
      role: 'Senior Structural Engineer',
      location: 'Singapore',
      linkedin: 'https://www.linkedin.com/in/jaiminkorat/',
      photo: null,
    },
    {
      name: 'Hao Yang Lim',
      role: 'Designer',
      location: 'Singapore',
      linkedin: 'https://www.linkedin.com/in/limhaoyang/',
      photo: null,
    },
    {
      name: 'Jun Rong Tan',
      role: 'Structural Engineer',
      location: 'Singapore',
      linkedin: 'https://www.linkedin.com/in/tjunrong96/',
      photo: null,
    },
    {
      name: 'Sylvester Tze Feng Sia',
      role: 'Civil & Structural Engineer',
      location: 'Singapore',
      linkedin: 'https://www.linkedin.com/in/sylvestertfs/',
      photo: null,
    },
    {
      name: 'Clarence Rebeka',
      role: 'Structural Engineer',
      location: 'Singapore',
      linkedin: 'https://www.linkedin.com/in/clarencerebeka/',
      photo: null,
    },
  ];

  return (
    <div className={`${darkMode ? 'bg-black text-white' : 'bg-white text-gray-900'} font-sans overflow-hidden transition-colors duration-500`}>
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
          className={`fixed inset-0 z-[9999] ${darkMode ? 'bg-black' : 'bg-white'} flex items-center justify-center transition-opacity duration-1000 ${
            fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="relative z-10 text-center px-6">
            <HeroLogo darkMode={darkMode} mousePosition={mousePosition} />
            {/* Invisible placeholder to match the hero layout exactly (prevents logo shift) */}
            <div className="mt-16 opacity-0 pointer-events-none select-none">
              <SlotMachineText
                text="DESIGN DIFFERENT"
                className={`text-2xl sm:text-3xl md:text-4xl font-semibold ${darkMode ? 'text-white/90' : 'text-gray-900/90'}`}
              />
            </div>
          </div>

          <div className={`absolute -inset-4 ${darkMode ? 'bg-white/10' : 'bg-black/10'} blur-3xl -z-10 pulse-glow`}></div>
        </div>
      )}

      {/* Dark/Light Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`fixed top-8 right-8 z-50 w-12 h-12 rounded-full ${
          darkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-900/10 hover:bg-gray-900/20'
        } backdrop-blur-xl border ${darkMode ? 'border-white/20' : 'border-gray-900/20'} flex items-center justify-center transition-all duration-300 hover:scale-110`}
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Minimal Floating Navigation */}
      <nav className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ${scrolled ? 'scale-90' : 'scale-100'}`}>
        <div className="flex flex-col items-center gap-3">
          {scrolled && (
            <a href="#hero" className="transition-opacity duration-300 opacity-90 hover:opacity-60" aria-label="Back to top">
              <img src={darkMode ? WWMSHORTENEDWHITE : WWMSHORTENEDBLACK} alt="WWM" className="h-6 w-auto" />
            </a>
          )}

          <div
            className={`flex items-center gap-1 ${
              darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-900/5 border-gray-900/10'
            } backdrop-blur-xl border rounded-full px-6 py-3`}
          >
            <a href="#services" className={`px-4 py-2 text-xs tracking-wider ${darkMode ? 'hover:text-white/60' : 'hover:text-gray-900/60'} transition-colors`}>
              CAPABILITIES
            </a>

            <div className={`w-px h-4 ${darkMode ? 'bg-white/20' : 'bg-gray-900/20'}`} />

            <a href="#projects" className={`px-4 py-2 text-xs tracking-wider ${darkMode ? 'hover:text-white/60' : 'hover:text-gray-900/60'} transition-colors`}>
              PROJECTS
            </a>

            <div className={`w-px h-4 ${darkMode ? 'bg-white/20' : 'bg-gray-900/20'}`} />

            <a href="#team" className={`px-4 py-2 text-xs tracking-wider ${darkMode ? 'hover:text-white/60' : 'hover:text-gray-900/60'} transition-colors`}>
              TEAM
            </a>

            <div className={`w-px h-4 ${darkMode ? 'bg-white/20' : 'bg-gray-900/20'}`} />

            <a
  href="/join-us"
  className={`px-4 py-2 text-xs tracking-wider ${darkMode ? 'hover:text-white/60' : 'hover:text-gray-900/60'} transition-colors`}
>
  JOIN US
</a>

<div className={`w-px h-4 ${darkMode ? 'bg-white/20' : 'bg-gray-900/20'}`} />


            <a href="#contact" className={`px-4 py-2 text-xs tracking-wider ${darkMode ? 'hover:text-white/60' : 'hover:text-gray-900/60'} transition-colors`}>
              CONTACT
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-[10%] w-64 h-64 rounded-full blur-3xl float-animation"></div>
          <div
            className="absolute bottom-20 right-[15%] w-96 h-96 rounded-full blur-3xl float-animation"
            style={{ animationDelay: '2s' }}
          ></div>
        </div>

        <div className="relative z-10 text-center px-6">
          <HeroLogo darkMode={darkMode} mousePosition={mousePosition} />

          <div className="mt-16 flex justify-center">
            <SlotMachineText
              text="DESIGN DIFFERENT"
              className={`text-2xl sm:text-3xl md:text-4xl font-semibold ${darkMode ? 'text-white/90' : 'text-gray-900/90'}`}
            />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 inset-x-0 flex flex-col items-center gap-2 animate-bounce">
          <div className={`text-xs tracking-widest ${darkMode ? 'text-white/50' : 'text-gray-900/50'}`}>SCROLL</div>
          <div className={`w-px h-12 bg-gradient-to-b ${darkMode ? 'from-white/50' : 'from-gray-900/50'} to-transparent`}></div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div
              className={`transition-all duration-1000 ${
                visibleSections.about ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
              }`}
            >
              <div className={`inline-block text-xs tracking-[0.3em] ${darkMode ? 'text-white/50' : 'text-gray-900/50'} mb-6`}></div>

              <h2 className="text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                About
                <br />
                <span className={darkMode ? 'text-white/40' : 'text-gray-900/40'}>Our Company</span>
              </h2>

              <p className={`text-lg ${darkMode ? 'text-white/70' : 'text-gray-900/70'} leading-relaxed mb-6 text-justify`}>
                Whitby Wood Mills is an independent international engineering consultancy that designs buildings and urban spaces through deep
                collaboration. We combine low-carbon technologies, computational tools, and systems thinking to deliver integrated, cost-effective
                solutions.
              </p>

              <p className={`text-lg ${darkMode ? 'text-white/70' : 'text-gray-900/70'} leading-relaxed mb-6 text-justify`}>
                Our global project teams are sourced from the best and most suitable talents, wherever they are. This makes us fast, agile, and adaptive.
              </p>

              <p className={`${darkMode ? 'text-white/70' : 'text-gray-900/70'} leading-relaxed mb-6 text-justify`}>
                We foster collaboration, commitment, personal development, and flexibility. We design, co-create, enable, and disrupt, driven by a common
                goal: to make things better.
              </p>
            </div>

            <div
              className={`relative transition-all duration-1000 delay-300 ${
                visibleSections.about ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
              }`}
            >
              <div className={`aspect-square rounded-3xl overflow-hidden border ${darkMode ? 'border-white/10' : 'border-gray-900/10'}`}>
                <img src={pavilionImg} alt="WWM About" className="w-full h-full object-cover" />
              </div>

              <div className={`absolute -top-6 -left-6 w-24 h-24 ${darkMode ? 'bg-white/5' : 'bg-gray-900/5'} rounded-xl blur-xl`}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-32 px-6 lg:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className={`inline-block text-xs tracking-[0.3em] ${darkMode ? 'text-white/50' : 'text-gray-900/50'} mb-6`}>01 —</div>
            <h2 className="text-5xl lg:text-6xl font-bold">Capabilities</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {services.map((service, index) => (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
                className={`relative aspect-[50/49] rounded-2xl border ${
                  darkMode ? 'border-white/10' : 'border-gray-900/10'
                } overflow-hidden cursor-pointer group transition-all duration-700 ${
                  visibleSections.services ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                  background:
                    hoveredService === service.id
                      ? `linear-gradient(${service.angle}deg, ${service.color}40, transparent)`
                      : 'transparent',
                }}
              >
                <img
                  src={service.image || servicebg}
                  alt={service.title}
                  className={`absolute inset-0 w-full h-full opacity-0 group-hover:opacity-80 transition-opacity duration-700 ${
                    service.title === 'Sustainability' ? 'object-cover scale-125' : 'object-cover'
                  }`}
                />

                <div
                  className={`absolute inset-0 ${
                    darkMode ? 'bg-gradient-to-br from-black/40 via-black/10 to-transparent' : 'bg-gradient-to-br from-white/40 via-white/10 to-transparent'
                  } opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                ></div>

                <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
                  <div className="text-6xl mb-4 opacity-20 group-hover:opacity-100 transition-opacity duration-700">
                    {String(service.id).padStart(2, '0')}
                  </div>
                  <h3 className="text-lg font-semibold tracking-wide">{service.title}</h3>
                </div>

                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/30 group-hover:bg-white transition-colors duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-32 px-6 lg:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className={`inline-block text-xs tracking-[0.3em] ${darkMode ? 'text-white/50' : 'text-gray-900/50'} mb-6`}>02 —</div>
            <h2 className="text-5xl lg:text-6xl font-bold mb-4">Featured Projects</h2>
            <p className={`text-lg ${darkMode ? 'text-white/50' : 'text-gray-900/50'} max-w-2xl mx-auto`}>Transforming visions into reality</p>
          </div>

          <div className="relative space-y-4">
            {projects.map((project, index) => {
              const isActive = activeProject === index;
              const isOtherActive = activeProject !== null && !isActive;

              return (
                <div
                  key={index}
                  onClick={() => setActiveProject((prev) => (prev === index ? null : index))}
                  className={`transition-all duration-700 cursor-pointer ${isOtherActive ? 'opacity-30 blur-sm' : 'opacity-100'}`}
                >
                  <div className={`group relative transition-all duration-700 ${isActive ? 'mb-8' : 'mb-0 hover:scale-[1.01]'}`}>
                    <div
                      className={`relative rounded-3xl border ${
                        darkMode ? 'border-white/5 bg-white/[0.02]' : 'border-gray-900/5 bg-gray-900/[0.02]'
                      } backdrop-blur-sm p-6 lg:p-8 transition-all duration-700 ${
                        isActive ? (darkMode ? 'border-white/20 bg-white/5' : 'border-gray-900/20 bg-gray-900/5') : ''
                      }`}
                    >
                      <div className="flex items-center gap-6 lg:gap-12">
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

                        <div className="flex-1 min-w-0">
                          <h3 className="text-2xl lg:text-4xl font-bold mb-3 transition-all duration-700 group-hover:translate-x-2">{project.title}</h3>
                          <div className="flex flex-wrap gap-3 mb-4">
                            <span className={`text-xs px-3 py-1 rounded-full ${darkMode ? 'bg-white/5 text-white/60' : 'bg-gray-900/5 text-gray-900/60'}`}>
                              {project.location}
                            </span>
                            <span className={`text-xs px-3 py-1 rounded-full ${darkMode ? 'bg-white/5 text-white/60' : 'bg-gray-900/5 text-gray-900/60'}`}>
                              {project.status}
                            </span>
                          </div>
                          <div
                            className={`h-px w-full bg-gradient-to-r ${darkMode ? 'from-white/20' : 'from-gray-900/20'} to-transparent transition-all duration-700 ${
                              isActive ? 'opacity-0' : 'opacity-100'
                            }`}
                          ></div>
                        </div>

                        <div className="hidden lg:block relative">
                          <div
                            className={`w-[32rem] h-48 rounded-2xl overflow-hidden transition-all duration-700 border ${
                              darkMode ? 'border-white/10' : 'border-gray-900/10'
                            }`}
                            style={{ transform: isActive ? 'scale(1.06)' : 'scale(0.98)' }}
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

                          <div
                            className={`absolute -bottom-3 -right-3 w-10 h-10 rounded-full ${
                              darkMode ? 'bg-white text-black' : 'bg-gray-900 text-white'
                            } flex items-center justify-center transition-all duration-700 ${isActive ? 'rotate-180 scale-110' : 'rotate-0 scale-100'}`}
                          >
                            <ArrowUpRight size={20} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`overflow-hidden transition-all duration-700 ${isActive ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="pl-4 sm:pl-8 lg:pl-24 pt-0 pb-8">
                      <div
                        className={`rounded-3xl p-6 lg:p-10 border ${
                          darkMode ? 'border-white/10 bg-gradient-to-br from-white/5 to-transparent' : 'border-gray-900/10 bg-gradient-to-br from-gray-900/5 to-transparent'
                        } backdrop-blur-xl`}
                      >
                        {project.image && (
                          <div className="mb-8 lg:mb-12">
                            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 group/img">
                              <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                              />
                              <div
                                className="absolute inset-0 opacity-40"
                                style={{ background: `linear-gradient(to bottom, transparent 50%, ${project.color}40)` }}
                              ></div>
                            </div>
                          </div>
                        )}

                        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                          <div className="lg:col-span-2 space-y-6">
                            <div>
                              <div
                                className={`text-xs tracking-[0.3em] uppercase mb-4 flex items-center gap-3 ${
                                  darkMode ? 'text-white/50' : 'text-gray-900/60'
                                }`}
                              >
                                <div className="w-8 h-px" style={{ backgroundColor: project.color }}></div>
                                Overview
                              </div>
                              <p className={`text-base lg:text-lg leading-relaxed ${darkMode ? 'text-white/80' : 'text-gray-900/80'}`}>{project.summary}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-6">
                              <div className={`p-4 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-gray-900/5'}`}>
                                <div className={`text-xs tracking-wider mb-1 ${darkMode ? 'text-white/40' : 'text-gray-900/50'}`}>SECTOR</div>
                                <div className="font-medium">{project.sector}</div>
                              </div>
                              <div className={`p-4 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-gray-900/5'}`}>
                                <div className={`text-xs tracking-wider mb-1 ${darkMode ? 'text-white/40' : 'text-gray-900/50'}`}>OUR ROLE</div>
                                <div className="font-medium">{project.role}</div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-6">
                            <div className={`p-6 rounded-2xl border ${darkMode ? 'border-white/10 bg-white/5' : 'border-gray-900/10 bg-gray-900/5'}`}>
                              <div className={`text-xs tracking-[0.25em] uppercase mb-4 ${darkMode ? 'text-white/40' : 'text-gray-900/50'}`}>Project Details</div>
                              <div className="space-y-4 text-sm">
                                <div className="flex justify-between items-center">
                                  <span className={darkMode ? 'text-white/60' : 'text-gray-900/60'}>Location</span>
                                  <span className="font-medium">{project.location}</span>
                                </div>
                                <div className={`h-px ${darkMode ? 'bg-white/10' : 'bg-gray-900/10'}`}></div>
                                <div className="flex justify-between items-center">
                                  <span className={darkMode ? 'text-white/60' : 'text-gray-900/60'}>Status</span>
                                  <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: `${project.color}20`, color: project.color }}>
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

      {/* Team */}
      <section id="team" className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-20">
            <div className={`inline-block text-xs tracking-[0.3em] ${darkMode ? 'text-white/50' : 'text-gray-900/50'} mb-6`}>03 —</div>
            <h2 className="text-5xl lg:text-6xl font-bold mb-4">Our Team</h2>
            <p className={`text-lg ${darkMode ? 'text-white/50' : 'text-gray-900/50'} max-w-2xl mx-auto`}>Meet the people behind the work</p>

            {/* ✅ JOIN US CTA inside Team section */}
            <div className="mt-10 flex justify-center">
              <a
                href="/join-us"
                className={`group inline-flex items-center gap-3 px-8 py-4 border rounded-full text-xs tracking-widest transition-all duration-300 ${
                  darkMode
                    ? 'border-white/30 text-white/80 hover:text-white hover:border-white'
                    : 'border-gray-900/30 text-gray-900/80 hover:text-gray-900 hover:border-gray-900'
                }`}
              >
                JOIN US
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>
            </div>
          </div>

          <div className={`transition-all duration-1000 ${visibleSections.team ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {teamMembers.map((m, i) => {
                const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&size=512&background=111111&color=ffffff&bold=true&format=png`;

                return (
                  <div
                    key={i}
                    className={`group relative rounded-2xl border overflow-hidden ${
                      darkMode ? 'border-white/10 bg-white/5' : 'border-gray-900/10 bg-gray-900/5'
                    } transition-all duration-500 hover:scale-[1.02]`}
                  >
                    <div className="relative aspect-[4/5] w-full">
                      <img
                        src={m.photo || avatarFallback}
                        alt={m.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className={`absolute inset-0 ${darkMode ? 'bg-black/15' : 'bg-white/10'}`} />
                    </div>

                    <div
                      className={`absolute inset-0 p-6 flex flex-col justify-end transition-all duration-500 ${
                        darkMode ? 'bg-black/75' : 'bg-white/85'
                      } opacity-0 group-hover:opacity-100`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="text-lg font-semibold leading-tight truncate">{m.name}</div>
                          <div className={`text-sm mt-1 ${darkMode ? 'text-white/70' : 'text-gray-900/70'}`}>{m.role}</div>
                        </div>

                        <div
                          className={`text-xs px-3 py-1 rounded-full whitespace-nowrap ${
                            darkMode ? 'bg-white/10 text-white/80' : 'bg-gray-900/10 text-gray-900/80'
                          }`}
                        >
                          {m.location}
                        </div>
                      </div>

                      <div className={`mt-4 h-px ${darkMode ? 'bg-white/10' : 'bg-gray-900/10'}`}></div>

                      <a
                        href={m.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`mt-4 inline-block text-xs tracking-widest ${
                          darkMode ? 'text-white/70 hover:text-white' : 'text-gray-900/70 hover:text-gray-900'
                        } transition-colors`}
                      >
                        LinkedIn
                      </a>
                    </div>

                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/40 group-hover:bg-white transition-colors duration-500"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex justify-center mb-6">
            <div className={`inline-block text-xs tracking-[0.3em] ${darkMode ? 'text-white/50' : 'text-gray-900/50'}`}>04 — STUDIOS</div>
          </div>

          <div className="w-full mb-16">
            <img
              src={darkMode ? whitemap : blackmap}
              alt="WWM global map"
              className="w-full max-w-7xl opacity-30"
            />

          </div>

          <div className="grid lg:grid-cols-2 gap-20">
            <div className={`transition-all duration-1000 ${visibleSections.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
              <h2 className="text-5xl lg:text-7xl font-bold mb-12 leading-tight">
                Let&apos;s build
                <br />
                something
                <br />
                <span className={`${darkMode ? 'text-white/40' : 'text-gray-900/40'} italic`}>different</span>
              </h2>

              <div className="space-y-6">
                <div>
                  <div className={`text-xs tracking-widest ${darkMode ? 'text-white/50' : 'text-gray-900/50'} mb-2`}>EMAIL</div>
                  <a
                    href="mailto:info@wwm-design.com"
                    className={`text-xl ${darkMode ? 'hover:text-white/60' : 'hover:text-gray-900/60'} transition-colors`}
                  >
                    info@wwm-design.com
                  </a>
                </div>
              </div>
            </div>

            <div
              className={`transition-all duration-1000 delay-300 ${visibleSections.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
            >
              <div className="space-y-8">
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    className={`w-full bg-transparent border-b ${
                      darkMode ? 'border-white/20 focus:border-white placeholder:text-white/30' : 'border-gray-900/20 focus:border-gray-900 placeholder:text-gray-900/30'
                    } py-4 text-lg outline-none transition-colors`}
                  />
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className={`w-full bg-transparent border-b ${
                      darkMode ? 'border-white/20 focus:border-white placeholder:text-white/30' : 'border-gray-900/20 focus:border-gray-900 placeholder:text-gray-900/30'
                    } py-4 text-lg outline-none transition-colors`}
                  />
                </div>

                <div>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your inquiry"
                    className={`w-full bg-transparent border-b ${
                      darkMode ? 'border-white/20 focus:border-white placeholder:text-white/30' : 'border-gray-900/20 focus:border-gray-900 placeholder:text-gray-900/30'
                    } py-4 text-lg outline-none transition-colors resize-none`}
                  />
                </div>

                <button
                  className={`group relative px-8 py-4 border ${
                    darkMode ? 'border-white/30 hover:border-white' : 'border-gray-900/30 hover:border-gray-900'
                  } transition-all duration-500 overflow-hidden`}
                >
                  <span className="relative z-10 flex items-center gap-3 text-sm tracking-widest">
                    SEND MESSAGE
                    <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                  <div className={`absolute inset-0 ${darkMode ? 'bg-white' : 'bg-gray-900'} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t ${darkMode ? 'border-white/10' : 'border-gray-900/10'} py-12 px-6 lg:px-12`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <img src={darkMode ? wwmLogo : wwmLogoDark} alt="WWM Logo" className="h-8 w-auto opacity-90" />
          <div
            className={`text-sm ${darkMode ? 'text-white/50' : 'text-gray-900/50'} absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0`}
          >
            © 2025 WWM PTE.LTD. — Design Different
          </div>

          <div className="flex gap-8 text-sm">
            <a
              href="https://www.linkedin.com/company/wwm-design/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${darkMode ? 'hover:text-white/60' : 'hover:text-gray-900/60'} transition-colors`}
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
