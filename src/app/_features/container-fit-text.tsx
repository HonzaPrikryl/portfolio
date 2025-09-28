'use client';

import React, { useEffect, useRef, ReactNode } from 'react';

interface ScreenFitTextProps {
  children: ReactNode;
  className?: string;
}

export const ContainerFitText = ({ children, className }: ScreenFitTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const resizeText = () => {
      const container = containerRef.current;
      const text = textRef.current;

      if (!container || !text) {
        return;
      }

      const containerWidth = container.offsetWidth;
      let min = 1;
      let max = 2500;
      let optimalSize = 0;

      while (min <= max) {
        const mid = Math.floor((min + max) / 2);
        text.style.fontSize = mid + 'px';
        if (text.offsetWidth <= containerWidth) {
          optimalSize = mid;
          min = mid + 1;
        } else {
          max = mid - 1;
        }
      }
      text.style.fontSize = optimalSize + 'px';
    };

    resizeText();
    window.addEventListener('resize', resizeText);

    return () => {
      window.removeEventListener('resize', resizeText);
    };
  }, [children]);

  useEffect(() => {
    const text = textRef.current;
    if (text) {
      setTimeout(() => {
        text.style.opacity = '1';
      }, 50);
    }
  }, [children]);

  return (
    <div
      ref={containerRef}
      className={`flex h-full w-full items-center justify-center overflow-hidden ${className}`}
    >
      <span
        ref={textRef}
        className="whitespace-nowrap uppercase"
        style={{
          opacity: 0,
          transition: 'opacity 0.5s',
        }}
      >
        {children}
      </span>
    </div>
  );
};
