"use client";

import { useState } from "react";
import { Card, Form, Input, Button, Divider, Tag, Avatar } from "antd";
import FormAlert from "@/components/common/FormAlert";
import { UserOutlined, MailOutlined, LockOutlined, EditOutlined, CheckCircleOutlined } from "@ant-design/icons";
import type { ProfileFormValues, PasswordChangeFormValues } from "@/types/auth";

const profileStats = [
  { value: "148", label: "Applications", color: "#6366f1" },
  { value: "18",  label: "Interviews",   color: "#f59e0b" },
  { value: "5",   label: "Offers",       color: "#10b981" },
  { value: "89%", label: "Response Rate",color: "#3b82f6" },
];

export default function ProfilePage() {
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileSaved, setProfileSaved]     = useState(false);
  const [passwordSaved, setPasswordSaved]   = useState(false);
  const [profileForm]  = Form.useForm<ProfileFormValues>();
  const [passwordForm] = Form.useForm<PasswordChangeFormValues>();

  const saveProfile = (values: ProfileFormValues) => {
    // TODO: wire up updateProfile server action
    console.log("Save profile:", values);
    setEditingProfile(false);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const savePassword = (values: PasswordChangeFormValues) => {
    // TODO: wire up changePassword server action
    console.log("Save password:", values);
    passwordForm.resetFields();
    setPasswordSaved(true);
    setTimeout(() => setPasswordSaved(false), 3000);
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your account settings</p>
      </div>

      <div className="flex flex-col gap-5">

        {/* Avatar + Stats */}
        <Card styles={{ body: { padding: 0 } }}>
          <div className="h-24 rounded-t-lg" style={{ background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #1a1d2e 100%)" }} />
          <div className="px-6 pb-6">
            <div className="flex items-end justify-between -mt-8 mb-5">
              <div className="relative">
                <Avatar size={72} style={{ backgroundColor: "#6366f1", fontSize: 24, fontWeight: 700, border: "3px solid white" }}>
                  DZ
                </Avatar>
                <Button
                  type="primary"
                  shape="circle"
                  size="small"
                  icon={<EditOutlined style={{ fontSize: 10 }} />}
                  className="absolute! -bottom-0.5! -right-0.5! w-6! h-6! min-w-0! border-2! border-white!"
                />
              </div>
              <div className="flex items-center gap-2">
                <Tag color="purple" icon={<CheckCircleOutlined />}>Pro Plan</Tag>
                <Tag color="green">Active</Tag>
              </div>
            </div>

            <div className="mb-5">
              <h2 className="text-xl font-bold text-gray-900">Denys Z.</h2>
              <p className="text-gray-500 text-sm">admin@jobtracker.com</p>
              <p className="text-gray-400 text-xs mt-1">Member since March 2026</p>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {profileStats.map((s) => (
                <div key={s.label} className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                  <p className="text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Personal Information */}
        <Card
          title={<div className="flex items-center gap-2"><UserOutlined style={{ color: "#6366f1" }} /><span>Personal Information</span></div>}
          extra={
            !editingProfile && (
              <Button icon={<EditOutlined />} size="small" onClick={() => setEditingProfile(true)}>Edit</Button>
            )
          }
        >
          <FormAlert message={profileSaved ? "Profile updated successfully" : null} type="success" />
          <Form
            form={profileForm}
            layout="vertical"
            requiredMark={false}
            onFinish={saveProfile}
            initialValues={{ name: "Denys Z.", email: "admin@jobtracker.com" }}
          >
            <div className="grid grid-cols-2 gap-x-4">
              <Form.Item label="Full name" name="name" rules={[{ required: true, message: "Enter your name" }]}>
                <Input prefix={<UserOutlined className="text-gray-400" />} size="large" disabled={!editingProfile} />
              </Form.Item>
              <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
                <Input prefix={<MailOutlined className="text-gray-400" />} size="large" disabled={!editingProfile} />
              </Form.Item>
            </div>
            {editingProfile && (
              <div className="flex gap-3 justify-end mt-2">
                <Button size="large" onClick={() => { profileForm.resetFields(); setEditingProfile(false); }}>
                  Cancel
                </Button>
                <Button type="primary" size="large" htmlType="submit">Save changes</Button>
              </div>
            )}
          </Form>
        </Card>

        {/* Change Password */}
        <Card
          title={<div className="flex items-center gap-2"><LockOutlined style={{ color: "#6366f1" }} /><span>Change Password</span></div>}
        >
          <FormAlert message={passwordSaved ? "Password changed successfully" : null} type="success" />
          <Form form={passwordForm} layout="vertical" requiredMark={false} onFinish={savePassword}>
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
              <Button type="primary" size="large" htmlType="submit">Update Password</Button>
            </div>
          </Form>
        </Card>

        {/* Danger Zone */}
        <Card title={<span className="text-red-500 font-semibold">Danger Zone</span>} styles={{ header: { borderBottom: "1px solid #fee2e2" } }}>
          <Divider style={{ margin: "0 0 16px" }} />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">Delete account</p>
              <p className="text-xs text-gray-400 mt-0.5">Permanently delete your account and all data. This cannot be undone.</p>
            </div>
            <Button danger size="large">Delete Account</Button>
          </div>
        </Card>

      </div>
    </div>
  );
}
