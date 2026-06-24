import { fetchAdmin } from '@/lib/admin-api';
import { MatchesFilters } from './matches-filters';

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

function TeamCell({ team, score, isWinner }: { team: Team | null; score: number | null; isWinner: boolean }) {
  if (!team) return <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: 12 }}>TBD</span>;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      {team.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={team.imageUrl} alt={team.name} width={18} height={18} style={{ objectFit: 'contain', borderRadius: 3 }} />
      )}
      <span style={{
        fontSize: 12.5, fontWeight: isWinner ? 700 : 500,
        color: isWinner ? '#e8eaed' : 'rgba(255,255,255,0.45)',
      }}>
        {team.acronym ?? team.name}
      </span>
      {score !== null && (
        <span style={{ fontSize: 12, fontWeight: 700, color: isWinner ? '#e8eaed' : 'rgba(255,255,255,0.3)' }}>
          {score}
        </span>
      )}
    </div>
  );
}

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

  const COL = '2fr 1.4fr 0.7fr 0.7fr 0.8fr 0.7fr 0.7fr';

  return (
    <div style={{ padding: '32px 36px' }}>
      {/* Header */}
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 650, color: '#e8eaed', margin: 0, letterSpacing: '-0.02em' }}>Matchs</h1>
          <p style={{ marginTop: 3, fontSize: 12.5, color: 'rgba(255,255,255,0.28)', margin: '3px 0 0' }}>
            {matchData?.total ?? 0} résultats
            {running > 0 && <span style={{ color: '#34d399', marginLeft: 8 }}>· {running} en cours</span>}
            {upcoming2 > 0 && <span style={{ color: 'rgba(255,255,255,0.35)', marginLeft: 8 }}>· {upcoming2} à venir</span>}
            {finished > 0 && <span style={{ color: 'rgba(255,255,255,0.2)', marginLeft: 8 }}>· {finished} terminés</span>}
          </p>
        </div>
      </div>

      {/* Filters */}
      <MatchesFilters leagues={leagues} currentStatus={status} currentSlug={slug} currentUpcoming={upcoming === 'true'} />

      {/* Table */}
      <div style={{ background: '#0b0c0e', border: '1px solid rgba(255,255,255,0.055)', borderRadius: 10, overflow: 'hidden' }}>
        {/* Header */}
        <div style={{
          display: 'grid', gridTemplateColumns: COL,
          padding: '9px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          background: 'rgba(255,255,255,0.018)',
        }}>
          {['Match', 'Ligue', 'Format', 'Status', 'Date', 'Score', 'Prédictions'].map((h) => (
            <div key={h} style={{ fontSize: 10.5, fontWeight: 600, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.07em', textTransform: 'uppercase' }}>{h}</div>
          ))}
        </div>

        {/* Rows */}
        {matches.length === 0 && (
          <div style={{ padding: '56px 16px', textAlign: 'center', color: 'rgba(255,255,255,0.15)', fontSize: 13 }}>Aucun match trouvé.</div>
        )}
        {matches.map((match) => {
          const sm = STATUS_META[match.status];
          const lc = leagueColor(match.league.slug);
          const homeWon = match.winnerTeam?.id === match.homeTeam?.id;
          const awayWon = match.winnerTeam?.id === match.awayTeam?.id;

          return (
            <div key={match.id} style={{
              display: 'grid', gridTemplateColumns: COL,
              padding: '10px 16px',
              borderBottom: '1px solid rgba(255,255,255,0.038)',
              alignItems: 'center',
            }}>
              {/* Match: home vs away */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                <TeamCell team={match.homeTeam} score={null} isWinner={homeWon} />
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.15)', fontWeight: 600 }}>VS</span>
                <TeamCell team={match.awayTeam} score={null} isWinner={awayWon} />
              </div>

              {/* Ligue */}
              <div>
                <span style={{
                  fontSize: 10.5, fontWeight: 700, color: lc,
                  background: `${lc}15`, border: `1px solid ${lc}28`,
                  padding: '2px 7px', borderRadius: 5, letterSpacing: '0.03em',
                }}>
                  {match.league.name}
                </span>
              </div>

              {/* Format */}
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>{match.format}</div>

              {/* Status */}
              <div>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  fontSize: 11, padding: '2px 7px', borderRadius: 20,
                  background: sm.bg, color: sm.color, border: `1px solid ${sm.border}`,
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: sm.dot, flexShrink: 0,
                    ...(match.status === 'RUNNING' ? { boxShadow: '0 0 5px #34d399' } : {}) }} />
                  {sm.label}
                </span>
              </div>

              {/* Date */}
              <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.25)' }}>{formatDate(match.beginAt)}</div>

              {/* Score */}
              <div style={{ fontSize: 12.5, fontWeight: 700, color: 'rgba(255,255,255,0.45)', fontVariantNumeric: 'tabular-nums' }}>
                {match.homeScore !== null && match.awayScore !== null
                  ? `${match.homeScore} – ${match.awayScore}`
                  : <span style={{ color: 'rgba(255,255,255,0.12)' }}>—</span>}
              </div>

              {/* Predictions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                {match.predictionsCount > 0 ? (
                  <span style={{
                    fontSize: 12, fontWeight: 600,
                    color: match.predictionsCount > 10 ? '#a78bfa' : 'rgba(255,255,255,0.35)',
                  }}>
                    {match.predictionsCount}
                  </span>
                ) : (
                  <span style={{ color: 'rgba(255,255,255,0.12)', fontSize: 12 }}>—</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
