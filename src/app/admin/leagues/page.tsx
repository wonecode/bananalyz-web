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

const LEAGUE_COLORS: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  lec: { bg: 'rgba(90,169,255,0.1)', text: 'rgba(90,169,255,0.9)', border: 'rgba(90,169,255,0.2)', glow: 'rgba(90,169,255,0.08)' },
  lck: { bg: 'rgba(255,196,0,0.1)', text: 'rgba(255,196,0,0.85)', border: 'rgba(255,196,0,0.2)', glow: 'rgba(255,196,0,0.08)' },
  lpl: { bg: 'rgba(255,100,80,0.1)', text: 'rgba(255,100,80,0.85)', border: 'rgba(255,100,80,0.2)', glow: 'rgba(255,100,80,0.08)' },
  lcs: { bg: 'rgba(52,211,153,0.1)', text: 'rgba(52,211,153,0.85)', border: 'rgba(52,211,153,0.2)', glow: 'rgba(52,211,153,0.08)' },
  msi: { bg: 'rgba(167,139,250,0.1)', text: 'rgba(167,139,250,0.85)', border: 'rgba(167,139,250,0.2)', glow: 'rgba(167,139,250,0.08)' },
  worlds: { bg: 'rgba(251,146,60,0.1)', text: 'rgba(251,146,60,0.85)', border: 'rgba(251,146,60,0.2)', glow: 'rgba(251,146,60,0.08)' },
};

function getLeagueColor(slug: string) {
  return LEAGUE_COLORS[slug.toLowerCase()] ?? {
    bg: 'rgba(255,255,255,0.06)', text: 'rgba(255,255,255,0.5)',
    border: 'rgba(255,255,255,0.1)', glow: 'rgba(255,255,255,0.03)',
  };
}

function StatPill({ value, label }: { value: number; label: string }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '8px 16px',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: 8, minWidth: 72,
    }}>
      <span style={{ fontSize: 16, fontWeight: 700, color: '#e8eaed', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{value}</span>
      <span style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.25)', marginTop: 3, whiteSpace: 'nowrap' }}>{label}</span>
    </div>
  );
}

export default async function LeaguesPage() {
  const data = await fetchAdmin<LeaguesResponse>('/leagues');
  const leagues = data?.leagues ?? [];

  const enabled = leagues.filter((l) => l.isPredictionEnabled).length;
  const disabled = leagues.length - enabled;

  return (
    <div style={{ padding: '32px 36px', maxWidth: 900 }}>
      {/* Header */}
      <div style={{ marginBottom: 28, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 650, color: '#e8eaed', margin: 0, letterSpacing: '-0.02em' }}>Ligues</h1>
          <p style={{ marginTop: 3, fontSize: 12.5, color: 'rgba(255,255,255,0.28)', margin: '3px 0 0' }}>
            {enabled} active{enabled > 1 ? 's' : ''} &middot; {disabled} inactive{disabled > 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* League cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {leagues.length === 0 && (
          <div style={{ padding: '56px 16px', textAlign: 'center', color: 'rgba(255,255,255,0.15)', fontSize: 13 }}>Aucune ligue enregistrée.</div>
        )}
        {leagues.map((league) => {
          const c = getLeagueColor(league.slug);
          return (
            <div key={league.id} style={{
              background: '#0b0c0e',
              border: `1px solid ${league.isPredictionEnabled ? c.border : 'rgba(255,255,255,0.055)'}`,
              borderRadius: 10,
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              position: 'relative',
              overflow: 'hidden',
              transition: 'border-color 0.2s',
            }}>
              {/* Glow quand actif */}
              {league.isPredictionEnabled && (
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `radial-gradient(ellipse at left center, ${c.glow} 0%, transparent 60%)`,
                  pointerEvents: 'none',
                }} />
              )}

              {/* Badge slug */}
              <div style={{
                flexShrink: 0, minWidth: 52,
                padding: '5px 10px',
                borderRadius: 7,
                background: c.bg,
                border: `1px solid ${c.border}`,
                textAlign: 'center',
              }}>
                <span style={{ fontSize: 12, fontWeight: 750, color: c.text, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  {league.slug}
                </span>
              </div>

              {/* Infos */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#e8eaed' }}>{league.name}</span>
                  <span style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.18)', fontFamily: 'monospace' }}>#{league.pandascoreId}</span>
                </div>
                <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.22)', marginTop: 2 }}>
                  {league.isPredictionEnabled ? (
                    <span style={{ color: 'rgba(52,211,153,0.7)' }}>✓ Prédictions activées</span>
                  ) : (
                    <span>Prédictions désactivées</span>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <StatPill value={league.activeGuilds} label="guilds actives" />
                <StatPill value={league.totalMatches} label="matchs" />
              </div>

              {/* Toggle */}
              <LeagueToggle
                leagueId={league.id}
                initialEnabled={league.isPredictionEnabled}
                color={c.text}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
