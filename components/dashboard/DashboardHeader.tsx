"use client";

import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ApplicationModal from "@/components/applications/ApplicationModal";
import { useModal } from "@/hooks/use-modal";

export default function DashboardHeader() {
  const { open, handleOpen, handleClose } = useModal();

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Good morning, Denys 👋</h1>
        <div className="flex items-center gap-3">
          <Button type="primary" icon={<PlusOutlined />} onClick={handleOpen}>
            Add Application
          </Button>
        </div>
      </div>

      <ApplicationModal open={open} onClose={handleClose} />
    </>
  );
}
