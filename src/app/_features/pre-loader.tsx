'use client';

import { motion, type Variants } from 'framer-motion';
import LoadingCount from '@/app/_features/loading-count';

const slideUp: Variants = {
  initial: {
    y: 0,
  },
  exit: {
    y: '-100vh',
    transition: { duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
  },
};

export const Preloader = () => {
  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white"
    >
      <LoadingCount className="text-5xl" to={100} />
    </motion.div>
  );
};