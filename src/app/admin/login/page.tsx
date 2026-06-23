'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push('/admin');
    } else {
      setError('Mot de passe incorrect.');
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#08090a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'inherit',
    }}>
      {/* Subtle grid background */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }} />

      <div style={{ width: '100%', maxWidth: 380, position: 'relative' }}>
        {/* Card */}
        <div style={{
          background: '#0d0e10',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 16,
          padding: '36px 32px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: 'linear-gradient(135deg, #ffc400 0%, #ff9500 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 24, marginBottom: 16,
              boxShadow: '0 8px 24px rgba(255,196,0,0.25)',
            }}>
              🍌
            </div>
            <h1 style={{ fontSize: 18, fontWeight: 600, color: '#e2e4e9', margin: 0, lineHeight: 1.3 }}>Bananalyz Admin</h1>
            <p style={{ marginTop: 6, fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>Accès restreint</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{
                fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.3)',
                letterSpacing: '0.07em', textTransform: 'uppercase',
              }}>
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  borderRadius: 9,
                  padding: '10px 14px',
                  fontSize: 14,
                  color: '#e2e4e9',
                  outline: 'none',
                  transition: 'border-color 150ms',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
                onFocus={e => (e.target.style.borderColor = 'rgba(255,196,0,0.4)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.09)')}
              />
            </div>

            {error && (
              <div style={{
                fontSize: 12, color: 'rgba(255,100,100,0.9)',
                background: 'rgba(255,100,100,0.08)',
                border: '1px solid rgba(255,100,100,0.15)',
                borderRadius: 8, padding: '8px 12px',
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                background: loading ? 'rgba(255,196,0,0.15)' : 'rgba(255,196,0,0.12)',
                border: '1px solid rgba(255,196,0,0.25)',
                borderRadius: 9,
                padding: '11px 0',
                fontSize: 13,
                fontWeight: 600,
                color: loading ? 'rgba(255,196,0,0.4)' : '#ffc400',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 150ms',
                letterSpacing: '0.02em',
              }}
            >
              {loading ? 'Connexion…' : 'Se connecter'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
