'use client';

import React, { useEffect } from 'react';
import { motion, useAnimation, useMotionValue, MotionValue, Transition } from 'framer-motion';

interface CircularTextProps {
  text: string;
  spinDuration?: number;
  onHover?: 'slowDown' | 'speedUp' | 'pause';
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

const CircularText: React.FC<CircularTextProps> = ({
  text,
  spinDuration = 25,
  onHover = 'speedUp',
  className = '',
}) => {
  const letters = Array.from(text.toUpperCase());
  const controls = useAnimation();
  const rotation: MotionValue<number> = useMotionValue(0);

  useEffect(() => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start),
    });
  }, [spinDuration, text, onHover, controls, rotation]);

  const handleHoverStart = () => {
    const start = rotation.get();
    let transitionConfig: ReturnType<typeof getTransition> | Transition;

    switch (onHover) {
      case 'slowDown':
        transitionConfig = getTransition(spinDuration * 2, start);
        break;
      case 'speedUp':
        transitionConfig = getTransition(spinDuration / 4, start);
        break;
      case 'pause':
      default:
        transitionConfig = {
          rotate: { type: 'spring', damping: 20, stiffness: 300 },
          scale: { type: 'spring', damping: 20, stiffness: 300 },
        };
        break;
    }
    controls.start({ rotate: start, transition: transitionConfig });
  };

  const handleHoverEnd = () => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start),
    });
  };

  const circleSize = 200;
  const radius = circleSize / 2;

  return (
    <motion.div
      className={`relative flex cursor-pointer items-center justify-center font-light text-white ${className}`}
      style={{ rotate: rotation, width: circleSize, height: circleSize }}
      initial={{ rotate: 0 }}
      animate={controls}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {letters.map((letter, i) => {
        const rotationAngle = (i / letters.length) * 360;
        return (
          <span
            key={i}
            className="absolute h-full"
            style={{
              transform: `rotate(${rotationAngle}deg) translateY(-${radius}px)`,
              transformOrigin: `0 ${radius}px`,
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        );
      })}
    </motion.div>
  );
};

export default CircularText;
