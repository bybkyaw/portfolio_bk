// 'use client';

// import { useMemo, useState } from 'react';
// import { useMusic } from '../../../context/MusicContext';
// import '../../styles/music_prompt.css';

// interface MusicPromptUIProps {
//   onUserChoice: (choice: boolean) => void;
// }

// const MusicPromptUI: React.FC<MusicPromptUIProps> = ({ onUserChoice }) => {
//   const { sound, mute, unmute } = useMusic();
//   const [hovered, setHovered] = useState<'yes' | 'no' | null>(null);

//   const handleAccept = () => {
//     if (sound && !sound.playing()) {
//       sound.play();
//     }
//     unmute();
//     onUserChoice(true);
//   };

//   const handleDecline = () => {
//     if (sound && sound.playing()) {
//       sound.stop();
//     }
//     mute();
//     onUserChoice(false);
//   };

//   // ✅ Memoize toggle highlight position
//   const highlightLeft = useMemo(() => {
//     return hovered === 'no' ? '0%' : '50%';
//   }, [hovered]);

//   return (
//     <div
//       id="permission"
//       className="permission-container show flex flex-col items-center justify-center text-black"
//     >
//       <span className="text-md font-semibold mb-4">Accept playing music?</span>

//       <div className="relative flex w-[240px] h-[48px] justify-between rounded-full bg-white overflow-hidden shadow-md will-change-transform">
//         {/* Toggle background slider */}
//         <div
//           className="absolute top-0 h-full w-1/2 transition-all duration-300 ease-in-out pointer-events-none z-0 rounded-full"
//           style={{ left: highlightLeft, backgroundColor: 'black' }}
//         />

//         {/* Buttons */}
//         <button
//           onClick={handleDecline}
//           onMouseEnter={() => setHovered('no')}
//           onMouseLeave={() => setHovered(null)}
//           className="z-10 relative w-1/2 h-full text-sm font-bold text-white uppercase transition-colors"
//         >
//           No
//         </button>

//         <button
//           onClick={handleAccept}
//           onMouseEnter={() => setHovered('yes')}
//           onMouseLeave={() => setHovered(null)}
//           className="z-10 relative w-1/2 h-full text-sm font-bold text-white uppercase transition-colors"
//         >
//           Yes
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MusicPromptUI;


'use client';

import { useState } from 'react';
import { useMusic } from '../../../context/MusicContext';
import '../../styles/music_prompt.css';

interface MusicPromptUIProps {
  onUserChoice: (choice: boolean) => void;
}

