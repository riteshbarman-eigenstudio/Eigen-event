import { PageHeader } from "@/components/layout/page-header";
import { CreateEventForm } from "@/components/sections/event-create/create-event-form";

export function EventCreatePage() {
  return (
    <>
      <PageHeader title="Create event" breadcrumbs={[{ label: "Events", href: "/events" }, { label: "New event" }]} />
      <CreateEventForm />
    </>
  );
}