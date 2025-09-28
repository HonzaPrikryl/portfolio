import { useCursor, CursorVariant } from '@/lib/context/cursor-context';
import { useMotionValue, useSpring, useTransform, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeInUp } from '@/lib/utils';

interface ProjectLinkProps {
  title: string;
  category: string;
  imageUrl: string;
  href: string;
}

export const ProjectLink = ({ title, category, imageUrl, href }: ProjectLinkProps) => {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const { setCursorVariant } = useCursor();

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

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
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
    <motion.a
      href={href}
      ref={ref}
      custom={0.2}
      variants={fadeInUp}
      animate={isProjectsInView ? 'animate' : 'initial'}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setCursorVariant(CursorVariant.VIEW)}
      onMouseLeave={() => {
        setCursorVariant(CursorVariant.DEFAULT);
        x.set(0);
        y.set(0);
      }}
      initial="initial"
      whileHover="whileHover"
      className="group relative flex items-center justify-between border-b-2 border-neutral-700 py-6 transition-colors duration-500 hover:border-neutral-50 md:py-10"
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

      <motion.img
        style={{ top, left, rotate, translateX: '-50%', translateY: '-50%' }}
        variants={{
          initial: { scale: 0, opacity: 0 },
          whileHover: { scale: 1, opacity: 1 },
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 40 }}
        src={imageUrl}
        className="pointer-events-none absolute z-0 h-40 w-56 rounded-lg object-cover md:h-48 md:w-64"
        alt={`Project image for ${title}`}
      />

      <motion.div
        variants={{
          initial: { x: '25%', opacity: 0 },
          whileHover: { x: '0%', opacity: 1 },
        }}
        transition={{ type: 'spring' }}
        className="relative z-10"
      >
        <ArrowUpRight className="h-10 w-10 rotate-45 text-neutral-50" />
      </motion.div>
    </motion.a>
  );
};
