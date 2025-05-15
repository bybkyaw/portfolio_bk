'use client';

import React, { useEffect, useRef } from 'react';

interface NoiseProps {
  fadeOut?: boolean;
  className?: string;
  canvasRef?: React.RefObject<HTMLCanvasElement | null>;

}

const Noise: React.FC<NoiseProps> = ({ fadeOut = false, className = '', canvasRef }) => {

  const internalRef = useRef<HTMLCanvasElement>(null);
  const ref = canvasRef || internalRef;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const renderNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const buffer = new Uint32Array(imageData.data.buffer);

      for (let i = 0; i < buffer.length; i++) {
        const gray = Math.random() > 0.5 ? 255 : 0;
        buffer[i] = (255 << 24) | (gray << 16) | (gray << 8) | gray;
      }

      ctx.putImageData(imageData, 0, 0);
      requestAnimationFrame(renderNoise);
    };

    renderNoise();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={ref}
      className={`pointer-events-none absolute inset-0 z-0 transition-opacity duration-[2000ms] ease-in-out ${
        fadeOut ? 'opacity-0' : 'opacity-[0.07]'
      } ${className}`}
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default Noise;


