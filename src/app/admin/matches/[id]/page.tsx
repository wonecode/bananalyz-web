import { fetchAdmin } from '@/lib/admin-api';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Team = { id: string; name: string; acronym: string | null; imageUrl: string | null };
type League = { id: string; name: string; slug: string };

type Prediction = {
  id: string;
  predictedHomeScore: number;
  predictedAwayScore: number;
  points: number | null;
  lockedAt: string | null;
  predictedWinner: { id: string; name: string; acronym: string | null };
  user: { id: string; discordId: string; username: string | null };
};

type MatchDetail = {
  id: string;
  pandascoreId: number;
  status: 'NOT_STARTED' | 'RUNNING' | 'FINISHED' | 'CANCELLED';
  format: string;
  beginAt: string;
  league: League;
  serieName: string | null;
  tournamentName: string | null;
  homeTeam: Team | null;
  awayTeam: Team | null;
  winnerTeam: Team | null;
  homeScore: number | null;
  awayScore: number | null;
  stats: {
    totalPredictions: number;
    homeVotes: number;
    awayVotes: number;
    homeVotePercent: number;
    awayVotePercent: number;
    pointsDistributed: number;
  };
  predictions: Prediction[];
};

const STATUS_META = {
  NOT_STARTED: { label: 'À venir',  color: 'rgba(255,255,255,0.4)',  bg: 'rgba(255,255,255,0.06)',  border: 'rgba(255,255,255,0.1)',  dot: 'rgba(255,255,255,0.3)' },
  RUNNING:     { label: 'En cours', color: 'rgba(52,211,153,0.9)',  bg: 'rgba(52,211,153,0.1)',   border: 'rgba(52,211,153,0.22)', dot: '#34d399' },
  FINISHED:    { label: 'Terminé',  color: 'rgba(255,255,255,0.3)', bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.07)', dot: 'rgba(255,255,255,0.2)' },
  CANCELLED:   { label: 'Annulé',   color: 'rgba(248,113,113,0.8)',bg: 'rgba(248,113,113,0.08)', border: 'rgba(248,113,113,0.18)', dot: '#f87171' },
};

const LEAGUE_COLORS: Record<string, string> = {
  lec: '#5aa9ff', lck: '#ffc400', lpl: '#ff6450',
  lcs: '#34d399', msi: '#a78bfa', worlds: '#fb923c',
  lfl: '#60a5fa', 'emea-masters': '#f472b6', 'first-stand': '#94a3b8',
};

function leagueColor(slug: string) {
  return LEAGUE_COLORS[slug.toLowerCase()] ?? 'rgba(255,255,255,0.35)';
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  }).format(new Date(iso));
}

