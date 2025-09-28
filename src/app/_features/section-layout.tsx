import React from 'react';

const SectionLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex h-full min-h-screen items-center justify-center">
      <div className="container flex h-full flex-col">{children}</div>
    </section>
  );
};

export default SectionLayout;
