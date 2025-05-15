'use client';

import React, {
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
} from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import GhostText from '../components/UI/GhostText';
import ScrollDownIndicator from '../components/UI/ScrollDownIndicator';
import MuteUnMute from '../components/musicpoints/MuteUnmute';
import AboutMe from '../sections/AboutMe/AboutMe';

gsap.registerPlugin(ScrollTrigger);

const Note: React.FC = () => {
  const [scrollEnabled, setScrollEnabled] = useState(false);

  const mainRef = useRef<HTMLElement>(null);
  const ghostRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const muteHeaderRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | undefined>(undefined);
  const headerTriggerRef = useRef<ScrollTrigger | undefined>(undefined);

  // Unlock scroll after delay
  useEffect(() => {
    const timer = setTimeout(() => setScrollEnabled(true), 7500);
    return () => clearTimeout(timer);
  }, []);

  // Ghost & Hero animation sequence
  useLayoutEffect(() => {
    if (!ghostRef.current || !heroRef.current || !mainRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ghostRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 2.5,
        pin: true,
      },
    });

    scrollTriggerRef.current = tl.scrollTrigger;

    tl.to(mainRef.current, {
      backgroundColor: '#000000',
      ease: 'power2.inOut',
    }, 0);

    tl.to(ghostRef.current, {
      opacity: 0,
      scale: 0.8,
      y: -100,
      ease: 'power2.out',
    }, 0);

    tl.fromTo(heroRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, ease: 'power2.out', duration: 1.5 },
      0.5
    );

    return () => {
      scrollTriggerRef.current?.kill();
    };
  }, []);

  // Header enter animation
  useEffect(() => {
    if (muteHeaderRef.current) {
      gsap.fromTo(
        muteHeaderRef.current,
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.8, ease: 'power3.out', delay: 0.2 }
      );
    }
  }, []);

  // Header fade in/out on scroll
  useEffect(() => {
    const header = muteHeaderRef.current;
    if (!header) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          gsap.to(header, { opacity: 0, duration: 0.4, ease: 'power2.out' });

          if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
          scrollTimeoutRef.current = setTimeout(() => {
            gsap.to(header, { opacity: 1, duration: 0.6, ease: 'power2.out' });
          }, 300);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Header color and backdrop scroll trigger
  useLayoutEffect(() => {
    const header = muteHeaderRef.current;
    const ghost = ghostRef.current;
    if (!header || !ghost) return;

    const tween = gsap.to(header, {
      backgroundColor: '#000000',
      color: '#ffffff',
      boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
      backdropFilter: 'blur(12px)',
      ease: 'none',
      scrollTrigger: {
        trigger: ghost,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      },
    });

    headerTriggerRef.current = tween.scrollTrigger;

    return () => {
      headerTriggerRef.current?.kill();
    };
  }, []);

  // Scroll locking behavior
  useEffect(() => {
    const preventScroll = (e: Event) => {
      if (!scrollEnabled) e.preventDefault();
    };

    const preventKeys = (e: KeyboardEvent) => {
      if (!scrollEnabled) {
        const keys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Space'];
        if (keys.includes(e.code)) e.preventDefault();
      }
    };

    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('keydown', preventKeys);

    return () => {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventKeys);
    };
  }, [scrollEnabled]);

  return (
    <>
      <MuteUnMute ref={muteHeaderRef} />
      <main
        ref={mainRef}
        className={`w-full min-h-screen overflow-x-hidden ${
          scrollEnabled ? 'overflow-y-scroll' : 'overflow-hidden'
        } snap-y snap-mandatory transition-colors duration-1000`}
        style={{ backgroundColor: '#f5f5f5' }}
      >
        <section
          id="ghost"
          ref={ghostRef}
          className="relative w-full h-screen flex flex-col justify-center items-center snap-start bg-transparent"
        >
          <GhostText />
          {scrollEnabled && <ScrollDownIndicator />}
        </section>

        <section
          id="hero"
          ref={heroRef}
          className="relative w-full h-screen flex justify-center items-center snap-start bg-transparent opacity-0"
        >
          <AboutMe />
        </section>
      </main>
    </>
  );
};

export default Note;


// 'use client';

// import React, { useEffect, useRef, useState } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// import GhostText from '../components/UI/GhostText';
// import ScrollDownIndicator from '../components/UI/ScrollDownIndicator';
// import MuteUnMute from '../components/musicpoints/MuteUnmute';
// import AboutMe from '../sections/AboutMe/AboutMe';

// gsap.registerPlugin(ScrollTrigger);

// const Note: React.FC = () => {
//   const [scrollEnabled, setScrollEnabled] = useState(false);

