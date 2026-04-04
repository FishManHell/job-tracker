import { prisma }                                  from "@/lib/prisma";
import { STATUS_CONFIG }                           from "@/lib/status-config";
import { ApplicationStatus }                       from "@/types/application";
import { InterviewType }                           from "@/types/interview";
import type {
  MonthlyPoint, StatusSlice, InterviewTypePoint,
  TopCompanyPoint, AnalyticsData,
} from "@/types/analytics";

// ─── Prisma row types ─────────────────────────────────────────────────────────

interface AppRow         { id: string; status: string; appliedAt: Date }
interface InterviewRow   { applicationId: string; scheduledAt: Date }
interface InterviewCount { type: string; _count: { _all: number } }
interface CompanyGroup   { companyName: string; _count: { _all: number } }

// ─── Constants ────────────────────────────────────────────────────────────────

const INTERVIEW_TYPE_LABEL = {
  PHONE:         "Phone",
  HR:            "HR",
  TECHNICAL:     "Technical",
  SYSTEM_DESIGN: "System Design",
  BEHAVIORAL:    "Behavioral",
  FINAL:         "Final",
  OTHER:         "Other",
} as const satisfies Record<InterviewType, string>;

const MS_PER_DAY = 86_400_000;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function monthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function formatMonthLabel(key: string): Pick<MonthlyPoint, "month" | "fullMonth"> {
  const [year, month] = key.split("-").map(Number);
  const d = new Date(year, month - 1, 1);
  return {
    month:     d.toLocaleDateString("en-US", { month: "short" }),
    fullMonth: d.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
  };
}

function toRate(value: number, total: number): number {
  return total > 0 ? Math.round((value / total) * 100) : 0;
}

// ─── Builders ─────────────────────────────────────────────────────────────────

function buildAppsOverTime(apps: AppRow[]): MonthlyPoint[] {
  const now      = new Date();
  const monthMap = new Map<string, number>();

  for (let i = 11; i >= 0; i--) {
    monthMap.set(monthKey(new Date(now.getFullYear(), now.getMonth() - i, 1)), 0);
  }
  for (const app of apps) {
    const key = monthKey(app.appliedAt);
    if (monthMap.has(key)) monthMap.set(key, monthMap.get(key)! + 1);
  }

  // Map preserves insertion order — already chronological, no sort needed
  return Array.from(monthMap.entries())
    .map(([key, count]) => ({ ...formatMonthLabel(key), count }));
}

function buildStatusBreakdown(apps: AppRow[]): StatusSlice[] {
  const countMap = new Map<string, number>();
  for (const app of apps) {
    countMap.set(app.status, (countMap.get(app.status) ?? 0) + 1);
  }

  return Object.values(ApplicationStatus)
    .map(s => ({
      label: STATUS_CONFIG[s].label as string,
      count: countMap.get(s) ?? 0,
      color: STATUS_CONFIG[s].dotColor as string,
    }))
    .filter(s => s.count > 0);
}

function buildInterviewTypes(counts: InterviewCount[]): InterviewTypePoint[] {
  return counts.map(r => ({
    type:  INTERVIEW_TYPE_LABEL[r.type as InterviewType] ?? r.type,
    count: r._count._all,
  }));
}

function buildTopCompanies(groups: CompanyGroup[]): TopCompanyPoint[] {
  return groups.map(r => ({ company: r.companyName, count: r._count._all }));
}

function buildConversionRates(apps: AppRow[], interviews: InterviewRow[]) {
  const total = apps.length;
  let responded = 0;
  let offered   = 0;

  for (const { status } of apps) {
    if (status !== ApplicationStatus.APPLIED) responded++;
    if (status === ApplicationStatus.OFFER)   offered++;
  }

  const interviewed = new Set(interviews.map(i => i.applicationId)).size;

  return {
    responseRate:  toRate(responded,   total),
    interviewRate: toRate(interviewed, total),
    offerRate:     toRate(offered,     total),
  };
}

function buildAvgDays(apps: AppRow[], interviews: InterviewRow[]): number | null {
  const firstInterviewByApp = new Map<string, Date>();
  for (const i of interviews) {
    const existing = firstInterviewByApp.get(i.applicationId);
    if (!existing || i.scheduledAt < existing) {
      firstInterviewByApp.set(i.applicationId, i.scheduledAt);
    }
  }

  const appById = new Map(apps.map(a => [a.id, a]));
  let totalDays = 0;
  let count     = 0;

  for (const [appId, firstDate] of firstInterviewByApp) {
    const app  = appById.get(appId);
    if (!app) continue;
    const days = (firstDate.getTime() - app.appliedAt.getTime()) / MS_PER_DAY;
    if (days >= 0) { totalDays += days; count++; }
  }

  return count > 0 ? Math.round(totalDays / count) : null;
}

// ─── Main query ───────────────────────────────────────────────────────────────

export async function getAnalyticsData(userId: string): Promise<AnalyticsData> {
  const [apps, interviews, interviewTypeCounts, companyGroups] = await Promise.all([
    prisma.application.findMany({
      where:   { userId },
      select:  { id: true, status: true, appliedAt: true },
      orderBy: { appliedAt: "asc" },
    }),
    prisma.interview.findMany({
      where:  { application: { userId } },
      select: { applicationId: true, scheduledAt: true },
    }),
    prisma.interview.groupBy({
      by:     ["type"],
      where:  { application: { userId } },
      _count: { _all: true },
    }),
    prisma.application.groupBy({
      by:      ["companyName"],
      where:   { userId },
      _count:  { _all: true },
      orderBy: { _count: { companyName: "desc" } },
      take:    5,
    }),
  ]);

  return {
    applicationsOverTime:    buildAppsOverTime(apps),
    statusBreakdown:         buildStatusBreakdown(apps),
    interviewTypes:          buildInterviewTypes(interviewTypeCounts),
    topCompanies:            buildTopCompanies(companyGroups),
    totalApplications:       apps.length,
    avgDaysToFirstInterview: buildAvgDays(apps, interviews),
    ...buildConversionRates(apps, interviews),
  };
}
