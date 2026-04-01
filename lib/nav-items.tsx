import {
  DashboardIcon,
  ApplicationsIcon,
  InterviewsIcon,
  CompaniesIcon,
  AnalyticsIcon,
  SettingsIcon,
} from "@/components/icons/nav-icons";
import { ROUTES } from "@/lib/routes";
import { NAV_LABELS } from "@/lib/nav-labels";
import type { NavItem } from "@/types/navigation";

export const navItems: NavItem[] = [
  { label: NAV_LABELS.DASHBOARD,    href: ROUTES.DASHBOARD,    icon: <DashboardIcon />    },
  { label: NAV_LABELS.APPLICATIONS, href: ROUTES.APPLICATIONS, icon: <ApplicationsIcon /> },
  { label: NAV_LABELS.INTERVIEWS,   href: ROUTES.INTERVIEWS,   icon: <InterviewsIcon />   },
  { label: NAV_LABELS.COMPANIES,    href: ROUTES.COMPANIES,    icon: <CompaniesIcon />    },
  { label: NAV_LABELS.ANALYTICS,    href: ROUTES.ANALYTICS,    icon: <AnalyticsIcon />    },
  { label: NAV_LABELS.SETTINGS,     href: ROUTES.SETTINGS,     icon: <SettingsIcon />     },
];
