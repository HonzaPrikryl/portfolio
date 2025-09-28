'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { fadeInUp } from '@/lib/utils';

interface Props {
  isReady: boolean;
  currentPage: number;
  totalPages: number;
}

export const Separator = ({ isReady, currentPage, totalPages }: Props) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const pathLength = 597;
  const strokeDashoffset = useTransform(scrollYProgress, [0, 0.8], [pathLength, 0]);

  const formatPageNumber = (num: number) => String(num).padStart(2, '0');

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      initial="initial"
      animate={isReady ? 'animate' : 'initial'}
      className="relative z-20 flex w-full items-center justify-center gap-4 text-[1.5em] font-light"
    >
      <div className="flex items-center gap-2 whitespace-nowrap">
        <span>{formatPageNumber(currentPage)}</span>
        <span>/</span>
      </div>

      <div className="w-full flex-grow">
        <svg
          width="100%"
          height="2"
          viewBox="0 0 597 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path d="M0 1H597" stroke="#404040" strokeWidth="2" />
          <motion.path
            d="M0 1H597"
            stroke="white"
            strokeWidth="2"
            style={{
              strokeDasharray: pathLength,
              strokeDashoffset,
            }}
          />
        </svg>
      </div>

      <div className="flex items-center gap-2 whitespace-nowrap">
        <span>/</span>
        <span>{formatPageNumber(totalPages)}</span>
      </div>
    </motion.div>
  );
};
