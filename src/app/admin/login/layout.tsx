import type { ReactNode } from 'react';

// La page login n'hérite pas du layout admin (pas de sidebar)
export default function LoginLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
