import type { ChartOptions } from "chart.js";
import { COLORS } from "@/lib/colors";

export const PALETTE = [
  COLORS.primary, COLORS.info,    COLORS.warning, COLORS.success,
  COLORS.purple,  COLORS.error,   COLORS.pink,    COLORS.teal,
] as const;

// ─── Theme-aware colors ───────────────────────────────────────────────────────

export interface ChartColors {
  tick:    string;
  grid:    string;
  tooltip: { bg: string; title: string; body: string; border: string };
}

export function chartColors(isDark: boolean): ChartColors {
  return {
    tick:  isDark ? "#9ca3af" : "#6b7280",
    grid:  isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)",
    tooltip: {
      bg:     isDark ? "#1f2937" : "#ffffff",
      title:  isDark ? "#f9fafb" : "#111827",
      body:   isDark ? "#d1d5db" : "#374151",
      border: isDark ? "#374151" : "#e5e7eb",
    },
  };
}

// ─── Shared scale / tooltip base ─────────────────────────────────────────────

function scaleBase(colors: ChartColors) {
  return {
    grid:   { color: colors.grid },
    ticks:  { color: colors.tick },
    border: { dash: [3, 3] as [number, number] },
  };
}

function tooltipBase(c: ChartColors) {
  return {
    backgroundColor: c.tooltip.bg,
    titleColor:      c.tooltip.title,
    bodyColor:       c.tooltip.body,
    borderColor:     c.tooltip.border,
    borderWidth:     1,
  };
}

// ─── Option factories ─────────────────────────────────────────────────────────

export function buildBarOptions(
  colors:     ChartColors,
  horizontal = false,
): ChartOptions<"bar"> {
  return {
    indexAxis:           horizontal ? "y" : "x",
    maintainAspectRatio: false,
    plugins: {
      legend:  { display: false },
      tooltip: tooltipBase(colors),
    },
    scales: {
      x: scaleBase(colors),
      y: scaleBase(colors),
    },
  };
}

export function buildLineOptions(
  colors:        ChartColors,
  tooltipTitles: string[],
): ChartOptions<"line"> {
  return {
    maintainAspectRatio: false,
    plugins: {
      legend:  { display: false },
      tooltip: {
        ...tooltipBase(colors),
        callbacks: {
          title: ([item]) => tooltipTitles[item.dataIndex] ?? item.label,
        },
      },
    },
    scales: {
      x: { ...scaleBase(colors), ticks: { color: colors.tick, maxRotation: 0 } },
      y: { ...scaleBase(colors), ticks: { color: colors.tick, precision: 0 }, beginAtZero: true },
    },
    elements: {
      line:  { tension: 0.4 },
      point: { radius: 3, hoverRadius: 5 },
    },
  };
}

export function buildDoughnutOptions(colors: ChartColors): ChartOptions<"doughnut"> {
  return {
    maintainAspectRatio: false,
    plugins: {
      legend:  { position: "bottom", labels: { color: colors.tick, boxWidth: 12, padding: 16 } },
      tooltip: tooltipBase(colors),
    },
    cutout: "58%",
  };
}
