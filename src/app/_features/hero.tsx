import { AnimatedText } from '@/components/ui/animated-text';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

interface Props {
  isReady: boolean;
}

const titleLines = ['MULTI–', 'DISCIPLINARY', 'DESIGNER'];

export const Hero = ({isReady}: Props) => {
  return (
    <div className="relative flex h-screen flex-col bg-transparent text-white">
      <header className="absolute top-0 left-0 right-0 z-10 p-8">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 p-4 justify-center">
              <span className="text-3xl font-light lg:text-[3vw]">Honza P.</span>
            </div>
          <nav className="hidden md:flex items-center gap-8">
            <Button variant="outline"><span className="text-lg uppercase font-light">projects</span></Button>
            <Button variant="outline"><span className="text-lg uppercase font-light">about</span></Button>
          </nav>
          <Button variant="outline" onClick={() => {}}>
            <span className="text-lg uppercase font-light">contact me</span>
          </Button>
        </div>
      </header>

      <div className="relative flex flex-1 items-center justify-center">
        <div className="relative text-center">
          <div className="text-[10vw] font-bold leading-none tracking-tighter md:text-[8vw] lg:text-[7vw]">
            {titleLines.map((line, index) => (
              <div key={index} className="overflow-hidden">
                <AnimatedText text={line} isReady={isReady} delay={index * 0.2} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="absolute bottom-0 left-0 right-0 z-10 p-8">
        <div className="flex items-center justify-between">
          <div className="text-sm">01 // 04 — SCROLL ↓</div>
          <div className="flex items-center justify-center h-16 w-16 border rounded-full">
            <ArrowDown size={24} />
          </div>
          <div className="w-[100px]" />
        </div>
      </footer>
    </div>
  );
};