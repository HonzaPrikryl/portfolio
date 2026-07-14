import { useCursor, CursorVariant } from '@/lib/context/cursor-context';
import { useMotionValue, useSpring, useTransform, motion, useInView } from 'framer-motion';
import { ArrowUpRight, Plus } from 'lucide-react';
import { useId, useRef } from 'react';
import { fadeInUp } from '@/lib/utils';
import Image from 'next/image';

interface ProjectLinkProps {
  title: string;
  category: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  href: string;
  open: boolean;
  onToggle: () => void;
}

export const ProjectLink = ({
  title,
  category,
  description,
  technologies,
  imageUrl,
  href,
  open,
  onToggle,
}: ProjectLinkProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLButtonElement | null>(null);
  const { setCursorVariant } = useCursor();
  const panelId = useId();

  const isProjectsInView = useInView(ref, {
    amount: 0.5,
    once: true,
  });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 50 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 50 });

  const top = useTransform(mouseYSpring, [-0.5, 0.5], ['35%', '65%']);
  const left = useTransform(mouseXSpring, [-0.5, 0.5], ['60%', '80%']);
  const rotate = useTransform(mouseXSpring, [-0.5, 0.5], ['0deg', '5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!headerRef.current) return;
    const rect = headerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.div
      ref={ref}
      custom={0.2}
      variants={fadeInUp}
      initial="initial"
      animate={isProjectsInView ? 'animate' : 'initial'}
      className="group border-b-2 border-neutral-700 transition-colors duration-500 hover:border-neutral-50"
    >
      <motion.button
        ref={headerRef}
        type="button"
        onClick={onToggle}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setCursorVariant(CursorVariant.VIEW)}
        onMouseLeave={() => {
          setCursorVariant(CursorVariant.DEFAULT);
          x.set(0);
          y.set(0);
        }}
        initial="initial"
        whileHover="whileHover"
        aria-expanded={open}
        aria-controls={panelId}
        className="relative flex w-full items-center justify-between py-6 text-left md:py-10"
      >
        <div>
          <motion.span
            variants={{
              initial: { x: 0 },
              whileHover: { x: -16 },
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            className="relative z-10 block text-4xl font-light text-neutral-400 transition-colors duration-500 group-hover:text-neutral-50 md:text-6xl"
          >
            {title}
          </motion.span>
          <span className="relative z-10 mt-2 block text-base font-light tracking-widest text-neutral-500 uppercase transition-colors duration-500 group-hover:text-neutral-50">
            {category}
          </span>
        </div>

        <motion.div
          style={{ top, left, rotate, translateX: '-50%', translateY: '-50%' }}
          variants={{
            initial: { scale: 0, opacity: 0 },
            whileHover: { scale: 1, opacity: 1 },
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 40 }}
          className="pointer-events-none absolute z-0 h-40 w-56 overflow-hidden rounded-lg md:h-48 md:w-64"
        >
          <Image
            src={imageUrl}
            alt={`Project image for ${title}`}
            fill
            unoptimized
            quality={100}
            sizes="256px"
            className="object-cover select-none"
            draggable={false}
          />
        </motion.div>

        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 40 }}
          className="relative z-10 shrink-0 md:translate-x-4"
        >
          <Plus className="h-8 w-8 text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50 md:h-12 md:w-12" />
        </motion.div>
      </motion.button>

      <div
        id={panelId}
        aria-hidden={!open}
        className="grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.6,-0.05,0.01,0.99)] motion-reduce:transition-none"
        style={{ gridTemplateRows: open ? '1fr' : '0fr', opacity: open ? 1 : 0 }}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={`max-w-2xl pb-8 md:pb-10 ${open ? '' : 'pointer-events-none'}`}
          >
            <p className="text-sm font-light text-neutral-400 md:text-base">{description}</p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-neutral-700 px-3 py-1 text-xs font-light tracking-wide text-neutral-400"
                >
                  {tech}
                </li>
              ))}
            </ul>

            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={open ? 0 : -1}
              onMouseEnter={() => setCursorVariant(CursorVariant.VIEW)}
              onMouseLeave={() => setCursorVariant(CursorVariant.DEFAULT)}
              className="group/link mt-8 inline-flex items-center gap-2 text-sm font-light tracking-widest text-neutral-300 uppercase transition-colors duration-300 hover:text-neutral-50"
            >
              Visit project
              <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
