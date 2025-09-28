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
  "Hi, I'm a creative software developer who loves to create order in the chaos of the digital world. I'm passionate about elegant architecture with clean code. My main playground is TypeScript combined with React and React Native, where I focus on crafting modern and smooth user experiences. I'm driven by challenges that force me to think differently.",
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
        className="mt-4 rounded-[2em] border border-neutral-200/40 lg:mt-24"
      >
        <Specializations isInView={isSpecializationsInView} />
      </motion.div>
    </SectionLayout>
  );
};
