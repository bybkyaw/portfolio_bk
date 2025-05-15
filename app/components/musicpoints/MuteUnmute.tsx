'use client';

import React, { forwardRef, useEffect, useState } from 'react';
import { useMusic } from '@/context/MusicContext';

const MuteUnMute = forwardRef<HTMLDivElement>((_, ref) => {
  const { isMuted, mute, unmute, sound } = useMusic();
  const [isDark, setIsDark] = useState(false);

  const handleClick = () => {
    if (!sound) return;

    // Ensure sound is loaded before interacting
   if (sound.state() !== 'loaded') {
  sound.once('load', () => {
    if (isMuted) {
      unmute();
    } else {
      mute();
    }
  });
} else {
  if (isMuted) {
    if (!sound.playing()) sound.play(); // resume if stopped
    unmute();
  } else {
    mute();
  }
}
};

  useEffect(() => {
    const switchPoint = window.innerHeight * 0.9;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setIsDark(scrollY > switchPoint);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const active = sound && sound.state() === 'loaded';

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 w-full z-10 transition-all duration-700"
      style={{
        height: '3.5rem',
        backgroundColor: isDark
          ? 'rgba(0, 0, 0, 0.25)'
          : 'rgba(255, 255, 255, 0.1)',
        backdropFilter: active ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: active ? 'blur(12px)' : 'none',
        color: isDark ? '#f5f5f5' : '#000',
        fontFamily: 'Roman Cindel, Arial, sans-serif',
        fontWeight: 'bold',
        fontSize: '0.75rem',
        letterSpacing: '0.3em',
        pointerEvents: active ? 'auto' : 'none',
        opacity: active ? 1 : 0.3,
      }}
    >
      <button
        onClick={handleClick}
        className="lowercase transition-all duration-200 tracking-widest"
        style={{
          position: 'absolute',
          top: '1.2rem',
          left: '9vw',
          fontFamily: 'Roman Cindel, Arial, sans-serif',
          fontSize: '0.9rem',
          fontWeight: 'bold',
          color: isDark ? '#f5f5f5' : '#000',
        }}
      >
        {isMuted ? 'unmute' : 'mute sound'}
      </button>
    </div>
  );
});

MuteUnMute.displayName = 'MuteUnMute';

export default MuteUnMute;


