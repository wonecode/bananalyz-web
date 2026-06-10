import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { source } from '@/lib/source';
import {Zap} from "lucide-react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{
        title: (
          <span className="flex items-center gap-2 font-semibold">
            <img alt='banana' src="android-chrome-192x192.png" className='w-5 h-5' />
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
          {
              type: 'icon',
              label: 'Follow me on X',
              icon: <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.836L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
              </svg>,
              text: 'X',
              url: 'https://x.com/wonezer',
          },
      ]}
      sidebar={{
        footer: (
          <div className="flex items-center gap-1 mt-4 text-xs opacity-30">
              <Zap  size={12}/>
            Powered by Jungle Squad
          </div>
        ),
      }}
    >
      {children}
    </DocsLayout>
  );
}