const MusicPromptUI: React.FC<MusicPromptUIProps> = ({ onUserChoice }) => {
  const { sound, mute, unmute } = useMusic();
  const [hovered, setHovered] = useState<'yes' | 'no' | null>(null);

  const handleAccept = () => {
    sound?.play();
    unmute(); // ✅ replaces setIsMuted(false)
    onUserChoice(true);
  };

  const handleDecline = () => {
    sound?.stop();
    mute(); // ✅ replaces setIsMuted(true)
    onUserChoice(false);
  };

  const highlightLeft = hovered === 'no' ? '0%' : '50%';

  return (
    <div
      id="permission"
      className="permission-container show flex flex-col items-center justify-center text-black"
    >
      <span className="text-md font-semibold mb-4">Accept playing music?</span>

      <div className="relative flex w-[240px] h-[48px] justify-between rounded-full bg-white overflow-hidden shadow-md">
        <div
          className="absolute top-0 h-full w-1/2 transition-all duration-300 pointer-events-none z-0 rounded-full"
          style={{ left: highlightLeft, backgroundColor: 'black' }}
        />

        <button
          onClick={handleDecline}
          onMouseEnter={() => setHovered('no')}
          onMouseLeave={() => setHovered(null)}
          className="z-10 relative w-1/2 h-full text-sm font-bold text-white uppercase"
        >
          No
        </button>

        <button
          onClick={handleAccept}
          onMouseEnter={() => setHovered('yes')}
          onMouseLeave={() => setHovered(null)}
          className="z-10 relative w-1/2 h-full text-sm font-bold text-white uppercase"
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default MusicPromptUI;



// 'use client';

// import { useEffect, useState } from 'react';
// import { Howl } from 'howler';
// import MusicPoint from '../musicpoints/MusicPoints';
// import { useMusic } from '../../../context/MusicContext';
// import '../../styles/music_prompt.css';

// const MusicPromptUI: React.FC<{ onUserChoice: (choice: boolean) => void }> = ({ onUserChoice }) => {
//   const { sound, setSound, setIsMuted } = useMusic();
//   const [hovered, setHovered] = useState<'yes' | 'no' | null>(null);

//   useEffect(() => {
//     const instance = new Howl({
//       src: [MusicPoint.MUSIC_URL],
//       autoplay: false,
//       loop: true,
//       volume: 0.2,
//     });

//     setSound(instance);
//     return () => {
//       instance.unload(); // Safe cleanup
//     };
//   }, [setSound]);

//   const handleAccept = () => {
//     sound?.play();
//     sound?.mute(false);
//     setIsMuted(false);
//     onUserChoice(true);
//   };

//   const handleDecline = () => {
//     sound?.stop();
//     setIsMuted(true);
//     onUserChoice(false);
//   };

//   // Default highlight is on "Yes"
//   const highlightLeft = hovered === 'no' ? '0%' : '50%';

//   return (
//     <div id="permission" className="permission-container show flex flex-col items-center justify-center text-black">
//       <span className="text-md font-semibold mb-4">Accept playing music?</span>

//       <div className="relative flex gap-0 w-[240px] h-[48px] justify-between rounded-full bg-white overflow-hidden shadow-md">
//         {/* Hover background that follows button */}
//         <div
//           className="absolute top-0 h-full w-1/2 transition-all duration-300 pointer-events-none z-0 rounded-full"
//           style={{
//             left: highlightLeft,
//             backgroundColor: 'black',
//           }}
//         />

//         {/* Buttons */}
//         <button
//           onClick={handleDecline}
//           onMouseEnter={() => setHovered('no')}
//           onMouseLeave={() => setHovered(null)}
//           className="z-10 relative w-1/2 h-full text-sm font-bold text-white uppercase"
//         >
//           No
//         </button>

//         <button
//           onClick={handleAccept}
//           onMouseEnter={() => setHovered('yes')}
//           onMouseLeave={() => setHovered(null)}
//           className="z-10 relative w-1/2 h-full text-sm font-bold text-white uppercase"
//         >
//           Yes
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MusicPromptUI;

// 'use client';

// import { useEffect } from 'react';
// import { Howl } from 'howler';
// import MusicPoint from '../musicpoints/MusicPoints';
// import { useMusic } from '../../../context/MusicContext';
// import '../../styles/music_prompt.css';

// interface MusicPromptUIProps {
//   onUserChoice: (choice: boolean) => void;
// }

// const MusicPromptUI: React.FC<MusicPromptUIProps> = ({ onUserChoice }) => {
//   const { sound, setSound, setIsMuted } = useMusic();

//   useEffect(() => {
//     const instance = new Howl({
//       src: [MusicPoint.MUSIC_URL],
//       autoplay: false,
//       loop: true,
//       volume: 0.2,
//     });

//     setSound(instance);

//     return () => {
//       instance.unload(); // Clean up
//     };
//   }, [setSound]);

//   const handleAccept = () => {
//     sound?.play();
//     sound?.mute(false);
//     setIsMuted(false);
//     onUserChoice(true);
//   };

//   const handleDecline = () => {
//     sound?.stop();
//     setIsMuted(true);
//     onUserChoice(false);
//   };

//   return (
//     <div className="permission-container show" id="permission">
//       <span className="text-lg font-medium">Accept playing music?</span>
//       <div className="permissionBtns mt-4">
//         <div className="btn-group flex gap-4 relative">
//           <div className="active-bg absolute inset-0 z-0" />
//           <button id="denyButton" onClick={handleDecline} className="z-10">
//             No
//           </button>
//           <button id="allowButton" onClick={handleAccept} className="z-10">
//             Yes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MusicPromptUI;


