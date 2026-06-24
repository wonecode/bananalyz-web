import { fetchAdmin } from '@/lib/admin-api';

type Stats = {
  users: {
    total: number;
    active: number;
  };
  matches: {
    total: number;
    finished: number;
    running: number;
    notStarted: number;
    cancelled: number;
  };
  predictions: {
    total: number;
    correct: number;
    perfect: number;
    accuracyRate: number;
    perfectRate: number;
    avgPointsPerUser: number;
  };
  points: {
    totalDistributed: number;
    topScorers: { username: string | null; discordId: string; totalPoints: number }[];
  };
  leagues: {
    name: string;
    slug: string;
    matchCount: number;
    predictionCount: number;
  }[];
};

const LEAGUE_COLORS: Record<string, string> = {
  lec: '#5aa9ff', lck: '#ffc400', lpl: '#ff6450',
  lcs: '#34d399', msi: '#a78bfa', worlds: '#fb923c',
  lfl: '#60a5fa', 'emea-masters': '#f472b6', 'first-stand': '#94a3b8',
};

function lc(slug: string) {
  return LEAGUE_COLORS[slug.toLowerCase()] ?? 'rgba(255,255,255,0.3)';
}

function pct(n: number) {
  return `${Math.round(n * 10) / 10}%`;
}

