import { fetchAdmin } from '@/lib/admin-api';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

type Guild = {
  id: string;
  discordId: string;
  name: string | null;
  predictionChannelId: string | null;
  enabledLeagues: { name: string; slug: string }[];
  createdAt: string;
};

type GuildsResponse = { guilds: Guild[]; total: number };

export default async function GuildsPage() {
  const data = await fetchAdmin<GuildsResponse>('/guilds');
  const guilds = data?.guilds ?? [];

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Serveurs</h1>
          <p className="mt-1 text-sm text-white/30">{guilds.length} serveur{guilds.length > 1 ? 's' : ''} enregistré{guilds.length > 1 ? 's' : ''}</p>
        </div>
      </div>

      <div className="bg-[#111] border border-white/[0.06] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.05]">
              <th className="text-left px-5 py-3.5 text-xs text-white/30 font-medium uppercase tracking-wider">Serveur</th>
              <th className="text-left px-5 py-3.5 text-xs text-white/30 font-medium uppercase tracking-wider">Discord ID</th>
              <th className="text-left px-5 py-3.5 text-xs text-white/30 font-medium uppercase tracking-wider">Channel</th>
              <th className="text-left px-5 py-3.5 text-xs text-white/30 font-medium uppercase tracking-wider">Ligues actives</th>
              <th className="text-left px-5 py-3.5 text-xs text-white/30 font-medium uppercase tracking-wider">Ajouté</th>
            </tr>
          </thead>
          <tbody>
            {guilds.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-12 text-center text-sm text-white/20">
                  Aucun serveur enregistré.
                </td>
              </tr>
            )}
            {guilds.map((guild, i) => (
              <tr
                key={guild.id}
                className={`border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors ${
                  i === guilds.length - 1 ? 'border-b-0' : ''
                }`}
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center text-xs text-white/40 font-medium shrink-0">
                      {guild.name?.[0]?.toUpperCase() ?? '?'}
                    </div>
                    <span className="text-white font-medium">{guild.name ?? 'Serveur inconnu'}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <code className="text-xs text-white/30 bg-white/[0.04] px-2 py-1 rounded">
                    {guild.discordId}
                  </code>
                </td>
                <td className="px-5 py-4">
                  {guild.predictionChannelId ? (
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400/80 bg-emerald-400/[0.08] px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      Configuré
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs text-white/25 bg-white/[0.04] px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/20 shrink-0" />
                      Non configuré
                    </span>
                  )}
                </td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-1.5">
                    {guild.enabledLeagues.length === 0 ? (
                      <span className="text-xs text-white/20">—</span>
                    ) : (
                      guild.enabledLeagues.map((l) => (
                        <span
                          key={l.slug}
                          className="text-xs text-white/50 bg-white/[0.05] border border-white/[0.07] px-2 py-0.5 rounded-full"
                        >
                          {l.name}
                        </span>
                      ))
                    )}
                  </div>
                </td>
                <td className="px-5 py-4 text-xs text-white/25">
                  {formatDistanceToNow(new Date(guild.createdAt), { addSuffix: true, locale: fr })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
