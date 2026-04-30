'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Preloader } from './pre-loader';
import { Hero } from './hero';
import { AboutMe } from '@/app/_features/about-me';
import { Header } from '@/app/_features/header';
import { Separator } from '@/app/_features/separator';
import { Projects } from '@/app/_features/projects';
import { Footer } from '@/app/_features/footer';
import { Container } from '@/components/ui/container';

const PRELOADER_DURATION = 1400;
const READY_DELAY = 1700;

export const PortfolioPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [isFooterAnimationComplete, setIsFooterAnimationComplete] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const loadingDelay = prefersReducedMotion ? 0 : PRELOADER_DURATION;
    const readyDelay = prefersReducedMotion ? 0 : READY_DELAY;

    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';

    const timer = window.setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = 'auto';
    }, loadingDelay);

    const readyTimer = window.setTimeout(() => {
      setIsReady(true);
    }, readyDelay);

    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(readyTimer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <main>
      <AnimatePresence>{isLoading && <Preloader key="preloader" />}</AnimatePresence>
      <Header isReady={isReady} isFooterAnimationComplete={isFooterAnimationComplete} />
      <Container>
        <Hero isReady={isReady} />
        <Separator isReady={isReady} currentPage={2} totalPages={4} />
        <div id="about-me">
          <AboutMe />
        </div>
        <Separator isReady={isReady} currentPage={3} totalPages={4} />
        <div id="projects">
          <Projects />
        </div>
        <Separator isReady={isReady} currentPage={4} totalPages={4} />
      </Container>
      <Footer setIsFooterAnimationComplete={setIsFooterAnimationComplete} />
    </main>
  );
};
