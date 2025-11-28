import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Sun, Moon } from 'lucide-react';
import wwmLogo from '../assets/WWM_WHITELOGO_PNG.png';
import wwmLogoDark from '../assets/WWM_BLACKTEXT.png'; // You'll need a black version

export default function WWMUnique() {
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeProject, setActiveProject] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});
  const [hoveredService, setHoveredService] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

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
    { id: 1, title: 'Smart Tech', color: '#FF6B6B', angle: 45 },
    { id: 2, title: 'Structural', color: '#4ECDC4', angle: -30 },
    { id: 3, title: 'Civil', color: '#45B7D1', angle: 15 },
    { id: 4, title: 'MEP', color: '#FFA07A', angle: -45 },
    { id: 5, title: 'Sustainability', color: '#98D8C8', angle: 30 },
    { id: 6, title: 'Master Planning', color: '#C7CEEA', angle: -15 },
  ];

  const projects = [
    { title: 'Coming Soon', scale: 1.2, color: '#2C3E50' },
    { title: 'Coming Soon', scale: 0.9, color: '#E67E22' },
    { title: 'Coming Soon', scale: 1.4, color: '#16A085' },
    { title: 'Coming Soon', scale: 1.1, color: '#8E44AD' },
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
            <div
              className="mb-8 transition-transform duration-300"
              style={{
                transform: `translate(${mousePosition.x * 10}px, ${
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
          </div>
          <div className={`absolute -inset-4 ${darkMode ? 'bg-white/10' : 'bg-black/10'} blur-3xl -z-10 pulse-glow`}></div>
        </div>
      )}

      {/* Dark/Light Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`fixed top-8 right-8 z-50 w-12 h-12 rounded-full ${
          darkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-900/10 hover:bg-gray-900/20'
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
        <div className={`flex items-center gap-1 ${
          darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-900/5 border-gray-900/10'
        } backdrop-blur-xl border rounded-full px-6 py-3`}>
          <a
            href="#hero"
            className={`px-4 py-2 text-xs tracking-wider ${
              darkMode ? 'hover:text-white/60' : 'hover:text-gray-900/60'
            } transition-colors`}
          >
            HOME
          </a>
          <div className={`w-px h-4 ${darkMode ? 'bg-white/20' : 'bg-gray-900/20'}`}></div>
          <a
            href="#about"
            className={`px-4 py-2 text-xs tracking-wider ${
              darkMode ? 'hover:text-white/60' : 'hover:text-gray-900/60'
            } transition-colors`}
          >
            ABOUT
          </a>
          <div className={`w-px h-4 ${darkMode ? 'bg-white/20' : 'bg-gray-900/20'}`}></div>
          <a
            href="#services"
            className={`px-4 py-2 text-xs tracking-wider ${
              darkMode ? 'hover:text-white/60' : 'hover:text-gray-900/60'
            } transition-colors`}
          >
            WORK
          </a>
          <div className={`w-px h-4 ${darkMode ? 'bg-white/20' : 'bg-gray-900/20'}`}></div>
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
          <div className={`absolute top-20 left-[10%] w-64 h-64 ${
            darkMode ? 'bg-blue-500/10' : 'bg-blue-500/20'
          } rounded-full blur-3xl float-animation`}></div>
          <div
            className={`absolute bottom-20 right-[15%] w-96 h-96 ${
              darkMode ? 'bg-purple-500/10' : 'bg-purple-500/20'
            } rounded-full blur-3xl float-animation`}
            style={{ animationDelay: '2s' }}
          ></div>
          <div className={`absolute top-1/2 left-1/2 w-[500px] h-[500px] border ${
            darkMode ? 'border-white/5' : 'border-gray-900/5'
          } rounded-full rotate-slow`}></div>
        </div>

        <div className="relative z-10 text-center px-6">
          <div
            className="mb-8 transition-transform duration-300"
            style={{
              transform: `translate(${mousePosition.x * 10}px, ${
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

          <div className="mt-16 flex justify-center gap-8">
            <div className="text-center">
              <div className="text-4xl font-light mb-1">XX+</div>
              <div className={`text-xs ${darkMode ? 'text-white/50' : 'text-gray-900/50'} tracking-wider`}>AWARDS</div>
            </div>
            <div className={`w-px ${darkMode ? 'bg-white/10' : 'bg-gray-900/10'}`}></div>
            <div className="text-center">
              <div className="text-4xl font-light mb-1">XX+</div>
              <div className={`text-xs ${darkMode ? 'text-white/50' : 'text-gray-900/50'} tracking-wider`}>
                PROJECTS
              </div>
            </div>
            <div className={`w-px ${darkMode ? 'bg-white/10' : 'bg-gray-900/10'}`}></div>
            <div className="text-center">
              <div className="text-4xl font-light mb-1">XX</div>
              <div className={`text-xs ${darkMode ? 'text-white/50' : 'text-gray-900/50'} tracking-wider`}>
                COUNTRIES
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className={`text-xs tracking-widest ${darkMode ? 'text-white/50' : 'text-gray-900/50'}`}>SCROLL</div>
          <div className={`w-px h-12 bg-gradient-to-b ${
            darkMode ? 'from-white/50' : 'from-gray-900/50'
          } to-transparent`}></div>
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
              <div className={`inline-block text-xs tracking-[0.3em] ${
                darkMode ? 'text-white/50' : 'text-gray-900/50'
              } mb-6`}>
                01 — ABOUT
              </div>
              <h2 className="text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                Design
                <br />
                <span className={darkMode ? 'text-white/40' : 'text-gray-900/40'}>Different</span>
              </h2>
              <p className={`text-lg ${darkMode ? 'text-white/70' : 'text-gray-900/70'} leading-relaxed mb-6`}>
                Coming Soon
              </p>
              <p className={`text-lg ${darkMode ? 'text-white/70' : 'text-gray-900/70'} leading-relaxed`}>
                xxx
              </p>
            </div>

            <div
              className={`relative transition-all duration-1000 delay-300 ${
                visibleSections.about
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-20'
              }`}
            >
              <div className={`aspect-square rounded-3xl ${
                darkMode 
                  ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-white/10' 
                  : 'bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-gray-900/10'
              } backdrop-blur-sm border overflow-hidden`}>
                <div className="w-full h-full flex items-center justify-center">
                  <img 
                    src={darkMode ? wwmLogo : wwmLogoDark} 
                    alt="WWM Logo" 
                    className="w-1/2 opacity-10"
                  />
                </div>
              </div>
              <div className={`absolute -bottom-6 -right-6 w-32 h-32 border-2 ${
                darkMode ? 'border-white/20' : 'border-gray-900/20'
              } rounded-full`}></div>
              <div className={`absolute -top-6 -left-6 w-24 h-24 ${
                darkMode ? 'bg-white/5' : 'bg-gray-900/5'
              } rounded-xl blur-xl`}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services - List Style */}
      <section id="services" className="min-h-screen py-32 px-6 lg:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <div className={`inline-block text-xs tracking-[0.3em] ${
              darkMode ? 'text-white/50' : 'text-gray-900/50'
            } mb-6`}>02 — SERVICES</div>
            <h2 className="text-5xl lg:text-6xl font-bold">Capabilities</h2>
          </div>

          <div className="space-y-1">
            {services.map((service, index) => (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
                className={`group relative ${
                  darkMode ? 'border-white/10' : 'border-gray-900/10'
                } border-b transition-all duration-700 ${
                  visibleSections.services ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div 
                  className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                  style={{ 
                    background: `linear-gradient(90deg, ${service.color}25, transparent)`
                  }}
                ></div>
                
                <div className="relative flex items-center justify-between py-8 px-6 cursor-pointer">
                  <div className="flex items-center gap-8 lg:gap-12">
                    <div className={`text-xl lg:text-2xl font-light ${
                      darkMode ? 'text-white/30 group-hover:text-white' : 'text-gray-900/30 group-hover:text-gray-900'
                    } transition-colors duration-500 w-12`}>
                      {String(service.id).padStart(2, '0')}
                    </div>
                    <h3 className="text-2xl lg:text-4xl font-semibold tracking-tight group-hover:translate-x-4 transition-transform duration-500">
                      {service.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4">
                    <div 
                      className="w-3 h-3 rounded-full transition-all duration-500"
                      style={{ 
                        backgroundColor: hoveredService === service.id ? service.color : (darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)')
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects - Carousel Style */}
      <section
        id="projects"
        className="min-h-screen py-32 px-6 lg:px-12 relative"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className={`inline-block text-xs tracking-[0.3em] ${
              darkMode ? 'text-white/50' : 'text-gray-900/50'
            } mb-6`}>
              03 — PROJECTS
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold">Our Projects</h2>
          </div>

          <div className="relative">
            {projects.map((project, index) => (
              <div
                key={index}
                onClick={() => setActiveProject(index)}
                className={`mb-8 transition-all duration-700 cursor-pointer ${
                  activeProject === index
                    ? 'opacity-100 scale-100'
                    : 'opacity-30 scale-95 hover:opacity-60'
                }`}
              >
                <div className="flex items-center gap-8 lg:gap-16">
                  <div className={`text-8xl lg:text-[12rem] font-bold ${
                    darkMode ? 'text-white/5' : 'text-gray-900/5'
                  } leading-none`}>
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-3xl lg:text-5xl font-bold mb-4">
                      {project.title}
                    </h3>
                    <div className={`h-px w-full bg-gradient-to-r ${
                      darkMode ? 'from-white/50' : 'from-gray-900/50'
                    } to-transparent`}></div>
                  </div>

                  <div
                    className="hidden lg:block w-64 h-64 rounded-2xl transition-all duration-700"
                    style={{
                      background: `linear-gradient(135deg, ${project.color}, ${project.color}80)`,
                      transform:
                        activeProject === index ? 'scale(1)' : 'scale(0.8)',
                    }}
                  ></div>
                </div>
              </div>
            ))}
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
              <div className={`inline-block text-xs tracking-[0.3em] ${
                darkMode ? 'text-white/50' : 'text-gray-900/50'
              } mb-6`}>
                04 — CONTACT
              </div>
              <h2 className="text-5xl lg:text-7xl font-bold mb-12 leading-tight">
                Let&apos;s build
                <br />
                something
                <br />
                <span className={`${darkMode ? 'text-white/40' : 'text-gray-900/40'} italic`}>different</span>
              </h2>

              <div className="space-y-6">
                <div>
                  <div className={`text-xs tracking-widest ${
                    darkMode ? 'text-white/50' : 'text-gray-900/50'
                  } mb-2`}>
                    EMAIL
                  </div>
                  <a
                    href="mailto:contact@wwm.com"
                    className={`text-xl ${
                      darkMode ? 'hover:text-white/60' : 'hover:text-gray-900/60'
                    } transition-colors`}
                  >
                    contact@wwm.com
                  </a>
                </div>
                <div>
                  <div className={`text-xs tracking-widest ${
                    darkMode ? 'text-white/50' : 'text-gray-900/50'
                  } mb-2`}>
                    PHONE
                  </div>
                  <a
                    href="tel:+971"
                    className={`text-xl ${
                      darkMode ? 'hover:text-white/60' : 'hover:text-gray-900/60'
                    } transition-colors`}
                  >
                    +65 XXXXXX
                  </a>
                </div>
                <div>
                  <div className={`text-xs tracking-widest ${
                    darkMode ? 'text-white/50' : 'text-gray-900/50'
                  } mb-2`}>
                    LOCATION
                  </div>
                  <div className="text-xl">48B Club Street, Singapore</div>
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
                <button className={`group relative px-8 py-4 border ${
                  darkMode ? 'border-white/30 hover:border-white' : 'border-gray-900/30 hover:border-gray-900'
                } transition-all duration-500 overflow-hidden`}>
                  <span className="relative z-10 flex items-center gap-3 text-sm tracking-widest">
                    SEND MESSAGE
                    <ArrowUpRight
                      size={16}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                  </span>
                  <div className={`absolute inset-0 ${
                    darkMode ? 'bg-white' : 'bg-gray-900'
                  } opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t ${darkMode ? 'border-white/10' : 'border-gray-900/10'} py-12 px-6 lg:px-12`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <img 
            src={darkMode ? wwmLogo : wwmLogoDark} 
            alt="WWM Logo" 
            className="h-8 w-auto opacity-90"
          />
          <div className={`text-sm ${darkMode ? 'text-white/50' : 'text-gray-900/50'}`}>
            © 2025 WWM PTE.LTD. — Design Different
          </div>
          <div className="flex gap-8 text-sm">
            <a
              href="#"
              className={`${darkMode ? 'hover:text-white/60' : 'hover:text-gray-900/60'} transition-colors`}
            >
              LinkedIn
            </a>
            <a
              href="#"
              className={`${darkMode ? 'hover:text-white/60' : 'hover:text-gray-900/60'} transition-colors`}
            >
              Instagram
            </a>
            <a
              href="#"
              className={`${darkMode ? 'hover:text-white/60' : 'hover:text-gray-900/60'} transition-colors`}
            >
              Behance
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}