import { notFound } from "next/navigation";
import { CheckInPage } from "@/components/pages/check-in-page";
import { getEvent } from "@/lib/mock-data";

export default async function Page({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;
  const event = getEvent(eventId);
  if (!event) notFound();
  return <CheckInPage registered={event.registered} />;
}