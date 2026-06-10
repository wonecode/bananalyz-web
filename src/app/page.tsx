import Link from 'next/link';
import {
  Zap,
  Trophy,
  BarChart3,
  Shield,
  ChevronRight,
  Star,
  Clock,
  Users,
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

function DiscordEmbed() {
  return (
    <div className="w-full max-w-md font-sans">
      {/* Discord message wrapper */}
      <div className="rounded-xl overflow-hidden" style={{ background: '#36393f' }}>
        {/* Bot header */}
        <div className="flex items-center gap-3 px-4 pt-4 pb-2">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0" style={{ background: '#1a1f2e' }}>
            🍌
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white text-sm">Bananalyz</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold" style={{ background: '#5865f2', color: 'white' }}>APP</span>
            <span className="text-xs" style={{ color: '#a3a6aa' }}>Today at 14:08</span>
          </div>
        </div>

        {/* Embed card */}
        <div className="mx-4 mb-4 rounded-md overflow-hidden" style={{ background: '#2b2d31', borderLeft: '4px solid #5aa9ff' }}>
          {/* League badge */}
          <div className="px-4 pt-3 pb-1 flex items-center gap-2">
            <span className="text-sm font-semibold" style={{ color: '#a3a6aa' }}>⚔️ LEC</span>
          </div>

          {/* Match title */}
          <div className="px-4 pb-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-base font-bold text-white flex items-center gap-1.5">
                <span>🔰</span> G2 Esports
              </span>
              <span className="text-sm font-medium" style={{ color: '#a3a6aa' }}>vs</span>
              <span className="text-base font-bold text-white flex items-center gap-1.5">
                <span>🔵</span> Karmine Corp
              </span>
            </div>
            <p className="text-xs mt-1" style={{ color: '#a3a6aa' }}>Predictions are now open.</p>
          </div>

          {/* Meta grid */}
          <div className="px-4 pb-3 grid grid-cols-3 gap-3 text-xs">
            <div>
              <div className="font-semibold text-white mb-0.5">Start time</div>
              <span className="px-2 py-0.5 rounded text-white" style={{ background: '#383a40' }}>in 2 hours</span>
            </div>
            <div>
              <div className="font-semibold text-white mb-0.5">Format</div>
              <span className="px-2 py-0.5 rounded text-white" style={{ background: '#383a40' }}>BO5</span>
            </div>
            <div>
              <div className="font-semibold text-white mb-0.5">League</div>
              <span className="flex items-center gap-1" style={{ color: '#a3a6aa' }}>⚔️ LEC</span>
            </div>
          </div>

          {/* Exact time */}
          <div className="px-4 pb-3">
            <div className="text-xs font-semibold text-white mb-0.5">Exact time</div>
            <span className="px-2 py-0.5 rounded text-xs text-white" style={{ background: '#383a40' }}>10 juin 2026 à 16:00</span>
          </div>

          {/* Predictions */}
          <div className="px-4 pb-3 grid grid-cols-2 gap-4 text-xs">
            <div>
              <div className="font-semibold text-white mb-1">Global predictions</div>
              <div className="space-y-0.5">
                <div><span className="font-semibold text-white">G2 Esports</span> <span style={{ color: '#a3a6aa' }}>— 63% (9)</span></div>
                <div><span className="font-semibold text-white">Karmine Corp</span> <span style={{ color: '#a3a6aa' }}>— 37% (5)</span></div>
              </div>
            </div>
            <div>
              <div className="font-semibold text-white mb-1">Server predictions</div>
              <div className="space-y-0.5">
                <div><span className="font-semibold text-white">G2 Esports</span> <span style={{ color: '#a3a6aa' }}>— 63% (9)</span></div>
                <div><span className="font-semibold text-white">Karmine Corp</span> <span style={{ color: '#a3a6aa' }}>— 37% (5)</span></div>
              </div>
            </div>
          </div>

          {/* Participants */}
          <div className="px-4 pb-4">
            <div className="text-xs font-semibold text-white mb-1">Server participants</div>
            <p className="text-xs" style={{ color: '#5aa9ff' }}>
              @Bonobo Éolien, @Macaque Gambler 🎲, @Singe Agressif, @Bonobo soyeux, @Singe Panda American, @Bonobo Copium
            </p>
            <p className="text-xs mt-1.5" style={{ color: '#a3a6aa' }}>You can update your prediction until the match starts.</p>
          </div>
        </div>

        {/* Score buttons */}
        <div className="px-4 pb-4 space-y-2">
          <div className="grid grid-cols-3 gap-2">
            {['G2 3-0', 'G2 3-1', 'G2 3-2'].map((s) => (
              <button
                key={s}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold text-white transition-opacity hover:opacity-80"
                style={{ background: '#383a40', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <span>🔰</span> {s}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {['KC 3-0', 'KC 3-1', 'KC 3-2'].map((s) => (
              <button
                key={s}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold text-white transition-opacity hover:opacity-80"
                style={{ background: '#383a40', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <span>🔵</span> {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen text-white" style={{ background: '#0a0f1e' }}>
      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md" style={{ borderBottom: '1px solid rgba(90,169,255,0.1)', background: 'rgba(10,15,30,0.85)' }}>
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
            <span className="text-2xl">🍌</span>
            <span className="text-white">Bananalyz</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
            <Link
              href={INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg font-semibold transition-colors"
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
        {/* Hero */}
        <section className="pt-40 pb-20 px-6 relative overflow-hidden">
          {/* Background glows */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl" style={{ background: 'rgba(47,107,255,0.12)' }} />
            <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl" style={{ background: 'rgba(255,212,59,0.06)' }} />
          </div>

          <div className="relative mx-auto max-w-7xl flex flex-col lg:flex-row items-center gap-16">
            {/* Left: text */}
            <div className="flex-1 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-8" style={{ background: 'rgba(90,169,255,0.1)', border: '1px solid rgba(90,169,255,0.2)', color: '#5aa9ff' }}>
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
              <p className="text-lg md:text-xl mb-10 leading-relaxed max-w-lg" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Bananalyz brings League of Legends esports predictions directly into your Discord server.
                Pick winners, score points, climb your server leaderboard.
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
                  style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.65)' }}
                >
                  Read the docs
                </Link>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-6 mt-10">
                <div className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  <Users size={14} />
                  <span>Trusted by 20+ Discord servers</span>
                </div>
                <div className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  <Clock size={14} />
                  <span>Add in under 1 minute</span>
                </div>
              </div>
            </div>

            {/* Right: Discord embed preview */}
            <div className="flex-1 flex justify-center lg:justify-end w-full">
              <div className="relative">
                <div className="absolute -inset-4 rounded-2xl blur-2xl" style={{ background: 'rgba(90,169,255,0.08)' }} />
                <div className="relative">
                  <DiscordEmbed />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-24 px-6" style={{ borderTop: '1px solid rgba(90,169,255,0.08)' }}>
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-4">How it works</h2>
            <p className="text-center mb-14 max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Three steps and your server is predicting.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Add the bot', desc: 'Invite Bananalyz to your Discord server in one click.' },
                { step: '02', title: 'Configure a channel', desc: 'Use /config to set your prediction channel. Matches post automatically.' },
                { step: '03', title: 'Pick & compete', desc: 'Your members vote on match outcomes and race for the leaderboard.' },
              ].map((item) => (
                <div key={item.step} className="relative p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(90,169,255,0.1)' }}>
                  <div className="text-5xl font-black mb-4" style={{ color: 'rgba(90,169,255,0.15)' }}>{item.step}</div>
                  <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 px-6" style={{ borderTop: '1px solid rgba(90,169,255,0.08)' }}>
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-4">Everything you need</h2>
            <p className="text-center mb-14 max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.45)' }}>
              A fully automated prediction system that runs in the background.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="p-6 rounded-2xl transition-colors"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(90,169,255,0.1)' }}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: 'rgba(90,169,255,0.1)' }}>
                    <f.icon size={20} style={{ color: '#5aa9ff' }} />
                  </div>
                  <h3 className="font-semibold mb-2 text-white">{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Commands */}
        <section className="py-24 px-6" style={{ borderTop: '1px solid rgba(90,169,255,0.08)' }}>
          <div className="mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Simple commands,<br />powerful results</h2>
                <p className="mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  Every interaction happens through slash commands. No external accounts, no setup friction for your members.
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
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(90,169,255,0.1)' }}
                  >
                    <code className="font-mono text-sm font-semibold shrink-0" style={{ color: '#ffd43b' }}>
                      {cmd.name}
                    </code>
                    <span className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>{cmd.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Scoring */}
        <section className="py-24 px-6" style={{ borderTop: '1px solid rgba(90,169,255,0.08)' }}>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-4">How scoring works</h2>
            <p className="mb-12" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Every prediction is worth up to 5 bananas 🍌
            </p>
            <div className="grid grid-cols-3 gap-5">
              <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(90,169,255,0.1)' }}>
                <div className="text-4xl font-bold mb-2" style={{ color: '#5aa9ff' }}>+3</div>
                <div className="text-sm font-medium mb-1 text-white">Correct winner</div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Pick the right team</div>
              </div>
              <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(90,169,255,0.1)' }}>
                <div className="text-4xl font-bold mb-2" style={{ color: '#5aa9ff' }}>+2</div>
                <div className="text-sm font-medium mb-1 text-white">Exact score</div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Predict the exact series score</div>
              </div>
              <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,212,59,0.06)', border: '1px solid rgba(255,212,59,0.2)' }}>
                <div className="text-4xl font-bold mb-2" style={{ color: '#ffd43b' }}>✨5</div>
                <div className="text-sm font-medium mb-1 text-white">Perfect</div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Winner + exact score</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-28 px-6" style={{ borderTop: '1px solid rgba(90,169,255,0.08)' }}>
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

      <footer className="py-10 px-6" style={{ borderTop: '1px solid rgba(90,169,255,0.08)' }}>
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>
          <div className="flex items-center gap-2">
            <span>🍌</span>
            <span>Bananalyz — Made with love by Jungle Squad</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/docs" className="hover:text-white/60 transition-colors">Docs</Link>
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
