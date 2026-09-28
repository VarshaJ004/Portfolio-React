import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

// Custom SVG Icons
const GithubIcon = ({ size = 22, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 22, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const MailIcon = ({ size = 22, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#030304] text-white flex flex-col justify-between px-6 md:px-12 pt-20 pb-10 overflow-hidden select-none">
      
      {/* Dynamic Animated Glowing Background Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.35, 0.6, 0.35],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-full h-full bg-gradient-to-tr from-purple-700/30 via-purple-500/20 to-indigo-600/30 rounded-full blur-[140px]"
        />
      </div>

      {/* Main Grid: Custom ratio to give extra space to the center Avatar */}
      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.1fr_1.4fr] items-center gap-6 my-auto z-10 relative">
        
        {/* Left Column: Bold Stacked Typography & Info */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-0"
          >
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight leading-[0.9] uppercase text-white">
              HI, I'M
            </h1>
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight leading-[0.9] uppercase text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-400">
              VARSHA
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-1 font-mono text-xs sm:text-sm text-gray-300 tracking-widest uppercase"
          >
            <p>FULL STACK DEVELOPER</p>
            <p>CYBERSECURITY ENTHUSIAST</p>
            <p>AI EXPLORER</p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-400 text-sm max-w-sm leading-relaxed font-light"
          >
            I build digital experiences that are functional, secure and scalable. Always learning, always building.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-5 pt-2 flex-wrap"
          >
            <a
              href="#projects"
              className="group flex items-center gap-3 border border-purple-500/40 bg-purple-950/30 hover:bg-purple-600 text-white text-[11px] font-mono uppercase tracking-widest px-6 py-3 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:shadow-[0_0_35px_rgba(168,85,247,0.5)]"
            >
              EXPLORE MY WORK
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href={portfolioData.resumeUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-gray-300 hover:text-white transition-colors group"
            >
              DOWNLOAD RESUME
              <Download size={15} className="group-hover:translate-y-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Right Column: Large Animated 3D Avatar & Rotating Background Elements */}
        <div className="flex justify-center items-center relative py-4">
          
          {/* Animated Orbit Rings behind image */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] rounded-full border border-purple-500/10 border-dashed pointer-events-none"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-full border border-indigo-500/10 pointer-events-none"
          />

          {/* Floating Avatar Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [-12, 12, -12],
              rotate: [-1, 1, -1]
            }}
            transition={{
              opacity: { duration: 0.8 },
              scale: { duration: 0.8 },
              y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
            className="relative w-full max-w-[580px] sm:max-w-[650px] aspect-square flex justify-center items-center"
          >
            <img
              src="/avatar.png"
              alt="Varsha 3D Avatar"
              className="w-full h-full object-contain filter drop-shadow-[0_10px_35px_rgba(168,85,247,0.45)] hover:scale-105 transition-transform duration-500 cursor-pointer"
            />
          </motion.div>
        </div>

      </div>

      {/* Bottom Layout Row */}
      <div className="max-w-[1400px] mx-auto w-full flex flex-col sm:flex-row justify-between items-end gap-4 z-10 relative pt-4 border-t border-white/5">
        <div className="hidden sm:block" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full sm:w-auto justify-end">
          <p className="text-gray-400 text-xs font-light max-w-[260px] leading-snug">
            Passionate about building impactful products and securing the digital world.
          </p>

          <div className="flex items-center gap-5">
            <a
              href={portfolioData.github || "https://github.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform"
              aria-label="GitHub"
            >
              <GithubIcon size={20} />
            </a>
            <a
              href={portfolioData.linkedin || "https://linkedin.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={20} />
            </a>
            <a
              href={`mailto:${portfolioData.email || ""}`}
              className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform"
              aria-label="Email"
            >
              <MailIcon size={20} />
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}