import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    let animationFrameId;
    let mouseX = -100;
    let mouseY = -100;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Check hover state without triggering React useState
      const target = e.target;
      const isClickable = !!target.closest('a, button, [role="button"], .cursor-pointer');

      if (cursorRef.current) {
        if (isClickable) {
          cursorRef.current.classList.add('scale-150', 'bg-purple-500/20', 'border-purple-400');
        } else {
          cursorRef.current.classList.remove('scale-150', 'bg-purple-500/20', 'border-purple-400');
        }
      }
    };

    // GPU-accelerated frame update loop
    const render = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    render();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] w-6 h-6 rounded-full border border-purple-400/80 bg-purple-500/10 backdrop-blur-[1px] transition-transform duration-75 ease-out will-change-transform"
      style={{
        transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
      }}
    />
  );
}