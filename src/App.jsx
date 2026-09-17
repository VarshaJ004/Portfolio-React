import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// UI icons
import {
  Mail,
  User,
  ExternalLink,
  Sparkles,
  Briefcase,
  Code2,
  Award,
  ArrowUpRight
} from 'lucide-react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Preloader from './components/Preloader';
import MagneticButton from './components/MagneticButton';
import { portfolioData } from './data/portfolioData';

const VideoLogoBadge = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: 0.3,
        type: 'spring',
        stiffness: 180,
        damping: 15,
      }}
      className="
        fixed
        top-5
        right-5
        z-[9999]
        w-20
        h-20
        md:w-24
        md:h-24
        rounded-full
        overflow-hidden
        border border-white/20
        bg-black
        shadow-[0_0_30px_rgba(168,85,247,0.45)]
        backdrop-blur-xl
      "
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="
          w-full
          h-full
          object-cover
          scale-[2.1]
        "
      >
        <source src="/varshalogo.mp4" type="video/mp4" />
      </video>
    </motion.div>
  );
};

// Interactive Particle Mesh Network Background
const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particleCount = Math.floor(Math.min(width, 1200) / 18);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 1.8 + 0.5,
    }));

    const mouse = { x: null, y: null, radius: 150 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        if (mouse.x !== null && mouse.y !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.4 * (1 - dist / mouse.radius)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60"
    />
  );
};

