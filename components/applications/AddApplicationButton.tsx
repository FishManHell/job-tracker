"use client";

import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ApplicationModal from "@/components/applications/ApplicationModal";
import { useModal } from "@/hooks/use-modal";

function AddApplicationButton() {
  const { open, handleOpen, handleClose } = useModal();

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} size="large" onClick={handleOpen}>
        <span className="hidden sm:inline">Add Application</span>
      </Button>
      <ApplicationModal open={open} onClose={handleClose} />
    </>
  );
}

export default AddApplicationButton;
