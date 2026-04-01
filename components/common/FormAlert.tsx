import { Alert } from "antd";

interface Props {
  message?: string | null;
  type?: "error" | "success" | "warning" | "info";
}

export default function FormAlert({ message, type = "error" }: Props) {
  if (!message) return null;
  return <Alert title={message} type={type} showIcon style={{ marginBottom: 16 }} />;
}
