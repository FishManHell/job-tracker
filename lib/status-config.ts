import type { StatusConfig } from "@/types/application";
import { ApplicationStatus, StatusLabel } from "@/types/application";
import { AntdTagColor } from "@/types/common";
import { COLORS } from "@/lib/colors";

export const STATUS_CONFIG = {
  APPLIED:   { label: StatusLabel.APPLIED,   tagColor: AntdTagColor.BLUE,    dotColor: COLORS.info    },
  SCREENING: { label: StatusLabel.SCREENING, tagColor: AntdTagColor.PURPLE,  dotColor: COLORS.purple  },
  INTERVIEW: { label: StatusLabel.INTERVIEW, tagColor: AntdTagColor.ORANGE,  dotColor: COLORS.warning },
  OFFER:     { label: StatusLabel.OFFER,     tagColor: AntdTagColor.GREEN,   dotColor: COLORS.success },
  REJECTED:  { label: StatusLabel.REJECTED,  tagColor: AntdTagColor.RED,     dotColor: COLORS.error   },
  WITHDRAWN: { label: StatusLabel.WITHDRAWN, tagColor: AntdTagColor.DEFAULT, dotColor: COLORS.muted   },
} satisfies Record<ApplicationStatus, StatusConfig>;

// Ready-to-use array for Select option labels (value + label only)
export const STATUS_SELECT_OPTIONS = Object.values(ApplicationStatus).map(
  (value) => ({ value, label: STATUS_CONFIG[value].label })
);
