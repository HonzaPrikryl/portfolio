'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { MenuIcon, X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  className?: string;
}

export const MenuToggle = ({ isOpen, setIsOpen, className }: Props) => {
  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className={`relative h-8 w-8 transition-colors ${className}`}
      aria-label="Toggle Menu"
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={isOpen ? 'close' : 'open'}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? (
            <X className="h-8 w-8 text-white" />
          ) : (
            <MenuIcon className="h-8 w-8 text-white" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};
