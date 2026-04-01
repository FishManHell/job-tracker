import type { ApplicationStatus } from "@/types/application";

export type StatusConfig = {
  label:    string;
  tagColor: string; // antd Tag color prop
  dotColor: string; // hex for dot indicators in Select etc.
};

export const STATUS_CONFIG: Record<ApplicationStatus, StatusConfig> = {
  APPLIED:   { label: "Applied",   tagColor: "blue",    dotColor: "#3b82f6" },
  SCREENING: { label: "Screening", tagColor: "purple",  dotColor: "#8b5cf6" },
  INTERVIEW: { label: "Interview", tagColor: "orange",  dotColor: "#f59e0b" },
  OFFER:     { label: "Offer",     tagColor: "green",   dotColor: "#10b981" },
  REJECTED:  { label: "Rejected",  tagColor: "red",     dotColor: "#ef4444" },
  WITHDRAWN: { label: "Withdrawn", tagColor: "default", dotColor: "#6b7280" },
};

// Ready-to-use array for Select options
export const STATUS_OPTIONS = (
  Object.entries(STATUS_CONFIG) as [ApplicationStatus, StatusConfig][]
).map(([value, config]) => ({ value, ...config }));
