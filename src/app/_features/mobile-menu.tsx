'use client';

import { useSmoothScroll } from '@/lib/context/smooth-scroll-context';
import { socialLinks } from '@/lib/utils';
import { motion, Variants } from 'framer-motion';

const menuItems = [
  { name: 'Projects', href: '#projects' },
  { name: 'About', href: '#about-me' },
  { name: 'Contact Me', href: '#contact' },
];

const menuVariants: Variants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
      delay: 0.3,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

const navContainerVariants: Variants = {
  hidden: {
    transition: {
      staggerChildren: 0.08,
      staggerDirection: -1,
    },
  },
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const navItemVariants: Variants = {
  hidden: {
    y: '100%',
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const MobileMenu = ({ closeMenu }: { closeMenu: () => void }) => {
  const { lenis } = useSmoothScroll();

  const handleScrollTo = (target: string) => {
    closeMenu();
    if (lenis) {
      lenis.scrollTo(target, { duration: 2 });
    }
  };

  return (
    <motion.div
      variants={menuVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="fixed inset-0 z-40 flex flex-col items-center justify-between bg-black p-8 text-white"
    >
      <div />

      <motion.nav
        variants={navContainerVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="flex flex-col items-center gap-8"
      >
        {menuItems.map((item) => (
          <div key={item.name} className="overflow-hidden">
            <motion.button
              onClick={() => handleScrollTo(item.href)}
              variants={navItemVariants}
              className="block text-5xl font-light uppercase"
            >
              {item.name}
            </motion.button>
          </div>
        ))}
      </motion.nav>

      <div className="flex w-full items-center justify-between text-neutral-400">
        <span className="text-sm">FEEL FREE TO CONNECT</span>
        <div className="flex gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-white"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
