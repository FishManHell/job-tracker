export interface SerializedInterview {
  id:            string;
  applicationId: string;
  type:          InterviewType;
  scheduledAt:   string;
  durationMins:  number | null;
  location:      string | null;
  notes:         string | null;
  result:        InterviewResult;
  companyName:   string;
  position:      string;
}

export const InterviewType = {
  PHONE:         "PHONE",
  HR:            "HR",
  TECHNICAL:     "TECHNICAL",
  SYSTEM_DESIGN: "SYSTEM_DESIGN",
  BEHAVIORAL:    "BEHAVIORAL",
  FINAL:         "FINAL",
  OTHER:         "OTHER",
} as const;
export type InterviewType = typeof InterviewType[keyof typeof InterviewType];

export const InterviewResult = {
  PENDING: "PENDING",
  PASSED:  "PASSED",
  FAILED:  "FAILED",
} as const;
export type InterviewResult = typeof InterviewResult[keyof typeof InterviewResult];
