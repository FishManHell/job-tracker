"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Form, Input, Button } from "antd";
import { MailOutlined } from "@ant-design/icons";
import FormAlert from "@/components/common/FormAlert";
import Logo from "@/components/common/Logo";
import ForgotPasswordSuccess from "./ForgotPasswordSuccess";
import { requestPasswordReset } from "@/actions/password-reset";
import { ROUTES } from "@/lib/routes";

export default function ForgotPasswordForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const onFinish = ({ email }: { email: string }) => {
    setError(null);
    startTransition(async () => {
      const result = await requestPasswordReset(email);
      if (result?.error) setError(result.error);
      else setSent(true);
    });
  };

  if (sent) return <ForgotPasswordSuccess />;

  return (
    <div className="w-full max-w-md">
      <div className="mb-2 lg:hidden">
        <Logo variant="dark" size="sm" />
      </div>

      <div className="mb-8 mt-6">
        <h1 className="text-2xl font-bold text-gray-900">Forgot password?</h1>
        <p className="text-gray-500 text-sm mt-1">
          Enter your email and we&apos;ll send you a reset link.
        </p>
      </div>

      <FormAlert message={error} />

      <Form layout="vertical" requiredMark={false} onFinish={onFinish}>
        <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
          <Input size="large" prefix={<MailOutlined />} placeholder="you@example.com" autoComplete="email" />
        </Form.Item>

        <Form.Item style={{ marginTop: 4 }}>
          <Button type="primary" htmlType="submit" block size="large" loading={isPending}>
            Send reset link
          </Button>
        </Form.Item>
      </Form>

      <p className="text-center text-sm text-gray-500 mt-2">
        <Link href={ROUTES.LOGIN} style={{ color: "#6366f1", fontWeight: 500 }}>Back to Sign in</Link>
      </p>
    </div>
  );
}
