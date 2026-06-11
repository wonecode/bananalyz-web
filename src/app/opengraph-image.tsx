import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Bananalyz — LoL Esports Predictions for Discord';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a1628 0%, #0d1f3c 50%, #111827 100%)',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Blue glow top-left */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            left: '-80px',
            width: '420px',
            height: '420px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(30,100,255,0.18) 0%, transparent 70%)',
          }}
        />
        {/* Yellow glow bottom-right */}
        <div
          style={{
            position: 'absolute',
            bottom: '-60px',
            right: '-60px',
            width: '380px',
            height: '380px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,196,0,0.15) 0%, transparent 70%)',
          }}
        />

        {/* Logo row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(255,196,0,0.15)',
              border: '2px solid rgba(255,196,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '42px',
            }}
          >
            🍌
          </div>
          <span
            style={{
              fontSize: '52px',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-1px',
            }}
          >
            Bananalyz
          </span>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontSize: '28px',
            color: 'rgba(255,255,255,0.75)',
            textAlign: 'center',
            maxWidth: '760px',
            lineHeight: 1.4,
            margin: '0 0 40px',
          }}
        >
          LoL Esports Predictions for Discord
        </p>

        {/* Yellow badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(255,196,0,0.12)',
            border: '1.5px solid rgba(255,196,0,0.6)',
            borderRadius: '9999px',
            padding: '10px 24px',
          }}
        >
          <span style={{ fontSize: '18px', color: '#ffc400', fontWeight: 600 }}>
            Predict · Earn Points · Climb Leaderboards
          </span>
        </div>

        {/* Bottom URL */}
        <p
          style={{
            position: 'absolute',
            bottom: '28px',
            fontSize: '18px',
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.5px',
          }}
        >
          bananalyz.junglesquad.fr
        </p>
      </div>
    ),
    { ...size }
  );
}
