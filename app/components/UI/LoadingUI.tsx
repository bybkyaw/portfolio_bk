'use client';

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import "../../styles/loadingUI.css";
import { Cinzel } from 'next/font/google';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '700'],
});

gsap.registerPlugin(CustomEase);

interface LoadingUIProps {
  startLoading: boolean;
  onComplete: () => void;
}

const LoadingUI: React.FC<LoadingUIProps> = ({ startLoading, onComplete }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showCounter, setShowCounter] = useState(false);

  const hasLoaded = useRef(false);
  const currentRef = useRef<HTMLSpanElement>(null);

  const toRoman = (num: number): string => {
    const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
    return romanNumerals[num - 1] || "0";
  };

  const startLoadingCounter = useCallback(() => {
    let count = 0;

    const interval = setInterval(() => {
      if (currentRef.current) {
        if (count <= 10) {
          const roman = count === 0 ? "0" : toRoman(count);
          currentRef.current.textContent = roman;

          if (roman === "0" || roman === "V" || roman === "X") {
            currentRef.current.style.color = "#F5F5F5"; // Soft white for 0, V, X
          } else {
            currentRef.current.style.color = "#ffbb00"; // Gold/yellow for others
          }

          // Zoom in animation ONLY for "X"
          if (roman === "X") {
            gsap.to(currentRef.current, {
              scale: 8,
              duration: 3,
              ease: "power2.inOut",
            });
          }

          if (count === 10) {
            gsap.to(currentRef.current, {
              opacity: 0,
              duration: 1.5,
              ease: "power2.inOut",
              onComplete: () => {
                onComplete();
              },
            });
            clearInterval(interval);
          }

          count++;
        }
      }
    }, 750);
  }, [onComplete]);

  useEffect(() => {
    if (startLoading && !hasLoaded.current) {
      hasLoaded.current = true;
      setIsVisible(true);

      setShowText(true);

      setTimeout(() => {
        setShowCounter(true);
        startLoadingCounter();
      }, 1000);
    }
  }, [startLoading, startLoadingCounter]);

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center transition-colors duration-1000 ${cinzel.className}`}
      style={{ backgroundColor: isVisible ? "#000000" : "#ffffff" }}
    >
      <div
        className={`loading-ui text-white flex flex-col justify-center items-center transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Top: Loading Text */}
        {showText && (
          <div className="absolute top-1/4 text-lg tracking-wide flex flex-col items-center animate-slide-in-left">
            <span className="mb-2">LOADING</span>
            <div className="loader"></div>
          </div>
        )}

        {/* Center Roman */}
        {showCounter && (
          <div className="text-9xl font-extrabold flex justify-center items-center min-h-[200px]">
            <span ref={currentRef}>0</span>
          </div>
        )}

        {/* Please Wait */}
        {showText && (
          <div className="absolute bottom-1/4 text-lg tracking-widest text-white/80 animate-fade-in">
            PLEASE WAIT
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingUI;


