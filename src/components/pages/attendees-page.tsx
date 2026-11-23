"use client";

import { PageHeader } from "@/components/layout/page-header";
import { AttendeeTable } from "@/components/sections/attendees/attendee-table";
import { useEvent } from "@/context/event-context";
import { useEventAttendees } from "@/lib/store";

export function AttendeesPage() {
  const event = useEvent();
  return (
    <>
      <PageHeader title="Attendees" description="Everyone registered for this event." />
      <AttendeeTable attendees={useEventAttendees(event)} />
    </>
  );
}
