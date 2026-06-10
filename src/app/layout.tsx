import type { ReactNode } from 'react';
import { RootProvider } from 'fumadocs-ui/provider/next';
import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://bananalyz.junglesquad.fr'),
  title: {
    default: 'Bananalyz — LoL Esports Predictions for Discord',
    template: '%s | Bananalyz',
  },
  description:
    'Bananalyz is a Discord bot that lets your server predict League of Legends esports match outcomes. Pick the winner, predict the exact score, earn points, and compete on your server leaderboard.',
  keywords: [
    'Bananalyz',
    'League of Legends',
    'LoL',
    'esports',
    'predictions',
    'Discord bot',
    'LEC',
    'LCK',
    'LCS',
    'leaderboard',
  ],
  authors: [{ name: 'Bananalyz' }],
  creator: 'Bananalyz',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bananalyz.junglesquad.fr',
    siteName: 'Bananalyz',
    title: 'Bananalyz — LoL Esports Predictions for Discord',
    description:
      'Predict League of Legends esports match outcomes on your Discord server. Earn points, climb leaderboards, and compete with your community.',
    images: [
      {
        url: 'og.png',
        width: 1200,
        height: 630,
        alt: 'Bananalyz — LoL Esports Predictions for Discord',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bananalyz — LoL Esports Predictions for Discord',
    description:
      'Predict LoL esports match outcomes on Discord. Earn points, climb leaderboards.',
    images: ['og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f0f4ff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0f1e' },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
