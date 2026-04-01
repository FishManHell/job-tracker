import Logo from "@/components/common/Logo";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="w-full max-w-md">
      <div className="mb-2 lg:hidden">
        <Logo variant="dark" size="sm" />
      </div>

      <div className="mb-8 mt-6">
        <h1 className="text-2xl font-bold text-gray-900">Create account</h1>
        <p className="text-gray-500 text-sm mt-1">
          Start tracking your job applications today
        </p>
      </div>

      <RegisterForm />
    </div>
  );
}
