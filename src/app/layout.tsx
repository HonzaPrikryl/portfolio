import './globals.css';
import { SmoothScrollProvider } from '@/lib/context/smooth-scroll-context';
import FuzzyOverlay from '@/app/_features/fuzzy-overlay';
import { Archivo } from 'next/font/google';
import { CursorProvider } from '@/lib/context/cursor-context';
import CustomCursor from '@/components/ui/custom-cursor';
import { Metadata } from 'next';
import AnimatedGradientBackground from '@/app/_features/animated-gradient-background';
import { Viewport } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://janprikryl.me';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Honza Přikryl | React Developer',
    template: '%s | Honza Přikryl',
  },
  description:
    'Portfolio of Honza Přikryl, a React and React Native developer focused on polished, scalable TypeScript interfaces.',
  keywords: [
    'Honza Přikryl',
    'React Developer',
    'React Native Developer',
    'TypeScript',
    'Frontend Developer',
    'Next.js',
  ],
  authors: [{ name: 'Honza Přikryl' }],
  creator: 'Honza Přikryl',
  openGraph: {
    title: 'Honza Přikryl | React Developer',
    description:
      'React and React Native portfolio focused on polished, scalable TypeScript interfaces.',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/project-vision.png',
        width: 1200,
        height: 681,
        alt: 'Vision project preview by Honza Přikryl',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Honza Přikryl | React Developer',
    description:
      'React and React Native portfolio focused on polished, scalable TypeScript interfaces.',
    images: ['/project-vision.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

const archivo = Archivo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-archivo',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={archivo.className} suppressHydrationWarning>
        <CursorProvider>
          <div className="fixed top-0 left-0 -z-10 h-screen w-screen">
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
