import { fetchAdmin } from '@/lib/admin-api';

type GuildsResponse = {
  guilds: {
    id: string;
    discordId: string;
    name: string | null;
    predictionChannelId: string | null;
    enabledLeagues: { name: string; slug: string }[];
    createdAt: string;
  }[];
  total: number;
};

export default async function AdminDashboard() {
  const data = await fetchAdmin<GuildsResponse>('/guilds');

  const total = data?.total ?? 0;
  const withChannel = data?.guilds.filter((g) => g.predictionChannelId).length ?? 0;
  const withLeagues = data?.guilds.filter((g) => g.enabledLeagues.length > 0).length ?? 0;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-white/30">Vue d&apos;ensemble de Bananalyz</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Serveurs" value={total} />
        <StatCard label="Channel configuré" value={withChannel} />
        <StatCard label="Avec une ligue activée" value={withLeagues} />
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-[#111] border border-white/[0.06] rounded-xl p-5">
      <p className="text-xs text-white/30 uppercase tracking-wider mb-2">{label}</p>
      <p className="text-3xl font-semibold text-white tabular-nums">{value}</p>
    </div>
  );
}
