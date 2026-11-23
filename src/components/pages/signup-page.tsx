import { AuthLayout } from "@/components/layout/auth-layout";
import { SignupForm } from "@/components/sections/auth/signup-form";

export function SignupPage() {
  return (
    <AuthLayout title="Create your account" description="Start planning your first event in minutes.">
      <SignupForm />
    </AuthLayout>
  );
}