import Link from "next/link";
import { Button } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import Logo from "@/components/common/Logo";
import { ROUTES } from "@/lib/routes";

export default function ForgotPasswordSuccess() {
  return (
    <div className="w-full max-w-md text-center">
      <div className="mb-2 lg:hidden">
        <Logo variant="dark" size="sm" />
      </div>
      <div className="flex justify-center mt-6 mb-6">
        <CheckCircleFilled style={{ fontSize: 56, color: "#6366f1" }} />
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Check your email</h1>
      <p className="text-gray-500 text-sm mb-8">
        If an account exists for that email, we sent a password reset link. Check your inbox.
      </p>
      <Link href={ROUTES.LOGIN}>
        <Button type="primary" size="large" block>Back to Sign in</Button>
      </Link>
    </div>
  );
}
