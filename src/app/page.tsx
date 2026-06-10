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
  X,
} from 'lucide-react';

const INVITE_URL =
  'https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=139586750592&scope=bot+applications.commands';

const features = [
  {
    icon: Zap,
    title: 'Instant predictions',
    description:
      'Predict match outcomes directly from Discord using interactive buttons — no external app needed.',
  },
  {
    icon: Trophy,
    title: 'Server leaderboards',
    description:
      'Compete with your friends on a per-server leaderboard or climb the global rankings.',
  },
  {
    icon: BarChart3,
    title: 'Detailed stats',
    description:
      'Track your win rate, perfect predictions, and total points with the /predictions command.',
  },
  {
    icon: Shield,
    title: 'Auto-sync',
    description:
      'Matches and scores are automatically synced every 5 minutes — no manual updates needed.',
  },
];

const commands = [
  { name: '/predictions', desc: 'View your stats and recent results' },
  { name: '/matches', desc: 'Browse upcoming prediction matches' },
  { name: '/leaderboard', desc: 'See server or global rankings' },
  { name: '/config', desc: 'Set up your prediction channel (admin)' },
];

// Team logos mapped to filenames uploaded in /public/logos/
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
  if (!src) return <span className="text-sm">⚔️</span>;
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
  if (!src) return <span className="text-xs">⚔️</span>;
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
// Embed: match prediction card
// ─────────────────────────────────────────
function MatchEmbed() {
  return (
    <div
      className="w-full max-w-[440px] rounded-xl overflow-hidden select-none"
      style={{ background: '#313338', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
    >
      {/* Bot header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0"
          style={{ background: '#1a1f2e' }}
        >
          🍌
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white text-sm">Bananalyz</span>
          <span
            className="text-[10px] px-1.5 py-0.5 rounded font-bold"
            style={{ background: '#5865f2', color: 'white' }}
          >
            APP
          </span>
          <span className="text-xs" style={{ color: '#80848e' }}>
            Today at 14:08
          </span>
        </div>
      </div>

      {/* Embed body */}
      <div
        className="mx-4 mb-4 rounded overflow-hidden"
        style={{
          background: '#2b2d31',
          borderLeft: '4px solid #4f96ff',
        }}
      >
        {/* League */}
        <div className="px-4 pt-3 pb-1 flex items-center gap-1.5">
          <LeagueLogo name="LEC" size={14} />
          <span className="text-xs font-semibold" style={{ color: '#80848e' }}>
            LEC
          </span>
        </div>

        {/* Match title */}
        <div className="px-4 pb-3">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-sm font-bold text-white flex items-center gap-1.5">
              <TeamLogo name="G2 Esports" size={18} />
              G2 Esports
            </span>
            <span className="text-xs" style={{ color: '#80848e' }}>
              vs
            </span>
            <span className="text-sm font-bold text-white flex items-center gap-1.5">
              <TeamLogo name="Karmine Corp" size={18} />
              Karmine Corp
            </span>
          </div>
          <p className="text-xs" style={{ color: '#80848e' }}>
            Predictions are now open.
          </p>
        </div>

        {/* Meta */}
        <div className="px-4 pb-3 grid grid-cols-3 gap-3 text-xs">
          <div>
            <div className="font-semibold text-white mb-0.5">Start time</div>
            <span
              className="px-2 py-0.5 rounded text-white text-[11px]"
              style={{ background: '#383a40' }}
            >
              in 2 hours
            </span>
          </div>
          <div>
            <div className="font-semibold text-white mb-0.5">Format</div>
            <span
              className="px-2 py-0.5 rounded text-white text-[11px]"
              style={{ background: '#383a40' }}
            >
              BO5
            </span>
          </div>
          <div>
            <div className="font-semibold text-white mb-0.5">League</div>
            <span className="flex items-center gap-1 text-[11px]" style={{ color: '#80848e' }}>
              <LeagueLogo name="LEC" size={11} /> LEC
            </span>
          </div>
        </div>

        {/* Predictions */}
        <div className="px-4 pb-3 grid grid-cols-2 gap-4 text-xs">
          <div>
            <div className="font-semibold text-white mb-1">Global predictions</div>
            <div className="space-y-0.5">
              <div>
                <span className="font-semibold text-white">G2 Esports</span>{' '}
                <span style={{ color: '#80848e' }}>— 63% (9)</span>
              </div>
              <div>
                <span className="font-semibold text-white">Karmine Corp</span>{' '}
                <span style={{ color: '#80848e' }}>— 37% (5)</span>
              </div>
            </div>
          </div>
          <div>
            <div className="font-semibold text-white mb-1">Server predictions</div>
            <div className="space-y-0.5">
              <div>
                <span className="font-semibold text-white">G2 Esports</span>{' '}
                <span style={{ color: '#80848e' }}>— 70% (7)</span>
              </div>
              <div>
                <span className="font-semibold text-white">Karmine Corp</span>{' '}
                <span style={{ color: '#80848e' }}>— 30% (3)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Participants */}
        <div className="px-4 pb-4">
          <div className="text-xs font-semibold text-white mb-1">Server participants</div>
          <p className="text-xs" style={{ color: '#4f96ff' }}>
            @Bonobo Éolien, @Macaque Gambler 🎲, @Singe Agressif, @Bonobo soyeux, @Singe Copium
          </p>
          <p className="text-xs mt-1.5" style={{ color: '#80848e' }}>
            You can update your prediction until the match starts.
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="px-4 pb-4 space-y-2">
        <div className="grid grid-cols-3 gap-2">
          {['G2 3-0', 'G2 3-1', 'G2 3-2'].map((s) => (
            <button
              key={s}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded text-xs font-semibold text-white"
              style={{ background: '#4e5058', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <TeamLogo name="G2 Esports" size={12} /> {s}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {['KC 3-0', 'KC 3-1', 'KC 3-2'].map((s) => (
            <button
              key={s}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded text-xs font-semibold text-white"
              style={{ background: '#4e5058', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <TeamLogo name="Karmine Corp" size={12} /> {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// Embed: /predictions command
// ─────────────────────────────────────────
function PredictionsEmbed() {
  const recentResults = [
    {
      league: 'LEC',
      team1: 'G2 Esports',
      team2: 'Karmine Corp',
      result: 'G2 Esports 3-2',
      pick: 'G2 Esports 3-0',
      pts: '+3',
      won: true,
    },
    {
      league: 'LCK',
      team1: 'KT Rolster',
      team2: 'Dplus KIA',
      result: 'KT Rolster 3-2',
      pick: 'Dplus KIA 1-3',
      pts: '+0',
      won: false,
    },
    {
      league: 'LEC',
      team1: 'Movistar KOI',
      team2: 'Karmine Corp',
      result: 'Karmine Corp 0-3',
      pick: 'Karmine Corp 1-3',
      pts: '+3',
      won: true,
    },
  ];

  return (
    <div
      className="w-full max-w-[460px] rounded-xl overflow-hidden select-none"
      style={{ background: '#313338', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
    >
      {/* Bot header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0"
          style={{ background: '#1a1f2e' }}
        >
          🍌
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white text-sm">Bananalyz</span>
          <span
            className="text-[10px] px-1.5 py-0.5 rounded font-bold"
            style={{ background: '#5865f2', color: 'white' }}
          >
            APP
          </span>
          <span className="text-xs" style={{ color: '#80848e' }}>
            Today at 14:51
          </span>
        </div>
      </div>

      <div
        className="mx-4 mb-4 rounded overflow-hidden"
        style={{ background: '#2b2d31', borderLeft: '4px solid #fbbf24' }}
      >
        {/* Title */}
        <div className="px-4 pt-3 pb-2">
          <p className="text-sm font-bold text-white">🍌 My predictions</p>
        </div>

        {/* Overall stats */}
        <div className="px-4 pb-3">
          <p className="text-xs font-semibold text-white mb-1">📈 Overall stats</p>
          <p className="text-xs" style={{ color: '#80848e' }}>
            🏆 <span className="text-white font-semibold">177 pts</span> · ✅ 49W / ❌ 9L ·{' '}
            📊 84% win rate · ✨ 15 perfects
          </p>
        </div>

        {/* Recent results */}
        <div className="px-4 pb-3">
          <p className="text-xs font-semibold text-white mb-2">📋 Recent results</p>
          <div className="space-y-3">
            {recentResults.map((r, i) => (
              <div key={i}>
                <div className="flex items-center gap-1.5 text-xs text-white font-medium mb-0.5">
                  <LeagueLogo name={r.league} size={11} />
                  <span className="flex items-center gap-1">
                    <TeamLogo name={r.team1} size={11} /> {r.team1}
                  </span>
                  <span style={{ color: '#80848e' }}>vs</span>
                  <span className="flex items-center gap-1">
                    <TeamLogo name={r.team2} size={11} /> {r.team2}
                  </span>
                  <span
                    className="ml-auto font-bold"
                    style={{ color: r.won ? '#4ade80' : '#f87171' }}
                  >
                    {r.won ? '🎯' : '❌'} {r.pts}
                  </span>
                </div>
                <div className="pl-1 text-[11px]" style={{ color: '#80848e' }}>
                  <span>Result: <span className="text-white">{r.result}</span></span>
                  <span className="mx-1">·</span>
                  <span>Your pick: <span className="text-white">{r.pick}</span></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming */}
        <div className="px-4 pb-4">
          <p className="text-xs font-semibold text-white mb-2">⏳ Upcoming predictions</p>
          <div className="space-y-2.5">
            <div className="text-xs">
              <div className="flex items-center gap-1.5 text-white font-medium mb-0.5">
                <LeagueLogo name="LCK" size={11} />
                <TeamLogo name="Fnatic" size={11} />
                <span>Hanwha Life Esports</span>
                <span style={{ color: '#80848e' }}>vs</span>
                <span className="flex items-center gap-1">
                  <span style={{ color: '#f87171', fontSize: 11 }}>⚔</span> T1
                </span>
              </div>
              <div className="pl-1" style={{ color: '#80848e' }}>
                Winner: <span className="text-white">T1</span> · Score:{' '}
                <span
                  className="px-1.5 py-0.5 rounded text-white"
                  style={{ background: '#383a40', fontSize: 10 }}
                >
                  1-3
                </span>{' '}
                · Starts:{' '}
                <span
                  className="px-1.5 py-0.5 rounded text-white"
                  style={{ background: '#383a40', fontSize: 10 }}
                >
                  dans 2 jours
                </span>
              </div>
            </div>
            <div className="text-xs">
              <div className="flex items-center gap-1.5 text-white font-medium mb-0.5">
                <LeagueLogo name="LCK" size={11} />
                <span>Gen.G</span>
                <span style={{ color: '#80848e' }}>vs</span>
                <span>KT Rolster</span>
              </div>
              <div className="pl-1" style={{ color: '#80848e' }}>
                Winner: <span className="text-white">Gen.G</span> · Score:{' '}
                <span
                  className="px-1.5 py-0.5 rounded text-white"
                  style={{ background: '#383a40', fontSize: 10 }}
                >
                  3-0
                </span>{' '}
                · Starts:{' '}
                <span
                  className="px-1.5 py-0.5 rounded text-white"
                  style={{ background: '#383a40', fontSize: 10 }}
                >
                  dans 3 jours
                </span>
              </div>
            </div>
          </div>
          <p className="text-[11px] mt-3" style={{ color: '#80848e' }}>
            You can update your predictions until each match starts.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// Embed: leaderboard
// ─────────────────────────────────────────
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

  const medalColor: Record<number, string> = {
    1: '#fbbf24',
    2: '#94a3b8',
    3: '#b45309',
  };

  return (
    <div
      className="w-full max-w-[420px] rounded-xl overflow-hidden select-none"
      style={{ background: '#313338', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
    >
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0"
          style={{ background: '#1a1f2e' }}
        >
          🍌
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white text-sm">Bananalyz</span>
          <span
            className="text-[10px] px-1.5 py-0.5 rounded font-bold"
            style={{ background: '#5865f2', color: 'white' }}
          >
            APP
          </span>
          <span className="text-xs" style={{ color: '#80848e' }}>
            Today at 15:24
          </span>
        </div>
      </div>

      <div
        className="mx-4 mb-4 rounded overflow-hidden"
        style={{ background: '#2b2d31', borderLeft: '4px solid #4f96ff' }}
      >
        <div className="px-4 pt-3 pb-2">
          <p className="text-sm font-bold text-white">🍌 Server leaderboard</p>
          <p className="text-xs mt-0.5" style={{ color: '#80848e' }}>
            <span className="font-semibold" style={{ color: '#d1d5db' }}>
              Last scored match
            </span>
          </p>
          <p className="text-xs mt-0.5">
            <span
              className="px-2 py-0.5 rounded text-white"
              style={{ background: '#383a40', fontSize: 11 }}
            >
              G2 Esports vs Karmine Corp — 07/06
            </span>
          </p>
        </div>

        <div className="px-4 pb-1 space-y-1.5">
          {players.map((p) => (
            <div key={p.rank} className="flex items-center gap-2 text-xs">
              <span
                className="w-5 text-center font-bold shrink-0"
                style={{ color: medalColor[p.rank] ?? '#80848e' }}
              >
                {p.rank}
              </span>
              <span className="font-medium text-white flex-1 truncate">@{p.name}</span>
              <span className="flex items-center gap-0.5" style={{ color: '#fbbf24' }}>
                🍌 <span className="font-bold text-white">{p.pts}</span>
              </span>
              <span style={{ color: '#80848e' }}>
                🎯 <span className="text-white">{p.acc}</span>
              </span>
              <span style={{ color: '#80848e' }}>
                ✨ <span className="text-white">{p.perfect}</span>
              </span>
            </div>
          ))}
        </div>

        <div className="px-4 py-3">
          <p className="text-[11px]" style={{ color: '#80848e' }}>
            🍌 Bananas · 🎯 Winner accuracy · ✨ Perfect scores — Jungle Squad 🐒 · Page 1/3
          </p>
        </div>
      </div>

      {/* Pagination buttons */}
      <div className="px-4 pb-4 flex gap-2">
        <button
          className="px-4 py-2 rounded text-sm font-semibold text-white"
          style={{ background: '#4e5058' }}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 rounded text-sm font-semibold text-white"
          style={{ background: '#4e5058' }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// League ticker
// ─────────────────────────────────────────
const LEAGUES = [
  { name: 'LEC', src: '/logos/lec.png' },
  { name: 'LCK', src: '/logos/lck.png' },
  { name: 'LPL', src: '/logos/lpl.png' },
  { name: 'LFL', src: '/logos/lfl.png' },
  { name: 'MSI', src: '/logos/msi.png' },
  { name: 'Worlds', src: '/logos/worlds.png' },
  { name: 'EMEA Masters', src: '/logos/emea_masters.png' },
  { name: 'First Stand', src: '/logos/first_stand.png' },
];

function LeagueTicker() {
  const items = [...LEAGUES, ...LEAGUES]; // duplicate for seamless loop
  return (
    <div className="relative overflow-hidden py-2" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
      <div
        className="flex gap-10 animate-marquee whitespace-nowrap"
        style={{ animationDuration: '28s' }}
      >
        {items.map((l, i) => (
          <div key={i} className="flex items-center gap-3 shrink-0">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            >
              <Image src={l.src} alt={l.name} width={22} height={22} className="object-contain" />
            </div>
            <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {l.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen text-white" style={{ background: '#0a0f1e' }}>
      {/* Nav */}
      <header
        className="fixed top-0 inset-x-0 z-50 backdrop-blur-md"
        style={{
          borderBottom: '1px solid rgba(90,169,255,0.1)',
          background: 'rgba(10,15,30,0.9)',
        }}
      >
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
            <span className="text-2xl">🍌</span>
            <span className="text-white">Bananalyz</span>
          </Link>
          <nav
            className="hidden md:flex items-center gap-6 text-sm"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            <Link href="/docs" className="hover:text-white transition-colors">
              Docs
            </Link>
            <Link
              href={INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg font-semibold transition-all hover:opacity-90"
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
        {/* ── Hero ── */}
        <section className="pt-40 pb-20 px-6 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <div
              className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl"
              style={{ background: 'rgba(47,107,255,0.14)' }}
            />
            <div
              className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl"
              style={{ background: 'rgba(255,212,59,0.07)' }}
            />
          </div>

          <div className="relative mx-auto max-w-7xl flex flex-col lg:flex-row items-center gap-16">
            {/* Left */}
            <div className="flex-1 text-left">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-8"
                style={{
                  background: 'rgba(90,169,255,0.1)',
                  border: '1px solid rgba(90,169,255,0.2)',
                  color: '#5aa9ff',
                }}
              >
                <Star size={13} />
                LoL esports predictions for Discord
              </div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.05]">
                Predict.
                <br />
                <span style={{ color: '#ffd43b' }}>Compete.</span>
                <br />
                Dominate.
              </h1>
              <p
                className="text-lg md:text-xl mb-10 leading-relaxed max-w-lg"
                style={{ color: 'rgba(255,255,255,0.55)' }}
              >
                Bananalyz brings League of Legends esports predictions directly into your Discord
                server. Pick winners, score points, climb your server leaderboard.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-3">
                <Link
                  href={INVITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-base transition-opacity hover:opacity-90"
                  style={{ background: '#5aa9ff', color: '#0a0f1e' }}
                >
                  Add to Discord
                  <ChevronRight size={16} />
                </Link>
                <Link
                  href="/docs"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-base transition-colors"
                  style={{
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.65)',
                  }}
                >
                  Read the docs
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-10">
                <div
                  className="flex items-center gap-2 text-sm"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  <Users size={14} />
                  <span>Trusted by 20+ Discord servers</span>
                </div>
                <div
                  className="flex items-center gap-2 text-sm"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  <Clock size={14} />
                  <span>Add in under 1 minute</span>
                </div>
              </div>
            </div>

            {/* Right: stacked embeds */}
            <div className="flex-1 flex justify-center lg:justify-end w-full">
              <div className="relative w-full max-w-[460px]">
                {/* glow */}
                <div
                  className="absolute -inset-6 rounded-3xl blur-3xl"
                  style={{ background: 'rgba(90,169,255,0.07)' }}
                />
                {/* back card (leaderboard), slightly offset */}
                <div
                  className="absolute top-8 -left-4 opacity-60 pointer-events-none"
                  style={{ transform: 'scale(0.92)', transformOrigin: 'top center', zIndex: 0 }}
                >
                  <LeaderboardEmbed />
                </div>
                {/* front card (match) */}
                <div className="relative" style={{ zIndex: 1 }}>
                  <MatchEmbed />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Leagues ticker ── */}
        <section
          className="py-10 px-6"
          style={{ borderTop: '1px solid rgba(90,169,255,0.08)' }}
        >
          <div className="mx-auto max-w-6xl">
            <p
              className="text-xs font-semibold uppercase tracking-widest text-center mb-6"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              Supported leagues &amp; tournaments
            </p>
            <LeagueTicker />
          </div>
        </section>

        {/* ── How it works ── */}
        <section
          className="py-24 px-6"
          style={{ borderTop: '1px solid rgba(90,169,255,0.08)' }}
        >
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-4">How it works</h2>
            <p
              className="text-center mb-14 max-w-md mx-auto"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              Three steps and your server is predicting.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Add the bot',
                  desc: 'Invite Bananalyz to your Discord server in one click. No account needed.',
                },
                {
                  step: '02',
                  title: 'Configure a channel',
                  desc: 'Use /config to set your prediction channel. Matches post automatically.',
                },
                {
                  step: '03',
                  title: 'Pick &amp; compete',
                  desc: 'Your members vote on match outcomes and race for the leaderboard.',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="relative p-6 rounded-2xl"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(90,169,255,0.1)',
                  }}
                >
                  <div
                    className="text-5xl font-black mb-4"
                    style={{ color: 'rgba(90,169,255,0.15)' }}
                  >
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'rgba(255,255,255,0.45)' }}
                    dangerouslySetInnerHTML={{ __html: item.desc }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── /predictions showcase ── */}
        <section
          className="py-24 px-6"
          style={{ borderTop: '1px solid rgba(90,169,255,0.08)' }}
        >
          <div className="mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Left: embed */}
              <div className="flex justify-center md:justify-start">
                <div className="relative">
                  <div
                    className="absolute -inset-4 rounded-2xl blur-2xl"
                    style={{ background: 'rgba(251,191,36,0.06)' }}
                  />
                  <div className="relative">
                    <PredictionsEmbed />
                  </div>
                </div>
              </div>
              {/* Right: text */}
              <div>
                <div
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold mb-6"
                  style={{
                    background: 'rgba(251,191,36,0.1)',
                    border: '1px solid rgba(251,191,36,0.2)',
                    color: '#fbbf24',
                  }}
                >
                  <BarChart3 size={12} /> /predictions
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  Your full history,
                  <br />
                  at a glance
                </h2>
                <p className="mb-6 leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  See your recent results, upcoming picks, win rate, and total bananas — all in one
                  embed inside Discord.
                </p>
                <ul className="space-y-3">
                  {[
                    'Win/loss breakdown per match',
                    'Upcoming predictions you can still edit',
                    'Perfect score counter ✨',
                    'Real-time accuracy rate',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm">
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: 'rgba(74,222,128,0.15)' }}
                      >
                        <Check size={12} style={{ color: '#4ade80' }} />
                      </span>
                      <span style={{ color: 'rgba(255,255,255,0.6)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Leaderboard showcase ── */}
        <section
          className="py-24 px-6"
          style={{ borderTop: '1px solid rgba(90,169,255,0.08)' }}
        >
          <div className="mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Left: text */}
              <div>
                <div
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold mb-6"
                  style={{
                    background: 'rgba(90,169,255,0.1)',
                    border: '1px solid rgba(90,169,255,0.2)',
                    color: '#5aa9ff',
                  }}
                >
                  <Trophy size={12} /> /leaderboard
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  Compete with
                  <br />
                  your whole server
                </h2>
                <p className="mb-6 leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  A per-server leaderboard updates after every scored match. See who's the sharpest
                  analyst in your community.
                </p>
                <ul className="space-y-3">
                  {[
                    'Paginated leaderboard (up to 100 players)',
                    'Banana points, accuracy & perfect score columns',
                    'Updated automatically after each match',
                    'Global leaderboard across all servers',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm">
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: 'rgba(74,222,128,0.15)' }}
                      >
                        <Check size={12} style={{ color: '#4ade80' }} />
                      </span>
                      <span style={{ color: 'rgba(255,255,255,0.6)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Right: embed */}
              <div className="flex justify-center md:justify-end">
                <div className="relative">
                  <div
                    className="absolute -inset-4 rounded-2xl blur-2xl"
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

        {/* ── Features ── */}
        <section
          className="py-24 px-6"
          style={{ borderTop: '1px solid rgba(90,169,255,0.08)' }}
        >
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-4">Everything you need</h2>
            <p
              className="text-center mb-14 max-w-md mx-auto"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              A fully automated prediction system that runs in the background.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="p-6 rounded-2xl"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(90,169,255,0.1)',
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: 'rgba(90,169,255,0.1)' }}
                  >
                    <f.icon size={20} style={{ color: '#5aa9ff' }} />
                  </div>
                  <h3 className="font-semibold mb-2 text-white">{f.title}</h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'rgba(255,255,255,0.45)' }}
                  >
                    {f.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Commands ── */}
        <section
          className="py-24 px-6"
          style={{ borderTop: '1px solid rgba(90,169,255,0.08)' }}
        >
          <div className="mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  Simple commands,
                  <br />
                  powerful results
                </h2>
                <p className="mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  Every interaction happens through slash commands. No external accounts, no setup
                  friction for your members.
                </p>
                <Link
                  href="/docs/commands"
                  className="inline-flex items-center gap-2 font-medium hover:gap-3 transition-all"
                  style={{ color: '#5aa9ff' }}
                >
                  See all commands <ChevronRight size={16} />
                </Link>
              </div>
              <div className="space-y-3">
                {commands.map((cmd) => (
                  <div
                    key={cmd.name}
                    className="flex items-center gap-4 p-4 rounded-xl"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(90,169,255,0.1)',
                    }}
                  >
                    <code
                      className="font-mono text-sm font-semibold shrink-0"
                      style={{ color: '#ffd43b' }}
                    >
                      {cmd.name}
                    </code>
                    <span
                      className="text-sm"
                      style={{ color: 'rgba(255,255,255,0.45)' }}
                    >
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
          className="py-24 px-6"
          style={{ borderTop: '1px solid rgba(90,169,255,0.08)' }}
        >
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-4">How scoring works</h2>
            <p className="mb-12" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Every prediction is worth up to 5 bananas 🍌
            </p>
            <div className="grid grid-cols-3 gap-5">
              <div
                className="p-6 rounded-2xl"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(90,169,255,0.1)',
                }}
              >
                <div className="text-4xl font-bold mb-2" style={{ color: '#5aa9ff' }}>
                  +3
                </div>
                <div className="text-sm font-medium mb-1 text-white">Correct winner</div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  Pick the right team
                </div>
              </div>
              <div
                className="p-6 rounded-2xl"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(90,169,255,0.1)',
                }}
              >
                <div className="text-4xl font-bold mb-2" style={{ color: '#5aa9ff' }}>
                  +2
                </div>
                <div className="text-sm font-medium mb-1 text-white">Exact score</div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  Predict the exact series score
                </div>
              </div>
              <div
                className="p-6 rounded-2xl"
                style={{
                  background: 'rgba(255,212,59,0.06)',
                  border: '1px solid rgba(255,212,59,0.2)',
                }}
              >
                <div className="text-4xl font-bold mb-2" style={{ color: '#ffd43b' }}>
                  ✨5
                </div>
                <div className="text-sm font-medium mb-1 text-white">Perfect</div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  Winner + exact score
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          className="py-28 px-6"
          style={{ borderTop: '1px solid rgba(90,169,255,0.08)' }}
        >
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-6xl mb-6">🍌</div>
            <h2 className="text-4xl font-bold mb-4">Ready to predict?</h2>
            <p className="mb-8" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Add Bananalyz to your server in 30 seconds and start your first prediction.
            </p>
            <Link
              href={INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-opacity hover:opacity-90"
              style={{ background: '#5aa9ff', color: '#0a0f1e' }}
            >
              Add to Discord <ChevronRight size={18} />
            </Link>
          </div>
        </section>
      </main>

      <footer
        className="py-10 px-6"
        style={{ borderTop: '1px solid rgba(90,169,255,0.08)' }}
      >
        <div
          className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm"
          style={{ color: 'rgba(255,255,255,0.25)' }}
        >
          <div className="flex items-center gap-2">
            <span>🍌</span>
            <span>Bananalyz — Made with love by Jungle Squad</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/docs" className="hover:text-white/60 transition-colors">
              Docs
            </Link>
            <Link
              href="https://x.com/wonezer"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/60 transition-colors"
            >
              Twitter
            </Link>
            <Link
              href="https://github.com/wonecode/banana-predi"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/60 transition-colors"
            >
              GitHub
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
