import { fetchAdmin } from '@/lib/admin-api';
import React from 'react';

type Guild = {
  id: string;
  discordId: string;
  name: string | null;
  predictionChannelId: string | null;
  enabledLeagues: { name: string; slug: string }[];
  createdAt: string;
};

type GuildsResponse = { guilds: Guild[]; total: number };

const LEAGUE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  lec: { bg: 'rgba(90,169,255,0.1)', text: 'rgba(90,169,255,0.9)', border: 'rgba(90,169,255,0.2)' },
  lck: { bg: 'rgba(255,196,0,0.1)', text: 'rgba(255,196,0,0.85)', border: 'rgba(255,196,0,0.2)' },
  lpl: { bg: 'rgba(255,100,80,0.1)', text: 'rgba(255,100,80,0.85)', border: 'rgba(255,100,80,0.2)' },
  lcs: { bg: 'rgba(52,211,153,0.1)', text: 'rgba(52,211,153,0.85)', border: 'rgba(52,211,153,0.2)' },
  msi: { bg: 'rgba(167,139,250,0.1)', text: 'rgba(167,139,250,0.85)', border: 'rgba(167,139,250,0.2)' },
};

function getLeagueColor(slug: string) {
  return LEAGUE_COLORS[slug.toLowerCase()] ?? { bg: 'rgba(255,255,255,0.06)', text: 'rgba(255,255,255,0.45)', border: 'rgba(255,255,255,0.1)' };
}

export default async function AdminDashboard() {
  const data = await fetchAdmin<GuildsResponse>('/guilds');

  const total = data?.total ?? 0;
  const withChannel = data?.guilds.filter((g) => g.predictionChannelId).length ?? 0;
  const withLeagues = data?.guilds.filter((g) => g.enabledLeagues.length > 0).length ?? 0;
  const totalLeagues = data?.guilds.reduce((acc, g) => acc + g.enabledLeagues.length, 0) ?? 0;
  const configRate = total > 0 ? Math.round((withChannel / total) * 100) : 0;

  return (
    <div style={{ padding: '32px 36px', maxWidth: 1000 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 20, fontWeight: 650, color: '#e8eaed', margin: 0, letterSpacing: '-0.02em' }}>Dashboard</h1>
        <p style={{ marginTop: 3, fontSize: 12.5, color: 'rgba(255,255,255,0.28)', margin: '3px 0 0' }}>Vue d&apos;ensemble de Bananalyz</p>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 32 }}>
        <StatCard label="Serveurs" value={total} sub="enregistrés"
          icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
          accent="#5aa9ff" glow="rgba(90,169,255,0.12)"
        />
        <StatCard label="Channels" value={withChannel} sub={`${configRate}% configurés`}
          icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>}
          accent="#a78bfa" glow="rgba(167,139,250,0.12)"
        />
        <StatCard label="Avec ligue" value={withLeagues} sub="serveurs actifs"
          icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>}
          accent="#ffc400" glow="rgba(255,196,0,0.12)"
        />
        <StatCard label="Ligues activées" value={totalLeagues} sub="au total"
          icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>}
          accent="#34d399" glow="rgba(52,211,153,0.12)"
        />
      </div>

      {/* Recent guilds */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h2 style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.35)', margin: 0, letterSpacing: '0.07em', textTransform: 'uppercase' }}>Derniers serveurs</h2>
          <a href="/admin/guilds" style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', textDecoration: 'none' }}>Voir tout →</a>
        </div>
        <div style={{ background: '#0b0c0e', border: '1px solid rgba(255,255,255,0.055)', borderRadius: 10, overflow: 'hidden' }}>
          {(data?.guilds ?? []).slice(0, 5).map((guild, i, arr) => (
            <div key={guild.id} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '11px 16px',
              borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Avatar name={guild.name} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 550, color: '#d4d6db' }}>{guild.name ?? 'Serveur inconnu'}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', marginTop: 1, fontFamily: 'monospace' }}>{guild.discordId}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {guild.predictionChannelId && (
                  <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 20, background: 'rgba(52,211,153,0.1)', color: 'rgba(52,211,153,0.8)', border: '1px solid rgba(52,211,153,0.18)' }}>✓ Channel</span>
                )}
                {guild.enabledLeagues.slice(0, 3).map(l => {
                  const c = getLeagueColor(l.slug);
                  return (
                    <span key={l.slug} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 5, background: c.bg, color: c.text, border: `1px solid ${c.border}`, fontWeight: 600 }}>{l.name}</span>
                  );
                })}
              </div>
            </div>
          ))}
          {(data?.guilds ?? []).length === 0 && (
            <div style={{ padding: '40px 16px', textAlign: 'center', color: 'rgba(255,255,255,0.15)', fontSize: 13 }}>Aucun serveur.</div>
          )}
        </div>
      </div>
    </div>
  );
}

function Avatar({ name }: { name: string | null }) {
  const colors = ['#5aa9ff','#a78bfa','#ffc400','#34d399','#f87171','#fb923c'];
  const idx = name ? name.charCodeAt(0) % colors.length : 0;
  const color = colors[idx];
  return (
    <div style={{
      width: 30, height: 30, borderRadius: 8, flexShrink: 0,
      background: `${color}18`,
      border: `1px solid ${color}28`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 12, fontWeight: 700, color: `${color}cc`,
    }}>
      {name?.[0]?.toUpperCase() ?? '?'}
    </div>
  );
}

function StatCard({ label, value, sub, icon, accent, glow }: {
  label: string; value: number; sub: string;
  icon: React.ReactNode; accent: string; glow: string;
}) {
  return (
    <div style={{
      background: '#0b0c0e',
      border: '1px solid rgba(255,255,255,0.055)',
      borderRadius: 10,
      padding: '16px 18px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Glow accent corner */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: 80, height: 80,
        background: `radial-gradient(circle at top right, ${glow}, transparent 70%)`,
        pointerEvents: 'none',
      }} />
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>{label}</span>
        <span style={{ color: accent, display: 'flex', opacity: 0.8 }}>{icon}</span>
      </div>
      <div style={{ fontSize: 26, fontWeight: 700, color: '#e8eaed', lineHeight: 1, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>{value}</div>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.22)', marginTop: 5 }}>{sub}</div>
    </div>
  );
}
