import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { source } from '@/lib/source';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{
        title: (
          <span className="flex items-center gap-2 font-semibold">
            <span className="text-lg">🍌</span>
            <span>Bananalyz</span>
          </span>
        ),
        url: '/',
      }}
      links={[
        {
          text: 'Add to Discord',
          url: 'https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=139586750592&scope=bot+applications.commands',
          external: true,
        },
        {
          text: 'Report an issue',
          url: 'https://x.com/wonezer',
          external: true,
        },
      ]}
    >
      {children}
    </DocsLayout>
  );
}
