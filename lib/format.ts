const THOUSANDS_SEPARATOR = /\B(?=(\d{3})+(?!\d))/g;

export function formatSalary(v: number | string | undefined): string {
  return `${v}`.replace(THOUSANDS_SEPARATOR, ",");
}
