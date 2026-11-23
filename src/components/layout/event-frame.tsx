"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEvent } from "@/context/event-context";
import { Badge } from "@/vendor/untitledui/base/badge";
import { Button } from "@/vendor/untitledui/base/button";
import { EventSubnav } from "./event-subnav";

/** Wraps every page under /events/[eventId]: event title bar + tab bar. */
export function EventFrame({ children }: { children: ReactNode }) {
  const event = useEvent();
  return (
    <>
      <div className="flex flex-col gap-4">
        <Link href="/events" className="text-sm font-medium text-gray-500 hover:text-gray-900">
          Back to events
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-h2 font-semibold text-gray-900">{event.name}</h2>
            <Badge>{event.status}</Badge>
          </div>
          <Button href={`/e/${event.slug}`} color="secondary" size="sm">
            View public page
          </Button>
        </div>
        <EventSubnav />
      </div>
      {children}
    </>
  );
}
