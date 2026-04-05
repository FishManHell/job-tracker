"use client";

import { useState, useTransition } from "react";
import { Card, Form, Input, Button } from "antd";
import { UserOutlined, MailOutlined, EditOutlined } from "@ant-design/icons";
import FormAlert from "@/components/common/FormAlert";
import { updateProfile } from "@/actions/profile";

interface PersonalInfoFormProps {
  name:  string;
  email: string;
}

function PersonalInfoForm({ name, email }: PersonalInfoFormProps) {
  const [editing, setEditing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [form] = Form.useForm<{ name: string }>();

  const handleCancel = () => {
    form.resetFields();
    setEditing(false);
    setError(null);
  };

  const onFinish = ({ name }: { name: string }) => {
    setError(null);
    startTransition(async () => {
      const result = await updateProfile(name);
      if (result?.error) {
        setError(result.error);
      } else {
        setEditing(false);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    });
  };

  return (
    <Card
      title={
      <div className="flex items-center gap-2">
        <UserOutlined style={{ color: "#6366f1" }} />
        <span>Personal Information</span>
      </div>
    }
      extra={
        !editing && (
          <Button icon={<EditOutlined />} size="small" onClick={() => setEditing(true)}>Edit</Button>
        )
      }
    >
      <FormAlert message={success ? "Profile updated successfully." : null} type="success" />
      <FormAlert message={error} />

      <Form form={form} layout="vertical" requiredMark={false} onFinish={onFinish} initialValues={{ name }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
          <Form.Item label="Full name" name="name" rules={[{ required: true, message: "Enter your name" }]}>
            <Input prefix={<UserOutlined className="text-gray-400" />} size="large" disabled={!editing} />
          </Form.Item>
          <Form.Item label="Email">
            <Input prefix={<MailOutlined className="text-gray-400" />} size="large" value={email} disabled />
          </Form.Item>
        </div>
        {editing && (
          <div className="flex gap-3 justify-end mt-2">
            <Button size="large" onClick={handleCancel}>Cancel</Button>
            <Button type="primary" size="large" htmlType="submit" loading={isPending}>Save changes</Button>
          </div>
        )}
      </Form>
    </Card>
  );
}

export default PersonalInfoForm;
