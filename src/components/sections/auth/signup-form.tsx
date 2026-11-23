"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/vendor/untitledui/base/button";
import { Input } from "@/vendor/untitledui/base/input";

export function SignupForm() {
  const router = useRouter();
  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        router.push("/events");
      }}
    >
      <Input name="name" label="Name" placeholder="Your name" required />
      <Input name="organization" label="Organization" placeholder="Company or community" required />
      <Input name="email" type="email" label="Email" placeholder="you@company.com" required />
      <Input name="password" type="password" label="Password" placeholder="Create a password" hint="Must be at least 8 characters." required />
      <Button type="submit" size="lg">
        Create account
      </Button>
      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-gray-900">
          Sign in
        </Link>
      </p>
    </form>
  );
}
