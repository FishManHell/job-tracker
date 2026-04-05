import type { AnalyticsData } from "@/types/analytics";
import { COLORS }              from "@/lib/colors";

export interface KpiConfig {
  label:       string;
  suffix:      string;
  accentColor: string;
  subLabel:    string;
  getValue:    (d: AnalyticsData) => number;
}

export const KPI_CONFIG: readonly KpiConfig[] = [
  {
    label:       "Total Applications",
    suffix:      "",
    accentColor: COLORS.primary,
    subLabel:    "All time",
    getValue:    d => d.totalApplications,
  },
  {
    label:       "Response Rate",
    suffix:      "%",
    accentColor: COLORS.info,
    subLabel:    "Moved past Applied",
    getValue:    d => d.responseRate,
  },
  {
    label:       "Interview Rate",
    suffix:      "%",
    accentColor: COLORS.warning,
    subLabel:    "Got at least 1 interview",
    getValue:    d => d.interviewRate,
  },
  {
    label:       "Offer Rate",
    suffix:      "%",
    accentColor: COLORS.success,
    subLabel:    "Received an offer",
    getValue:    d => d.offerRate,
  },
];
