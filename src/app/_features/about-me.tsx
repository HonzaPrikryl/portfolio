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
  "Hi, I'm a developer who loves to create order in the chaos of the digital world. I'm passionate about breaking down complex problems and building them back up into elegant solutions with clean code and a clear structure. My main playground is TypeScript combined with React and React Native, where I focus on crafting modern and smooth user experiences. I'm driven by challenges that force me to think differently. For me, learning new things isn't a chore—it's just how I'm wired.",
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
      <div className="flex flex-grow justify-between">
        <div className="w-full lg:w-7/12">
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
                className="text-lg font-light text-neutral-300 md:text-xl"
                isInView={isAboutInView}
              />
            ))}
          </div>
        </div>

        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate={isAboutInView ? 'animate' : 'initial'}
          ref={aboutRef}
          custom={0.4}
          className="mr-16 hidden items-center lg:flex"
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
        className="rounded-[2em] border border-neutral-200/40"
      >
        <Specializations isInView={isSpecializationsInView} />
      </motion.div>
    </SectionLayout>
  );
};
