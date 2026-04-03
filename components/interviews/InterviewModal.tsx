"use client";

import { useState, useTransition } from "react";
import { Modal, Form, Input, Select, InputNumber, Button, Row, Col, DatePicker } from "antd";
import { CalendarOutlined, EditOutlined } from "@ant-design/icons";
import FormAlert from "@/components/common/FormAlert";
import { INTERVIEW_RESULT_CONFIG } from "@/lib/interview-config";
import { renderDotOption } from "@/components/common/select-helpers";
import { createInterview, updateInterview } from "@/actions/interviews";
import type { SerializedInterview } from "@/lib/data/interviews";
import type { ApplicationOption } from "@/lib/data/applications";
import {
  ADD_DEFAULTS,
  INTERVIEW_TYPE_SELECT_OPTIONS,
  INTERVIEW_RESULT_SELECT_OPTIONS,
  toFormValues,
  type AddInterviewFormValues,
} from "./InterviewModal.utils";

const { TextArea } = Input;

interface InterviewModalProps {
  open:         boolean;
  onClose:      () => void;
  applications: ApplicationOption[];
  interview?:   SerializedInterview;
}

function InterviewModal({ open, onClose, applications, interview }: InterviewModalProps) {
  const isEdit = !!interview;

  const [form]                    = Form.useForm<AddInterviewFormValues>();
  const [error, setError]         = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleClose = () => {
    form.resetFields();
    setError(null);
    onClose();
  };

  const onFinish = (values: AddInterviewFormValues) => {
    setError(null);
    startTransition(async () => {
      const payload = { ...values, scheduledAt: values.scheduledAt.toISOString() };
      const result  = isEdit
        ? await updateInterview(interview.id, payload)
        : await createInterview(payload);

      if (result?.error) setError(result.error);
      else handleClose();
    });
  };

  const appOptions = applications.map((a) => ({
    value: a.id,
    label: `${a.companyName} — ${a.position}`,
  }));

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      title={
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isEdit ? "bg-amber-500" : "bg-indigo-500"}`}>
            {isEdit
              ? <EditOutlined  style={{ color: "#fff", fontSize: 14 }} />
              : <CalendarOutlined style={{ color: "#fff", fontSize: 14 }} />
            }
          </div>
          <span className="text-base font-semibold">
            {isEdit ? "Edit Interview" : "Add Interview"}
          </span>
        </div>
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
        initialValues={isEdit ? toFormValues(interview) : ADD_DEFAULTS}
        style={{ marginTop: 8 }}
      >
        <Form.Item
          label="Application"
          name="applicationId"
          rules={[{ required: true, message: "Select an application" }]}
        >
          <Select
            size="large"
            options={appOptions}
            showSearch={{ optionFilterProp: "label" }}
            placeholder="Select application..."
            disabled={isEdit}
          />
        </Form.Item>

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: "Select type" }]}
            >
              <Select size="large" options={INTERVIEW_TYPE_SELECT_OPTIONS} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Scheduled At"
              name="scheduledAt"
              rules={[{ required: true, message: "Select date and time" }]}
            >
              <DatePicker
                showTime={{ format: "HH:mm" }}
                format="MMM D, YYYY HH:mm"
                size="large"
                style={{ width: "100%" }}
                placeholder="Select date & time"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Duration (min)" name="durationMins">
              <InputNumber
                size="large"
                style={{ width: "100%" }}
                min={1}
                placeholder="60"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Result" name="result">
              <Select
                size="large"
                options={INTERVIEW_RESULT_SELECT_OPTIONS}
                optionRender={(option) => {
                  const s = INTERVIEW_RESULT_CONFIG[option.data.value];
                  return renderDotOption(s.dotColor, option.label);
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Location" name="location">
          <Input size="large" placeholder="Google Meet, Zoom, on-site..." />
        </Form.Item>

        <Form.Item label="Notes" name="notes" style={{ marginBottom: 12 }}>
          <TextArea
            placeholder="Topics to prepare, interviewer name..."
            rows={2}
            style={{ resize: "none" }}
          />
        </Form.Item>

        <div className="flex gap-3 justify-end pt-2">
          <Button size="large" onClick={handleClose}>Cancel</Button>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={isPending}
            style={{ minWidth: 140 }}
          >
            {isEdit ? "Save Changes" : "Add Interview"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default InterviewModal;
