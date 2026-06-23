'use client';

import { useState } from 'react';

type Props = {
  leagueId: string;
  initialEnabled: boolean;
  color: string;
};

export function LeagueToggle({ leagueId, initialEnabled, color }: Props) {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/leagues/${leagueId}/toggle`, {
        method: 'PATCH',
      });
      if (res.ok) {
        const data = await res.json();
        setEnabled(data.isPredictionEnabled);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const trackColor = enabled ? color : 'rgba(255,255,255,0.1)';
  const thumbPos = enabled ? 'calc(100% - 2px)' : '2px';

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      aria-label={enabled ? 'Désactiver la ligue' : 'Activer la ligue'}
      style={{
        flexShrink: 0,
        position: 'relative',
        width: 40,
        height: 22,
        borderRadius: 99,
        border: `1px solid ${enabled ? color : 'rgba(255,255,255,0.12)'}`,
        background: enabled ? `${color}20` : 'rgba(255,255,255,0.04)',
        cursor: loading ? 'wait' : 'pointer',
        transition: 'all 0.2s ease',
        outline: 'none',
        opacity: loading ? 0.6 : 1,
      }}
    >
      {/* Thumb */}
      <span style={{
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        left: thumbPos,
        width: 16,
        height: 16,
        borderRadius: '50%',
        background: enabled ? color : 'rgba(255,255,255,0.25)',
        transition: 'left 0.2s ease, background 0.2s ease',
        boxShadow: enabled ? `0 0 6px ${color}80` : 'none',
        display: 'block',
      }} />
    </button>
  );
}
