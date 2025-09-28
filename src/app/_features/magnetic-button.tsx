'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { CursorVariant, useCursor } from '@/lib/context/cursor-context';
import { useSmoothScroll } from '@/lib/context/smooth-scroll-context';
import { mailLink } from '@/lib/utils';

interface Props {
  isText?: boolean;
  text?: string;
  isMail?: boolean;
}

export const MagneticButton = ({ isText, text, isMail }: Props) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { setCursorVariant } = useCursor();
  const { lenis } = useSmoothScroll();

  const MAX_TRANSLATE = 100;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothOptions = { damping: 40, stiffness: 50, mass: 0.9 };
  const mainX = useSpring(mouseX, smoothOptions);
  const mainY = useSpring(mouseY, smoothOptions);

  const duplicateOptions = {
    damping: 20,
    stiffness: 250,
    mass: 0.4,
  };
  const duplicateX = useSpring(mouseX, duplicateOptions);
  const duplicateY = useSpring(mouseY, duplicateOptions);

  const arrowX = useTransform([mainX, duplicateX], ([x1, x2]: number[]) => (x1 + x2) / 2);
  const arrowY = useTransform([mainY, duplicateY], ([y1, y2]: number[]) => (y1 + y2) / 2);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setCursorVariant(CursorVariant.NONE);
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);
    const clampedX = Math.min(Math.max(x, -MAX_TRANSLATE), MAX_TRANSLATE);
    const clampedY = Math.min(Math.max(y, -MAX_TRANSLATE), MAX_TRANSLATE);
    mouseX.set(clampedX);
    mouseY.set(clampedY);
  };

  const handleMouseLeave = () => {
    setCursorVariant(CursorVariant.DEFAULT);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleScrollTo = (target: string) => {
    if (lenis) {
      lenis.scrollTo(target, { duration: 4 });
    }
  };

  const handleOnClick = () => {
    if (isMail) {
      window.location.href = mailLink;
    } else {
      handleScrollTo('#about-me');
    }
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative flex h-28 w-28 items-center justify-center rounded-full md:h-36 md:w-36 2xl:h-48 2xl:w-48"
      onClick={handleOnClick}
    >
      <motion.div style={{ x: mainX, y: mainY }} className="absolute inset-0 rounded-full border" />

      <motion.div
        style={{ x: duplicateX, y: duplicateY }}
        animate={{ scale: isHovered ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="absolute inset-0 rounded-full border"
      />

      <motion.div style={{ x: arrowX, y: arrowY }}>
        {!isText ? (
          <>
            <div className="block cursor-pointer md:hidden">
              <ArrowDown size={48} />
            </div>
            <div className="hidden cursor-pointer md:block">
              <ArrowDown size={64} />
            </div>
          </>
        ) : isHovered ? (
          <>
            <div className="block cursor-pointer md:hidden">
              <ArrowUpRight size={48} />
            </div>
            <div className="hidden cursor-pointer md:block">
              <ArrowUpRight size={64} />
            </div>
          </>
        ) : (
          <p className="text-sm font-light text-white uppercase">{text}</p>
        )}
      </motion.div>
    </motion.button>
  );
};
