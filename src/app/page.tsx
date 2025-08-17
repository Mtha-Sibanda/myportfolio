'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const sections = ['home', 'about', 'portfolio', 'contact'];
      const sectionElements = sections.map(id => 
        id === 'home' ? document.querySelector('section') : document.getElementById(id)
      );
      
      const currentSection = sectionElements.findIndex(section => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      
      if (currentSection !== -1) {
        setActiveSection(sections[currentSection]);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900/90 backdrop-blur-md shadow-lg border-b border-gray-700/50' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">
            <div className="bg-gray-900 rounded-lg p-2">
              <img 
                src="/images/GS_logo.png" 
                alt="GS Logo" 
                className="h-12 w-auto"
              />
            </div>
          </div>

          <nav className="hidden md:flex space-x-8">
            {[
              { name: 'Home', id: 'home' },
              { name: 'About', id: 'about' },
              { name: 'Portfolio', id: 'portfolio' },
              { name: 'Contact', id: 'contact' }
            ].map((item, index) => (
              <motion.a
                key={item.name}
                href={`#${item.id}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
                whileHover={{ y: -2 }}
                className={`font-medium transition-all duration-300 hover:scale-105 ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-600 bg-clip-text text-transparent'
                    : 'text-gray-300 hover:text-cyan-400'
                }`}
              >
                {item.name}
              </motion.a>
            ))}
          </nav>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2 rounded-lg transition-colors duration-300 text-white hover:bg-white/10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}

function HeroSection() {
  const [currentDescriptionIndex, setCurrentDescriptionIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  
  const titles = [
    'Software\nEngineer',
    'Project\nManager'
  ];
  
  const descriptions = [
    'Building Modern, Full-Stack, and User-Centric Web Applications with Cutting-Edge Technologies.',
    'Leading cross-functional teams to deliver innovative digital solutions that drive business growth.'
  ];

  const renderTypedText = (text) => {
    const parts = text.split('\n');
    const firstWord = parts[0] || '';
    const secondWord = parts[1] || '';
    
    return (
      <span className="inline-block whitespace-pre-line">
        <span className="text-white">{firstWord}</span>
        {secondWord && (
          <>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-600 bg-clip-text text-transparent">
              {secondWord}
            </span>
          </>
        )}
      </span>
    );
  };

  useEffect(() => {
    const currentWord = titles[currentWordIndex];
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 4000;
    
    if (!currentWord) return;
    
    if (isWaiting) {
      const waitTimer = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, pauseTime);
      
      return () => clearTimeout(waitTimer);
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        } else {
          setIsWaiting(true);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, isWaiting, currentWordIndex, titles]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDescriptionIndex(prev => (prev + 1) % descriptions.length);
    }, 6500);

    return () => clearInterval(interval);
  }, [descriptions.length]);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-900" id="home">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-6xl lg:text-7xl font-bold leading-tight"
              >
                <span className="min-h-[1.2em] block">
                  {renderTypedText(currentText)}
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-lg text-gray-300 leading-relaxed max-w-2xl"
              >
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentDescriptionIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    {descriptions[currentDescriptionIndex]}
                  </motion.p>
                </AnimatePresence>
              </motion.div>

              {/* Technology Tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="flex flex-wrap gap-3 pt-4"
              >
                {['React JS', 'Next JS', 'Node JS', 'Laravel'].map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-gray-800/50 text-gray-300 rounded-full text-sm font-medium border border-gray-700/50 hover:border-cyan-400/50 transition-all duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* CTA Buttons with Glow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-cyan-600 text-black rounded-lg font-medium shadow-lg shadow-cyan-400/25 hover:shadow-cyan-400/40 hover:shadow-xl transition-all duration-300 hover:from-cyan-300 hover:to-cyan-500"
              >
                <span className="flex items-center gap-2">
                  Projects
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gray-900/80 border-2 border-cyan-400 text-cyan-400 rounded-lg font-medium shadow-lg shadow-cyan-400/25 hover:shadow-cyan-400/40 hover:bg-cyan-400 hover:text-black transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  Contact
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
              </motion.button>
            </motion.div>

            {/* Social Links with Glow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="flex space-x-4"
            >
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="w-14 h-14 bg-gray-800/50 rounded-2xl flex items-center justify-center text-gray-400 border border-gray-700/50 shadow-lg shadow-gray-900/50 hover:shadow-cyan-400/30 hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-300 group"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="w-14 h-14 bg-gray-800/50 rounded-2xl flex items-center justify-center text-gray-400 border border-gray-700/50 shadow-lg shadow-gray-900/50 hover:shadow-cyan-400/30 hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-300 group"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="w-14 h-14 bg-gray-800/50 rounded-2xl flex items-center justify-center text-gray-400 border border-gray-700/50 shadow-lg shadow-gray-900/50 hover:shadow-cyan-400/30 hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-300 group"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>

          <div className="relative">
            <div className="w-full h-96 lg:h-[500px] bg-gradient-to-br from-gray-800 to-gray-700 rounded-3xl shadow-2xl overflow-hidden border border-gray-600 relative">
              <div className="absolute inset-0">
                {currentWordIndex === 0 ? (
                  <div key="code-editor" className="w-full h-full p-6 flex flex-col opacity-100 transition-opacity duration-500">
                    <div className="flex items-center justify-between mb-4 bg-gray-900/50 rounded-lg p-3">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="text-gray-400 text-sm font-mono">portfolio.tsx</div>
                      <div className="w-4 h-4"></div>
                    </div>
                    
                    <div className="flex-1 bg-gray-900/30 rounded-lg p-4 font-mono text-sm overflow-hidden">
                      <div className="space-y-2">
                        <div className="text-purple-400">import <span className="text-yellow-400">React</span> from <span className="text-green-400">'react'</span>;</div>
                        <div className="text-purple-400">import <span className="text-yellow-400">&#123; motion &#125;</span> from <span className="text-green-400">'framer-motion'</span>;</div>
                        <div className="h-2"></div>
                        <div className="text-blue-400">function <span className="text-yellow-400">Portfolio</span>() &#123;</div>
                        <div className="ml-4 text-purple-400">const <span className="text-cyan-400">skills</span> = [</div>
                        <div className="ml-8 text-green-400">'React', 'TypeScript', 'Node.js',</div>
                        <div className="ml-8 text-green-400">'Next.js', 'Tailwind CSS'</div>
                        <div className="ml-4">];</div>
                        <div className="h-2"></div>
                        <div className="ml-4 text-purple-400">return (</div>
                        <div className="ml-8 text-blue-400">&lt;<span className="text-cyan-400">motion.div</span></div>
                        <div className="ml-12 text-yellow-400">animate=<span className="text-green-400">"&#123; opacity: 1 &#125;"</span></div>
                        <div className="ml-8">&gt;</div>
                        <div className="ml-12 text-gray-300">Building amazing experiences</div>
                        <div className="ml-8">&lt;/<span className="text-cyan-400">motion.div</span>&gt;</div>
                        <div className="ml-4">);</div>
                        <div>&#125;</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div key="project-dashboard" className="w-full h-full p-6 flex flex-col opacity-100 transition-opacity duration-500">
                    <div className="flex items-center justify-between mb-4 bg-gray-900/50 rounded-lg p-3">
                      <div className="text-white font-semibold">Project Dashboard</div>
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-gray-400 text-sm">Live</span>
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div className="bg-gray-900/30 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-white text-sm">Frontend Development</span>
                          <span className="text-cyan-400 text-xs">85%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-gradient-to-r from-cyan-400 to-cyan-600 h-2 rounded-full transition-all duration-1000 ease-out" style={{ width: "85%" }}></div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-900/30 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-white text-sm">Backend Integration</span>
                          <span className="text-cyan-400 text-xs">72%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-gradient-to-r from-cyan-400 to-cyan-600 h-2 rounded-full transition-all duration-1000 ease-out" style={{ width: "72%" }}></div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-900/30 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-white text-sm">Testing & QA</span>
                          <span className="text-cyan-400 text-xs">90%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-gradient-to-r from-cyan-400 to-cyan-600 h-2 rounded-full transition-all duration-1000 ease-out" style={{ width: "90%" }}></div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mt-4">
                        <div className="bg-gray-900/30 rounded-lg p-3 text-center">
                          <div className="text-cyan-400 text-xl font-bold">12</div>
                          <div className="text-gray-400 text-xs">Active Tasks</div>
                        </div>
                        <div className="bg-gray-900/30 rounded-lg p-3 text-center">
                          <div className="text-green-400 text-xl font-bold">8</div>
                          <div className="text-gray-400 text-xs">Completed</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="relative">
      <Header />
      <main>
        <HeroSection />
        
        <section id="about" className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-4">About Section</h2>
            <p className="text-gray-400">This is where the about section will go</p>
          </div>
        </section>
        
        <section id="portfolio" className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Portfolio Section</h2>
            <p className="text-gray-400">This is where the portfolio will go</p>
          </div>
        </section>
        
        <section id="contact" className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Contact Section</h2>
            <p className="text-gray-400">This is where the contact form will go</p>
          </div>
        </section>
      </main>
    </div>
  );
}