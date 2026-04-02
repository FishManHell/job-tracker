"use client";

import { Card, Statistic } from "antd";
import type { StatCardLabel } from "@/lib/dashboard-stats";
import type { HexColor } from "@/types/common";

interface StatsCardProps {
  value:       number;
  label:       StatCardLabel;
  sub:         string;
  borderColor: HexColor;
  subColor:    HexColor;
}

function StatsCard({ value, label, sub, borderColor, subColor }: StatsCardProps) {
  return (
    <Card
      style={{ borderLeft: `4px solid ${borderColor}` }}
      styles={{ body: { padding: "20px" } }}
    >
      <Statistic title={label} value={value} styles={{ content: { fontSize: 28, fontWeight: 700 } }} />
      <p style={{ color: subColor, fontSize: 12, marginTop: 4, marginBottom: 0 }}>{sub}</p>
    </Card>
  );
}

export default StatsCard;
