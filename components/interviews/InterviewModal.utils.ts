import dayjs, { type Dayjs } from "dayjs";
import { InterviewType, InterviewResult } from "@/types/interview";
import { INTERVIEW_TYPE_CONFIG, INTERVIEW_RESULT_CONFIG } from "@/lib/interview-config";
import type { SerializedInterview } from "@/lib/data/interviews";

export interface AddInterviewFormValues {
  applicationId: string;
  type:          InterviewType;
  scheduledAt:   Dayjs;
  durationMins?: number;
  location?:     string;
  notes?:        string;
  result:        InterviewResult;
}

export const ADD_DEFAULTS: Partial<AddInterviewFormValues> = {
  type:   InterviewType.TECHNICAL,
  result: InterviewResult.PENDING,
};

export const INTERVIEW_TYPE_SELECT_OPTIONS = Object.values(InterviewType).map(
  (value) => ({ value, label: INTERVIEW_TYPE_CONFIG[value].label })
);

export const INTERVIEW_RESULT_SELECT_OPTIONS = Object.values(InterviewResult).map(
  (value) => ({ value, label: INTERVIEW_RESULT_CONFIG[value].label })
);

export function toFormValues(interview: SerializedInterview): AddInterviewFormValues {
  return {
    applicationId: interview.applicationId,
    type:          interview.type,
    scheduledAt:   dayjs(interview.scheduledAt),
    durationMins:  interview.durationMins ?? undefined,
    location:      interview.location     ?? undefined,
    notes:         interview.notes        ?? undefined,
    result:        interview.result,
  };
}
