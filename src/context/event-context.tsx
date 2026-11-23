"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { EventItem } from "@/types";

const EventContext = createContext<EventItem | null>(null);

export function EventProvider({ event, children }: { event: EventItem; children: ReactNode }) {
  return <EventContext.Provider value={event}>{children}</EventContext.Provider>;
}

/** The event currently open under /events/[eventId]. */
export function useEvent() {
  const ctx = useContext(EventContext);
  if (!ctx) throw new Error("useEvent must be used inside EventProvider");
  return ctx;
}
