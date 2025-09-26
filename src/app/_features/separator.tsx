'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Separator = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const pathLength = 597;
  const strokeDashoffset = useTransform(scrollYProgress, [0, 0.8], [pathLength, 0]);
  const scale = 3;
  const originalHeight = 2;

  return (
    <div ref={ref} className="relative flex w-full items-center justify-center">
      <svg
        width={pathLength * scale}
        height={originalHeight * scale}
        viewBox="0 0 597 2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-1/2"
      >
        <motion.path d="M0 1H597" stroke="#404040" strokeWidth="2" />

        <motion.path
          d="M0 1H597"
          stroke="white"
          strokeWidth="2"
          style={{
            strokeDasharray: pathLength,
            strokeDashoffset: strokeDashoffset,
          }}
        />
      </svg>
    </div>
  );
};
