import type {ApplicationStatus, StatusConfig } from "@/types/application";
import { StatusLabel } from "@/types/application";
import { AntdTagColor } from "@/types/common";

export const STATUS_CONFIG: Record<ApplicationStatus, StatusConfig> = {
  APPLIED:   { label: StatusLabel.APPLIED,   tagColor: AntdTagColor.BLUE,    dotColor: "#3b82f6" },
  SCREENING: { label: StatusLabel.SCREENING, tagColor: AntdTagColor.PURPLE,  dotColor: "#8b5cf6" },
  INTERVIEW: { label: StatusLabel.INTERVIEW, tagColor: AntdTagColor.ORANGE,  dotColor: "#f59e0b" },
  OFFER:     { label: StatusLabel.OFFER,     tagColor: AntdTagColor.GREEN,   dotColor: "#10b981" },
  REJECTED:  { label: StatusLabel.REJECTED,  tagColor: AntdTagColor.RED,     dotColor: "#ef4444" },
  WITHDRAWN: { label: StatusLabel.WITHDRAWN, tagColor: AntdTagColor.DEFAULT, dotColor: "#6b7280" },
};

// Ready-to-use array for Select options
export const STATUS_OPTIONS = (
  Object.entries(STATUS_CONFIG) as [ApplicationStatus, StatusConfig][]
).map(([value, config]) => ({ value, ...config }));
