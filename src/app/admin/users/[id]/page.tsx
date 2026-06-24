import { fetchAdmin } from '@/lib/admin-api';
import Link from 'next/link';

const LEAGUE_COLORS: Record<string, string> = {
  lec: '#5aa9ff', lck: '#ffc400', lpl: '#ff6450',
  lcs: '#34d399', msi: '#a78bfa', worlds: '#fb923c',
  lfl: '#60a5fa', 'emea-masters': '#f472b6', 'first-stand': '#94a3b8',
};
function lc(slug: string) {
  return LEAGUE_COLORS[slug.toLowerCase()] ?? 'rgba(255,255,255,0.3)';
}
function num(n: number | undefined | null) {
  return (n ?? 0).toLocaleString('fr-FR');
}
function pct(n: number) {
  return `${Math.round((n ?? 0) * 10) / 10}%`;
}

type UserDetail = {
  id: string;
  discordId: string;
  username: string | null;
  createdAt: string;
  guilds: { name: string | null; discordId: string }[];
  stats: {
    predictionCount: number;
    totalPoints: number;
    correct: number;
    perfect: number;
    accuracyRate: number;
    perfectRate: number;
  };
  byLeague: {
    leagueName: string;
    leagueSlug: string;
    predictionCount: number;
    correctCount: number;
    perfectCount: number;
    pointsEarned: number;
    accuracyRate: number;
    perfectRate: number;
  }[];
  recentPredictions: {
    id: string;
    points: number | null;
    predictedHomeScore: number;
    predictedAwayScore: number;
    createdAt: string;
    predictedWinner: { name: string; acronym: string | null; imageUrl: string | null } | null;
    match: {
      status: string;
      beginAt: string;
      homeScore: number | null;
      awayScore: number | null;
      homeTeam: { name: string; acronym: string | null } | null;
      awayTeam: { name: string; acronym: string | null } | null;
      league: { name: string; slug: string };
      serieName: string | null;
      isCorrect: boolean;
    };
  }[];
};

