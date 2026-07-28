import React from 'react';
import { motion } from 'framer-motion';

export default function GirlLogoAvatar({ size = 180 }) {
  return (
    <div 
      className="relative flex items-center justify-center select-none cursor-pointer group"
      style={{ width: size, height: size }}
    >
      {/* 1. Outer Rotating Studio Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        className="absolute inset-0 rounded-full border border-dashed border-white/40 shadow-[0_0_25px_rgba(255,255,255,0.25)]"
      />

      {/* 2. Glassmorphic Circular Frame */}
      <div className="absolute inset-2 rounded-full border border-white/20 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-md" />

      {/* 3. Masked Inner Badge Container */}
      <div className="absolute inset-3.5 rounded-full overflow-hidden flex items-center justify-center bg-[#18161b]">
        
        {/* Warm Ambient Radial Glow (Matching image lighting) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(247,212,186,0.25),_rgba(20,16,22,0.85))]" />

        {/* 4. Animated Custom Vector Avatar */}
        <motion.svg
          viewBox="0 0 160 160"
          className="w-[95%] h-[95%] relative z-10 translate-y-1"
          animate={{
            y: [0, -2, 0, 1.5, 0],
            rotate: [0, -1, 0, 1, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.3 }
          }}
        >
          <defs>
            {/* Subtle Drop Shadows */}
            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.25" />
            </filter>
            
            {/* Skin Gradient for smooth depth */}
            <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fadbcf" />
              <stop offset="100%" stopColor="#e8b19a" />
            </linearGradient>

            {/* Dark Hair Gradient */}
            <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2c2423" />
              <stop offset="50%" stopColor="#1a1515" />
              <stop offset="100%" stopColor="#0f0c0d" />
            </linearGradient>
          </defs>

          {/* BACK HAIR (Flowing volume behind shoulders) */}
          <motion.path
            d="M 40,50 C 20,65 15,110 30,145 C 50,155 110,155 130,145 C 145,110 140,65 120,50 C 100,20 60,20 40,50 Z"
            fill="url(#hairGrad)"
            filter="url(#softShadow)"
            animate={{
              d: [
                "M 40,50 C 20,65 15,110 30,145 C 50,155 110,155 130,145 C 145,110 140,65 120,50 C 100,20 60,20 40,50 Z",
                "M 40,50 C 18,65 17,110 32,145 C 50,155 110,155 128,145 C 143,110 142,65 120,50 C 100,20 60,20 40,50 Z",
                "M 40,50 C 20,65 15,110 30,145 C 50,155 110,155 130,145 C 145,110 140,65 120,50 C 100,20 60,20 40,50 Z"
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* NECK & CHEST AREA */}
          <path d="M 72,82 L 88,82 L 88,102 L 72,102 Z" fill="url(#skinGrad)" />
          {/* Neck Shadow */}
          <path d="M 72,82 C 78,88 82,88 88,82 L 88,88 C 80,94 76,92 72,88 Z" fill="#d4927b" opacity="0.6" />

          {/* PENDANT NECKLACE */}
          <path d="M 73,92 Q 80,102 87,92" fill="none" stroke="#d4af37" strokeWidth="0.8" />
          <circle cx="80" cy="99" r="1.5" fill="#fef3c7" stroke="#d4af37" strokeWidth="0.5" />

          {/* DARK FORMAL SHIRT / SUIT JACKET */}
          <g>
            {/* Main Torso Body */}
            <path d="M 45,120 C 50,102 68,100 80,100 C 92,100 110,102 115,120 L 120,160 L 40,160 Z" fill="#231f20" />
            
            {/* Lapels & V-Neck Opening */}
            <path d="M 70,100 L 80,122 L 90,100 L 85,100 L 80,112 L 75,100 Z" fill="#151213" />
            <path d="M 68,100 L 80,128 L 92,100" fill="none" stroke="#383133" strokeWidth="1.5" />
            
            {/* Cross-arm / Waist Belt Silhouette Detail */}
            <path d="M 55,145 L 105,145" stroke="#121011" strokeWidth="6" />
            <rect x="74" y="141" width="12" height="8" rx="1" fill="none" stroke="#9ca3af" strokeWidth="1.2" />
          </g>

          {/* HEAD & FACE STRUCTURE */}
          <g>
            {/* Face Oval (Tilted Angle) */}
            <path
              d="M 54,58 C 50,38 98,32 104,56 C 108,78 92,92 80,92 C 68,92 56,76 54,58 Z"
              fill="url(#skinGrad)"
            />
            {/* Cheek Blush */}
            <ellipse cx="64" cy="68" rx="6" ry="3.5" fill="#e87a7a" opacity="0.3" />
            <ellipse cx="94" cy="65" rx="5" ry="3" fill="#e87a7a" opacity="0.25" />
          </g>

          {/* FACIAL FEATURES */}
          <g>
            {/* Left Brow */}
            <path d="M 56,48 Q 66,42 74,47" fill="none" stroke="#231f20" strokeWidth="2" strokeLinecap="round" />
            {/* Right Brow (Slightly raised - thoughtful expression) */}
            <path d="M 84,45 Q 92,40 100,47" fill="none" stroke="#231f20" strokeWidth="2" strokeLinecap="round" />

            {/* Left Eye */}
            <g>
              <ellipse cx="66" cy="56" rx="5.5" ry="6" fill="#281a14" />
              <ellipse cx="65" cy="56" rx="4.5" ry="5" fill="#4a2e22" />
              <circle cx="67.5" cy="53.5" r="1.8" fill="#ffffff" />
              <path d="M 59,54 Q 66,49 73,55" fill="none" stroke="#181515" strokeWidth="1.8" strokeLinecap="round" />
            </g>

            {/* Right Eye (Looking Upward/Right) */}
            <g>
              <ellipse cx="91" cy="54" rx="5.5" ry="6" fill="#281a14" />
              <ellipse cx="90" cy="54" rx="4.5" ry="5" fill="#4a2e22" />
              <circle cx="92.5" cy="51.5" r="1.8" fill="#ffffff" />
              <path d="M 84,52 Q 91,47 98,53" fill="none" stroke="#181515" strokeWidth="1.8" strokeLinecap="round" />
            </g>

            {/* Blinking Eyelids Animation */}
            <motion.rect
              x="58" y="48" width="16" height="12" fill="#fadbcf"
              animate={{ scaleY: [0, 1, 0] }}
              transition={{ repeat: Infinity, repeatDelay: 3.8, duration: 0.14 }}
            />
            <motion.rect
              x="83" y="46" width="16" height="12" fill="#fadbcf"
              animate={{ scaleY: [0, 1, 0] }}
              transition={{ repeat: Infinity, repeatDelay: 3.8, duration: 0.14 }}
            />

            {/* Nose */}
            <path d="M 78,56 Q 81,64 77,66" fill="none" stroke="#d4927b" strokeWidth="1.4" strokeLinecap="round" />

            {/* Soft Smirking Mouth */}
            <path d="M 72,74 Q 80,78 87,73" fill="none" stroke="#a34848" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* FRONT STYLED HAIR (Side Part & Voluminous Waves) */}
          <g filter="url(#softShadow)">
            {/* Top Voluminous Wave */}
            <path
              d="M 52,48 C 50,22 85,15 105,30 C 118,40 128,68 126,90 C 122,110 108,128 106,132 C 102,110 114,80 106,55 C 98,35 68,32 52,48 Z"
              fill="url(#hairGrad)"
            />
            {/* Left Side Framing Strand */}
            <motion.path
              d="M 54,45 C 40,55 32,80 35,115 C 38,125 45,135 42,142 C 36,128 30,100 42,70 C 48,55 52,48 54,45 Z"
              fill="url(#hairGrad)"
              animate={{
                d: [
                  "M 54,45 C 40,55 32,80 35,115 C 38,125 45,135 42,142 C 36,128 30,100 42,70 C 48,55 52,48 54,45 Z",
                  "M 54,45 C 38,55 30,80 33,115 C 36,125 43,135 40,142 C 34,128 28,100 40,70 C 46,55 52,48 54,45 Z",
                  "M 54,45 C 40,55 32,80 35,115 C 38,125 45,135 42,142 C 36,128 30,100 42,70 C 48,55 52,48 54,45 Z"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </g>

          {/* THINKING POSE (Hand touching cheek/chin with subtle animation) */}
          <motion.g
            animate={{
              y: [0, -1, 0, 1, 0],
              rotate: [0, 1, 0, -1, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Arm Sleeves / Forearm */}
            <path d="M 68,135 L 63,98 L 72,98 L 78,135 Z" fill="#231f20" />
            
            {/* Index Finger Extended to Chin */}
            <path d="M 65,98 C 64,88 65,72 68,68 C 70,66 73,67 72,72 C 70,78 70,88 71,98 Z" fill="url(#skinGrad)" />
            
            {/* Folded Fingers & Hand Base */}
            <path d="M 61,96 C 58,92 62,84 66,84 C 69,84 70,88 70,96 Z" fill="#e8b19a" />
            <path d="M 59,98 C 55,95 59,88 63,88 C 66,88 68,92 68,98 Z" fill="#d4927b" />
          </motion.g>

        </motion.svg>
      </div>
    </div>
  );
}