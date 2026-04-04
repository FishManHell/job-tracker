import type { AnalyticsData } from "@/types/analytics";

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
    accentColor: "#6366f1",
    subLabel:    "All time",
    getValue:    d => d.totalApplications,
  },
  {
    label:       "Response Rate",
    suffix:      "%",
    accentColor: "#3b82f6",
    subLabel:    "Moved past Applied",
    getValue:    d => d.responseRate,
  },
  {
    label:       "Interview Rate",
    suffix:      "%",
    accentColor: "#f59e0b",
    subLabel:    "Got at least 1 interview",
    getValue:    d => d.interviewRate,
  },
  {
    label:       "Offer Rate",
    suffix:      "%",
    accentColor: "#10b981",
    subLabel:    "Received an offer",
    getValue:    d => d.offerRate,
  },
];
