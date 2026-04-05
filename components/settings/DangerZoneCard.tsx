"use client";

import { useState, useTransition } from "react";
import { Card, Button, Popconfirm, Typography } from "antd";
import { DeleteOutlined, WarningOutlined } from "@ant-design/icons";
import FormAlert from "@/components/common/FormAlert";
import { deleteAccount } from "@/actions/settings";

const { Text } = Typography;

export function DangerZoneCard() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    setError(null);
    startTransition(async () => {
      try {
        await deleteAccount();
      } catch {
        setError("Failed to delete account. Please try again.");
      }
    });
  };

  return (
    <Card
      title={
        <div className="flex items-center gap-2 text-red-500">
          <WarningOutlined />
          <span>Danger Zone</span>
        </div>
      }
      style={{ borderColor: "#ef4444" }}
    >
      <FormAlert message={error} />

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <Text strong>Delete account</Text>
          <Text type="secondary" className="block text-sm">
            Permanently deletes your account and all associated data. This cannot be undone.
          </Text>
        </div>

        <Popconfirm
          title="Delete your account?"
          description="All data will be permanently removed. This action cannot be undone."
          okText="Yes, delete everything"
          cancelText="Cancel"
          okButtonProps={{ danger: true, loading: isPending }}
          onConfirm={handleDelete}
          placement="topRight"
        >
          <Button danger icon={<DeleteOutlined />} size="large" loading={isPending}>
            Delete account
          </Button>
        </Popconfirm>
      </div>
    </Card>
  );
}
