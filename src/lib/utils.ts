import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Variants } from 'framer-motion';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom,
      duration: 0.9,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  }),
};

export const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/HonzaPrikryl' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/janprikryll/' },
  { name: 'Instagram', href: 'https://www.instagram.com/prikryll_' },
];

export const mailLink = 'mailto:janprikryl.me@gmail.com';
