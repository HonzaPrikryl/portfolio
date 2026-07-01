'use client';

import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { Engine, Render, Runner, World, Bodies, Events, Body } from 'matter-js';
import { CursorVariant, useCursor } from '@/lib/context/cursor-context';
import { ContainerFitText } from '@/app/_features/container-fit-text';
import ShinyText from '@/components/ui/shiny-text';

interface BodyWithCustomData extends Body {
  customSize?: number;
  skillName?: string;
}

const HOVER_CURSOR_RADIUS = 32;
const CURSOR_BODY_EASING = 0.35;
const OFFSCREEN_POINTER_POSITION = { x: -1000, y: -1000 };

const setBodyPosition = (
  body: Body,
  position: { x: number; y: number },
  updateVelocity = false
) => {
  const setPosition = Body.setPosition as unknown as (
    targetBody: Body,
    targetPosition: { x: number; y: number },
    shouldUpdateVelocity?: boolean
  ) => void;

  setPosition(body, position, updateVelocity);
};

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
  { name: 'NODE JS', size: 100 },
  { name: 'REST API', size: 100 },
  { name: 'OPENLAYERS', size: 100 },
  { name: 'DRIZZLE', size: 100 },
  { name: 'PRISMA', size: 100 },
  { name: 'POSTGRESQL', size: 100 },
  { name: 'ZOD', size: 100 },
  { name: 'JEST', size: 100 },
  { name: 'VITEST', size: 100 },
  { name: 'HUSKY', size: 100 },
  { name: 'ESLINT', size: 100 },
  { name: 'PRETTIER', size: 100 },
  { name: 'CLERK', size: 100 },
  { name: 'CLAUDEFLARE R2', size: 100 },
  { name: 'SENTRY', size: 100 },
  { name: 'CI/CD', size: 100 },
];

export const Specializations = ({ isInView }: { isInView: boolean }) => {
  const { setCursorVariant } = useCursor();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<Engine | null>(null);
  const runnerRef = useRef<Runner | null>(null);
  const renderRef = useRef<Render | null>(null);
  const cursorBodyRef = useRef<Body | null>(null);
  const pointerRef = useRef({ ...OFFSCREEN_POINTER_POSITION, isInside: false });
  const skillBodiesRef = useRef<BodyWithCustomData[]>([]);
  const spawnTimeoutsRef = useRef<number[]>([]);
  const [hasAnimated, setHasAnimated] = useState(false);

  const updatePointerPosition = (event: PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    pointerRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      isInside: true,
    };
  };

  const handlePointerEnter = (event: PointerEvent<HTMLDivElement>) => {
    setCursorVariant(CursorVariant.HOVER);
    updatePointerPosition(event);

    if (cursorBodyRef.current) {
      setBodyPosition(cursorBodyRef.current, pointerRef.current);
      Body.setVelocity(cursorBodyRef.current, { x: 0, y: 0 });
    }
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    updatePointerPosition(event);
  };

  const handlePointerLeave = () => {
    setCursorVariant(CursorVariant.DEFAULT);
    pointerRef.current = { ...OFFSCREEN_POINTER_POSITION, isInside: false };

    if (cursorBodyRef.current) {
      setBodyPosition(cursorBodyRef.current, OFFSCREEN_POINTER_POSITION);
      Body.setVelocity(cursorBodyRef.current, { x: 0, y: 0 });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const isMobile = window.matchMedia('(max-width: 640px)').matches;
    const baseSize = isMobile ? 65 : 100;

    const engine = Engine.create();
    engineRef.current = engine;
    const width = container.clientWidth;
    const height = container.clientHeight;

    engine.positionIterations = 8;
    engine.velocityIterations = 6;
    engine.gravity.y = 0;

    const render = Render.create({
      element: container,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: 'transparent',
        pixelRatio: Math.min(window.devicePixelRatio || 1, 1.25),
      },
    });

    canvasRef.current = render.canvas;
    renderRef.current = render;

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

    const cursorBody = Bodies.circle(
      OFFSCREEN_POINTER_POSITION.x,
      OFFSCREEN_POINTER_POSITION.y,
      HOVER_CURSOR_RADIUS,
      {
        isStatic: true,
        render: { visible: false },
      }
    );
    cursorBodyRef.current = cursorBody;
    World.add(engine.world, cursorBody);

    Events.on(engine, 'beforeUpdate', () => {
      if (!pointerRef.current.isInside) return;

      const nextPosition = {
        x:
          cursorBody.position.x +
          (pointerRef.current.x - cursorBody.position.x) * CURSOR_BODY_EASING,
        y:
          cursorBody.position.y +
          (pointerRef.current.y - cursorBody.position.y) * CURSOR_BODY_EASING,
      };

      setBodyPosition(cursorBody, nextPosition, true);
    });

    Events.on(render, 'afterRender', () => {
      const context = render.context;
      context.save();
      skillBodiesRef.current.forEach((body) => {
        if (body.customSize && body.skillName) {
          const { x, y } = body.position;
          const fontSize = body.customSize / 7;
          context.font = `200 ${fontSize}px archivo`;
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
    runnerRef.current = runner;
    Render.run(render);

    return () => {
      spawnTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
      spawnTimeoutsRef.current = [];
      Runner.stop(runner);
      Render.stop(render);
      World.clear(engine.world, false);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
      if (canvasRef.current) {
        canvasRef.current.remove();
      }
      engineRef.current = null;
      runnerRef.current = null;
      renderRef.current = null;
      cursorBodyRef.current = null;
    };
  }, []);

  useEffect(() => {
    const engine = engineRef.current;
    const runner = runnerRef.current;

    if (!engine || !runner) return;

    if (isInView) {
      Runner.run(runner, engine);
    } else {
      Runner.stop(runner);
    }

    if (isInView && !hasAnimated) {
      setHasAnimated(true);

      engine.gravity.y = 0.5;

      skillBodiesRef.current.forEach((body, index) => {
        const timeoutId = window.setTimeout(() => {
          if (engineRef.current) {
            World.add(engineRef.current.world, body);
          }
        }, index * 100);
        spawnTimeoutsRef.current.push(timeoutId);
      });
    }
  }, [isInView, hasAnimated]);

  return (
    <div
      className="relative h-[400px] w-full overflow-hidden rounded-[2em]"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <ContainerFitText className="text-neutral-900">
          <ShinyText text="Tech Stack" />
        </ContainerFitText>
      </div>
      <div ref={containerRef} className="absolute inset-0" />
    </div>
  );
};
