import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { source } from '@/lib/source';
import Link from 'next/link';

const INVITE_URL =
  'https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=139586750592&scope=bot+applications.commands';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{
        title: (
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="text-lg">🍌</span>
            <span className="text-white">Bananalyz</span>
          </Link>
        ),
        children: (
          <Link
            href={INVITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto px-3 py-1.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90 hidden md:block"
            style={{
              background: '#5aa9ff',
              color: '#0a0f1e',
            }}
          >
            Add to Discord
          </Link>
        ),
      }}
    >
      {children}
    </DocsLayout>
  );
}
