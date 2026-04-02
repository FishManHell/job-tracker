"use client";

import { Button, Input } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import ApplicationModal from "@/components/applications/ApplicationModal";
import { useModal } from "@/hooks/use-modal";

export default function DashboardHeader() {
  const { open, handleOpen, handleClose } = useModal();

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Good morning, Denys 👋</h1>
        <div className="flex items-center gap-3">
          <Input
            placeholder="Search jobs..."
            prefix={<SearchOutlined className="text-gray-400" />}
            style={{ width: 220 }}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={handleOpen}>
            Add Application
          </Button>
        </div>
      </div>

      <ApplicationModal open={open} onClose={handleClose} />
    </>
  );
}
