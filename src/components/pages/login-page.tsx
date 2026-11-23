import { AuthLayout } from "@/components/layout/auth-layout";
import { LoginForm } from "@/components/sections/auth/login-form";

export function LoginPage() {
  return (
    <AuthLayout title="Welcome back" description="Sign in to manage your events.">
      <LoginForm />
    </AuthLayout>
  );
}