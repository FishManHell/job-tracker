import { prisma } from "@/lib/prisma";
import type { InterviewType, InterviewResult } from "@/types/interview";

export type SerializedInterview = {
  id:            string;
  applicationId: string;
  type:          InterviewType;
  scheduledAt:   string;
  durationMins:  number | null;
  location:      string | null;
  notes:         string | null;
  result:        InterviewResult;
  companyName:   string;
  position:      string;
};

export interface InterviewStats {
  total:    number;
  upcoming: number;
  passed:   number;
  failed:   number;
}

export async function getInterviews(userId: string): Promise<SerializedInterview[]> {
  const rows = await prisma.interview.findMany({
    where:   { application: { userId } },
    include: { application: { select: { companyName: true, position: true } } },
    orderBy: { scheduledAt: "desc" },
  });

  return rows.map((i) => ({
    id:            i.id,
    applicationId: i.applicationId,
    type:          i.type          as InterviewType,
    scheduledAt:   i.scheduledAt.toISOString(),
    durationMins:  i.durationMins,
    location:      i.location,
    notes:         i.notes,
    result:        i.result        as InterviewResult,
    companyName:   i.application.companyName,
    position:      i.application.position,
  }));
}

export async function getInterviewStats(userId: string): Promise<InterviewStats> {
  const [resultCounts, upcoming] = await Promise.all([
    prisma.interview.groupBy({
      by:     ["result"],
      where:  { application: { userId } },
      _count: { _all: true },
    }),
    prisma.interview.count({
      where: {
        application: { userId },
        scheduledAt: { gte: new Date() },
        result:      "PENDING",
      },
    }),
  ]);

  const map   = Object.fromEntries(resultCounts.map((r) => {
    return [r.result, r._count._all]
  }));
  const total = resultCounts.reduce((acc, r) => {
    return acc + r._count._all
  }, 0);

  return {
    total,
    upcoming,
    passed: map["PASSED"] ?? 0,
    failed: map["FAILED"] ?? 0,
  };
}
