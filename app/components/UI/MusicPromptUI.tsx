'use client';

import { useEffect } from "react";
import { Howl } from "howler";
import MusicPoint from "../musicpoints/MusicPoints";
import { useMusic } from "../../../context/MusicContext";
import "../../styles/music_prompt.css";

const MusicPromptUI: React.FC<{ onUserChoice: (choice: boolean) => void }> = ({ onUserChoice }) => {
  const { sound, setSound, setIsMuted } = useMusic();

  // Initialize Howl and store it globally
  useEffect(() => {
    const soundInstance = new Howl({
      src: [MusicPoint.MUSIC_URL],
      autoplay: false,
      loop: true,
      volume: 0.2,
    });

    setSound(soundInstance);
  }, [setSound]);

  const handleAccept = () => {
    if (sound) {
      sound.play();
      sound.mute(false);
      setIsMuted(false); // ✅ Show "MUTE SOUND"
    }
    onUserChoice(true);
  };

  const handleDecline = () => {
    if (sound) {
      sound.stop();         // stop music
      setIsMuted(true);     // ✅ Show "UNMUTE"
    }
    onUserChoice(false);
  };

  return (
    <div id="permission" className="permission-container show">
      <span>Accept playing music?</span>
      <div className="permissionBtns">
        <div className="btn-group">
          <div className="active-bg" />
          <button id="denyButton" onClick={handleDecline}>No</button>
          <button id="allowButton" onClick={handleAccept}>Yes</button>
        </div>
      </div>
    </div>
  );
};

export default MusicPromptUI;


