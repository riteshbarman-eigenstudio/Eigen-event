import type { Metadata } from "next";
import { SignupPage } from "@/components/pages/signup-page";

export const metadata: Metadata = { title: "Create account" };

export default function Page() {
  return <SignupPage />;
}