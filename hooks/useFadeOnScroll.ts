'use client';

import { useEffect, useState, useRef } from 'react';

export const useFadeOnScroll = <T extends HTMLElement>(): [React.RefObject<T | null>, boolean] => {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.6 }
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, []);

  return [ref, isVisible];
};
