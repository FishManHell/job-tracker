import { ProfileStat, ProfileStatLabel } from "@/types/application";
import type { ProfileStatConfig } from "@/types/application";

export const PROFILE_STATS: ProfileStatConfig[] = [
  { key: ProfileStat.TOTAL,     label: ProfileStatLabel.TOTAL,     color: "#6366f1" },
  { key: ProfileStat.INTERVIEW, label: ProfileStatLabel.INTERVIEW, color: "#f59e0b" },
  { key: ProfileStat.OFFER,     label: ProfileStatLabel.OFFER,     color: "#10b981" },
  { key: ProfileStat.REJECTED,  label: ProfileStatLabel.REJECTED,  color: "#ef4444" },
];
