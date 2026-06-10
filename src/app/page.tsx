import Link from 'next/link';
import Image from 'next/image';
import {
  Zap,
  Trophy,
  BarChart3,
  Shield,
  ChevronRight,
  Star,
  Clock,
  Users,
  Check,
  RefreshCw,
} from 'lucide-react';

const INVITE_URL =
  'https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=139586750592&scope=bot+applications.commands';

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
  'G2 Esports': '/logos/g2.png',
  'Karmine Corp': '/logos/kc.png',
  'Fnatic': '/logos/fnc.png',
  'Team Vitality': '/logos/vit.png',
  'Team Heretics': '/logos/th.png',
  'Movistar KOI': '/logos/mkoi.png',
  'SK Gaming': '/logos/sk.png',
  'Giants': '/logos/gx.png',
  'NAVI': '/logos/navi.png',
  'Shopify Rebellion': '/logos/shft.png',
};

const LEAGUE_LOGOS: Record<string, string> = {
  'LEC': '/logos/lec.png',
  'LCK': '/logos/lck.png',
  'LPL': '/logos/lpl.png',
  'LFL': '/logos/lfl.png',
  'MSI': '/logos/msi.png',
  'Worlds': '/logos/worlds.png',
  'EMEA Masters': '/logos/emea_masters.png',
  'First Stand': '/logos/first_stand.png',
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
      className="object-contain shrink-0"
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
      className="object-contain shrink-0"
      style={{ width: size, height: size }}
    />
  );
}

