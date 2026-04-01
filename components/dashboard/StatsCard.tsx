"use client";

import { Card, Statistic } from "antd";

interface StatsCardProps {
  value: number;
  label: string;
  sub: string;
  borderColor: string;
  subColor: string;
}

export default function StatsCard({ value, label, sub, borderColor, subColor }: StatsCardProps) {
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