export default async function StatsPage() {
  const stats = await fetchAdmin<Stats>('/stats', { revalidate: 60 });

  if (!stats) {
    return (
      <div style={{ padding: '48px 32px', color: 'rgba(255,255,255,0.2)', fontSize: 13 }}>
        Impossible de charger les statistiques.
      </div>
    );
  }

  const kpis = [
    {
      label: 'Utilisateurs',
      value: stats.users.total,
      sub: `${stats.users.active} actifs`,
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
      color: '#e8eaed',
    },
    {
      label: 'Matchs terminés',
      value: stats.matches.finished,
      sub: `${stats.matches.total} au total`,
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M5.2 5.2C6.8 7 8 9 8 12s-1.2 5-2.8 6.8M18.8 5.2C17.2 7 16 9 16 12s1.2 5 2.8 6.8M2 12h20"/></svg>,
      color: '#e8eaed',
    },
    {
      label: 'Prédictions',
      value: stats.predictions.total,
      sub: `Taux correct : ${pct(stats.predictions.accuracyRate)}`,
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
      color: '#e8eaed',
    },
    {
      label: 'Parfaites',
      value: stats.predictions.perfect,
      sub: `${pct(stats.predictions.perfectRate)} des prédictions`,
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
      color: '#ffc400',
    },
    {
      label: 'Points distribués',
      value: stats.points.totalDistributed,
      sub: `Moy. ${Math.round(stats.predictions.avgPointsPerUser * 10) / 10} pts/user`,
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
      color: '#34d399',
    },
    {
      label: 'En cours',
      value: stats.matches.running,
      sub: `${stats.matches.notStarted} à venir`,
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
      color: stats.matches.running > 0 ? '#34d399' : '#e8eaed',
    },
  ];

  return (
    <>
      <style>{`
        .kpi-card:hover { background: #111214 !important; }
        .scorer-row:hover { background: rgba(255,255,255,0.022) !important; }
        .league-row:hover { background: rgba(255,255,255,0.022) !important; }
        @keyframes pulse-dot { 0%,100%{opacity:1} 50%{opacity:.4} }
        .live-dot { animation: pulse-dot 1.6s ease-in-out infinite; }
      `}</style>

      {/* Header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: 'rgba(7,8,9,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.055)',
        padding: '14px 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 14, fontWeight: 650, color: 'rgba(255,255,255,0.7)', letterSpacing: '-0.01em' }}>Statistiques</span>
          {stats.matches.running > 0 && (
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              fontSize: 11, padding: '3px 9px', borderRadius: 20,
              background: 'rgba(52,211,153,0.1)', color: '#34d399',
              border: '1px solid rgba(52,211,153,0.25)',
            }}>
              <span className="live-dot" style={{ width: 5, height: 5, borderRadius: '50%', background: '#34d399', flexShrink: 0 }} />
              {stats.matches.running} live
            </span>
          )}
        </div>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.18)', fontFamily: 'ui-monospace, monospace' }}>Actualisé toutes les 60s</span>
      </div>

      <div style={{ padding: '24px 32px 48px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* KPI grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {kpis.map((k) => (
            <div key={k.label} className="kpi-card" style={{
              background: '#0c0d0f',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 12, padding: '18px 20px',
              display: 'flex', flexDirection: 'column', gap: 12,
              transition: 'background 150ms',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)' }}>{k.label}</span>
                <span style={{ color: 'rgba(255,255,255,0.18)' }}>{k.icon}</span>
              </div>
              <div>
                <div style={{ fontSize: 34, fontWeight: 750, color: k.color, letterSpacing: '-0.04em', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
                  {k.value.toLocaleString('fr-FR')}
                </div>
                <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.28)', marginTop: 6 }}>{k.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom row: Top scorers + Ligues */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>

          {/* Top scorers */}
          <div style={{ background: '#0c0d0f', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{
              padding: '13px 18px',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{ fontSize: 12, fontWeight: 650, color: 'rgba(255,255,255,0.55)', letterSpacing: '-0.01em' }}>Top scoreurs</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.8"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            {stats.points.topScorers.map((s, i) => {
              const podiumColors = ['#ffc400', 'rgba(255,255,255,0.45)', '#fb923c'];
              const rankColor = podiumColors[i] ?? 'rgba(255,255,255,0.15)';
              const name = s.username ?? s.discordId;
              return (
                <div key={s.discordId} className="scorer-row" style={{
                  display: 'grid', gridTemplateColumns: '28px 1fr auto',
                  padding: '10px 18px', alignItems: 'center', gap: 12,
                  borderBottom: i < stats.points.topScorers.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none',
                  transition: 'background 150ms',
                }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: rankColor, fontVariantNumeric: 'tabular-nums', textAlign: 'center' }}>#{i + 1}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{
                      width: 26, height: 26, borderRadius: 7, flexShrink: 0,
                      background: `${rankColor}18`, border: `1px solid ${rankColor}25`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, fontWeight: 700, color: rankColor,
                    }}>
                      {name.slice(0, 2).toUpperCase()}
                    </div>
                    <span style={{ fontSize: 12.5, fontWeight: 500, color: 'rgba(255,255,255,0.6)' }}>{name}</span>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 750, color: '#ffc400', fontVariantNumeric: 'tabular-nums' }}>
                    {s.totalPoints.toLocaleString('fr-FR')}
                    <span style={{ fontSize: 10, fontWeight: 500, color: 'rgba(255,196,0,0.45)', marginLeft: 3 }}>pts</span>
                  </span>
                </div>
              );
            })}
          </div>

          {/* Ligues */}
          <div style={{ background: '#0c0d0f', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{
              padding: '13px 18px',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{ fontSize: 12, fontWeight: 650, color: 'rgba(255,255,255,0.55)', letterSpacing: '-0.01em' }}>Activité par ligue</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.8"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
            </div>
            {stats.leagues.map((league, i) => {
              const color = lc(league.slug);
              const maxPreds = Math.max(...stats.leagues.map(l => l.predictionCount), 1);
              const barWidth = Math.round((league.predictionCount / maxPreds) * 100);
              return (
                <div key={league.slug} className="league-row" style={{
                  padding: '10px 18px',
                  borderBottom: i < stats.leagues.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none',
                  transition: 'background 150ms',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <span style={{
                        fontSize: 10, fontWeight: 700, color,
                        background: `${color}18`, border: `1px solid ${color}30`,
                        padding: '1px 7px', borderRadius: 5, letterSpacing: '0.03em',
                      }}>{league.name}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', fontVariantNumeric: 'tabular-nums' }}>
                        {league.matchCount} matchs
                      </span>
                      <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.45)', fontVariantNumeric: 'tabular-nums' }}>
                        {league.predictionCount.toLocaleString('fr-FR')} prédictions
                      </span>
                    </div>
                  </div>
                  <div style={{ height: 3, borderRadius: 99, background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${barWidth}%`, background: color, borderRadius: 99, opacity: 0.7 }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
