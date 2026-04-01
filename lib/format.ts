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

const COMPANY_COLOR_PALETTE = [
  "#6366f1","#3b82f6","#8b5cf6","#ec4899",
  "#f59e0b","#10b981","#ef4444","#14b8a6",
] as const;

export function getCompanyColor(name: string): string {
  let hash = 0;
  for (const ch of name) hash = (hash * 31 + ch.charCodeAt(0)) % COMPANY_COLOR_PALETTE.length;
  return COMPANY_COLOR_PALETTE[Math.abs(hash)];
}
