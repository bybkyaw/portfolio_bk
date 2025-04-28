'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MusicPromptUI from "../components/UI/MusicPromptUI";
import LoadingUI from "../components/UI/LoadingUI";

const IntroPage: React.FC = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const router = useRouter();

  const handleUserChoice = (choice: boolean) => {
    console.log(choice ? "User accepted music" : "User declined music");
    setShowLoading(true);
  };

  const handleCountingComplete = () => {
    setShowLoading(false);

    setTimeout(() => {
      router.push("/note");
    }, 100);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 500); // Delay for nice fade-in

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="intro-page">
      {showPrompt && (
        <div className="prompt-wrapper">
          <MusicPromptUI onUserChoice={handleUserChoice} />
        </div>
      )}
      {showLoading && (
        <LoadingUI startLoading={true} onComplete={handleCountingComplete} />
      )}
    </div>
  );
};

export default IntroPage;


