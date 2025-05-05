'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import '../../styles/PageTransition.css';

interface PageTransitionProps {
  trigger: boolean;
  onComplete?: () => void;
}

const PageTransition: React.FC<PageTransitionProps> = ({ trigger, onComplete }) => {
  const [play, setPlay] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (trigger) {
      setPlay(true);

      setTimeout(() => {
        onComplete?.();
        router.push('/note');
      }, 4500); // ⏱ match animation duration
    }
  }, [trigger, onComplete, router]);

  return (
    <div className={`white-light-rise ${play ? 'active' : ''}`} />
  );
};

export default PageTransition;
