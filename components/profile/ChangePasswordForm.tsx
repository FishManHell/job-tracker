"use client";

import { useState, useTransition } from "react";
import { Card, Form, Input, Button } from "antd";
import { LockOutlined } from "@ant-design/icons";
import FormAlert from "@/components/common/FormAlert";
import { changePassword } from "@/actions/profile";
import type { PasswordChangeFormValues } from "@/types/auth";

function ChangePasswordForm() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [form] = Form.useForm<PasswordChangeFormValues>();

  const onFinish = (values: PasswordChangeFormValues) => {
    setError(null);
    startTransition(async () => {
      const result = await changePassword(values.currentPassword, values.newPassword);
      if (result?.error) {
        setError(result.error);
      } else {
        form.resetFields();
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    });
  };

  return (
    <Card title={
      <div className="flex items-center gap-2">
        <LockOutlined style={{ color: "#6366f1" }} />
        <span>Change Password</span>
      </div>}
    >
      <FormAlert message={success ? "Password changed successfully." : null} type="success" />
      <FormAlert message={error} />

      <Form form={form} layout="vertical" requiredMark={false} onFinish={onFinish}>
        <Form.Item label="Current password" name="currentPassword" rules={[{ required: true }]}>
          <Input.Password prefix={<LockOutlined className="text-gray-400" />} placeholder="••••••••" size="large" />
        </Form.Item>
        <div className="grid grid-cols-2 gap-x-4">
          <Form.Item label="New password" name="newPassword" rules={[{ required: true, min: 8, message: "Min. 8 characters" }]}>
            <Input.Password prefix={<LockOutlined className="text-gray-400" />} placeholder="Min. 8 characters" size="large" />
          </Form.Item>
          <Form.Item
            label="Confirm new password"
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) return Promise.resolve();
                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined className="text-gray-400" />} placeholder="Repeat new password" size="large" />
          </Form.Item>
        </div>
        <div className="flex justify-end">
          <Button type="primary" size="large" htmlType="submit" loading={isPending}>Update Password</Button>
        </div>
      </Form>
    </Card>
  );
}

export default ChangePasswordForm;
