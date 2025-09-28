'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { fadeInUp } from '@/lib/utils';

interface Props {
  text: string;
  className?: string;
  isInView?: boolean;
}

export const TextScrollAnimation = ({ text, className = '', isInView = false }: Props) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 85%', 'end 70%'],
  });

  const words = text.split(' ');
  const totalCharacters = text.length;
  let characterOffset = 0;

  return (
    <motion.p
      ref={ref}
      variants={fadeInUp}
      custom={0.5}
      animate={isInView ? 'animate' : 'initial'}
      initial="initial"
      className={`flex flex-wrap gap-x-2 ${className} leading-relaxed normal-case md:leading-loose md:uppercase`}
    >
      {words.map((word, wordIndex) => {
        const wordElement = (
          <span key={wordIndex} className="inline-flex" style={{ gap: '2px' }}>
            {word.split('').map((char, charIndex) => {
              const i = characterOffset + charIndex;
              const start = i / totalCharacters;
              const end = start + 1 / totalCharacters;
              const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);

              return (
                <motion.span key={charIndex} style={{ opacity }}>
                  {char}
                </motion.span>
              );
            })}
          </span>
        );
        characterOffset += word.length + 1;

        return wordElement;
      })}
    </motion.p>
  );
};
