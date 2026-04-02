import { Tag, Button, Popconfirm, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { SerializedInterview } from "@/lib/data/interviews";
import { INTERVIEW_TYPE_CONFIG, INTERVIEW_RESULT_CONFIG } from "@/lib/interview-config";
import { formatDate, getCompanyColor } from "@/lib/format";
import { createCol } from "@/lib/table";

const col = createCol<SerializedInterview>();

export function getColumns(
  onEdit:   (record: SerializedInterview) => void,
  onDelete: (id: string) => void,
): ColumnsType<SerializedInterview> {
  return [
  col({
    title:     "Company",
    dataIndex: "companyName",
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
  col({
    title:     "Position",
    dataIndex: "position",
  }),
  col({
    title:     "Type",
    dataIndex: "type",
    render: (type) => (
      <Tag color={INTERVIEW_TYPE_CONFIG[type].tagColor}>
        {INTERVIEW_TYPE_CONFIG[type].label}
      </Tag>
    ),
  }),
  col({
    title:     "Scheduled",
    dataIndex: "scheduledAt",
    render: (iso) => {
      const d = new Date(iso);
      return (
        <div>
          <div className="font-medium">{formatDate(iso)}</div>
          <div className="text-gray-400 text-xs" suppressHydrationWarning>
            {d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>
      );
    },
  }),
  col({
    title:     "Duration",
    dataIndex: "durationMins",
    render: (mins) => mins ? `${mins} min` : "—",
  }),
  col({
    title:     "Location",
    dataIndex: "location",
    render: (v) => v ?? "—",
  }),
  col({
    title:     "Result",
    dataIndex: "result",
    render: (result) => (
      <div className="flex items-center gap-2">
        <div
          className="w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: INTERVIEW_RESULT_CONFIG[result].dotColor }}
        />
        <Tag color={INTERVIEW_RESULT_CONFIG[result].tagColor}>
          {INTERVIEW_RESULT_CONFIG[result].label}
        </Tag>
      </div>
    ),
  }),
  {
    title:  "",
    key:    "actions",
    width:  80,
    render: (_: unknown, record: SerializedInterview) => (
      <Space size={4}>
        <Button
          type="text"
          icon={<EditOutlined />}
          size="small"
          onClick={() => onEdit(record)}
        />
        <Popconfirm
          title="Delete interview?"
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
