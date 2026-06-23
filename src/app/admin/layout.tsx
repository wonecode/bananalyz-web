import type { ReactNode } from 'react';
import Link from 'next/link';

export const metadata = { title: 'Bananalyz Admin' };

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex" style={{ background: '#08090a', color: '#e2e4e9' }}>
      <aside
        className="shrink-0 flex flex-col sticky top-0 h-screen"
        style={{ width: 220, background: '#0d0e10', borderRight: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex items-center gap-2.5">
            <div style={{
              width: 30, height: 30, borderRadius: 8, flexShrink: 0,
              background: 'linear-gradient(135deg, #ffc400 0%, #ff9500 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
            }}>
              🍌
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#e2e4e9', lineHeight: 1.2 }}>Bananalyz</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Admin</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 flex flex-col" style={{ padding: '12px 10px', gap: 2 }}>
          <SidebarLabel>Général</SidebarLabel>
          <NavLink href="/admin" label="Dashboard" icon={
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
          } />
          <NavLink href="/admin/guilds" label="Serveurs" icon={
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          } />
        </nav>

        <div style={{ padding: '12px 10px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg transition-colors hover:bg-white/5 hover:text-white/60"
              style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', fontSize: 13, cursor: 'pointer', textAlign: 'left' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Déconnexion
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto" style={{ minWidth: 0 }}>
        {children}
      </main>
    </div>
  );
}

function SidebarLabel({ children }: { children: ReactNode }) {
  return (
    <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '8px 10px 4px' }}>
      {children}
    </div>
  );
}

function NavLink({ href, label, icon }: { href: string; label: string; icon: ReactNode }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-all hover:bg-white/5 hover:text-white"
      style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}
    >
      <span style={{ color: 'rgba(255,255,255,0.3)', display: 'flex' }}>{icon}</span>
      {label}
    </Link>
  );
}
