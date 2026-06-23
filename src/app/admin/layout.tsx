import type { ReactNode } from 'react';
import Link from 'next/link';

export const metadata = { title: 'Bananalyz Admin' };

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#070809', color: '#d4d6db', fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
      <aside style={{
        width: 200,
        flexShrink: 0,
        background: '#0b0c0e',
        borderRight: '1px solid rgba(255,255,255,0.055)',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        height: '100vh',
      }}>
        {/* Logo */}
        <div style={{ padding: '18px 16px 14px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 7, flexShrink: 0,
              background: 'linear-gradient(145deg, #ffcf2f 0%, #f59500 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, boxShadow: '0 2px 8px rgba(255,180,0,0.3)',
            }}>🍌</div>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 650, color: '#e8eaed', letterSpacing: '-0.01em' }}>Bananalyz</div>
              <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 0.5 }}>Admin</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '10px 8px', display: 'flex', flexDirection: 'column', gap: 1 }}>
          <div style={{ fontSize: 9.5, fontWeight: 600, color: 'rgba(255,255,255,0.18)', letterSpacing: '0.09em', textTransform: 'uppercase', padding: '6px 8px 4px' }}>Général</div>
          <NavLink href="/admin" label="Dashboard" icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
          } />
          <NavLink href="/admin/guilds" label="Serveurs" icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          } />
        </nav>

        {/* Footer */}
        <div style={{ padding: '8px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <form action="/api/admin/logout" method="POST">
            <button type="submit" className="group w-full flex items-center gap-2 rounded-md transition-colors hover:bg-white/[0.05]" style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '7px 8px', fontSize: 12.5, color: 'rgba(255,255,255,0.28)', textAlign: 'left',
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Déconnexion
            </button>
          </form>
        </div>
      </aside>

      <main style={{ flex: 1, minWidth: 0, overflowY: 'auto' }}>{children}</main>
    </div>
  );
}

function NavLink({ href, label, icon }: { href: string; label: string; icon: ReactNode }) {
  return (
    <Link href={href} className="flex items-center gap-2 rounded-md transition-all hover:bg-white/[0.05] hover:text-white/80" style={{
      padding: '7px 8px', fontSize: 12.5, fontWeight: 500,
      color: 'rgba(255,255,255,0.42)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8,
    }}>
      <span style={{ display: 'flex', color: 'rgba(255,255,255,0.28)', flexShrink: 0 }}>{icon}</span>
      {label}
    </Link>
  );
}
