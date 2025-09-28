import React from 'react';
import { cn } from '@/lib/utils';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 5,
  className = '',
}) => {
  const animationDuration = `${speed}s`;

  return (
    <p
      className={cn('bg-clip-text text-transparent', !disabled && 'animate-shine', className)}
      style={{
        animationDuration: animationDuration,
        backgroundImage:
          'linear-gradient(120deg, rgba(181,181,181,0.4) 30%, rgba(255,255,255,1) 50%, rgba(181,181,181,0.4) 70%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
      }}
    >
      {text}
    </p>
  );
};

export default ShinyText;
