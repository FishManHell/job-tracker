import type { InterviewStats } from "@/lib/data/interviews";
import type { StatCardConfig } from "@/types/stat-card";
import { COLORS } from "@/lib/colors";

export const InterviewStatLabel = {
  TOTAL:    "Total Interviews",
  UPCOMING: "Upcoming",
  PASSED:   "Passed",
  FAILED:   "Failed",
} as const;
export type InterviewStatLabel = typeof InterviewStatLabel[keyof typeof InterviewStatLabel];

type InterviewStatCardConfig = StatCardConfig<InterviewStats, InterviewStatLabel>;

export const INTERVIEW_STAT_CARDS: InterviewStatCardConfig[] = [
  {
    label:       InterviewStatLabel.TOTAL,
    borderColor: COLORS.primary,
    subColor:    COLORS.primary,
    getValue: (s) => s.total,
    getSub:   (s) => `${s.upcoming} upcoming`,
  },
  {
    label:       InterviewStatLabel.UPCOMING,
    borderColor: COLORS.info,
    subColor:    COLORS.info,
    getValue: (s) => s.upcoming,
    getSub:   ()  => "Scheduled ahead",
  },
  {
    label:       InterviewStatLabel.PASSED,
    borderColor: COLORS.success,
    subColor:    COLORS.success,
    getValue: (s) => s.passed,
    getSub:   (s) => s.total > 0
      ? `${Math.round((s.passed / s.total) * 100)}% success rate`
      : "No data yet",
  },
  {
    label:       InterviewStatLabel.FAILED,
    borderColor: COLORS.error,
    subColor:    COLORS.error,
    getValue: (s) => s.failed,
    getSub:   (s) => s.total > 0
      ? `${Math.round((s.failed / s.total) * 100)}% rejection rate`
      : "No data yet",
  },
];
