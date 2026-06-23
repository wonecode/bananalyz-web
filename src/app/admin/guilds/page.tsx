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

export default async function GuildsPage() {
  const data = await fetchAdmin<GuildsResponse>('/guilds');
  const guilds = data?.guilds ?? [];

  return (
    <div style={{ padding: '36px 40px' }}>
      {/* Header */}
      <div style={{ marginBottom: 28, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 600, color: '#e2e4e9', margin: 0, lineHeight: 1.3 }}>Serveurs</h1>
          <p style={{ marginTop: 4, fontSize: 13, color: 'rgba(255,255,255,0.3)', margin: '4px 0 0' }}>
            {guilds.length} serveur{guilds.length > 1 ? 's' : ''} enregistré{guilds.length > 1 ? 's' : ''}
          </p>
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 8, padding: '6px 14px',
          fontSize: 12, color: 'rgba(255,255,255,0.35)',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          Recherche à venir
        </div>
      </div>

      {/* Table */}
      <div style={{
        background: '#0d0e10',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 12,
        overflow: 'hidden',
      }}>
        {/* Table header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1.4fr 1fr 2fr 1fr',
          padding: '10px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          background: 'rgba(255,255,255,0.02)',
        }}>
          {['Serveur', 'Discord ID', 'Channel', 'Ligues actives', 'Ajouté'].map((h) => (
            <div key={h} style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.07em', textTransform: 'uppercase' }}>{h}</div>
          ))}
        </div>

        {/* Rows */}
        {guilds.length === 0 && (
          <div style={{ padding: '64px 20px', textAlign: 'center', color: 'rgba(255,255,255,0.15)', fontSize: 13 }}>
            Aucun serveur enregistré.
          </div>
        )}
        {guilds.map((guild) => (
          <div
            key={guild.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1.4fr 1fr 2fr 1fr',
              padding: '14px 20px',
              borderBottom: '1px solid rgba(255,255,255,0.04)',
              alignItems: 'center',
              transition: 'background 120ms',
            }}
          >
            {/* Nom */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 9,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                border: '1px solid rgba(255,255,255,0.07)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)', flexShrink: 0,
              }}>
                {guild.name?.[0]?.toUpperCase() ?? '?'}
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: '#e2e4e9' }}>{guild.name ?? 'Serveur inconnu'}</span>
            </div>

            {/* Discord ID */}
            <div>
              <code style={{
                fontSize: 11, color: 'rgba(255,255,255,0.25)',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
                padding: '3px 7px', borderRadius: 5,
              }}>{guild.discordId}</code>
            </div>

            {/* Channel */}
            <div>
              {guild.predictionChannelId ? (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  fontSize: 11, padding: '3px 9px', borderRadius: 20,
                  background: 'rgba(52,211,153,0.09)',
                  color: 'rgba(52,211,153,0.85)',
                  border: '1px solid rgba(52,211,153,0.18)',
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgb(52,211,153)', flexShrink: 0 }} />
                  Actif
                </span>
              ) : (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  fontSize: 11, padding: '3px 9px', borderRadius: 20,
                  background: 'rgba(255,255,255,0.04)',
                  color: 'rgba(255,255,255,0.22)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', flexShrink: 0 }} />
                  Aucun
                </span>
              )}
            </div>

            {/* Ligues */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {guild.enabledLeagues.length === 0 ? (
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.15)' }}>—</span>
              ) : (
                guild.enabledLeagues.map((l) => (
                  <span key={l.slug} style={{
                    fontSize: 11, padding: '3px 8px', borderRadius: 6,
                    background: 'rgba(255,196,0,0.07)',
                    color: 'rgba(255,196,0,0.7)',
                    border: '1px solid rgba(255,196,0,0.15)',
                  }}>{l.name}</span>
                ))
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
