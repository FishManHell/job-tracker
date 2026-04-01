"use client";

import Link from "next/link";
import { Button, Input, Divider, Alert, Form } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { login, loginWithGoogle } from "@/actions/auth";
import { useFormAction } from "@/hooks/use-form-action";
import GoogleIcon from "@/components/icons/GoogleIcon";

type LoginValues = { email: string; password: string };

export default function LoginForm() {
  const { error, isPending, handleSubmit } = useFormAction<LoginValues>(
    login,
    (values) => {
      const fd = new FormData();
      fd.append("email", values.email);
      fd.append("password", values.password);
      return fd;
    },
  );

  return (
    <>
      <form action={loginWithGoogle}>
        <Button
          type="default"
          htmlType="submit"
          block
          size="large"
          icon={<GoogleIcon />}
          style={{ height: 42 }}
        >
          Continue with Google
        </Button>
      </form>

      <Divider plain style={{ color: "#9ca3af", fontSize: 12 }}>or sign in with email</Divider>

      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />}

      <Form layout="vertical" requiredMark={false} onFinish={handleSubmit}>
        <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
          <Input size="large" prefix={<MailOutlined />} placeholder="you@example.com" autoComplete="email" />
        </Form.Item>

        <Form.Item
          label={
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <span>Password</span>
              <Link href="/forgot-password" style={{ fontSize: 12, color: "#6366f1" }}>Forgot password?</Link>
            </div>
          }
          name="password"
          rules={[{ required: true }]}
        >
          <Input.Password size="large" prefix={<LockOutlined />} placeholder="••••••••" autoComplete="current-password" />
        </Form.Item>

        <Form.Item style={{ marginTop: 4 }}>
          <Button type="primary" htmlType="submit" block size="large" loading={isPending}>
            Sign in
          </Button>
        </Form.Item>
      </Form>

      <p className="text-center text-sm text-gray-500 mt-2">
        Don&apos;t have an account?{" "}
        <Link href="/register" style={{ color: "#6366f1", fontWeight: 500 }}>Sign up</Link>
      </p>
    </>
  );
}
