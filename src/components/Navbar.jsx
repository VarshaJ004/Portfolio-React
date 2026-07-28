import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'HOME', href: '#home' },
  { name: 'ABOUT', href: '#about' },
  { name: 'SKILLS', href: '#skills' },
  { name: 'EXPERIENCE', href: '#experience' },
  { name: 'PROJECTS', href: '#projects' },
  { name: 'CERTIFICATIONS', href: '#certifications' },
  { name: 'CONTACT', href: '#contact' },
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState('HOME');
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Hide navbar on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Scroll-spy: highlight the section currently in view
  useEffect(() => {
    const sections = navItems.map((item) => document.querySelector(item.href));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = navItems.find((item) => item.href === `#${entry.target.id}`);
            if (match) setActiveTab(match.name);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    sections.forEach((sec) => sec && observer.observe(sec));
    return () => sections.forEach((sec) => sec && observer.unobserve(sec));
  }, []);

  return (
    <motion.div
      animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[95vw]"
    >
      <nav className="nav-capsule px-3 py-2 rounded-full flex items-center justify-center gap-1 sm:gap-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.name;
          return (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setActiveTab(item.name)}
              className="relative px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs font-medium tracking-wider text-gray-300 hover:text-white transition-colors uppercase select-none"
            >
              {isActive && (
                <motion.div
                  layoutId="activePill"
                  className="absolute inset-0 bg-white/10 rounded-full border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.name}</span>
            </a>
          );
        })}
      </nav>
    </motion.div>
  );
}