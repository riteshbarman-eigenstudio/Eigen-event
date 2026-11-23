import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { EventFrame } from "@/components/layout/event-frame";
import { EventProvider } from "@/context/event-context";
import { getEvent } from "@/lib/mock-data";

export default async function EventLayout({ children, params }: { children: ReactNode; params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;
  const event = getEvent(eventId);
  if (!event) notFound();
  return (
    <EventProvider event={event}>
      <EventFrame>{children}</EventFrame>
    </EventProvider>
  );
}