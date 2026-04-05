import type { AntdTagColor, HexColor, Currency } from "@/types/common";

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

export const ProfileStat = {
  TOTAL:     "total",
  INTERVIEW: "interview",
  OFFER:     "offer",
  REJECTED:  "rejected",
} as const;
export type ProfileStat = typeof ProfileStat[keyof typeof ProfileStat];

export const ProfileStatLabel = {
  TOTAL:     "Applications",
  INTERVIEW: "Interviews",
  OFFER:     "Offers",
  REJECTED:  "Rejected",
} as const;
export type ProfileStatLabel = typeof ProfileStatLabel[keyof typeof ProfileStatLabel];

export interface ProfileStatConfig {
  key:   ProfileStat;
  label: ProfileStatLabel;
  color: HexColor;
}

export interface SerializedApplication {
  id:          string;
  userId:      string;
  companyId:   string;
  companyName: string;
  position:    string;
  status:      ApplicationStatus;
  salaryMin:   number | null;
  salaryMax:   number | null;
  currency:    Currency;
  location:    string | null;
  remote:      boolean;
  jobUrl:      string | null;
  notes:       string | null;
  appliedAt:   string;
  nextStep:    string | null;
  createdAt:   string;
  updatedAt:   string;
}

export interface AddApplicationFormValues {
  companyName: string;
  position:    string;
  status:      ApplicationStatus;
  location?:   string;
  remote:      boolean;
  currency:    Currency;
  salaryMin?:  number;
  salaryMax?:  number;
  jobUrl?:     string;
  notes?:      string;
}
