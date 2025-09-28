import './globals.css';
import { SmoothScrollProvider } from '@/lib/context/smooth-scroll-provider';
import FuzzyOverlay from '@/app/_features/fuzzy-overlay';
import { Manrope } from 'next/font/google';
import LiquidBackground from '@/app/_features/liquid_background';
import { CursorProvider } from '@/lib/context/cursor-context';
import CustomCursor from '@/components/ui/custom-cursor';

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <CursorProvider>
          <div className="fixed top-0 left-0 -z-10 h-full w-full">
            {/* <LiquidBackground /> */}
            <FuzzyOverlay />
          </div>
          <SmoothScrollProvider>
            <div className="px-12">{children}</div>
          </SmoothScrollProvider>
          <CustomCursor />
        </CursorProvider>
      </body>
    </html>
  );
}
