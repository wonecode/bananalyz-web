import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { source } from '@/lib/source';

const INVITE_URL =
  'https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=139586750592&scope=bot+applications.commands';

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
          url: INVITE_URL,
          external: true,
        },
      ]}
    >
      {children}
    </DocsLayout>
  );
}
