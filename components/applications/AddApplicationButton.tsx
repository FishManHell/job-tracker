"use client";

import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useModal } from "@/hooks/use-modal";
import type { CompanyOption } from "@/lib/data/companies";
import ApplicationModal from "@/components/applications/ApplicationModal";

interface AddApplicationButtonProps {
  companies: CompanyOption[];
}

function AddApplicationButton({ companies }: AddApplicationButtonProps) {
  const { open, handleOpen, handleClose } = useModal();

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} size="large" onClick={handleOpen}>
        <span className="hidden sm:inline">Add Application</span>
      </Button>
      <ApplicationModal open={open} onClose={handleClose} companies={companies} />
    </>
  );
}

export default AddApplicationButton;
