"use client";

import { useState, useTransition } from "react";
import {
  Modal, Form, Input, Select, Switch,
  InputNumber, Button, Divider, Row, Col,
} from "antd";
import { BankOutlined, EditOutlined, EnvironmentOutlined, LinkOutlined, DollarOutlined } from "@ant-design/icons";
import FormAlert from "@/components/common/FormAlert";
import StatusSelect from "@/components/common/StatusSelect";
import { formatSalary } from "@/lib/format";
import { createApplication, updateApplication } from "@/actions/applications";
import type { SerializedApplication } from "@/lib/data/applications";
import type { AddApplicationFormValues } from "@/types/application";
import { ADD_DEFAULTS, CURRENCY_OPTIONS, toFormValues } from "./ApplicationModal.utils";

const { TextArea } = Input;

interface ApplicationModalProps {
  open: boolean;
  onClose: () => void;
  application?: SerializedApplication;
}

function ApplicationModal({ open, onClose, application }: ApplicationModalProps) {
  const isEdit = !!application;

  const [form] = Form.useForm<AddApplicationFormValues>();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleClose = () => {
    setError(null);
    onClose();
  };

  const onFinish = (values: AddApplicationFormValues) => {
    setError(null);
    startTransition(async () => {
      const result = isEdit
        ? await updateApplication(application.id, values)
        : await createApplication(values);

      if (result?.error) setError(result.error);
      else handleClose();
    });
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      title={
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isEdit ? "bg-amber-500" : "bg-indigo-500"}`}>
            {isEdit
              ? <EditOutlined style={{ color: "#fff", fontSize: 14 }} />
              : <BankOutlined  style={{ color: "#fff", fontSize: 14 }} />
            }
          </div>
          <span className="text-base font-semibold">
            {isEdit ? "Edit Application" : "Add Application"}
          </span>
        </div>
      }
      footer={null}
      width={560}
      centered
      destroyOnHidden
    >
      <FormAlert message={error} />

      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={onFinish}
        initialValues={isEdit ? toFormValues(application) : ADD_DEFAULTS}
        style={{ marginTop: 8 }}
      >
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Company" name="companyName" rules={[{ required: true, message: "Enter company name" }]}>
              <Input prefix={<BankOutlined className="text-gray-400" />} placeholder="Google, Stripe..." size="large" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Position" name="position" rules={[{ required: true, message: "Enter position" }]}>
              <Input placeholder="Senior Frontend Engineer" size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Status" name="status">
              <StatusSelect size="large" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Location" name="location">
              <Input prefix={<EnvironmentOutlined className="text-gray-400" />} placeholder="Kyiv, Remote..." size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="remote" valuePropName="checked" style={{ marginBottom: 8 }}>
          <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2 border border-gray-200">
            <div>
              <p className="text-sm font-medium text-gray-700">Remote position</p>
              <p className="text-xs text-gray-400">Toggle if this is a remote job</p>
            </div>
            <Switch />
          </div>
        </Form.Item>

        <Divider style={{ margin: "8px 0 12px" }}>
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Salary Range (optional)</span>
        </Divider>

        <Row gutter={12}>
          <Col span={8}>
            <Form.Item name="currency" label="Currency">
              <Select size="large" options={CURRENCY_OPTIONS} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="salaryMin" label="Min">
              <InputNumber
                prefix={<DollarOutlined className="text-gray-400" />}
                placeholder="80 000"
                size="large"
                style={{ width: "100%" }}
                formatter={formatSalary}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="salaryMax" label="Max">
              <InputNumber
                placeholder="120 000"
                size="large"
                style={{ width: "100%" }}
                formatter={formatSalary}
              />
            </Form.Item>
          </Col>
        </Row>

        <Divider style={{ margin: "4px 0 12px" }} />

        <Form.Item label="Job posting URL" name="jobUrl" style={{ marginBottom: 12 }}>
          <Input prefix={<LinkOutlined className="text-gray-400" />} placeholder="https://jobs.company.com/..." size="large" />
        </Form.Item>

        <Form.Item label="Notes" name="notes" style={{ marginBottom: 12 }}>
          <TextArea placeholder="Referral contact, recruiter name, cover letter notes..." rows={2} style={{ resize: "none" }} />
        </Form.Item>

        <div className="flex gap-3 justify-end pt-2">
          <Button size="large" onClick={handleClose}>Cancel</Button>
          <Button type="primary" size="large" htmlType="submit" loading={isPending} style={{ minWidth: 140 }}>
            {isEdit ? "Save Changes" : "Add Application"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default ApplicationModal;
