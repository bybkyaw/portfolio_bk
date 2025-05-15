'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const ScrollDown: React.FC = () => {
  const lettersRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const animateLetters = () => {
      const tl = gsap.timeline();

      lettersRef.current.forEach((el, index) => {
        tl.to(
          el,
          {
            color: '#f5f5f5',
            textShadow: '0px 0px 6px rgba(255,255,255,0.6)',
            duration: 0.2,
            ease: 'power1.out',
          },
          index * 0.1
        ).to(
          el,
          {
            color: '#9ca3af', // Tailwind gray-400
            textShadow: '0px 0px 0px transparent',
            duration: 0.2,
            ease: 'power1.in',
          },
          index * 0.1 + 0.2
        );
      });
    };

    const interval = setInterval(() => {
      animateLetters();
    }, 7000); // every 5 seconds

    animateLetters(); // run immediately on mount

    return () => clearInterval(interval);
  }, []);

  const text = 'SCROLL DOWN';

  return (
    <div className="absolute bottom-[40vh] left-[20vw] z-10">
      <span className="text-xs tracking-widest text-gray-300 font-mono">
        {text.split('').map((char, idx) => (
          <span
            key={idx}
            ref={(el) => {
              if (el) lettersRef.current[idx] = el;
            }}
            className="inline-block"
          >
            {char}
          </span>
        ))}
      </span>
    </div>
  );
};

export default ScrollDown;
