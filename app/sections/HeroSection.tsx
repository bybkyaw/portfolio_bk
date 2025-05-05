'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Noise from '../components/effects/Noise';

const HeroSection: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY < 0) {
        router.push('/note');
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [router]);

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      <Noise />
      {/* Optional: grain/noise overlay */}
      <div className="absolute inset-0 z-0 bg-[url('/images/noise.png')] opacity-[0.07] pointer-events-none" />

      {/* Text wrapper */}
      <div
        className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-[55%] text-white uppercase text-center"
        style={{ fontFamily: 'Roman Cindel, sans-serif' }}
      >
        <h1 className="text-[5vw] leading-none tracking-tight ml-[20vw]">Billy</h1>
        <h1 className="text-[5vw] leading-none tracking-tight ml-[42vw]">Kyaw</h1>

        <p className="text-sm md:text-base tracking-wider mt-6 font-semibold">
          Full Stack Developer / Data Scientist
        </p>
      </div>

      {/* Scroll down text */}
      <div
        className="absolute bottom-6 left-6 text-gray-400 text-xs md:text-sm tracking-widest animate-pulse z-10"
        style={{ fontFamily: 'Roman Cindel, sans-serif' }}
      >
        Scroll Down
      </div>
    </section>
  );
};

export default HeroSection;



