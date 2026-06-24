import { fetchAdmin } from '@/lib/admin-api';
import { MatchesFilters } from './matches-filters';
import Link from 'next/link';

type Team = { id: string; name: string; acronym: string | null; imageUrl: string | null };
type League = { id: string; name: string; slug: string };

type Match = {
  id: string;
  pandascoreId: number;
  status: 'NOT_STARTED' | 'RUNNING' | 'FINISHED' | 'CANCELLED';
  format: 'BO1' | 'BO3' | 'BO5';
  beginAt: string;
  league: League;
  serieName: string | null;
  tournamentName: string | null;
  homeTeam: Team | null;
  awayTeam: Team | null;
  winnerTeam: Team | null;
  homeScore: number | null;
  awayScore: number | null;
  predictionsCount: number;
};

type MatchesResponse = { matches: Match[]; total: number; limit: number; offset: number };
type LeaguesResponse = { leagues: { id: string; name: string; slug: string; isPredictionEnabled: boolean }[]; total: number };

const STATUS_META = {
  NOT_STARTED: { label: 'À venir',    color: 'rgba(255,255,255,0.4)',  bg: 'rgba(255,255,255,0.06)',  border: 'rgba(255,255,255,0.1)',  dot: 'rgba(255,255,255,0.3)' },
  RUNNING:     { label: 'En cours',   color: 'rgba(52,211,153,0.9)',   bg: 'rgba(52,211,153,0.1)',   border: 'rgba(52,211,153,0.22)', dot: '#34d399' },
  FINISHED:    { label: 'Terminé',    color: 'rgba(255,255,255,0.3)',  bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.07)', dot: 'rgba(255,255,255,0.2)' },
  CANCELLED:   { label: 'Annulé',     color: 'rgba(248,113,113,0.8)', bg: 'rgba(248,113,113,0.08)', border: 'rgba(248,113,113,0.18)', dot: '#f87171' },
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
    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
  }).format(new Date(iso));
}

function TeamCell({ team, isWinner }: { team: Team | null; isWinner: boolean }) {
  if (!team) return <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: 12 }}>TBD</span>;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      {team.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={team.imageUrl} alt={team.name} width={16} height={16} style={{ objectFit: 'contain', borderRadius: 3, opacity: isWinner ? 1 : 0.5 }} />
      )}
      <span style={{ fontSize: 12.5, fontWeight: isWinner ? 700 : 500, color: isWinner ? '#e8eaed' : 'rgba(255,255,255,0.35)' }}>
        {team.acronym ?? team.name}
      </span>
    </div>
  );
}

const COL = '1.8fr 1.1fr 1.3fr 0.5fr 0.72fr 0.82fr 0.5fr 0.55fr';
const HEADERS = ['Match', 'Ligue', 'Phase', 'Format', 'Status', 'Date', 'Score', 'Préd.'];

