import "./globals.css";
import { SmoothScrollProvider } from '@/lib/smooth-scroll-provider';
import FuzzyOverlay from "@/app/_features/fuzzy-overlay";
import { Manrope } from 'next/font/google';
import LiquidBackground from "@/app/_features/liquid_background";

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={manrope.className + " bg-black md:px-4"}>
        <div className="fixed top-0 left-0 w-full h-full -z-10">
          <LiquidBackground colors={['#fff', '#fff', '#fff']} />
          <FuzzyOverlay />
        </div>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}