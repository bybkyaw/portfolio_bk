'use client';

import React, { forwardRef, useEffect, useState } from 'react';
import { useMusic } from '@/context/MusicContext';

// Throttle utility to improve scroll performance
function throttle(fn: () => void, wait: number) {
  let lastCall = 0;
  return () => {
    const now = Date.now();
    if (now - lastCall >= wait) {
      lastCall = now;
      fn();
    }
  };
}

const MuteUnMute = forwardRef<HTMLDivElement>((_, ref) => {
  const { isMuted, mute, unmute, sound } = useMusic();
  const [isDark, setIsDark] = useState(false);

  const handleClick = () => {
    if (!sound) return;
    if (isMuted) {
      unmute(); // ✅ call function
    } else {
      mute(); // ✅ call function
    }
  };

  useEffect(() => {
    const switchPoint = window.innerHeight * 0.9;

    const throttledScroll = throttle(() => {
      const scrollY = window.scrollY;
      setIsDark(scrollY > switchPoint);
    }, 150); // Adjust throttle delay as needed

    window.addEventListener('scroll', throttledScroll);
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 w-full z-10 transition-all duration-700"
      style={{
        height: '3.5rem',
        backgroundColor: isDark
          ? 'rgba(0, 0, 0, 0.25)'
          : 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        color: isDark ? '#f5f5f5' : '#000',
        fontFamily: 'Roman Cindel, Arial, sans-serif',
        fontWeight: 'bold',
        fontSize: '0.75rem',
        letterSpacing: '0.3em',
        pointerEvents: sound ? 'auto' : 'none',
        opacity: sound ? 1 : 0.4,
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


// 'use client';

// import React, { forwardRef } from 'react';
// import { useMusic } from '@/context/MusicContext';

// const MuteUnMute = forwardRef<HTMLDivElement>((_, ref) => {
//   const { isMuted, mute, unmute, sound } = useMusic();

//   const handleClick = () => {
//     if (!sound) return;
//     if (isMuted) unmute();
//     else mute();
//   };

//   return (
//     <div
//       ref={ref}
//       className="fixed top-0 left-0 w-full z-10 flex justify-center items-center py-4 transition-all duration-700"
//       style={{
//         position: 'fixed',
//         height: '3.5rem',
//         color: '#000',
//         fontFamily: 'Roman Cindel, Arial, sans-serif',
//         fontWeight: 'bold',
//         fontSize: '0.75rem',
//         letterSpacing: '0.3em',
//         pointerEvents: sound ? 'auto' : 'none',
//         opacity: sound ? 1 : 0.4,
//       }}
//     >
//       <button
//         onClick={handleClick}
//         className="lowercase transition-all duration-200 tracking-widest"
//         style={{
//           position: 'absolute',
//           top: '1.2rem',
//           left: '9vw',
//           fontFamily: 'Roman Cindel, Arial, sans-serif',
//           fontSize: '0.9rem',
//           fontWeight: 'bold',
//           color: '#000',
//         }}
//       >
//         {isMuted ? 'unmute' : 'mute sound'}
//       </button>
//     </div>
//   );
// });

// MuteUnMute.displayName = 'MuteUnMute';
// export default MuteUnMute;


// 'use client';

// import React, { forwardRef } from 'react';
// import { useMusic } from '@/context/MusicContext';

// const MuteUnMute = forwardRef<HTMLDivElement>((_, ref) => {
//   const { isMuted, mute, unmute, sound } = useMusic();

//   const handleClick = () => {
//     if (!sound) return;
//     if (isMuted) unmute();
//     else mute();
//   };

//   return (
//     <div
//       ref={ref}
//       className="fixed top-0 left-0 w-full z-10 flex bg-transparent backdrop-blur-md justify-center items-center py-4 transition-all duration-700"
//       style={{
//         backgroundColor: 'transparent',
//         color: '#000',
//         fontFamily: 'Roman Cindel, sans-serif', 
//         fontWeight: 'bold',
//         fontSize: '0.75rem',
//         letterSpacing: '0.3em',                 
//         boxShadow: 'none',
//         borderBottom: 'none',
//         backdropFilter: 'none',
//         WebkitBackdropFilter: 'none',
//         pointerEvents: sound ? 'auto' : 'none',
//         opacity: sound ? 1 : 0.4,
//       }}
//     >
//       <button
//         onClick={handleClick}
//         className="tracking-widest lowercase transition-all duration-200" // ✅ lowercase via Tailwind
//       >
//         {isMuted ? 'unmute' : 'mute sound'}
//       </button>
//     </div>
//   );
// });

// MuteUnMute.displayName = 'MuteUnMute';
// export default MuteUnMute;


// 'use client';

// import React, { forwardRef } from 'react';
// import { useMusic } from '@/context/MusicContext';

// const MuteUnMute = forwardRef<HTMLDivElement>((_, ref) => {
//   const { isMuted, mute, unmute, sound } = useMusic();

//   const handleClick = () => {
//     if (!sound) return;
//     if (isMuted) unmute();
//     else mute();
//   };

//   return (
//     <div
//       ref={ref}
//       className="fixed top-0 left-0 w-full z-10 flex justify-center items-center py-4 transition-all duration-700"
//       style={{
//         backgroundColor: "transparent",
//         color: '#000',
//         fontFamily: 'cindel',
//         fontWeight: 'bold',
//         fontSize: '0.75rem',
//         letterSpacing: '2px',
//         boxShadow: 'none',
//         borderBottom: 'none',
//         backdropFilter: 'none',
//         WebkitBackdropFilter: 'none',
//         pointerEvents: sound ? 'auto' : 'none',
//         opacity: sound ? 1 : 0.4,
//       }}
//     >
//       <button
//         onClick={handleClick}
//         className="uppercase tracking-widest transition-all duration-200"
//       >
//         {isMuted ? 'UNMUTE' : 'MUTE SOUND'}
//       </button>
//     </div>
//   );
// });

// MuteUnMute.displayName = 'MuteUnMute';
// export default MuteUnMute;


// 'use client';

// import React, { forwardRef } from 'react';
// import { useMusic } from '@/context/MusicContext';

// const MuteUnMute = forwardRef<HTMLDivElement>((_, ref) => {
//   const { isMuted, mute, unmute, sound } = useMusic();

//   const handleClick = () => {
//     if (!sound) return;
//     if (isMuted) unmute();
//     else mute();
//   };

//   return (
//     <div
//       ref={ref}
//       className="fixed top-0 left-0 w-full z-10 flex justify-center items-center py-4 transition-all duration-700"
//       style={{
//         backgroundColor: '#f5f5f5',
//         color: '#000',
//         fontFamily: 'sans-serif',
//         fontWeight: 'bold',
//         fontSize: '0.75rem',
//         letterSpacing: '1px',
//         boxShadow: 'none',
//         borderBottom: 'none',
//         backdropFilter: 'none',
//         WebkitBackdropFilter: 'none',
//         pointerEvents: sound ? 'auto' : 'none', // block clicks if sound not ready
//         opacity: sound ? 1 : 0.4,               // dim visually if not ready
//       }}
//     >
//       <button
//         onClick={handleClick}
//         className="uppercase tracking-widest transition-all duration-200"
//       >
//         {isMuted ? 'UNMUTE' : 'MUTE SOUND'}
//       </button>
//     </div>
//   );
// });

// MuteUnMute.displayName = 'MuteUnMute';
// export default MuteUnMute;


// 'use client';

// import React, { forwardRef } from 'react';
// import { useMusic } from '@/context/MusicContext';

// const MuteUnMute = forwardRef<HTMLDivElement>((_, ref) => {
//   const { isMuted, mute, unmute } = useMusic();

//   return (
//     <div
//       ref={ref}
//       className="fixed top-0 left-0 w-full z-10 flex justify-center items-center py-4 transition-all duration-700"
//       style={{
//         backgroundColor: '#f5f5f5',
//         color: '#000',
//         fontFamily: 'sans-serif',
//         fontWeight: 'bold',
//         fontSize: '0.75rem',
//         letterSpacing: '1px',
//         boxShadow: 'none',
//         borderBottom: 'none',
//         backdropFilter: 'none',
//         WebkitBackdropFilter: 'none',
//       }}
//     >
//       {isMuted ? (
//         <button onClick={unmute} className="uppercase tracking-widest">
//           UNMUTE
//         </button>
//       ) : (
//         <button onClick={mute} className="uppercase tracking-widest">
//           MUTE SOUND
//         </button>
//       )}
//     </div>
//   );
// });

// MuteUnMute.displayName = 'MuteUnMute';
// export default MuteUnMute;


// 'use client';

// import React, { forwardRef } from 'react';
// import { useMusic } from '@/context/MusicContext';

// const MuteUnMute = forwardRef<HTMLDivElement>((_, ref) => {
//   const { isMuted, toggleMute } = useMusic();

//   return (
//     <div
//       ref={ref}
//       className="fixed top-0 left-0 w-full z-10 flex justify-center items-center py-4 transition-all duration-700"
//       style={{
//         backgroundColor: '#f5f5f5', 
//         color: '#000',
//         fontFamily: 'sans-serif',
//         fontWeight: 'bold',
//         fontSize: '0.75rem',
//         letterSpacing: '1px',
//       }}
//     >
//       <button onClick={toggleMute} className="uppercase tracking-widest">
//         {isMuted ? 'UNMUTE' : 'MUTE SOUND'}
//       </button>
//     </div>
//   );
// });

// MuteUnMute.displayName = 'MuteUnMute';
// export default MuteUnMute;




