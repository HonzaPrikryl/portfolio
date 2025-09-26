'use client';

import React, { useEffect } from 'react';
import { motion, useAnimation, useMotionValue, MotionValue } from 'framer-motion';

interface CircularTextProps {
  text: string;
  spinDuration?: number;
  className?: string;
}

const getRotationTransition = (duration: number, from: number) => ({
  from,
  to: from + 360,
  ease: 'linear' as const,
  duration,
  repeat: Infinity,
  type: 'tween' as const,
});

const getTransition = (duration: number, from: number) => ({
  rotate: getRotationTransition(duration, from),
  scale: { type: 'spring' as const, damping: 20, stiffness: 300 },
});

const CircularText: React.FC<CircularTextProps> = ({ text, spinDuration = 25, className = '' }) => {
  const letters = Array.from(text.toUpperCase());
  const controls = useAnimation();
  const rotation = useMotionValue(0);

  useEffect(() => {
    const startRotation = rotation.get();
    controls.start({
      rotate: startRotation + 360,
      scale: 1,
      transition: getTransition(spinDuration, startRotation),
    });
  }, [spinDuration, text, controls, rotation]);

  const handleHoverStart = () => {
    const currentRotation = rotation.get();

    const transitionConfig = getTransition(spinDuration / 4, currentRotation);
    controls.start({
      rotate: currentRotation + 360,
      transition: transitionConfig,
    });
  };

  const handleHoverEnd = () => {
    const currentRotation = rotation.get();
    controls.start({
      rotate: currentRotation + 360,
      scale: 1,
      transition: getTransition(spinDuration, currentRotation),
    });
  };

  const circleSize = 200;
  const radius = circleSize / 2;

  return (
    <motion.div
      className={`relative m-2 mx-auto h-[300px] w-[300px] origin-center cursor-pointer rounded-full text-center font-black text-white ${className}`}
      style={{ rotate: rotation }}
      initial={{ rotate: 0 }}
      animate={controls}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {letters.map((letter, i) => {
        const rotationDeg = (360 / letters.length) * i;
        const factor = Math.PI / letters.length;
        const x = factor * i;
        const y = factor * i;
        const transform = `rotateZ(${rotationDeg}deg) translate3d(${x}px, ${y}px, 0)`;

        return (
          <span
            key={i}
            className="absolute inset-0 inline-block text-2xl transition-all duration-500 ease-[cubic-bezier(0,0,0,1)]"
            style={{ transform, WebkitTransform: transform }}
          >
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
};

export default CircularText;
