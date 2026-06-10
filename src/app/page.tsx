import Link from 'next/link';
import {
  Zap,
  Trophy,
  BarChart3,
  Shield,
  ChevronRight,
  Star,
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

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f1a0f] text-white">
      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-[#0f1a0f]/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
            <span className="text-2xl">🍌</span>
            <span className="text-white">Bananalyz</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/60">
            <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
            <Link
              href={INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-[#ffd43b] text-[#0f1a0f] font-semibold hover:bg-[#f0b800] transition-colors"
            >
              Add to Discord
            </Link>
          </nav>
          <Link
            href={INVITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden px-3 py-1.5 rounded-lg bg-[#ffd43b] text-[#0f1a0f] text-sm font-semibold"
          >
            Add bot
          </Link>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="pt-40 pb-28 px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#ffd43b]/5 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffd43b]/10 border border-[#ffd43b]/20 text-[#ffd43b] text-sm font-medium mb-8">
              <Star size={13} />
              LoL esports predictions for Discord
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.05]">
              Predict.
              <br />
              <span className="text-[#ffd43b]">Compete.</span>
              <br />
              Dominate.
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-xl mx-auto mb-10 leading-relaxed">
              Bananalyz brings League of Legends esports predictions directly into your Discord server.
              Pick winners, score points, and climb your server leaderboard.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href={INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#ffd43b] text-[#0f1a0f] font-semibold text-base hover:bg-[#f0b800] transition-colors"
              >
                Add to Discord
                <ChevronRight size={16} />
              </Link>
              <Link
                href="/docs"
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-white/70 font-medium text-base hover:border-white/20 hover:text-white transition-colors"
              >
                Read the docs
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-4">Everything you need</h2>
            <p className="text-white/50 text-center mb-14 max-w-md mx-auto">
              A fully automated prediction system that runs in the background.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#ffd43b]/10 flex items-center justify-center mb-4">
                    <f.icon size={20} className="text-[#ffd43b]" />
                  </div>
                  <h3 className="font-semibold mb-2">{f.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Commands */}
        <section className="py-24 px-6 border-t border-white/5">
          <div className="mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Simple commands,<br />powerful results</h2>
                <p className="text-white/50 mb-8 leading-relaxed">
                  Every interaction happens through slash commands. No external accounts, no setup friction for your members.
                </p>
                <Link
                  href="/docs/commands"
                  className="inline-flex items-center gap-2 text-[#ffd43b] font-medium hover:gap-3 transition-all"
                >
                  See all commands <ChevronRight size={16} />
                </Link>
              </div>
              <div className="space-y-3">
                {commands.map((cmd) => (
                  <div
                    key={cmd.name}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                  >
                    <code className="text-[#ffd43b] font-mono text-sm font-semibold shrink-0">
                      {cmd.name}
                    </code>
                    <span className="text-sm text-white/50">{cmd.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Scoring */}
        <section className="py-24 px-6 border-t border-white/5">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-4">How scoring works</h2>
            <p className="text-white/50 mb-12">
              Every prediction is worth up to 5 bananas 🍌
            </p>
            <div className="grid grid-cols-3 gap-5">
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <div className="text-4xl font-bold text-[#ffd43b] mb-2">+3</div>
                <div className="text-sm font-medium mb-1">Correct winner</div>
                <div className="text-xs text-white/40">Pick the right team</div>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <div className="text-4xl font-bold text-[#ffd43b] mb-2">+2</div>
                <div className="text-sm font-medium mb-1">Exact score</div>
                <div className="text-xs text-white/40">Predict the exact series score</div>
              </div>
              <div className="p-6 rounded-2xl bg-[#ffd43b]/5 border border-[#ffd43b]/20">
                <div className="text-4xl font-bold text-[#ffd43b] mb-2">✨5</div>
                <div className="text-sm font-medium mb-1">Perfect</div>
                <div className="text-xs text-white/40">Winner + exact score</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-28 px-6 border-t border-white/5">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-6xl mb-6">🍌</div>
            <h2 className="text-4xl font-bold mb-4">Ready to predict?</h2>
            <p className="text-white/50 mb-8">
              Add Bananalyz to your server in 30 seconds and start your first prediction.
            </p>
            <Link
              href={INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#ffd43b] text-[#0f1a0f] font-bold text-lg hover:bg-[#f0b800] transition-colors"
            >
              Add to Discord <ChevronRight size={18} />
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-10 px-6">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/30">
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
