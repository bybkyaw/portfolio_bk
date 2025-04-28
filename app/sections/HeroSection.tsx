'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const HeroSection: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY < 0) { // If user scrolls UP
        router.push("/note"); // Navigate back to note page
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [router]);

  return (
    <div className="w-full h-screen bg-black text-white flex justify-center items-center">
      <h1 className="text-4xl">Hero Welcome</h1>
    </div>
  );
};

export default HeroSection;


