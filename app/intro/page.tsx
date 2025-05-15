'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MusicPromptUI from '../components/UI/MusicPromptUI';
import LoadingUI from '../components/UI/LoadingUI';
import PageTransition from '../components/effects/PageTransition';
import Noise from '../components/effects/Noise';

const IntroPage: React.FC = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [startTransition, setStartTransition] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 500); // delay showing the prompt
    return () => clearTimeout(timer);
  }, []);

  const handleUserChoice = (choice: boolean) => {
    console.log(choice ? 'User accepted music' : 'User declined music');
    setShowLoading(true);
  };

  const handleCountingComplete = () => {
    setShowLoading(false);
    setStartTransition(true); // triggers PageTransition and Noise fade
  };

  const handleTransitionComplete = () => {
    router.push('/note'); // navigate only after transition finishes
  };

  return (
    <div className="relative w-full h-screen overflow-hidden text-white bg-black">
      {/* Background noise effect with fade-out support */}
      <Noise fadeOut={startTransition} />

      {/* Music prompt (shown after delay) */}
      {showPrompt && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <MusicPromptUI onUserChoice={handleUserChoice} />
        </div>
      )}

      {/* Loading countdown UI */}
      {showLoading && (
        <div className="absolute inset-0 z-20">
          <LoadingUI startLoading={true} onComplete={handleCountingComplete} />
        </div>
      )}

      {/* Page transition animation */}
      <PageTransition trigger={startTransition} onComplete={handleTransitionComplete} />
    </div>
  );
};

export default IntroPage;


