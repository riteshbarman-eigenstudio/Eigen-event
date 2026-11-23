import type { Metadata } from "next";
import { ScannerPage } from "@/components/pages/scanner-page";

export const metadata: Metadata = { title: "Door scanner" };

export default function Page() {
  return <ScannerPage />;
}