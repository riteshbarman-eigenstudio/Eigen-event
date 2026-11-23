"use client";

import { PageHeader } from "@/components/layout/page-header";
import { CheckInConsole } from "@/components/sections/check-in/check-in-console";
import { useEvent } from "@/context/event-context";
import { useEventAttendees } from "@/lib/store";
import { Button } from "@/vendor/untitledui/base/button";

export function CheckInPage() {
  const event = useEvent();
  const attendees = useEventAttendees(event);
  return (
    <>
      <PageHeader title="Check-in" description="Scan tickets and welcome guests at the door." actions={<Button href="/scan" color="secondary">Open scanner app</Button>} />
      <CheckInConsole key={attendees.length} attendees={attendees} total={event.registered} />
    </>
  );
}
