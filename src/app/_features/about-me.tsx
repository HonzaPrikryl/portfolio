'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

import CircularText from '@/components/ui/circular-text';
import { TextScrollAnimation } from '@/app/_features/text-scroll-animation';
import PaginationNumber from '@/app/_features/pagination-number';
import { Specializations } from '@/app/_features/specializations';
import { CursorVariant, useCursor } from '@/lib/context/cursor-context';
import SectionLayout from '@/app/_features/section-layout';
import { fadeInUp } from '@/lib/utils';

const aboutParagraphs = [
  'I design and build engaging and polished user interfaces for both web and mobile. My expertise lies in the TypeScript, React, and React Native ecosystem, where I focus on writing scalable and maintainable code that helps businesses grow.',
];

export const AboutMe = () => {
  const { setCursorVariant } = useCursor();
  const aboutRef = useRef(null);
  const isAboutInView = useInView(aboutRef, {
    amount: 0.5,
    once: true,
  });

  const specializationsRef = useRef(null);
  const isSpecializationsInView = useInView(specializationsRef, {
    amount: 0.2,
    once: true,
  });

  return (
    <SectionLayout>
      <div className="grid grid-cols-1 items-center gap-y-12 lg:grid-cols-6 lg:gap-x-16">
        <div className="lg:col-span-4">
          <motion.h2
            variants={fadeInUp}
            initial="initial"
            animate={isAboutInView ? 'animate' : 'initial'}
            ref={aboutRef}
            className="mb-4 text-4xl font-bold tracking-tighter md:text-6xl"
          >
            About Me
          </motion.h2>
          <div
            className="mb-6 space-y-6"
            onMouseEnter={() => setCursorVariant(CursorVariant.TEXT)}
            onMouseLeave={() => setCursorVariant(CursorVariant.DEFAULT)}
          >
            {aboutParagraphs.map((paragraph, index) => (
              <TextScrollAnimation
                key={index}
                text={paragraph}
                className="text-base font-light text-neutral-300 md:text-xl"
                isInView={isAboutInView}
              />
            ))}
          </div>
        </div>

        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate={isAboutInView ? 'animate' : 'initial'}
          custom={0.4}
          className="hidden lg:col-span-2 lg:flex lg:justify-center"
        >
          <CircularText text="DETERMINATION • LET'S CONNECT • " />
        </motion.div>
      </div>

      <motion.div
        ref={specializationsRef}
        variants={fadeInUp}
        initial="initial"
        animate={isSpecializationsInView ? 'animate' : 'initial'}
        custom={0.2}
        className="mt-4 rounded-[2em] border border-neutral-200/40 2xl:mt-24"
      >
        <Specializations isInView={isSpecializationsInView} />
      </motion.div>
    </SectionLayout>
  );
};