// Premium Card Component
const PremiumCard = ({ children, className = '' }) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 18 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 18 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);

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
      style={{ rotateY, rotateX, transformStyle: 'preserve-3d' }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`relative premium-card p-8 sm:p-10 rounded-3xl overflow-hidden group transition-all duration-300 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: isHovered
            ? `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.12), transparent 80%)`
            : 'none',
        }}
      />
      <div style={{ transform: 'translateZ(25px)' }} className="relative z-20">
        {children}
      </div>
    </motion.div>
  );
};

export default function App() {
  const duplicatedSkills = [
    ...portfolioData.skills,
    ...portfolioData.skills,
    ...portfolioData.skills,
    ...portfolioData.skills,
  ];

  return (
    <>
      <Preloader />
      <VideoLogoBadge />
      <CustomCursor />
      <ScrollProgress />

      <div className="min-h-screen bg-[#030304] text-white relative overflow-hidden font-sans">
        <Navbar />
        <ParticleBackground />

        {/* Ambient Gradient Glow Orbits */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[10%] left-[15%] w-[450px] h-[450px] bg-purple-600/15 rounded-full blur-[150px] animate-blob-1" />
          <div className="absolute bottom-[15%] right-[15%] w-[550px] h-[550px] bg-blue-600/10 rounded-full blur-[170px] animate-blob-2" />
          <div className="absolute inset-0 grid-overlay opacity-20" />
        </div>

        {/* Imported Hero Component */}
        <Hero />

        {/* About Section */}
<section
  id="about"
  className="relative min-h-screen px-6 py-24 z-10 overflow-hidden"
>
  {/* Background glow */}
  <div className="about-glow about-glow-one" />
  <div className="about-glow about-glow-two" />

  <div className="max-w-6xl mx-auto relative">

    {/* Section heading */}
    <div className="mb-14">
      <div className="flex items-center gap-3 mb-4">
        <span className="about-line" />
        <span className="text-xs tracking-[0.35em] text-purple-300 uppercase font-mono">
          Profile // 001
        </span>
      </div>

      <h2 className="text-5xl md:text-7xl font-black tracking-tight text-white">
        MORE THAN
        <span className="block text-purple-400">JUST CODE.</span>
      </h2>

      <p className="mt-5 text-gray-400 max-w-xl text-sm md:text-base leading-relaxed">
        A developer, cybersecurity enthusiast and AI explorer building
        digital experiences where creativity meets technology.
      </p>
    </div>

    {/* Main futuristic panel */}
    <div className="about-interface">

      {/* Top status bar */}
      <div className="about-status">
        <div className="flex items-center gap-2">
          <span className="status-dot" />
          <span>ONLINE / BUILDING</span>
        </div>

        <span className="hidden md:block">
          VARSHA.JOHNSON // DIGITAL IDENTITY
        </span>
      </div>

      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 p-7 md:p-12">

        {/* LEFT */}
        <div className="relative">

          {/* Identity */}
          <div className="mb-10">
            <span className="text-purple-400 text-xs font-mono tracking-[0.25em]">
              WHO I AM
            </span>

            <h3 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-5">
              I build things.
              <br />
              <span className="about-gradient-text">
                I break things.
              </span>
              <br />
              I learn from both.
            </h3>

            <p className="text-gray-400 leading-7 text-sm md:text-base max-w-xl">
              {portfolioData.about.whoIAm}
            </p>
          </div>

          {/* What I do */}
          <div className="about-terminal">
            <div className="terminal-header">
              <div className="flex gap-1.5">
                <span />
                <span />
                <span />
              </div>

              <span className="text-[10px] text-gray-500 font-mono">
                varsha@portfolio:~$
              </span>
            </div>

            <div className="terminal-content">
              <p className="text-purple-400 font-mono text-xs mb-3">
                $ cat what-i-do.txt
              </p>

              <p className="text-gray-300 text-sm leading-7">
                {portfolioData.about.whatIDo}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="about-chip">FULL STACK</span>
                <span className="about-chip">CYBERSECURITY</span>
                <span className="about-chip">AI</span>
                <span className="about-chip">CREATIVE TECH</span>
              </div>
            </div>
          </div>

          {/* Mini quote */}
          <div className="about-quote">
            <span className="text-purple-400 text-2xl">“</span>
            <p>
              Always learning.
              <br />
              Always building.
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative flex items-center justify-center min-h-[430px]">

          {/* Orbit rings */}
          <div className="about-orbit orbit-large" />
          <div className="about-orbit orbit-medium" />
          <div className="about-orbit orbit-small" />

          {/* Floating labels */}
          <div className="about-float-card float-one">
            <span className="text-purple-400">01</span>
            <div>
              <strong>BUILD</strong>
              <small>Full Stack</small>
            </div>
          </div>

          <div className="about-float-card float-two">
            <span className="text-purple-400">02</span>
            <div>
              <strong>SECURE</strong>
              <small>Cybersecurity</small>
            </div>
          </div>

          <div className="about-float-card float-three">
            <span className="text-purple-400">03</span>
            <div>
              <strong>EXPLORE</strong>
              <small>Artificial Intelligence</small>
            </div>
          </div>

          {/* Core */}
          <div className="about-core">
            <div className="core-glow" />

            <div className="relative z-10 text-center">
              <span className="text-[10px] tracking-[0.35em] text-gray-500 font-mono">
                DIGITAL
              </span>

              <div className="text-7xl md:text-8xl font-black mt-1 about-v">
                V
              </div>

              <span className="text-[10px] tracking-[0.3em] text-purple-300 font-mono">
                VARSHA
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom metrics */}
      <div className="about-metrics">

        <div className="metric">
          <span className="metric-number">01</span>
          <div>
            <strong>CURIOUS</strong>
            <small>Always exploring</small>
          </div>
        </div>

        <div className="metric">
          <span className="metric-number">02</span>
          <div>
            <strong>SECURE</strong>
            <small>Think like an attacker</small>
          </div>
        </div>

        <div className="metric">
          <span className="metric-number">03</span>
          <div>
            <strong>CREATE</strong>
            <small>Turn ideas into products</small>
          </div>
        </div>

        {portfolioData.hobbyWebsite && (
          <a
            href={portfolioData.hobbyWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="writing-portal"
          >
            <div>
              <span>OFF THE SCREEN</span>
              <strong>Tales Under a Thengu</strong>
            </div>

            <ExternalLink
              size={17}
              className="writing-arrow"
            />
          </a>
        )}

      </div>
    </div>

    {/* Bottom label */}
    <div className="flex justify-between items-center mt-8 text-[10px] font-mono tracking-[0.2em] text-gray-600">
      <span>ABOUT / IDENTITY / 2026</span>
      <span>SCROLL TO EXPLORE ↓</span>
    </div>

  </div>
</section>

{/* Skills Section */}
<section
  id="skills"
  className="relative py-24 overflow-hidden z-10"
>
  <div className="max-w-6xl mx-auto px-6">

    {/* Heading */}
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">

      <div>
        <p className="text-xs font-mono tracking-[0.3em] uppercase text-purple-400 mb-4">
          Skills
        </p>

        <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white">
          Things I
          <span className="text-purple-400"> work with.</span>
        </h2>
      </div>

      <p className="text-sm text-gray-500 max-w-sm leading-6">
        Technologies I use to build, experiment, solve problems and
        occasionally make things much harder than they need to be.
      </p>
    </div>

    {/* Category labels */}
    <div className="flex flex-wrap gap-2 mb-8">
      <span className="skill-category active">DEVELOPMENT</span>
      <span className="skill-category">DATABASE</span>
      <span className="skill-category">CLOUD</span>
      <span className="skill-category">SECURITY</span>
      <span className="skill-category">TOOLS</span>
    </div>

  </div>

  {/* Marquee */}
  <div className="relative">

    {/* Fade edges */}
    <div className="skill-fade-left" />
    <div className="skill-fade-right" />

    <motion.div
      className="flex gap-4 w-max"
      animate={{ x: ["0%", "-50%"] }}
      transition={{
        repeat: Infinity,
        ease: "linear",
        duration: 30,
      }}
    >
      {duplicatedSkills.map((skill, index) => (
        <div
          key={`${skill}-${index}`}
          className="skill-item group"
        >
          <span className="skill-number">
            {String((index % 9) + 1).padStart(2, "0")}
          </span>

          <span className="skill-name">
            {skill}
          </span>

          <span className="skill-dot" />
        </div>
      ))}
    </motion.div>

  </div>

  {/* Small bottom line */}
  <div className="max-w-6xl mx-auto px-6 mt-12">
    <div className="skill-bottom-line">
      <span>LEARNING NEVER STOPS</span>
      <span>MORE TO COME →</span>
    </div>
  </div>
</section>

        {/* Experience Section */}
        <section id="experience" className="max-w-4xl mx-auto px-4 py-16 z-10 relative">
          <div className="flex items-center justify-center gap-3 mb-12">
            <Briefcase className="text-purple-400" size={28} />
            <h2 className="text-3xl font-bold tracking-tight">Experience & Leadership</h2>
          </div>
          <div className="space-y-8">
            {portfolioData.experience.map((exp, idx) => (
              <PremiumCard key={idx}>
                <div className="flex justify-between items-start flex-wrap gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-wide">
                      {exp.title}
                    </h3>
                    <p className="text-sm text-purple-400 font-mono mt-0.5">
                      {exp.organization}
                    </p>
                  </div>
                  <span className="text-xs font-mono px-3.5 py-1.5 rounded-full text-gray-300 border border-white/10 bg-white/5">
                    {exp.period}
                  </span>
                </div>
                <ul className="space-y-2.5 text-sm text-gray-300 font-light leading-relaxed">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">›</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </PremiumCard>
            ))}
          </div>
        </section>

        {/* Projects Section */}
<section
  id="projects"
  className="max-w-5xl mx-auto px-4 py-24 z-10 relative"
>
  <div className="flex items-end justify-between mb-12">
    <div>
      <p className="text-xs font-mono tracking-[0.3em] uppercase text-purple-400 mb-3">
        Selected Work
      </p>

      <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
        Featured Projects
      </h2>
    </div>

    <Code2
      className="text-purple-400 hidden md:block"
      size={28}
    />
  </div>

  <div className="grid gap-6">
    {portfolioData.projects.map((p, idx) => {

      // Microcosm website
      const projectLink =
        p.title?.toLowerCase().includes("microcosm")
          ? "https://microcosm2025.github.io/Website/"
          : p.link;

      const ProjectContent = (
        <>
          {/* Project number */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-mono text-purple-400">
              PROJECT / {String(idx + 1).padStart(2, "0")}
            </span>

            <span className="text-xs font-mono text-gray-500 border border-white/10 px-3 py-1 rounded-full">
              {p.institution}
            </span>
          </div>

          {/* Title */}
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-purple-300 transition-colors">
              {p.title}
            </h3>

            {projectLink && (
              <ExternalLink
                size={18}
                className="text-gray-600 group-hover:text-purple-400 transition-all group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            )}
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm md:text-base mb-7 leading-7 max-w-3xl">
            {p.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {p.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs font-mono px-3 py-1.5 rounded-full text-gray-300 bg-white/[0.03] border border-white/[0.08] group-hover:border-purple-500/30 group-hover:text-purple-300 transition-all"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* View Project */}
          {projectLink && (
            <div className="mt-8 pt-5 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-[0.2em] text-gray-600 uppercase">
                View Project
              </span>

              <span className="text-xs text-gray-400 group-hover:text-white transition-colors">
                Explore →
              </span>
            </div>
          )}
        </>
      );

      return projectLink ? (
        <a
          key={idx}
          href={projectLink}
          target="_blank"
          rel="noopener noreferrer"
          className="project-card group block"
        >
          {ProjectContent}
        </a>
      ) : (
        <div
          key={idx}
          className="project-card group"
        >
          {ProjectContent}
        </div>
      );
    })}
  </div>
</section>

        {/* Certifications Section */}
        <section id="certifications" className="max-w-4xl mx-auto px-4 py-16 z-10 relative">
          <h2 className="text-3xl font-bold text-center mb-12 tracking-tight">
            Certifications & Milestones
          </h2>
          <PremiumCard>
            <div className="grid sm:grid-cols-2 gap-4">
              {portfolioData.certifications.map((cert, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                  className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10 transition-all cursor-default group"
                >
                  <Award
                    className="text-purple-400 shrink-0 group-hover:scale-110 transition-transform"
                    size={22}
                  />
                  <span className="text-sm text-gray-200 font-medium">{cert}</span>
                </motion.div>
              ))}
            </div>
          </PremiumCard>
        </section>

        {/* Contact Section */}
        <section id="contact" className="max-w-2xl mx-auto px-4 py-16 text-center z-10 relative">
          <PremiumCard>
            <div className="inline-flex p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 mb-6">
              <Mail size={24} />
            </div>
            <h2 className="text-3xl font-bold mb-4 tracking-tight">Get In Touch</h2>
            <p className="text-gray-400 text-sm mb-8 font-light">
              Open for opportunities in Full-Stack Web Engineering, Cybersecurity, and AI Workflows.
            </p>
            <MagneticButton
              href={`mailto:${portfolioData.email}`}
              className="inline-flex items-center gap-2 px-9 py-4 rounded-full bg-white text-black font-semibold text-sm transition-all duration-300 cursor-pointer hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-105"
            >
              Contact Me <ArrowUpRight size={18} />
            </MagneticButton>
          </PremiumCard>
        </section>

        {/* Footer */}
        <footer className="relative z-10 text-center py-8 border-t border-white/5 mt-8">
          <p className="text-xs text-gray-500 font-mono tracking-wide">
            © {new Date().getFullYear()} {portfolioData.name} — Built with React & Framer Motion
          </p>
        </footer>
      </div>
    </>
  );
}