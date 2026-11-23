import { PublicHeader } from "@/components/layout/public-header";
import { TicketCard } from "@/components/sections/my-ticket/ticket-card";
import { events } from "@/lib/mock-data";

export function MyTicketPage() {
  return (
    <>
      <PublicHeader cta={false} />
      <main className="flex justify-center px-4 py-16">
        <TicketCard event={events[0]} holder="Asha Rao" ticket="General admission" />
      </main>
    </>
  );
}