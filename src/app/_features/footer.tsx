'use client';

import React, { useRef } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { socialLinks } from '@/lib/utils';
import { MagneticButton } from '@/app/_features/magnetic-button';
import { Button } from '@/components/ui/button';
import ShinyText from '@/components/ui/shiny-text';

interface Props {
  setIsFooterAnimationComplete: (value: boolean) => void;
}

export const Footer = ({ setIsFooterAnimationComplete }: Props) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: triggerRef,
    offset: ['start start', 'end end'],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [1.4, 0.7]);
  const scaleX = useTransform(scrollYProgress, [0, 1], [1.1, 0.96]);

  const mainOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const footerSocialsOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest >= 0.8) {
      setIsFooterAnimationComplete(true);
    } else {
      setIsFooterAnimationComplete(false);
    }
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    containerRef.current.style.setProperty('--mouse-x', `${x}px`);
    containerRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section
      ref={triggerRef}
      className="relative left-1/2 flex h-[110vh] w-full -translate-x-1/2 items-center justify-center text-white"
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <motion.div className="flex flex-col items-center gap-2">
          <motion.p
            style={{ opacity: mainOpacity }}
            className="text-lg font-light text-neutral-400"
          >
            GOT A PROJECT IN MIND?
          </motion.p>
          <h1 className="mb-16 text-6xl font-bold md:text-8xl lg:text-8xl">
            <ShinyText text="LET'S CONNECT" />
          </h1>
          <motion.div style={{ opacity: mainOpacity }}>
            <MagneticButton isText isMail text="WRITE A MESSAGE" />
          </motion.div>
        </motion.div>

        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          style={{ scaleX, scaleY, opacity: mainOpacity }}
          className="shiny-border pointer-events-none absolute inset-8 mt-[1em] rounded-[2rem] border border-white"
        />

        <motion.footer
          id="contact"
          style={{ opacity: footerSocialsOpacity }}
          className="absolute bottom-0 left-0 w-full"
        >
          <div className="mx-[4%] flex items-center justify-center text-neutral-400 md:justify-between">
            <span className="hidden text-xl sm:block">FEEL FREE TO CONNECT WITH ME ON SOCIAL</span>
            <div className="flex items-center gap-8">
              {socialLinks.map((link) => (
                <Button variant="outline" size="sm" key={link.name} className="uppercase">
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.name}
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </motion.footer>
      </div>
    </section>
  );
};
