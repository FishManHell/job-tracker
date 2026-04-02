"use client";

import { Card, Progress, Flex } from "antd";
import type { ApplicationStats } from "@/lib/data/applications";

interface Props {
  stats: ApplicationStats;
}

function PipelineOverview({ stats }: Props) {
  const pipeline = [
    { label: "Applied",   count: stats.applied,   color: "#6366f1" },
    { label: "Screening", count: stats.screening, color: "#3b82f6" },
    { label: "Interview", count: stats.interview, color: "#f59e0b" },
    { label: "Offer",     count: stats.offer,     color: "#10b981" },
    { label: "Rejected",  count: stats.rejected,  color: "#ef4444" },
  ];

  const total = stats.total || 1; // avoid division by zero

  return (
    <Card title="Pipeline Overview">
      <Flex vertical gap={16}>
        {pipeline.map((item) => (
          <div key={item.label}>
            <Flex justify="space-between" align="center" style={{ marginBottom: 6 }}>
              <span style={{ fontSize: 14 }}>{item.label}</span>
              <span style={{ fontWeight: 600 }}>{item.count}</span>
            </Flex>
            <Progress
              percent={Math.round((item.count / total) * 100)}
              showInfo={false}
              strokeColor={item.color}
              size="small"
            />
          </div>
        ))}
      </Flex>
    </Card>
  );
}

export default PipelineOverview;
