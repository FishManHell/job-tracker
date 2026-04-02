import type { StatusConfig } from "@/types/application";
import { ApplicationStatus, StatusLabel } from "@/types/application";
import { AntdTagColor } from "@/types/common";

export const STATUS_CONFIG = {
  APPLIED:   { label: StatusLabel.APPLIED,   tagColor: AntdTagColor.BLUE,    dotColor: "#3b82f6" },
  SCREENING: { label: StatusLabel.SCREENING, tagColor: AntdTagColor.PURPLE,  dotColor: "#8b5cf6" },
  INTERVIEW: { label: StatusLabel.INTERVIEW, tagColor: AntdTagColor.ORANGE,  dotColor: "#f59e0b" },
  OFFER:     { label: StatusLabel.OFFER,     tagColor: AntdTagColor.GREEN,   dotColor: "#10b981" },
  REJECTED:  { label: StatusLabel.REJECTED,  tagColor: AntdTagColor.RED,     dotColor: "#ef4444" },
  WITHDRAWN: { label: StatusLabel.WITHDRAWN, tagColor: AntdTagColor.DEFAULT, dotColor: "#6b7280" },
} satisfies Record<ApplicationStatus, StatusConfig>;

// Ready-to-use array for Select option labels (value + label only)
export const STATUS_SELECT_OPTIONS = Object.values(ApplicationStatus).map(
  (value) => ({ value, label: STATUS_CONFIG[value].label })
);
