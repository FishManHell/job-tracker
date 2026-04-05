import type { CompanyStats } from "@/lib/data/companies";
import type { StatCardConfig } from "@/types/stat-card";
import { COLORS } from "@/lib/colors";

type CompanyStatCardConfig = StatCardConfig<CompanyStats>;

export const COMPANY_STAT_CARDS: CompanyStatCardConfig[] = [
  {
    label:       "Total Companies",
    borderColor: COLORS.primary,
    subColor:    COLORS.primary,
    getValue: (s) => s.total,
    getSub:   (s) => s.total > 0 ? `${s.avgApplications} avg applications` : "Add your first company",
  },
  {
    label:       "Active",
    borderColor: COLORS.info,
    subColor:    COLORS.info,
    getValue: (s) => s.active,
    getSub:   (s) => s.total > 0 ? `${Math.round((s.active / s.total) * 100)}% of companies` : "No data yet",
  },
  {
    label:       "With Offer",
    borderColor: COLORS.success,
    subColor:    COLORS.success,
    getValue: (s) => s.withOffer,
    getSub:   ()  => "Awaiting decision",
  },
  {
    label:       "Avg Applications",
    borderColor: COLORS.warning,
    subColor:    COLORS.warning,
    getValue: (s) => s.avgApplications,
    getSub:   (s) => s.total > 0 ? "per company" : "No data yet",
  },
];
