import type { Metadata } from "next";
import { EventsListPage } from "@/components/pages/events-list-page";

export const metadata: Metadata = { title: "Events" };

export default function Page() {
  return <EventsListPage />;
}