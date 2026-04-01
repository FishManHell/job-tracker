import { auth } from "@/lib/auth";
import { getApplicationStats, getRecentApplications } from "@/lib/data/applications";
import StatsCard from "@/components/dashboard/StatsCard";
import RecentApplications from "@/components/dashboard/RecentApplications";
import PipelineOverview from "@/components/dashboard/PipelineOverview";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default async function DashboardPage() {
  const session = await auth();
  const userId  = session!.user!.id!;

  // Run both queries in parallel
  const [stats, recentApps] = await Promise.all([
    getApplicationStats(userId),
    getRecentApplications(userId),
  ]);

  const statCards = [
    { value: stats.total,     label: "Total Applied",  sub: `+${stats.applied} applied`,       borderColor: "#6366f1", subColor: "#6366f1" },
    { value: stats.interview + stats.screening, label: "In Progress", sub: "Active pipeline",   borderColor: "#3b82f6", subColor: "#3b82f6" },
    { value: stats.interview, label: "Interviews",     sub: `Screening: ${stats.screening}`,    borderColor: "#f59e0b", subColor: "#f59e0b" },
    { value: stats.offer,     label: "Offers",         sub: `Rejected: ${stats.rejected}`,      borderColor: "#10b981", subColor: "#10b981" },
  ];

  return (
    <div className="p-8">
      <DashboardHeader />

      <div className="grid grid-cols-4 gap-4 mb-6">
        {statCards.map((s) => (
          <StatsCard key={s.label} {...s} />
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
