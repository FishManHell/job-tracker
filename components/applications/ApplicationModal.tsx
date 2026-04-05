"use client";

import { useState, useTransition } from "react";
import {
  Modal, Form, Input, Select, Switch,
  InputNumber, Button, Divider, Row, Col, AutoComplete,
} from "antd";
import {
  BankOutlined, EditOutlined, EnvironmentOutlined,
  LinkOutlined, DollarOutlined,
} from "@ant-design/icons";
import FormAlert from "@/components/common/FormAlert";
import ModalTitle from "@/components/common/ModalTitle";
import StatusSelect from "@/components/common/StatusSelect";
import { formatSalary } from "@/lib/format";
import { createApplication, updateApplication } from "@/actions/applications";
import type { SerializedApplication } from "@/types/application";
import type { CompanyOption } from "@/lib/data/companies";
import type { AddApplicationFormValues } from "@/types/application";
import type { Currency } from "@/types/common";
import { urlValidator } from "@/lib/validators";
import { CURRENCY_OPTIONS }           from "@/lib/select-options";
import { ADD_DEFAULTS, toFormValues } from "./ApplicationModal.utils";

const { TextArea } = Input;

interface ApplicationModalProps {
  open: boolean;
  onClose: () => void;
  companies: CompanyOption[];
  application?: SerializedApplication;
  defaultCurrency?: Currency;
}

function ApplicationModal({ open, onClose, companies, application, defaultCurrency }: ApplicationModalProps) {
  const isEdit= !!application;
  const addDefaults= defaultCurrency ? { ...ADD_DEFAULTS, currency: defaultCurrency } : ADD_DEFAULTS;

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
      const result = isEdit
        ? await updateApplication(application.id, values)
        : await createApplication(values);

      if (result?.error) setError(result.error);
      else handleClose();
    });
  };

  const companyOptions = companies.map((c) => ({ value: c.name }));

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      title={
        <ModalTitle
          isEdit={isEdit}
          icon={isEdit ? <EditOutlined /> : <BankOutlined />}
          addLabel="Add Application"
          editLabel="Edit Application"
        />
      }
      footer={null}
      width="min(560px, calc(100vw - 32px))"
      centered
      destroyOnHidden
    >
      <FormAlert message={error} />

      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={onFinish}
        initialValues={isEdit ? toFormValues(application) : addDefaults}
        style={{ marginTop: 8 }}
      >
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              label="Company"
              name="companyName"
              rules={[{ required: true, message: "Enter company name" }]}
            >
              <AutoComplete
                options={companyOptions}
                showSearch={{
                  filterOption: (input: string, option?: { value: string }) =>
                    (option?.value ?? "").toLowerCase().includes(input.toLowerCase()),
                }}
              >
                <Input
                  prefix={<BankOutlined className="text-gray-400" />}
                  placeholder="Google, Stripe..."
                  size="large"
                />
              </AutoComplete>
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

        <div className="flex items-center justify-between rounded-lg px-4 py-2 border border-gray-200 mb-2" style={{ backgroundColor: "var(--bg-card)" }}>
          <div>
            <p className="text-sm font-medium">Remote position</p>
            <p className="text-xs text-gray-400">Toggle if this is a remote job</p>
          </div>
          <Form.Item name="remote" valuePropName="checked" noStyle>
            <Switch />
          </Form.Item>
        </div>

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

        <Form.Item label="Job posting URL" name="jobUrl" rules={[urlValidator]} style={{ marginBottom: 12 }}>
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
