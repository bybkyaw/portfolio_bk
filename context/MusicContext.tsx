'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Howl } from 'howler';
import MusicPoint from '@/app/components/musicpoints/MusicPoints';

interface MusicContextType {
  sound: Howl | null;
  isMuted: boolean;
  mute: () => void;
  unmute: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sound, setSound] = useState<Howl | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  // ✅ Create the Howl instance ONCE, here in global scope
  useEffect(() => {
    if (!sound) {
      const instance = new Howl({
        src: [MusicPoint.MUSIC_URL],
        autoplay: false,
        loop: true,
        volume: 0.2,
      });
      setSound(instance);
    }
  }, [sound]);

  const mute = () => {
    if (sound) {
      sound.mute(true);
      setIsMuted(true);
    }
  };

  const unmute = () => {
    if (sound) {
      if (!sound.playing()) {
        sound.play();
      }
      sound.mute(false);
      setIsMuted(false);
    }
  };

  return (
    <MusicContext.Provider value={{ sound, isMuted, mute, unmute }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = (): MusicContextType => {
  const context = useContext(MusicContext);
  if (!context) throw new Error('useMusic must be used within MusicProvider');
  return context;
};


// 'use client';

// import React, { createContext, useContext, useState } from 'react';
// import { Howl } from 'howler';

// interface MusicContextType {
//   sound: Howl | null;
//   setSound: (sound: Howl | null) => void;
//   isMuted: boolean;
//   setIsMuted: (muted: boolean) => void;
//   mute: () => void;
//   unmute: () => void;
// }

// const MusicContext = createContext<MusicContextType | undefined>(undefined);

// export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [sound, setSound] = useState<Howl | null>(null);
//   const [isMuted, setIsMuted] = useState(false);

//   const mute = () => {
//     if (sound) {
//       sound.mute(true);
//       setIsMuted(true);
//     }
//   };

//   const unmute = () => {
//     if (sound) {
//       if (!sound.playing()) {
//         sound.play();
//       }
//       sound.mute(false);
//       setIsMuted(false);
//     }
//   };

//   return (
//     <MusicContext.Provider value={{ sound, setSound, isMuted, setIsMuted, mute, unmute }}>
//       {children}
//     </MusicContext.Provider>
//   );
// };

// export const useMusic = (): MusicContextType => {
//   const context = useContext(MusicContext);
//   if (!context) throw new Error('useMusic must be used within MusicProvider');
//   return context;
// };



// 'use client';

// import React, { createContext, useContext, useState } from 'react';
// import { Howl } from 'howler';

// interface MusicContextType {
//   sound: Howl | null;
//   setSound: React.Dispatch<React.SetStateAction<Howl | null>>;
//   isMuted: boolean;
//   toggleMute: () => void;
// }

// const MusicContext = createContext<MusicContextType | undefined>(undefined);

// export const useMusic = () => {
//   const context = useContext(MusicContext);
//   if (!context) throw new Error('useMusic must be used within MusicProvider');
//   return context;
// };

// export const MusicProvider = ({ children }: { children: React.ReactNode }) => {
//   const [sound, setSound] = useState<Howl | null>(null);
//   const [isMuted, setIsMuted] = useState(false);

//   const toggleMute = () => {
//     if (sound) {
//       sound.mute(!isMuted);
//     }
//     setIsMuted((prev) => !prev);
//   };

//   return (
//     <MusicContext.Provider value={{ sound, setSound, isMuted, toggleMute }}>
//       {children}
//     </MusicContext.Provider>
//   );
// };
