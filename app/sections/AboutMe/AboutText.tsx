'use client';

import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Inria_Serif } from 'next/font/google';
import CareerText from './effects/CareerText';

const inriaSerif = Inria_Serif({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  style: ['normal', 'italic'],
});

const spacingMap: Record<string, Record<number, string>> = {
  Billy: { 1: '0.12em', 2: '0.12em', 3: '0.12em', 4: '0.1em' },
  Kyaw: { 1: '0.15em', 2: '0.12em', 3: '0.1em' },
};

const animateStroke = (el: HTMLElement | null, active: boolean) => {
  if (!el) return;
  gsap.to(el, {
    color: active ? 'transparent' : 'white',
    WebkitTextStroke: active ? '0.5px white' : '1px white',
    duration: 0.3,
  });
};

const AboutText: React.FC = () => {
  const renderAnimatedText = (
    text: string,
    className: string,
    animation: { x: string[] }
  ) => {
    return (
      <motion.div
        className={className}
        animate={animation}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
      >
        {text.split('').map((char, i) => {
          const marginLeft = spacingMap[text]?.[i];
          return (
            <motion.span
              key={`${char}-${i}`}
              className="inline-block"
              onMouseEnter={(e) => animateStroke(e.currentTarget, true)}
              onMouseLeave={(e) => animateStroke(e.currentTarget, false)}
              style={{
                color: 'white',
                WebkitTextStroke: '1px white',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  ...(marginLeft ? { marginLeft } : {}),
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <>
      {/* Name block centered */}
      <div
        className={`absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-white uppercase text-center ${inriaSerif.className}`}
      >
        <div className="mb-[6vh]">
          {renderAnimatedText('Billy', 'text-[8vw] leading-none tracking-tight', {
            x: ['0vw', '10vw', '0vw'],
          })}
          {renderAnimatedText('Kyaw', 'text-[8vw] leading-none tracking-tight -mt-2 ml-[23.6vw]', {
            x: ['0vw', '-10vw', '0vw'],
          })}
        </div>
      </div>

      {/* Career text placed separately below */}
 <div className="absolute top-[calc(50%+8vw)] left-1/2 -translate-x-1/2 z-10">
  <CareerText />
</div>



    </>
  );
};

export default AboutText;


// 'use client';

// import { motion } from 'framer-motion';
// import gsap from 'gsap';
// import { Inria_Serif } from 'next/font/google';
// import CareerText from './effects/CareerText';

// const inriaSerif = Inria_Serif({
//   subsets: ['latin'],
//   weight: ['300', '400', '700'],
//   style: ['normal', 'italic'],
// });

// const spacingMap: Record<string, Record<number, string>> = {
//   Billy: { 1: '0.12em', 2: '0.12em', 3: '0.12em', 4: '0.1em' },
//   Kyaw: { 1: '0.15em', 2: '0.12em', 3: '0.1em' },
// };

// const animateStroke = (el: HTMLElement | null, active: boolean) => {
//   if (!el) return;
//   gsap.to(el, {
//     color: active ? 'transparent' : 'white',
//     WebkitTextStroke: active ? '0.5px white' : '1px white',
//     duration: 0.3,
//   });
// };

// const AboutText: React.FC = () => {
//   const renderAnimatedText = (
//     text: string,
//     className: string,
//     animation: { x: string[] }
//   ) => {
//     const sharedMotion = {
//       animate: animation,
//       transition: { duration: 90, repeat: Infinity, ease: 'linear' },
//     };

//     return (
//       <motion.div className={className} {...sharedMotion}>
//         {text.split('').map((char, i) => {
//           const marginLeft = spacingMap[text]?.[i];

//           return (
//             <motion.span
//               key={`${char}-${i}`}
//               className="inline-block"
//               onMouseEnter={(e) => animateStroke(e.currentTarget, true)}
//               onMouseLeave={(e) => animateStroke(e.currentTarget, false)}
//               style={{
//                 color: 'white',
//                 WebkitTextStroke: '1px white',
//               }}
//             >
//               <span
//                 style={{
//                   display: 'inline-block',
//                   ...(marginLeft ? { marginLeft } : {}),
//                 }}
//               >
//                 {char === ' ' ? '\u00A0' : char}
//               </span>
//             </motion.span>
//           );
//         })}
//       </motion.div>
//     );
//   };

//   return (
//     <div
//       className={`absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-white uppercase text-center ${inriaSerif.className}`}
//     >
//       {renderAnimatedText('Billy', 'text-[8vw] leading-none tracking-tight', {
//         x: ['0vw', '10vw', '0vw'],
//       })}

//       {renderAnimatedText('Kyaw', 'text-[8vw] leading-none tracking-tight -mt-2 ml-[23.6vw]', {
//         x: ['0vw', '-10vw', '0vw'],
//       })}

//       <CareerText />
//     </div>
//   );
// };

// export default AboutText;


// 'use client';

// import { motion } from 'framer-motion';
// import gsap from 'gsap';
// import { Inria_Serif } from 'next/font/google';
// import CareerText from './effects/CareerText';

// const inriaSerif = Inria_Serif({
//   subsets: ['latin'],
//   weight: ['300', '400', '700'],
//   style: ['normal', 'italic'],
// });

// const AboutText: React.FC = () => {
//   const spacingMap: Record<string, Record<number, string>> = {
//     Billy: { 1: '0.12em', 2: '0.12em', 3: '0.12em', 4: '0.1em' },
//     Kyaw: { 1: '0.15em', 2: '0.12em', 3: '0.1em' },
//   };

//   const handleHover = (el: HTMLElement | null) => {
//     if (!el) return;
//     gsap.to(el, {
//       color: 'transparent',
//       WebkitTextStroke: '0.5px white',
//       duration: 0.3,
//     });
//   };

//   const handleLeave = (el: HTMLElement | null) => {
//     if (!el) return;
//     gsap.to(el, {
//       color: 'white',
//       WebkitTextStroke: '1px white',
//       duration: 0.3,
//     });
//   };

//   const renderAnimatedText = (
//     text: string,
//     className: string,
//     animation: { x: string[] }
//   ) => (
//     <motion.div
//       className={className}
//       animate={animation}
//       transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
//     >
//       {text.split('').map((char, i) => {
//         const marginLeft = spacingMap[text]?.[i];
//         return (
//           <motion.span
//             key={`${char}-${i}`}
//             className="inline-block"
//             onMouseEnter={(e) => handleHover(e.currentTarget)}
//             onMouseLeave={(e) => handleLeave(e.currentTarget)}
//             style={{
//               color: 'white',
//               WebkitTextStroke: '1px white',
//             }}
//           >
//             {char === ' ' ? '\u00A0' : (
//               <span
//                 style={{
//                   display: 'inline-block',
//                   marginLeft,
//                 }}
//               >
//                 {char}
//               </span>
//             )}
//           </motion.span>
//         );
//       })}
//     </motion.div>
//   );

//   return (
//     <div
//       className={`absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-white uppercase text-center ${inriaSerif.className}`}
//     >
//       {renderAnimatedText('Billy', 'text-[8vw] leading-none tracking-tight', {
//         x: ['0vw', '10vw', '0vw'],
//       })}
//       {renderAnimatedText('Kyaw', 'text-[8vw] leading-none tracking-tight -mt-2 ml-[23.6vw]', {
//         x: ['0vw', '-10vw', '0vw'],
//       })}

//       {/* Frontend Developer glow effect moved to its own component */}
//       <CareerText />
//     </div>
//   );
// };

// export default AboutText;


