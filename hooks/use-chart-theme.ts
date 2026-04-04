"use client";

import { useMemo }            from "react";
import { useResolvedTheme }   from "@/hooks/use-resolved-theme";
import { chartColors, type ChartColors } from "@/lib/chart-options";

export interface ChartTheme {
  isDark: boolean;
  colors: ChartColors;
}

export function useChartTheme(): ChartTheme {
  const { isDark } = useResolvedTheme();
  const colors     = useMemo(() => chartColors(isDark), [isDark]);
  return { isDark, colors };
}
