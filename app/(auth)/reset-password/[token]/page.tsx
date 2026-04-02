import { notFound } from "next/navigation";
import Logo from "@/components/common/Logo";
import { prisma } from "@/lib/prisma";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

interface PageProps {
  params: Promise<{ token: string }>;
}

export default async function ResetPasswordPage({ params }: PageProps) {
  const { token } = await params;

  const record = await prisma.passwordResetToken.findUnique({ where: { token } });

  if (!record || record.expiresAt < new Date()) notFound();

  return (
    <div className="w-full max-w-md">
      <div className="mb-2 lg:hidden">
        <Logo variant="dark" size="sm" />
      </div>

      <div className="mb-8 mt-6">
        <h1 className="text-2xl font-bold text-gray-900">Set new password</h1>
        <p className="text-gray-500 text-sm mt-1">
          Choose a strong password for your account.
        </p>
      </div>

      <ResetPasswordForm token={token} />
    </div>
  );
}
