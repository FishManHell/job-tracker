"use client";

import { useState, useTransition } from "react";
import { Card, Form, Select, Button } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import FormAlert from "@/components/common/FormAlert";
import { updateDefaults } from "@/actions/settings";
import { CURRENCY_OPTIONS } from "@/lib/select-options";
import type { DefaultsFormValues } from "@/types/settings";
import type { SettingsData } from "@/types/settings";

interface DefaultsFormProps {
  data: SettingsData;
}

export function DefaultsForm({ data }: DefaultsFormProps) {
  const [form] = Form.useForm<DefaultsFormValues>();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const onFinish = (values: DefaultsFormValues) => {
    setError(null);
    startTransition(async () => {
      const result = await updateDefaults(values);
      if (result?.error) {
        setError(result.error);
      } else {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    });
  };

  return (
    <Card
      title={
        <div className="flex items-center gap-2">
          <SettingOutlined style={{ color: "#6366f1" }} />
          <span>Application Defaults</span>
        </div>
      }
    >
      <FormAlert message={success ? "Defaults saved." : null} type="success" />
      <FormAlert message={error} />

      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={onFinish}
        initialValues={{ defaultCurrency: data.defaultCurrency }}
      >
        <Form.Item
          label="Default currency"
          name="defaultCurrency"
          help="Pre-selected when adding a new application."
        >
          <Select options={CURRENCY_OPTIONS} size="large" style={{ maxWidth: 200 }} />
        </Form.Item>

        <div className="flex justify-end mt-2">
          <Button type="primary" size="large" htmlType="submit" loading={isPending}>
            Save defaults
          </Button>
        </div>
      </Form>
    </Card>
  );
}
