"use client";

import { useMemo }                        from "react";
import { Line }                           from "react-chartjs-2";
import type { ChartData }                 from "chart.js";
import { buildLineOptions, type ChartColors } from "@/lib/chart-options";
import { ChartCard }                      from "./ChartCard";
import type { MonthlyPoint } from "@/types/analytics";

interface ApplicationsOverTimeChartProps {
  data:       MonthlyPoint[];
  colors:     ChartColors;
  className?: string;
}

export function ApplicationsOverTimeChart({ data, colors, className }: ApplicationsOverTimeChartProps) {
  const isEmpty = data.every(p => p.count === 0);

  const chartData = useMemo<ChartData<"line">>(() => ({
    labels:   data.map(p => p.month),
    datasets: [{
      data:                 data.map(p => p.count),
      borderColor:          "#6366f1",
      backgroundColor:      "rgba(99,102,241,0.15)",
      fill:                 true,
      pointBackgroundColor: "#6366f1",
    }],
  }), [data]);

  const options = useMemo(
    () => buildLineOptions(colors, data.map(p => p.fullMonth)),
    [colors, data],
  );

  return (
    <ChartCard
      title="Applications Over Time"
      isEmpty={isEmpty}
      emptyMessage="No applications yet"
      className={className}
    >
      <Line data={chartData} options={options} />
    </ChartCard>
  );
}
