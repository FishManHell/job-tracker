import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { SerializedApplication } from "@/lib/data/applications";
import type { ApplicationStatus } from "@/types/application";
import { STATUS_CONFIG } from "@/lib/status-config";
import { getCompanyColor, formatDate } from "@/lib/format";

export const columns: ColumnsType<SerializedApplication> = [
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
