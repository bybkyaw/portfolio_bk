'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import MusicPromptUI from "./components/UI/MusicPromptUI";
import LoadingUI from "./components/UI/LoadingUI";

const Home: React.FC = () => {
  const [showLoading, setShowLoading] = useState(false);
  const router = useRouter();

  const handleUserChoice = () => {
    setShowLoading(true);
  };

  const handleCountingComplete = () => {
    router.push("/note"); // Direct push without overlay
  };

  return (
    <div className="w-full h-screen bg-black text-white flex justify-center items-center">
      {!showLoading && (
        <MusicPromptUI onUserChoice={handleUserChoice} />
      )}
      {showLoading && (
        <LoadingUI startLoading={true} onComplete={handleCountingComplete} />
      )}
    </div>
  );
};

export default Home;


