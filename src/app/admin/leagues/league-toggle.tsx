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

  // track: 40px wide, thumb: 14px, padding: 3px each side
  // OFF: left = 3px  |  ON: left = 40 - 14 - 3 = 23px
  const thumbPos = enabled ? '23px' : '3px';

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
        background: enabled ? `${color}22` : 'rgba(255,255,255,0.04)',
        cursor: loading ? 'wait' : 'pointer',
        transition: 'background 0.2s ease, border-color 0.2s ease',
        outline: 'none',
        opacity: loading ? 0.6 : 1,
        padding: 0,
      }}
    >
      <span style={{
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        left: thumbPos,
        width: 14,
        height: 14,
        borderRadius: '50%',
        background: enabled ? color : 'rgba(255,255,255,0.22)',
        transition: 'left 0.2s ease, background 0.2s ease, box-shadow 0.2s ease',
        boxShadow: enabled ? `0 0 6px ${color}88` : 'none',
        display: 'block',
      }} />
    </button>
  );
}
