import { ProfileStat, ProfileStatLabel } from "@/types/application";
import type { ProfileStatConfig } from "@/types/application";
import { COLORS } from "@/lib/colors";

export const PROFILE_STATS: ProfileStatConfig[] = [
  { key: ProfileStat.TOTAL,     label: ProfileStatLabel.TOTAL,     color: COLORS.primary },
  { key: ProfileStat.INTERVIEW, label: ProfileStatLabel.INTERVIEW, color: COLORS.warning },
  { key: ProfileStat.OFFER,     label: ProfileStatLabel.OFFER,     color: COLORS.success },
  { key: ProfileStat.REJECTED,  label: ProfileStatLabel.REJECTED,  color: COLORS.error   },
];
