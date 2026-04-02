import type { ApplicationStats } from "@/lib/data/applications";
import type { HexColor } from "@/types/common";

export const StatCardLabel = {
  TOTAL_APPLIED: "Total Applied",
  IN_PROGRESS:   "In Progress",
  INTERVIEWS:    "Interviews",
  OFFERS:        "Offers",
} as const;
export type StatCardLabel = typeof StatCardLabel[keyof typeof StatCardLabel];

export interface StatCardConfig {
  label:       StatCardLabel;
  borderColor: HexColor;
  subColor:    HexColor;
  getValue: (stats: ApplicationStats) => number;
  getSub:   (stats: ApplicationStats) => string;
}

export const STAT_CARDS: StatCardConfig[] = [
  {
    label:       StatCardLabel.TOTAL_APPLIED,
    borderColor: "#6366f1",
    subColor:    "#6366f1",
    getValue: (s) => s.total,
    getSub:   (s) => `+${s.applied} applied`,
  },
  {
    label:       StatCardLabel.IN_PROGRESS,
    borderColor: "#3b82f6",
    subColor:    "#3b82f6",
    getValue: (s) => s.interview + s.screening,
    getSub:   ()  => "Active pipeline",
  },
  {
    label:       StatCardLabel.INTERVIEWS,
    borderColor: "#f59e0b",
    subColor:    "#f59e0b",
    getValue: (s) => s.interview,
    getSub:   (s) => `Screening: ${s.screening}`,
  },
  {
    label:       StatCardLabel.OFFERS,
    borderColor: "#10b981",
    subColor:    "#10b981",
    getValue: (s) => s.offer,
    getSub:   (s) => `Rejected: ${s.rejected}`,
  },
];
