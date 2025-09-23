'use client';

import { motion } from 'framer-motion';
import { AnimatedText } from '@/components/ui/animated-text';
import { MagneticButton } from '@/app/_features/magnetic-button';
import { fadeInUp } from '@/lib/utils';
import PaginationNumber from '@/app/_features/pagination-number';

interface Props {
  isReady: boolean;
}

const titleLines = ['REACT', ' / NATIVE', 'DEVELOPER'];

export const Hero = ({ isReady }: Props) => {
  return (
    <div className="relative mb-[2em] flex h-screen flex-col bg-transparent text-white">
      <div className="relative flex flex-1 items-center justify-center">
        <div className="relative text-left">
          <div className="text-[10vw] leading-none font-bold tracking-tighter md:text-[8vw] lg:text-[7vw]">
            {titleLines.map((line, index) => (
              <div key={index} className="overflow-hidden">
                <AnimatedText text={line} isReady={isReady} delay={index * 0.2} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        custom={0.9}
        variants={fadeInUp}
        initial="initial"
        animate={isReady ? 'animate' : 'initial'}
        className="absolute bottom-20 left-1/2 z-10 -translate-x-1/2"
      >
        <MagneticButton />
      </motion.div>
      <PaginationNumber isReady={isReady} currentPage={1} />
    </div>
  );
};
