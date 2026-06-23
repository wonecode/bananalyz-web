import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { source } from '@/lib/source';
import { Zap } from 'lucide-react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{
        title: (
          <span className="flex items-center gap-2 font-semibold">
            <img alt="banana" src="android-chrome-192x192.png" className="h-5 w-5" />
            <span>Bananalyz</span>
          </span>
        ),
        url: '/',
      }}
      links={[
        {
          text: 'Add to Discord',
          url: 'https://discord.com/oauth2/authorize?client_id=1498348728078176377&permissions=139586750592&scope=bot+applications.commands',
          external: true,
        },
        {
          text: 'Report an issue',
          url: 'https://x.com/wonezer',
          external: true,
        },
        {
          type: 'icon',
          label: 'Vote for us on Top.gg',
          icon: (
            <svg
              viewBox="120 120 580 580"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M655.711 247H330.71V572H397.113C422.599 572 447.042 561.876 465.064 543.854C483.086 525.832 493.21 501.389 493.21 475.902V409.5H559.613C585.099 409.5 609.542 399.375 627.564 381.354C645.586 363.332 655.711 338.889 655.711 313.402V247Z"
              />
              <path
                fill="currentColor"
                d="M144 247H306.5V409.5H193.657C180.531 409.5 167.943 404.286 158.661 395.004C149.379 385.722 144.165 373.134 144.165 360.008L144 247Z"
              />
            </svg>
          ),
          text: 'Top.gg',
          url: 'https://top.gg/fr/bot/1498348728078176377',
        },
        {
          type: 'icon',
          label: 'Follow me on X',
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.836L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
            </svg>
          ),
          text: 'X',
          url: 'https://x.com/wonezer',
        },
      ]}
      sidebar={{
        footer: (
          <div className="mt-4 flex items-center gap-1 text-xs opacity-30">
            <Zap size={12} />
            Powered by Jungle Squad
          </div>
        ),
      }}
    >
      {children}
    </DocsLayout>
  );
}
