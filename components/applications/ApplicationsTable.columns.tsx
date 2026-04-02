import { Tag, Button, Popconfirm, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { SerializedApplication } from "@/lib/data/applications";
import type { ApplicationStatus } from "@/types/application";
import { STATUS_CONFIG } from "@/lib/status-config";
import { getCompanyColor, formatDate } from "@/lib/format";
import { createCol } from "@/lib/table";

const col = createCol<SerializedApplication>();

export function getColumns(
  onEdit:   (record: SerializedApplication) => void,
  onDelete: (id: string) => void,
): ColumnsType<SerializedApplication> {
  return [
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
    col({ title: "Position", dataIndex: "position", width: 160 }),
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
      title:     "Location",
      dataIndex: "location",
      width:     130,
      render: (v) => v ?? "—",
    }),
    col({
      title:     "Next Step",
      dataIndex: "nextStep",
      width:     130,
      render: (v) => v ?? "—",
    }),
    {
      title:  "",
      key:    "actions",
      width:  80,
      render: (_, record) => (
        <Space size={4}>
          <Button
            type="text"
            icon={<EditOutlined />}
            size="small"
            onClick={() => onEdit(record)}
          />
          <Popconfirm
            title="Delete application?"
            description="This cannot be undone."
            onConfirm={() => onDelete(record.id)}
            okText="Delete"
            okButtonProps={{ danger: true }}
            cancelText="Cancel"
          >
            <Button type="text" danger icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
        </Space>
      ),
    },
  ];
}
