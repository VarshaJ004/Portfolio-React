import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(x, springConfig);
  const cursorY = useSpring(y, springConfig);

  const trailX = useSpring(x, { damping: 30, stiffness: 120, mass: 0.8 });
  const trailY = useSpring(y, { damping: 30, stiffness: 120, mass: 0.8 });

  useEffect(() => {
    const moveCursor = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (isHidden) setIsHidden(false);

      const target = e.target;
      const clickable = target.closest('a, button, [role="button"], .cursor-pointer');
      setIsPointer(!!clickable);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [x, y, isHidden]);

  if (isHidden) return null;

  return (
    <>
      {/* Trailing glow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          width: isPointer ? 60 : 36,
          height: isPointer ? 60 : 36,
          background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
        }}
        transition={{ width: { duration: 0.2 }, height: { duration: 0.2 } }}
      />
      {/* Core dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-white mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: isPointer ? 10 : 8,
          height: isPointer ? 10 : 8,
        }}
      />
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-white/40"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isPointer ? 44 : 28,
          height: isPointer ? 44 : 28,
          opacity: isPointer ? 0.8 : 0.4,
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}