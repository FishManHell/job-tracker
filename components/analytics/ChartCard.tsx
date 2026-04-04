import { Card, Empty } from "antd";
import { ReactNode }   from "react";

const CHART_HEIGHT = 280;

interface ChartCardProps {
  title:        string;
  isEmpty:      boolean;
  emptyMessage: string;
  className?:   string;
  children:     ReactNode;
}

export function ChartCard({ title, isEmpty, emptyMessage, className, children }: ChartCardProps) {
  return (
    <Card title={title} className={className}>
      {isEmpty ? (
        <div className="flex items-center justify-center" style={{ height: CHART_HEIGHT }}>
          <Empty description={emptyMessage} />
        </div>
      ) : (
        <div style={{ height: CHART_HEIGHT }}>{children}</div>
      )}
    </Card>
  );
}
