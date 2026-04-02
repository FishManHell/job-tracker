import { auth } from "@/lib/auth";
import { getInterviews, getInterviewStats } from "@/lib/data/interviews";
import { getApplicationsList } from "@/lib/data/applications";
import { INTERVIEW_STAT_CARDS } from "@/lib/interview-stats";
import StatsCard from "@/components/dashboard/StatsCard";
import InterviewsTable from "@/components/interviews/InterviewsTable";
import AddInterviewButton from "@/components/interviews/AddInterviewButton";

async function InterviewsPage() {
  const session = await auth();
  const userId  = session!.user!.id!;

  const [interviews, stats, applications] = await Promise.all([
    getInterviews(userId),
    getInterviewStats(userId),
    getApplicationsList(userId),
  ]);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Interviews</h1>
          <p className="text-gray-500 text-sm mt-1">
            {stats.total} total interview{stats.total !== 1 ? "s" : ""}
          </p>
        </div>
        <AddInterviewButton applications={applications} />
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {INTERVIEW_STAT_CARDS.map((c) => (
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

      <InterviewsTable interviews={interviews} applications={applications} />
    </div>
  );
}

export default InterviewsPage;