//   const mainRef = useRef<HTMLElement>(null);
//   const ghostRef = useRef<HTMLElement>(null);
//   const heroRef = useRef<HTMLElement>(null);
//   const muteHeaderRef = useRef<HTMLDivElement>(null);
//   const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
//   const scrollTriggerRef = useRef<ScrollTrigger | undefined>(undefined);
//   const headerTriggerRef = useRef<ScrollTrigger | undefined>(undefined);


//   // Delay scroll unlocking
//   useEffect(() => {
//     const timer = setTimeout(() => setScrollEnabled(true), 7500);
//     return () => clearTimeout(timer);
//   }, []);

//   // Hero + Ghost animation timeline
//   useEffect(() => {
//     if (!ghostRef.current || !heroRef.current || !mainRef.current) return;

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: ghostRef.current,
//         start: 'top top',
//         end: 'bottom top',
//         scrub: 2.5,
//         pin: true,
//       },
//     });

//     scrollTriggerRef.current = tl.scrollTrigger;

//     tl.to(mainRef.current, {
//       backgroundColor: '#000000',
//       ease: 'power2.inOut',
//     }, 0);

//     tl.to(ghostRef.current, {
//       opacity: 0,
//       scale: 0.8,
//       y: -100,
//       ease: 'power2.out',
//     }, 0);

//     tl.fromTo(heroRef.current,
//       { opacity: 0, y: 50 },
//       { opacity: 1, y: 0, ease: 'power2.out', duration: 1.5 },
//       0.5
//     );

//     return () => {
//       scrollTriggerRef.current?.kill();
//     };
//   }, []);

//   // Header enter animation
//   useEffect(() => {
//     if (muteHeaderRef.current) {
//       gsap.fromTo(
//         muteHeaderRef.current,
//         { y: -60, opacity: 0 },
//         { y: 0, opacity: 1, duration: 1.8, ease: 'power3.out', delay: 0.2 }
//       );
//     }
//   }, []);

//   // Header show/hide on scroll
//   useEffect(() => {
//     const header = muteHeaderRef.current;
//     if (!header) return;

//     const handleScroll = () => {
//       gsap.to(header, { opacity: 0, duration: 0.4, ease: 'power2.out' });

//       if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
//       scrollTimeoutRef.current = setTimeout(() => {
//         gsap.to(header, { opacity: 1, duration: 0.6, ease: 'power2.out' });
//       }, 300);
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//       if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
//     };
//   }, []);

//   // Header color & backdrop change on scroll
//   useEffect(() => {
//     const header = muteHeaderRef.current;
//     const ghost = ghostRef.current;
//     if (!header || !ghost) return;

//     const tween = gsap.to(header, {
//       backgroundColor: '#000000',
//       color: '#ffffff',
//       boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
//       backdropFilter: 'blur(12px)',
//       ease: 'none',
//       scrollTrigger: {
//         trigger: ghost,
//         start: 'top top',
//         end: 'bottom top',
//         scrub: 1.5,
//       },
//     });

//     headerTriggerRef.current = tween.scrollTrigger;

//     return () => {
//       headerTriggerRef.current?.kill();
//     };
//   }, []);

//   // Scroll lock
//   useEffect(() => {
//     const preventScroll = (e: Event) => {
//       if (!scrollEnabled) e.preventDefault();
//     };

//     const preventKeys = (e: KeyboardEvent) => {
//       if (!scrollEnabled) {
//         const keys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Space'];
//         if (keys.includes(e.code)) e.preventDefault();
//       }
//     };

//     window.addEventListener('wheel', preventScroll, { passive: false });
//     window.addEventListener('touchmove', preventScroll, { passive: false });
//     window.addEventListener('keydown', preventKeys);

//     return () => {
//       window.removeEventListener('wheel', preventScroll);
//       window.removeEventListener('touchmove', preventScroll);
//       window.removeEventListener('keydown', preventKeys);
//     };
//   }, [scrollEnabled]);

//   return (
//     <>
//       <MuteUnMute ref={muteHeaderRef} />
//       <main
//         ref={mainRef}
//         className={`w-full min-h-screen overflow-x-hidden ${
//           scrollEnabled ? 'overflow-y-scroll' : 'overflow-hidden'
//         } snap-y snap-mandatory transition-colors duration-1000`}
//         style={{ backgroundColor: '#f5f5f5' }}
//       >
//         <section
//           id="ghost"
//           ref={ghostRef}
//           className="relative w-full h-screen flex flex-col justify-center items-center snap-start bg-transparent"
//         >
//           <GhostText />
//           {scrollEnabled && <ScrollDownIndicator />}
//         </section>

//         <section
//           id="hero"
//           ref={heroRef}
//           className="relative w-full h-screen flex justify-center items-center snap-start bg-transparent opacity-0"
//         >
//           <AboutMe />
//         </section>
//       </main>
//     </>
//   );
// };

// export default Note;



