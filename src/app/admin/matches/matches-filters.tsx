'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';

type League = { id: string; name: string; slug: string; isPredictionEnabled: boolean };

type Props = {
  leagues: League[];
  currentStatus?: string;
  currentSlug?: string;
  currentUpcoming?: boolean;
};

const STATUSES = [
  { value: '', label: 'Tous' },
  { value: 'RUNNING', label: '🟢 En cours' },
  { value: 'NOT_STARTED', label: 'À venir' },
  { value: 'FINISHED', label: 'Terminés' },
  { value: 'CANCELLED', label: 'Annulés' },
];

export function MatchesFilters({ leagues, currentStatus, currentSlug, currentUpcoming }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const push = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value) params.set(key, value);
    else params.delete(key);
    // upcoming et status sont mutuellement exclusifs
    if (key === 'upcoming') { params.delete('status'); }
    if (key === 'status') { params.delete('upcoming'); }
    router.push(`${pathname}?${params.toString()}`);
  }, [router, pathname]);

  const filterBtn = (active: boolean, onClick: () => void, children: React.ReactNode) => (
    <button
      onClick={onClick}
      style={{
        padding: '5px 12px', borderRadius: 6, fontSize: 12, fontWeight: 500,
        cursor: 'pointer', border: 'none', transition: 'all 0.15s',
        background: active ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)',
        color: active ? '#e8eaed' : 'rgba(255,255,255,0.35)',
        outline: active ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {children}
    </button>
  );

  const activeStatus = currentUpcoming ? 'upcoming' : (currentStatus ?? '');

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 16, alignItems: 'center' }}>
      {/* Status filters */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {filterBtn(activeStatus === 'upcoming', () => push('upcoming', activeStatus === 'upcoming' ? '' : 'true'), '⚡ Prochains')}
        {STATUSES.map((s) =>
          filterBtn(
            activeStatus === s.value && activeStatus !== 'upcoming',
            () => push('status', s.value),
            s.label
          )
        )}
      </div>

      {/* Divider */}
      <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.08)' }} />

      {/* League filters */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {filterBtn(!currentSlug, () => push('slug', ''), 'Toutes')}
        {leagues.filter(l => l.isPredictionEnabled).map((l) =>
          filterBtn(
            currentSlug === l.slug,
            () => push('slug', currentSlug === l.slug ? '' : l.slug),
            l.name
          )
        )}
      </div>
    </div>
  );
}
