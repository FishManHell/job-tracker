"use client";

import { useState } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AddApplicationModal from "@/components/dashboard/AddApplicationModal";

export default function AddApplicationButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => setOpen(true)}>
        Add Application
      </Button>
      <AddApplicationModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
