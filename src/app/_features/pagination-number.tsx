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
    <motion.div
      custom={0.7}
      variants={fadeInUp}
      initial="initial"
      animate={isReady ? 'animate' : 'initial'}
      className="align-start"
    >
      <div className="font-light lg:text-[1.5em]">{currentPage} // 04 — SCROLL ↓</div>
    </motion.div>
  );
};

export default PaginationNumber;
