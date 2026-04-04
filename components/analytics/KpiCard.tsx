import { Card, Statistic } from "antd";

interface KpiCardProps {
  label:       string;
  value:       number;
  suffix:      string;
  accentColor: string;
  subLabel:    string;
}

export function KpiCard({ label, value, suffix, accentColor, subLabel }: KpiCardProps) {
  return (
    <Card
      style={{ borderLeft: `4px solid ${accentColor}` }}
      styles={{ body: { padding: "20px" } }}
    >
      <Statistic
        title={label}
        value={value}
        suffix={suffix}
        styles={{ content: { fontSize: 28, fontWeight: 700 } }}
      />
      <p style={{ color: accentColor, fontSize: 12, marginTop: 4, marginBottom: 0 }}>
        {subLabel}
      </p>
    </Card>
  );
}
