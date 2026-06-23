import { fetchAdmin } from '@/lib/admin-api';

type GuildsResponse = {
  guilds: {
    id: string;
    discordId: string;
    name: string | null;
    predictionChannelId: string | null;
    enabledLeagues: { name: string; slug: string }[];
    createdAt: string;
  }[];
  total: number;
};

export default async function AdminDashboard() {
  const data = await fetchAdmin<GuildsResponse>('/guilds');

  const total = data?.total ?? 0;
  const withChannel = data?.guilds.filter((g) => g.predictionChannelId).length ?? 0;
  const withLeagues = data?.guilds.filter((g) => g.enabledLeagues.length > 0).length ?? 0;
  const totalLeagues = data?.guilds.reduce((acc, g) => acc + g.enabledLeagues.length, 0) ?? 0;

  return (
    <div style={{ padding: '36px 40px', maxWidth: 960 }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 22, fontWeight: 600, color: '#e2e4e9', margin: 0, lineHeight: 1.3 }}>Dashboard</h1>
        <p style={{ marginTop: 4, fontSize: 13, color: 'rgba(255,255,255,0.3)', margin: '4px 0 0' }}>Vue d&apos;ensemble de Bananalyz</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 36 }}>
        <StatCard
          label="Serveurs"
          value={total}
          icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
          accent="#5aa9ff"
        />
        <StatCard
          label="Channels configurés"
          value={withChannel}
          icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>}
          accent="#a78bfa"
        />
        <StatCard
          label="Serveurs avec ligue"
          value={withLeagues}
          icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>}
          accent="#ffc400"
        />
        <StatCard
          label="Ligues activées"
          value={totalLeagues}
          icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>}
          accent="#34d399"
        />
      </div>

      {/* Recent guilds */}
      <div>
        <h2 style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: 14, letterSpacing: '0.02em' }}>Derniers serveurs</h2>
        <div style={{
          background: '#0d0e10',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 12,
          overflow: 'hidden',
        }}>
          {(data?.guilds ?? []).slice(0, 5).map((guild, i, arr) => (
            <div key={guild.id} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 20px',
              borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 10,
                  background: 'rgba(255,255,255,0.05)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.35)', flexShrink: 0,
                }}>
                  {guild.name?.[0]?.toUpperCase() ?? '?'}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#e2e4e9' }}>{guild.name ?? 'Serveur inconnu'}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 1 }}>{guild.discordId}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {guild.predictionChannelId && (
                  <span style={{
                    fontSize: 11, padding: '3px 9px', borderRadius: 20,
                    background: 'rgba(52,211,153,0.1)', color: 'rgba(52,211,153,0.8)',
                    border: '1px solid rgba(52,211,153,0.2)',
                  }}>Channel OK</span>
                )}
                {guild.enabledLeagues.slice(0, 2).map(l => (
                  <span key={l.slug} style={{
                    fontSize: 11, padding: '3px 9px', borderRadius: 20,
                    background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}>{l.name}</span>
                ))}
              </div>
            </div>
          ))}
          {(data?.guilds ?? []).length === 0 && (
            <div style={{ padding: '48px 20px', textAlign: 'center', color: 'rgba(255,255,255,0.15)', fontSize: 13 }}>
              Aucun serveur enregistré.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, accent }: { label: string; value: number; icon: React.ReactNode; accent: string }) {
  return (
    <div style={{
      background: '#0d0e10',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: 12,
      padding: '18px 20px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>{label}</span>
        <span style={{ color: accent, opacity: 0.7 }}>{icon}</span>
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, color: '#e2e4e9', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{value}</div>
    </div>
  );
}
