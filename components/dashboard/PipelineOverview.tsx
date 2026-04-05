"use client";

import { Card, Progress, Flex } from "antd";
import type { ApplicationStats } from "@/lib/data/applications";
import { COLORS } from "@/lib/colors";

interface PipelineOverviewProps {
  stats: ApplicationStats;
}

function PipelineOverview({ stats }: PipelineOverviewProps) {
  const pipeline = [
    { label: "Applied",   count: stats.applied,   color: COLORS.primary },
    { label: "Screening", count: stats.screening, color: COLORS.info    },
    { label: "Interview", count: stats.interview, color: COLORS.warning },
    { label: "Offer",     count: stats.offer,     color: COLORS.success },
    { label: "Rejected",  count: stats.rejected,  color: COLORS.error   },
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
