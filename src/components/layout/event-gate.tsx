"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { EventProvider } from "@/context/event-context";
import { useEventLookup } from "@/lib/store";
import { Button } from "@/vendor/untitledui/base/button";
import { EventFrame } from "./event-frame";

/** Resolves /events/[eventId] to a demo or browser-created event, then renders the event frame. */
export function EventGate({ eventId, children }: { eventId: string; children: ReactNode }) {
  const { event, ready } = useEventLookup(eventId);
  if (!event) {
    if (!ready) return <p className="text-sm text-gray-500">Loading event...</p>;
    return (
      <div className="flex flex-col items-start gap-3">
        <h2 className="text-h2 font-semibold text-gray-900">Event not found</h2>
        <p className="text-md text-gray-600">This event does not exist in this browser. Events you create are saved locally in the demo.</p>
        <Button href="/events">Back to events</Button>
        <Link href="/events/new" className="text-sm font-semibold text-brand-700 hover:underline">
          Create a new event
        </Link>
      </div>
    );
  }
  return (
    <EventProvider event={event}>
      <EventFrame>{children}</EventFrame>
    </EventProvider>
  );
}
