'use client';

import { useEffect } from 'react';
import { motion, Transition, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useCursor } from '@/lib/context/cursor-context';
import { ArrowUpRight } from 'lucide-react';
import { useIsTouchDevice } from '@/hooks/use-is-touch-device';

const cursorOffsets = {
  default: 12,
  hover: 32,
  text: 80,
  view: 60,
  none: 12,
} as const;

const CustomCursor = () => {
  const { cursorVariant } = useCursor();
  const isTouchDevice = useIsTouchDevice();
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const offset = useMotionValue<number>(cursorOffsets.default);

  const circleX = useSpring(mouseX, { stiffness: 400, damping: 40 });
  const circleY = useSpring(mouseY, { stiffness: 400, damping: 40 });
  const smoothOffset = useSpring(offset, { stiffness: 420, damping: 38 });
  const dotX = useTransform(mouseX, (value) => value - 3);
  const dotY = useTransform(mouseY, (value) => value - 3);
  const ringX = useTransform([circleX, smoothOffset], ([x, centerOffset]: number[]) => {
    return x - centerOffset;
  });
  const ringY = useTransform([circleY, smoothOffset], ([y, centerOffset]: number[]) => {
    return y - centerOffset;
  });

  useEffect(() => {
    offset.set(cursorOffsets[cursorVariant]);
  }, [cursorVariant, offset]);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', mouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', mouseMove);
    };
  }, [mouseX, mouseY]);

  const circleVariants = {
    default: {
      height: 24,
      width: 24,
      border: '1px solid white',
      backgroundColor: 'transparent',
    },
    hover: {
      height: 64,
      width: 64,
      border: '1px solid white',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    text: {
      height: 160,
      width: 160,
      border: 'none',
      backgroundColor: 'white',
    },
    view: {
      height: 120,
      width: 120,
      border: '1px solid white',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    none: {
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

  if (isTouchDevice) return null;
  return (
    <>
      <motion.div
        variants={dotVariants}
        animate={cursorVariant}
        className="pointer-events-none fixed top-0 left-0 z-50 rounded-full bg-white mix-blend-difference"
        style={{ x: dotX, y: dotY, width: 6, height: 6 }}
      />
      <motion.div
        variants={circleVariants}
        animate={cursorVariant}
        transition={spring}
        className="pointer-events-none fixed top-0 left-0 z-50 flex items-center justify-center rounded-full mix-blend-difference"
        style={{ x: ringX, y: ringY }}
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
