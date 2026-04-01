"use client";

import { useState, useTransition } from "react";
import {
  Modal, Form, Input, Select, Switch,
  InputNumber, Button, Alert, Divider, Row, Col,
} from "antd";
import { BankOutlined, LinkOutlined, EnvironmentOutlined, DollarOutlined } from "@ant-design/icons";
import type { AddApplicationFormValues } from "@/types/application";
import { STATUS_OPTIONS } from "@/lib/status-config";
import { createApplication } from "@/actions/applications";

const { TextArea } = Input;
const { Option } = Select;

const CURRENCY_OPTIONS = ["USD", "EUR", "GBP", "UAH", "CAD", "AUD"];

interface Props {
  open:    boolean;
  onClose: () => void;
}

export default function AddApplicationModal({ open, onClose }: Props) {
  const [form] = Form.useForm<AddApplicationFormValues>();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleClose = () => {
    form.resetFields();
    setError(null);
    onClose();
  };

  const onFinish = (values: AddApplicationFormValues) => {
    setError(null);
    startTransition(async () => {
      const result = await createApplication(values);
      if (result?.error) {
        setError(result.error);
      } else {
        handleClose();
      }
    });
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      title={
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-indigo-500 rounded-lg flex items-center justify-center">
            <BankOutlined style={{ color: "#fff", fontSize: 14 }} />
          </div>
          <span className="text-base font-semibold">Add Application</span>
        </div>
      }
      footer={null}
      width={560}
      destroyOnHidden
    >
      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />}

      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={onFinish}
        initialValues={{ status: "APPLIED", currency: "USD", remote: false }}
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
              <Select size="large">
                {STATUS_OPTIONS.map((s) => (
                  <Option key={s.value} value={s.value}>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: s.dotColor }} />
                      {s.label}
                    </div>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Location" name="location">
              <Input prefix={<EnvironmentOutlined className="text-gray-400" />} placeholder="Kyiv, Remote..." size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="remote" valuePropName="checked">
          <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
            <div>
              <p className="text-sm font-medium text-gray-700">Remote position</p>
              <p className="text-xs text-gray-400">Toggle if this is a remote job</p>
            </div>
            <Switch />
          </div>
        </Form.Item>

        <Divider style={{ margin: "4px 0 16px" }} />

        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
          Salary Range (optional)
        </p>
        <Row gutter={12}>
          <Col span={8}>
            <Form.Item name="currency" label="Currency">
              <Select size="large">
                {CURRENCY_OPTIONS.map((c) => <Option key={c} value={c}>{c}</Option>)}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="salaryMin" label="Min">
              <InputNumber
                prefix={<DollarOutlined className="text-gray-400" />}
                placeholder="80 000"
                size="large"
                style={{ width: "100%" }}
                formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="salaryMax" label="Max">
              <InputNumber
                placeholder="120 000"
                size="large"
                style={{ width: "100%" }}
                formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              />
            </Form.Item>
          </Col>
        </Row>

        <Divider style={{ margin: "4px 0 16px" }} />

        <Form.Item label="Job posting URL" name="jobUrl">
          <Input prefix={<LinkOutlined className="text-gray-400" />} placeholder="https://jobs.company.com/..." size="large" />
        </Form.Item>

        <Form.Item label="Notes" name="notes">
          <TextArea placeholder="Referral contact, recruiter name, cover letter notes..." rows={3} style={{ resize: "none" }} />
        </Form.Item>

        <div className="flex gap-3 justify-end pt-2">
          <Button size="large" onClick={handleClose}>Cancel</Button>
          <Button type="primary" size="large" htmlType="submit" loading={isPending} style={{ minWidth: 140 }}>
            Add Application
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
