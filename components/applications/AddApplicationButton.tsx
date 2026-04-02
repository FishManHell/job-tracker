"use client";

import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ApplicationModal from "@/components/applications/ApplicationModal";
import { useModal } from "@/hooks/use-modal";

export default function AddApplicationButton() {
  const { open, handleOpen, handleClose } = useModal();

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} size="large" onClick={handleOpen}>
        Add Application
      </Button>
      <ApplicationModal open={open} onClose={handleClose} />
    </>
  );
}
