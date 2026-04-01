"use client";

import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";
import { Table, Tag, Select, Input, Button, Popconfirm, Flex } from "antd";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { SerializedApplication } from "@/lib/data/applications";
import type { ApplicationStatus } from "@/types/application";
import { ApplicationStatus as AppStatus } from "@/types/application";
import { STATUS_CONFIG, STATUS_OPTIONS } from "@/lib/status-config";
import { deleteApplication } from "@/actions/applications";

const { Option } = Select;

function getCompanyColor(name: string): string {
  const palette = ["#6366f1", "#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#ef4444", "#14b8a6"];
  let hash = 0;
  for (const ch of name) hash = (hash * 31 + ch.charCodeAt(0)) % palette.length;
  return palette[Math.abs(hash)];
}

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

interface Props {
  applications:  SerializedApplication[];
  total:         number;
  page:          number;
  limit:         number;
  currentStatus?: ApplicationStatus;
  currentSearch?: string;
}

export default function ApplicationsTable({
  applications,
  total,
  page,
  limit,
  currentStatus,
  currentSearch,
}: Props) {
  const router   = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // Оновлення URL при зміні фільтрів/пагінації
  function updateParams(updates: Record<string, string | undefined>) {
    const params = new URLSearchParams();
    if (currentStatus) params.set("status", currentStatus);
    if (currentSearch) params.set("search", currentSearch);
    params.set("page", String(page));

    for (const [key, value] of Object.entries(updates)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }

    // Скидаємо сторінку при зміні фільтрів
    if ("status" in updates || "search" in updates) params.set("page", "1");

    startTransition(() => router.push(`${pathname}?${params.toString()}`));
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      await deleteApplication(id);
    });
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
      width: 48,
      render: (_, record) => (
        <Popconfirm
          title="Delete application?"
          description="This cannot be undone."
          onConfirm={() => handleDelete(record.id)}
          okText="Delete"
          okButtonProps={{ danger: true }}
          cancelText="Cancel"
        >
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            size="small"
          />
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Filters */}
      <Flex gap={12} align="center">
        <Input
          placeholder="Search company or position..."
          prefix={<SearchOutlined className="text-gray-400" />}
          defaultValue={currentSearch}
          style={{ width: 280 }}
          onPressEnter={(e) => updateParams({ search: e.currentTarget.value || undefined })}
          allowClear
          onClear={() => updateParams({ search: undefined })}
        />
        <Select
          placeholder="All statuses"
          value={currentStatus ?? null}
          style={{ width: 160 }}
          allowClear
          onChange={(val) => updateParams({ status: val ?? undefined })}
        >
          {STATUS_OPTIONS.map((s) => (
            <Option key={s.value} value={s.value}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: s.dotColor }} />
                {s.label}
              </div>
            </Option>
          ))}
        </Select>
        {(currentStatus || currentSearch) && (
          <Button onClick={() => updateParams({ status: undefined, search: undefined })}>
            Clear filters
          </Button>
        )}
      </Flex>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={applications}
        rowKey="id"
        loading={isPending}
        size="middle"
        locale={{ emptyText: "No applications found." }}
        pagination={{
          current:  page,
          pageSize: limit,
          total,
          showSizeChanger: false,
          showTotal: (t) => `${t} applications`,
          onChange: (p) => updateParams({ page: String(p) }),
        }}
      />
    </div>
  );
}
