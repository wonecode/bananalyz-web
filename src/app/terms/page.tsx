import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service — Bananalyz',
  description: 'Terms of Service for Bananalyz, the League of Legends esports prediction bot for Discord.',
};

export default function TermsPage() {
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
            <h1 className="text-4xl font-black tracking-tight mb-3">Terms of Service</h1>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>Last updated: June 10, 2026</p>
          </div>

          <div className="space-y-10" style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.75' }}>

            <section>
              <h2 className="text-lg font-bold text-white mb-3">1. Acceptance of terms</h2>
              <p>By adding Bananalyz to your Discord server or interacting with it in any way, you agree to be bound by these Terms of Service. If you do not agree, please remove the bot from your server and stop using the service. These terms apply to all users, server administrators, and any party accessing Bananalyz.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-3">2. Description of service</h2>
              <p>Bananalyz is a Discord bot developed and operated by Jungle Squad that allows Discord servers to run League of Legends esports match prediction games. Users can submit predictions on match outcomes, earn points, and compete on leaderboards within their server or globally. The service is provided free of charge.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-3">3. Eligibility</h2>
              <p>You must be at least 13 years old to use Bananalyz, in accordance with Discord&apos;s own Terms of Service. By using Bananalyz, you represent that you meet this age requirement. If you are under 16 years old and located in the European Union, you may require parental consent depending on the laws applicable in your country.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-3">4. User conduct</h2>
              <p className="mb-3">When using Bananalyz, you agree not to:</p>
              <ul className="space-y-2">
                {[
                  'Attempt to manipulate, exploit, or abuse the prediction or scoring system',
                  'Use automated scripts, bots, or other tools to interact with Bananalyz on your behalf',
                  'Reverse-engineer, decompile, or attempt to extract the source code of the bot',
                  "Use the service for any unlawful purpose or in violation of Discord's Terms of Service",
                  'Harass, threaten, or harm other users through or in connection with the service',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm list-none">
                    <span className="mt-1 shrink-0" style={{ color: '#5aa9ff' }}>—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-3">5. Server administrators</h2>
              <p>Server administrators who add Bananalyz to their Discord server are responsible for ensuring that its use complies with applicable laws and Discord&apos;s policies within their community. Jungle Squad is not responsible for how the bot is used within individual servers.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-3">6. Intellectual property</h2>
              <p>All content, branding, code, and design associated with Bananalyz are the exclusive property of Jungle Squad. League of Legends, team names, and league names referenced by the bot are the intellectual property of their respective owners (Riot Games, esports organisations, etc.). Bananalyz is not affiliated with or endorsed by Riot Games.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-3">7. Availability and modifications</h2>
              <p>Jungle Squad reserves the right to modify, suspend, or discontinue Bananalyz at any time, with or without notice. We may also update these Terms of Service at any time. Continued use of the service after any such changes constitutes your acceptance of the new terms. We will make reasonable efforts to notify users of significant changes.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-3">8. Disclaimer of warranties</h2>
              <p>Bananalyz is provided &quot;as is&quot; and &quot;as available&quot; without any warranties of any kind, either express or implied. Jungle Squad does not warrant that the service will be uninterrupted, error-free, or free of viruses or other harmful components. Points, leaderboard rankings, and match data are provided for entertainment purposes only and have no monetary value.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-3">9. Limitation of liability</h2>
              <p>To the maximum extent permitted by applicable law, Jungle Squad shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use Bananalyz. This includes loss of data, loss of profits, or any other intangible losses.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-3">10. Governing law</h2>
              <p>These Terms of Service are governed by the laws of the European Union and the applicable national laws of the operator&apos;s country of residence. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the competent courts in the EU.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-3">11. Contact</h2>
              <p>If you have any questions about these Terms of Service, you can reach Jungle Squad via the Discord community server linked on the home page, or by opening an issue on the public GitHub repository.</p>
            </section>

          </div>

          <div className="mt-16 pt-8 flex items-center justify-between text-sm" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.3)' }}>
            <span>Jungle Squad © {new Date().getFullYear()}</span>
            <Link href="/privacy" className="transition-colors hover:text-white">Privacy Policy →</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
