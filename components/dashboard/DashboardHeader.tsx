"use client";

import { useState } from "react";
import { Button, Input } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import AddApplicationModal from "./AddApplicationModal";

export default function DashboardHeader() {
  const [modalOpen, setModalOpen] = useState(false);

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
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalOpen(true)}>
            Add Application
          </Button>
        </div>
      </div>

      <AddApplicationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
