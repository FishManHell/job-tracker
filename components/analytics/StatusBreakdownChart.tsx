"use client";

import { useMemo }                            from "react";
import { Doughnut }                           from "react-chartjs-2";
import type { ChartData }                     from "chart.js";
import { buildDoughnutOptions, type ChartColors } from "@/lib/chart-options";
import { ChartCard }                          from "./ChartCard";
import type { StatusSlice } from "@/types/analytics";

interface StatusBreakdownChartProps {
  data:   StatusSlice[];
  colors: ChartColors;
}

export function StatusBreakdownChart({ data, colors }: StatusBreakdownChartProps) {
  const chartData = useMemo<ChartData<"doughnut">>(() => ({
    labels:   data.map(s => s.label),
    datasets: [{
      data:            data.map(s => s.count),
      backgroundColor: data.map(s => s.color),
      hoverOffset:     6,
    }],
  }), [data]);

  const options = useMemo(() => buildDoughnutOptions(colors), [colors]);

  return (
    <ChartCard
      title="Status Breakdown"
      isEmpty={data.length === 0}
      emptyMessage="No applications yet"
    >
      <Doughnut data={chartData} options={options} />
    </ChartCard>
  );
}
