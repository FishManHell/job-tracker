export const ApplicationStatus = {
  APPLIED:   "APPLIED",
  SCREENING: "SCREENING",
  INTERVIEW: "INTERVIEW",
  OFFER:     "OFFER",
  REJECTED:  "REJECTED",
  WITHDRAWN: "WITHDRAWN",
} as const;
export type ApplicationStatus = typeof ApplicationStatus[keyof typeof ApplicationStatus];

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
