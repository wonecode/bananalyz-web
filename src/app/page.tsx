import Link from 'next/link';
import Image from 'next/image';
import {
  Zap,
  Trophy,
  BarChart3,
  ChevronRight,
  Star,
  Clock,
  Users,
  Check,
  RefreshCw,
  Globe,
  Server,
} from 'lucide-react';

const INVITE_URL =
  'https://discord.com/oauth2/authorize?client_id=1498348728078176377&permissions=139586750592&scope=bot+applications.commands';

const TOPGG_URL = 'https://top.gg/fr/bot/1498348728078176377';

const features = [
  {
    icon: Zap,
    title: 'Instant predictions',
    description:
      'Predict match outcomes directly from Discord using interactive buttons — no external app needed.',
    color: '#5aa9ff',
  },
  {
    icon: Trophy,
    title: 'Server leaderboards',
    description:
      'Compete with your friends on a per-server leaderboard or climb the global rankings.',
    color: '#fbbf24',
  },
  {
    icon: BarChart3,
    title: 'Detailed stats',
    description:
      'Track your win rate, perfect predictions, and total points with the /predictions command.',
    color: '#4ade80',
  },
  {
    icon: RefreshCw,
    title: 'Auto-sync',
    description:
      'Matches and scores are automatically synced every 5 minutes — no manual updates needed.',
    color: '#c084fc',
  },
];

const commands = [
  { name: '/predictions', desc: 'View your stats and recent results', color: '#fbbf24' },
  { name: '/matches', desc: 'Browse upcoming prediction matches', color: '#5aa9ff' },
  { name: '/leaderboard', desc: 'See server or global rankings', color: '#4ade80' },
  { name: '/config', desc: 'Set up your prediction channel (admin)', color: '#c084fc' },
];

const TEAM_LOGOS: Record<string, string> = {
  'G2 Esports': '/logos/g2.webp',
  'Karmine Corp': '/logos/kc.webp',
  Fnatic: '/logos/fnc.png',
  'Team Vitality': '/logos/vit.png',
  'Team Heretics': '/logos/th.png',
  'Movistar KOI': '/logos/MKOI.webp',
  'SK Gaming': '/logos/sk.png',
  Giants: '/logos/gx.png',
  NAVI: '/logos/navi.png',
  Shifters: '/logos/shft.png',
  'KT Rolster': '/logos/kt-rolster-2026.webp',
  'Dplus KIA': '/logos/dplus-orig.webp',
};

const LEAGUE_LOGOS: Record<string, string> = {
  LEC: '/logos/lec.webp',
  LCK: '/logos/lck.webp',
  LPL: '/logos/lpl.png',
  LFL: '/logos/lfl.webp',
  MSI: '/logos/msi.webp',
  Worlds: '/logos/worlds.png',
  'EMEA Masters': '/logos/emea_masters.webp',
  'First Stand': '/logos/first_stand.webp',
};

function TeamLogo({ name, size = 20 }: { name: string; size?: number }) {
  const src = TEAM_LOGOS[name];
  if (!src) return <span style={{ fontSize: size * 0.7 }}>⚔️</span>;
  return (
    <Image
      src={src}
      alt={name}
      width={size}
      height={size}
      className="shrink-0 object-contain"
      style={{ width: size, height: size }}
    />
  );
}

function LeagueLogo({ name, size = 16 }: { name: string; size?: number }) {
  const src = LEAGUE_LOGOS[name];
  if (!src) return <span style={{ fontSize: size * 0.7 }}>⚔️</span>;
  return (
    <Image
      src={src}
      alt={name}
      width={size}
      height={size}
      className="shrink-0 object-contain"
      style={{ width: size, height: size }}
    />
  );
}

function TopGgIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      viewBox="120 120 580 580"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M655.711 247H330.71V572H397.113C422.599 572 447.042 561.876 465.064 543.854C483.086 525.832 493.21 501.389 493.21 475.902V409.5H559.613C585.099 409.5 609.542 399.375 627.564 381.354C645.586 363.332 655.711 338.889 655.711 313.402V247Z"
      />
      <path
        fill="currentColor"
        d="M144 247H306.5V409.5H193.657C180.531 409.5 167.943 404.286 158.661 395.004C149.379 385.722 144.165 373.134 144.165 360.008L144 247Z"
      />
    </svg>
  );
}

function DiscordIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-discord"
      viewBox="0 0 16 16"
    >
      <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
    </svg>
  );
}

// ─────────────────────────────────────────
function DiscordMessage({ time, children }: { time: string; children: React.ReactNode }) {
  return (
    <div
      className="w-full overflow-hidden rounded-2xl select-none"
      style={{
        background: '#313338',
        boxShadow: '0 16px 48px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)',
      }}
    >
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg"
          style={{ background: 'linear-gradient(135deg, #1e2847 0%, #111827 100%)' }}
        >
          <img alt="banana" src="android-chrome-192x192.png" className="h-5 w-5" />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-white">Bananalyz</span>
          <span
            className="rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wide"
            style={{ background: '#5865f2', color: 'white' }}
          >
            APP
          </span>
          <span className="text-xs" style={{ color: '#4e5058' }}>
            {time}
          </span>
        </div>
      </div>
      {children}
    </div>
  );
}

