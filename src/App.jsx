import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Mail, Award, ExternalLink, Terminal } from 'lucide-react';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Preloader from './components/Preloader';
import MagneticButton from './components/MagneticButton';
import { portfolioData } from './data/portfolioData';

// Interactive Card with Dynamic Border Spotlight & Scroll Fade-In
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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      whileHover={{ scale: 1.01 }}
      className={`relative premium-card p-8 sm:p-10 rounded-3xl overflow-hidden group ${className}`}
    >
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

// Studio Typography Title
const StudioTitle = ({ firstName = "VARSHA", lastName = "JOHNSON" }) => {
  const firstLetters = firstName.split("");
  const lastLetters = lastName.split("");

  return (
    <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 my-8 select-none cursor-pointer group">
      <div className="flex tracking-wider">
        {firstLetters.map((char, index) => (
          <motion.span
            key={index}
            whileHover={{ scale: 1.2, color: "#ffffff", y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="text-4xl sm:text-7xl md:text-8xl font-thin tracking-[0.2em] text-gray-300 uppercase inline-block transition-colors duration-200"
          >
            {char}
          </motion.span>
        ))}
      </div>

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
  // Duplicate skills array to ensure seamless infinite looping
  const duplicatedSkills = [...portfolioData.skills, ...portfolioData.skills, ...portfolioData.skills, ...portfolioData.skills];

  return (
    <>
      <Preloader />
      <CustomCursor />
      <ScrollProgress />

      <div className="min-h-screen bg-[#030304] text-white relative overflow-hidden">
        <Navbar />

        {/* --- DYNAMIC LIVE MOVING BACKGROUND --- */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Top Left Moving Glow */}
          <div className="absolute top-[5%] left-[10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[140px] animate-blob-1" />
          {/* Bottom Right Moving Glow */}
          <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[160px] animate-blob-2" />
          {/* Grid Texture */}
          <div className="absolute inset-0 grid-overlay opacity-30" />
        </div>

        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-32 px-4 text-center overflow-hidden z-10">
          <div className="max-w-5xl">
            <StudioTitle firstName="VARSHA" lastName="JOHNSON" />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed mb-10 tracking-wide"
            >
              {portfolioData.summary}
            </motion.p>

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
                <a
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

        {/* --- INFINITE MOVING SKILLS MARQUEE (FRAMER MOTION) --- */}
        <section id="skills" className="py-20 relative overflow-hidden z-10">
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-gray-400 border border-white/10 px-5 py-2 rounded-full bg-white/5">
              Technical Stack
            </span>
          </div>

          <div className="flex w-full overflow-hidden select-none py-4">
            <motion.div
              className="flex gap-6 whitespace-nowrap min-w-full"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 20,
              }}
            >
              {duplicatedSkills.map((skill, index) => (
                <div
                  key={index}
                  className="premium-card px-8 py-4 rounded-2xl flex items-center justify-center min-w-[150px]"
                >
                  <span className="text-gray-200 font-medium text-sm tracking-wide">{skill}</span>
                </div>
              ))}
            </motion.div>
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
          <h2 className="text-3xl font-bold text-center mb-16 tracking-tight">Featured Projects</h2>
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

        <footer className="relative z-10 text-center py-10 border-t border-white/5 mt-10">
          <p className="text-xs text-gray-500 font-mono tracking-wide">
            © {new Date().getFullYear()} {portfolioData.name} — Built with React & Framer Motion
          </p>
        </footer>
      </div>
    </>
  );
}