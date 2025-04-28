'use client';

import React from "react";
import "../../styles/scroll_indicator.css";  // <-- ✅ ADD THIS LINE

const ScrollDownIndicator: React.FC = () => {
  return (
    <div className="absolute bottom-8 flex flex-col items-center text-black">
      <span className="text-sm mb-2">scroll down</span>

      {/* Circle with Arrow */}
      <button className="btn-scroll relative w-10 h-10">
        <span className="icon-arrow"></span>
      </button>
    </div>
  );
};

export default ScrollDownIndicator;
