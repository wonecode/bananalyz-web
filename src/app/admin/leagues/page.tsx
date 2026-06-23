import { fetchAdmin } from '@/lib/admin-api';
import { LeagueToggle } from './league-toggle';

type League = {
  id: string;
  pandascoreId: number;
  slug: string;
  name: string;
  isPredictionEnabled: boolean;
  activeGuilds: number;
  totalMatches: number;
  updatedAt: string;
};

type LeaguesResponse = { leagues: League[]; total: number };

const LEAGUE_META: Record<string, { color: string; bg: string; border: string; glow: string; label: string }> = {
  lec:            { color: '#5aa9ff', bg: 'rgba(90,169,255,0.12)',  border: 'rgba(90,169,255,0.22)',  glow: 'rgba(90,169,255,0.07)',  label: 'LEC' },
  lck:            { color: '#ffc400', bg: 'rgba(255,196,0,0.12)',   border: 'rgba(255,196,0,0.22)',   glow: 'rgba(255,196,0,0.07)',   label: 'LCK' },
  lpl:            { color: '#ff6450', bg: 'rgba(255,100,80,0.12)',  border: 'rgba(255,100,80,0.22)',  glow: 'rgba(255,100,80,0.07)',  label: 'LPL' },
  lcs:            { color: '#34d399', bg: 'rgba(52,211,153,0.12)',  border: 'rgba(52,211,153,0.22)',  glow: 'rgba(52,211,153,0.07)',  label: 'LCS' },
  msi:            { color: '#a78bfa', bg: 'rgba(167,139,250,0.12)', border: 'rgba(167,139,250,0.22)', glow: 'rgba(167,139,250,0.07)', label: 'MSI' },
  worlds:         { color: '#fb923c', bg: 'rgba(251,146,60,0.12)',  border: 'rgba(251,146,60,0.22)',  glow: 'rgba(251,146,60,0.07)',  label: 'WCS' },
  lfl:            { color: '#60a5fa', bg: 'rgba(96,165,250,0.12)',  border: 'rgba(96,165,250,0.22)',  glow: 'rgba(96,165,250,0.07)',  label: 'LFL' },
  'emea-masters': { color: '#f472b6', bg: 'rgba(244,114,182,0.12)', border: 'rgba(244,114,182,0.22)', glow: 'rgba(244,114,182,0.07)', label: 'EM'  },
  'first-stand':  { color: '#94a3b8', bg: 'rgba(148,163,184,0.12)', border: 'rgba(148,163,184,0.22)', glow: 'rgba(148,163,184,0.07)', label: 'FS'  },
};

function getMeta(slug: string) {
  return LEAGUE_META[slug.toLowerCase()] ?? {
    color: 'rgba(255,255,255,0.4)', bg: 'rgba(255,255,255,0.06)',
    border: 'rgba(255,255,255,0.1)', glow: 'rgba(255,255,255,0.03)',
    label: slug.toUpperCase().slice(0, 4),
  };
}

export default async function LeaguesPage() {
  const data = await fetchAdmin<LeaguesResponse>('/leagues');
  const leagues = data?.leagues ?? [];

  const active = leagues.filter((l) => l.isPredictionEnabled);
  const inactive = leagues.filter((l) => !l.isPredictionEnabled);

  return (
    <div style={{ padding: '32px 36px', maxWidth: 860 }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 20, fontWeight: 650, color: '#e8eaed', margin: 0, letterSpacing: '-0.02em' }}>Ligues</h1>
        <p style={{ marginTop: 3, fontSize: 12.5, color: 'rgba(255,255,255,0.28)', margin: '3px 0 0' }}>
          {active.length} active{active.length > 1 ? 's' : ''} &middot; {inactive.length} inactive{inactive.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* Active leagues — prominent cards */}
      {active.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <SectionLabel>Actives</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 10 }}>
            {active.map((league) => (
              <ActiveCard key={league.id} league={league} />
            ))}
          </div>
        </div>
      )}

      {/* Inactive leagues — compact table */}
      {inactive.length > 0 && (
        <div>
          <SectionLabel>Inactives</SectionLabel>
          <div style={{ background: '#0b0c0e', border: '1px solid rgba(255,255,255,0.055)', borderRadius: 10, overflow: 'hidden' }}>
            {inactive.map((league, i) => (
              <InactiveRow key={league.id} league={league} last={i === inactive.length - 1} />
            ))}
          </div>
        </div>
      )}

      {leagues.length === 0 && (
        <div style={{ padding: '56px 0', textAlign: 'center', color: 'rgba(255,255,255,0.15)', fontSize: 13 }}>
          Aucune ligue enregistrée.
        </div>
      )}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: 10.5, fontWeight: 600, color: 'rgba(255,255,255,0.22)',
      letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10,
    }}>
      {children}
    </div>
  );
}

function ActiveCard({ league }: { league: League }) {
  const m = getMeta(league.slug);
  return (
    <div style={{
      background: '#0b0c0e',
      border: `1px solid ${m.border}`,
      borderRadius: 12,
      padding: '18px 20px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at top left, ${m.glow} 0%, transparent 65%)`,
        pointerEvents: 'none',
      }} />

      {/* Top row: info + toggle */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
            background: m.color, boxShadow: `0 0 8px ${m.color}88`, marginTop: 2,
          }} />
          <div>
            <div style={{ fontSize: 15, fontWeight: 650, color: '#e8eaed', letterSpacing: '-0.01em' }}>{league.name}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', marginTop: 1, fontFamily: 'ui-monospace, monospace' }}>
              {league.slug} &middot; #{league.pandascoreId}
            </div>
          </div>
        </div>
        <LeagueToggle leagueId={league.id} initialEnabled={league.isPredictionEnabled} color={m.color} />
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 8, position: 'relative' }}>
        <StatChip value={league.activeGuilds} label="guilds" color={m.color} />
        <StatChip value={league.totalMatches} label="matchs" color={m.color} />
      </div>
    </div>
  );
}

function InactiveRow({ league, last }: { league: League; last: boolean }) {
  const m = getMeta(league.slug);
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '9px 16px',
      borderBottom: last ? 'none' : '1px solid rgba(255,255,255,0.038)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{
          fontSize: 10, fontWeight: 700, color: m.color,
          background: m.bg, border: `1px solid ${m.border}`,
          padding: '2px 7px', borderRadius: 5,
          letterSpacing: '0.04em', minWidth: 34, textAlign: 'center',
        }}>
          {m.label}
        </span>
        <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>{league.name}</span>
        <span style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.12)', fontFamily: 'ui-monospace, monospace' }}>#{league.pandascoreId}</span>
      </div>
      <LeagueToggle leagueId={league.id} initialEnabled={league.isPredictionEnabled} color={m.color} />
    </div>
  );
}

function StatChip({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 6,
      padding: '5px 10px',
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 6,
    }}>
      <span style={{ fontSize: 13, fontWeight: 700, color, fontVariantNumeric: 'tabular-nums' }}>{value}</span>
      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>{label}</span>
    </div>
  );
}
