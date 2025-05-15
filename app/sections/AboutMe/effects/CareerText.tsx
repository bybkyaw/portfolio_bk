'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CareerText: React.FC = () => {
  const lettersRef = useRef<HTMLSpanElement[]>([]);
  const floatRef = useRef<HTMLDivElement>(null);

  const text = 'Frontend Developer';
  const chars = text.split('');

  useEffect(() => {
    // Per-letter glow animation
    const animateLetters = () => {
      const tl = gsap.timeline();
      lettersRef.current.forEach((el, index) => {
        if (!el) return;
        const delay = index * 0.1;
        tl.to(
          el,
          {
            color: '#f5f5f5',
            textShadow: '0px 0px 6px rgba(255,255,255,0.6)',
            duration: 0.2,
            ease: 'power1.out',
          },
          delay
        ).to(
          el,
          {
            color: '#9ca3af',
            textShadow: '0px 0px 0px transparent',
            duration: 0.2,
            ease: 'power1.in',
          },
          delay + 0.2
        );
      });
    };

    animateLetters();
    const interval = setInterval(animateLetters, 7000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Boat-like floating animation (X + Y)
    if (!floatRef.current) return;

    gsap.to(floatRef.current, {
      x: 10,
      y: -6,
      duration: 2.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
  }, []);

  return (
    <div ref={floatRef} className="whitespace-nowrap overflow-hidden px-4">
      <span className="text-gray-400 text-[5vw] sm:text-4xl tracking-widest inline-block">
        {chars.map((char, idx) => (
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

export default CareerText;


// 'use client';

// import { useEffect, useRef } from 'react';
// import gsap from 'gsap';

// const CareerText: React.FC = () => {
//   const lettersRef = useRef<HTMLSpanElement[]>([]);
//   const floatRef = useRef<HTMLDivElement>(null);

//   const text = 'Frontend Developer';
//   const chars = text.split('');

//   useEffect(() => {
//     // Per-letter glow animation
//     const animateLetters = () => {
//       const tl = gsap.timeline();
//       lettersRef.current.forEach((el, index) => {
//         if (!el) return;
//         const delay = index * 0.1;
//         tl.to(
//           el,
//           {
//             color: '#f5f5f5',
//             textShadow: '0px 0px 6px rgba(255,255,255,0.6)',
//             duration: 0.2,
//             ease: 'power1.out',
//           },
//           delay
//         ).to(
//           el,
//           {
//             color: '#9ca3af',
//             textShadow: '0px 0px 0px transparent',
//             duration: 0.2,
//             ease: 'power1.in',
//           },
//           delay + 0.2
//         );
//       });
//     };

//     animateLetters();
//     const interval = setInterval(animateLetters, 7000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     // Floating animation
//     if (!floatRef.current) return;

//     gsap.to(floatRef.current, {
//       y: -12,
//       duration: 2.5,
//       ease: 'sine.inOut',
//       repeat: -1,
//       yoyo: true,
//     });
//   }, []);

//   return (
//     <div ref={floatRef} className="whitespace-nowrap overflow-hidden px-4">
//       <span className="text-gray-400 text-[5vw] sm:text-4xl tracking-widest inline-block">
//         {chars.map((char, idx) => (
//           <span
//             key={idx}
//             ref={(el) => {
//               if (el) lettersRef.current[idx] = el;
//             }}
//             className="inline-block"
//           >
//             {char}
//           </span>
//         ))}
//       </span>
//     </div>
//   );
// };

// export default CareerText;


// 'use client';

// import { useEffect, useRef } from 'react';
// import gsap from 'gsap';

// const CareerText: React.FC = () => {
//   const lettersRef = useRef<HTMLSpanElement[]>([]);

//   const text = 'Frontend Developer';
//   const chars = text.split('');

//   useEffect(() => {
//     const animateLetters = () => {
//       const tl = gsap.timeline();

//       lettersRef.current.forEach((el, index) => {
//         if (!el) return;
//         const delay = index * 0.1;

//         tl.to(
//           el,
//           {
//             color: '#f5f5f5',
//             textShadow: '0px 0px 6px rgba(255,255,255,0.6)',
//             duration: 0.2,
//             ease: 'power1.out',
//           },
//           delay
//         ).to(
//           el,
//           {
//             color: '#9ca3af',
//             textShadow: '0px 0px 0px transparent',
//             duration: 0.2,
//             ease: 'power1.in',
//           },
//           delay + 0.2
//         );
//       });
//     };

//     animateLetters();
//     const interval = setInterval(animateLetters, 7000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="whitespace-nowrap overflow-hidden px-4">
//       <span className="text-gray-400 text-[5vw] sm:text-4xl tracking-widest inline-block">
//         {chars.map((char, idx) => (
//           <span
//             key={idx}
//             ref={(el) => {
//               if (el) lettersRef.current[idx] = el;
//             }}
//             className="inline-block"
//           >
//             {char}
//           </span>
//         ))}
//       </span>
//     </div>
//   );
// };

// export default CareerText;


// 'use client';

// import { useEffect, useRef } from 'react';
// import gsap from 'gsap';

// const CareerText: React.FC = () => {
//   const lettersRef = useRef<HTMLSpanElement[]>([]);

//   const text = 'Frontend Developer';
//   const chars = text.split('');

//   useEffect(() => {
//     const animateLetters = () => {
//       const tl = gsap.timeline();

//       lettersRef.current.forEach((el, index) => {
//         if (!el) return;

//         const delay = index * 0.1;

//         tl.to(
//           el,
//           {
//             color: '#f5f5f5',
//             textShadow: '0px 0px 6px rgba(255,255,255,0.6)',
//             duration: 0.2,
//             ease: 'power1.out',
//           },
//           delay
//         ).to(
//           el,
//           {
//             color: '#9ca3af',
//             textShadow: '0px 0px 0px transparent',
//             duration: 0.2,
//             ease: 'power1.in',
//           },
//           delay + 0.2
//         );
//       });
//     };

//     animateLetters();
//     const interval = setInterval(animateLetters, 7000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="whitespace-nowrap overflow-hidden">
//       <span className="text-gray-400 text-5xl tracking-widest inline-block">
//         {chars.map((char, idx) => (
//           <span
//             key={idx}
//             ref={(el) => {
//               if (el) lettersRef.current[idx] = el;
//             }}
//             className="inline-block"
//           >
//             {char}
//           </span>
//         ))}
//       </span>
//     </div>
//   );
// };

// export default CareerText;


// 'use client';

// import { useEffect, useRef } from 'react';
// import gsap from 'gsap';

// const CareerText: React.FC = () => {
//   const lettersRef = useRef<HTMLSpanElement[]>([]);

//   const text = 'Frontend Developer';
//   const chars = text.split('');

//   const glowDuration = 0.2;
//   const delayBetween = 0.1;
//   const intervalMs = 7000;

//   useEffect(() => {
//     const animateLetters = () => {
//       const tl = gsap.timeline();
//       lettersRef.current.forEach((el, index) => {
//         if (!el) return;

//         const delay = index * delayBetween;

//         tl.to(
//           el,
//           {
//             color: '#f5f5f5',
//             textShadow: '0px 0px 6px rgba(255,255,255,0.6)',
//             duration: glowDuration,
//             ease: 'power1.out',
//           },
//           delay
//         ).to(
//           el,
//           {
//             color: '#9ca3af',
//             textShadow: '0px 0px 0px transparent',
//             duration: glowDuration,
//             ease: 'power1.in',
//           },
//           delay + glowDuration
//         );
//       });
//     };

//     const interval = setInterval(animateLetters, intervalMs);
//     animateLetters(); // Initial run

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="absolute bottom-[-10vh] left-[10vw] z-10">
//       <span className="text-5xl tracking-widest text-gray-400">
//         {chars.map((char, idx) => (
//           <span
//             key={idx}
//             ref={(el) => {
//               if (el) lettersRef.current[idx] = el;
//             }}
//             className="inline-block"
//           >
//             {char}
//           </span>
//         ))}
//       </span>
//     </div>
//   );
// };

// export default CareerText;


// 'use client';

// import { useEffect, useRef } from 'react';
// import gsap from 'gsap';

// const CareerText: React.FC = () => {
//   const lettersRef = useRef<HTMLSpanElement[]>([]);

//   useEffect(() => {
//     const animateLetters = () => {
//       const tl = gsap.timeline();

//       lettersRef.current.forEach((el, index) => {
//         tl.to(
//           el,
//           {
//             color: '#f5f5f5',
//             textShadow: '0px 0px 6px rgba(255,255,255,0.6)',
//             duration: 0.2,
//             ease: 'power1.out',
//           },
//           index * 0.1
//         ).to(
//           el,
//           {
//             color: '#9ca3af', // Tailwind gray-400
//             textShadow: '0px 0px 0px transparent',
//             duration: 0.2,
//             ease: 'power1.in',
//           },
//           index * 0.1 + 0.2
//         );
//       });
//     };

//     const interval = setInterval(() => {
//       animateLetters();
//     }, 7000); // every 5 seconds

//     animateLetters(); // run immediately on mount

//     return () => clearInterval(interval);
//   }, []);

//   const text = 'Frontend Developer';

//   return (
//     <div className="absolute bottom-[-10vh] left-[10vw] z-10">
//       <span className="text-5xl tracking-widest text-gray-400">
//         {text.split('').map((char, idx) => (
//           <span
//             key={idx}
//             ref={(el) => {
//               if (el) lettersRef.current[idx] = el;
//             }}
//             className="inline-block"
//           >
//             {char}
//           </span>
//         ))}
//       </span>
//     </div>
//   );
// };

// export default CareerText;
