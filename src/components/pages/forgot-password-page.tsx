import { AuthLayout } from "@/components/layout/auth-layout";
import { ForgotForm } from "@/components/sections/auth/forgot-form";

export function ForgotPasswordPage() {
  return (
    <AuthLayout title="Forgot password" description="Enter your email and we will send a reset link.">
      <ForgotForm />
    </AuthLayout>
  );
}