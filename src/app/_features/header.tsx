'use client';

import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface Props {
  isReady: boolean;
}

export const Header = ({ isReady }: Props) => {
  const [lastY, setLastY] = useState(0);
  const controls = useAnimation();

  const headerVariants = {
    initial: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    hidden: {
      opacity: 0,
      y: '-100%',
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  } as const;

  useEffect(() => {
    if (isReady) {
      controls.start('visible');
    }
  }, [isReady, controls]);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (!isReady) return;

      if (currentY > lastY && currentY > 4) {
        controls.start('hidden');
      } else if (currentY < lastY) {
        controls.start('visible');
      }
      setLastY(currentY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastY, isReady, controls]);

  return (
    <motion.header
      className="fixed top-0 right-0 left-0 z-50 p-8 text-white mix-blend-difference"
      variants={headerVariants}
      initial="initial"
      animate={controls}
    >
      <div className="grid grid-cols-3 items-center">
        <div className="flex justify-start">
          <span className="text-3xl font-light lg:text-[3vw]">Honza P.</span>
        </div>
        <nav className="hidden items-center justify-center gap-8 md:flex">
          <Button variant="outline">
            <span className="text-lg font-light uppercase">projects</span>
          </Button>
          <Button variant="outline">
            <span className="text-lg font-light uppercase">about</span>
          </Button>
        </nav>
        <div className="flex justify-end">
          <Button variant="outline">
            <span className="text-lg font-light uppercase">contact me</span>
          </Button>
        </div>
      </div>
    </motion.header>
  );
};
