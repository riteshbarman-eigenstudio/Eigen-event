import type { ReactNode } from "react";
import { Logo } from "./logo";

/** Centred card frame for login, signup and password pages. */
export function AuthLayout({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-gray-50 px-4 py-12">
      <Logo />
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-h2 font-semibold text-gray-900">{title}</h1>
          <p className="mt-2 text-md text-gray-600">{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
}
