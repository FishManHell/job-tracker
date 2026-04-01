"use client";

import { Card, Table } from "antd";
import Link from "next/link";
import type { SerializedApplication } from "@/lib/data/applications";
import { columns } from "./RecentApplications.columns";
import { ROUTES } from "@/lib/routes";

interface RecentApplicationsProps {
  applications: SerializedApplication[];
}

export default function RecentApplications({ applications }: RecentApplicationsProps) {
  return (
    <Card
      title="Recent Applications"
      extra={<Link href={ROUTES.APPLICATIONS} className="text-indigo-500 text-sm">View all →</Link>}
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
