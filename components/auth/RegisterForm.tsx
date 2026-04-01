"use client";

import Link from "next/link";
import { Button, Input, Divider, Form } from "antd";
import FormAlert from "@/components/common/FormAlert";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { register, loginWithGoogle } from "@/actions/auth";
import { useFormAction } from "@/hooks/use-form-action";
import GoogleIcon from "@/components/icons/GoogleIcon";
import type { RegisterValues } from "@/types/auth";
import { ROUTES } from "@/lib/routes";

export default function RegisterForm() {
  const { error, isPending, handleSubmit } = useFormAction<RegisterValues>(
    register,
    (values) => {
      const fd = new FormData();
      fd.append("name", values.name);
      fd.append("email", values.email);
      fd.append("password", values.password);
      fd.append("confirmPassword", values.confirmPassword);
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

      <Divider plain style={{ color: "#9ca3af", fontSize: 12 }}>or register with email</Divider>

      <FormAlert message={error} />

      <Form layout="vertical" requiredMark={false} onFinish={handleSubmit}>
        <Form.Item label="Full name" name="name" rules={[{ required: true, message: "Enter your name" }]}>
          <Input size="large" prefix={<UserOutlined />} placeholder="Denys Zhyvotov" autoComplete="name" />
        </Form.Item>

        <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
          <Input size="large" prefix={<MailOutlined />} placeholder="you@example.com" autoComplete="email" />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[{ required: true, min: 8, message: "Min. 8 characters" }]}>
          <Input.Password size="large" prefix={<LockOutlined />} placeholder="Min. 8 characters" autoComplete="new-password" />
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
                return Promise.reject(new Error("Passwords do not match"));
              },
            }),
          ]}
        >
          <Input.Password size="large" prefix={<LockOutlined />} placeholder="Repeat your password" autoComplete="new-password" />
        </Form.Item>

        <p className="text-xs text-gray-400 mb-4">
          By creating an account you agree to our{" "}
          <Link href="/terms" style={{ color: "#6366f1" }}>Terms of Service</Link>{" "}
          and <Link href="/privacy" style={{ color: "#6366f1" }}>Privacy Policy</Link>.
        </p>

        <Form.Item>
          <Button type="primary" htmlType="submit" block size="large" loading={isPending}>
            Create account
          </Button>
        </Form.Item>
      </Form>

      <p className="text-center text-sm text-gray-500 mt-2">
        Already have an account?{" "}
        <Link href={ROUTES.LOGIN} style={{ color: "#6366f1", fontWeight: 500 }}>Sign in</Link>
      </p>
    </>
  );
}
