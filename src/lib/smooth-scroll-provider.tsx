'use client';

import { useSmoothScroll } from '@/hooks/use-smooth-scroll';

export const SmoothScrollProvider = ({ children }: { children: React.ReactNode }) => {
  useSmoothScroll();
  return <>{children}</>;
};
