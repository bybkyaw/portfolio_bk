'use client';

import { useState, useEffect } from "react";
import { Howl } from "howler";
import MusicPoint from "../musicpoints/MusicPoints";
import "../../styles/music_prompt.css";

interface MusicPromptUIProps {
  onUserChoice: (choice: boolean) => void;
}

const MusicPromptUI: React.FC<MusicPromptUIProps> = ({ onUserChoice }) => {
  const [sound, setSound] = useState<Howl | null>(null);

  useEffect(() => {
    const initializeSound = () => {
      setSound(
        new Howl({
          src: [MusicPoint.MUSIC_URL],
          autoplay: false,
          loop: true,
          volume: 0.5,
        })
      );
    };
    initializeSound();
  }, []);

  const handleAccept = () => {
    sound?.play();
    onUserChoice(true);
  };

  const handleDecline = () => {
    sound?.stop();
    onUserChoice(false);
  };

  return (
    <div id="permission" className="permission-container show">
      <span>Accept playing music?</span>
      <div className="permissionBtns">
        <div className="btn-group">
          <div className="active-bg" />
          <button id="denyButton" onClick={handleDecline}>
            No
          </button>
          <button id="allowButton" onClick={handleAccept} >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicPromptUI;


// import { useState, useEffect } from "react";
// import { Howl } from "howler";
// import MusicPoint from "../musicpoints/MusicPoints";
// import "../../styles/music_prompt.css";

// interface MusicPromptUIProps {
//   onUserChoice: (choice: boolean) => void;
// }

// const MusicPromptUI: React.FC<MusicPromptUIProps> = ({ onUserChoice }) => {
//   const [sound, setSound] = useState<Howl | null>(null);

//   useEffect(() => {
//     const initializeSound = () => {
//       setSound(
//         new Howl({
//           src: [MusicPoint.MUSIC_URL],
//           autoplay: false,
//           loop: true,
//           volume: 0.5,
//         })
//       );
//     };

//     initializeSound();
//   }, []);

//   const handleAccept = () => {
//     sound?.play();
//     onUserChoice(true); // Notify parent component that the user chose "Yes"
//   };

//   const handleDecline = () => {
//     sound?.stop();
//     onUserChoice(false); // Notify parent component that the user chose "No"
//   };

//   return (
//     <div id="permission" className="permission-container show">
//       <span>Accept playing music?</span>
//       <div className="permissionBtns">
//         <button id="denyButton" onClick={handleDecline}>
//           No
//         </button>
//         <button id="allowButton" onClick={handleAccept}>
//           Yes
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MusicPromptUI;