// ─────────────────────────────────────────
function DiscordMessage({
  time,
  children,
}: {
  time: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="w-full rounded-2xl overflow-hidden select-none"
      style={{
        background: '#313338',
        boxShadow: '0 16px 48px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)',
      }}
    >
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-lg shrink-0"
          style={{ background: 'linear-gradient(135deg, #1e2847 0%, #111827 100%)' }}
        >
          🍌
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-white text-sm">Bananalyz</span>
          <span
            className="text-[10px] px-1.5 py-0.5 rounded font-bold tracking-wide"
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
        className="mx-4 rounded-lg overflow-hidden"
        style={{
          background: '#2b2d31',
          borderLeft: '4px solid #4f96ff',
        }}
      >
        <div className="px-4 pt-3 pb-2 flex items-center gap-2">
          <div
            className="flex items-center gap-1.5 px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(79,150,255,0.12)', border: '1px solid rgba(79,150,255,0.25)' }}
          >
            <LeagueLogo name="LEC" size={12} />
            <span className="text-[11px] font-bold tracking-wide" style={{ color: '#4f96ff' }}>
              LEC
            </span>
          </div>
          <span
            className="text-[10px] px-1.5 py-0.5 rounded"
            style={{ background: '#383a40', color: '#80848e' }}
          >
            BO5 · Play-offs
          </span>
        </div>

        <div className="px-4 pb-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.05)' }}
              >
                <TeamLogo name="G2 Esports" size={22} />
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-none">G2 Esports</p>
                <p className="text-[11px] mt-0.5" style={{ color: '#80848e' }}>63% predicted</p>
              </div>
            </div>
            <div
              className="px-3 py-1 rounded-lg text-xs font-black"
              style={{ background: '#383a40', color: '#80848e', letterSpacing: '0.05em' }}
            >
              VS
            </div>
            <div className="flex items-center gap-2 flex-row-reverse">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.05)' }}
              >
                <TeamLogo name="Karmine Corp" size={22} />
              </div>
              <div className="text-right">
                <p className="text-white font-bold text-sm leading-none">Karmine Corp</p>
                <p className="text-[11px] mt-0.5" style={{ color: '#80848e' }}>37% predicted</p>
              </div>
            </div>
          </div>

          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#383a40' }}>
            <div
              className="h-full rounded-full"
              style={{
                width: '63%',
                background: 'linear-gradient(90deg, #4f96ff 0%, #818cf8 100%)',
              }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px] font-semibold" style={{ color: '#4f96ff' }}>9 picks</span>
            <span className="text-[10px] font-semibold" style={{ color: '#80848e' }}>5 picks</span>
          </div>
        </div>

        <div className="px-4 pb-3 flex items-center gap-4 text-xs">
          <div
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg"
            style={{ background: '#383a40' }}
          >
            <Clock size={10} style={{ color: '#80848e' }} />
            <span className="text-white">in 2 hours</span>
          </div>
          <div
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg"
            style={{ background: '#383a40' }}
          >
            <Users size={10} style={{ color: '#80848e' }} />
            <span className="text-white">14 predictions</span>
          </div>
        </div>

        <div className="px-4 pb-3">
          <p className="text-[11px] mb-1" style={{ color: '#80848e' }}>Predictors in this server</p>
          <p className="text-xs" style={{ color: '#4f96ff' }}>
            @Bonobo Éolien, @Macaque Gambler 🎲, @Singe Agressif, @Bonobo soyeux
          </p>
        </div>

        <div className="px-4 pb-3">
          <p className="text-[11px]" style={{ color: '#4e5058' }}>
            You can update your prediction until the match starts.
          </p>
        </div>
      </div>

      <div className="px-4 py-3 space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ color: '#4e5058' }}>Pick your winner &amp; score</p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'G2 3-0', team: 'G2 Esports' },
            { label: 'G2 3-1', team: 'G2 Esports' },
            { label: 'G2 3-2', team: 'G2 Esports' },
          ].map((s) => (
            <button
              key={s.label}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-semibold text-white transition-all"
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
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-semibold text-white"
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
        className="mx-4 mb-4 rounded-lg overflow-hidden"
        style={{ background: '#2b2d31', borderLeft: '4px solid #fbbf24' }}
      >
        <div className="px-4 pt-3 pb-2 flex items-center gap-2">
          <p className="text-sm font-bold text-white">🍌 My predictions</p>
          <span
            className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
            style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.3)' }}
          >
            Bonobo Éolien
          </span>
        </div>

        <div
          className="mx-4 mb-3 p-3 rounded-xl grid grid-cols-4 gap-2"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="text-center">
            <p className="text-lg font-black text-white">177</p>
            <p className="text-[10px]" style={{ color: '#80848e' }}>🍌 pts</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-black" style={{ color: '#4ade80' }}>84%</p>
            <p className="text-[10px]" style={{ color: '#80848e' }}>Win rate</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-black text-white">49W</p>
            <p className="text-[10px]" style={{ color: '#80848e' }}>Wins</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-black" style={{ color: '#fbbf24' }}>15✨</p>
            <p className="text-[10px]" style={{ color: '#80848e' }}>Perfects</p>
          </div>
        </div>

        <div className="px-4 pb-3">
          <p className="text-xs font-semibold text-white mb-2 flex items-center gap-1.5">
            <span style={{ color: '#80848e' }}>📋</span> Recent results
          </p>
          <div className="space-y-2">
            {recentResults.map((r, i) => (
              <div
                key={i}
                className="p-2.5 rounded-lg"
                style={{
                  background: r.won ? 'rgba(74,222,128,0.05)' : 'rgba(248,113,113,0.05)',
                  border: `1px solid ${r.won ? 'rgba(74,222,128,0.15)' : 'rgba(248,113,113,0.12)'}`,
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 text-xs">
                    <LeagueLogo name={r.league} size={11} />
                    <span className="flex items-center gap-1 text-white font-medium">
                      <TeamLogo name={r.team1} size={11} /> {r.team1}
                    </span>
                    <span style={{ color: '#4e5058' }}>vs</span>
                    <span className="flex items-center gap-1 text-white font-medium">
                      <TeamLogo name={r.team2} size={11} /> {r.team2}
                    </span>
                  </div>
                  <span
                    className="text-xs font-bold px-1.5 py-0.5 rounded"
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
                    Result:{' '}
                    <span className="text-white font-medium">{r.result}</span>{' '}
                    <span
                      className="px-1 py-0.5 rounded text-[10px]"
                      style={{ background: '#383a40', color: '#d1d5db' }}
                    >
                      {r.resultScore}
                    </span>
                  </span>
                  <span style={{ color: '#383a40' }}>·</span>
                  <span>
                    Pick:{' '}
                    <span className="text-white font-medium">{r.pick}</span>{' '}
                    <span
                      className="px-1 py-0.5 rounded text-[10px]"
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
          <p className="text-xs font-semibold text-white mb-2 flex items-center gap-1.5">
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
                className="p-2.5 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div className="flex items-center gap-1.5 text-xs text-white font-medium mb-1">
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
                      className="px-1.5 py-0.5 rounded text-[10px] text-white"
                      style={{ background: '#383a40' }}
                    >
                      {u.score}
                    </span>
                  </span>
                  <span
                    className="ml-auto px-1.5 py-0.5 rounded text-[10px]"
                    style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24' }}
                  >
                    {u.starts}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[11px] mt-3" style={{ color: '#4e5058' }}>
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
    { rank: 7, name: 'Macaque Gambler 🎲', pts: 173, acc: '73%', perfect: '45%' },
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
        className="mx-4 mb-4 rounded-lg overflow-hidden"
        style={{ background: '#2b2d31', borderLeft: '4px solid #4f96ff' }}
      >
        <div className="px-4 pt-3 pb-3 flex items-start justify-between">
          <div>
            <p className="text-sm font-bold text-white">🍌 Server leaderboard</p>
            <p className="text-xs mt-0.5" style={{ color: '#80848e' }}>Jungle Squad · Page 1/3</p>
          </div>
          <div className="text-right">
            <p className="text-[10px]" style={{ color: '#80848e' }}>Last scored match</p>
            <span
              className="text-[11px] px-2 py-0.5 rounded text-white inline-block mt-0.5"
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

        <div className="px-4 pb-1 space-y-1">
          {players.map((p) => {
            const rs = rankStyle[p.rank];
            return (
              <div
                key={p.rank}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs"
                style={{
                  background: rs ? rs.bg : p.rank === 6 ? 'rgba(79,150,255,0.08)' : 'transparent',
                  border: p.rank === 6 ? '1px solid rgba(79,150,255,0.2)' : '1px solid transparent',
                }}
              >
                <span
                  className="w-5 text-center font-bold shrink-0 text-[11px]"
                  style={{ color: rs ? rs.color : '#4e5058' }}
                >
                  {rs ? rs.label : p.rank}
                </span>
                <span
                  className="font-medium flex-1 truncate text-[12px]"
                  style={{ color: p.rank === 6 ? '#93c5fd' : '#d1d5db' }}
                >
                  @{p.name}
                  {p.rank === 6 && (
                    <span
                      className="ml-1.5 text-[9px] px-1 py-0.5 rounded uppercase tracking-wider"
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

      <div className="px-4 pb-4 flex gap-2">
        <button
          className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
          style={{ background: '#4e5058', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          ← Previous
        </button>
        <button
          className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
          style={{ background: '#5865f2', border: '1px solid rgba(88,101,242,0.5)' }}
        >
          Next →
        </button>
      </div>
    </DiscordMessage>
  );
}

const LEAGUES_TICKER = [
  { name: 'LEC', src: '/logos/lec.png', active: true },
  { name: 'LCK', src: '/logos/lck.png', active: true },
  { name: 'LPL', src: '/logos/lpl.png', active: false },
  { name: 'LFL', src: '/logos/lfl.png', active: false },
  { name: 'MSI', src: '/logos/msi.png', active: false },
  { name: 'Worlds', src: '/logos/worlds.png', active: false },
  { name: 'EMEA Masters', src: '/logos/emea_masters.png', active: false },
  { name: 'First Stand', src: '/logos/first_stand.png', active: false },
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
        maskImage:
          'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
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
            className="flex items-center gap-2.5 shrink-0"
            style={{ opacity: l.active ? 1 : 0.25 }}
          >
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <Image src={l.src} alt={l.name} width={20} height={20} className="object-contain" />
            </div>
            <span className="text-sm font-medium" style={{ color: l.active ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)' }}>
              {l.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({ value, label, sublabel, color = '#5aa9ff' }: { value: string; label: string; sublabel?: string; color?: string }) {
  return (
    <div
      className="p-6 rounded-2xl flex flex-col gap-1"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <span className="text-4xl font-black tracking-tight" style={{ color }}>
        {value}
      </span>
      <span className="text-sm font-semibold text-white">{label}</span>
      {sublabel && <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{sublabel}</span>}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen text-white" style={{ background: '#0a0f1e' }}>
      {/* ── Nav ── */}
      <header
        className="fixed top-0 inset-x-0 z-50 backdrop-blur-md"
        style={{
          borderBottom: '1px solid rgba(90,169,255,0.1)',
          background: 'rgba(10,15,30,0.85)',
        }}
      >
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-lg">
            <span className="text-2xl">🍌</span>
            <span className="text-white tracking-tight">Bananalyz</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <Link href="/docs" className="transition-colors" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Docs
            </Link>
            <Link
              href="https://discord.gg/bananalyz"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              Community
            </Link>
            <Link
              href={INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg font-semibold transition-all hover:brightness-110"
              style={{ background: '#5aa9ff', color: '#0a0f1e' }}
            >
              Add to Discord
            </Link>
          </nav>
          <Link
            href={INVITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden px-3 py-1.5 rounded-lg text-sm font-semibold"
            style={{ background: '#5aa9ff', color: '#0a0f1e' }}
          >
            Add bot
          </Link>
        </div>
      </header>

      <main>
        {/* ── Hero (simplified) ── */}
        <section className="pt-40 pb-16 px-6 relative overflow-hidden">
          {/* Glow */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[120px]"
              style={{ background: 'rgba(47,107,255,0.12)' }}
            />
          </div>

          <div className="relative mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="flex justify-center mb-8">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium"
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
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] mb-5">
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
              className="text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-8"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              Bring League of Legends esports predictions into your Discord server. Pick winners, score points, climb the leaderboard.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
              <Link
                href={INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-base transition-all hover:brightness-110"
                style={{ background: '#5aa9ff', color: '#0a0f1e' }}
              >
                Add to Discord <ChevronRight size={16} />
              </Link>
              <Link
                href="/docs"
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-medium text-base"
                style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.55)' }}
              >
                Read the docs
              </Link>
            </div>

            {/* Social proof */}
            <div
              className="flex items-center justify-center gap-6 mb-16 text-sm"
              style={{ color: 'rgba(255,255,255,0.25)' }}
            >
              <div className="flex items-center gap-1.5"><Users size={12} /> 20+ Discord servers</div>
              <span>·</span>
              <div className="flex items-center gap-1.5"><Zap size={12} /> Free to use</div>
              <span>·</span>
              <div className="flex items-center gap-1.5"><Clock size={12} /> Setup in 1 minute</div>
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
        <section
          className="py-10 px-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="mx-auto max-w-6xl">
            <p
              className="text-[11px] font-bold uppercase tracking-widest text-center mb-5"
              style={{ color: 'rgba(255,255,255,0.2)' }}
            >
              Supported leagues
            </p>
            <Ticker items={LEAGUES_TICKER} speed="30s" />
          </div>
        </section>

        {/* ── How it works ── */}
        <section
          className="py-28 px-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#5aa9ff' }}>
                Setup
              </p>
              <h2 className="text-4xl font-black tracking-tight mb-3">How it works</h2>
              <p style={{ color: 'rgba(255,255,255,0.4)' }}>Three steps and your server is predicting.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 relative">
              <div
                className="hidden md:block absolute top-10 left-1/3 right-1/3 h-px"
                style={{ background: 'linear-gradient(90deg, rgba(90,169,255,0.3), rgba(90,169,255,0.1))' }}
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
                  className="relative p-6 rounded-2xl"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm mb-4"
                    style={{ background: `${item.color}18`, color: item.color, border: `1px solid ${item.color}30` }}
                  >
                    {item.step}
                  </div>
                  <h3 className="font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── /predictions showcase ── */}
        <section
          className="py-28 px-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <div className="flex justify-center md:justify-start order-2 md:order-1">
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
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-5 uppercase tracking-wide"
                  style={{
                    background: 'rgba(251,191,36,0.1)',
                    border: '1px solid rgba(251,191,36,0.2)',
                    color: '#fbbf24',
                  }}
                >
                  <BarChart3 size={11} /> /predictions
                </div>
                <h2 className="text-4xl font-black tracking-tight mb-4">
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
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.2)' }}
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
        <section
          className="py-28 px-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <div>
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-5 uppercase tracking-wide"
                  style={{
                    background: 'rgba(90,169,255,0.1)',
                    border: '1px solid rgba(90,169,255,0.2)',
                    color: '#5aa9ff',
                  }}
                >
                  <Trophy size={11} /> /leaderboard
                </div>
                <h2 className="text-4xl font-black tracking-tight mb-4">
                  Compete with
                  <br />
                  <span style={{ color: '#5aa9ff' }}>your whole server</span>
                </h2>
                <p className="mb-7 leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  A per-server leaderboard updates after every scored match. See who&apos;s the sharpest
                  analyst in your community.
                </p>
                <ul className="space-y-3">
                  {[
                    'Paginated leaderboard — up to 100 players',
                    'Banana points, accuracy & perfect score columns',
                    'Updated automatically after each match',
                    'Global leaderboard across all servers',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm">
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.2)' }}
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
        <section
          className="py-28 px-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#5aa9ff' }}>Features</p>
              <h2 className="text-4xl font-black tracking-tight mb-3">Everything you need</h2>
              <p style={{ color: 'rgba(255,255,255,0.4)' }}>A fully automated prediction system that runs in the background.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="p-6 rounded-2xl group"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${f.color}12`, border: `1px solid ${f.color}20` }}
                  >
                    <f.icon size={20} style={{ color: f.color }} />
                  </div>
                  <h3 className="font-bold mb-2 text-white">{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {f.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Commands ── */}
        <section
          className="py-28 px-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#5aa9ff' }}>Commands</p>
                <h2 className="text-4xl font-black tracking-tight mb-4">
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
                    className="flex items-center gap-4 p-4 rounded-2xl"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    <code
                      className="font-mono text-sm font-bold shrink-0 px-2 py-1 rounded-lg"
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
        <section
          className="py-28 px-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#5aa9ff' }}>Scoring</p>
              <h2 className="text-4xl font-black tracking-tight mb-3">How scoring works</h2>
              <p style={{ color: 'rgba(255,255,255,0.4)' }}>Every prediction is worth up to 5 bananas 🍌</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div
                className="p-6 rounded-2xl text-center"
                style={{
                  background: 'rgba(90,169,255,0.05)',
                  border: '1px solid rgba(90,169,255,0.15)',
                }}
              >
                <div className="text-5xl font-black mb-2" style={{ color: '#5aa9ff' }}>+3</div>
                <div className="text-sm font-bold mb-1 text-white">Correct winner</div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Pick the right team</div>
              </div>
              <div
                className="p-6 rounded-2xl text-center"
                style={{
                  background: 'rgba(90,169,255,0.05)',
                  border: '1px solid rgba(90,169,255,0.15)',
                }}
              >
                <div className="text-5xl font-black mb-2" style={{ color: '#5aa9ff' }}>+2</div>
                <div className="text-sm font-bold mb-1 text-white">Exact score</div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Predict the exact series score</div>
              </div>
              <div
                className="p-6 rounded-2xl text-center relative overflow-hidden"
                style={{
                  background: 'rgba(255,212,59,0.06)',
                  border: '1px solid rgba(255,212,59,0.25)',
                }}
              >
                <div
                  className="absolute inset-0 blur-2xl"
                  style={{ background: 'rgba(255,212,59,0.05)' }}
                />
                <div className="relative">
                  <div className="text-5xl font-black mb-2" style={{ color: '#ffd43b' }}>✨5</div>
                  <div className="text-sm font-bold mb-1 text-white">Perfect</div>
                  <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Winner + exact score</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          className="py-36 px-6 relative overflow-hidden"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[100px]"
              style={{ background: 'rgba(90,169,255,0.08)' }}
            />
          </div>
          <div className="relative mx-auto max-w-2xl text-center">
            <div className="text-7xl mb-6">🍌</div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              Ready to predict?
            </h2>
            <p className="mb-8 text-lg" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Add Bananalyz to your server in 30 seconds and start your first prediction.
            </p>
            <Link
              href={INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:brightness-110 hover:scale-[1.02]"
              style={{ background: '#5aa9ff', color: '#0a0f1e' }}
            >
              Add to Discord <ChevronRight size={18} />
            </Link>
            <p className="mt-5 text-sm" style={{ color: 'rgba(255,255,255,0.2)' }}>Free · No account required</p>
          </div>
        </section>
      </main>

      <footer
        className="py-10 px-6"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div
          className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm"
          style={{ color: 'rgba(255,255,255,0.2)' }}
        >
          <div className="flex items-center gap-2">
            <span>🍌</span>
            <span>Bananalyz — Made with love by Jungle Squad</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/docs" className="hover:text-white/50 transition-colors">Docs</Link>
            <Link href="/terms" className="hover:text-white/50 transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-white/50 transition-colors">Privacy</Link>
            <Link href="https://x.com/wonezer" target="_blank" rel="noopener noreferrer" className="hover:text-white/50 transition-colors">Twitter</Link>
            <Link href="https://github.com/wonecode/banana-predi" target="_blank" rel="noopener noreferrer" className="hover:text-white/50 transition-colors">GitHub</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
