import React from 'react';

export const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`max-w-8xl w-full px-9 md:px-12 ${className}`}>{children}</div>;
};