export default async function MatchDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const match = await fetchAdmin<MatchDetail>(`/matches/${id}`);
  if (!match) notFound();

  const sm = STATUS_META[match.status];
  const lc = leagueColor(match.league.slug);
  const homeWon = match.winnerTeam?.id === match.homeTeam?.id;
  const awayWon = match.winnerTeam?.id === match.awayTeam?.id;
  const hasResult = match.homeScore !== null && match.awayScore !== null;

  return (
    <>
      {/* ── Sticky header ── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: '#070809',
        borderBottom: '1px solid rgba(255,255,255,0.055)',
        padding: '16px 36px',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <Link href="/admin/matches" style={{
          display: 'flex', alignItems: 'center', gap: 6,
          fontSize: 12, color: 'rgba(255,255,255,0.3)',
          textDecoration: 'none', flexShrink: 0,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Matchs
        </Link>
        <span style={{ color: 'rgba(255,255,255,0.1)' }}>/</span>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontFamily: 'ui-monospace, monospace' }}>
          {match.homeTeam?.acronym ?? '?'} vs {match.awayTeam?.acronym ?? '?'}
        </span>
        <span style={{
          marginLeft: 'auto',
          display: 'inline-flex', alignItems: 'center', gap: 5,
          fontSize: 11, padding: '2px 8px', borderRadius: 20,
          background: sm.bg, color: sm.color, border: `1px solid ${sm.border}`,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: sm.dot, flexShrink: 0,
            ...(match.status === 'RUNNING' ? { boxShadow: '0 0 5px #34d399' } : {}) }} />
          {sm.label}
        </span>
      </div>

      <div style={{ padding: '28px 36px', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* ── Scoreboard ── */}
        <div style={{
          background: '#0b0c0e',
          border: `1px solid ${lc}28`,
          borderRadius: 12, padding: '24px 28px',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(ellipse at top left, ${lc}08 0%, transparent 60%)`,
            pointerEvents: 'none',
          }} />

          {/* Meta info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, position: 'relative' }}>
            <span style={{
              fontSize: 11, fontWeight: 700, color: lc,
              background: `${lc}15`, border: `1px solid ${lc}28`,
              padding: '2px 8px', borderRadius: 5,
            }}>{match.league.name}</span>
            {match.serieName && (
              <span style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.35)' }}>{match.serieName}</span>
            )}
            {match.tournamentName && (
              <>
                <span style={{ color: 'rgba(255,255,255,0.12)' }}>·</span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.22)' }}>{match.tournamentName}</span>
              </>
            )}
            <span style={{ marginLeft: 'auto', fontSize: 11, color: 'rgba(255,255,255,0.2)', fontFamily: 'ui-monospace, monospace' }}>
              {match.format} · #{match.pandascoreId}
            </span>
          </div>

          {/* Teams + score */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 20, position: 'relative' }}>
            {/* Home */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {match.homeTeam?.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={match.homeTeam.imageUrl} alt={match.homeTeam.name} width={44} height={44}
                  style={{ objectFit: 'contain', opacity: homeWon || !hasResult ? 1 : 0.35 }} />
              )}
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: homeWon || !hasResult ? '#e8eaed' : 'rgba(255,255,255,0.3)', letterSpacing: '-0.01em' }}>
                  {match.homeTeam?.name ?? 'TBD'}
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', marginTop: 1 }}>
                  {match.homeTeam?.acronym}
                </div>
              </div>
            </div>

            {/* Score central */}
            <div style={{ textAlign: 'center' }}>
              {hasResult ? (
                <div style={{ fontSize: 36, fontWeight: 800, color: '#e8eaed', letterSpacing: '-0.04em', fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>
                  {match.homeScore} <span style={{ color: 'rgba(255,255,255,0.15)', fontWeight: 400 }}>–</span> {match.awayScore}
                </div>
              ) : (
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.2)' }}>{formatDate(match.beginAt)}</div>
              )}
              {hasResult && (
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', marginTop: 4 }}>{formatDate(match.beginAt)}</div>
              )}
            </div>

            {/* Away */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexDirection: 'row-reverse' }}>
              {match.awayTeam?.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={match.awayTeam.imageUrl} alt={match.awayTeam.name} width={44} height={44}
                  style={{ objectFit: 'contain', opacity: awayWon || !hasResult ? 1 : 0.35 }} />
              )}
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: awayWon || !hasResult ? '#e8eaed' : 'rgba(255,255,255,0.3)', letterSpacing: '-0.01em' }}>
                  {match.awayTeam?.name ?? 'TBD'}
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', marginTop: 1 }}>
                  {match.awayTeam?.acronym}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats row ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {[
            { label: 'Prédictions', value: match.stats.totalPredictions, color: '#e8eaed' },
            { label: `Votes ${match.homeTeam?.acronym ?? 'Home'}`, value: `${match.stats.homeVotes} (${match.stats.homeVotePercent}%)`, color: '#5aa9ff' },
            { label: `Votes ${match.awayTeam?.acronym ?? 'Away'}`, value: `${match.stats.awayVotes} (${match.stats.awayVotePercent}%)`, color: '#f472b6' },
            { label: 'Points distribués', value: match.stats.pointsDistributed, color: '#ffc400' },
          ].map((s) => (
            <div key={s.label} style={{
              background: '#0b0c0e',
              border: '1px solid rgba(255,255,255,0.055)',
              borderRadius: 10, padding: '14px 16px',
            }}>
              <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: s.color, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* ── Vote bar ── */}
        {match.stats.totalPredictions > 0 && (
          <div style={{ background: '#0b0c0e', border: '1px solid rgba(255,255,255,0.055)', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 11.5 }}>
              <span style={{ color: '#5aa9ff', fontWeight: 600 }}>{match.homeTeam?.acronym} — {match.stats.homeVotePercent}%</span>
              <span style={{ color: '#f472b6', fontWeight: 600 }}>{match.stats.awayVotePercent}% — {match.awayTeam?.acronym}</span>
            </div>
            <div style={{ height: 6, borderRadius: 99, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 99,
                background: `linear-gradient(90deg, #5aa9ff ${match.stats.homeVotePercent}%, #f472b6 ${match.stats.homeVotePercent}%)`,
                transition: 'width 0.4s ease',
              }} />
            </div>
          </div>
        )}

        {/* ── Predictions table ── */}
        {match.predictions.length > 0 && (
          <div>
            <div style={{ fontSize: 10.5, fontWeight: 600, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
              Prédictions ({match.predictions.length})
            </div>
            <div style={{ background: '#0b0c0e', border: '1px solid rgba(255,255,255,0.055)', borderRadius: 10, overflow: 'hidden' }}>
              {/* Header */}
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr 0.8fr 0.7fr',
                padding: '8px 16px',
                background: 'rgba(255,255,255,0.018)',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}>
                {['Utilisateur', 'Vainqueur prédit', 'Score prédit', 'Points'].map((h) => (
                  <div key={h} style={{ fontSize: 10.5, fontWeight: 600, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.07em', textTransform: 'uppercase' }}>{h}</div>
                ))}
              </div>
              {/* Rows */}
              {match.predictions.map((p) => {
                const isHome = p.predictedWinner.id === match.homeTeam?.id;
                const winnerColor = isHome ? '#5aa9ff' : '#f472b6';
                return (
                  <div key={p.id} style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr 0.8fr 0.7fr',
                    padding: '9px 16px',
                    borderBottom: '1px solid rgba(255,255,255,0.032)',
                    alignItems: 'center',
                  }}>
                    <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>
                      {p.user.username ?? p.user.discordId}
                    </div>
                    <div>
                      <span style={{
                        fontSize: 11.5, fontWeight: 700, color: winnerColor,
                        background: `${winnerColor}15`, border: `1px solid ${winnerColor}28`,
                        padding: '2px 7px', borderRadius: 5,
                      }}>
                        {p.predictedWinner.acronym ?? p.predictedWinner.name}
                      </span>
                    </div>
                    <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.35)', fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>
                      {p.predictedHomeScore} – {p.predictedAwayScore}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: p.points != null && p.points > 0 ? '#ffc400' : 'rgba(255,255,255,0.2)', fontVariantNumeric: 'tabular-nums' }}>
                      {p.points != null ? p.points : <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.1)' }}>—</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {match.predictions.length === 0 && (
          <div style={{ padding: '32px 0', textAlign: 'center', color: 'rgba(255,255,255,0.15)', fontSize: 13 }}>Aucune prédiction pour ce match.</div>
        )}
      </div>
    </>
  );
}
