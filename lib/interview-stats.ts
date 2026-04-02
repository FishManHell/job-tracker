import type { InterviewStats } from "@/lib/data/interviews";
import type { HexColor } from "@/types/common";

export const InterviewStatLabel = {
  TOTAL:    "Total Interviews",
  UPCOMING: "Upcoming",
  PASSED:   "Passed",
  FAILED:   "Failed",
} as const;
export type InterviewStatLabel = typeof InterviewStatLabel[keyof typeof InterviewStatLabel];

export interface InterviewStatCardConfig {
  label:       InterviewStatLabel;
  borderColor: HexColor;
  subColor:    HexColor;
  getValue: (stats: InterviewStats) => number;
  getSub:   (stats: InterviewStats) => string;
}

export const INTERVIEW_STAT_CARDS: InterviewStatCardConfig[] = [
  {
    label:       InterviewStatLabel.TOTAL,
    borderColor: "#6366f1",
    subColor:    "#6366f1",
    getValue: (s) => s.total,
    getSub:   (s) => `${s.upcoming} upcoming`,
  },
  {
    label:       InterviewStatLabel.UPCOMING,
    borderColor: "#3b82f6",
    subColor:    "#3b82f6",
    getValue: (s) => s.upcoming,
    getSub:   ()  => "Scheduled ahead",
  },
  {
    label:       InterviewStatLabel.PASSED,
    borderColor: "#10b981",
    subColor:    "#10b981",
    getValue: (s) => s.passed,
    getSub:   (s) => s.total > 0
      ? `${Math.round((s.passed / s.total) * 100)}% success rate`
      : "No data yet",
  },
  {
    label:       InterviewStatLabel.FAILED,
    borderColor: "#ef4444",
    subColor:    "#ef4444",
    getValue: (s) => s.failed,
    getSub:   (s) => s.total > 0
      ? `${Math.round((s.failed / s.total) * 100)}% rejection rate`
      : "No data yet",
  },
];
