"use client";

import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ApplicationModal from "@/components/applications/ApplicationModal";
import { useModal } from "@/hooks/use-modal";
import { getGreeting } from "./DashboardHeader.utils";

interface DashboardHeaderProps {
  name: string;
}

function DashboardHeader({ name }: DashboardHeaderProps) {
  const { open, handleOpen, handleClose } = useModal();

  return (
    <>
      <div className="flex items-center justify-between mb-6 xl:mb-8">
        <h1 className="text-lg sm:text-xl xl:text-2xl font-bold">{getGreeting()}, {name} 👋</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleOpen}>
          <span className="hidden sm:inline">Add Application</span>
        </Button>
      </div>

      <ApplicationModal open={open} onClose={handleClose} />
    </>
  );
}

export default DashboardHeader;
