'use client';

import { useEffect, useRef, useState } from 'react';
import { Engine, Render, Runner, World, Bodies, Mouse, Events, Body } from 'matter-js';
import { CursorVariant, useCursor } from '@/lib/context/cursor-context';

interface BodyWithCustomData extends Body {
  customSize?: number;
  skillName?: string;
}

const skills = [
  { name: 'REACT', size: 100 },
  { name: 'NEXT JS', size: 100 },
  { name: 'TYPESCRIPT', size: 100 },
  { name: 'PHP', size: 100 },
  { name: 'LARAVEL', size: 100 },
  { name: 'REACT NATIVE', size: 100 },
  { name: 'EXPO', size: 100 },
  { name: 'ZUSTAND', size: 100 },
  { name: 'REDUX', size: 100 },
  { name: 'FRAMER MOTION', size: 100 },
  { name: 'REACT QUERY', size: 100 },
  { name: 'TAILWIND CSS', size: 100 },
  { name: 'MATERIAL UI', size: 100 },
  { name: 'SHADCN UI', size: 100 },
  { name: 'INERTIA JS', size: 100 },
  { name: 'DOCKER', size: 100 },
  { name: 'GIT', size: 100 },
];

export const Specializations = ({ isInView }: { isInView: boolean }) => {
  const { setCursorVariant } = useCursor();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<Engine | null>(null);
  const skillBodiesRef = useRef<BodyWithCustomData[]>([]);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const isMobile = window.matchMedia('(max-width: 640px)').matches;
    const baseSize = isMobile ? 65 : 100;

    const engine = Engine.create();
    engineRef.current = engine;
    const width = container.clientWidth;
    const height = container.clientHeight;

    (engine.timing as any).substeps = 5;
    engine.positionIterations = 12;
    engine.velocityIterations = 10;
    engine.gravity.y = 0;

    const render = Render.create({
      element: container,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: 'transparent',
        pixelRatio: window.devicePixelRatio || 1,
      },
    });

    canvasRef.current = render.canvas;

    const wallOptions = { isStatic: true, render: { visible: false } };
    World.add(engine.world, [
      Bodies.rectangle(width / 2, height + 50, width, 100, wallOptions),
      Bodies.rectangle(width / 2, -height * 2, width, 100, wallOptions),
      Bodies.rectangle(-50, height / 2, 100, height * 5, wallOptions),
      Bodies.rectangle(width + 50, height / 2, 100, height * 5, wallOptions),
    ]);

    skillBodiesRef.current = skills.map((skill) => {
      const radius = baseSize / 2;
      const x = Math.random() * (width - baseSize) + radius;
      const y = -150 - Math.random() * 200;

      const body: BodyWithCustomData = Bodies.circle(x, y, radius, {
        restitution: 0.6,
        friction: 0.2,
        render: {
          fillStyle: 'transparent',
          strokeStyle: '#696969',
          lineWidth: 1,
        },
      });

      body.customSize = baseSize;
      body.skillName = skill.name;

      return body;
    });

    const mouseBody = Bodies.circle(-10, -10, 30, {
      isStatic: true,
      render: { visible: false },
    });
    World.add(engine.world, mouseBody);

    const mouse = Mouse.create(render.canvas);
    Events.on(engine, 'beforeUpdate', () => {
      Body.setPosition(mouseBody, mouse.position);
    });

    Events.on(render, 'afterRender', () => {
      const context = render.context;
      context.save();
      skillBodiesRef.current.forEach((body) => {
        if (body.customSize && body.skillName) {
          const { x, y } = body.position;
          const fontSize = body.customSize / 6;
          context.font = `400 ${fontSize}px manrope`;
          context.fillStyle = '#cfcfcf';
          context.textAlign = 'center';
          context.textBaseline = 'middle';
          const words = body.skillName.split(' ');

          if (words.length > 1) {
            const lineHeight = fontSize * 1.1;
            const startY = y - (lineHeight * (words.length - 1)) / 2;
            words.forEach((word, index) => {
              context.fillText(word, x, startY + index * lineHeight);
            });
          } else {
            context.fillText(body.skillName, x, y);
          }
        }
      });
      context.restore();
    });

    const runner = Runner.create();
    Render.run(render);
    Runner.run(runner, engine);

    return () => {
      Runner.stop(runner);
      Render.stop(render);
      World.clear(engine.world, false);
      Engine.clear(engine);
      if (canvasRef.current) {
        canvasRef.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (isInView && !hasAnimated && engineRef.current) {
      setHasAnimated(true);

      engineRef.current.gravity.y = 0.5;

      skillBodiesRef.current.forEach((body, index) => {
        setTimeout(() => {
          if (engineRef.current) {
            World.add(engineRef.current.world, body);
          }
        }, index * 100);
      });
    }
  }, [isInView, hasAnimated]);

  return (
    <div
      className="w-[calc(100vw - 2rem)] relative mx-auto h-[400px] overflow-hidden rounded-[2em]"
      onMouseEnter={() => setCursorVariant(CursorVariant.HOVER)}
      onMouseLeave={() => setCursorVariant(CursorVariant.DEFAULT)}
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <h2 className="text-7xl text-neutral-900 uppercase md:text-[12em]">Tech Stack</h2>
      </div>
      <div ref={containerRef} className="absolute inset-0" />
    </div>
  );
};
