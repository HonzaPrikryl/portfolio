'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Preloader } from './_features/pre-loader';
import { Hero } from './_features/hero';
import { AboutMe } from '@/app/_features/about-me';
import { Header } from '@/app/_features/header';
import { AnimatedArrowSeparator } from '@/app/_features/animated-arrow-separator';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);

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
      <Header isReady={isReady} />
      <Hero isReady={isReady} />
      <AnimatedArrowSeparator />
      <AboutMe />
    </main>
  );
}
