import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowRight, FileText, Mail, Award, ExternalLink, Terminal } from 'lucide-react';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Preloader from './components/Preloader';
import MagneticButton from './components/MagneticButton';
import { portfolioData } from './data/portfolioData';

// Interactive Card with Dynamic Border Spotlight
const PremiumCard = ({ children, className = "" }) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 120, damping: 14 });
  const mouseYSpring = useSpring(y, { stiffness: 120, damping: 14 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    setMousePos({ x: mouseX, y: mouseY });

    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
      }}
      style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.01 }}
      className={`relative premium-card p-8 sm:p-10 rounded-3xl overflow-hidden group ${className}`}
    >
      {/* Dynamic Cursor Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: isHovered
            ? `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.15), transparent 70%)`
            : "none",
        }}
      />
      <div style={{ transform: "translateZ(20px)" }} className="relative z-20">
        {children}
      </div>
    </motion.div>
  );
};

// Variable Typography Title styled exact to screenshot
const StudioTitle = ({ firstName = "VARSHA", lastName = "JOHNSON" }) => {
  const firstLetters = firstName.split("");
  const lastLetters = lastName.split("");

  return (
    <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 my-8 select-none cursor-pointer group">
      {/* First Name - Ultra Thin Tall Condensed */}
      <div className="flex tracking-wider">
        {firstLetters.map((char, index) => (
          <motion.span
            key={index}
            whileHover={{ scale: 1.2, color: "#ffffff", y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="text-4xl sm:text-7xl md:text-8xl font-thin tracking-[0.2em] text-gray-300 uppercase inline-block transition-colors duration-200"
            style={{ fontStretch: "condensed" }}
          >
            {char}
          </motion.span>
        ))}
      </div>

      {/* Last Name - Bold Heavy Impact */}
      <div className="flex tracking-tight">
        {lastLetters.map((char, index) => (
          <motion.span
            key={index}
            whileHover={{ scale: 1.25, color: "#ffffff", y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="text-4xl sm:text-7xl md:text-8xl font-extrabold tracking-normal text-white uppercase inline-block drop-shadow-[0_0_25px_rgba(255,255,255,0.3)] transition-colors duration-200"
          >
            {char}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const duplicatedSkills = [...portfolioData.skills, ...portfolioData.skills];

  return (
    <>
      <Preloader />
      <CustomCursor />
      <ScrollProgress />

      <div className="min-h-screen bg-[#030304] text-white relative overflow-hidden">
        <Navbar />

        {/* Animated mesh background (replaces static spotlight, persists behind all sections) */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-white/[0.04] rounded-full blur-[120px] animate-blob" />
          <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-[130px] animate-blob-delay" />
          <div className="absolute inset-0 grid-overlay opacity-40" />
        </div>

        {/* Studio Top Spotlights matching screenshot reference */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] opacity-60 z-[1]">
          <div className="absolute top-[-100px] left-[20%] w-[300px] h-[600px] bg-gradient-to-b from-white/20 via-white/5 to-transparent blur-[80px] rotate-[25deg]" />
          <div className="absolute top-[-100px] right-[20%] w-[300px] h-[600px] bg-gradient-to-b from-white/20 via-white/5 to-transparent blur-[80px] -rotate-[25deg]" />
        </div>

        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-32 px-4 text-center overflow-hidden z-10">
          <div className="max-w-5xl">
            {/* Main Title matching Screenshot */}
            <StudioTitle firstName="VARSHA" lastName="JOHNSON" />

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed mb-10 tracking-wide"
            >
              {portfolioData.summary}
            </motion.p>

            {/* Buttons styled exact to reference, now magnetic */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <MagneticButton
                href="#projects"
                className="px-8 py-3.5 rounded-full bg-white text-black font-semibold text-sm flex items-center gap-2 transition-all duration-200 cursor-pointer hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
              >
                View My Work <ArrowRight size={16} />
              </MagneticButton>

              <MagneticButton
                href="#contact"
                className="px-8 py-3.5 rounded-full border border-white/20 text-white font-medium text-sm transition-all duration-200 bg-white/5 cursor-pointer hover:bg-white/[0.08] hover:border-white/40"
              >
                Contact Me
              </MagneticButton>
            </div>

            {/* Social Icons */}
            <div className="flex justify-center items-center gap-6 text-gray-400">
              <motion.a
                whileHover={{ scale: 1.2, color: "#ffffff" }}
                href={portfolioData.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.2, color: "#ffffff" }}
                href={portfolioData.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.2, color: "#ffffff" }}
                href={`mailto:${portfolioData.email}`}
                aria-label="Email"
              >
                <Mail size={20} />
              </motion.a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="max-w-4xl mx-auto px-4 py-24 z-10 relative">
          <PremiumCard>
            <div className="flex items-center gap-3 mb-6">
              <Terminal className="text-gray-400" size={20} />
              <h2 className="text-2xl font-bold text-white tracking-wide">About Me</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 font-light text-base">{portfolioData.about.whoIAm}</p>
            <p className="text-gray-300 leading-relaxed mb-6 font-light text-base">{portfolioData.about.whatIDo}</p>
            {portfolioData.hobbyWebsite && (
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs text-gray-400 font-mono">Personal Writing & Novel Showcase</span>
                
                  href={portfolioData.hobbyWebsite}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-white font-medium flex items-center gap-1 hover:underline"
                >
                  Tales Under a Thengu <ExternalLink size={12} />
                </a>
              </div>
            )}
          </PremiumCard>
        </section>

        {/* Stats Bar */}
        <section className="max-w-4xl mx-auto px-4 pb-12 z-10 relative">
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Tech Skills', value: portfolioData.skills.length },
              { label: 'Certifications', value: portfolioData.certifications.length },
              { label: 'Projects', value: portfolioData.projects.length },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="premium-card rounded-2xl py-6 text-center"
              >
                <div className="text-3xl font-extrabold text-white text-gradient-shimmer">{stat.value}+</div>
                <div className="text-xs text-gray-400 font-mono uppercase tracking-widest mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Moving Skills Marquee */}
        <section id="skills" className="py-20 relative overflow-hidden z-10">
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-gray-400 border border-white/10 px-5 py-2 rounded-full bg-white/5">
              Technical Stack
            </span>
          </div>
          <div className="flex overflow-hidden w-full select-none py-4">
            <div className="flex gap-6 animate-marquee whitespace-nowrap">
              {duplicatedSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1, borderColor: "rgba(255, 255, 255, 0.4)", boxShadow: "0 0 25px rgba(255, 255, 255, 0.15)" }}
                  className="premium-card px-8 py-4 rounded-2xl flex items-center justify-center min-w-[150px] cursor-pointer transition-all duration-300"
                >
                  <span className="text-gray-200 font-medium text-sm tracking-wide">{skill}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="max-w-4xl mx-auto px-4 py-24 z-10 relative">
          <h2 className="text-3xl font-bold text-center mb-16 tracking-tight">Experience & Leadership</h2>
          <div className="space-y-8">
            {portfolioData.experience.map((exp, idx) => (
              <PremiumCard key={idx}>
                <div className="flex justify-between items-start flex-wrap gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-wide">{exp.title}</h3>
                    <p className="text-sm text-gray-400 font-mono mt-0.5">{exp.organization}</p>
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded-full text-gray-300 border border-white/10 bg-white/5">{exp.period}</span>
                </div>
                <ul className="list-disc list-inside text-sm text-gray-300 space-y-2 mt-4 font-light leading-relaxed">
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </PremiumCard>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="max-w-4xl mx-auto px-4 py-24 z-10 relative">
          <h2 className="text-3xl font-bold text-center mb-16 tracking-tight">Featured Engineering Project</h2>
          <div className="grid gap-8">
            {portfolioData.projects.map((p, idx) => (
              <PremiumCard key={idx}>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-bold tracking-wide">{p.title}</h3>
                  <span className="text-xs font-mono text-gray-400 border border-white/10 px-3 py-1 rounded-full bg-white/5">{p.institution}</span>
                </div>
                <p className="text-gray-300 text-sm mb-6 leading-relaxed font-light">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((tag, i) => (
                    <span key={i} className="text-xs font-mono bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </PremiumCard>
            ))}
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="max-w-4xl mx-auto px-4 py-24 z-10 relative">
          <h2 className="text-3xl font-bold text-center mb-16 tracking-tight">Certifications & Milestones</h2>
          <PremiumCard>
            <div className="grid md:grid-cols-2 gap-4">
              {portfolioData.certifications.map((cert, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 transition-all cursor-default"
                >
                  <Award className="text-gray-300 shrink-0" size={20} />
                  <span className="text-sm text-gray-300 font-medium">{cert}</span>
                </motion.div>
              ))}
            </div>
          </PremiumCard>
        </section>

        {/* Contact Section */}
        <section id="contact" className="max-w-2xl mx-auto px-4 py-24 text-center z-10 relative">
          <PremiumCard>
            <h2 className="text-3xl font-bold mb-4 tracking-tight">Get In Touch</h2>
            <p className="text-gray-400 text-sm mb-8 font-light">Open for opportunities in Full-Stack Web Engineering, Cybersecurity, and AI Workflows.</p>
            <MagneticButton
              href={`mailto:${portfolioData.email}`}
              className="inline-flex items-center gap-2 px-9 py-4 rounded-full bg-white text-black font-semibold text-sm transition-all cursor-pointer hover:shadow-[0_0_35px_rgba(255,255,255,0.35)]"
            >
              Contact Me <ArrowUpRight size={18} />
            </MagneticButton>
          </PremiumCard>
        </section>

        {/* Footer */}
        <footer className="relative z-10 text-center py-10 border-t border-white/5 mt-10">
          <p className="text-xs text-gray-500 font-mono tracking-wide">
            © {new Date().getFullYear()} {portfolioData.name} — Built with MERN & Framer Motion
          </p>
        </footer>
      </div>
    </>
  );
}