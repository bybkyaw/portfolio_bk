// 'use client';

// import { useEffect, useRef, useState, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import gsap from "gsap";
// import CustomEase from "gsap/CustomEase";

// import "../../styles/loadingUI.css";
// import { Cinzel } from 'next/font/google';
// import Noise from "../effects/Noise";
// import PageTransition from "../effects/PageTransition";

// const cinzel = Cinzel({
//   subsets: ['latin'],
//   weight: ['400', '700'],
// });

// gsap.registerPlugin(CustomEase);

// interface LoadingUIProps {
//   startLoading: boolean;
// }

// const LoadingUI: React.FC<LoadingUIProps> = ({ startLoading }) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [showText, setShowText] = useState(false);
//   const [showCounter, setShowCounter] = useState(false);
//   const [fadeOutAll, setFadeOutAll] = useState(false);
//   const [triggerTransition, setTriggerTransition] = useState(false);

//   const hasLoaded = useRef(false);
//   const currentRef = useRef<HTMLSpanElement>(null);
//   const router = useRouter();

//   const toRoman = (num: number): string => {
//     const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
//     return romanNumerals[num - 1] || "0";
//   };

//   const vaporText = (text: string) =>
//     text.split("").map((char, i) => (
//       <span
//         key={i}
//         className={`inline-block ${fadeOutAll ? "vapor-fade" : ""}`}
//         style={{ animationDelay: `${i * 0.15}s` }}
//       >
//         {char}
//       </span>
//     ));

//   const startLoadingCounter = useCallback(() => {
//     let count = 0;

//     const interval = setInterval(() => {
//       if (currentRef.current) {
//         if (count <= 10) {
//           const roman = count === 0 ? "0" : toRoman(count);
//           currentRef.current.textContent = roman;

//           currentRef.current.style.color =
//             roman === "0" || roman === "V" || roman === "X"
//               ? "#F5F5F5"
//               : "#ffbb00";

//           if (roman === "X") {
//             setTimeout(() => {
//               setFadeOutAll(true); // fade everything

//               // ✅ Wait 2s AFTER vapor fade, then trigger Zoom
//               setTimeout(() => {
//                 setTriggerTransition(true);
//               }, 2000);
//             }, 2000); // delay after X before vapor starts

//             clearInterval(interval);
//           }

//           count++;
//         }
//       }
//     }, 1000);
//   }, []);

//   useEffect(() => {
//     if (startLoading && !hasLoaded.current) {
//       hasLoaded.current = true;
//       setIsVisible(true);
//       setShowText(true);

//       setTimeout(() => {
//         setShowCounter(true);
//         startLoadingCounter();
//       }, 1000);
//     }
//   }, [startLoading, startLoadingCounter]);

//   return (
//     <>
//       <div
//         className={`fixed inset-0 z-50 flex justify-center items-center transition-colors duration-[2000ms] ${cinzel.className}`}
//         style={{ backgroundColor: isVisible ? "#000000" : "#ffffff" }}
//       >
//         <Noise />

//         <div
//           className={`loading-ui text-white flex flex-col justify-center items-center transition-opacity duration-1000 ${
//             isVisible ? "opacity-100" : "opacity-0"
//           }`}
//         >
//           {showText && (
//             <div className="absolute top-1/4 text-lg tracking-wide flex flex-col items-center">
//               <div className="mb-2">{vaporText("LOADING")}</div>
//               <div className={`loader ${fadeOutAll ? "vapor-fade" : ""}`} style={{ animationDelay: `1s` }} />
//             </div>
//           )}

//           {showCounter && (
//             <div className="text-9xl font-extrabold flex justify-center items-center min-h-[200px]">
//               <span ref={currentRef} className="flex gap-1">
//                 {fadeOutAll ? vaporText("X") : "0"}
//               </span>
//             </div>
//           )}

