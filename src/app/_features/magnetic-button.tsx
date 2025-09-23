'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export const MagneticButton = () => {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

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
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative flex h-48 w-48 items-center justify-center rounded-full"
    >
      <motion.div style={{ x: mainX, y: mainY }} className="absolute inset-0 rounded-full border" />

      <motion.div
        style={{ x: duplicateX, y: duplicateY }}
        animate={{ scale: isHovered ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="absolute inset-0 rounded-full border"
      />

      <motion.div style={{ x: arrowX, y: arrowY }}>
        <ArrowDown size={64} />
      </motion.div>
    </motion.button>
  );
};
