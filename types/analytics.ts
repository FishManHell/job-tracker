export interface MonthlyPoint {
  month:     string; // "Jan"
  fullMonth: string; // "January 2025"
  count:     number;
}

export interface StatusSlice {
  label: string;
  count: number;
  color: string;
}

export interface InterviewTypePoint {
  type:  string;
  count: number;
}

export interface TopCompanyPoint {
  company: string;
  count:   number;
}

export interface AnalyticsData {
  applicationsOverTime:    MonthlyPoint[];
  statusBreakdown:         StatusSlice[];
  interviewTypes:          InterviewTypePoint[];
  topCompanies:            TopCompanyPoint[];
  totalApplications:       number;
  responseRate:            number; // 0–100
  interviewRate:           number; // 0–100
  offerRate:               number; // 0–100
  avgDaysToFirstInterview: number | null;
}
