import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy — Bananalyz',
  description: 'Privacy Policy for Bananalyz — how we collect, use and protect your data, in compliance with GDPR.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen text-white" style={{ background: '#0a0f1e' }}>
      <header
        className="fixed top-0 inset-x-0 z-50 backdrop-blur-md"
        style={{ borderBottom: '1px solid rgba(90,169,255,0.1)', background: 'rgba(10,15,30,0.85)' }}
      >
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-lg">
            <span className="text-2xl">🍌</span>
            <span className="text-white tracking-tight">Bananalyz</span>
          </Link>
          <Link href="/" className="text-sm transition-colors" style={{ color: 'rgba(255,255,255,0.45)' }}>
            ← Back to home
          </Link>
        </div>
      </header>

      <main className="pt-32 pb-24 px-6">
        <div className="mx-auto max-w-2xl">
          <div className="mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#5aa9ff' }}>Legal</p>
            <h1 className="text-4xl font-black tracking-tight mb-3">Privacy Policy</h1>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>Last updated: June 10, 2026</p>
          </div>

          <div className="space-y-10" style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.75' }}>

            <section>
              <h2 className="text-lg font-bold text-white mb-3">1. Who we are</h2>
              <p>Bananalyz is operated by Jungle Squad, an individual developer based in the European Union. This Privacy Policy explains how we collect, use, store, and protect personal data when you use the Bananalyz Discord bot and the associated website at bananalyz.com. We are committed to protecting your privacy in compliance with the General Data Protection Regulation (GDPR — Regulation (EU) 2016/679).</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-3">2. Data we collect</h2>
              <p className="mb-3">When you interact with Bananalyz, we collect and store the following data:</p>
              <ul className="space-y-2">
                {[
                  { label: 'Discord User ID', desc: 'A unique numerical identifier assigned by Discord. We never store your username or avatar.' },
                  { label: 'Discord Server ID', desc: 'The identifier of the server in which you interact with the bot.' },
                  { label: 'Prediction data', desc: 'Your submitted match predictions, including the team selected and the score predicted.' },
                  { label: 'Points and statistics', desc: 'Your cumulative banana points, win rate, and perfect prediction count.' },
                  { label: 'Interaction timestamps', desc: 'The date and time of your predictions, used for match locking logic.' },
                ].map((item) => (
                  <li key={item.label} className="p-3 rounded-xl text-sm list-none" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <span className="font-semibold text-white">{item.label}</span>
                    <span style={{ color: 'rgba(255,255,255,0.45)' }}> — {item.desc}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>We do not collect your email address, real name, IP address, message content outside of slash commands, or any other personal information beyond what is listed above.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-3">3. Legal basis for processing</h2>
              <p>Under the GDPR, we process your data on the basis of <strong className="text-white">legitimate interests</strong> (Article 6(1)(f)) — specifically, to operate the prediction game and provide the leaderboard feature that users expect when they interact with the bot. When you submit a prediction via a Discord slash command, you are actively providing this data for the purpose of participating in the game.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-3">4. How we use your data</h2>
              <p className="mb-3">Your data is used exclusively to:</p>
              <ul className="space-y-2">
                {[
                  'Record and display your predictions before match results',
                  'Calculate and award banana points after match results are confirmed',
                  'Display your stats and history via /predictions',
                  'Populate server leaderboards and the global leaderboard',
                  'Prevent duplicate predictions on the same match',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm list-none">
                    <span className="mt-1 shrink-0" style={{ color: '#5aa9ff' }}>—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4">We do not sell, rent, share, or otherwise disclose your data to any third party for commercial or marketing purposes.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-3">5. Data retention</h2>
              <p>Your data is retained for as long as you continue to use Bananalyz or for as long as the bot is present in a server you are a member of. If you request deletion of your data (see Section 7), we will erase your records within 30 days. Anonymised, aggregated statistical data may be retained indefinitely as it cannot be linked back to any individual.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-3">6. Data security</h2>
              <p>We take reasonable technical and organisational measures to protect your data against unauthorised access, loss, or destruction. Your data is stored in a secure database accessible only to the Bananalyz backend. We do not transmit your data over unencrypted connections.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-3">7. Your rights (GDPR)</h2>
              <p className="mb-3">As a resident of the European Union, you have the following rights regarding your personal data:</p>
              <ul className="space-y-2">
                {[
                  { right: 'Right of access', desc: 'You can request a copy of all data we hold about you.' },
                  { right: 'Right to rectification', desc: 'You can request correction of inaccurate data.' },
                  { right: 'Right to erasure', desc: "You can request deletion of all your personal data ('right to be forgotten')." },
                  { right: 'Right to restriction', desc: 'You can request that we limit the processing of your data.' },
                  { right: 'Right to data portability', desc: 'You can request your data in a structured, machine-readable format.' },
                  { right: 'Right to object', desc: 'You can object to processing based on legitimate interests.' },
                ].map((item) => (
                  <li key={item.right} className="p-3 rounded-xl text-sm list-none" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <span className="font-semibold text-white">{item.right}</span>
                    <span style={{ color: 'rgba(255,255,255,0.45)' }}> — {item.desc}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4">To exercise any of these rights, please contact us via the Discord community server or the GitHub repository. We will respond within 30 days. You also have the right to lodge a complaint with the supervisory authority in your EU member state.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-3">8. Cookies and tracking</h2>
              <p>The Bananalyz website (bananalyz.com) does not use cookies, analytics trackers, or any third-party tracking scripts. No personal data is collected simply by visiting the website.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-3">9. Third-party services</h2>
              <p>Bananalyz operates within the Discord platform. Discord&apos;s own Privacy Policy governs how Discord collects and processes data. Bananalyz only receives data that Discord explicitly passes to the bot via its API (user IDs, server IDs, and slash command inputs). We have no control over Discord&apos;s data practices.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-3">10. Changes to this policy</h2>
              <p>We may update this Privacy Policy from time to time. When we do, we will update the &quot;Last updated&quot; date at the top of this page. Significant changes will be announced in the official Discord community server. Continued use of Bananalyz after any changes constitutes your acceptance of the updated policy.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-3">11. Contact</h2>
              <p>For any privacy-related questions or to exercise your rights, please contact Jungle Squad via the Discord community server linked on the home page, or by opening an issue on the public GitHub repository. We are committed to resolving all requests promptly and transparently.</p>
            </section>

          </div>

          <div className="mt-16 pt-8 flex items-center justify-between text-sm" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.3)' }}>
            <span>Jungle Squad © {new Date().getFullYear()}</span>
            <Link href="/terms" className="transition-colors hover:text-white">Terms of Service →</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
