import type { ApplicationStats } from "@/lib/data/applications";
import type { StatCardConfig } from "@/types/stat-card";
import { COLORS } from "@/lib/colors";

export const StatCardLabel = {
  TOTAL_APPLIED: "Total Applied",
  IN_PROGRESS:   "In Progress",
  INTERVIEWS:    "Interviews",
  OFFERS:        "Offers",
} as const;
export type StatCardLabel = typeof StatCardLabel[keyof typeof StatCardLabel];

type DashboardStatCardConfig = StatCardConfig<ApplicationStats, StatCardLabel>;

export const STAT_CARDS: DashboardStatCardConfig[] = [
  {
    label:       StatCardLabel.TOTAL_APPLIED,
    borderColor: COLORS.primary,
    subColor:    COLORS.primary,
    getValue: (s) => s.total,
    getSub:   (s) => `+${s.applied} applied`,
  },
  {
    label:       StatCardLabel.IN_PROGRESS,
    borderColor: COLORS.info,
    subColor:    COLORS.info,
    getValue: (s) => s.interview + s.screening,
    getSub:   ()  => "Active pipeline",
  },
  {
    label:       StatCardLabel.INTERVIEWS,
    borderColor: COLORS.warning,
    subColor:    COLORS.warning,
    getValue: (s) => s.interview,
    getSub:   (s) => `Screening: ${s.screening}`,
  },
  {
    label:       StatCardLabel.OFFERS,
    borderColor: COLORS.success,
    subColor:    COLORS.success,
    getValue: (s) => s.offer,
    getSub:   (s) => `Rejected: ${s.rejected}`,
  },
];
