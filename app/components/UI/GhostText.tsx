'use client';

import React, { useState, useEffect } from "react";
import "../../styles/ghostext.css";
import { Cinzel } from 'next/font/google';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const GhostText: React.FC = () => {
  const firstLineInitial = ["I", "M", "A", "G", "I", "N", "E"];
  const secondLineInitial = ["A", "N", "Y", "T", "H", "I", "N", "G"];

  const firstLineNew = ["E", "V", "E", "R", "Y", "T", "H", "I", "N", "G", "'", "S"];
  const secondLineNew = ["P", "O", "S", "S", "I", "B", "L", "E"];

  const [clickedLetters, setClickedLetters] = useState<{ [key: string]: boolean }>({});
  const [switched, setSwitched] = useState(false);

  const handleClick = (key: string) => {
    setClickedLetters((prev) => ({
      ...prev,
      [key]: true,
    }));

    setTimeout(() => {
      setClickedLetters((prev) => ({
        ...prev,
        [key]: false,
      }));
    }, 1000);
  };

  useEffect(() => {
    // After ghostOut finishes (~7s total), switch text
    const timer = setTimeout(() => {
      setSwitched(true);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  const getInitialStyle = (index: number) => {
    const floatInDelay = index * 0.2;
    const ghostOutDelay = 3;
    const ghostOutDuration = 4;
    const ghostReappearDelay = floatInDelay + ghostOutDelay + ghostOutDuration;

    return {
      animation: `
        floatIn 1.8s ease-in-out forwards ${floatInDelay}s,
        ghostOut ${ghostOutDuration}s ease-in-out forwards ${floatInDelay + ghostOutDelay}s,
        ghostReappearClear 2s ease-in-out forwards ${ghostReappearDelay}s
      `,
      animationFillMode: "forwards",
    };
  };

  return (
    <section className={`${cinzel.className} ghost-section`}>
      <div className="ghost-container">
        <h2 className="ghost-line">
          {(switched ? firstLineNew : firstLineInitial).map((letter, i) => {
            const key = `first-${i}`;
            return (
              <span
                key={key}
                onClick={() => handleClick(key)}
                style={getInitialStyle(i)}
                className={`ghost-letter ${clickedLetters[key] ? 'explode' : ''}`}
              >
                {letter}
              </span>
            );
          })}
        </h2>

        <h2 className="ghost-line shifted">
          {(switched ? secondLineNew : secondLineInitial).map((letter, i) => {
            const key = `second-${i}`;
            return (
              <span
                key={key}
                onClick={() => handleClick(key)}
                style={getInitialStyle(i)}
                className={`ghost-letter ${clickedLetters[key] ? 'explode' : ''}`}
              >
                {letter}
              </span>
            );
          })}
        </h2>
      </div>
    </section>
  );
};

export default GhostText;


