import type { ReactNode } from "react";
import type { ROUTES } from "@/lib/routes";
import type { NAV_LABELS } from "@/lib/nav-labels";

export type Route    = (typeof ROUTES)[keyof typeof ROUTES];
export type NavLabel = (typeof NAV_LABELS)[keyof typeof NAV_LABELS];

export interface NavItem {
  label: NavLabel;
  href:  Route;
  icon:  ReactNode;
}
