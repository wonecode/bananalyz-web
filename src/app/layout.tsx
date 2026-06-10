import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Bananalyz — LoL esports predictions for Discord',
    template: '%s | Bananalyz',
  },
  description:
    'Predict League of Legends esports matches directly from Discord. Track your stats, compete on leaderboards, and climb with your server.',
  metadataBase: new URL('https://bananalyz.junglesquad.fr'),
  openGraph: {
    title: 'Bananalyz',
    description: 'LoL esports predictions for Discord',
    url: 'https://bananalyz.junglesquad.fr',
    siteName: 'Bananalyz',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bananalyz',
    description: 'LoL esports predictions for Discord',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>{children}</body>
    </html>
  );
}
