'use client';

import { ProjectLink } from '@/app/_features/project-link';
import SectionLayout from '@/app/_features/section-layout';
import { fadeInUp } from '@/lib/utils';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const projects = [
  {
    id: 1,
    title: 'Tradenza',
    category: 'Web / Full-Stack / Ownership',
    description:
      'Tradenza is my own SaaS — an open-source, self-hostable trading journal I designed, built, and run in production at tradenza.dev, where it already serves dozens of active users. Traders import executions from 25+ broker formats, review each one on an interactive price chart, and track the statistics, strategies, and discipline that turn raw history into a measurable, repeatable edge.',
    technologies: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'PostgreSQL',
      'Drizzle ORM',
      'Clerk',
      'Tailwind CSS',
      'Recharts',
      'Lightweight Charts',
      'Zod',
      'Vitest',
      'Sentry',
    ],
    imageUrl: '/project-tradenza.png',
    href: 'https://tradenza.dev/',
  },
  {
    id: 2,
    title: 'Vision',
    category: 'Web / Full-Stack',
    description:
      'A web platform for smart home-energy management. Users monitor and control household devices — batteries, inverters, breakers — visualize consumption and production over time, follow spot electricity prices and HDO signals, and set automations for maximum self-sufficiency. I worked as a full-stack developer across the React frontend, the Laravel API, real-time telemetry, and the admin panel.',
    technologies: [
      'React',
      'TypeScript',
      'Inertia.js',
      'Laravel',
      'PHP',
      'Tailwind CSS',
      'shadcn/ui',
      'React Hook Form',
      'Zod',
      'Recharts',
      'InfluxDB',
      'MySQL',
      'Firebase',
      'i18next',
      'Vite',
      'Docker',
    ],
    imageUrl: '/project-vision.png',
    href: 'https://vision.hardmin.com',
  },
  {
    id: 3,
    title: 'Hardmin',
    category: 'Web / Full-Stack',
    description:
      'A multi-tenant B2B platform for energy management, uniting real-time IoT telemetry with a full commercial suite for billing, contracts, projects, and reporting. I worked as a full-stack developer end to end — from the Laravel API, data endpoints, and integrations through to the React/TypeScript frontend, its data-heavy feature screens, and the shared design system.',
    technologies: [
      'React 19',
      'TypeScript',
      'Inertia.js',
      'Laravel',
      'PHP',
      'amCharts5',
      'TanStack Table',
      'React Hook Form',
      'Zod',
      'dnd-kit',
      'InfluxDB',
      'MySQL',
      'i18next',
      'Vite',
      'Docker',
      'Azure Pipelines',
    ],
    imageUrl: '/project-hardmin.png',
    href: 'https://hardmin.com/',
  },
  {
    id: 4,
    title: 'Metronome Prague',
    category: 'Web / Native / Full-Stack',
    description:
      'A festival companion product spanning a native iOS/Android app and a Laravel content platform that organizers use to run the event. I worked across the stack with a focus on the Expo/React Native client — lineup, day-by-day program, stage maps, QR tickets — and the Inertia/React admin dashboard.',
    technologies: [
      'React Native',
      'Expo',
      'Expo Router',
      'TypeScript',
      'Redux Toolkit',
      'redux-saga',
      'NativeWind',
      'Reanimated',
      'EAS',
      'Laravel',
      'Inertia.js',
      'React 19',
    ],
    imageUrl: '/project-metronome.png',
    href: 'https://www.metronome.cz/en',
  },
  {
    id: 5,
    title: 'iPortal Revisio',
    category: 'Native / Frontend',
    description:
      'A B2B tenant and property-management app for shopping-center retailers, covering energy metering, revenue reporting, helpdesk tickets, requests, and contracts. As the React Native developer I built the mobile client end to end — biometric auth, data visualizations, and a fully internationalized, component-driven UI.',
    technologies: [
      'React Native',
      'Expo',
      'Expo Router',
      'TypeScript',
      'Redux Toolkit',
      'redux-saga',
      'NativeWind',
      'Reanimated',
      'Victory',
      'Skia',
      'i18next',
      'EAS',
    ],
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

  const [openId, setOpenId] = useState<number | null>(projects[0].id);

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
          <ProjectLink
            key={project.id}
            {...project}
            open={openId === project.id}
            onToggle={() => setOpenId((prev) => (prev === project.id ? null : project.id))}
          />
        ))}
      </div>
    </SectionLayout>
  );
};
