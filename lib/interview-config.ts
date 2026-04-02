import { AntdTagColor } from "@/types/common";
import type { InterviewType, InterviewResult } from "@/types/interview";
import type { HexColor } from "@/types/common";

export interface InterviewTypeConfig {
  label:    string;
  tagColor: AntdTagColor;
}

export interface InterviewResultConfig {
  label:    string;
  tagColor: AntdTagColor;
  dotColor: HexColor;
}

export const INTERVIEW_TYPE_CONFIG = {
  PHONE:         { label: "Phone Screen",  tagColor: AntdTagColor.BLUE    },
  HR:            { label: "HR",            tagColor: AntdTagColor.PURPLE  },
  TECHNICAL:     { label: "Technical",     tagColor: AntdTagColor.ORANGE  },
  SYSTEM_DESIGN: { label: "System Design", tagColor: AntdTagColor.GOLD    },
  BEHAVIORAL:    { label: "Behavioral",    tagColor: AntdTagColor.CYAN    },
  FINAL:         { label: "Final Round",   tagColor: AntdTagColor.RED     },
  OTHER:         { label: "Other",         tagColor: AntdTagColor.DEFAULT },
} satisfies Record<InterviewType, InterviewTypeConfig>;

export const INTERVIEW_RESULT_CONFIG = {
  PENDING: { label: "Pending", tagColor: AntdTagColor.DEFAULT, dotColor: "#6b7280" },
  PASSED:  { label: "Passed",  tagColor: AntdTagColor.GREEN,   dotColor: "#10b981" },
  FAILED:  { label: "Failed",  tagColor: AntdTagColor.RED,     dotColor: "#ef4444" },
} satisfies Record<InterviewResult, InterviewResultConfig>;
