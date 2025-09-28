import './globals.css';
import { SmoothScrollProvider } from '@/lib/context/smooth-scroll-context';
import FuzzyOverlay from '@/app/_features/fuzzy-overlay';
import { Archivo } from 'next/font/google';
import LiquidBackground from '@/app/_features/liquid_background';
import { CursorProvider } from '@/lib/context/cursor-context';
import CustomCursor from '@/components/ui/custom-cursor';
import { Metadata } from 'next';

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
          <div className="fixed top-0 left-0 -z-10 h-full w-full">
            <LiquidBackground />
            <FuzzyOverlay />
          </div>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
          <CustomCursor />
        </CursorProvider>
      </body>
    </html>
  );
}
