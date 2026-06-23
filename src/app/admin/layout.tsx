import type { ReactNode } from 'react';
import Link from 'next/link';

export const metadata = { title: 'Bananalyz Admin' };

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-white/[0.06] bg-[#111111] flex flex-col">
        <div className="px-5 py-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <span className="text-lg">🍌</span>
            <span className="font-semibold text-sm tracking-wide">Bananalyz Admin</span>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          <NavLink href="/admin" label="Dashboard" icon="▦" />
          <NavLink href="/admin/guilds" label="Serveurs" icon="⬡" />
        </nav>
        <div className="px-4 py-4 border-t border-white/[0.06]">
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="w-full text-left text-xs text-white/30 hover:text-white/60 transition-colors py-1"
            >
              Déconnexion
            </button>
          </form>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}

function NavLink({ href, label, icon }: { href: string; label: string; icon: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-white/50 hover:text-white hover:bg-white/[0.05] transition-all"
    >
      <span className="text-white/25 text-xs">{icon}</span>
      {label}
    </Link>
  );
}
