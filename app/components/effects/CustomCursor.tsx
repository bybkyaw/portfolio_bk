'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor: React.FC = () => {
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const pulseTween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const cursorRing = cursorRingRef.current;
    const glow = glowRef.current;

    if (!cursorRing || !glow) return;

    gsap.set(cursorRing, { xPercent: -50, yPercent: -50 });
    gsap.set(glow, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(cursorRing, 'x', { duration: 0.4, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursorRing, 'y', { duration: 0.4, ease: 'power3.out' });

    const glowXTo = gsap.quickTo(glow, 'x', { duration: 0.4, ease: 'power3.out' });
    const glowYTo = gsap.quickTo(glow, 'y', { duration: 0.4, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      xTo(x);
      yTo(y);
      glowXTo(x);
      glowYTo(y);

      // ✅ Sync the logo reveal mask
      document.documentElement.style.setProperty('--x', `${x}px`);
      document.documentElement.style.setProperty('--y', `${y}px`);
    };

    pulseTween.current = gsap.to(glow, {
      scale: 1.05,
      opacity: 0.6,
      duration: 1.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      pulseTween.current?.kill();
    };
  }, []);

  return (
    <>
      <div
        ref={glowRef}
        className="fixed w-[640px] h-[800px] rounded-full pointer-events-none z-40"
        style={{
          background: 'radial-gradient(circle, rgba(181,181,123,0.35) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(80px)',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <div
        ref={cursorRingRef}
        className="fixed w-[60px] h-[60px] rounded-full border border-white pointer-events-none z-[99999] mix-blend-difference"
        style={{
          boxShadow: '0 0 16px rgba(255, 255, 255, 0.3)',
          backgroundColor: 'transparent',
        }}
      />
    </>
  );
};

export default CustomCursor;


// 'use client';

// import React, { useEffect, useRef } from 'react';
// import gsap from 'gsap';

// const CustomCursor: React.FC = () => {
//   const cursorRingRef = useRef<HTMLDivElement>(null);
//   const glowRef = useRef<HTMLDivElement>(null);
//   const pulseTween = useRef<gsap.core.Tween | null>(null);

//   useEffect(() => {
//     const cursorRing = cursorRingRef.current;
//     const glow = glowRef.current;

//     if (!cursorRing || !glow) return;

//     gsap.set(cursorRing, { xPercent: -50, yPercent: -50 });
//     gsap.set(glow, { xPercent: -50, yPercent: -50 });

//     const xTo = gsap.quickTo(cursorRing, 'x', { duration: 0.8, ease: 'power3.out' });
//     const yTo = gsap.quickTo(cursorRing, 'y', { duration: 0.8, ease: 'power3.out' });

//     const glowXTo = gsap.quickTo(glow, 'x', { duration: 0.8, ease: 'power3.out' });
//     const glowYTo = gsap.quickTo(glow, 'y', { duration: 0.8, ease: 'power3.out' });

//     const handleMouseMove = (e: MouseEvent) => {
//       const { clientX: x, clientY: y } = e;
//       xTo(x);
//       yTo(y);
//       glowXTo(x);
//       glowYTo(y);
//     };

//     // Start pulse effect
//     pulseTween.current = gsap.to(glow, {
//       scale: 1.05,
//       opacity: 0.55,
//       duration: 1.5,
//       ease: 'sine.inOut',
//       repeat: -1,
//       yoyo: true,
//     });

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       pulseTween.current?.kill();
//     };
//   }, []);

//   return (
//     <>
//       {/* Glowing Light Behind Circle */}
//       <div
//         ref={glowRef}
//         className="fixed w-[640px] h-[800px] rounded-full pointer-events-none z-40"
//         style={{
//           background: 'radial-gradient(circle, rgba(181,181,123,0.35) 0%, rgba(0,0,0,0) 70%)',
//           filter: 'blur(80px)',
//           transform: 'translate(-50%, -50%)',
//         }}
//       />

//       {/* White Ring Follower */}
//       <div
//         ref={cursorRingRef}
//         className="fixed w-[60px] h-[60px] rounded-full border border-white pointer-events-none z-[99999] mix-blend-difference"
//         style={{
//           boxShadow: '0 0 16px rgba(255, 255, 255, 0.3)',
//           backgroundColor: 'transparent',
//         }}
//       />
//     </>
//   );
// };

// export default CustomCursor;


