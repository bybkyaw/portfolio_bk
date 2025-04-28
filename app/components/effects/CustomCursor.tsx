'use client';

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const CustomCursor: React.FC = () => {
  const ballRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ballRef.current) return;

    gsap.set(ballRef.current, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(ballRef.current, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(ballRef.current, "y", { duration: 0.6, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
        ref={ballRef}
        className="pointer-events-none fixed top-0 left-0 w-[50px] h-[50px] border-[3px] border-blue-400 rounded-full z-[99999]"
    />


  
  );
};

export default CustomCursor;
