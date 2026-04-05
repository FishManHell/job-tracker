"use client";

import { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import type { ChartData } from "chart.js";
import { buildDoughnutOptions, PALETTE, type ChartColors } from "@/lib/chart-options";
import { ChartCard } from "./ChartCard";
import type { TopCompanyPoint } from "@/types/analytics";

interface TopCompaniesChartProps {
  data:   TopCompanyPoint[];
  colors: ChartColors;
}

export function TopCompaniesChart({ data, colors }: TopCompaniesChartProps) {
  const chartData = useMemo<ChartData<"doughnut">>(() => ({
    labels: data.map(p => p.company),
    datasets: [{
      data: data.map(p => p.count),
      backgroundColor: PALETTE.slice(0, data.length),
      hoverOffset: 6,
    }],
  }), [data]);

  const options = useMemo(() => buildDoughnutOptions(colors), [colors]);

  return (
    <ChartCard
      title="Top Companies"
      isEmpty={data.length === 0}
      emptyMessage="No applications yet"
    >
      <Doughnut data={chartData} options={options} />
    </ChartCard>
  );
}
