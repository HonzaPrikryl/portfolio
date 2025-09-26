'use client';

import { useEffect, useRef } from 'react';
import { Engine, Render, Runner, World, Bodies, Mouse, MouseConstraint, Events } from 'matter-js';

const skills = [
  { name: 'REACT', size: 100 },
  { name: 'REACT NATIVE', size: 100 },
  { name: 'TYPESCRIPT', size: 100 },
  { name: 'FRAMER MOTION', size: 100 },
  { name: 'NEXT JS', size: 100 },
  { name: 'PHP', size: 100 },
  { name: 'LARAVEL', size: 100 },
  { name: 'INERTIA JS', size: 100 },
  { name: 'REST API', size: 100 },
  { name: 'TAILWIND CSS', size: 100 },
  { name: 'MATERIAL UI', size: 100 },
  { name: 'SHADCN UI', size: 100 },
  { name: 'REDUX', size: 100 },
  { name: 'REACT QUERY', size: 100 },
  { name: 'ZUSTAND', size: 100 },
  { name: 'EXPO', size: 100 },
];

export const Specializations = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Engine | null>(null);
  const runnerRef = useRef<Runner | null>(null);
  const renderRef = useRef<Render | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!container || !canvas) {
      return;
    }

    const initMatter = (width: number, height: number) => {
      if (engineRef.current) {
        if (runnerRef.current) Runner.stop(runnerRef.current);
        if (renderRef.current) {
          Render.stop(renderRef.current);
          if (renderRef.current.canvas) renderRef.current.canvas.remove();
        }
        World.clear(engineRef.current.world, false);
        Engine.clear(engineRef.current);
        engineRef.current = null;
        runnerRef.current = null;
        renderRef.current = null;
      }

      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      if (!container.contains(canvas)) {
        container.appendChild(canvas);
      }

      const engine = Engine.create();
      engineRef.current = engine;
      engine.gravity.y = 0.6;

      const render = Render.create({
        element: container,
        canvas: canvas,
        engine: engine,
        options: {
          width,
          height,
          wireframes: false,
          background: 'transparent',
          showAngleIndicator: false,
          showVelocity: false,
        },
      });
      renderRef.current = render;

      Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: width, y: height },
      });

      const wallOptions = { isStatic: true, render: { visible: false }, restitution: 0.4 };
      World.add(engine.world, [
        Bodies.rectangle(width / 2, height + 50, width, 100, wallOptions),
        Bodies.rectangle(width / 2, -50, width, 100, wallOptions),
        Bodies.rectangle(-50, height / 2, 100, height, wallOptions),
        Bodies.rectangle(width + 50, height / 2, 100, height, wallOptions),
      ]);

      const skillBodies = skills.map((skill, index) => {
        const textureUrl = createCircleTexture(skill.name, skill.size);
        const body = Bodies.circle(width / 2 + (index - 2) * 100, height / 2, skill.size / 2, {
          restitution: 0.4,
          friction: 0.2,
          frictionAir: 0.001,
          density: 0.002,
          render: {
            fillStyle: '#fff',
            sprite: {
              texture: textureUrl,
              xScale: 1,
              yScale: 1,
            },
          },
        });
        return body;
      });

      World.add(engine.world, skillBodies);

      Events.on(engine, 'beforeUpdate', () => {
        const maxSpeed = 10;
        skillBodies.forEach((body) => {
          const speed = Math.sqrt(body.velocity.x ** 2 + body.velocity.y ** 2);
          if (speed > maxSpeed) {
            const factor = maxSpeed / speed;
            body.velocity.x *= factor;
            body.velocity.y *= factor;
          }
        });
      });

      const mouse = Mouse.create(render.canvas);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: { stiffness: 0.2, render: { visible: false } },
      });
      World.add(engine.world, mouseConstraint);

      Render.run(render);
      const runner = Runner.create();
      runnerRef.current = runner;
      Runner.run(runner, engine);
    };

    const width = 900;
    const height = 400;
    initMatter(width, height);

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry && renderRef.current) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          canvas.width = width;
          canvas.height = height;
          renderRef.current.options.width = width;
          renderRef.current.options.height = height;
          Render.lookAt(renderRef.current, {
            min: { x: 0, y: 0 },
            max: { x: width, y: height },
          });
        }
      }
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
      if (runnerRef.current) Runner.stop(runnerRef.current);
      if (renderRef.current) {
        Render.stop(renderRef.current);
        if (renderRef.current.canvas) renderRef.current.canvas.remove();
      }
      if (engineRef.current) {
        World.clear(engineRef.current.world, false);
        Engine.clear(engineRef.current);
      }
      engineRef.current = null;
      runnerRef.current = null;
      renderRef.current = null;
    };
  }, []);

  const createCircleTexture = (text: string, size: number): string => {
    const localCanvas = document.createElement('canvas');
    localCanvas.width = size;
    localCanvas.height = size;
    const context = localCanvas.getContext('2d');
    if (context) {
      context.beginPath();
      context.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
      context.fillStyle = 'transparent';
      context.fill();
      context.strokeStyle = 'rgba(255, 255, 255, 1)';
      context.lineWidth = 3;
      context.stroke();

      const fontSize = Math.max(12, size / 12);
      context.fillStyle = '#fff';
      context.font = `bold ${fontSize}px sans-serif`;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(text.toUpperCase(), size / 2, size / 2);
    }
    return localCanvas.toDataURL('image/png');
  };

  return (
    <div ref={containerRef} className="relative mx-auto h-[400px] w-[900px] overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0"
        style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}
      />
    </div>
  );
};
