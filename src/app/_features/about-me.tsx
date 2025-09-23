'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

import CircularText from '@/components/ui/circular-text';
import { TextScrollAnimation } from '@/app/_features/text-scroll-animation';
import PaginationNumber from '@/app/_features/pagination-number';

const aboutParagraphs = [
  "Hi, I'm a developer who loves to create order in the chaos of the digital world. I'm passionate about breaking down complex problems and building them back up into elegant solutions with clean code and a clear structure. My main playground is TypeScript combined with React and React Native, where I focus on crafting modern and smooth user experiences. I'm driven by challenges that force me to think differently. For me, learning new things isn't a chore—it's just how I'm wired.",
];

const techStack = [
  'TypeScript',
  'React',
  'Next.js',
  'React Native',
  'Expo',
  'Redux',
  'Zustand',
  'React Query',
  'Material UI',
  'Shadcn UI',
  'Tailwind CSS',
  'Framer Motion',
  'PHP',
  'Laravel',
  'Inertia.js',
  'Rest API',
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

const tagVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export const AboutMe = () => {
  const techStackRef = useRef(null);
  const aboutRef = useRef(null);
  const isAboutInView = useInView(aboutRef, {
    amount: 0.5,
    once: true,
  });

  const isTechStackInView = useInView(techStackRef, { amount: 0.2 });

  return (
    <section className="relative z-10 flex h-full min-h-screen items-center justify-center py-24 text-white md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 ref={aboutRef} className="mb-8 text-4xl font-bold tracking-tighter md:text-5xl">
              About Me
            </h2>
            <PaginationNumber isReady={isAboutInView} currentPage={2} />
            <div className="mb-12 space-y-6">
              {aboutParagraphs.map((paragraph, index) => (
                <TextScrollAnimation
                  key={index}
                  text={paragraph}
                  className="text-lg font-light text-neutral-300 md:text-xl"
                />
              ))}
            </div>

            <div>
              <h3 className="mb-4 text-2xl font-semibold tracking-tight">My Tech Stack</h3>
              <motion.div
                ref={techStackRef}
                className="flex flex-wrap gap-3"
                variants={containerVariants}
                initial="hidden"
                animate={isTechStackInView ? 'visible' : 'hidden'}
              >
                {techStack.map((tech) => (
                  <motion.div
                    key={tech}
                    className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-light text-neutral-200"
                    variants={tagVariants}
                  >
                    {tech}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          <div className="mt-16 hidden items-center justify-center lg:col-span-5 lg:mt-0 lg:flex">
            <CircularText
              text="DETERMINATION • LET'S CONNECT • "
              spinDuration={20}
              onHover="speedUp"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
