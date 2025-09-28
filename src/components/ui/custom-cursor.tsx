'use client';

import { useState, useEffect } from 'react';
import { motion, Transition } from 'framer-motion';
import { useCursor } from '@/lib/context/cursor-context';
import { ArrowUpRight } from 'lucide-react';
import { useIsTouchDevice } from '@/hooks/use-is-touch-device';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const { cursorVariant } = useCursor();
  const isTouchDevice = useIsTouchDevice();

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', mouseMove);
    return () => {
      window.removeEventListener('mousemove', mouseMove);
    };
  }, []);

  const circleVariants = {
    default: {
      x: position.x - 12,
      y: position.y - 12,
      height: 24,
      width: 24,
      border: '1px solid white',
      backgroundColor: 'transparent',
    },
    hover: {
      x: position.x - 32,
      y: position.y - 32,
      height: 64,
      width: 64,
      border: '1px solid white',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    text: {
      x: position.x - 80,
      y: position.y - 80,
      height: 160,
      width: 160,
      border: 'none',
      backgroundColor: 'white',
    },
    view: {
      x: position.x - 60,
      y: position.y - 60,
      height: 120,
      width: 120,
      border: '1px solid white',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    none: {
      x: position.x - 12,
      y: position.y - 12,
      height: 24,
      width: 24,
      border: '1px solid transparent',
      backgroundColor: 'transparent',
    },
  };

  const textVariants = {
    default: { opacity: 0, y: 10 },
    view: { opacity: 1, y: 0 },
  };

  const dotVariants = {
    default: { scale: 1 },
    hover: { scale: 1 },
    text: { scale: 1 },
    view: { scale: 0 },
    none: { scale: 0 },
  };

  const spring: Transition = {
    type: 'spring',
    stiffness: 400,
    damping: 40,
  };

  if (isTouchDevice) return;
  return (
    <>
      <motion.div
        variants={dotVariants}
        animate={cursorVariant}
        className="pointer-events-none fixed top-0 left-0 z-50 rounded-full bg-white mix-blend-difference"
        style={{ x: position.x - 3, y: position.y - 3, width: 6, height: 6 }}
      />
      <motion.div
        variants={circleVariants}
        animate={cursorVariant}
        transition={spring}
        className="pointer-events-none fixed top-0 left-0 z-50 flex items-center justify-center rounded-full mix-blend-difference"
      >
        {cursorVariant === 'view' && (
          <div className="flex flex-col items-center">
            <ArrowUpRight className="h-12 w-12" />
            <motion.span
              variants={textVariants}
              className="text-sm font-light text-white uppercase"
            >
              View
            </motion.span>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default CustomCursor;
