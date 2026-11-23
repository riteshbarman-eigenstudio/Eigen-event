"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/vendor/untitledui/base/button";
import { Input } from "@/vendor/untitledui/base/input";
import { Checkbox } from "@/vendor/untitledui/base/checkbox";

export function LoginForm() {
  const router = useRouter();
  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        router.push("/events"); // Demo only. Real auth lands in plan step 1.
      }}
    >
      <Input name="email" type="email" label="Email" placeholder="you@company.com" required />
      <Input name="password" type="password" label="Password" placeholder="Enter your password" required />
      <div className="flex items-center justify-between">
        <Checkbox label="Remember me" />
        <Link href="/forgot-password" className="text-sm font-semibold text-gray-700 hover:text-gray-900">
          Forgot password
        </Link>
      </div>
      <Button type="submit" size="lg">
        Sign in
      </Button>
      <p className="text-center text-sm text-gray-600">
        New to Eigen Event?{" "}
        <Link href="/signup" className="font-semibold text-gray-900">
          Create an account
        </Link>
      </p>
    </form>
  );
}
