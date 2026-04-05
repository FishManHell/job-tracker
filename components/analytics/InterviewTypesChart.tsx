"use client";

import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import type { ChartData } from "chart.js";
import { buildBarOptions, PALETTE, type ChartColors } from "@/lib/chart-options";
import { ChartCard } from "./ChartCard";
import type { InterviewTypePoint } from "@/types/analytics";

interface InterviewTypesChartProps {
  data:   InterviewTypePoint[];
  colors: ChartColors;
}

export function InterviewTypesChart({ data, colors }: InterviewTypesChartProps) {
  const sorted = useMemo(
    () => [...data].sort((a, b) => a.count - b.count),
    [data],
  );

  const chartData = useMemo<ChartData<"bar">>(() => ({
    labels: sorted.map(p => p.type),
    datasets: [{
      data: sorted.map(p => p.count),
      backgroundColor: PALETTE.slice(0, sorted.length),
      hoverBackgroundColor: PALETTE.slice(0, sorted.length).map(c => `${c}cc`),
      borderRadius: 4,
      barThickness: 40,
    }],
  }), [sorted]);

  const options = useMemo(() => buildBarOptions(colors, true), [colors]);

  return (
    <ChartCard
      title="Interview Types"
      isEmpty={data.length === 0}
      emptyMessage="No interviews yet"
    >
      <Bar data={chartData} options={options} />
    </ChartCard>
  );
}
