import { PageHeader } from "@/components/layout/page-header";
import { AttendeeTable } from "@/components/sections/attendees/attendee-table";
import { attendees } from "@/lib/mock-data";

export function AttendeesPage() {
  return (
    <>
      <PageHeader title="Attendees" description="Everyone registered for this event." />
      <AttendeeTable attendees={attendees} />
    </>
  );
}