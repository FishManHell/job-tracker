"use client";

import { useState, useTransition } from "react";
import { Modal, Form, Input, Button } from "antd";
import { BankOutlined, EditOutlined, LinkOutlined } from "@ant-design/icons";
import FormAlert from "@/components/common/FormAlert";
import ModalTitle from "@/components/common/ModalTitle";
import { createCompany, updateCompany } from "@/actions/companies";
import { urlValidator } from "@/lib/validators";
import type { CompanyWithStats } from "@/lib/data/companies";
import type { CompanyFormValues } from "@/types/company";
import { ADD_DEFAULTS, toFormValues } from "./CompanyModal.utils";

interface CompanyModalProps {
  open:     boolean;
  onClose:  () => void;
  company?: CompanyWithStats;
}

function CompanyModal({ open, onClose, company }: CompanyModalProps) {
  const isEdit = !!company;
  const [form] = Form.useForm<CompanyFormValues>();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleClose = () => {
    form.resetFields();
    setError(null);
    onClose();
  };

  const onFinish = (values: CompanyFormValues) => {
    setError(null);
    startTransition(async () => {
      const result = isEdit
        ? await updateCompany(company.id, values)
        : await createCompany(values);

      if (result?.error) setError(result.error);
      else handleClose();
    });
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      title={
        <ModalTitle
          isEdit={isEdit}
          icon={isEdit ? <EditOutlined /> : <BankOutlined />}
          addLabel="Add Company"
          editLabel="Edit Company"
        />
      }
      footer={null}
      width="min(480px, calc(100vw - 32px))"
      centered
      destroyOnHidden
    >
      <FormAlert message={error} />

      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={onFinish}
        initialValues={isEdit ? toFormValues(company) : ADD_DEFAULTS}
        style={{ marginTop: 8 }}
      >
        <Form.Item
          label="Company name"
          name="name"
          rules={[{ required: true, message: "Enter company name" }]}
        >
          <Input
            prefix={<BankOutlined className="text-gray-400" />}
            placeholder="Google, Stripe, Vercel..."
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="Website"
          name="website"
          rules={[urlValidator]}
          style={{ marginBottom: 12 }}
        >
          <Input
            prefix={<LinkOutlined className="text-gray-400" />}
            placeholder="https://company.com"
            size="large"
          />
        </Form.Item>

        <div className="flex gap-3 justify-end pt-2">
          <Button size="large" onClick={handleClose}>Cancel</Button>
          <Button type="primary" size="large" htmlType="submit" loading={isPending} style={{ minWidth: 120 }}>
            {isEdit ? "Save Changes" : "Add Company"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default CompanyModal;
