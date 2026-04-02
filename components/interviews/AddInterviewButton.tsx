"use client";

import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import InterviewModal from "@/components/interviews/InterviewModal";
import { useModal } from "@/hooks/use-modal";
import type { ApplicationOption } from "@/lib/data/applications";

interface AddInterviewButtonProps {
  applications: ApplicationOption[];
}

function AddInterviewButton({ applications }: AddInterviewButtonProps) {
  const { open, handleOpen, handleClose } = useModal();

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} size="large" onClick={handleOpen}>
        Add Interview
      </Button>
      <InterviewModal open={open} onClose={handleClose} applications={applications} />
    </>
  );
}

export default AddInterviewButton;
