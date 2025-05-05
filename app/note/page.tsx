'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import GhostText from '../components/UI/GhostText';
import ScrollDownIndicator from '../components/UI/ScrollDownIndicator';
import HeroSection from '../sections/HeroSection';
import MuteUnMute from '../components/musicpoints/MuteUnmute';

gsap.registerPlugin(ScrollTrigger);

const Note: React.FC = () => {
  const [scrollEnabled, setScrollEnabled] = useState(false);

  const mainRef = useRef<HTMLElement>(null);
  const ghostRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const muteHeaderRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Allow scroll after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setScrollEnabled(true);
    }, 7500);
    return () => clearTimeout(timer);
  }, []);

  // Background and scroll behavior
  useEffect(() => {
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

    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, []);

  // Animate header fade-in from top
  useEffect(() => {
    if (!muteHeaderRef.current) return;

    gsap.fromTo(
      muteHeaderRef.current,
      { y: -60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.8,
        ease: 'power3.out',
        delay: 0.2,
      }
    );
  }, []);

  // Scroll → hide header, stop → show again
  useEffect(() => {
    if (!muteHeaderRef.current) return;

    const handleScroll = () => {
      // Fade out immediately
      gsap.to(muteHeaderRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out',
      });

      // Clear previous timeout
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

      // Set new timeout to fade back in
      scrollTimeoutRef.current = setTimeout(() => {
        gsap.to(muteHeaderRef.current, {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        });
      }, 300); // 300ms after scroll ends
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Smooth bg-color transition of header
  useEffect(() => {
    if (!ghostRef.current || !muteHeaderRef.current) return;

    const tween = gsap.to(muteHeaderRef.current, {
      backgroundColor: '#000000',
      color: '#ffffff',
      boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
      backdropFilter: 'blur(12px)',
      ease: 'none',
      scrollTrigger: {
        trigger: ghostRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      },
    });

    return () => tween.scrollTrigger?.kill();
  }, []);

  // Scroll lock at load
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
          <HeroSection />
        </section>
      </main>
    </>
  );
};

export default Note;




