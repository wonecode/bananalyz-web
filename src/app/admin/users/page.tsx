import { fetchAdmin } from '@/lib/admin-api';
import Link from 'next/link';

type User = {
  id: string;
  discordId: string;
  username: string | null;
  createdAt: string;
  guilds: { name: string | null; discordId: string }[];
  predictionCount: number;
  totalPoints: number;
};

type UsersResponse = {
  data: User[];
  meta: { total: number; page: number; limit: number; totalPages: number };
};

function num(n: number | undefined | null) {
  return (n ?? 0).toLocaleString('fr-FR');
}

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string; sortBy?: string }>;
}) {
  const sp     = await searchParams;
  const page   = Number(sp.page ?? 1);
  const search = sp.search ?? '';
  const sortBy = sp.sortBy ?? 'points';

  const qs = new URLSearchParams({ page: String(page), limit: '30', sortBy });
  if (search) qs.set('search', search);

  const res = await fetchAdmin<UsersResponse>(`/users?${qs}`, { revalidate: 30 });

  const users = res?.data ?? [];
  const meta  = res?.meta ?? { total: 0, page: 1, limit: 30, totalPages: 1 };

  return (
    <>
      <style>{`
        .user-row:hover { background: rgba(255,255,255,0.022) !important; }
        .user-row { transition: background 150ms; }
      `}</style>

      {/* Header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: 'rgba(7,8,9,0.92)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.055)',
        padding: '14px 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 14, fontWeight: 650, color: 'rgba(255,255,255,0.7)', letterSpacing: '-0.01em' }}>Utilisateurs</span>
          <span style={{
            fontSize: 11, padding: '2px 8px', borderRadius: 20,
            background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.3)',
            border: '1px solid rgba(255,255,255,0.08)', fontVariantNumeric: 'tabular-nums',
          }}>{num(meta.total)}</span>
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {/* Search */}
          <form method="GET" style={{ display: 'flex', gap: 6 }}>
            <input
              name="search"
              defaultValue={search}
              placeholder="Rechercher..."
              style={{
                background: '#0c0d0f', border: '1px solid rgba(255,255,255,0.09)',
                borderRadius: 7, padding: '6px 11px', fontSize: 12,
                color: 'rgba(255,255,255,0.6)', outline: 'none', width: 180,
              }}
            />
            {sortBy !== 'points' && <input type="hidden" name="sortBy" value={sortBy} />}
            <button type="submit" style={{
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: 7, padding: '6px 12px', fontSize: 12,
              color: 'rgba(255,255,255,0.45)', cursor: 'pointer',
            }}>OK</button>
          </form>

          {/* Sort */}
          <div style={{ display: 'flex', gap: 4 }}>
            {(['points', 'predictions'] as const).map((s) => (
              <Link key={s} href={`/admin/users?sortBy=${s}${search ? `&search=${encodeURIComponent(search)}` : ''}`} style={{
                fontSize: 11.5, padding: '5px 10px', borderRadius: 6, textDecoration: 'none',
                background: sortBy === s ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${sortBy === s ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.07)'}`,
                color: sortBy === s ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)',
              }}>
                {s === 'points' ? 'Points' : 'Prédictions'}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: '16px 32px 48px' }}>

        {/* Table */}
        <div style={{ background: '#0c0d0f', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, overflow: 'hidden' }}>

          {/* Col headers */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 120px 90px 100px 90px',
            padding: '9px 18px', borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}>
            {['Utilisateur', 'Serveurs', 'Préd.', 'Points', 'Membre depuis'].map((h, i) => (
              <span key={h} style={{
                fontSize: 9.5, fontWeight: 600, letterSpacing: '0.07em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)',
                textAlign: i > 0 ? 'right' : 'left',
              }}>{h}</span>
            ))}
          </div>

          {users.length === 0 && (
            <div style={{ padding: '48px 18px', textAlign: 'center', color: 'rgba(255,255,255,0.15)', fontSize: 13 }}>
              Aucun utilisateur trouvé.
            </div>
          )}

          {users.map((u, i) => {
            const name = u.username ?? u.discordId;
            const since = new Date(u.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
            return (
              <Link key={u.id} href={`/admin/users/${u.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                <div className="user-row" style={{
                  display: 'grid', gridTemplateColumns: '1fr 120px 90px 100px 90px',
                  padding: '10px 18px', alignItems: 'center',
                  borderTop: i > 0 ? '1px solid rgba(255,255,255,0.03)' : 'none',
                }}>
                  {/* User */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                      background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10.5, fontWeight: 700, color: 'rgba(255,255,255,0.4)',
                    }}>{name.slice(0, 2).toUpperCase()}</div>
                    <div>
                      <div style={{ fontSize: 12.5, fontWeight: 500, color: 'rgba(255,255,255,0.7)' }}>{name}</div>
                      {u.username && (
                        <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.22)', fontFamily: 'ui-monospace, monospace' }}>{u.discordId}</div>
                      )}
                    </div>
                  </div>
                  {/* Serveurs */}
                  <div style={{ textAlign: 'right' }}>
                    {u.guilds.slice(0, 2).map((g) => (
                      <span key={g.discordId} style={{
                        display: 'inline-block', fontSize: 10, padding: '1px 6px',
                        borderRadius: 4, background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        color: 'rgba(255,255,255,0.35)', marginLeft: 3,
                      }}>{g.name ?? g.discordId.slice(-4)}</span>
                    ))}
                    {u.guilds.length > 2 && (
                      <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', marginLeft: 3 }}>+{u.guilds.length - 2}</span>
                    )}
                  </div>
                  {/* Prédictions */}
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{num(u.predictionCount)}</span>
                  {/* Points */}
                  <span style={{ fontSize: 13.5, fontWeight: 700, color: '#ffc400', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                    {num(u.totalPoints)}
                    <span style={{ fontSize: 10, fontWeight: 500, color: 'rgba(255,196,0,0.4)', marginLeft: 3 }}>pts</span>
                  </span>
                  {/* Depuis */}
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', textAlign: 'right' }}>{since}</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Pagination */}
        {meta.totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 16 }}>
            {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map((p) => (
              <Link key={p} href={`/admin/users?page=${p}&sortBy=${sortBy}${search ? `&search=${encodeURIComponent(search)}` : ''}`} style={{
                width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: 7, fontSize: 12, textDecoration: 'none',
                background: p === meta.page ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${p === meta.page ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)'}`,
                color: p === meta.page ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)',
              }}>{p}</Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
