import type { Metadata } from "next";
import { MyTicketPage } from "@/components/pages/my-ticket-page";

export const metadata: Metadata = { title: "Your ticket" };

export default function Page() {
  return <MyTicketPage />;
}