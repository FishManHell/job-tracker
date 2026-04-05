"use client";

import { useState, useTransition } from "react";
import { Card, Table } from "antd";
import type { SerializedInterview } from "@/types/interview";
import type { ApplicationOption } from "@/lib/data/applications";
import { deleteInterview } from "@/actions/interviews";
import { getColumns } from "./InterviewsTable.columns";
import InterviewModal from "./InterviewModal";

interface InterviewsTableProps {
  interviews:   SerializedInterview[];
  applications: ApplicationOption[];
}

function InterviewsTable({ interviews, applications }: InterviewsTableProps) {
  const [editingInterview, setEditingInterview] = useState<SerializedInterview | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleDelete(id: string) {
    startTransition(async () => {
      await deleteInterview(id);
    });
  }
  const onClose = () => setEditingInterview(null);

  const columns = getColumns(setEditingInterview, handleDelete);

  return (
    <>
      <InterviewModal
        key={editingInterview?.id}
        open={!!editingInterview}
        interview={editingInterview ?? undefined}
        applications={applications}
        onClose={onClose}
      />
      <Card>
        <Table
          columns={columns}
          dataSource={interviews}
          rowKey="id"
          size="middle"
          scroll={{ x: 900 }}
          loading={isPending}
          locale={{ emptyText: "No interviews yet." }}
          pagination={{ pageSize: 10, hideOnSinglePage: true }}
        />
      </Card>
    </>
  );
}

export default InterviewsTable;
