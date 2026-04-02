import { Suspense } from "react";
import Logo from "@/components/common/Logo";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="w-full max-w-md">
      <div className="mb-2 lg:hidden">
        <Logo variant="dark" size="sm" />
      </div>

      <div className="mb-8 mt-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
        <p className="text-gray-500 text-sm mt-1">
          Sign in to continue tracking your applications
        </p>
      </div>

      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
