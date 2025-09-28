'use client';

import { CursorVariant, useCursor } from '@/lib/context/cursor-context';
import { motion } from 'framer-motion';

const DURATION = 0.6;
const STAGGER = 0.025;

type AnimatedTextProps = {
  text: string;
  className?: string;
  isReady: boolean;
  delay?: number;
};

export const AnimatedText = ({ text, className, isReady, delay = 0 }: AnimatedTextProps) => {
  const { setCursorVariant } = useCursor();

  if (!isReady) return null;

  return (
    <div className={`relative block overflow-hidden ${className}`}>
      <div className="flex justify-start lg:justify-center">
        {Array.from(text).map((letter, index) => (
          <motion.span
            key={index}
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: '-100%', opacity: 0 }}
            transition={{
              duration: DURATION,
              ease: 'easeInOut',
              delay: delay + STAGGER * index,
            }}
            className="inline-block"
            onMouseEnter={() => setCursorVariant(CursorVariant.TEXT)}
            onMouseLeave={() => setCursorVariant(CursorVariant.DEFAULT)}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </div>

      <div className="absolute inset-0 flex justify-start lg:justify-center">
        {Array.from(text).map((letter, index) => (
          <motion.span
            key={index}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: DURATION,
              ease: 'easeInOut',
              delay: delay + STAGGER * index,
            }}
            className="inline-block"
            onMouseEnter={() => setCursorVariant(CursorVariant.TEXT)}
            onMouseLeave={() => setCursorVariant(CursorVariant.DEFAULT)}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </div>
    </div>
  );
};
