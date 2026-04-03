"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";
import { Table, Input, Button, Flex } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { SerializedApplication } from "@/lib/data/applications";
import type { CompanyOption } from "@/lib/data/companies";
import type { ApplicationStatus } from "@/types/application";
import { deleteApplication } from "@/actions/applications";
import { getColumns } from "./ApplicationsTable.columns";
import ApplicationModal from "./ApplicationModal";
import StatusSelect from "@/components/common/StatusSelect";

interface ApplicationsTableProps {
  applications:   SerializedApplication[];
  companies:      CompanyOption[];
  total:          number;
  page:           number;
  limit:          number;
  currentStatus?: ApplicationStatus;
  currentSearch?: string;
}

function ApplicationsTable({
  applications,
  companies,
  total,
  page,
  limit,
  currentStatus,
  currentSearch,
}: ApplicationsTableProps) {
  const router   = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [editingApp, setEditingApp]  = useState<SerializedApplication | null>(null);

  // Update URL when filters or pagination change
  function updateParams(updates: Record<string, string | undefined>) {
    const params = new URLSearchParams();
    if (currentStatus) params.set("status", currentStatus);
    if (currentSearch) params.set("search", currentSearch);
    params.set("page", String(page));

    for (const [key, value] of Object.entries(updates)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }

    // Reset to page 1 when filters change
    if ("status" in updates || "search" in updates) params.set("page", "1");

    startTransition(() => router.push(`${pathname}?${params.toString()}`));
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      await deleteApplication(id);
    });
  }

  function handleClearFilters() {
    updateParams({ status: undefined, search: undefined });
  }

  const columns = getColumns(setEditingApp, handleDelete);

  return (
    <>
    <ApplicationModal
      key={editingApp?.id}
      open={!!editingApp}
      application={editingApp ?? undefined}
      companies={companies}
      onClose={() => setEditingApp(null)}
    />
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
        <StatusSelect
          value={currentStatus ?? null}
          onChange={(val) => updateParams({ status: val })}
          size="middle"
          style={{ width: 160 }}
          allowClear
        />
        {(currentStatus || currentSearch) && (
          <Button onClick={handleClearFilters}>Clear filters</Button>
        )}
      </Flex>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={applications}
        rowKey="id"
        loading={isPending}
        size="middle"
        scroll={{ x: 800 }}
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
    </>
  );
}

export default ApplicationsTable;
