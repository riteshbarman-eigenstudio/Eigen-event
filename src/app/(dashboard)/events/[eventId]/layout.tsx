import type { ReactNode } from "react";
import { EventGate } from "@/components/layout/event-gate";

export default async function EventLayout({ children, params }: { children: ReactNode; params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;
  return <EventGate eventId={eventId}>{children}</EventGate>;
}
