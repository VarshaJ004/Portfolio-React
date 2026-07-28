import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Award, ExternalLink, Terminal, Sparkles, Code2, Briefcase, User } from 'lucide-react';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Preloader from './components/Preloader';
import MagneticButton from './components/MagneticButton';
import { portfolioData } from './data/portfolioData';

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

    const particles = Array.from({ length: 65 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 1.8 + 0.5,
    }));

    let mouse = { x: null, y: null, radius: 150 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

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
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-60" />;
};

// Premium Card with 3D Tilt Effect & Dynamic Spotlight
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

// Studio Interactive Kinetic Typography Title
const StudioTitle = ({ firstName = 'VARSHA', lastName = 'JOHNSON' }) => {
  const firstLetters = firstName.split('');
  const lastLetters = lastName.split('');

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-5 my-6 select-none cursor-default">
      <div className="flex tracking-wider">
        {firstLetters.map((char, index) => (
          <motion.span
            key={index}
            whileHover={{ scale: 1.2, color: '#ffffff', y: -8, rotate: Math.random() * 8 - 4 }}
            transition={{ type: 'spring', stiffness: 350, damping: 12 }}
            className="text-5xl sm:text-7xl md:text-8xl font-extralight tracking-[0.18em] text-gray-300 uppercase inline-block transition-colors duration-200"
          >
            {char}
          </motion.span>
        ))}
      </div>

      <div className="flex tracking-tight">
        {lastLetters.map((char, index) => (
          <motion.span
            key={index}
            whileHover={{ scale: 1.25, color: '#a855f7', y: -8, rotate: Math.random() * -8 + 4 }}
            transition={{ type: 'spring', stiffness: 350, damping: 12 }}
            className="text-5xl sm:text-7xl md:text-8xl font-black tracking-normal text-white uppercase inline-block drop-shadow-[0_0_35px_rgba(255,255,255,0.4)] transition-colors duration-200"
          >
            {char}
          </motion.span>
        ))}
      </div>
    </div>
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

        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-24 px-4 text-center z-10">
          <div className="max-w-5xl flex flex-col items-center">
            
            {/* Status Badge */}
           
            {/* Typography Name Header */}
            <StudioTitle firstName="VARSHA" lastName="JOHNSON" />

            {/* Subtitle / Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed mb-10 tracking-wide"
            >
              {portfolioData.summary}
            </motion.p>

            {/* Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex flex-wrap items-center justify-center gap-5 mb-12"
            >
              <MagneticButton
                href="#projects"
                className="px-8 py-3.5 rounded-full bg-white text-black font-semibold text-sm flex items-center gap-2 transition-all duration-300 cursor-pointer hover:bg-gray-100 hover:shadow-[0_0_35px_rgba(255,255,255,0.4)] hover:scale-105"
              >
                View My Work <ArrowRight size={16} />
              </MagneticButton>

              <MagneticButton
                href="#contact"
                className="px-8 py-3.5 rounded-full border border-white/20 text-white font-medium text-sm transition-all duration-300 bg-white/5 cursor-pointer hover:bg-white/10 hover:border-white/50 hover:scale-105"
              >
                Contact Me
              </MagneticButton>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="max-w-4xl mx-auto px-4 py-24 z-10 relative">
          <PremiumCard>
            <div className="flex items-center gap-3 mb-6">
              <User className="text-purple-400" size={22} />
              <h2 className="text-2xl font-bold text-white tracking-wide">About Me</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 font-light text-base">{portfolioData.about.whoIAm}</p>
            <p className="text-gray-300 leading-relaxed mb-6 font-light text-base">{portfolioData.about.whatIDo}</p>
            {portfolioData.hobbyWebsite && (
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between flex-wrap gap-3">
                <span className="text-xs text-gray-400 font-mono">Personal Writing & Novel Showcase</span>
                <a
                  href={portfolioData.hobbyWebsite}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-white font-medium flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-purple-500 hover:bg-purple-500/10 transition-all group"
                >
                  Tales Under a Thengu 
                  <ExternalLink size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            )}
          </PremiumCard>
        </section>

        {/* Skills Continuous Marquee */}
        <section id="skills" className="py-20 relative overflow-hidden z-10">
          <div className="text-center mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-300 border border-purple-500/30 px-5 py-2 rounded-full bg-purple-500/10 inline-flex items-center gap-2">
              <Sparkles size={14} /> Technical Stack
            </span>
          </div>

          <div className="flex w-full overflow-hidden select-none py-4">
            <motion.div
              className="flex gap-6 whitespace-nowrap min-w-full"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ repeat: Infinity, ease: 'linear', duration: 24 }}
            >
              {duplicatedSkills.map((skill, index) => (
                <div
                  key={index}
                  className="premium-card px-8 py-4 rounded-2xl flex items-center justify-center min-w-[160px] border border-white/10 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all"
                >
                  <span className="text-gray-200 font-medium text-sm tracking-wide">{skill}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="max-w-4xl mx-auto px-4 py-24 z-10 relative">
          <div className="flex items-center justify-center gap-3 mb-16">
            <Briefcase className="text-purple-400" size={28} />
            <h2 className="text-3xl font-bold tracking-tight">Experience & Leadership</h2>
          </div>
          <div className="space-y-8">
            {portfolioData.experience.map((exp, idx) => (
              <PremiumCard key={idx}>
                <div className="flex justify-between items-start flex-wrap gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-wide">{exp.title}</h3>
                    <p className="text-sm text-purple-400 font-mono mt-0.5">{exp.organization}</p>
                  </div>
                  <span className="text-xs font-mono px-3.5 py-1.5 rounded-full text-gray-300 border border-white/10 bg-white/5">{exp.period}</span>
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
        <section id="projects" className="max-w-4xl mx-auto px-4 py-24 z-10 relative">
          <div className="flex items-center justify-center gap-3 mb-16">
            <Code2 className="text-purple-400" size={28} />
            <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
          </div>
          <div className="grid gap-8">
            {portfolioData.projects.map((p, idx) => (
              <PremiumCard key={idx}>
                <div className="flex justify-between items-start mb-3 flex-wrap gap-2">
                  <h3 className="text-2xl font-bold tracking-wide text-white group-hover:text-purple-300 transition-colors">{p.title}</h3>
                  <span className="text-xs font-mono text-gray-400 border border-white/10 px-3 py-1 rounded-full bg-white/5">{p.institution}</span>
                </div>
                <p className="text-gray-300 text-sm mb-6 leading-relaxed font-light">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((tag, i) => (
                    <span key={i} className="text-xs font-mono bg-purple-500/10 border border-purple-500/20 px-3 py-1.5 rounded-full text-purple-300">
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
            <div className="grid sm:grid-cols-2 gap-4">
              {portfolioData.certifications.map((cert, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                  className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10 transition-all cursor-default group"
                >
                  <Award className="text-purple-400 shrink-0 group-hover:scale-110 transition-transform" size={22} />
                  <span className="text-sm text-gray-200 font-medium">{cert}</span>
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
              className="inline-flex items-center gap-2 px-9 py-4 rounded-full bg-white text-black font-semibold text-sm transition-all duration-300 cursor-pointer hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-105"
            >
              Contact Me <ArrowUpRight size={18} />
            </MagneticButton>
          </PremiumCard>
        </section>

        {/* Footer */}
        <footer className="relative z-10 text-center py-10 border-t border-white/5 mt-10">
          <p className="text-xs text-gray-500 font-mono tracking-wide">
            © {new Date().getFullYear()} {portfolioData.name} — Built with React & Framer Motion
          </p>
        </footer>
      </div>
    </>
  );
}