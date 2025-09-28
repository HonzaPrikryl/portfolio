'use client';

import { CursorVariant, useCursor } from '@/lib/context/cursor-context';
import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
  visible: (delay: number = 0) => ({
    transition: {
      delayChildren: delay,
    },
  }),
  hidden: {},
};

const wordVariants: Variants = {
  hidden: {
    y: '110%',
    opacity: 1,
  },
  visible: {
    y: '0%',
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

type AnimatedTextProps = {
  text: string;
  className?: string;
  isReady: boolean;
  delay?: number;
};

export const AnimatedText = ({ text, className, isReady, delay = 0 }: AnimatedTextProps) => {
  const { setCursorVariant } = useCursor();
  const words = text.split(' ');

  if (!isReady) return null;

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      custom={delay}
      aria-label={text}
    >
      {words.map((word, index) => (
        <div key={index} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            variants={wordVariants}
            onMouseEnter={() => setCursorVariant(CursorVariant.TEXT)}
            onMouseLeave={() => setCursorVariant(CursorVariant.DEFAULT)}
          >
            {word}&nbsp;
          </motion.span>
        </div>
      ))}
    </motion.div>
  );
};
