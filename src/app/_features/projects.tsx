'use client';

import { ProjectLink } from '@/app/_features/project-link';
import SectionLayout from '@/app/_features/section-layout';
import { fadeInUp } from '@/lib/utils';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const projects = [
  {
    id: 1,
    title: 'Hardmin',
    category: 'Web Development',
    imageUrl: '/project-hardmin.png',
    href: 'https://hardmin.com/',
  },
  {
    id: 2,
    title: 'Metronome Prague',
    category: 'Web / Native Development',
    imageUrl: '/project-metronome.png',
    href: 'https://www.metronome.cz/en',
  },
  {
    id: 3,
    title: 'iPortal Revisio',
    category: 'Native Development',
    imageUrl: '/project-iportal.png',
    href: 'https://apps.apple.com/cz/app/iportal-revisio/id6745760589',
  },
];

export const Projects = () => {
  const projectsRef = useRef(null);
  const isProjectsInView = useInView(projectsRef, {
    amount: 0.5,
    once: true,
  });

  return (
    <SectionLayout>
      <motion.div
        ref={projectsRef}
        className="mb-12"
        variants={fadeInUp}
        initial="initial"
        custom={0.2}
        animate={isProjectsInView ? 'animate' : 'initial'}
      >
        <h1 className="text-4xl font-bold tracking-tighter md:text-7xl">Featured Projects</h1>
        <p className="text-lg font-light text-neutral-500 md:text-xl">
          A curated selection of my public-facing work.
        </p>
      </motion.div>
      <div>
        {projects.map((project) => (
          <ProjectLink key={project.id} {...project} />
        ))}
      </div>
    </SectionLayout>
  );
};
