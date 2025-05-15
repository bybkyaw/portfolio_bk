'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
  trigger: boolean;
  onComplete?: () => void;
  spotlightColor?: string;
  backgroundColor?: string;
}

const PageTransition: React.FC<PageTransitionProps> = ({
  trigger,
  onComplete,
  spotlightColor = '#f5f5f5',
  backgroundColor = 'rgba(0, 0, 0, 0.95)',
}) => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const latestPosition = useRef(position);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      const newPos = { x, y };
      latestPosition.current = newPos;
      if (trigger) setPosition(newPos);
    };

    if (trigger) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [trigger]);

  return (
    <AnimatePresence>
      {trigger && (
        <motion.div
          key="page-transition"
          initial={{
            background: `radial-gradient(circle at ${position.x}% ${position.y}%, ${spotlightColor} 0%, ${backgroundColor} 2%)`,
          }}
          animate={{
            background: `radial-gradient(circle at ${latestPosition.current.x}% ${latestPosition.current.y}%, ${spotlightColor} 0%, ${spotlightColor} 100%)`,
          }}
          exit={{
            background: `radial-gradient(circle at ${latestPosition.current.x}% ${latestPosition.current.y}%, ${spotlightColor} 100%, ${spotlightColor} 100%)`,
          }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            pointerEvents: 'none',
          }}
          onAnimationComplete={() => {
            onComplete?.();
          }}
        />
      )}
    </AnimatePresence>
  );
};

export default PageTransition;


// 'use client';

// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// interface PageTransitionProps {
//   trigger: boolean;
//   onComplete?: () => void;
//   spotlightColor?: string;
//   backgroundColor?: string;
// }

// const PageTransition: React.FC<PageTransitionProps> = ({
//   trigger,
//   onComplete,
//   spotlightColor = '#f5f5f5',
//   backgroundColor = 'rgba(0, 0, 0, 0.95)'
// }) => {
//   const [position, setPosition] = useState({ x: 50, y: 50 });
  
//   // Update spotlight position based on mouse position when triggered
//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       if (!trigger) return;
//       const x = (e.clientX / window.innerWidth) * 100;
//       const y = (e.clientY / window.innerHeight) * 100;
//       setPosition({ x, y });
//     };
    
//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, [trigger]);

//   return (
//     <AnimatePresence>
//       {trigger && (
//         <motion.div
//           key="page-transition"
//           initial={{
//             background: `radial-gradient(circle at ${position.x}% ${position.y}%, ${spotlightColor} 0%, ${backgroundColor} 2%)`
//           }}
//           animate={{
//             background: `radial-gradient(circle at ${position.x}% ${position.y}%, ${spotlightColor} 0%, ${spotlightColor} 100%)`
//           }}
//           exit={{
//             background: `radial-gradient(circle at ${position.x}% ${position.y}%, ${spotlightColor} 100%, ${spotlightColor} 100%)`
//           }}
//           transition={{ duration: 1.5, ease: 'easeInOut' }}
//           style={{
//             position: 'fixed',
//             inset: 0,
//             zIndex: 9999,
//             pointerEvents: 'none',
//           }}
//           onAnimationComplete={() => {
//             if (onComplete) onComplete();
//           }}
//         />
//       )}
//     </AnimatePresence>
//   );
// };

// export default PageTransition;



