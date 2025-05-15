// section/AboutMe/Message.tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const messages = [
  'MUSIC FILLS THE AIR',
  'AND SURROUNDS US',
  'EVERYWHERE.',
];

const Message: React.FC = () => {
  const linesRef = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    linesRef.current.forEach((el, i) => {
      if (!el) return;

      gsap.fromTo(
        el,
        { x: -100, opacity: 0, filter: 'blur(12px)' },
        {
          x: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.5,
          delay: i * 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, []);

  return (
    <section className="relative flex items-center justify-center h-screen bg-white text-black overflow-hidden">
      <div className="text-center space-y-6">
        {messages.map((text, index) => (
          <p
            key={index}
            ref={(el) => {linesRef.current[index] = el;}}

            className="text-4xl md:text-5xl font-light tracking-wide"
          >
            {text}
          </p>
        ))}
      </div>

      {/* Optional: noise overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.08] mix-blend-multiply" />
    </section>
  );
};

export default Message;
