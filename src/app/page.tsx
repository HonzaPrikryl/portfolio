'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Preloader } from './_features/pre-loader';
import { Hero } from './_features/hero';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2200)  
    const readyTimer = setTimeout(() => setIsReady(true), 2800); 

    return () => {
      clearTimeout(timer);
      clearTimeout(readyTimer);
    };
  }, []);

  return (
<main>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Hero isReady={isReady} />
        </>
      )}
    </main>

  );
}