import type { CompanyStats } from "@/lib/data/companies";
import type { HexColor } from "@/types/common";

export interface CompanyStatCardConfig {
  label:       string;
  borderColor: HexColor;
  subColor:    HexColor;
  getValue: (s: CompanyStats) => number;
  getSub:   (s: CompanyStats) => string;
}

export const COMPANY_STAT_CARDS: CompanyStatCardConfig[] = [
  {
    label:       "Total Companies",
    borderColor: "#6366f1",
    subColor:    "#6366f1",
    getValue: (s) => s.total,
    getSub:   (s) => s.total > 0 ? `${s.avgApplications} avg applications` : "Add your first company",
  },
  {
    label:       "Active",
    borderColor: "#3b82f6",
    subColor:    "#3b82f6",
    getValue: (s) => s.active,
    getSub:   (s) => s.total > 0 ? `${Math.round((s.active / s.total) * 100)}% of companies` : "No data yet",
  },
  {
    label:       "With Offer",
    borderColor: "#10b981",
    subColor:    "#10b981",
    getValue: (s) => s.withOffer,
    getSub:   ()  => "Awaiting decision",
  },
  {
    label:       "Avg Applications",
    borderColor: "#f59e0b",
    subColor:    "#f59e0b",
    getValue: (s) => s.avgApplications,
    getSub:   (s) => s.total > 0 ? "per company" : "No data yet",
  },
];
