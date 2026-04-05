"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button } from "antd";
import { LockOutlined } from "@ant-design/icons";
import FormAlert from "@/components/common/FormAlert";
import { resetPassword } from "@/actions/password-reset";
import { ROUTES } from "@/lib/routes";

interface ResetPasswordFormProps {
  token: string;
}

interface FormValues {
  password: string;
  confirmPassword: string;
}

function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const onFinish = ({ password }: FormValues) => {
    setError(null);
    startTransition(async () => {
      const result = await resetPassword(token, password);
      if (result?.error) setError(result.error);
      else router.push(`${ROUTES.LOGIN}?reset=success`);
    });
  };

  return (
    <>
      <FormAlert message={error} />

      <Form layout="vertical" requiredMark={false} onFinish={onFinish}>
        <Form.Item
          label="New password"
          name="password"
          rules={[{ required: true, min: 8, message: "At least 8 characters" }]}
        >
          <Input.Password size="large" prefix={<LockOutlined />} placeholder="••••••••" />
        </Form.Item>

        <Form.Item
          label="Confirm password"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) return Promise.resolve();
                return Promise.reject("Passwords do not match.");
              },
            }),
          ]}
        >
          <Input.Password size="large" prefix={<LockOutlined />} placeholder="••••••••" />
        </Form.Item>

        <Form.Item style={{ marginTop: 4 }}>
          <Button type="primary" htmlType="submit" block size="large" loading={isPending}>
            Reset password
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default ResetPasswordForm;
