import { Alert } from "antd";

interface FormAlertProps {
  message?: string | null;
  type?: "error" | "success" | "warning" | "info";
}

function FormAlert({ message, type = "error" }: FormAlertProps) {
  if (!message) return null;
  return <Alert title={message} type={type} showIcon style={{ marginBottom: 16 }} />;
}

export default FormAlert;
