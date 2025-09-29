import './globals.css';
import { SmoothScrollProvider } from '@/lib/context/smooth-scroll-context';
import FuzzyOverlay from '@/app/_features/fuzzy-overlay';
import { Archivo } from 'next/font/google';
import { CursorProvider } from '@/lib/context/cursor-context';
import CustomCursor from '@/components/ui/custom-cursor';
import { Metadata } from 'next';
import AnimatedGradientBackground from '@/app/_features/animated-gradient-background';

export const metadata: Metadata = {
  title: 'Honza Přikryl | React Developer',
};

const archivo = Archivo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-archivo',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={archivo.className}>
        <CursorProvider>
          <div className="fixed top-0 left-0 -z-10 h-dvh w-full">
            <AnimatedGradientBackground />
            <FuzzyOverlay />
          </div>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
          <CustomCursor />
        </CursorProvider>
      </body>
    </html>
  );
}
