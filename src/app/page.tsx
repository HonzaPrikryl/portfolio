'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Preloader } from './_features/pre-loader';
import { Hero } from './_features/hero';
import { AboutMe } from '@/app/_features/about-me';
import { Header } from '@/app/_features/header';
import { Separator } from '@/app/_features/separator';
import { Projects } from '@/app/_features/projects';
import { Footer } from '@/app/_features/footer';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [isFooterAnimationComplete, setIsFooterAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = 'auto';
    }, 2500);

    const readyTimer = setTimeout(() => {
      setIsReady(true);
    }, 2900);

    return () => {
      clearTimeout(timer);
      clearTimeout(readyTimer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <main>
      <AnimatePresence>{isLoading && <Preloader key="preloader" />}</AnimatePresence>
      <Header isReady={isReady} isFooterAnimationComplete={isFooterAnimationComplete} />
      <Hero isReady={isReady} />
      <Separator isReady={isReady} currentPage={2} totalPages={4} />
      <AboutMe />
      <Separator isReady={isReady} currentPage={3} totalPages={4} />
      <Projects />
      <Separator isReady={isReady} currentPage={4} totalPages={4} />
      <Footer setIsFooterAnimationComplete={setIsFooterAnimationComplete} />
    </main>
  );
}
