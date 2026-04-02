import { Tag, Button, Popconfirm, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { SerializedApplication } from "@/lib/data/applications";
import type { ApplicationStatus } from "@/types/application";
import { STATUS_CONFIG } from "@/lib/status-config";
import { getCompanyColor, formatDate } from "@/lib/format";

export function getColumns(
  onEdit:   (record: SerializedApplication) => void,
  onDelete: (id: string) => void,
): ColumnsType<SerializedApplication> {
  return [
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
    { title: "Position", dataIndex: "position" },
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
      title: "Location",
      dataIndex: "location",
      render: (v: string | null) => v ?? "—",
    },
    {
      title: "Next Step",
      dataIndex: "nextStep",
      render: (v: string | null) => v ?? "—",
    },
    {
      title: "",
      key: "actions",
      width: 80,
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
