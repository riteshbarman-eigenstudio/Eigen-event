import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicEventPage } from "@/components/pages/public-event-page";
import { getEvent } from "@/lib/mock-data";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = getEvent((await params).slug);
  return event ? { title: event.name, description: event.tagline } : {};
}

export default async function Page({ params }: Props) {
  const event = getEvent((await params).slug);
  if (!event) notFound();
  return <PublicEventPage event={event} />;
}