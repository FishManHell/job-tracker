"use client";

import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useModal } from "@/hooks/use-modal";
import CompanyModal from "./CompanyModal";

function AddCompanyButton() {
  const { open, handleOpen, handleClose } = useModal();

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} size="large" onClick={handleOpen}>
        <span className="hidden sm:inline">Add Company</span>
      </Button>
      <CompanyModal open={open} onClose={handleClose} />
    </>
  );
}

export default AddCompanyButton;