function MatchEmbed() {
  return (
    <DiscordMessage time="Today at 14:08">
      <div
        className="mx-4 overflow-hidden rounded-lg"
        style={{
          background: '#2b2d31',
          borderLeft: '4px solid #4f96ff',
        }}
      >
        <div className="flex items-center gap-2 px-4 pt-3 pb-2">
          <div
            className="flex items-center gap-1.5 rounded-full px-2 py-0.5"
            style={{
              background: 'rgba(79,150,255,0.12)',
              border: '1px solid rgba(79,150,255,0.25)',
            }}
          >
            <LeagueLogo name="LEC" size={12} />
            <span className="text-[11px] font-bold tracking-wide" style={{ color: '#4f96ff' }}>
              LEC
            </span>
          </div>
          <span
            className="rounded px-1.5 py-0.5 text-[10px]"
            style={{ background: '#383a40', color: '#80848e' }}
          >
            BO5 · Play-offs
          </span>
        </div>

        <div className="px-4 pb-3">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl"
                style={{ background: 'rgba(255,255,255,0.05)' }}
              >
                <TeamLogo name="G2 Esports" size={22} />
              </div>
              <div>
                <p className="text-sm leading-none font-bold text-white">G2 Esports</p>
                <p className="mt-0.5 text-[11px]" style={{ color: '#80848e' }}>
                  63% predicted
                </p>
              </div>
            </div>
            <div
              className="rounded-lg px-3 py-1 text-xs font-black"
              style={{ background: '#383a40', color: '#80848e', letterSpacing: '0.05em' }}
            >
              VS
            </div>
            <div className="flex flex-row-reverse items-center gap-2">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl"
                style={{ background: 'rgba(255,255,255,0.05)' }}
              >
                <TeamLogo name="Karmine Corp" size={22} />
              </div>
              <div className="text-right">
                <p className="text-sm leading-none font-bold text-white">Karmine Corp</p>
                <p className="mt-0.5 text-[11px]" style={{ color: '#80848e' }}>
                  37% predicted
                </p>
              </div>
            </div>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full" style={{ background: '#383a40' }}>
            <div
              className="h-full rounded-full"
              style={{
                width: '63%',
                background: 'linear-gradient(90deg, #4f96ff 0%, #818cf8 100%)',
              }}
            />
          </div>
          <div className="mt-1 flex justify-between">
            <span className="text-[10px] font-semibold" style={{ color: '#4f96ff' }}>
              9 picks
            </span>
            <span className="text-[10px] font-semibold" style={{ color: '#80848e' }}>
              5 picks
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 px-4 pb-3 text-xs">
          <div
            className="flex items-center gap-1.5 rounded-lg px-2 py-1"
            style={{ background: '#383a40' }}
          >
            <Clock size={10} style={{ color: '#80848e' }} />
            <span className="text-white">in 2 hours</span>
          </div>
          <div
            className="flex items-center gap-1.5 rounded-lg px-2 py-1"
            style={{ background: '#383a40' }}
          >
            <Users size={10} style={{ color: '#80848e' }} />
            <span className="text-white">14 predictions</span>
          </div>
        </div>

        <div className="px-4 pb-3">
          <p className="mb-1 text-[11px]" style={{ color: '#80848e' }}>
            Predictors in this server
          </p>
          <p className="text-xs" style={{ color: '#4f96ff' }}>
            @Bonobo Éolien, @Macaque Gambler, @Singe Agressif, @Bonobo soyeux
          </p>
        </div>

        <div className="px-4 pb-3">
          <p className="text-[11px]" style={{ color: '#4e5058' }}>
            You can update your prediction until the match starts.
          </p>
        </div>
      </div>

      <div className="space-y-2 px-4 py-3">
        <p
          className="mb-2 text-[11px] font-semibold tracking-widest uppercase"
          style={{ color: '#4e5058' }}
        >
          Pick your winner &amp; score
        </p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'G2 3-0', team: 'G2 Esports' },
            { label: 'G2 3-1', team: 'G2 Esports' },
            { label: 'G2 3-2', team: 'G2 Esports' },
          ].map((s) => (
            <button
              key={s.label}
              className="flex items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-xs font-semibold text-white transition-all"
              style={{
                background: 'rgba(79,150,255,0.12)',
                border: '1px solid rgba(79,150,255,0.3)',
              }}
            >
              <TeamLogo name={s.team} size={13} /> {s.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'KC 3-0', team: 'Karmine Corp' },
            { label: 'KC 3-1', team: 'Karmine Corp' },
            { label: 'KC 3-2', team: 'Karmine Corp' },
          ].map((s) => (
            <button
              key={s.label}
              className="flex items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-xs font-semibold text-white"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <TeamLogo name={s.team} size={13} /> {s.label}
            </button>
          ))}
        </div>
      </div>
    </DiscordMessage>
  );
}