export default async function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await fetchAdmin<UserDetail>(`/users/${id}`, { revalidate: 30 });

  if (!user) {
    return (
      <div style={{ padding: '48px 32px', color: 'rgba(255,255,255,0.2)', fontSize: 13 }}>
        Utilisateur introuvable.
      </div>
    );
  }

  const name  = user.username ?? user.discordId;
  const since = new Date(user.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });

  const statKpis = [
    { label: 'Prédictions', value: num(user.stats.predictionCount), sub: null, color: '#e8eaed' },
    { label: 'Points', value: num(user.stats.totalPoints), sub: null, color: '#ffc400' },
    { label: 'Correctes', value: num(user.stats.correct), sub: pct(user.stats.accuracyRate), color: '#e8eaed' },
    { label: 'Parfaites', value: num(user.stats.perfect), sub: pct(user.stats.perfectRate), color: '#34d399' },
  ];

  return (
    <>
      <style>{`
        .pred-row:hover { background: rgba(255,255,255,0.022) !important; }
        .league-row:hover { background: rgba(255,255,255,0.022) !important; }
      `}</style>

      {/* Header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: 'rgba(7,8,9,0.92)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.055)',
        padding: '14px 32px',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <Link href="/admin/users" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 26, height: 26, borderRadius: 6,
          background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
          color: 'rgba(255,255,255,0.35)', textDecoration: 'none', flexShrink: 0,
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </Link>
        <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.07)' }} />
        <div style={{
          width: 30, height: 30, borderRadius: 8,
          background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)',
        }}>{name.slice(0, 2).toUpperCase()}</div>
        <div>
          <span style={{ fontSize: 14, fontWeight: 650, color: 'rgba(255,255,255,0.7)', letterSpacing: '-0.01em' }}>{name}</span>
          {user.username && (
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', marginLeft: 8, fontFamily: 'ui-monospace, monospace' }}>{user.discordId}</span>
          )}
        </div>
        <div style={{ marginLeft: 'auto', fontSize: 11, color: 'rgba(255,255,255,0.18)' }}>Depuis le {since}</div>
      </div>

      <div style={{ padding: '20px 32px 48px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {statKpis.map((k) => (
            <div key={k.label} style={{
              background: '#0c0d0f', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 12, padding: '16px 18px',
            }}>
              <div style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 10 }}>{k.label}</div>
              <div style={{ fontSize: 30, fontWeight: 750, color: k.color, letterSpacing: '-0.04em', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{k.value}</div>
              {k.sub && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 5 }}>{k.sub}</div>}
            </div>
          ))}
        </div>

        {/* Guilds */}
        {user.guilds.length > 0 && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {user.guilds.map((g) => (
              <span key={g.discordId} style={{
                fontSize: 11.5, padding: '4px 10px', borderRadius: 6,
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.4)',
              }}>{g.name ?? g.discordId}</span>
            ))}
          </div>
        )}

        {/* Bottom grid: by league + recent predictions */}
        <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 10, alignItems: 'start' }}>

          {/* Par ligue */}
          <div style={{ background: '#0c0d0f', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: 12, fontWeight: 650, color: 'rgba(255,255,255,0.5)' }}>Par ligue</span>
            </div>
            {(user.byLeague ?? []).length === 0 && (
              <div style={{ padding: '32px 16px', textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.15)' }}>Aucune donnée</div>
            )}
            {(user.byLeague ?? []).map((l, i) => {
              const color = lc(l.leagueSlug);
              return (
                <div key={l.leagueSlug} className="league-row" style={{
                  padding: '10px 16px',
                  borderTop: i > 0 ? '1px solid rgba(255,255,255,0.03)' : 'none',
                  transition: 'background 150ms',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{
                      fontSize: 10, fontWeight: 700, color,
                      background: `${color}18`, border: `1px solid ${color}30`,
                      padding: '1px 7px', borderRadius: 5,
                    }}>{l.leagueName}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#ffc400', fontVariantNumeric: 'tabular-nums' }}>
                      {num(l.pointsEarned)} <span style={{ fontSize: 9.5, color: 'rgba(255,196,0,0.4)' }}>pts</span>
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: 10, fontSize: 10.5, color: 'rgba(255,255,255,0.28)' }}>
                    <span>{l.predictionCount} préd.</span>
                    <span style={{ color: 'rgba(255,255,255,0.1)' }}>·</span>
                    <span>Correct&nbsp;: <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>{pct(l.accuracyRate)}</span></span>
                    <span style={{ color: 'rgba(255,255,255,0.1)' }}>·</span>
                    <span>Parfait&nbsp;: <span style={{ color: '#34d399', fontWeight: 600 }}>{pct(l.perfectRate)}</span></span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Prédictions récentes */}
          <div style={{ background: '#0c0d0f', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, fontWeight: 650, color: 'rgba(255,255,255,0.5)' }}>Prédictions récentes</span>
              <span style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.18)' }}>20 dernières</span>
            </div>

            {/* Col headers */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 80px 70px', padding: '7px 16px 5px' }}>
              {['Match', 'Prédiction', 'Score réel', 'Points'].map((h, i) => (
                <span key={h} style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', textAlign: i > 0 ? 'right' : 'left' }}>{h}</span>
              ))}
            </div>

            {(user.recentPredictions ?? []).length === 0 && (
              <div style={{ padding: '32px 16px', textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.15)' }}>Aucune prédiction</div>
            )}

            {(user.recentPredictions ?? []).map((p, i) => {
              const color   = lc(p.match.league.slug);
              const isFinished = p.match.status === 'FINISHED';
              const dotColor = !isFinished
                ? 'rgba(255,255,255,0.15)'
                : p.match.isCorrect ? '#34d399' : '#ff6450';
              return (
                <div key={p.id} className="pred-row" style={{
                  display: 'grid', gridTemplateColumns: '1fr 120px 80px 70px',
                  padding: '9px 16px', alignItems: 'center',
                  borderTop: i > 0 ? '1px solid rgba(255,255,255,0.03)' : 'none',
                  transition: 'background 150ms',
                }}>
                  {/* Match */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: dotColor, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 11.5, fontWeight: 500, color: 'rgba(255,255,255,0.6)' }}>
                        {p.match.homeTeam?.acronym ?? '?'} <span style={{ color: 'rgba(255,255,255,0.2)' }}>vs</span> {p.match.awayTeam?.acronym ?? '?'}
                      </div>
                      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>
                        <span style={{ color }}>{p.match.league.name}</span>
                        {p.match.serieName && <span style={{ marginLeft: 4 }}>{p.match.serieName}</span>}
                      </div>
                    </div>
                  </div>
                  {/* Prédiction */}
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: 11.5, fontWeight: 600, color: 'rgba(255,255,255,0.55)', fontVariantNumeric: 'tabular-nums' }}>
                      {p.predictedWinner?.acronym ?? '?'} {p.predictedHomeScore}–{p.predictedAwayScore}
                    </span>
                  </div>
                  {/* Score réel */}
                  <div style={{ textAlign: 'right' }}>
                    {isFinished && p.match.homeScore !== null ? (
                      <span style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.3)', fontVariantNumeric: 'tabular-nums' }}>
                        {p.match.homeScore}–{p.match.awayScore}
                      </span>
                    ) : (
                      <span style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.12)' }}>—</span>
                    )}
                  </div>
                  {/* Points */}
                  <div style={{ textAlign: 'right' }}>
                    {p.points !== null ? (
                      <span style={{ fontSize: 12.5, fontWeight: 700, color: '#ffc400', fontVariantNumeric: 'tabular-nums' }}>
                        +{p.points}
                      </span>
                    ) : (
                      <span style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.12)' }}>—</span>
                    )}
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
