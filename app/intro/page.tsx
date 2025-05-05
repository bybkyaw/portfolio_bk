'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MusicPromptUI from '../components/UI/MusicPromptUI';
import LoadingUI from '../components/UI/LoadingUI';
import Noise from '../components/effects/Noise';



const IntroPage: React.FC = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const router = useRouter();

  const handleUserChoice = (choice: boolean) => {
    console.log(choice ? 'User accepted music' : 'User declined music');
    setShowLoading(true);
  };

  const handleCountingComplete = () => {
    setShowLoading(false);
    setTimeout(() => {
      router.push('/note');
    }, 100);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 500); // fade-in delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden text-white">
    <Noise />

  {showPrompt && (
    <div className="absolute inset-0 flex items-center justify-center z-10">
      <MusicPromptUI onUserChoice={handleUserChoice} />
    </div>
  )}

  {showLoading && (
    <div className="absolute inset-0 z-20">
      <LoadingUI startLoading={true} onComplete={handleCountingComplete} />
    </div>
  )}
</div>

  );
  
};

export default IntroPage;

// 'use client';

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import MusicPromptUI from "../components/UI/MusicPromptUI";
// import LoadingUI from "../components/UI/LoadingUI";

// const IntroPage: React.FC = () => {
//   const [showLoading, setShowLoading] = useState(false);
//   const [showPrompt, setShowPrompt] = useState(false);
//   const router = useRouter();

//   const handleUserChoice = (choice: boolean) => {
//     console.log(choice ? "User accepted music" : "User declined music");
//     setShowLoading(true);
//   };

//   const handleCountingComplete = () => {
//     setShowLoading(false);

//     setTimeout(() => {
//       router.push("/note");
//     }, 100);
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowPrompt(true);
//     }, 500); // Delay for nice fade-in

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className="intro-page">
//       {showPrompt && (
//         <div className="prompt-wrapper">
//           <MusicPromptUI onUserChoice={handleUserChoice} />
//         </div>
//       )}
//       {showLoading && (
//         <LoadingUI startLoading={true} onComplete={handleCountingComplete} />
//       )}
//     </div>
//   );
// };

// export default IntroPage;