function PredictionsEmbed() {
  const recentResults = [
    {
      league: 'LEC',
      team1: 'G2 Esports',
      team2: 'Karmine Corp',
      result: 'G2 Esports',
      resultScore: '3-2',
      pick: 'G2 Esports',
      pickScore: '3-0',
      pts: '+3',
      won: true,
    },
    {
      league: 'LCK',
      team1: 'KT Rolster',
      team2: 'Dplus KIA',
      result: 'KT Rolster',
      resultScore: '3-2',
      pick: 'Dplus KIA',
      pickScore: '1-3',
      pts: '+0',
      won: false,
    },
    {
      league: 'LEC',
      team1: 'Movistar KOI',
      team2: 'Karmine Corp',
      result: 'Karmine Corp',
      resultScore: '3-0',
      pick: 'Karmine Corp',
      pickScore: '1-3',
      pts: '+3',
      won: true,
    },
  ];

  return (
    <DiscordMessage time="Today at 14:51">
      <div
        className="mx-4 mb-4 overflow-hidden rounded-lg"
        style={{ background: '#2b2d31', borderLeft: '4px solid #fbbf24' }}
      >
        <div className="flex items-center gap-2 px-4 pt-3 pb-2">
          <p className="text-sm font-bold text-white">🍌 My predictions</p>
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
            style={{
              background: 'rgba(251,191,36,0.15)',
              color: '#fbbf24',
              border: '1px solid rgba(251,191,36,0.3)',
            }}
          >
            Bonobo Éolien
          </span>
        </div>

        <div
          className="mx-4 mb-3 grid grid-cols-4 gap-2 rounded-xl p-3"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="text-center">
            <p className="text-lg font-black text-white">177</p>
            <p className="text-[10px]" style={{ color: '#80848e' }}>
              🍌 pts
            </p>
          </div>
          <div className="text-center">
            <p className="text-lg font-black" style={{ color: '#4ade80' }}>
              84%
            </p>
            <p className="text-[10px]" style={{ color: '#80848e' }}>
              Win rate
            </p>
          </div>
          <div className="text-center">
            <p className="text-lg font-black text-white">49W</p>
            <p className="text-[10px]" style={{ color: '#80848e' }}>
              Wins
            </p>
          </div>
          <div className="text-center">
            <p className="text-lg font-black" style={{ color: '#fbbf24' }}>
              15✨
            </p>
            <p className="text-[10px]" style={{ color: '#80848e' }}>
              Perfects
            </p>
          </div>
        </div>

        <div className="px-4 pb-3">
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-white">
            <span style={{ color: '#80848e' }}>📋</span> Recent results
          </p>
          <div className="space-y-2">
            {recentResults.map((r, i) => (
              <div
                key={i}
                className="rounded-lg p-2.5"
                style={{
                  background: r.won ? 'rgba(74,222,128,0.05)' : 'rgba(248,113,113,0.05)',
                  border: `1px solid ${r.won ? 'rgba(74,222,128,0.15)' : 'rgba(248,113,113,0.12)'}`,
                }}
              >
                <div className="mb-1 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs">
                    <LeagueLogo name={r.league} size={11} />
                    <span className="flex items-center gap-1 font-medium text-white">
                      <TeamLogo name={r.team1} size={11} /> {r.team1}
                    </span>
                    <span style={{ color: '#4e5058' }}>vs</span>
                    <span className="flex items-center gap-1 font-medium text-white">
                      <TeamLogo name={r.team2} size={11} /> {r.team2}
                    </span>
                  </div>
                  <span
                    className="rounded px-1.5 py-0.5 text-xs font-bold"
                    style={{
                      background: r.won ? 'rgba(74,222,128,0.15)' : 'rgba(248,113,113,0.15)',
                      color: r.won ? '#4ade80' : '#f87171',
                    }}
                  >
                    {r.won ? '🎯' : '❌'} {r.pts}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[11px]" style={{ color: '#80848e' }}>
                  <span>
                    Result: <span className="font-medium text-white">{r.result}</span>{' '}
                    <span
                      className="rounded px-1 py-0.5 text-[10px]"
                      style={{ background: '#383a40', color: '#d1d5db' }}
                    >
                      {r.resultScore}
                    </span>
                  </span>
                  <span style={{ color: '#383a40' }}>·</span>
                  <span>
                    Pick: <span className="font-medium text-white">{r.pick}</span>{' '}
                    <span
                      className="rounded px-1 py-0.5 text-[10px]"
                      style={{ background: '#383a40', color: '#d1d5db' }}
                    >
                      {r.pickScore}
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 pb-4">
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-white">
            <span style={{ color: '#80848e' }}>⏳</span> Upcoming predictions
          </p>
          <div className="space-y-2">
            {[
              {
                league: 'LCK',
                match: 'Hanwha Life Esports vs T1',
                pick: 'T1',
                score: '1-3',
                starts: 'in 2 days',
              },
              {
                league: 'LCK',
                match: 'Gen.G vs KT Rolster',
                pick: 'Gen.G',
                score: '3-0',
                starts: 'in 3 days',
              },
            ].map((u, i) => (
              <div
                key={i}
                className="rounded-lg p-2.5"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <div className="mb-1 flex items-center gap-1.5 text-xs font-medium text-white">
                  <LeagueLogo name={u.league} size={11} />
                  <span>{u.match}</span>
                </div>
                <div className="flex items-center gap-3 text-[11px]" style={{ color: '#80848e' }}>
                  <span>
                    Winner: <span className="text-white">{u.pick}</span>
                  </span>
                  <span>
                    Score:{' '}
                    <span
                      className="rounded px-1.5 py-0.5 text-[10px] text-white"
                      style={{ background: '#383a40' }}
                    >
                      {u.score}
                    </span>
                  </span>
                  <span
                    className="ml-auto rounded px-1.5 py-0.5 text-[10px]"
                    style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24' }}
                  >
                    {u.starts}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px]" style={{ color: '#4e5058' }}>
            You can update your predictions until each match starts.
          </p>
        </div>
      </div>
    </DiscordMessage>
  );
}

function LeaderboardEmbed() {
  const players = [
    { rank: 1, name: 'Bonobo Basic Fit', pts: 200, acc: '80%', perfect: '47%' },
    { rank: 2, name: 'Singe Apaisé', pts: 187, acc: '78%', perfect: '45%' },
    { rank: 3, name: 'Singe Agressif', pts: 183, acc: '78%', perfect: '35%' },
    { rank: 4, name: 'Singe Cultivé', pts: 179, acc: '75%', perfect: '37%' },
    { rank: 5, name: 'Général Tropical', pts: 178, acc: '77%', perfect: '40%' },
    { rank: 6, name: 'Bonobo Éolien', pts: 177, acc: '84%', perfect: '26%' },
    { rank: 7, name: 'Macaque Gambler', pts: 173, acc: '73%', perfect: '45%' },
    { rank: 8, name: 'Singe dans le Coma', pts: 166, acc: '76%', perfect: '36%' },
  ];

  const rankStyle: Record<number, { color: string; bg: string; label: string }> = {
    1: { color: '#fbbf24', bg: 'rgba(251,191,36,0.12)', label: '🥇' },
    2: { color: '#94a3b8', bg: 'rgba(148,163,184,0.1)', label: '🥈' },
    3: { color: '#d97706', bg: 'rgba(217,119,6,0.12)', label: '🥉' },
  };

  return (
    <DiscordMessage time="Today at 15:24">
      <div
        className="mx-4 mb-4 overflow-hidden rounded-lg"
        style={{ background: '#2b2d31', borderLeft: '4px solid #4f96ff' }}
      >
        <div className="flex items-start justify-between px-4 pt-3 pb-3">
          <div>
            <p className="text-sm font-bold text-white">🍌 Server leaderboard</p>
            <p className="mt-0.5 text-xs" style={{ color: '#80848e' }}>
              Jungle Squad · Page 1/3
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px]" style={{ color: '#80848e' }}>
              Last scored match
            </p>
            <span
              className="mt-0.5 inline-block rounded px-2 py-0.5 text-[11px] text-white"
              style={{ background: '#383a40' }}
            >
              <span className="flex items-center gap-1">
                <TeamLogo name="G2 Esports" size={10} />
                G2 vs
                <TeamLogo name="Karmine Corp" size={10} />
                KC — 07/06
              </span>
            </span>
          </div>
        </div>

        <div className="space-y-1 px-4 pb-1">
          {players.map((p) => {
            const rs = rankStyle[p.rank];
            return (
              <div
                key={p.rank}
                className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs"
                style={{
                  background: rs ? rs.bg : p.rank === 5 ? 'rgba(79,150,255,0.08)' : 'transparent',
                  border: p.rank === 5 ? '1px solid rgba(79,150,255,0.2)' : '1px solid transparent',
                }}
              >
                <span
                  className="w-5 shrink-0 text-center text-[11px] font-bold"
                  style={{ color: rs ? rs.color : '#4e5058' }}
                >
                  {rs ? rs.label : p.rank}
                </span>
                <span
                  className="flex-1 truncate text-[12px] font-medium"
                  style={{ color: p.rank === 5 ? '#93c5fd' : '#d1d5db' }}
                >
                  @{p.name}
                  {p.rank === 5 && (
                    <span
                      className="ml-1.5 rounded px-1 py-0.5 text-[9px] tracking-wider uppercase"
                      style={{ background: 'rgba(79,150,255,0.2)', color: '#4f96ff' }}
                    >
                      you
                    </span>
                  )}
                </span>
                <span className="flex items-center gap-1 font-bold" style={{ color: '#fbbf24' }}>
                  🍌 <span className="text-white">{p.pts}</span>
                </span>
                <span style={{ color: '#4e5058' }}>·</span>
                <span style={{ color: '#80848e' }}>
                  🎯 <span className="text-white">{p.acc}</span>
                </span>
                <span style={{ color: '#4e5058' }}>·</span>
                <span style={{ color: '#80848e' }}>
                  ✨ <span className="text-white">{p.perfect}</span>
                </span>
              </div>
            );
          })}
        </div>

        <div className="px-4 py-3">
          <p className="text-[11px]" style={{ color: '#4e5058' }}>
            🍌 Bananas · 🎯 Accuracy · ✨ Perfects
          </p>
        </div>
      </div>

      <div className="flex gap-2 px-4 pb-4">
        <button
          className="rounded-lg px-4 py-2 text-sm font-semibold text-white"
          style={{ background: '#4e5058', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          ← Previous
        </button>
        <button
          className="rounded-lg px-4 py-2 text-sm font-semibold text-white"
          style={{ background: '#5865f2', border: '1px solid rgba(88,101,242,0.5)' }}
        >
          Next →
        </button>
      </div>
    </DiscordMessage>
  );
}

const LEAGUES_TICKER = [
  { name: 'LEC', src: '/logos/lec.webp', active: true },
  { name: 'LCK', src: '/logos/lck.webp', active: true },
  { name: 'LPL', src: '/logos/lpl.png', active: false },
  { name: 'LFL', src: '/logos/lfl.webp', active: false },
  { name: 'MSI', src: '/logos/msi.webp', active: false },
  { name: 'Worlds', src: '/logos/worlds.png', active: false },
  { name: 'EMEA Masters', src: '/logos/emea_masters.webp', active: false },
  { name: 'First Stand', src: '/logos/first_stand.webp', active: false },
];

function Ticker({
  items,
  reverse = false,
  speed = '32s',
}: {
  items: { name: string; src: string; active: boolean }[];
  reverse?: boolean;
  speed?: string;
}) {
  const doubled = [...items, ...items];
  return (
    <div
      className="relative overflow-hidden py-1"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
    >
      <div
        className="flex gap-6 whitespace-nowrap"
        style={{
          animation: `marquee${reverse ? '-reverse' : ''} ${speed} linear infinite`,
        }}
      >
        {doubled.map((l, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-2.5"
            style={{ opacity: l.active ? 1 : 0.25 }}
          >
            <div
              className="flex h-8 w-8 items-center justify-center rounded-xl"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <Image src={l.src} alt={l.name} width={20} height={20} className="object-contain" />
            </div>
            <span
              className="text-sm font-medium"
              style={{ color: l.active ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)' }}
            >
              {l.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({
  value,
  label,
  sublabel,
  color = '#5aa9ff',
}: {
  value: string;
  label: string;
  sublabel?: string;
  color?: string;
}) {
  return (
    <div
      className="flex flex-col gap-1 rounded-2xl p-6"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <span className="text-4xl font-black tracking-tight" style={{ color }}>
        {value}
      </span>
      <span className="text-sm font-semibold text-white">{label}</span>
      {sublabel && (
        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
          {sublabel}
        </span>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen text-white" style={{ background: '#0a0f1e' }}>
      {/* ── Nav ── */}
      <header
        className="fixed inset-x-0 top-0 z-50 backdrop-blur-md"
        style={{
          borderBottom: '1px solid rgba(90,169,255,0.1)',
          background: 'rgba(10,15,30,0.85)',
        }}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5 text-lg font-bold">
            <img alt="banana" src="android-chrome-192x192.png" className="h-6 w-6" />
            <span className="tracking-tight text-white">Bananalyz</span>
          </Link>
          <nav className="items-center gap-3 text-sm md:flex">
            <Link
              href="/docs"
              className="px-3 py-2 transition-colors"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              Docs
            </Link>

            {/* Top.gg — pill bouton jaune */}
            <Link
              href={TOPGG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-topgg flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold"
            >
              <TopGgIcon size={16} />
              Vote on Top.gg
            </Link>

            {/* Add to Discord — bouton premium */}
            <Link
              href={INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-discord flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold"
            >
              <DiscordIcon size={16} />
              Add to Discord
            </Link>
          </nav>

          {/* Mobile CTA */}
          <Link
            href={INVITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-discord flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-bold md:hidden"
          >
            <DiscordIcon size={14} />
            Add bot
          </Link>
        </div>
      </header>

      <main>
        {/* ── Hero (simplified) ── */}
        <section className="relative overflow-hidden px-6 pt-40 pb-16">
          {/* Glow */}
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div
              className="absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full blur-[120px]"
              style={{ background: 'rgba(47,107,255,0.12)' }}
            />
          </div>

          <div className="relative mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="mb-8 flex justify-center">
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium"
                style={{
                  background: 'rgba(90,169,255,0.08)',
                  border: '1px solid rgba(90,169,255,0.2)',
                  color: '#5aa9ff',
                }}
              >
                <Star size={13} />
                LoL esports predictions for Discord
              </div>
            </div>

            {/* Headline */}
            <h1 className="mb-5 text-5xl leading-[1.05] font-black tracking-tight sm:text-6xl md:text-7xl">
              <span style={{ color: 'rgba(255,255,255,0.95)' }}>Predict. </span>
              <span
                style={{
                  background: 'linear-gradient(135deg, #ffd43b 0%, #fb923c 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Compete.
              </span>
              <br />
              <span style={{ color: 'rgba(255,255,255,0.95)' }}>Dominate.</span>
            </h1>

            {/* Subline */}
            <p
              className="mx-auto mb-8 max-w-xl text-lg leading-relaxed md:text-xl"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              Bring League of Legends esports predictions into your Discord server. Pick winners,
              score points, climb the leaderboard.
            </p>

            {/* CTAs */}
            <div className="mb-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl px-7 py-3.5 text-base font-bold transition-all hover:brightness-110"
                style={{ background: '#5aa9ff', color: '#0a0f1e' }}
              >
                Add to Discord <ChevronRight size={16} />
              </Link>
              <Link
                href={TOPGG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl px-7 py-3.5 text-base font-semibold transition-all hover:brightness-110"
                style={{
                  background: 'rgba(255,196,0,0.1)',
                  border: '1px solid rgba(255,196,0,0.3)',
                  color: '#ffc400',
                }}
              >
                <TopGgIcon size={20} />
                Vote on Top.gg
              </Link>
              <Link
                href="/docs"
                className="flex items-center gap-2 rounded-xl px-7 py-3.5 text-base font-medium"
                style={{
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.55)',
                }}
              >
                Read the docs
              </Link>
            </div>

            {/* Social proof */}
            <div
              className="mb-16 flex items-center justify-center gap-6 text-sm"
              style={{ color: 'rgba(255,255,255,0.25)' }}
            >
              <div className="flex items-center gap-1.5">
                <Zap size={12} /> Free to use
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={12} /> Setup in 1 minute
              </div>
            </div>

            {/* Single hero embed */}
            <div className="relative mx-auto max-w-md">
              <div
                className="absolute -inset-6 rounded-3xl blur-3xl"
                style={{ background: 'rgba(79,150,255,0.1)' }}
              />
              <div className="relative">
                <MatchEmbed />
              </div>
            </div>
          </div>
        </section>

        {/* ── Tickers ── */}
        <section className="px-6 py-10" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="mx-auto max-w-6xl">
            <p
              className="mb-5 text-center text-[11px] font-bold tracking-widest uppercase"
              style={{ color: 'rgba(255,255,255,0.2)' }}
            >
              Supported leagues
            </p>
            <Ticker items={LEAGUES_TICKER} speed="30s" />
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="px-6 py-28" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <p
                className="mb-3 text-xs font-bold tracking-widest uppercase"
                style={{ color: '#5aa9ff' }}
              >
                Setup
              </p>
              <h2 className="mb-3 text-4xl font-black tracking-tight">How it works</h2>
              <p style={{ color: 'rgba(255,255,255,0.4)' }}>
                Three steps and your server is predicting.
              </p>
            </div>
            <div className="relative grid gap-6 md:grid-cols-3">
              <div
                className="absolute top-10 right-1/3 left-1/3 hidden h-px md:block"
                style={{
                  background: 'linear-gradient(90deg, rgba(90,169,255,0.3), rgba(90,169,255,0.1))',
                }}
              />
              {[
                {
                  step: '01',
                  title: 'Add the bot',
                  desc: 'Invite Bananalyz to your Discord server in one click. No account needed.',
                  color: '#5aa9ff',
                },
                {
                  step: '02',
                  title: 'Configure a channel',
                  desc: 'Use /config to set your prediction channel. Matches post automatically.',
                  color: '#fbbf24',
                },
                {
                  step: '03',
                  title: 'Pick & compete',
                  desc: 'Your members vote on match outcomes and race for the leaderboard.',
                  color: '#4ade80',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="relative rounded-2xl p-6"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <div
                    className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl text-sm font-black"
                    style={{
                      background: `${item.color}18`,
                      color: item.color,
                      border: `1px solid ${item.color}30`,
                    }}
                  >
                    {item.step}
                  </div>
                  <h3 className="mb-2 font-bold text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── /predictions showcase ── */}
        <section className="px-6 py-28" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="mx-auto max-w-6xl">
            <div className="grid items-center gap-20 md:grid-cols-2">
              <div className="order-2 flex justify-center md:order-1 md:justify-start">
                <div className="relative w-full max-w-[460px]">
                  <div
                    className="absolute -inset-6 rounded-3xl blur-3xl"
                    style={{ background: 'rgba(251,191,36,0.07)' }}
                  />
                  <div className="relative">
                    <PredictionsEmbed />
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div
                  className="mb-5 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold tracking-wide"
                  style={{
                    background: 'rgba(251,191,36,0.1)',
                    border: '1px solid rgba(251,191,36,0.2)',
                    color: '#fbbf24',
                  }}
                >
                  <BarChart3 size={11} /> /predictions
                </div>
                <h2 className="mb-4 text-4xl font-black tracking-tight">
                  Your full history,
                  <br />
                  <span style={{ color: '#fbbf24' }}>at a glance</span>
                </h2>
                <p className="mb-7 leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  See your recent results, upcoming picks, win rate, and total bananas — all in one
                  embed inside Discord. No external app, no account.
                </p>
                <ul className="space-y-3">
                  {[
                    'Win/loss breakdown per match with scores',
                    'Upcoming predictions you can still edit',
                    'Perfect score counter ✨',
                    'Real-time accuracy rate',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm">
                      <span
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                        style={{
                          background: 'rgba(74,222,128,0.12)',
                          border: '1px solid rgba(74,222,128,0.2)',
                        }}
                      >
                        <Check size={11} style={{ color: '#4ade80' }} />
                      </span>
                      <span style={{ color: 'rgba(255,255,255,0.55)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Leaderboard showcase ── */}
        <section className="px-6 py-28" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="mx-auto max-w-6xl">
            <div className="grid items-center gap-20 md:grid-cols-2">
              <div>
                <div
                  className="mb-5 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold tracking-wide"
                  style={{
                    background: 'rgba(90,169,255,0.1)',
                    border: '1px solid rgba(90,169,255,0.2)',
                    color: '#5aa9ff',
                  }}
                >
                  <Trophy size={11} /> /leaderboard
                </div>
                <h2 className="mb-4 text-4xl font-black tracking-tight">
                  Two leaderboards,
                  <br />
                  <span style={{ color: '#5aa9ff' }}>one command</span>
                </h2>
                <p className="mb-7 leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  Compete within your server or go head-to-head against predictors from every
                  community. Both leaderboards update automatically after each scored match.
                </p>

                {/* Server vs Global pills */}
                <div className="mb-7 flex gap-3">
                  <div
                    className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold"
                    style={{
                      background: 'rgba(90,169,255,0.08)',
                      border: '1px solid rgba(90,169,255,0.2)',
                      color: '#5aa9ff',
                    }}
                  >
                    <Server size={14} />
                    Server leaderboard
                  </div>
                  <div
                    className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold"
                    style={{
                      background: 'rgba(196,132,252,0.08)',
                      border: '1px solid rgba(196,132,252,0.2)',
                      color: '#c084fc',
                    }}
                  >
                    <Globe size={14} />
                    Global leaderboard
                  </div>
                </div>

                <ul className="space-y-3">
                  {[
                    'Server ranking — compete with your community',
                    'Global ranking — climb across all servers',
                    'Banana points, accuracy & perfect score columns',
                    'Paginated — up to 100 players per page',
                    'Updated automatically after each match',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm">
                      <span
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                        style={{
                          background: 'rgba(74,222,128,0.12)',
                          border: '1px solid rgba(74,222,128,0.2)',
                        }}
                      >
                        <Check size={11} style={{ color: '#4ade80' }} />
                      </span>
                      <span style={{ color: 'rgba(255,255,255,0.55)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-center md:justify-end">
                <div className="relative w-full max-w-[460px]">
                  <div
                    className="absolute -inset-6 rounded-3xl blur-3xl"
                    style={{ background: 'rgba(90,169,255,0.07)' }}
                  />
                  <div className="relative">
                    <LeaderboardEmbed />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Features grid ── */}
        <section className="px-6 py-28" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <p
                className="mb-3 text-xs font-bold tracking-widest uppercase"
                style={{ color: '#5aa9ff' }}
              >
                Features
              </p>
              <h2 className="mb-3 text-4xl font-black tracking-tight">Everything you need</h2>
              <p style={{ color: 'rgba(255,255,255,0.4)' }}>
                A fully automated prediction system that runs in the background.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="group rounded-2xl p-6"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <div
                    className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{ background: `${f.color}12`, border: `1px solid ${f.color}20` }}
                  >
                    <f.icon size={20} style={{ color: f.color }} />
                  </div>
                  <h3 className="mb-2 font-bold text-white">{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {f.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Commands ── */}
        <section className="px-6 py-28" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="mx-auto max-w-6xl">
            <div className="grid items-center gap-20 md:grid-cols-2">
              <div>
                <p
                  className="mb-4 text-xs font-bold tracking-widest uppercase"
                  style={{ color: '#5aa9ff' }}
                >
                  Commands
                </p>
                <h2 className="mb-4 text-4xl font-black tracking-tight">
                  Simple commands,
                  <br />
                  powerful results
                </h2>
                <p className="mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  Every interaction happens through slash commands. No external accounts, no setup
                  friction for your members.
                </p>
                <Link
                  href="/docs/commands"
                  className="inline-flex items-center gap-2 font-semibold transition-all hover:gap-3"
                  style={{ color: '#5aa9ff' }}
                >
                  See all commands <ChevronRight size={15} />
                </Link>
              </div>
              <div className="space-y-2.5">
                {commands.map((cmd) => (
                  <div
                    key={cmd.name}
                    className="flex items-center gap-4 rounded-2xl p-4"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    <code
                      className="shrink-0 rounded-lg px-2 py-1 font-mono text-sm font-bold"
                      style={{ background: `${cmd.color}12`, color: cmd.color }}
                    >
                      {cmd.name}
                    </code>
                    <span className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      {cmd.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Scoring ── */}
        <section className="px-6 py-28" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <div className="mb-14 text-center">
              <p
                className="mb-3 text-xs font-bold tracking-widest uppercase"
                style={{ color: '#5aa9ff' }}
              >
                Scoring
              </p>
              <h2 className="mb-3 text-4xl font-black tracking-tight">How scoring works</h2>
              <p style={{ color: 'rgba(255,255,255,0.4)' }}>
                Every correct prediction earns bananas 🍌 — nail the exact score for a bonus.
              </p>
            </div>

            {/* Cards — always 3 columns side by side */}
            <div className="mb-6 grid grid-cols-3 gap-4">
              {/* Correct winner */}
              <div
                className="flex flex-col gap-3 rounded-2xl p-6"
                style={{
                  background: 'rgba(90,169,255,0.04)',
                  border: '1px solid rgba(90,169,255,0.12)',
                }}
              >
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-lg"
                  style={{
                    background: 'rgba(90,169,255,0.1)',
                    border: '1px solid rgba(90,169,255,0.2)',
                  }}
                >
                  🎯
                </div>
                <div>
                  <div
                    className="mb-1 text-4xl font-black tracking-tight"
                    style={{ color: '#5aa9ff' }}
                  >
                    +3
                  </div>
                  <div className="mb-1 text-sm font-bold text-white">Correct winner</div>
                  <div
                    className="text-xs leading-relaxed"
                    style={{ color: 'rgba(255,255,255,0.35)' }}
                  >
                    You picked the right team — regardless of the final score.
                  </div>
                </div>
                {/* mini progress bar */}
                <div className="mt-auto pt-2">
                  <div
                    className="mb-1 flex justify-between text-[10px]"
                    style={{ color: 'rgba(255,255,255,0.25)' }}
                  >
                    <span>base reward</span>
                    <span>3 / 5</span>
                  </div>
                  <div
                    className="h-1 overflow-hidden rounded-full"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{ width: '60%', background: '#5aa9ff' }}
                    />
                  </div>
                </div>
              </div>

              {/* Exact score */}
              <div
                className="flex flex-col gap-3 rounded-2xl p-6"
                style={{
                  background: 'rgba(90,169,255,0.04)',
                  border: '1px solid rgba(90,169,255,0.12)',
                }}
              >
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-lg"
                  style={{
                    background: 'rgba(90,169,255,0.1)',
                    border: '1px solid rgba(90,169,255,0.2)',
                  }}
                >
                  📊
                </div>
                <div>
                  <div
                    className="mb-1 text-4xl font-black tracking-tight"
                    style={{ color: '#5aa9ff' }}
                  >
                    +2
                  </div>
                  <div className="mb-1 text-sm font-bold text-white">Exact score</div>
                  <div
                    className="text-xs leading-relaxed"
                    style={{ color: 'rgba(255,255,255,0.35)' }}
                  >
                    You also predicted the exact series score (e.g. 3-1).
                  </div>
                </div>
                <div className="mt-auto pt-2">
                  <div
                    className="mb-1 flex justify-between text-[10px]"
                    style={{ color: 'rgba(255,255,255,0.25)' }}
                  >
                    <span>bonus</span>
                    <span>2 / 5</span>
                  </div>
                  <div
                    className="h-1 overflow-hidden rounded-full"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{ width: '40%', background: '#5aa9ff' }}
                    />
                  </div>
                </div>
              </div>

              {/* Perfect — featured card */}
              <div
                className="relative flex flex-col gap-3 overflow-hidden rounded-2xl p-6"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(255,212,59,0.07) 0%, rgba(251,146,36,0.05) 100%)',
                  border: '1px solid rgba(255,212,59,0.22)',
                }}
              >
                {/* ambient glow */}
                <div
                  className="pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full blur-3xl"
                  style={{ background: 'rgba(255,212,59,0.12)' }}
                />

                <div className="relative flex items-center justify-between">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl text-lg"
                    style={{
                      background: 'rgba(255,212,59,0.12)',
                      border: '1px solid rgba(255,212,59,0.25)',
                    }}
                  >
                    ✨
                  </div>
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase"
                    style={{
                      background: 'rgba(255,212,59,0.12)',
                      color: '#ffd43b',
                      border: '1px solid rgba(255,212,59,0.2)',
                    }}
                  >
                    Max
                  </span>
                </div>

                <div className="relative">
                  <div
                    className="mb-1 text-4xl font-black tracking-tight"
                    style={{ color: '#ffd43b' }}
                  >
                    +5
                  </div>
                  <div className="mb-1 text-sm font-bold text-white">Perfect prediction</div>
                  <div
                    className="text-xs leading-relaxed"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                  >
                    Right winner <span style={{ color: 'rgba(255,255,255,0.2)' }}>+</span> exact
                    score — maximum reward.
                  </div>
                </div>

                <div className="relative mt-auto pt-2">
                  <div
                    className="mb-1 flex justify-between text-[10px]"
                    style={{ color: 'rgba(255,212,59,0.4)' }}
                  >
                    <span>full reward</span>
                    <span>5 / 5</span>
                  </div>
                  <div
                    className="h-1 overflow-hidden rounded-full"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: '100%',
                        background: 'linear-gradient(90deg, #ffd43b, #fb923c)',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom note */}
            <div
              className="flex items-start gap-3 rounded-xl px-5 py-4"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <span className="mt-0.5 shrink-0 text-base">🍌</span>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Points are awarded automatically once the match result is confirmed. You can update
                your prediction at any time{' '}
                <span style={{ color: 'rgba(255,255,255,0.6)' }}>until the match starts</span>.
              </p>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          className="relative overflow-hidden px-6 py-36"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div
              className="absolute top-1/2 left-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
              style={{ background: 'rgba(90,169,255,0.08)' }}
            />
          </div>
          <div className="relative mx-auto max-w-2xl text-center">
            <div className="mb-6 text-7xl">🍌</div>
            <h2 className="mb-4 text-4xl font-black tracking-tight md:text-5xl">
              Ready to predict?
            </h2>
            <p className="mb-8 text-lg" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Add Bananalyz to your server in 30 seconds and start your first prediction.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-lg font-bold transition-all hover:scale-[1.02] hover:brightness-110"
                style={{ background: '#5aa9ff', color: '#0a0f1e' }}
              >
                Add to Discord <ChevronRight size={18} />
              </Link>
              <Link
                href={TOPGG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-lg font-bold transition-all hover:scale-[1.02] hover:brightness-110"
                style={{
                  background: 'rgba(255,196,0,0.1)',
                  border: '1px solid rgba(255,196,0,0.3)',
                  color: '#ffc400',
                }}
              >
                <TopGgIcon size={22} />
                Vote on Top.gg
              </Link>
            </div>
            <p className="mt-5 text-sm" style={{ color: 'rgba(255,255,255,0.2)' }}>
              Free to use · Help us grow by voting 🙏
            </p>
          </div>
        </section>
      </main>

      <footer className="px-6 py-10" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div
          className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm sm:flex-row"
          style={{ color: 'rgba(255,255,255,0.2)' }}
        >
          <div className="flex items-center gap-2">
            <span className="font-semibold">Bananalyz</span>
            <span> — Made with 🍌 by Jungle Squad</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/docs" className="transition-colors hover:text-white/50">
              Docs
            </Link>
            <Link
              href={TOPGG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white/50"
            >
              Top.gg
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white/50">
              Terms
            </Link>
            <Link href="/privacy" className="transition-colors hover:text-white/50">
              Privacy
            </Link>
            <Link
              href="https://x.com/wonezer"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white/50"
            >
              Twitter
            </Link>
            <Link
              href="https://github.com/wonecode"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white/50"
            >
              GitHub
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
