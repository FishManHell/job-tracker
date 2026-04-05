const THOUSANDS_SEPARATOR = /\B(?=(\d{3})+(?!\d))/g;

export function formatSalary(v: number | string | undefined): string {
  return `${v}`.replace(THOUSANDS_SEPARATOR, ",");
}

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"] as const;
export type Month = typeof MONTHS[number];

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

import { COLORS } from "@/lib/colors";

const COMPANY_COLOR_PALETTE = [
  COLORS.primary, COLORS.info,    COLORS.purple, COLORS.pink,
  COLORS.warning, COLORS.success, COLORS.error,  COLORS.teal,
] as const;

export function getCompanyColor(name: string): string {
  let hash = 0;
  for (const ch of name) hash = (hash * 31 + ch.charCodeAt(0)) % COMPANY_COLOR_PALETTE.length;
  return COMPANY_COLOR_PALETTE[Math.abs(hash)];
}
