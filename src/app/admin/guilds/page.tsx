import { fetchAdmin } from '@/lib/admin-api';

type Guild = {
  id: string;
  discordId: string;
  name: string | null;
  predictionChannelId: string | null;
  enabledLeagues: { name: string; slug: string }[];
  createdAt: string;
};

type GuildsResponse = { guilds: Guild[]; total: number };

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const rtf = new Intl.RelativeTimeFormat('fr', { numeric: 'auto' });
  const minutes = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(diff / 86_400_000);
  if (days > 0) return rtf.format(-days, 'day');
  if (hours > 0) return rtf.format(-hours, 'hour');
  return rtf.format(-minutes, 'minute');
}

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

export default async function GuildsPage() {
  const data = await fetchAdmin<GuildsResponse>('/guilds');
  const guilds = data?.guilds ?? [];

  const COL = '1.8fr 1.3fr 0.9fr 1.6fr 0.9fr';

  return (
    <div style={{ padding: '32px 36px' }}>
      {/* Header */}
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 650, color: '#e8eaed', margin: 0, letterSpacing: '-0.02em' }}>Serveurs</h1>
          <p style={{ marginTop: 3, fontSize: 12.5, color: 'rgba(255,255,255,0.28)', margin: '3px 0 0' }}>
            {guilds.length} serveur{guilds.length > 1 ? 's' : ''} enregistré{guilds.length > 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#0b0c0e', border: '1px solid rgba(255,255,255,0.055)', borderRadius: 10, overflow: 'hidden' }}>
        {/* Header row */}
        <div style={{
          display: 'grid', gridTemplateColumns: COL,
          padding: '9px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          background: 'rgba(255,255,255,0.018)',
        }}>
          {['Serveur', 'Discord ID', 'Channel', 'Ligues actives', 'Ajouté'].map((h) => (
            <div key={h} style={{ fontSize: 10.5, fontWeight: 600, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.07em', textTransform: 'uppercase' }}>{h}</div>
          ))}
        </div>

        {/* Body */}
        {guilds.length === 0 && (
          <div style={{ padding: '56px 16px', textAlign: 'center', color: 'rgba(255,255,255,0.15)', fontSize: 13 }}>Aucun serveur enregistré.</div>
        )}
        {guilds.map((guild) => (
          <div key={guild.id} className="group" style={{
            display: 'grid', gridTemplateColumns: COL,
            padding: '11px 16px',
            borderBottom: '1px solid rgba(255,255,255,0.038)',
            alignItems: 'center',
          }}>
            {/* Serveur */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
              <Avatar name={guild.name} />
              <span style={{ fontSize: 13, fontWeight: 550, color: '#d4d6db', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {guild.name ?? 'Serveur inconnu'}
              </span>
            </div>

            {/* Discord ID */}
            <div>
              <span style={{
                fontSize: 11, color: 'rgba(255,255,255,0.22)',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                padding: '2px 7px', borderRadius: 5,
                fontFamily: 'ui-monospace, monospace',
                letterSpacing: '-0.01em',
              }}>{guild.discordId}</span>
            </div>

            {/* Channel */}
            <div>
              {guild.predictionChannelId ? (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11.5,
                  padding: '2px 8px', borderRadius: 20,
                  background: 'rgba(52,211,153,0.09)', color: 'rgba(52,211,153,0.85)',
                  border: '1px solid rgba(52,211,153,0.16)', fontWeight: 500,
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgb(52,211,153)', flexShrink: 0, boxShadow: '0 0 5px rgba(52,211,153,0.6)' }} />
                  Actif
                </span>
              ) : (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11.5,
                  padding: '2px 8px', borderRadius: 20,
                  background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.2)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(255,255,255,0.18)', flexShrink: 0 }} />
                  Aucun
                </span>
              )}
            </div>

            {/* Ligues */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {guild.enabledLeagues.length === 0 ? (
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.15)' }}>—</span>
              ) : (
                guild.enabledLeagues.map((l) => {
                  const c = getLeagueColor(l.slug);
                  return (
                    <span key={l.slug} style={{
                      fontSize: 11, padding: '2px 7px', borderRadius: 5,
                      background: c.bg, color: c.text, border: `1px solid ${c.border}`,
                      fontWeight: 650, letterSpacing: '0.01em',
                    }}>{l.name}</span>
                  );
                })
              )}
            </div>

            {/* Date */}
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>
              {timeAgo(guild.createdAt)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
