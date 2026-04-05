"use client";

import "@/lib/chart-registry";
import { useChartTheme } from "@/hooks/use-chart-theme";
import { KpiCard } from "./KpiCard";
import { ApplicationsOverTimeChart } from "./ApplicationsOverTimeChart";
import { StatusBreakdownChart } from "./StatusBreakdownChart";
import { InterviewTypesChart } from "./InterviewTypesChart";
import { TopCompaniesChart } from "./TopCompaniesChart";
import { KPI_CONFIG } from "./kpi-config";
import type { AnalyticsData } from "@/types/analytics";

interface AnalyticsContentProps {
  data: AnalyticsData;
}

export default function AnalyticsContent({ data }: AnalyticsContentProps) {
  const { colors } = useChartTheme();

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 xl:mb-8">
        <h1 className="text-lg sm:text-xl xl:text-2xl font-bold">Analytics</h1>
        <p className="text-gray-500 text-sm mt-1">Your job search insights</p>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {KPI_CONFIG.map(kpi => <KpiCard key={kpi.label} {...kpi} value={kpi.getValue(data)} />)}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
        <ApplicationsOverTimeChart data={data.applicationsOverTime} colors={colors} className="xl:col-span-2" />
        <StatusBreakdownChart data={data.statusBreakdown} colors={colors} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <InterviewTypesChart data={data.interviewTypes} colors={colors} />
        <TopCompaniesChart data={data.topCompanies} colors={colors} />
      </div>
    </div>
  );
}
