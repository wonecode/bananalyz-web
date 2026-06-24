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
  NOT_STARTED: { label: 'À venir',  color: 'rgba(255,255,255,0.45)', bg: 'rgba(255,255,255,0.06)',  border: 'rgba(255,255,255,0.1)',  dot: 'rgba(255,255,255,0.3)' },
  RUNNING:     { label: 'En cours', color: '#34d399',                bg: 'rgba(52,211,153,0.1)',    border: 'rgba(52,211,153,0.25)', dot: '#34d399' },
  FINISHED:    { label: 'Terminé',  color: 'rgba(255,255,255,0.3)', bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.07)', dot: 'rgba(255,255,255,0.2)' },
  CANCELLED:   { label: 'Annulé',   color: '#f87171',               bg: 'rgba(248,113,113,0.08)', border: 'rgba(248,113,113,0.2)',  dot: '#f87171' },
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
  const hp = match.stats.homeVotePercent;
  const ap = match.stats.awayVotePercent;

  return (
    <>
      <style>{`
        .pred-row:hover { background: rgba(255,255,255,0.022) !important; }
        @keyframes pulse-dot { 0%,100%{opacity:1} 50%{opacity:.4} }
        .live-dot { animation: pulse-dot 1.6s ease-in-out infinite; }
        .stat-label { font-size:10px; font-weight:600; letter-spacing:0.07em; text-transform:uppercase; color:rgba(255,255,255,0.22); }
      `}</style>

      {/* ── Sticky header ── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: 'rgba(7,8,9,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.055)',
        padding: '14px 32px',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <Link href="/admin/matches" style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          fontSize: 12, color: 'rgba(255,255,255,0.28)',
          textDecoration: 'none',
          padding: '4px 8px', borderRadius: 6,
          border: '1px solid rgba(255,255,255,0.07)',
          background: 'rgba(255,255,255,0.04)',
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Matchs
        </Link>

        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'rgba(255,255,255,0.1)', flexShrink: 0 }}><path d="M9 18l6-6-6-6"/></svg>

        {match.homeTeam?.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={match.homeTeam.imageUrl} alt="" width={18} height={18} style={{ objectFit: 'contain' }} />
        )}
        <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)', letterSpacing: '-0.01em' }}>
          {match.homeTeam?.acronym ?? '?'}
        </span>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.18)', fontWeight: 700 }}>VS</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)', letterSpacing: '-0.01em' }}>
          {match.awayTeam?.acronym ?? '?'}
        </span>
        {match.awayTeam?.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={match.awayTeam.imageUrl} alt="" width={18} height={18} style={{ objectFit: 'contain' }} />
        )}

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.18)', fontFamily: 'ui-monospace, monospace' }}>#{match.pandascoreId}</span>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            fontSize: 11, padding: '3px 9px', borderRadius: 20,
            background: sm.bg, color: sm.color, border: `1px solid ${sm.border}`,
          }}>
            <span className={match.status === 'RUNNING' ? 'live-dot' : ''} style={{ width: 5, height: 5, borderRadius: '50%', background: sm.dot, flexShrink: 0 }} />
            {sm.label}
          </span>
        </div>
      </div>

      <div style={{ padding: '24px 32px 48px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* ── Hero scoreboard ── */}
        <div style={{
          background: '#0c0d0f',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 14, overflow: 'hidden', position: 'relative',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 1,
            background: `linear-gradient(90deg, transparent 0%, ${lc}70 50%, transparent 100%)`,
          }} />
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${lc}09 0%, transparent 70%)`,
          }} />

          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '11px 20px',
            borderBottom: '1px solid rgba(255,255,255,0.045)', position: 'relative',
          }}>
            <span style={{
              fontSize: 11, fontWeight: 700, color: lc,
              background: `${lc}18`, border: `1px solid ${lc}30`,
              padding: '2px 8px', borderRadius: 5, letterSpacing: '0.03em',
            }}>{match.league.name}</span>
            {match.serieName && (
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>{match.serieName}</span>
            )}
            {match.tournamentName && (
              <>
                <span style={{ color: 'rgba(255,255,255,0.1)' }}>·</span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>{match.tournamentName}</span>
              </>
            )}
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
              {[match.format, formatDate(match.beginAt)].map((v) => (
                <span key={v} style={{
                  fontSize: 11, color: 'rgba(255,255,255,0.2)',
                  fontFamily: 'ui-monospace, monospace',
                  padding: '2px 7px', background: 'rgba(255,255,255,0.04)',
                  borderRadius: 5, border: '1px solid rgba(255,255,255,0.07)',
                }}>{v}</span>
              ))}
            </div>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center', padding: '28px 32px', position: 'relative',
          }}>
            {/* Home */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{
                width: 60, height: 60, borderRadius: 14, flexShrink: 0,
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid ${homeWon && hasResult ? lc + '50' : 'rgba(255,255,255,0.07)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: homeWon && hasResult ? `0 0 24px ${lc}25` : 'none',
              }}>
                {match.homeTeam?.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={match.homeTeam.imageUrl} alt={match.homeTeam.name} width={38} height={38}
                    style={{ objectFit: 'contain', opacity: (!hasResult || homeWon) ? 1 : 0.25 }} />
                )}
              </div>
              <div>
                <div style={{ fontSize: 19, fontWeight: 700, letterSpacing: '-0.02em', color: (!hasResult || homeWon) ? '#e8eaed' : 'rgba(255,255,255,0.2)' }}>
                  {match.homeTeam?.name ?? 'TBD'}
                </div>
                <div style={{ fontSize: 11, color: homeWon && hasResult ? lc : 'rgba(255,255,255,0.22)', marginTop: 3, letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}>
                  {match.homeTeam?.acronym}
                  {homeWon && hasResult && <span style={{ fontSize: 9 }}>● Victoire</span>}
                </div>
              </div>
            </div>

            {/* Score */}
            <div style={{ textAlign: 'center', padding: '0 36px' }}>
              {hasResult ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontVariantNumeric: 'tabular-nums' }}>
                  <span style={{ fontSize: 56, fontWeight: 800, letterSpacing: '-0.06em', lineHeight: 1, color: homeWon ? '#e8eaed' : 'rgba(255,255,255,0.18)' }}>{match.homeScore}</span>
                  <span style={{ fontSize: 28, color: 'rgba(255,255,255,0.1)', fontWeight: 300, lineHeight: 1 }}>–</span>
                  <span style={{ fontSize: 56, fontWeight: 800, letterSpacing: '-0.06em', lineHeight: 1, color: awayWon ? '#e8eaed' : 'rgba(255,255,255,0.18)' }}>{match.awayScore}</span>
                </div>
              ) : (
                <div style={{ fontSize: 24, fontWeight: 700, color: 'rgba(255,255,255,0.1)', letterSpacing: '-0.02em' }}>vs</div>
              )}
            </div>

            {/* Away */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexDirection: 'row-reverse' }}>
              <div style={{
                width: 60, height: 60, borderRadius: 14, flexShrink: 0,
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid ${awayWon && hasResult ? lc + '50' : 'rgba(255,255,255,0.07)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: awayWon && hasResult ? `0 0 24px ${lc}25` : 'none',
              }}>
                {match.awayTeam?.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={match.awayTeam.imageUrl} alt={match.awayTeam.name} width={38} height={38}
                    style={{ objectFit: 'contain', opacity: (!hasResult || awayWon) ? 1 : 0.25 }} />
                )}
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 19, fontWeight: 700, letterSpacing: '-0.02em', color: (!hasResult || awayWon) ? '#e8eaed' : 'rgba(255,255,255,0.2)' }}>
                  {match.awayTeam?.name ?? 'TBD'}
                </div>
                <div style={{ fontSize: 11, color: awayWon && hasResult ? lc : 'rgba(255,255,255,0.22)', marginTop: 3, letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5, justifyContent: 'flex-end' }}>
                  {awayWon && hasResult && <span style={{ fontSize: 9 }}>● Victoire</span>}
                  {match.awayTeam?.acronym}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats + votes unified block ── */}
        <div style={{
          background: '#0c0d0f',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 14, overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: '1fr 1px 3fr 1px 1fr',
        }}>
          {/* Chip : Prédictions */}
          <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="stat-label">Prédictions</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <span style={{ fontSize: 32, fontWeight: 750, color: '#e8eaed', letterSpacing: '-0.04em', fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>
              {match.stats.totalPredictions}
            </span>
          </div>

          {/* Divider */}
          <div style={{ background: 'rgba(255,255,255,0.05)', margin: '16px 0' }} />

          {/* Votes : home + bar + away */}
          <div style={{ padding: '20px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <span className="stat-label">Répartition des votes</span>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 14 }}>
              {/* Home votes */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {match.homeTeam?.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={match.homeTeam.imageUrl} alt="" width={24} height={24} style={{ objectFit: 'contain', flexShrink: 0 }} />
                )}
                <div>
                  <div style={{ fontSize: 10.5, fontWeight: 600, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 2 }}>
                    {match.homeTeam?.acronym}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
                    <span style={{ fontSize: 28, fontWeight: 750, color: '#5aa9ff', letterSpacing: '-0.03em', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
                      {match.stats.homeVotes}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(90,169,255,0.45)' }}>{hp}%</span>
                  </div>
                </div>
              </div>

              {/* Bar */}
              <div style={{ flex: 1, minWidth: 100 }}>
                <div style={{ height: 5, borderRadius: 99, overflow: 'hidden', background: 'rgba(255,255,255,0.05)', position: 'relative', width: '100%' }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: `linear-gradient(90deg, #5aa9ff 0%, #5aa9ff ${hp}%, rgba(255,255,255,0.06) ${hp}%, rgba(255,255,255,0.06) ${100 - ap}%, #f472b6 ${100 - ap}%, #f472b6 100%)`,
                  }} />
                </div>
              </div>

              {/* Away votes */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'flex-end' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 10.5, fontWeight: 600, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 2 }}>
                    {match.awayTeam?.acronym}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, justifyContent: 'flex-end' }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(244,114,182,0.45)' }}>{ap}%</span>
                    <span style={{ fontSize: 28, fontWeight: 750, color: '#f472b6', letterSpacing: '-0.03em', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
                      {match.stats.awayVotes}
                    </span>
                  </div>
                </div>
                {match.awayTeam?.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={match.awayTeam.imageUrl} alt="" width={24} height={24} style={{ objectFit: 'contain', flexShrink: 0 }} />
                )}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ background: 'rgba(255,255,255,0.05)', margin: '16px 0' }} />

          {/* Chip : Points */}
          <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="stat-label">Points distribués</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.8"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            <span style={{ fontSize: 32, fontWeight: 750, color: '#ffc400', letterSpacing: '-0.04em', fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>
              {match.stats.pointsDistributed}
            </span>
          </div>
        </div>

        {/* ── Predictions table ── */}
        {match.predictions.length > 0 && (
          <div style={{ background: '#0c0d0f', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '13px 18px',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}>
              <span style={{ fontSize: 12, fontWeight: 650, color: 'rgba(255,255,255,0.55)', letterSpacing: '-0.01em' }}>Prédictions</span>
              <span style={{
                fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.25)',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                padding: '2px 8px', borderRadius: 20,
              }}>{match.predictions.length}</span>
            </div>

            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 140px 120px 80px',
              padding: '7px 18px',
              background: 'rgba(255,255,255,0.012)',
              borderBottom: '1px solid rgba(255,255,255,0.04)',
            }}>
              {['Utilisateur', 'Vainqueur', 'Score prédit', 'Points'].map((h) => (
                <div key={h} style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{h}</div>
              ))}
            </div>

            {match.predictions.map((p, i) => {
              const isHome = p.predictedWinner.id === match.homeTeam?.id;
              const wc = isHome ? '#5aa9ff' : '#f472b6';
              const correct = hasResult ? p.predictedWinner.id === match.winnerTeam?.id : null;
              const perfect = correct === true
                && p.predictedHomeScore === match.homeScore
                && p.predictedAwayScore === match.awayScore;
              const pts = p.points;

              return (
                <div key={p.id} className="pred-row" style={{
                  display: 'grid', gridTemplateColumns: '1fr 140px 120px 80px',
                  padding: '10px 18px',
                  borderBottom: i < match.predictions.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none',
                  alignItems: 'center',
                  background: perfect ? 'rgba(255,196,0,0.025)' : 'transparent',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{
                      width: 26, height: 26, borderRadius: 7, flexShrink: 0,
                      background: `${wc}15`, border: `1px solid ${wc}22`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, fontWeight: 700, color: wc, letterSpacing: '0.02em',
                    }}>
                      {(p.user.username ?? p.user.discordId).slice(0, 2).toUpperCase()}
                    </div>
                    <span style={{ fontSize: 12.5, fontWeight: 500, color: 'rgba(255,255,255,0.6)' }}>
                      {p.user.username ?? p.user.discordId}
                    </span>
                    {perfect && (
                      <span style={{
                        fontSize: 9.5, color: '#ffc400',
                        background: 'rgba(255,196,0,0.12)', border: '1px solid rgba(255,196,0,0.2)',
                        padding: '1px 6px', borderRadius: 20, fontWeight: 700, letterSpacing: '0.03em',
                      }}>Parfait ★</span>
                    )}
                  </div>

                  <div>
                    <span style={{
                      fontSize: 11.5, fontWeight: 700, color: wc,
                      background: `${wc}12`, border: `1px solid ${wc}25`,
                      padding: '3px 8px', borderRadius: 6,
                      display: 'inline-flex', alignItems: 'center', gap: 5,
                    }}>
                      {correct !== null && (
                        <span style={{ fontSize: 9, opacity: 0.8 }}>{correct ? '✓' : '✗'}</span>
                      )}
                      {p.predictedWinner.acronym ?? p.predictedWinner.name}
                    </span>
                  </div>

                  <div style={{ fontSize: 13, fontWeight: 650, color: 'rgba(255,255,255,0.38)', fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.01em' }}>
                    {p.predictedHomeScore} <span style={{ color: 'rgba(255,255,255,0.14)' }}>–</span> {p.predictedAwayScore}
                  </div>

                  <div>
                    {pts != null ? (
                      <span style={{
                        fontSize: 14, fontWeight: 750, fontVariantNumeric: 'tabular-nums',
                        color: pts === 0 ? 'rgba(255,255,255,0.18)' : pts >= 5 ? '#ffc400' : '#e8eaed',
                      }}>
                        {pts > 0 && <span style={{ fontSize: 11, marginRight: 1, opacity: 0.55 }}>+</span>}
                        {pts}
                      </span>
                    ) : (
                      <span style={{ color: 'rgba(255,255,255,0.1)', fontSize: 12 }}>—</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {match.predictions.length === 0 && (
          <div style={{
            background: '#0c0d0f', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 12, padding: '48px 0',
            textAlign: 'center', color: 'rgba(255,255,255,0.15)', fontSize: 13,
          }}>Aucune prédiction pour ce match.</div>
        )}
      </div>
    </>
  );
}
