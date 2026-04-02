import { auth } from "@/lib/auth";
import { getApplicationStats, getRecentApplications } from "@/lib/data/applications";
import { STAT_CARDS } from "@/lib/dashboard-stats";
import StatsCard from "@/components/dashboard/StatsCard";
import RecentApplications from "@/components/dashboard/RecentApplications";
import PipelineOverview from "@/components/dashboard/PipelineOverview";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default async function DashboardPage() {
  const session = await auth();
  const userId  = session!.user!.id!;
  const name    = session!.user!.name ?? "there";

  // Run both queries in parallel
  const [stats, recentApps] = await Promise.all([
    getApplicationStats(userId),
    getRecentApplications(userId),
  ]);

  return (
    <div className="p-8">
      <DashboardHeader name={name} />

      <div className="grid grid-cols-4 gap-4 mb-6">
        {STAT_CARDS.map((c) => (
          <StatsCard
            key={c.label}
            label={c.label}
            value={c.getValue(stats)}
            sub={c.getSub(stats)}
            borderColor={c.borderColor}
            subColor={c.subColor}
          />
        ))}
      </div>

      <div className="flex gap-5">
        <div className="flex-1 min-w-0">
          <RecentApplications applications={recentApps} />
        </div>
        <div className="w-72 shrink-0">
          <PipelineOverview stats={stats} />
        </div>
      </div>
    </div>
  );
}
