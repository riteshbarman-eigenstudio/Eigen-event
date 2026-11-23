import type { Metadata } from "next";
import { EventCreatePage } from "@/components/pages/event-create-page";

export const metadata: Metadata = { title: "Create event" };

export default function Page() {
  return <EventCreatePage />;
}