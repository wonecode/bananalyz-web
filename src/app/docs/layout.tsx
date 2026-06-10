import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { source } from '@/lib/source';
import Link from 'next/link';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{
        title: (
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span>🍌</span>
            <span>Bananalyz</span>
          </Link>
        ),
      }}
      sidebar={{
        banner: (
          <Link
            href="https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=139586750592&scope=bot+applications.commands"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center px-3 py-2 rounded-lg bg-[#ffd43b] text-[#0f1a0f] text-sm font-semibold hover:bg-[#f0b800] transition-colors"
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
