import { PageHeader } from "@/components/layout/page-header";
import { ComingSoon } from "@/components/sections/shared/coming-soon";

export function AgendaPage() {
  return (
    <>
      <PageHeader title="Agenda" />
      <ComingSoon module="Agenda" description="A multi-track schedule with rooms, speakers and a personal agenda for attendees." />
    </>
  );
}