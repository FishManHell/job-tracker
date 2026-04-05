import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { SerializedApplication } from "@/types/application";
import type { ApplicationStatus } from "@/types/application";
import { STATUS_CONFIG } from "@/lib/status-config";
import { getCompanyColor, formatDate } from "@/lib/format";
import { createCol } from "@/lib/table";

const col = createCol<SerializedApplication>();

export const columns: ColumnsType<SerializedApplication> = [
  col({
    title:     "Company",
    dataIndex: "companyName",
    fixed:     "left",
    width:     180,
    render: (name) => (
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
  }),
  col({ title: "Position",     dataIndex: "position", width: 160 }),
  col({
    title:     "Date Applied",
    dataIndex: "appliedAt",
    width:     130,
    render: (iso) => formatDate(iso),
  }),
  col({
    title:     "Status",
    dataIndex: "status",
    width:     120,
    render: (status) => (
      <Tag color={STATUS_CONFIG[status as ApplicationStatus].tagColor}>
        {STATUS_CONFIG[status as ApplicationStatus].label}
      </Tag>
    ),
  }),
  col({
    title:     "Remote",
    dataIndex: "remote",
    width:     90,
    render: (v: boolean) => v
      ? <Tag color="blue">Remote</Tag>
      : <Tag>On-site</Tag>,
  }),
  col({
    title:     "Next Step",
    dataIndex: "nextStep",
    width:     130,
    render: (v) => v ?? "—",
  }),
];
