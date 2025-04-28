'use client';

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GhostText from "../components/UI/GhostText";
import ScrollDownIndicator from "../components/UI/ScrollDownIndicator";
import HeroSection from "../sections/HeroSection";

gsap.registerPlugin(ScrollTrigger);

const Note: React.FC = () => {
  const [scrollEnabled, setScrollEnabled] = useState(false);

  const mainRef = useRef<HTMLElement>(null);
  const ghostRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setScrollEnabled(true);
    }, 7500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!ghostRef.current || !heroRef.current || !mainRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ghostRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 2.5, // very smooth follow
        pin: true,
      },
    });

    // Animate background and ghost fade at same time
    tl.to(mainRef.current, {
      backgroundColor: "#000000",
      ease: "power2.inOut",
    }, 0)

    tl.to(ghostRef.current, {
      opacity: 0,
      scale: 0.8,
      y: -100,
      ease: "power2.out",
    }, 0);

    // Delay HeroSection fade until background is almost black
    tl.fromTo(heroRef.current, {
      opacity: 0,
      y: 50,
    }, {
      opacity: 1,
      y: 0,
      ease: "power2.out",
      duration: 1.5,
    }, 0.5); // << delay hero fade-in after 50% scroll (soft overlap)

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    const preventScroll = (e: Event) => {
      if (!scrollEnabled) {
        e.preventDefault();
      }
    };

    const preventKeys = (e: KeyboardEvent) => {
      if (!scrollEnabled) {
        const keys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Space"];
        if (keys.includes(e.code)) {
          e.preventDefault();
        }
      }
    };

    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("keydown", preventKeys);

    return () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventKeys);
    };
  }, [scrollEnabled]);

  return (
    <main
      ref={mainRef}
      className={`w-full min-h-screen overflow-x-hidden ${
        scrollEnabled ? "overflow-y-scroll" : "overflow-hidden"
      } snap-y snap-mandatory transition-colors duration-1000`}
      style={{ backgroundColor: "#f5f5f5" }}
    >
      {/* Ghost Section */}
      <section
        id="ghost"
        ref={ghostRef}
        className="relative w-full h-screen flex flex-col justify-center items-center snap-start bg-transparent"
      >
        <GhostText />
        {scrollEnabled && <ScrollDownIndicator />}
      </section>

      {/* Hero Section */}
      <section
        id="hero"
        ref={heroRef}
        className="relative w-full h-screen flex justify-center items-center snap-start bg-transparent opacity-0"
      >
        <HeroSection />
      </section>
    </main>
  );
};

export default Note;