export default async function MatchesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; slug?: string; upcoming?: string }>;
}) {
  const params = await searchParams;
  const status = params.status;
  const slug = params.slug;
  const upcoming = params.upcoming;

  const qs = new URLSearchParams();
  if (status) qs.set('status', status);
  if (slug) qs.set('slug', slug);
  if (upcoming) qs.set('upcoming', 'true');
  qs.set('limit', '100');

  const [matchData, leagueData] = await Promise.all([
    fetchAdmin<MatchesResponse>(`/matches?${qs.toString()}`),
    fetchAdmin<LeaguesResponse>('/leagues'),
  ]);

  const matches = matchData?.matches ?? [];
  const leagues = leagueData?.leagues ?? [];

  const running = matches.filter((m) => m.status === 'RUNNING').length;
  const upcoming2 = matches.filter((m) => m.status === 'NOT_STARTED').length;
  const finished = matches.filter((m) => m.status === 'FINISHED').length;

  return (
    <>
      {/* ── Sticky header ── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: '#070809',
        borderBottom: '1px solid rgba(255,255,255,0.055)',
        padding: '20px 36px 0',
      }}>
        <div style={{ marginBottom: 14 }}>
          <h1 style={{ fontSize: 20, fontWeight: 650, color: '#e8eaed', margin: 0, letterSpacing: '-0.02em' }}>Matchs</h1>
          <p style={{ marginTop: 3, fontSize: 12.5, color: 'rgba(255,255,255,0.28)', margin: '3px 0 0' }}>
            {matchData?.total ?? 0} résultats
            {running > 0 && <span style={{ color: '#34d399', marginLeft: 8 }}>· {running} en cours</span>}
            {upcoming2 > 0 && <span style={{ color: 'rgba(255,255,255,0.35)', marginLeft: 8 }}>· {upcoming2} à venir</span>}
            {finished > 0 && <span style={{ color: 'rgba(255,255,255,0.2)', marginLeft: 8 }}>· {finished} terminés</span>}
          </p>
        </div>

        <MatchesFilters leagues={leagues} currentStatus={status} currentSlug={slug} currentUpcoming={upcoming === 'true'} />

        <div style={{
          display: 'grid', gridTemplateColumns: COL,
          padding: '8px 16px', marginTop: 4,
          background: 'rgba(255,255,255,0.018)',
          borderRadius: '8px 8px 0 0',
          border: '1px solid rgba(255,255,255,0.055)',
          borderBottom: 'none',
        }}>
          {HEADERS.map((h) => (
            <div key={h} style={{ fontSize: 10.5, fontWeight: 600, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.07em', textTransform: 'uppercase' }}>{h}</div>
          ))}
        </div>
      </div>

      {/* ── Rows ── */}
      <div style={{ padding: '0 36px 36px' }}>
        <div style={{
          background: '#0b0c0e',
          border: '1px solid rgba(255,255,255,0.055)',
          borderTop: 'none',
          borderRadius: '0 0 10px 10px',
          overflow: 'hidden',
        }}>
          {matches.length === 0 && (
            <div style={{ padding: '56px 16px', textAlign: 'center', color: 'rgba(255,255,255,0.15)', fontSize: 13 }}>Aucun match trouvé.</div>
          )}
          {matches.map((match) => {
            const sm = STATUS_META[match.status];
            const lc = leagueColor(match.league.slug);
            const homeWon = match.winnerTeam?.id === match.homeTeam?.id;
            const awayWon = match.winnerTeam?.id === match.awayTeam?.id;
            const hasResult = match.homeScore !== null && match.awayScore !== null;
            const phase = [match.serieName, match.tournamentName].filter(Boolean).join(' · ');

            return (
              <Link key={match.id} href={`/admin/matches/${match.id}`} style={{ textDecoration: 'none', display: 'contents' }}>
                <div style={{
                  display: 'grid', gridTemplateColumns: COL,
                  padding: '9px 16px',
                  borderBottom: '1px solid rgba(255,255,255,0.032)',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.12s',
                }} className="match-row">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, minWidth: 0 }}>
                    <TeamCell team={match.homeTeam} isWinner={homeWon} />
                    <span style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.13)', fontWeight: 700, flexShrink: 0 }}>VS</span>
                    <TeamCell team={match.awayTeam} isWinner={awayWon} />
                  </div>
                  <div>
                    <span style={{
                      fontSize: 10.5, fontWeight: 700, color: lc,
                      background: `${lc}15`, border: `1px solid ${lc}28`,
                      padding: '2px 7px', borderRadius: 5, letterSpacing: '0.03em', whiteSpace: 'nowrap',
                    }}>{match.league.name}</span>
                  </div>
                  <div style={{ minWidth: 0 }}>
                    {phase ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {match.serieName && <span style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.45)', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{match.serieName}</span>}
                        {match.tournamentName && <span style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.2)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{match.tournamentName}</span>}
                      </div>
                    ) : <span style={{ color: 'rgba(255,255,255,0.1)', fontSize: 12 }}>—</span>}
                  </div>
                  <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>{match.format}</div>
                  <div>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 5,
                      fontSize: 10.5, padding: '2px 7px', borderRadius: 20,
                      background: sm.bg, color: sm.color, border: `1px solid ${sm.border}`, whiteSpace: 'nowrap',
                    }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: sm.dot, flexShrink: 0,
                        ...(match.status === 'RUNNING' ? { boxShadow: '0 0 5px #34d399' } : {}) }} />
                      {sm.label}
                    </span>
                  </div>
                  <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.25)', whiteSpace: 'nowrap' }}>{formatDate(match.beginAt)}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.5)', fontVariantNumeric: 'tabular-nums' }}>
                    {hasResult ? `${match.homeScore} – ${match.awayScore}` : <span style={{ color: 'rgba(255,255,255,0.1)' }}>—</span>}
                  </div>
                  <div>
                    {match.predictionsCount > 0
                      ? <span style={{ fontSize: 12, fontWeight: 600, color: match.predictionsCount > 10 ? '#a78bfa' : 'rgba(255,255,255,0.35)' }}>{match.predictionsCount}</span>
                      : <span style={{ color: 'rgba(255,255,255,0.1)', fontSize: 12 }}>—</span>}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <style>{`.match-row:hover { background: rgba(255,255,255,0.025) !important; }`}</style>
    </>
  );
}
