'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import MuteUnMute from '@/app/components/musicpoints/MuteUnmute';
import Noise from '@/app/components/effects/Noise';
import { useFadeOnScroll } from '@/hooks/useFadeOnScroll';
import AboutText from './AboutText';
import ScrollDown from './effects/ScrollDown';

const AboutMe: React.FC = () => {
  const router = useRouter();
  const muteHeaderRef = useRef(null);

  // Fade-in trigger hook
  const [aboutRef, isVisible] = useFadeOnScroll<HTMLElement>();

  // Scroll up to /note
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY < 0) router.push('/note');
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [router]);

  return (
    <section
      ref={aboutRef}
      className="relative w-full h-screen bg-black overflow-hidden"
    >
      {/* Global noise effect */}
      <Noise />

      {/* Mute/Unmute Header */}
      <div
        className={`fixed top-4 left-4 z-50 transition-opacity duration-700 ${
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <MuteUnMute ref={muteHeaderRef} />
      </div>

      {/* Animated name and title */}
      <AboutText />

      {/* Scroll Down Indicator */}
      {/* <div className="absolute bottom-[40vh] left-[50vw] text-gray-400 text-xs tracking-widest z-10">
        SCROLL DOWN
      </div> */}
      <ScrollDown />
    </section>
  );
};

export default AboutMe;



