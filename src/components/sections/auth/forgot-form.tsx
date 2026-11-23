"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/vendor/untitledui/base/button";
import { Input } from "@/vendor/untitledui/base/input";

export function ForgotForm() {
  const [sent, setSent] = useState(false);
  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <Input name="email" type="email" label="Email" placeholder="you@company.com" required />
      <Button type="submit" size="lg">
        Send reset link
      </Button>
      {sent && (
        <p role="status" className="text-center text-sm text-gray-600">
          If that email exists, a reset link is on its way.
        </p>
      )}
      <Link href="/login" className="text-center text-sm font-semibold text-gray-700 hover:text-gray-900">
        Back to sign in
      </Link>
    </form>
  );
}
