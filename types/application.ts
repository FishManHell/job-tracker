import type { AntdTagColor, HexColor } from "@/types/common";

export const ApplicationStatus = {
  APPLIED:   "APPLIED",
  SCREENING: "SCREENING",
  INTERVIEW: "INTERVIEW",
  OFFER:     "OFFER",
  REJECTED:  "REJECTED",
  WITHDRAWN: "WITHDRAWN",
} as const;
export type ApplicationStatus = typeof ApplicationStatus[keyof typeof ApplicationStatus];

export const StatusLabel = {
  APPLIED:   "Applied",
  SCREENING: "Screening",
  INTERVIEW: "Interview",
  OFFER:     "Offer",
  REJECTED:  "Rejected",
  WITHDRAWN: "Withdrawn",
} as const;
export type StatusLabel = typeof StatusLabel[keyof typeof StatusLabel];

export interface StatusConfig {
  label:    StatusLabel;
  tagColor: AntdTagColor;
  dotColor: HexColor;
}

export interface AddApplicationFormValues {
  companyName: string;
  position:    string;
  status:      ApplicationStatus;
  location?:   string;
  remote:      boolean;
  currency:    string;
  salaryMin?:  number;
  salaryMax?:  number;
  jobUrl?:     string;
  notes?:      string;
}
