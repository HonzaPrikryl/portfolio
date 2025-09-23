'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/utils';

interface Props {
  isReady: boolean;
  currentPage: number;
}

const PaginationNumber = ({ isReady, currentPage }: Props) => {
  return (
    <motion.footer
      custom={0.7}
      variants={fadeInUp}
      initial="initial"
      animate={isReady ? 'animate' : 'initial'}
      className="absolute right-0 bottom-200 left-0 z-20 p-8"
    >
      <div className="flex items-center justify-between">
        <div className="text-[1.5em] font-light">{currentPage} // 04 — SCROLL ↓</div>
        <div className="w-[100px]" />
      </div>
    </motion.footer>
  );
};

export default PaginationNumber;
