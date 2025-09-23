'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const AnimatedArrowSeparator = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const pathLength = 503.9256286621094;

  const strokeDashoffset = useTransform(scrollYProgress, [0, 0.8], [pathLength, 0]);

  const scale = 3;
  const originalWidth = 501;
  const originalHeight = 33;

  return (
    <div
      ref={ref}
      className="relative mb-[-16em] flex h-[180px] w-full items-center justify-center"
    >
      <svg
        width={originalWidth * scale}
        height={originalHeight * scale}
        viewBox="0 0 501 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-1/2"
      >
        <motion.path
          d="M1 16.1255C201.279 -36.8139 293.611 70.563 500 16.1254"
          stroke="#404040"
          strokeWidth="1"
        />

        <motion.path
          d="M1 16.1255C201.279 -36.8139 293.611 70.563 500 16.1254"
          stroke="white"
          strokeWidth="1"
          style={{
            strokeDasharray: pathLength,
            strokeDashoffset: strokeDashoffset,
          }}
        />
      </svg>
    </div>
  );
};
