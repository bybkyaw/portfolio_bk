'use client';

import React, { useEffect, useRef } from 'react';

const Noise: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;

    const imageData = ctx.createImageData(width, height);
    const buffer = new Uint32Array(imageData.data.buffer);

    for (let i = 0; i < buffer.length; i++) {
      const gray = Math.random() * 255;
      buffer[i] =
        (255 << 24) | // alpha
        (gray << 16) | // red
        (gray << 8) |  // green
        gray;          // blue
    }

    ctx.putImageData(imageData, 0, 0);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 opacity-[0.06]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default Noise;
