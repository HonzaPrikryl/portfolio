'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MenuToggle } from '@/components/ui/menu-toggle';
import { MobileMenu } from '@/app/_features/mobile-menu';
import { useSmoothScroll } from '@/lib/context/smooth-scroll-context';

interface Props {
  isReady: boolean;
  isFooterAnimationComplete: boolean;
}

export const Header = ({ isReady, isFooterAnimationComplete }: Props) => {
  const [lastY, setLastY] = useState(0);
  const controls = useAnimation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { lenis } = useSmoothScroll();

  const handleScrollTo = (target: string) => {
    if (lenis) {
      lenis.scrollTo(target, { duration: 2 });
    }
  };

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
    if (isFooterAnimationComplete) {
      controls.start('visible');
      return;
    }

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
  }, [lastY, isReady, controls, isFooterAnimationComplete]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  return (
    <>
      <motion.header
        className="fixed top-0 right-0 left-0 z-50 py-8 mix-blend-difference"
        variants={headerVariants}
        initial="initial"
        animate={controls}
      >
        <div className="max-w-8xl mx-auto w-full px-12 lg:px-20">
          <div className="flex items-center justify-between md:grid md:grid-cols-3">
            <div className="flex justify-start">
              <span className="text-3xl font-light lg:text-[3vw]">Honza P.</span>
            </div>
            <nav className="hidden items-center justify-center gap-8 md:flex">
              <Button variant="outline" onClick={() => handleScrollTo('#projects')}>
                <span className="text-lg font-light uppercase">projects</span>
              </Button>
              <Button variant="outline" onClick={() => handleScrollTo('#about-me')}>
                <span className="text-lg font-light uppercase">about</span>
              </Button>
            </nav>
            <div className="flex items-center justify-end gap-4">
              <div className="hidden md:block">
                <Button variant="outline" onClick={() => handleScrollTo('#contact')}>
                  <span className="text-lg font-light uppercase">contact me</span>
                </Button>
              </div>
              <div className="md:hidden">
                <MenuToggle isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
              </div>
            </div>
          </div>
        </div>
      </motion.header>
      <AnimatePresence>
        {isMenuOpen && <MobileMenu closeMenu={() => setIsMenuOpen(false)} />}
      </AnimatePresence>
    </>
  );
};