//           {showText && (
//             <div className="absolute bottom-1/4 text-lg tracking-widest text-white/80">
//               {vaporText("PLEASE WAIT")}
//             </div>
//           )}
//         </div>
//       </div>

//       {triggerTransition && (
//         <PageTransition
//           trigger
//           onComplete={() => router.push("/note")}
//         />
//       )}
//     </>
//   );
// };

// export default LoadingUI;



'use client';

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

import "../../styles/loadingUI.css";
import { Cinzel } from 'next/font/google';
import Noise from "../effects/Noise";
import PageTransition from "../effects/PageTransition";

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '700'],
});

gsap.registerPlugin(CustomEase);

interface LoadingUIProps {
  startLoading: boolean;
}

const LoadingUI: React.FC<LoadingUIProps> = ({ startLoading }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showCounter, setShowCounter] = useState(false);
  const [fadeOutAll, setFadeOutAll] = useState(false);
  const [triggerTransition, setTriggerTransition] = useState(false);

  const hasLoaded = useRef(false);
  const currentRef = useRef<HTMLSpanElement>(null);
  const router = useRouter();

  const toRoman = (num: number): string => {
    const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
    return romanNumerals[num - 1] || "0";
  };

  const vaporText = (text: string) =>
    text.split("").map((char, i) => (
      <span
        key={i}
        className={`inline-block ${fadeOutAll ? "vapor-fade" : ""}`}
        style={{ animationDelay: `${i * 0.15}s` }}
      >
        {char}
      </span>
    ));

  const startLoadingCounter = useCallback(() => {
    let count = 0;

    const interval = setInterval(() => {
      if (currentRef.current) {
        if (count <= 10) {
          const roman = count === 0 ? "0" : toRoman(count);
          currentRef.current.textContent = roman;

          currentRef.current.style.color =
            roman === "0" || roman === "V" || roman === "X"
              ? "#F5F5F5"
              : "#ffbb00";

          if (roman === "X") {
            setTimeout(() => {
              setFadeOutAll(true);

              setTimeout(() => {
                setTriggerTransition(true); // ✅ mount and play transition
              }, 2500); // wait for vapor finish
            }, 2000); // wait after 'X'

            clearInterval(interval);
          }

          count++;
        }
      }
    }, 1000);
  }, []);

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
    <>
      <div
        className={`fixed inset-0 z-50 flex justify-center items-center transition-colors duration-[2000ms] ${cinzel.className}`}
        style={{ backgroundColor: isVisible ? "#000000" : "#ffffff" }}
      >
        <Noise />

        <div
          className={`loading-ui text-white flex flex-col justify-center items-center transition-opacity duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {showText && (
            <div className="absolute top-1/4 text-lg tracking-wide flex flex-col items-center">
              <div className="mb-2">{vaporText("LOADING")}</div>
              <div className={`loader ${fadeOutAll ? "vapor-fade" : ""}`} style={{ animationDelay: `1s` }} />
            </div>
          )}

          {showCounter && (
            <div className="text-9xl font-extrabold flex justify-center items-center min-h-[200px]">
              <span ref={currentRef} className="flex gap-1">
                {fadeOutAll ? vaporText("X") : "0"}
              </span>
            </div>
          )}

          {showText && (
            <div className="absolute bottom-1/4 text-lg tracking-widest text-white/80">
              {vaporText("PLEASE WAIT")}
            </div>
          )}
        </div>
      </div>

      {triggerTransition && (
        <PageTransition
          trigger
          onComplete={() => router.push("/note")}
        />
      )}
    </>
  );
};

export default LoadingUI;



// 'use client';

// import { useEffect, useRef, useState, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import gsap from "gsap";
// import CustomEase from "gsap/CustomEase";

// import "../../styles/loadingUI.css";
// import { Cinzel } from 'next/font/google';
// import Noise from "../effects/Noise";

// const cinzel = Cinzel({
//   subsets: ['latin'],
//   weight: ['400', '700'],
// });

// gsap.registerPlugin(CustomEase);

// interface LoadingUIProps {
//   startLoading: boolean;
//   onComplete?: () => void;
// }

// const LoadingUI: React.FC<LoadingUIProps> = ({ startLoading }) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [showText, setShowText] = useState(false);
//   const [showCounter, setShowCounter] = useState(false);
//   const [fadeOutAll, setFadeOutAll] = useState(false);
//   const [showWhiteFlash, setShowWhiteFlash] = useState(false);

//   const hasLoaded = useRef(false);
//   const currentRef = useRef<HTMLSpanElement>(null);
//   const router = useRouter();

//   const toRoman = (num: number): string => {
//     const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
//     return romanNumerals[num - 1] || "0";
//   };

//   const vaporText = (text: string) =>
//     text.split("").map((char, i) => (
//       <span
//         key={i}
//         className={`inline-block ${fadeOutAll ? "vapor-fade" : ""}`}
//         style={{ animationDelay: `${i * 0.15}s` }}
//       >
//         {char}
//       </span>
//     ));

//   const startLoadingCounter = useCallback(() => {
//     let count = 0;

//     const interval = setInterval(() => {
//       if (currentRef.current) {
//         if (count <= 10) {
//           const roman = count === 0 ? "0" : toRoman(count);
//           currentRef.current.textContent = roman;

//           currentRef.current.style.color =
//             roman === "0" || roman === "V" || roman === "X"
//               ? "#F5F5F5"
//               : "#ffbb00";

//           if (roman === "X") {
//             setTimeout(() => {
//               setFadeOutAll(true);

//               // After vapor animation, show white flash
//               setTimeout(() => {
//                 setShowWhiteFlash(true);

//                 // Route shortly after flash starts
//                 setTimeout(() => {
//                   router.push("/note/");
//                 }, 200); // delay lets flash start visually
//               }, 3000); // vaporize duration
//             }, 2000); // wait 2s after X
//             clearInterval(interval);
//           }

//           count++;
//         }
//       }
//     }, 1000);
//   }, [router]);

//   useEffect(() => {
//     if (startLoading && !hasLoaded.current) {
//       hasLoaded.current = true;
//       setIsVisible(true);
//       setShowText(true);

//       setTimeout(() => {
//         setShowCounter(true);
//         startLoadingCounter();
//       }, 1000);
//     }
//   }, [startLoading, startLoadingCounter]);

//   return (
//     <>
//       <div
//         className={`fixed inset-0 z-50 flex justify-center items-center transition-colors duration-[2000ms] ${cinzel.className}`}
//         style={{ backgroundColor: isVisible ? "#000000" : "#ffffff" }}
//       >
//         <Noise />

//         <div
//           className={`loading-ui text-white flex flex-col justify-center items-center transition-opacity duration-1000 ${
//             isVisible ? "opacity-100" : "opacity-0"
//           }`}
//         >
//           {/* Top: LOADING + loader */}
//           {showText && (
//             <div className="absolute top-1/4 text-lg tracking-wide flex flex-col items-center">
//               <div className="mb-2">{vaporText("LOADING")}</div>
//               <div className={`loader ${fadeOutAll ? "vapor-fade" : ""}`} style={{ animationDelay: `1s` }} />
//             </div>
//           )}

//           {/* Center: Counter */}
//           {showCounter && (
//             <div className="text-9xl font-extrabold flex justify-center items-center min-h-[200px]">
//               <span ref={currentRef} className="flex gap-1">
//                 {fadeOutAll ? vaporText("X") : "0"}
//               </span>
//             </div>
//           )}

//           {/* Bottom: PLEASE WAIT */}
//           {showText && (
//             <div className="absolute bottom-1/4 text-lg tracking-widest text-white/80">
//               {vaporText("PLEASE WAIT")}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Rising white light effect */}
//       <div className={`white-light-rise ${showWhiteFlash ? "active" : ""}`} />
//     </>
//   );
// };

// export default LoadingUI;


