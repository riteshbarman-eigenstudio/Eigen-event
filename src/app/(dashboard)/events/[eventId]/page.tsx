import { EventOverviewPage } from "@/components/pages/event-overview-page";

export default async function Page({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;
  return <EventOverviewPage eventId={eventId} />;
}