"use client";

import { Card, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import type { SerializedApplication } from "@/lib/data/applications";
import type { ApplicationStatus } from "@/types/application";
import { STATUS_CONFIG } from "@/lib/status-config";

// Детермінований колір аватару компанії по імені
function getCompanyColor(name: string): string {
  const palette = ["#6366f1", "#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#ef4444", "#14b8a6"];
  let hash = 0;
  for (const ch of name) hash = (hash * 31 + ch.charCodeAt(0)) % palette.length;
  return palette[Math.abs(hash)];
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const columns: ColumnsType<SerializedApplication> = [
  {
    title: "Company",
    dataIndex: "companyName",
    render: (name: string) => (
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-white text-xs font-bold"
          style={{ backgroundColor: getCompanyColor(name) }}
        >
          {name[0].toUpperCase()}
        </div>
        <span className="font-medium">{name}</span>
      </div>
    ),
  },
  { title: "Position",     dataIndex: "position" },
  {
    title: "Date Applied",
    dataIndex: "appliedAt",
    render: (iso: string) => formatDate(iso),
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (status: ApplicationStatus) => (
      <Tag color={STATUS_CONFIG[status].tagColor}>{STATUS_CONFIG[status].label}</Tag>
    ),
  },
  {
    title: "Next Step",
    dataIndex: "nextStep",
    render: (v: string | null) => v ?? "—",
  },
];

interface Props {
  applications: SerializedApplication[];
}

export default function RecentApplications({ applications }: Props) {
  return (
    <Card
      title="Recent Applications"
      extra={<Link href="/applications" className="text-indigo-500 text-sm">View all →</Link>}
    >
      <Table
        columns={columns}
        dataSource={applications}
        rowKey="id"
        pagination={false}
        size="middle"
        locale={{ emptyText: "No applications yet. Add your first one!" }}
      />
    </Card>
  );
}
