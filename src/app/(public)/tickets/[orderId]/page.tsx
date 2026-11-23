import type { Metadata } from "next";
import { MyTicketPage } from "@/components/pages/my-ticket-page";

export const metadata: Metadata = { title: "Your ticket", robots: { index: false, follow: false } };

export default async function Page({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  return <MyTicketPage orderId={orderId} />;
}
